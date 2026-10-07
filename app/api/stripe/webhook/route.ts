import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getProduct, membership } from "@/lib/content";

/**
 * Stripe webhook. Verifies the signature, reduces the event to the fields the
 * n8n "TiniLearners Order Fulfilment" workflow needs and forwards it. n8n
 * records the order in Supabase and emails the PDF links. Returning non-2xx
 * makes Stripe retry; n8n skips sessions it has already fulfilled.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const forwardUrl = process.env.N8N_ORDER_WEBHOOK_URL;
  const token = process.env.N8N_WEBHOOK_TOKEN;
  if (!stripe || !secret || !forwardUrl || !token) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(await request.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const payload = toPayload(event);
  if (!payload) return NextResponse.json({ received: true, ignored: event.type });

  try {
    const res = await fetch(forwardUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-tinilearners-token": token },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`n8n responded ${res.status}`);
  } catch (err) {
    console.error("Stripe event forward failed", event.id, err);
    return NextResponse.json({ error: "Forward failed." }, { status: 502 });
  }
  return NextResponse.json({ received: true });
}

function toPayload(event: Stripe.Event): Record<string, unknown> | null {
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const s = event.data.object;
      // Async methods (bank debits) complete later; fulfil on async_payment_succeeded instead.
      if (s.payment_status === "unpaid") return null;
      const slug = s.metadata?.slug ?? null;
      const option = s.metadata?.option ?? null;
      const product = slug ? getProduct(slug) : undefined;
      return {
        type: "order",
        stripe_session_id: s.id,
        email: s.customer_details?.email ?? null,
        customer_name: s.customer_details?.name ?? null,
        product_slug: slug,
        product_title: option === "club" ? membership.name : (product?.title ?? slug),
        option,
        amount_total: s.amount_total,
        currency: s.currency,
        shipping: s.collected_information?.shipping_details ?? null,
        stripe_customer_id: typeof s.customer === "string" ? s.customer : (s.customer?.id ?? null),
        stripe_subscription_id: typeof s.subscription === "string" ? s.subscription : (s.subscription?.id ?? null),
      };
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      return { type: "subscription", stripe_subscription_id: sub.id, status: sub.status };
    }
    default:
      return null;
  }
}

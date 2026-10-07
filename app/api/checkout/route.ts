import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getProduct, membership } from "@/lib/content";
import { isPurchaseOption } from "@/lib/checkout";

export async function POST(request: Request) {
  let body: { slug?: unknown; option?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const product = typeof body.slug === "string" ? getProduct(body.slug) : undefined;
  if (!product || !isPurchaseOption(body.option)) {
    return NextResponse.json({ error: "That product option doesn’t exist." }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout isn’t connected yet. Email tinilearners@gmail.com to order." },
      { status: 503 },
    );
  }

  const origin = new URL(request.url).origin;
  const option = body.option;
  const metadata = { slug: product.slug, option };

  const params: Stripe.Checkout.SessionCreateParams = {
    ui_mode: "embedded_page",
    return_url: `${origin}/checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
    metadata,
  };

  if (option === "club") {
    Object.assign(params, {
      mode: "subscription",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(membership.price * 100),
            recurring: { interval: membership.interval as "month" },
            product_data: { name: membership.name, description: membership.summary },
          },
        },
      ],
      subscription_data: { metadata },
    } satisfies Partial<Stripe.Checkout.SessionCreateParams>);
  } else {
    const format = product.formats.find((f) => f.id === option);
    if (!format) {
      return NextResponse.json({ error: "That format isn’t available for this book." }, { status: 400 });
    }
    Object.assign(params, {
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(format.price * 100),
            product_data: { name: `${product.title} (${format.label})` },
          },
        },
      ],
      payment_intent_data: { metadata },
    } satisfies Partial<Stripe.Checkout.SessionCreateParams>);

    if (option === "print") {
      params.shipping_address_collection = {
        allowed_countries: product.shipping.countries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      };
      params.shipping_options = [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: product.shipping.label,
            fixed_amount: { amount: Math.round(product.shipping.amount * 100), currency: "usd" },
          },
        },
      ];
    }
  }

  try {
    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("Stripe checkout session failed", err);
    return NextResponse.json({ error: "We couldn’t start checkout. Try again in a moment." }, { status: 502 });
  }
}

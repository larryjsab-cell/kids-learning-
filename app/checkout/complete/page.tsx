import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { getStripe } from "@/lib/stripe";
import { featuredProduct, productPath, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Order status",
  description: "Your TiniLearners order status.",
  robots: { index: false, follow: false },
};

async function Status({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const stripe = getStripe();
  let status: "complete" | "open" | "unknown" = "unknown";
  let email: string | null = null;

  if (stripe && session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      status = session.status === "complete" ? "complete" : session.status === "open" ? "open" : "unknown";
      email = session.customer_details?.email ?? null;
    } catch {
      status = "unknown";
    }
  }

  if (status === "complete") {
    return (
      <>
        <h1 className="ruled max-w-prose text-display font-extrabold text-primary">Thank you, you’re all set</h1>
        <p className="mt-6 max-w-prose text-lead">
          We’ve emailed your receipt and download link{email ? ` to ${email}` : ""}. Printed books ship to the address you entered.
        </p>
        <ButtonLink href="/shop" className="mt-8">Browse more books</ButtonLink>
      </>
    );
  }

  return (
    <>
      <h1 className="ruled max-w-prose text-display font-extrabold text-primary">Your payment didn’t go through</h1>
      <p className="mt-6 max-w-prose text-lead">
        No money was taken. Go back to the book and try checkout again, or email {siteConfig.email} and we’ll help.
      </p>
      <ButtonLink href={`${productPath(featuredProduct.slug)}#buy`} className="mt-8">Back to checkout</ButtonLink>
    </>
  );
}

export default function CheckoutCompletePage({ searchParams }: PageProps<"/checkout/complete">) {
  return (
    <Section tone="alt">
      <Suspense fallback={<p className="text-lead">Checking your order…</p>}>
        <Status searchParams={searchParams as Promise<{ session_id?: string }>} />
      </Suspense>
    </Section>
  );
}

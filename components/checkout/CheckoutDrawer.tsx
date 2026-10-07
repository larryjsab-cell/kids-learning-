"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js/pure";
import type { Stripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import type { OptionView } from "@/lib/checkout";

let stripePromise: Promise<Stripe | null> | null = null;
function getStripeJs() {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) return null;
  stripePromise ??= loadStripe(key);
  return stripePromise;
}

export function CheckoutDrawer({
  open,
  onClose,
  slug,
  productTitle,
  option,
  priceLabel,
}: {
  open: boolean;
  onClose: () => void;
  slug: string;
  productTitle: string;
  option: OptionView;
  priceLabel: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setError("");
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, option: option.id }),
    });
    const data = (await res.json().catch(() => ({}))) as { clientSecret?: string; error?: string };
    if (!res.ok || !data.clientSecret) {
      const message = data.error ?? "We couldn’t start checkout. Try again in a moment.";
      setError(message);
      throw new Error(message);
    }
    return data.clientSecret;
  }, [slug, option.id]);

  const stripe = open ? getStripeJs() : null;

  return (
    <dialog
      ref={ref}
      aria-labelledby="checkout-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="checkout-drawer m-0 ml-auto h-dvh max-h-dvh w-full max-w-lg overflow-hidden bg-surface p-0 text-ink backdrop:bg-ink/50 sm:border-l-2 sm:border-ink"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-start justify-between gap-4 border-b-2 border-ink/10 bg-surface-alt px-5 py-4 sm:px-6">
          <div>
            <h2 id="checkout-title" className="font-display text-h3">Checkout</h2>
            <p className="mt-1 text-small text-muted">
              {productTitle}, {option.label}: <strong className="text-ink">{priceLabel}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-surface shadow-sticker-sm transition-transform duration-150 hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-2 py-4 sm:px-4" aria-live="polite">
          {error || !stripe ? (
            <div role="alert" className="m-3 rounded-lg border-2 border-ink bg-coral-soft p-5">
              <p className="font-display text-lead font-bold">Checkout isn’t available right now</p>
              <p className="mt-2">
                {error ||
                  "Online payments aren’t switched on yet. Email tinilearners@gmail.com and we’ll sort your order by hand."}
              </p>
            </div>
          ) : (
            open && (
              <EmbeddedCheckoutProvider key={option.id} stripe={stripe} options={{ fetchClientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            )
          )}
        </div>
      </div>
    </dialog>
  );
}

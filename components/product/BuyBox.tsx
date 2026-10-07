"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { buttonClasses } from "@/components/ui/Button";
import dynamic from "next/dynamic";

// Stripe only loads once someone opens checkout.
const CheckoutDrawer = dynamic(
  () => import("@/components/checkout/CheckoutDrawer").then((m) => m.CheckoutDrawer),
  { ssr: false },
);
import { isPurchaseOption, type OptionView, type PurchaseOption } from "@/lib/checkout";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);

type Props = { slug: string; title: string; options: OptionView[] };

/** Deep links like ?plan=club#buy preselect an option. */
export function BuyBox(props: Props) {
  return (
    <Suspense fallback={<BuyBoxInner {...props} initial="pdf" />}>
      <BuyBoxFromUrl {...props} />
    </Suspense>
  );
}

function BuyBoxFromUrl(props: Props) {
  const plan = useSearchParams().get("plan");
  const initial: PurchaseOption = isPurchaseOption(plan) ? plan : "pdf";
  return <BuyBoxInner key={initial} {...props} initial={initial} />;
}

function BuyBoxInner({ slug, title, options, initial }: Props & { initial: PurchaseOption }) {
  const [selected, setSelected] = useState<PurchaseOption>(initial);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const option = options.find((o) => o.id === selected) ?? options[0];
  const priceLabel = `${fmt(option.price)}${option.recurring ? "/month" : ""}`;
  const cta =
    option.id === "club" ? `Join the Club for ${priceLabel}` : option.id === "print" ? `Order the book for ${priceLabel}` : `Buy the PDF for ${priceLabel}`;

  return (
    <>
      <fieldset>
        <legend className="font-display text-lead font-bold">Choose how you’d like it</legend>
        <div className="mt-3 space-y-3">
          {options.map((o) => (
            <label
              key={o.id}
              className="relative flex cursor-pointer gap-4 rounded-lg border-2 border-ink/25 bg-surface p-4 transition-[border-color,background-color] duration-150 hover:border-ink has-[:checked]:border-ink has-[:checked]:bg-accent-soft has-[:checked]:shadow-sticker-sm has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/40"
            >
              <input
                type="radio"
                name="purchase-option"
                value={o.id}
                checked={selected === o.id}
                onChange={() => setSelected(o.id)}
                className="mt-1 size-5 shrink-0 accent-primary focus-visible:outline-none"
              />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="font-semibold">
                    {o.label}
                    {o.recurring && (
                      <span className="ml-2 inline-block rounded-full bg-mint px-2 py-0.5 align-middle text-small font-semibold text-ink">
                        Best value
                      </span>
                    )}
                  </span>
                  <span className="font-display text-h3 tabular-nums text-primary">
                    {fmt(o.price)}
                    {o.recurring && <span className="text-body text-muted">/mo</span>}
                  </span>
                </span>
                <span className="mt-1 block text-small text-muted">{o.detail}</span>
                <span className="mt-1 block text-small font-medium">{o.priceNote}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button type="button" onClick={() => {
          setMounted(true);
          setOpen(true);
        }} className={buttonClasses("primary", "mt-6 w-full")}>
        {cta}
      </button>
      <p className="mt-3 text-center text-small text-muted">Secure payment by Stripe. The PDF is emailed as soon as you pay.</p>

      {mounted && (
        <CheckoutDrawer
          open={open}
          onClose={() => setOpen(false)}
          slug={slug}
          productTitle={title}
          option={option}
          priceLabel={priceLabel}
        />
      )}
    </>
  );
}

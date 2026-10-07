import { membership, type Product } from "@/lib/content";

export type PurchaseOption = "pdf" | "print" | "club";

export const PURCHASE_OPTIONS: PurchaseOption[] = ["pdf", "print", "club"];

export function isPurchaseOption(v: unknown): v is PurchaseOption {
  return typeof v === "string" && (PURCHASE_OPTIONS as string[]).includes(v);
}

export type OptionView = {
  id: PurchaseOption;
  label: string;
  price: number;
  priceNote: string;
  detail: string;
  recurring: boolean;
};

/** One list of buying options per product: its formats plus the Club. */
export function optionsFor(product: Product): OptionView[] {
  return [
    ...product.formats.map((f) => ({
      id: f.id as PurchaseOption,
      label: f.label,
      price: f.price,
      priceNote: f.priceNote,
      detail: f.detail,
      recurring: false,
    })),
    {
      id: "club",
      label: membership.label,
      price: membership.price,
      priceNote: `Per ${membership.interval}, cancel any time`,
      detail: membership.detail,
      recurring: true,
    },
  ];
}

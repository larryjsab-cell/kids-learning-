import site from "@/site.config.json";
import home from "@/content/home.json";
import catalog from "@/content/products.json";

export type BrandColor = "accent" | "mint" | "coral" | "primary";

export type Product = (typeof catalog.products)[number];
export type Membership = typeof catalog.membership;

export const siteConfig = site;
export const homeContent = home;
export const products: Product[] = catalog.products;
export const membership: Membership = catalog.membership;

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

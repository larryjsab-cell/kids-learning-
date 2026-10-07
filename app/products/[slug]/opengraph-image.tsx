import { ogCard, ogSize } from "@/lib/og";
import { getProduct, products } from "@/lib/content";

export const alt = "TiniLearners book";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  return ogCard({
    title: product?.title ?? "TiniLearners",
    subtitle: product ? `${product.tagline} ${product.ages}.` : "Learning books for ages 3 to 7",
  });
}

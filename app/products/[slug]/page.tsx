import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageStub } from "@/components/layout/PageStub";
import { getProduct, products } from "@/lib/content";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.title}: ${product.subtitle}`,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return (
    <div id="buy">
      <PageStub
        title={product.title}
        body={product.summary}
        links={[
          { href: "/shop", label: "Back to the shop" },
          { href: "/#free-sample", label: "Try a free sample pack" },
        ]}
      />
    </div>
  );
}

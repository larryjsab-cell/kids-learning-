import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductHero } from "@/components/product/ProductHero";
import { CompareTable } from "@/components/product/CompareTable";
import { MobileBuyBar } from "@/components/product/MobileBuyBar";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepList } from "@/components/ui/StepList";
import { ChecklistCard } from "@/components/ui/ChecklistCard";
import { FaqList } from "@/components/ui/FaqList";
import { MembershipBand } from "@/components/ui/MembershipBand";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { Photo } from "@/components/ui/Photo";
import { getProduct, products } from "@/lib/content";
import { optionsFor } from "@/lib/checkout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const title = `${product.title} | Letter tracing book for ${product.ages.toLowerCase()}`;
  return {
    title: { absolute: title },
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title, description: product.summary, url: `/products/${product.slug}`, type: "website" },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const options = optionsFor(product);

  return (
    <div className="pb-24 md:pb-0">
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Shop", path: "/shop" },
            { name: product.title, path: `/products/${product.slug}` },
          ]),
          faqSchema(product.faq),
        ]}
      />
      <ProductHero product={product} />

      <Section tone="deep" labelledBy="routine-title">
        <SectionHeading id="routine-title" title={product.routine.heading} intro={product.routine.intro} />
        <StepList steps={product.routine.steps} columns={4} />
      </Section>

      <Section labelledBy="outcomes-title">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="outcomes-title" title={product.outcomes.heading} />
            <Photo
              id="outcomes"
              ratio="4/3"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mt-8 -rotate-1 rounded-xl border-2 border-ink shadow-lift"
            />
          </div>
          <ChecklistCard items={product.outcomes.items} className="lg:col-span-7" />
        </div>
      </Section>

      <CompareTable heading={product.compare.heading} rows={product.compare.rows} options={options} />

      <MembershipBand
        heading="Get this book free with the Club"
        body="Club members get Alphabet Adventures and every other PDF in the library, plus each new release on the day it comes out."
        cta={{ label: "Join the Club", href: `/products/${product.slug}?plan=club#buy` }}
      />

      <Section labelledBy="product-faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="product-faq-title" className="text-h2 sm:text-display lg:col-span-4">
            Questions about {product.title}
          </h2>
          <div className="lg:col-span-8">
            <FaqList items={product.faq} />
          </div>
        </div>
      </Section>

      <RelatedPages
        links={[
          { href: "/shop", title: "Browse all books", body: "See every TiniLearners title for preschool to 1st grade." },
          { href: "/#free-sample", title: "Try free sample pages", body: "Print 5 favorite pages tonight before you buy." },
          { href: "/about", title: "How we design pages", body: "Why every activity is short and ends on a win." },
        ]}
      />

      <MobileBuyBar title={product.title} fromPrice={Math.min(...options.map((o) => o.price))} />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { ButtonLink } from "@/components/ui/Button";
import { MembershipBand } from "@/components/ui/MembershipBand";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { formatPrice, products } from "@/lib/content";
import shop from "@/content/shop.json";

export const metadata: Metadata = {
  title: shop.meta.title,
  description: shop.meta.description,
  alternates: { canonical: "/shop" },
  openGraph: { title: shop.meta.title, description: shop.meta.description, url: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <Section tone="alt" labelledBy="shop-title">
        <h1 id="shop-title" className="ruled max-w-prose text-display font-extrabold text-primary sm:text-display-lg">
          {shop.heading}
        </h1>
        <p className="mt-6 max-w-prose text-lead">{shop.intro}</p>

        <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const from = Math.min(...p.formats.map((f) => f.price));
            return (
              <li key={p.slug}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-ink bg-surface shadow-sticker transition-transform duration-150 hover:-translate-y-1">
                  <Placeholder prompt={p.gallery[0].prompt} alt={p.gallery[0].alt} ratio="4/3" className="border-b-2 border-ink" />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-small font-semibold text-muted">
                      {p.ages}, {p.pages} pages
                    </p>
                    <h2 className="mt-1 text-h3">
                      <Link href={`/products/${p.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-2 flex-1 text-muted">{p.subtitle}</p>
                    <p className="mt-4 font-display text-h3 tabular-nums text-primary">From {formatPrice(from)}</p>
                  </div>
                </article>
              </li>
            );
          })}

          <li>
            <div className="flex h-full flex-col justify-center rounded-xl border-2 border-dashed border-ink/40 p-8">
              <h2 className="text-h3">{shop.comingSoon.heading}</h2>
              <p className="mt-3 text-muted">{shop.comingSoon.body}</p>
              <ButtonLink href={shop.comingSoon.cta.href} variant="accent" className="mt-6 self-start">
                {shop.comingSoon.cta.label}
              </ButtonLink>
            </div>
          </li>
        </ul>
      </Section>

      <MembershipBand />

      <RelatedPages
        links={[
          { href: "/products/alphabet-adventures", title: "Look inside Alphabet Adventures", body: "See the 4-step routine every letter follows." },
          { href: "/about", title: "How we design pages", body: "Short activities that end on a win." },
          { href: "/#free-sample", title: "Free sample pages", body: "Try 5 pages at home before you buy." },
        ]}
      />
    </>
  );
}

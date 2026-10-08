import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Photo, type PhotoId } from "@/components/ui/Photo";
import { formatPrice, homeContent, membership, productPath, products } from "@/lib/content";

/** Every book in the catalog, alternating image side, with its buying options. */
export function ProductSpotlight() {
  const { spotlight } = homeContent;
  return (
    <Section tone="deep" labelledBy="spotlight-title" className="relative overflow-hidden">
      <SectionHeading id="spotlight-title" title={spotlight.heading} intro={spotlight.intro} />

      <ul className="mt-14 space-y-20 lg:space-y-28">
        {products.map((product, i) => (
          <li key={product.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className={`lg:col-span-6 ${i % 2 === 0 ? "lg:order-2" : ""}`}>
              <p className="font-display text-lead text-accent">
                {product.ages}, {product.pages} pages
              </p>
              <h3 className="mt-2 text-h2">{product.title}</h3>
              <p className="mt-5 max-w-prose text-lead text-primary-soft">{product.homeBlurb}</p>

              <dl className="mt-8 divide-y divide-white/15 rounded-lg border-2 border-white/20 tabular-nums">
                {product.formats.map((f) => (
                  <div key={f.id} className="flex items-baseline justify-between gap-4 px-5 py-4">
                    <dt>
                      <span className="font-semibold">{f.label}</span>
                      <span className="block text-small text-primary-soft">{f.priceNote}</span>
                    </dt>
                    <dd className="font-display text-h3 text-accent">{formatPrice(f.price)}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-4 px-5 py-4">
                  <dt>
                    <span className="font-semibold">{membership.name}</span>
                    <span className="block text-small text-primary-soft">Every PDF, including new releases</span>
                  </dt>
                  <dd className="font-display text-h3 text-accent">
                    {formatPrice(membership.price)}
                    <span className="text-body text-primary-soft">/{membership.interval}</span>
                  </dd>
                </div>
              </dl>

              <ButtonLink href={productPath(product.slug)} variant="accent" className="mt-8">
                {spotlight.cta} {product.shortTitle}
              </ButtonLink>
            </div>

            <div className="lg:col-span-6">
              <Photo
                id={product.cardImage as PhotoId}
                ratio="4/3"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`rounded-xl border-2 border-ink shadow-lift ${i % 2 === 0 ? "-rotate-2" : "rotate-2"}`}
              />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

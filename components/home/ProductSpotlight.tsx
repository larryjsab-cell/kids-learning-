import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { formatPrice, homeContent, membership, products } from "@/lib/content";

export function ProductSpotlight() {
  const { spotlight } = homeContent;
  const product = products[0];
  return (
    <Section tone="deep" labelledBy="spotlight-title" className="relative overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:order-2">
          <p className="font-display text-lead text-accent">{product.ages}</p>
          <h2 id="spotlight-title" className="mt-2 text-h2 sm:text-display">{spotlight.heading}</h2>
          <p className="mt-5 max-w-prose text-lead text-primary-soft">{spotlight.body}</p>

          <dl className="mt-8 tabular-nums divide-y divide-white/15 rounded-lg border-2 border-white/20">
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

          <ButtonLink href={spotlight.cta.href} variant="accent" className="mt-8">
            {spotlight.cta.label}
          </ButtonLink>
        </div>

        <div className="lg:col-span-6">
          <Placeholder
            prompt="Product shot of a spiral-bound children's alphabet workbook titled 'Alphabet Adventures' lying open on a bright surface, left page shows a big traceable letter B with dotted guides, right page shows a busy picture of bears and balloons to hunt for the letter, crayons scattered, grape purple and coral palette, soft shadows"
            alt="Alphabet Adventures open to the letter B pages"
            ratio="4/3"
            className="-rotate-2 rounded-xl border-2 border-ink shadow-lift"
          />
        </div>
      </div>
    </Section>
  );
}

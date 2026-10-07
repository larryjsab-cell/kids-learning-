import { Container } from "@/components/ui/Container";
import { Star } from "@/components/ui/Star";
import { Gallery } from "./Gallery";
import { BuyBox } from "./BuyBox";
import { optionsFor } from "@/lib/checkout";
import type { Product } from "@/lib/content";

export function ProductHero({ product }: { product: Product }) {
  return (
    <section id="buy" aria-labelledby="product-title" className="bg-surface-alt pb-16 pt-8 sm:pt-12 lg:pb-24">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6 lg:self-start lg:sticky lg:top-24">
          <Gallery shots={product.gallery} />
        </div>

        <div className="lg:col-span-6">
          <ul className="flex flex-wrap gap-2" aria-label="Suitable for">
            {product.grades.map((g) => (
              <li key={g} className="rounded-full border-2 border-ink bg-surface px-3 py-1 text-small font-semibold">
                {g}
              </li>
            ))}
            <li className="rounded-full border-2 border-ink bg-accent px-3 py-1 text-small font-semibold">{product.ages}</li>
          </ul>

          <h1 id="product-title" className="ruled mt-5 text-display font-extrabold text-primary sm:text-display-lg">
            {product.title}
          </h1>
          <p className="mt-4 font-display text-h3 text-ink">{product.tagline}</p>
          <p className="mt-4 max-w-prose text-lead">{product.summary}</p>

          <ul className="mt-6 space-y-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <Star className="mt-0.5 size-6 shrink-0 text-mint" />
                {h}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-small text-muted">
            {product.pages} pages. Skills: {product.skills.join(", ")}.
          </p>

          <div className="mt-8 rounded-xl border-2 border-ink bg-surface p-5 shadow-sticker sm:p-6">
            <BuyBox slug={product.slug} title={product.title} options={optionsFor(product)} />
          </div>
        </div>
      </Container>
    </section>
  );
}

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star } from "@/components/ui/Star";
import type { Product } from "@/lib/content";

/** The book's real table of contents with page counts, plus the grown-up tips printed inside it. */
export function BookContents({ product }: { product: Product }) {
  const { contents, tips } = product;
  return (
    <Section tone="alt" labelledBy="contents-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading id="contents-title" title={contents.heading} />
          <ol className="mt-8 rounded-xl border-2 border-ink bg-surface p-3 shadow-sticker sm:p-6">
            {contents.items.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-4 border-b-2 border-dashed border-line px-3 py-4 last:border-b-0"
              >
                <span>{item.name}</span>
                <span className="shrink-0 font-display text-lead font-bold tabular-nums text-primary">
                  {item.pages} {item.pages === 1 ? "page" : "pages"}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <aside aria-labelledby="tips-title" className="lg:col-span-5">
          <div className="rotate-1 rounded-xl border-2 border-ink bg-accent-soft p-6 shadow-sticker sm:p-8 lg:sticky lg:top-28">
            <h2 id="tips-title" className="text-h3">{tips.heading}</h2>
            <ul className="mt-5 space-y-3">
              {tips.items.map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <Star className="mt-0.5 size-5 shrink-0 text-coral" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}

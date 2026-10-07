import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star } from "@/components/ui/Star";
import { formatPrice } from "@/lib/content";
import type { OptionView } from "@/lib/checkout";

export function CompareTable({
  heading,
  rows,
  options,
}: {
  heading: string;
  rows: { label: string; values: boolean[] }[];
  options: OptionView[];
}) {
  return (
    <Section labelledBy="compare-title">
      <SectionHeading id="compare-title" title={heading} />
      <div className="relative mt-10 overflow-x-auto rounded-xl border-2 border-ink shadow-sticker" tabIndex={0} role="region" aria-label="Comparison table of buying options, scrolls sideways on small screens">
        <table className="w-full min-w-xl border-collapse text-left">
          <thead className="bg-primary-deep text-white">
            <tr>
              <th scope="col" className="px-4 py-4 font-display text-lead sm:px-6">
                <span className="sr-only">Feature</span>
              </th>
              {options.map((o) => (
                <th key={o.id} scope="col" className={`px-4 py-4 text-center sm:px-6 ${o.recurring ? "bg-primary" : ""}`}>
                  <span className="block font-display text-lead">{o.label}</span>
                  <span className="block tabular-nums text-accent">
                    {formatPrice(o.price)}
                    {o.recurring ? "/mo" : ""}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t-2 border-dashed border-line even:bg-surface-alt">
                <th scope="row" className="px-4 py-4 font-medium sm:px-6">{row.label}</th>
                {row.values.map((v, i) => (
                  <td key={i} className="px-4 py-4 text-center sm:px-6">
                    {v ? (
                      <>
                        <Star className="mx-auto size-6 text-mint" />
                        <span className="sr-only">Included</span>
                      </>
                    ) : (
                      <>
                        <span aria-hidden="true" className="text-h3 text-muted">–</span>
                        <span className="sr-only">Not included</span>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

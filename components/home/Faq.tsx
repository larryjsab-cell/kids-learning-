import { Section } from "@/components/ui/Section";
import { homeContent } from "@/lib/content";

export function Faq() {
  const { faq } = homeContent;
  return (
    <Section labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <h2 id="faq-title" className="text-h2 sm:text-display lg:col-span-4">{faq.heading}</h2>
        <div className="space-y-4 lg:col-span-8">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-lg border-2 border-ink bg-surface open:bg-surface-alt"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lead font-bold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-accent text-h3 leading-none transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-prose px-5 pb-5 text-ink">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

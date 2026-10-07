import { Section } from "@/components/ui/Section";
import { homeContent } from "@/lib/content";

const dots = ["bg-accent", "bg-mint", "bg-coral"];

export function HowItWorks() {
  const { howItWorks } = homeContent;
  return (
    <Section labelledBy="how-title">
      <h2 id="how-title" className="max-w-prose text-h2 sm:text-display">{howItWorks.heading}</h2>

      <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
        {/* dashed tracing path linking the steps */}
        <span
          aria-hidden="true"
          className="absolute left-7 top-7 bottom-7 border-l-4 border-dashed border-line md:inset-x-7 md:bottom-auto md:border-l-0 md:border-t-4"
        />
        {howItWorks.steps.map((step, i) => (
          <li key={step.title} className="relative pl-20 md:pl-0">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 flex size-14 items-center justify-center rounded-full border-2 border-ink font-display text-h3 font-extrabold shadow-sticker-sm md:static ${dots[i % dots.length]}`}
            >
              {i + 1}
            </span>
            <h3 className="text-h3 md:mt-6">{step.title}</h3>
            <p className="mt-3 max-w-sm text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

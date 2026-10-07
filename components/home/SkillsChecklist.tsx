import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Star } from "@/components/ui/Star";
import { homeContent } from "@/lib/content";

export function SkillsChecklist() {
  const { skills } = homeContent;
  return (
    <Section tone="alt" labelledBy="skills-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="skills-title" className="text-h2 sm:text-display">{skills.heading}</h2>
          <p className="mt-5 text-lead text-muted">{skills.intro}</p>
          <p className="mt-6">
            <Link
              href="/products/alphabet-adventures"
              className="font-semibold text-primary underline decoration-2 underline-offset-4 hover:decoration-coral"
            >
              See how Alphabet Adventures teaches letters and sounds
            </Link>
          </p>
        </div>

        <ul className="rounded-xl border-2 border-ink bg-surface p-3 shadow-sticker sm:p-6 lg:col-span-7">
          {skills.items.map((item) => (
            <li
              key={item.name}
              className="flex gap-4 border-b-2 border-dashed border-line px-3 py-5 last:border-b-0"
            >
              <Star className="mt-1 size-7 shrink-0 text-accent" />
              <div>
                <h3 className="font-display text-lead font-bold">{item.name}</h3>
                <p className="mt-1 text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChecklistCard } from "@/components/ui/ChecklistCard";
import { TextLink } from "@/components/ui/TextLink";
import { homeContent } from "@/lib/content";

export function SkillsChecklist() {
  const { skills } = homeContent;
  return (
    <Section tone="alt" labelledBy="skills-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="skills-title" title={skills.heading} intro={skills.intro} />
          <p className="mt-6">
            <TextLink href="/products/alphabet-adventures">See how Alphabet Adventures teaches letters and sounds</TextLink>
          </p>
        </div>
        <ChecklistCard items={skills.items} className="lg:col-span-7" />
      </div>
    </Section>
  );
}

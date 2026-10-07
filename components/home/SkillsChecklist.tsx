import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChecklistCard } from "@/components/ui/ChecklistCard";
import { TextLink } from "@/components/ui/TextLink";
import { featuredProduct, homeContent, productPath } from "@/lib/content";

export function SkillsChecklist() {
  const { skills } = homeContent;
  return (
    <Section tone="alt" labelledBy="skills-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="skills-title" title={skills.heading} intro={skills.intro} />
          <p className="mt-6">
            <TextLink href={productPath(featuredProduct.slug)}>See how {featuredProduct.shortTitle} practices these skills</TextLink>
          </p>
        </div>
        <ChecklistCard items={skills.items} className="lg:col-span-7" />
      </div>
    </Section>
  );
}

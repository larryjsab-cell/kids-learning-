import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepList } from "@/components/ui/StepList";
import { homeContent } from "@/lib/content";

export function HowItWorks() {
  const { howItWorks } = homeContent;
  return (
    <Section labelledBy="how-title">
      <SectionHeading id="how-title" title={howItWorks.heading} />
      <StepList steps={howItWorks.steps} />
    </Section>
  );
}

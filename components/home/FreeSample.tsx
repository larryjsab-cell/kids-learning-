import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { FreeSampleForm } from "./FreeSampleForm";
import { homeContent, siteConfig } from "@/lib/content";

export function FreeSample() {
  const { freeSample } = homeContent;
  return (
    <Section tone="alt" id="free-sample" labelledBy="sample-title">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="sample-title" className="ruled text-h2 text-primary sm:text-display">{freeSample.heading}</h2>
          <p className="mt-5 max-w-prose text-lead">{freeSample.body}</p>
          <div className="mt-8">
            <FreeSampleForm copy={freeSample} fallbackEmail={siteConfig.email} />
          </div>
        </div>
        <div className="lg:col-span-6">
          <Placeholder
            prompt="Five colorful printed worksheet pages fanned out on a table: letter tracing, counting apples to 10, a cut-along-the-line page, a rhyming match and a maze, with a pair of child safety scissors and crayons, top-down, bright natural light, grape purple, sunshine yellow, mint and coral palette"
            alt="Five free sample worksheet pages fanned out with crayons"
            ratio="4/3"
            className="rotate-1 rounded-xl border-2 border-ink shadow-lift"
          />
        </div>
      </div>
    </Section>
  );
}

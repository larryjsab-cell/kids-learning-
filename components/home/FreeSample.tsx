import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
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
          <Photo
            id="freeSample"
            ratio="4/3"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rotate-1 rounded-xl border-2 border-ink shadow-lift"
          />
        </div>
      </div>
    </Section>
  );
}

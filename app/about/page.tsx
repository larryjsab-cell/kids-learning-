import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChecklistCard } from "@/components/ui/ChecklistCard";
import { Placeholder } from "@/components/ui/Placeholder";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/lib/content";
import about from "@/content/about.json";

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
  alternates: { canonical: "/about" },
  openGraph: { title: about.meta.title, description: about.meta.description, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section tone="alt" labelledBy="about-title">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 id="about-title" className="ruled text-display font-extrabold text-primary sm:text-display-lg">
              {about.heading}
            </h1>
            <p className="mt-6 max-w-prose text-lead">{about.intro}</p>
          </div>
          <Placeholder
            prompt="A parent and a young child side by side at a sunny kitchen table working on a colorful printed activity page with crayons, view from slightly above, warm natural light, grape purple, sunshine yellow, mint and coral accents, candid"
            alt="A parent and child doing an activity page together"
            ratio="4/5"
            className="rotate-1 rounded-xl border-2 border-ink shadow-lift lg:col-span-5"
          />
        </div>
      </Section>

      <Section labelledBy="principles-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading id="principles-title" title={about.principlesHeading} className="lg:col-span-5" />
          <ChecklistCard items={about.principles} className="lg:col-span-7" />
        </div>
      </Section>

      <Section tone="deep" labelledBy="contact-title">
        <SectionHeading id="contact-title" title={about.contactHeading} intro={about.contactBody} />
        <a href={`mailto:${siteConfig.email}`} className={buttonClasses("accent", "mt-8")}>
          Email {siteConfig.email}
        </a>
      </Section>

      <RelatedPages
        links={[
          { href: "/products/alphabet-adventures", title: "Meet Alphabet Adventures", body: "Our A-to-Z tracing and phonics book for ages 3–6." },
          { href: "/shop", title: "Browse the shop", body: "Every book as a PDF or a printed copy." },
          { href: "/#free-sample", title: "Get free sample pages", body: "5 pages to print and try tonight." },
        ]}
      />
    </>
  );
}

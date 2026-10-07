import { Section } from "@/components/ui/Section";
import { FaqList } from "@/components/ui/FaqList";
import { TextLink } from "@/components/ui/TextLink";
import { homeContent } from "@/lib/content";

export function Faq() {
  const { faq } = homeContent;
  return (
    <Section labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="text-h2 sm:text-display">{faq.heading}</h2>
          <p className="mt-5">
            <TextLink href="/about">Read how we design every page</TextLink>
          </p>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={faq.items} />
        </div>
      </div>
    </Section>
  );
}

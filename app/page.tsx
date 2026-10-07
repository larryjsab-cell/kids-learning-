import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AgeBands } from "@/components/home/AgeBands";
import { ProductSpotlight } from "@/components/home/ProductSpotlight";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SkillsChecklist } from "@/components/home/SkillsChecklist";
import { MembershipBand } from "@/components/ui/MembershipBand";
import { FreeSample } from "@/components/home/FreeSample";
import { Faq } from "@/components/home/Faq";
import { homeContent } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: homeContent.meta.title },
  description: homeContent.meta.description,
  alternates: { canonical: "/" },
  openGraph: { title: homeContent.meta.title, description: homeContent.meta.description, url: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AgeBands />
      <ProductSpotlight />
      <HowItWorks />
      <SkillsChecklist />
      <MembershipBand />
      <FreeSample />
      <Faq />
    </>
  );
}

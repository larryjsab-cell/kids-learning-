import type { Metadata } from "next";
import { PageStub } from "@/components/layout/PageStub";

export const metadata: Metadata = {
  title: "About TiniLearners",
  description: "Why TiniLearners makes short, playful learning books and printables for children from preschool to 1st grade.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageStub
      title="About TiniLearners"
      body="We make learning books and printables that fit into 15 minutes at the kitchen table."
      links={[
        { href: "/shop", label: "Browse the shop" },
        { href: "/products/alphabet-adventures", label: "Meet Alphabet Adventures" },
      ]}
    />
  );
}

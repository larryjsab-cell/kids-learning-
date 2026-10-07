import type { Metadata } from "next";
import { PageStub } from "@/components/layout/PageStub";

export const metadata: Metadata = {
  title: "Shop learning books and printable PDFs",
  description: "Browse TiniLearners learning books and printable PDFs for preschool, pre-K, kindergarten and 1st grade.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <PageStub
      title="Shop"
      body="Every TiniLearners book, sorted by age and skill. Start with our first title, Alphabet Adventures."
      links={[
        { href: "/products/alphabet-adventures", label: "Alphabet Adventures, ages 3–6" },
        { href: "/#free-sample", label: "Try a free sample pack first" },
      ]}
    />
  );
}

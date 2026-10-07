import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";

export default function NotFound() {
  return (
    <Section tone="alt">
      <p aria-hidden="true" className="font-display text-giant font-extrabold text-coral">404</p>
      <h1 className="ruled mt-2 max-w-prose text-display font-extrabold text-primary">This page wandered off</h1>
      <p className="mt-6 max-w-prose text-lead">
        We couldn’t find that page. It may have moved, or the link has a typo. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <ButtonLink href="/">Go to the home page</ButtonLink>
        <TextLink href="/shop">Browse the shop</TextLink>
        <TextLink href="/products/alphabet-adventures">See Alphabet Adventures</TextLink>
      </div>
    </Section>
  );
}

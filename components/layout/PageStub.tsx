import Link from "next/link";
import { Section } from "@/components/ui/Section";

/** Temporary page body until Phase 3 builds the real page. */
export function PageStub({ title, body, links }: { title: string; body: string; links: { href: string; label: string }[] }) {
  return (
    <Section tone="alt">
      <h1 className="ruled max-w-prose text-display text-primary">{title}</h1>
      <p className="mt-6 max-w-prose text-lead">{body}</p>
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-11 items-center font-semibold text-primary underline decoration-2 underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

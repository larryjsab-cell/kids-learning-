import Link from "next/link";
import { Section } from "./Section";

export type RelatedLink = { href: string; title: string; body: string };

/** Contextual cross-links at the end of every page. */
export function RelatedPages({ heading = "Keep exploring", links }: { heading?: string; links: RelatedLink[] }) {
  return (
    <Section tone="alt" labelledBy="related-title">
      <h2 id="related-title" className="text-h2">{heading}</h2>
      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex h-full flex-col rounded-lg border-2 border-ink bg-surface p-6 transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-sticker"
            >
              <span className="font-display text-h3 text-primary group-hover:underline group-hover:decoration-coral group-hover:underline-offset-4">
                {l.title}
              </span>
              <span className="mt-2 text-muted">{l.body}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { siteConfig } from "@/lib/content";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="bg-primary-deep pb-10 pt-16 text-white">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark tone="light" />
            <p className="mt-4 max-w-sm text-primary-soft">{siteConfig.tagline}.</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="font-display text-lead text-accent">Explore</h2>
            <ul className="mt-3 space-y-1">
              <li><Link className="inline-flex min-h-11 items-center hover:underline" href="/">Home</Link></li>
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link className="inline-flex min-h-11 items-center hover:underline" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li><Link className="inline-flex min-h-11 items-center hover:underline" href="/#free-sample">Free sample pack</Link></li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-display text-lead text-accent">Say hello</h2>
            <address className="mt-3 not-italic">
              <p>
                <a className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </p>
              <p className="text-primary-soft">{siteConfig.serviceArea}.</p>
            </address>
          </div>
        </div>

        <p className="mt-14 border-t border-white/15 pt-6 text-small text-primary-soft">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

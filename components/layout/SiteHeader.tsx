"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerId = useId();

  // Close the drawer whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isCurrent = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/10 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 w-full max-w-page items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Wordmark />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="inline-flex min-h-11 items-center rounded-full px-4 font-medium text-ink transition-colors duration-150 hover:bg-primary-soft aria-[current=page]:bg-primary-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <Link href={siteConfig.navCta.href} className={buttonClasses("accent", "min-h-11 px-5 py-2 text-body")}>
                {siteConfig.navCta.label}
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex size-12 items-center justify-center rounded-full border-2 border-ink bg-accent shadow-sticker-sm md:hidden"
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
            <path
              d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>
      </div>

      <div
        id={drawerId}
        hidden={!open}
        className="max-h-dvh overflow-y-auto overscroll-contain border-t-2 border-ink/10 bg-surface md:hidden"
      >
        <nav aria-label="Mobile" className="px-5 pb-8 pt-4 sm:px-8">
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-md px-3 font-display text-h3 font-bold hover:bg-primary-soft aria-[current=page]:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={siteConfig.navCta.href}
            onClick={() => setOpen(false)}
            className={buttonClasses("accent", "mt-6 w-full")}
          >
            {siteConfig.navCta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}

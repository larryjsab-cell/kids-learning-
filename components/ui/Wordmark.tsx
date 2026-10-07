import Link from "next/link";
import { Star } from "./Star";
import { siteConfig } from "@/lib/content";

export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      translate="no"
      className="group inline-flex min-h-11 items-center gap-1.5 font-display text-h3 font-bold leading-none"
    >
      <Star className="size-7 text-accent transition-transform duration-300 ease-bounce group-hover:rotate-45" />
      <span className={tone === "dark" ? "text-primary" : "text-accent"}>Tini</span>
      <span className={`-ml-1.5 ${tone === "dark" ? "text-ink" : "text-white"}`}>Learners</span>
    </Link>
  );
}

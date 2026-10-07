import Link from "next/link";
import type { ReactNode } from "react";

export function TextLink({ href, children, tone = "dark" }: { href: string; children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <Link
      href={href}
      className={`font-semibold underline decoration-2 underline-offset-4 transition-colors duration-150 hover:decoration-coral ${
        tone === "dark" ? "text-primary" : "text-accent"
      }`}
    >
      {children}
    </Link>
  );
}

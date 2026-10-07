import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary: "bg-primary text-white",
  accent: "bg-accent text-ink",
  light: "bg-surface text-ink",
  outline: "bg-transparent text-ink ring-2 ring-inset ring-ink shadow-none",
} as const;

export type ButtonVariant = keyof typeof variants;

export const buttonClasses = (variant: ButtonVariant = "primary", extra = "") =>
  [
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3",
    "font-display text-lead font-bold leading-none",
    "border-2 border-ink shadow-sticker",
    "transition-[transform,box-shadow] duration-150 ease-out",
    "hover:-translate-y-0.5 active:translate-y-1 active:shadow-none",
    "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
    variants[variant],
    extra,
  ].join(" ");

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}

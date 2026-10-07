import type { ReactNode } from "react";
import { Container } from "./Container";

const tones = {
  surface: "bg-surface text-ink",
  alt: "bg-surface-alt text-ink",
  deep: "bg-primary-deep text-white",
  accent: "bg-accent text-ink",
} as const;

export function Section({
  children,
  tone = "surface",
  id,
  labelledBy,
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  id?: string;
  labelledBy?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-16 sm:py-20 lg:py-28 ${tones[tone]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

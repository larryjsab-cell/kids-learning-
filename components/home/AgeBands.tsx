import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { homeContent, type BrandColor } from "@/lib/content";

const fills: Record<BrandColor, string> = {
  accent: "bg-accent text-ink",
  mint: "bg-mint text-ink",
  coral: "bg-coral text-ink",
  primary: "bg-primary text-white",
};

export function AgeBands() {
  const { ageBands } = homeContent;
  return (
    <Section labelledBy="ages-title">
      <div className="max-w-prose">
        <h2 id="ages-title" className="text-h2 sm:text-display">{ageBands.heading}</h2>
        <p className="mt-4 text-lead text-muted">{ageBands.intro}</p>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ageBands.bands.map((band, i) => (
          <li
            key={band.grade}
            className={`flex flex-col rounded-lg border-2 border-ink p-6 shadow-sticker ${fills[band.color as BrandColor]} ${
              i % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-1 lg:translate-y-4"
            }`}
          >
            <p className="text-small font-semibold opacity-90">{band.ages}</p>
            <h3 className="mt-1 text-h3">{band.grade}</h3>
            <ul className="mt-4 flex-1 space-y-2">
              {band.focus.map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-current" />
                  {f}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <p className="mt-14 text-lead">
        <Link href="/shop" className="font-semibold text-primary underline decoration-2 underline-offset-4 hover:decoration-coral">
          Browse every book in the shop
        </Link>
      </p>
    </Section>
  );
}

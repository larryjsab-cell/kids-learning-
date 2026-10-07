import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { Star } from "@/components/ui/Star";
import { TraceLetter } from "./TraceLetter";
import { homeContent } from "@/lib/content";

export function Hero() {
  const { hero } = homeContent;
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-surface-alt pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-20">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="ruled text-display font-extrabold text-primary sm:text-display-lg"
          >
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-prose text-lead text-ink">{hero.body}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="light">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <ul className="mt-10 grid gap-3 text-ink sm:grid-cols-3 sm:gap-4">
            {hero.assurances.map((line) => (
              <li key={line} className="flex items-start gap-2 text-small font-medium">
                <Star className="mt-0.5 size-5 shrink-0 text-mint" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <Placeholder
            prompt={hero.image.prompt}
            alt={hero.image.alt}
            ratio="4/5"
            className="rounded-xl border-2 border-ink shadow-lift"
          />
          <TraceLetter
            letter={hero.traceLetter}
            className="absolute -bottom-8 -left-4 w-36 -rotate-6 rounded-lg border-2 border-ink shadow-sticker sm:-left-10 sm:w-48"
          />
          <Star className="absolute -right-3 -top-5 size-14 animate-pop text-accent sm:size-16" />
        </div>
      </Container>
    </section>
  );
}

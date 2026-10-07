import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Star } from "@/components/ui/Star";
import { formatPrice, homeContent, membership } from "@/lib/content";

export function MembershipBand() {
  const content = homeContent.membership;
  return (
    <Section tone="accent" labelledBy="club-title">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="club-title" className="text-h2 sm:text-display">{content.heading}</h2>
          <p className="mt-5 max-w-prose text-lead">{content.body}</p>
          <ul className="mt-6 space-y-3">
            {membership.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 font-medium">
                <Star className="mt-0.5 size-6 shrink-0 text-surface" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border-2 border-ink bg-surface p-8 text-center shadow-sticker lg:col-span-5 lg:rotate-2">
          <p className="font-display text-lead font-bold text-primary">{membership.name}</p>
          <p className="mt-2 font-display text-giant font-extrabold text-ink">
            {formatPrice(membership.price)}
          </p>
          <p className="text-muted">per {membership.interval}, cancel any time</p>
          <ButtonLink href={content.cta.href} className="mt-6 w-full">
            {content.cta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

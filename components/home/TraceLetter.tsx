/**
 * The site's signature moment: a letter on handwriting paper that traces
 * itself once on load, then fills in. Purely decorative.
 */
export function TraceLetter({ letter, className = "" }: { letter: string; className?: string }) {
  return (
    <svg viewBox="0 0 300 300" aria-hidden="true" className={className}>
      <rect width="300" height="300" rx="28" fill="var(--color-surface)" />
      <line x1="24" x2="276" y1="78" y2="78" stroke="var(--color-line)" strokeWidth="3" />
      <line x1="24" x2="276" y1="160" y2="160" stroke="var(--color-line)" strokeWidth="3" strokeDasharray="14 12" />
      <line x1="24" x2="276" y1="242" y2="242" stroke="var(--color-coral)" strokeOpacity=".6" strokeWidth="4" />
      {/* dotted guide to trace over */}
      <text
        x="150"
        y="242"
        textAnchor="middle"
        fontSize="250"
        fontWeight="700"
        fontFamily="var(--font-display)"
        fill="none"
        stroke="var(--color-primary-soft)"
        strokeWidth="5"
        strokeDasharray="2 12"
        strokeLinecap="round"
      >
        {letter}
      </text>
      {/* the trace itself */}
      <text
        x="150"
        y="242"
        textAnchor="middle"
        fontSize="250"
        fontWeight="700"
        fontFamily="var(--font-display)"
        fill="var(--color-accent)"
        stroke="var(--color-primary)"
        strokeWidth="7"
        strokeLinejoin="round"
        strokeDasharray="2000"
        className="trace-draw"
      >
        {letter}
      </text>
    </svg>
  );
}

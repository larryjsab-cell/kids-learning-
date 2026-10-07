export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 1.8l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 16.7l-6.1 3.5 1.5-6.8L2.2 8.8l6.9-.7z"
        stroke="var(--color-ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const dots = ["bg-accent", "bg-mint", "bg-coral", "bg-primary-soft"];

/** A real sequence: numbered steps joined by a dashed "tracing" path. */
export function StepList({ steps, columns = 3 }: { steps: { title: string; body: string }[]; columns?: 3 | 4 }) {
  return (
    <ol className={`relative mt-14 grid gap-12 md:gap-8 ${columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
      <span
        aria-hidden="true"
        className={`absolute bottom-7 left-7 top-7 border-l-4 border-dashed border-line ${
          columns === 4 ? "lg:inset-x-7 lg:bottom-auto lg:border-l-0 lg:border-t-4 md:hidden lg:block" : "md:inset-x-7 md:bottom-auto md:border-l-0 md:border-t-4"
        }`}
      />
      {steps.map((step, i) => (
        <li key={step.title} className={`relative pl-20 ${columns === 4 ? "md:pl-20 lg:pl-0" : "md:pl-0"}`}>
          <span
            aria-hidden="true"
            className={`absolute left-0 top-0 flex size-14 items-center justify-center rounded-full border-2 border-ink font-display text-h3 font-extrabold text-ink shadow-sticker-sm ${
              columns === 4 ? "lg:static" : "md:static"
            } ${dots[i % dots.length]}`}
          >
            {i + 1}
          </span>
          <h3 className={`text-h3 ${columns === 4 ? "lg:mt-6" : "md:mt-6"}`}>{step.title}</h3>
          <p className="mt-3 max-w-sm opacity-85">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function SectionHeading({
  id,
  title,
  intro,
  ruled = false,
  className = "",
}: {
  id: string;
  title: string;
  intro?: string;
  ruled?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-prose ${className}`}>
      <h2 id={id} className={`text-h2 sm:text-display ${ruled ? "ruled text-primary" : ""}`}>
        {title}
      </h2>
      {intro && <p className="mt-4 text-lead opacity-85">{intro}</p>}
    </div>
  );
}

/**
 * Typed image placeholder. Phase 6 inventories every [data-placeholder]
 * and replaces it with a generated next/image using `prompt`.
 */
export function Placeholder({
  prompt,
  alt,
  ratio = "4/3",
  className = "",
  thumb = false,
}: {
  prompt: string;
  alt: string;
  ratio?: "1/1" | "4/3" | "3/4" | "4/5" | "16/9" | "3/2";
  className?: string;
  /** Small preview: no caption, decorative. */
  thumb?: boolean;
}) {
  const aspect = {
    "1/1": "aspect-square",
    "4/3": "aspect-4/3",
    "3/4": "aspect-3/4",
    "4/5": "aspect-4/5",
    "16/9": "aspect-video",
    "3/2": "aspect-3/2",
  }[ratio];

  return (
    <div
      role={thumb ? undefined : "img"}
      aria-label={thumb ? undefined : alt}
      aria-hidden={thumb || undefined}
      data-placeholder
      data-prompt={prompt}
      className={`relative overflow-hidden bg-primary-soft ${aspect} ${className}`}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-primary/15">
        <defs>
          <pattern id="ph-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ph-dots)" />
      </svg>
      {!thumb && <p className="absolute inset-x-4 top-4 rounded-sm bg-surface/90 px-3 py-2 text-small text-muted">
        Image: {alt}
      </p>}
    </div>
  );
}

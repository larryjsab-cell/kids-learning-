"use client";

import { useState } from "react";
import { Photo, type PhotoId } from "@/components/ui/Photo";
import images from "@/content/images.json";

export function Gallery({ shots }: { shots: { image: string }[] }) {
  const [active, setActive] = useState(0);
  const ids = shots.map((s) => s.image as PhotoId);
  return (
    <div className="mx-auto max-w-lg">
      <Photo
        key={ids[active]}
        id={ids[active]}
        ratio="letter"
        priority={active === 0}
        sizes="(min-width: 1024px) 32rem, 100vw"
        className="rounded-lg border-2 border-ink bg-surface shadow-lift"
      />
      <ul className="mt-4 grid grid-cols-6 gap-2 sm:gap-3" aria-label="Pages from the book">
        {ids.map((id, i) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show page ${i + 1}: ${images[id].alt}`}
              aria-pressed={i === active}
              className="block w-full overflow-hidden rounded-md border-2 border-ink/25 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink aria-pressed:border-ink aria-pressed:shadow-sticker-sm"
            >
              <Photo id={id} ratio="letter" decorative sizes="(min-width: 1024px) 5rem, 16vw" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Photo, type PhotoId } from "@/components/ui/Photo";
import images from "@/content/images.json";

export function Gallery({ shots }: { shots: { image: string }[] }) {
  const [active, setActive] = useState(0);
  const ids = shots.map((s) => s.image as PhotoId);
  return (
    <div>
      <Photo
        key={ids[active]}
        id={ids[active]}
        ratio="1/1"
        priority={active === 0}
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="rounded-xl border-2 border-ink shadow-lift"
      />
      <ul className="mt-4 grid grid-cols-4 gap-3" aria-label="Product images">
        {ids.map((id, i) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}: ${images[id].alt}`}
              aria-pressed={i === active}
              className="block w-full overflow-hidden rounded-md border-2 border-ink/25 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink aria-pressed:border-ink aria-pressed:shadow-sticker-sm"
            >
              <Photo id={id} ratio="1/1" decorative sizes="(min-width: 1024px) 10vw, 22vw" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

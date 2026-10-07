"use client";

import { useState } from "react";
import { Placeholder } from "@/components/ui/Placeholder";

type Shot = { alt: string; prompt: string };

export function Gallery({ shots }: { shots: Shot[] }) {
  const [active, setActive] = useState(0);
  const current = shots[active];
  return (
    <div>
      <Placeholder
        key={active}
        prompt={current.prompt}
        alt={current.alt}
        ratio="1/1"
        className="rounded-xl border-2 border-ink shadow-lift"
      />
      <ul className="mt-4 grid grid-cols-4 gap-3" aria-label="Product images">
        {shots.map((shot, i) => (
          <li key={shot.alt}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}: ${shot.alt}`}
              aria-pressed={i === active}
              className="block w-full overflow-hidden rounded-md border-2 border-ink/25 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink aria-pressed:border-ink aria-pressed:shadow-sticker-sm"
            >
              <Placeholder prompt={shot.prompt} alt="" ratio="1/1" thumb />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

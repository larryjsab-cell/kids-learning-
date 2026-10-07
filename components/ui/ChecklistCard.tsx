import { Star } from "./Star";

/** Skills list styled as a ruled worksheet. */
export function ChecklistCard({ items, className = "" }: { items: { name: string; body: string }[]; className?: string }) {
  return (
    <ul className={`rounded-xl border-2 border-ink bg-surface p-3 text-ink shadow-sticker sm:p-6 ${className}`}>
      {items.map((item) => (
        <li key={item.name} className="flex gap-4 border-b-2 border-dashed border-line px-3 py-5 last:border-b-0">
          <Star className="mt-1 size-7 shrink-0 text-accent" />
          <div>
            <h3 className="font-display text-lead font-bold">{item.name}</h3>
            <p className="mt-1 text-muted">{item.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { formatPrice } from "@/lib/content";

/** Keeps the price and a way back to the buy box in reach on small screens. */
export function MobileBuyBar({ title, fromPrice }: { title: string; fromPrice: number }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-ink bg-surface/95 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between gap-4">
        <p className="min-w-0 text-small">
          <span className="block truncate font-semibold">{title}</span>
          <span className="text-muted">From {formatPrice(fromPrice)}</span>
        </p>
        <Link href="#buy" className={buttonClasses("primary", "min-h-11 shrink-0 px-5 py-2 text-body")}>
          Choose an option
        </Link>
      </div>
    </div>
  );
}

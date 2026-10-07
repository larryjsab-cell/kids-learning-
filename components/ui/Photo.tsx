import Image from "next/image";
import images from "@/content/images.json";

export type PhotoId = keyof typeof images;

const aspect = {
  "1/1": "aspect-square",
  "4/3": "aspect-4/3",
  "4/5": "aspect-4/5",
  /** US Letter page (8.5 × 11), for book page previews. */
  letter: "aspect-17/22",
} as const;

/** A site photo from content/images.json, cropped to a fixed ratio so layout never shifts. */
export function Photo({
  id,
  sizes,
  ratio,
  priority = false,
  decorative = false,
  className = "",
}: {
  id: PhotoId;
  sizes: string;
  ratio: keyof typeof aspect;
  priority?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  const img = images[id];
  return (
    <div className={`relative overflow-hidden bg-primary-soft ${aspect[ratio]} ${className}`}>
      <Image
        src={img.src}
        alt={decorative ? "" : img.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

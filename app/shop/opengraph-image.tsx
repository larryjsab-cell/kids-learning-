import { ogCard, ogSize } from "@/lib/og";

export const alt = "Shop TiniLearners learning books and printable PDFs";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return ogCard({ title: "Books and printables", subtitle: "Instant PDFs or printed books, for ages 3 to 7" });
}

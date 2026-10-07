import { ogCard, ogSize } from "@/lib/og";

export const alt = "About TiniLearners";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return ogCard({ title: "Learning that fits in 15 minutes", subtitle: "Why every TiniLearners page is short and ends on a win" });
}

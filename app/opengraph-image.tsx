import { ogCard, ogSize } from "@/lib/og";

export const alt = "TiniLearners: learning books and printables for ages 3 to 7";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return ogCard({ title: "Little hands, big leaps.", subtitle: "Learning books and printable PDFs for preschool to 1st grade" });
}

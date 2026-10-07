import { ImageResponse } from "next/og";

export const alt = "TiniLearners: learning books and printables for ages 3 to 7";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#e7f0ff",
          color: "#1f1638",
        }}
      >
        <div style={{ fontSize: 44, color: "#4b2bb3", fontWeight: 700 }}>TiniLearners</div>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05, marginTop: 24 }}>Little hands, big leaps.</div>
        <div style={{ fontSize: 34, marginTop: 28, color: "#5c5470" }}>
          Learning books and printable PDFs for preschool to 1st grade
        </div>
      </div>
    ),
    size,
  );
}

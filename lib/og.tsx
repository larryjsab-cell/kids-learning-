import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared social card: brand, page title, one line of context. */
export function ogCard({ title, subtitle }: { title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#e7f0ff",
          color: "#1f1638",
          borderBottom: "24px solid #ffc93c",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
          <span style={{ color: "#4b2bb3" }}>Tini</span>
          <span>Learners</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, color: "#4b2bb3" }}>{title}</div>
          <div style={{ fontSize: 34, marginTop: 24, color: "#5c5470" }}>{subtitle}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}

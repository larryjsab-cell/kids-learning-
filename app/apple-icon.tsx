import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#4b2bb3" }}>
        <svg width="130" height="130" viewBox="0 0 64 64">
          <path
            d="M32 8l6.6 14.3 15.6 1.6-11.8 10.5 3.4 15.4L32 41.9l-13.8 7.9 3.4-15.4L9.8 23.9l15.6-1.6z"
            fill="#ffc93c"
            stroke="#1f1638"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}

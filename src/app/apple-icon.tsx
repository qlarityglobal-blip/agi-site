import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a1930",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "sans-serif",
            fontSize: 92,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -4,
          }}
        >
          A
          <span style={{ color: "#14a5c0" }}>G</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

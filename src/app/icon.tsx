import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -1,
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

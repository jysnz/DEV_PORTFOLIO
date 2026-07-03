import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jayson Dela Cruz | Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          backgroundColor: "#F5F1E8",
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(58,58,58,0.07) 31px, rgba(58,58,58,0.07) 32px)",
          backgroundSize: "100% 32px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Red margin line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 60,
            width: 1,
            backgroundColor: "rgba(192, 57, 43, 0.3)",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#3A3A3A",
            lineHeight: 0.95,
            marginBottom: 24,
          }}
        >
          Jayson Dela Cruz
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#5C5850",
            lineHeight: 1.4,
            maxWidth: 700,
          }}
        >
          A 4th-year information technology student. An aspiring full-stack developer.
        </div>

        {/* Accent line */}
        <div
          style={{
            marginTop: 40,
            width: 120,
            height: 4,
            backgroundColor: "#C0392B",
            borderRadius: 2,
          }}
        />

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            right: 80,
            fontSize: 20,
            color: "#5C5850",
            fontWeight: 500,
          }}
        >
          jysnz.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}

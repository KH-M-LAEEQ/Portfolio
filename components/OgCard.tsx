import { ImageResponse } from "next/og";
import { profile } from "@/data/cv";

// Shared 1200x630 social card used by both app/opengraph-image.tsx and
// app/twitter-image.tsx. Satori only supports flexbox + a subset of CSS, so
// every container that holds more than one child sets `display: "flex"`.

export const ogAlt = `${profile.name} — ${profile.title}`;
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const highlights = ["Agentic AI", "LLM Applications", "Full-Stack", "Next.js"];

export function renderOgCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "84px",
          background: "#f6f4ef",
          backgroundImage:
            "radial-gradient(1000px 520px at 100% 0%, rgba(138,100,23,0.10), transparent 60%)",
          color: "#1a1a1a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            color: "#69665f",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 40,
              height: 6,
              borderRadius: 3,
              background: "#8a6417",
            }}
          />
          khawajalaeeq.me
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 44 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -1.5,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 42,
              fontWeight: 600,
              color: "#8a6417",
              marginTop: 22,
            }}
          >
            {profile.title}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 52 }}>
          {highlights.map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                fontSize: 24,
                color: "#1a1a1a",
                border: "1px solid #e0dbd0",
                background: "#ffffff",
                padding: "10px 20px",
                borderRadius: 10,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...ogSize },
  );
}

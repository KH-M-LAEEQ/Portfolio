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
          background: "#0f172a",
          backgroundImage:
            "radial-gradient(1100px 560px at 8% -10%, rgba(99,102,241,0.30), transparent 60%), radial-gradient(900px 520px at 108% 118%, rgba(6,182,212,0.22), transparent 55%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            color: "#94a3b8",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 40,
              height: 6,
              borderRadius: 3,
              background: "linear-gradient(90deg, #6366f1, #06b6d4)",
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
              color: "#a5b4fc",
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
                color: "#cbd5e1",
                border: "1px solid #334155",
                background: "rgba(255,255,255,0.03)",
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

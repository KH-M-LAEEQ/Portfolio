import type { Metadata } from "next";
import { profile } from "@/data/cv";

// Single source of truth for the canonical origin and the metadata every
// route shares. Next.js merges `openGraph`/`twitter` shallowly, so pages that
// override them spread these bases to keep siteName, locale, etc.

export const SITE_URL = "https://khawajalaeeq.me";
export const SITE_NAME = profile.name;
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SITE_TITLE = `${profile.name} | Full-Stack & AI Developer`;

export const SITE_DESCRIPTION =
  "Portfolio of Khawaja Muhammad Laeeq, a Computer Science student and Full-Stack & AI Developer building web, mobile, and AI-powered applications with Python, Django, React, Next.js, Flutter, and Java.";

export const SITE_KEYWORDS = [
  "Khawaja Muhammad Laeeq",
  "Khawaja Laeeq",
  "Full-Stack Developer",
  "Agentic AI Developer",
  "AI Engineer",
  "LLM Applications",
  "RAG",
  "Next.js Developer",
  "React Developer",
  "Django Developer",
  "Python Developer",
  "Flutter Developer",
  "Software Engineer Lahore",
  "Developer Portfolio Pakistan",
];

// The generated card from app/opengraph-image.tsx. A page that sets its own
// `openGraph`/`twitter` loses the root's file-based image, so subpages pass
// this explicitly.
export const defaultSocialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${profile.name} — ${profile.title}`,
};

export const baseOpenGraph = {
  type: "website",
  siteName: SITE_NAME,
  locale: "en_US",
} satisfies NonNullable<Metadata["openGraph"]>;

export const baseTwitter = {
  card: "summary_large_image",
} satisfies NonNullable<Metadata["twitter"]>;

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import JsonLd from "@/components/JsonLd";
import { profile } from "@/data/cv";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://khawajalaeeq.me";
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const SITE_DESCRIPTION =
  "Portfolio of Khawaja Muhammad Laeeq, a Computer Science student and Full-Stack & AI Developer building web, mobile, and AI-powered applications with Python, Django, React, Next.js, Flutter, and Java.";

const personAndWebsiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: profile.name,
      alternateName: "Khawaja Laeeq",
      url: SITE_URL,
      jobTitle: profile.title,
      description: profile.summary,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Central Punjab (UCP)",
      },
      knowsAbout: [
        "Full-Stack Development",
        "Agentic AI",
        "LLM Applications",
        "Python",
        "React",
        "Next.js",
        "Django",
        "FastAPI",
        "Flutter",
        "AWS",
      ],
      sameAs: [profile.github, profile.linkedin, profile.medium],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: profile.name,
      description: SITE_DESCRIPTION,
      publisher: { "@id": PERSON_ID },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Khawaja Muhammad Laeeq | Full-Stack & AI Developer",
    template: "%s | Khawaja Muhammad Laeeq",
  },

  description: SITE_DESCRIPTION,

  authors: [
    {
      name: "Khawaja Muhammad Laeeq",
    },
  ],

  creator: "Khawaja Muhammad Laeeq",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Khawaja Muhammad Laeeq | Full-Stack & AI Developer",
    description:
      "Portfolio of Khawaja Muhammad Laeeq — Full-Stack & AI Developer building web, mobile, and AI-powered applications.",
    siteName: "Khawaja Muhammad Laeeq",
    locale: "en_US",
    // Card image is supplied by app/opengraph-image.tsx.
  },

  twitter: {
    card: "summary_large_image",
    title: "Khawaja Muhammad Laeeq | Full-Stack & AI Developer",
    description:
      "Portfolio of Khawaja Muhammad Laeeq — Full-Stack & AI Developer building web, mobile, and AI-powered applications.",
    // Card image is supplied by app/twitter-image.tsx.
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={personAndWebsiteJsonLd} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}

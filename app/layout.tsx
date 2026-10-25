import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import JsonLd from "@/components/JsonLd";
import { profile } from "@/data/cv";
import {
  PERSON_ID,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  WEBSITE_ID,
  absoluteUrl,
  baseOpenGraph,
  baseTwitter,
} from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SOCIAL_DESCRIPTION =
  "Portfolio of Khawaja Muhammad Laeeq — Full-Stack & AI Developer building web, mobile, and AI-powered applications.";

const personAndWebsiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: profile.name,
      alternateName: "Khawaja Laeeq",
      url: SITE_URL,
      image: absoluteUrl("/opengraph-image"),
      jobTitle: profile.title,
      description: profile.summary,
      email: `mailto:${profile.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Central Punjab (UCP)",
      },
      knowsAbout: [
        "Full-Stack Development",
        "Agentic AI",
        "LLM Applications",
        "Retrieval-Augmented Generation",
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
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  category: "technology",

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  // Stops iOS from turning the phone number in the footer into a styled link.
  formatDetection: {
    telephone: false,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    ...baseOpenGraph,
    url: "/",
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
    // Card image is supplied by app/opengraph-image.tsx.
  },

  twitter: {
    ...baseTwitter,
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
    // Card image is supplied by app/twitter-image.tsx.
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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

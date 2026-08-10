import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khawajalaeeq.me"),

  title: {
    default: "Khawaja Muhammad Laeeq | Full-Stack & AI Developer",
    template: "%s | Khawaja Muhammad Laeeq",
  },

  description:
    "Portfolio of Khawaja Muhammad Laeeq, a Computer Science student and Full-Stack & AI Developer building web, mobile, and AI-powered applications with Python, Django, React, Next.js, Flutter, and Java.",

  authors: [
    {
      name: "Khawaja Muhammad Laeeq",
    },
  ],

  creator: "Khawaja Muhammad Laeeq",

  alternates: {
    canonical: "https://khawajalaeeq.me",
  },

  openGraph: {
    type: "website",
    url: "https://khawajalaeeq.me",
    title: "Khawaja Muhammad Laeeq | Full-Stack & AI Developer",
    description:
      "Portfolio of Khawaja Muhammad Laeeq — Full-Stack & AI Developer building web, mobile, and AI-powered applications.",
    siteName: "Khawaja Muhammad Laeeq",
    locale: "en_US",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}

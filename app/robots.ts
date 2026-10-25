import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The chat endpoint is POST-only and has nothing worth indexing.
      disallow: "/api/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}

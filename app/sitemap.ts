import type { MetadataRoute } from "next";
import { articles, projects } from "@/data/cv";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const projectImages = projects.flatMap((p) => (p.image ? [absoluteUrl(p.image)] : []));
  const articleImages = articles.flatMap((a) => (a.image ? [absoluteUrl(a.image)] : []));

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/opengraph-image"), ...projectImages],
    },
    {
      url: absoluteUrl("/projects"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: projectImages,
    },
    {
      url: absoluteUrl("/articles"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: articleImages,
    },
  ];
}

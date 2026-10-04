import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://khawajalaeeq.me",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://khawajalaeeq.me/projects",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://khawajalaeeq.me/articles",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

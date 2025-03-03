import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.olivermorla.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://www.olivermorla.com/resume",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: [],
      videos: [],
    },
    {
      url: "https://www.olivermorla.com/portfolio",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: [],
      videos: [],
    },
  ];
}

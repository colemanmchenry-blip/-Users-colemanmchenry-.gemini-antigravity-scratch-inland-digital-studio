import type { MetadataRoute } from "next";
import { STUDIO_INFO } from "@/data/agency";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = STUDIO_INFO.siteUrl.replace(/\/$/, "");
  const lastModified = new Date("2026-11-27");

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/demos/landscaping`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/demos/restaurant`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/demos/cleaning`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}

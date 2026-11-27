import type { MetadataRoute } from "next";
import { STUDIO_INFO } from "@/data/agency";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = STUDIO_INFO.siteUrl.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

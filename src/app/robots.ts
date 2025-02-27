import type { MetadataRoute } from "next";

const BASE_URL = process.env.WEB_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}sitemap.xml`,
  };
}

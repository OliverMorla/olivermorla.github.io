import type { MetadataRoute } from "next";

// robots.txt and the web manifest must live at the root of `app/`; inside a
// route group they are silently ignored.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/preview/", "/auth/", "/dashboard"],
    },
    sitemap: "https://www.olivermorla.com/sitemap.xml",
  };
}

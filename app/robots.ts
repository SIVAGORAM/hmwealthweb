import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.domain || SITE_CONFIG.url || "https://hmwealth.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/wp-admin/",
          "/wp-includes/",
          "/wp-json/",
          "/*.php$",
          "/xmlrpc.php",
          "/category/",
          "/tag/",
          "/feed/",
          "/comments/feed/",
          "/trackback/",
          "/cdn-cgi/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { products, services } from "@/lib/offerings";
import { ROUTES_SEO, toAbsoluteUrl, type RouteSeoConfig } from "@/lib/seo";

export interface DiscoveredRoute {
  routePath: string;
  filePath: string;
  mtime: Date;
}

/**
 * Dynamic filesystem route crawler that automatically scans `app/`
 * for `page.tsx` routes, dynamically resolves parameters like `[slug]`,
 * filters out `noIndex` routes, and discovers any newly added pages without manual config.
 */
export function getPageRoutes(baseDir: string = path.join(process.cwd(), "app")): DiscoveredRoute[] {
  const discovered: DiscoveredRoute[] = [];

  function scan(dir: string, segments: string[] = []) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const name = entry.name;
        // Skip Next.js private folders (_*), system/dot folders (.*), API routes (api), and parallel slots (@*)
        if (
          name.startsWith("_") ||
          name.startsWith(".") ||
          name === "api" ||
          name.startsWith("@")
        ) {
          continue;
        }

        // Route groups like (marketing) do not affect URL segment paths
        const nextSegments = /^\(.*\)$/.test(name) ? segments : [...segments, name];
        scan(path.join(dir, name), nextSegments);
      } else if (entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        const filePath = path.join(dir, entry.name);

        // Filter out pages with explicit noindex metadata or directives
        try {
          const content = fs.readFileSync(filePath, "utf-8");
          if (/noindex|noIndex:\s*true|robots:\s*\{[^}]*index:\s*false/i.test(content)) {
            continue;
          }
        } catch {
          // If unreadable, continue parsing
        }

        let mtime: Date;
        try {
          mtime = fs.statSync(filePath).mtime;
        } catch {
          mtime = new Date();
        }

        const relativePath = segments.join("/");

        // Expand dynamic [slug] routes based on canonical offerings registry
        if (relativePath === "products/[slug]") {
          for (const product of products) {
            discovered.push({
              routePath: `/products/${product.slug}/`,
              filePath,
              mtime,
            });
          }
        } else if (relativePath === "services/[slug]") {
          for (const service of services) {
            discovered.push({
              routePath: `/services/${service.slug}/`,
              filePath,
              mtime,
            });
          }
        } else if (relativePath.includes("[")) {
          // Unexpanded generic parameter - skip in static XML sitemap
          continue;
        } else {
          // Standard static route (e.g. "", "about", "calculators", "contact", or newly added "blog")
          const routePath = segments.length === 0 ? "/" : `/${relativePath}/`;
          discovered.push({
            routePath,
            filePath,
            mtime,
          });
        }
      }
    }
  }

  scan(baseDir);
  return discovered;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = getPageRoutes();
  const seoRegistry = ROUTES_SEO as Record<string, RouteSeoConfig>;

  const sitemapItems: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    const cleanKey = route.routePath.replace(/\/+$/, "") || "/";
    const seoConfig = seoRegistry[cleanKey] || seoRegistry[route.routePath];

    // Exclude if marked as noIndex in SEO registry
    if (seoConfig?.noIndex === true) {
      continue;
    }

    const priority =
      seoConfig?.priority ??
      (route.routePath === "/"
        ? 1.0
        : route.routePath.startsWith("/products/") || route.routePath.startsWith("/services/")
        ? 0.85
        : 0.7);

    const changeFrequency =
      seoConfig?.changeFrequency ??
      (route.routePath === "/" ? "daily" : "weekly");

    sitemapItems.push({
      url: toAbsoluteUrl(route.routePath),
      lastModified: route.mtime || new Date(),
      changeFrequency,
      priority,
    });
  }

  // Ensure root URL is first, then sort by priority descending, then URL ascending
  return sitemapItems.sort((a, b) => {
    if (a.url === toAbsoluteUrl("/")) return -1;
    if (b.url === toAbsoluteUrl("/")) return 1;
    if ((b.priority ?? 0) !== (a.priority ?? 0)) {
      return (b.priority ?? 0) - (a.priority ?? 0);
    }
    return a.url.localeCompare(b.url);
  });
}

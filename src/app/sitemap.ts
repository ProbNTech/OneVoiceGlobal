import type { MetadataRoute } from "next";
import { seo, type Route } from "@/data/seo";
import { absoluteUrl } from "@/lib/seo";

/**
 * sitemap.xml: every public page, from the same list that gives each page
 * its title and description (src/data/seo.ts), so a new page is listed once
 * it has its search text. There is no last-modified date: a made-up one
 * would be wrong, and search engines ignore dates they cannot trust.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(seo) as Route[]).map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: seo[route].changeFrequency,
    priority: seo[route].priority,
  }));
}

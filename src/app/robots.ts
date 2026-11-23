import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/lib/seo";

/**
 * robots.txt. Crawling stays open everywhere, even on the Vercel copy: those
 * pages carry noindex, and a crawler that is not allowed in never reads it.
 * Only the real site lists its sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(isIndexable ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}

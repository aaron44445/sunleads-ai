import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/config";

/** Served at /robots.txt, which currently 404s. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Gated or transactional routes with no search value. Keeping them out
      // preserves crawl budget for the pages that can actually rank.
      disallow: ["/api/", "/onboard/", "/deal-report"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

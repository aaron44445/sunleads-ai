import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/config";

/**
 * Served at /sitemap.xml, which currently 404s — Google has no crawl map.
 *
 * The list is explicit rather than derived from the filesystem so that adding
 * a page is a deliberate decision about whether it should be indexed. The
 * onboarding and internal routes are excluded on purpose.
 */
const ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

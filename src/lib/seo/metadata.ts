import type { Metadata } from "next";

import { SITE_NAME, SITE_URL } from "./config";

/**
 * Builds metadata for a subpage.
 *
 * Next merges the `metadata` export shallowly: a page that defines any
 * `openGraph` key replaces the parent's entire `openGraph` object, and a page
 * that defines none inherits the root's verbatim — including its `og:url` and
 * `og:title`, which then describe the homepage rather than this page. Routing
 * every subpage through this helper keeps the Open Graph block complete and
 * page-specific instead.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Bare title. The root layout's template appends the brand. */
  title: string;
  description: string;
  /** Route path with a leading slash, e.g. "/privacy". */
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const titleWithBrand = `${title} — ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    // `images` is intentionally omitted — the opengraph-image/twitter-image
    // file conventions in app/ are inherited by every route and supply them.
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: titleWithBrand,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: titleWithBrand,
      description,
    },
  };
}

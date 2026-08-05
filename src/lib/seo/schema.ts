/**
 * JSON-LD builders.
 *
 * Type selection reflects what Google actually renders as of 2026:
 *
 *   Organization  — supported; feeds the knowledge panel. Homepage only.
 *   WebSite       — ties the site to the Organization entity.
 *   VideoObject   — supported, and one of the few surfaces still expanding.
 *
 * Deliberately absent:
 *   FAQPage             — Google deprecated FAQ rich results in May 2026 and
 *                         finished removing reporting that August. The site has
 *                         an FAQ component, but marking it up now earns nothing.
 *   Service             — not in Google's rich-results gallery at all.
 *   SoftwareApplication — its rich result requires `offers.price` AND
 *                         `aggregateRating`. Self-marking a rating while also
 *                         serving Organization markup breaks Google's
 *                         self-serving review policy. Add only once ratings
 *                         come from a third party such as G2 or Capterra.
 */

import {
  LOGO_URL,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  VSL,
} from "./config";

type JsonLdObject = Record<string, unknown>;

export function organizationSchema(description: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * The homepage VSL is already public on the SunLeads AI channel but carries no
 * markup, so it is invisible to video search. `thumbnailUrl` and an ISO-8601
 * `uploadDate` are both required for the rich result to render.
 */
export function videoSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: VSL.name,
    description: VSL.description,
    thumbnailUrl: [VSL.thumbnailUrl],
    uploadDate: VSL.uploadDate,
    duration: VSL.duration,
    embedUrl: `https://www.youtube.com/embed/${VSL.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${VSL.id}`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

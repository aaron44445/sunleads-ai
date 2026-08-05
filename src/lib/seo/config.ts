/** Single source of truth for SEO constants. */

/**
 * Canonical origin. Must be the host that actually serves 200s — the apex
 * currently 307s to www, so canonicals pointing at the apex would all point
 * at a redirect.
 */
export const SITE_URL = "https://www.sunleadsai.com";

export const SITE_NAME = "SunLeads AI";

export const DEFAULT_TITLE =
  "SunLeads AI — We Fill Solar Calendars. You Close Deals.";

/**
 * 154 chars. The previous description was 201 — past the ~160 Google renders —
 * and because /privacy and /terms set only a title, they inherited it verbatim,
 * putting the same description on three URLs.
 */
export const DEFAULT_DESCRIPTION =
  "AI appointment setting for solar companies. We capture leads, qualify them by voice and SMS in 60 seconds, and book them onto your reps' calendars.";

export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const LOGO_URL = `${SITE_URL}/logo.png`;

/** Feeds Organization.sameAs — helps Google associate the brand entity. */
export const SOCIAL_PROFILES = ["https://www.youtube.com/@sunleadsai"];

/** The homepage VSL, already public on the SunLeads AI channel. */
export const VSL = {
  id: "1S1jJ-kWA1k",
  name: "How solar companies lose 40–60% of paid leads",
  description:
    "How solar companies lose 40-60% of their paid leads to slow follow-up, and how automated 60-second qualification by AI voice and SMS turns those leads into booked appointments.",
  thumbnailUrl: "https://i.ytimg.com/vi/1S1jJ-kWA1k/maxresdefault.jpg",
  /** ISO 8601. Update if the real publish date differs. */
  uploadDate: "2026-04-09",
  /** ISO 8601 duration — the site describes it as a four-minute breakdown. */
  duration: "PT4M",
} as const;

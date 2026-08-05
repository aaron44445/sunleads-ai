import { ImageResponse } from "next/og";

import { SITE_NAME } from "./config";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Pulled from v2.css so the card matches the live site rather than drifting
// from it. Note that components/Nav.tsx uses a different, greener palette —
// that file is not imported anywhere and does not reflect the shipped design.
const BG = "#0c0b09";
const INK = "#ece8df";
const SUN = "#ffb224";
const MUTED = "rgba(236, 232, 223, 0.62)";

/**
 * Shared renderer for the Open Graph and Twitter cards.
 *
 * Satori (which backs next/og) supports a subset of CSS: flexbox only, no
 * grid, and every element with multiple children needs an explicit display
 * value. Keep the markup flat and flex-based.
 */
export function renderOgImage(subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
          fontFamily: "monospace",
        }}
      >
        {/* Wordmark — mirrors the site nav, amber separator and all. */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, color: INK }}>
          <span>SunLeads</span>
          <span style={{ color: SUN, padding: "0 2px" }}>.</span>
          <span>AI</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              lineHeight: 1.05,
              color: INK,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 27,
              color: MUTED,
            }}
          >
            AI appointment setting for solar companies
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 64, height: 4, background: SUN }} />
          <div style={{ display: "flex", fontSize: 23, color: MUTED }}>
            60-second speed to lead · under 30% no-show
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

export const OG_ALT = `${SITE_NAME} — AI appointment setting for solar companies`;

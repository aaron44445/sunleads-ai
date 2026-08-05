import {
  OG_ALT,
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/seo/og-template";

// twitter-image is a separate convention from opengraph-image — without this
// file, X falls back to the OG tags rather than getting its own card.
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage("We fill solar calendars. You close deals.");
}

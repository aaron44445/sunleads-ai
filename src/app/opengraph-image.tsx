import {
  OG_ALT,
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/seo/og-template";

// Inherited by every route beneath app/, so all pages get a card without each
// one shipping its own asset.
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage("We fill solar calendars. You close deals.");
}

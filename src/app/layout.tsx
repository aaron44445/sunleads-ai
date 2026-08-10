import type { Metadata } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import "./globals.css";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/config";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  // Required for relative URLs in openGraph/twitter to resolve.
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    // Child pages set a bare title (e.g. "Privacy Policy") and get branded here,
    // so they no longer need to repeat "— SunLeads AI" themselves.
    template: `%s — ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,

  // Next does not infer canonicals. Without this every page ships without one,
  // which is what lets www/non-www and trailing-slash variants look like
  // duplicate pages.
  alternates: { canonical: "/" },

  // No `images` key here on purpose: app/opengraph-image.tsx and
  // app/twitter-image.tsx supply them. An explicit images array would win over
  // the file convention and point at an asset that does not exist.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Snippet eligibility gates inclusion in AI Overviews — restricting these
      // opts the site out of those surfaces entirely.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${outfit.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}

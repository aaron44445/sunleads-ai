import type { Metadata } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import "./globals.css";

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
  title: "SunLeads AI — We Fill Solar Calendars. You Close Deals.",
  description:
    "AI appointment-setting for solar companies. Ads, 60-second follow-up, qualification, and booking — one system that turns homeowners into appointments on your reps' calendars. Book a strategy call.",
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

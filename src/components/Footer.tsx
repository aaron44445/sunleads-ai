import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="px-6"
      style={{
        paddingTop: "48px",
        paddingBottom: "48px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        {/* Brand */}
        <div className="flex items-center gap-1 font-display text-lg font-bold">
          <span className="text-white">SunLeads</span>
          <span style={{ color: "#7FFF00" }}>AI</span>
        </div>
        <p style={{ color: "#4A5568", fontSize: "13px" }}>
          Residential Solar Appointment System
        </p>

        {/* Contact */}
        <p style={{ color: "#4A5568", fontSize: "13px" }}>
          <a href="tel:+17179907176" className="hover:text-white transition-colors">(717) 990-7176</a>
          {" · "}
          hello@sunleadsai.com
        </p>

        {/* Legal Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/privacy"
            className="text-sm transition-colors hover:text-white"
            style={{ color: "#8B95A8" }}
          >
            Privacy Policy
          </Link>
          <span style={{ color: "#4A5568" }}>|</span>
          <Link
            href="/terms"
            className="text-sm transition-colors hover:text-white"
            style={{ color: "#8B95A8" }}
          >
            Terms &amp; Conditions
          </Link>
          <span style={{ color: "#4A5568" }}>|</span>
          <Link
            href="/contact"
            className="text-sm transition-colors hover:text-white"
            style={{ color: "#8B95A8" }}
          >
            Contact Us
          </Link>
        </div>

        {/* Disclaimer */}
        <p
          className="max-w-xl"
          style={{ color: "#4A5568", fontSize: "11px", lineHeight: 1.6 }}
        >
          Results vary based on market, ad spend, and sales team performance.
          The 30-appointment guarantee is subject to the qualification criteria
          defined in our service agreement. SunLeads AI is not a solar
          installer. We provide lead generation and appointment-setting
          services for residential solar companies.
        </p>

        {/* Facebook Disclaimer */}
        <p
          className="max-w-xl"
          style={{ color: "#4A5568", fontSize: "11px", lineHeight: 1.6 }}
        >
          This website is not a part of the Facebook website or Facebook Inc.
          Additionally, this website is NOT endorsed by Facebook in any way.
          Facebook is a trademark of Facebook, Inc.
        </p>

        <p style={{ color: "#4A5568", fontSize: "12px" }}>
          &copy; 2026 SunLeads AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

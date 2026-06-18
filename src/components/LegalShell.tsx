import Link from "next/link";

const NAV_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Contact Us", href: "/contact" },
];

export default function LegalShell({
  children,
  activePath,
}: {
  children: React.ReactNode;
  activePath: string;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080B10",
        color: "#EAEAEA",
        fontFamily: "var(--font-outfit), system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(8,11,16,0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="8" fill="#F5A623" />
              <g stroke="#F5A623" strokeWidth="2" strokeLinecap="round">
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="16" y1="26" x2="16" y2="30" />
                <line x1="2" y1="16" x2="6" y2="16" />
                <line x1="26" y1="16" x2="30" y2="16" />
                <line x1="6.1" y1="6.1" x2="8.9" y2="8.9" />
                <line x1="23.1" y1="23.1" x2="25.9" y2="25.9" />
                <line x1="6.1" y1="25.9" x2="8.9" y2="23.1" />
                <line x1="23.1" y1="8.9" x2="25.9" y2="6.1" />
              </g>
            </svg>
            <span
              style={{
                fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                fontSize: "18px",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.3px",
              }}
            >
              SunLeads<span style={{ color: "#7FFF00" }}>AI</span>
            </span>
          </Link>

          {/* Nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "13px",
                  fontWeight: activePath === link.href ? 600 : 400,
                  color: activePath === link.href ? "#EAEAEA" : "#8B95A8",
                  textDecoration: "none",
                  borderBottom:
                    activePath === link.href
                      ? "2px solid #F5A623"
                      : "2px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "48px 24px 64px",
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            SunLeads<span style={{ color: "#7FFF00" }}>AI</span>
          </div>
          <div style={{ fontSize: "13px", color: "#4A5568" }}>
            <a
              href="tel:+17179907176"
              style={{ color: "#4A5568", textDecoration: "none" }}
            >
              (717) 990-7176
            </a>
            {" · "}
            <a
              href="mailto:hello@sunleadsai.com"
              style={{ color: "#4A5568", textDecoration: "none" }}
            >
              hello@sunleadsai.com
            </a>
            {" · "}
            sunleadsai.com
          </div>
          <div style={{ display: "flex", gap: "16px", fontSize: "13px" }}>
            <Link href="/privacy" style={{ color: "#8B95A8", textDecoration: "none" }}>
              Privacy Policy
            </Link>
            <span style={{ color: "#4A5568" }}>|</span>
            <Link href="/terms" style={{ color: "#8B95A8", textDecoration: "none" }}>
              Terms & Conditions
            </Link>
            <span style={{ color: "#4A5568" }}>|</span>
            <Link href="/contact" style={{ color: "#8B95A8", textDecoration: "none" }}>
              Contact Us
            </Link>
          </div>
          <p style={{ fontSize: "12px", color: "#4A5568", marginTop: "4px" }}>
            &copy; 2026 SunLeads AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

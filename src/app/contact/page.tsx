import LegalShell from "@/components/LegalShell";
import { pageMetadata } from "@/lib/seo/metadata";

// Was "Contact Us — SunLeads AI" at 24 chars, leaving most of the SERP line
// unused. This states what the page is for and carries the commercial terms.
export const metadata = pageMetadata({
  title: "Book a Strategy Call",
  description:
    "Book a 20-minute call to see how SunLeads AI books qualified solar appointments onto your reps' calendars. No retainer pitch.",
  path: "/contact",
});

const cardStyle = {
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(13,17,25,0.4)",
  padding: "24px",
} as const;

export default function Contact() {
  return (
    <LegalShell activePath="/contact">
      {/* Title */}
      <h1
        style={{
          fontFamily: "var(--font-bricolage), system-ui, sans-serif",
          fontSize: "32px",
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-0.5px",
          marginBottom: "8px",
        }}
      >
        Contact Us
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: "#8B95A8",
          lineHeight: 1.6,
          maxWidth: "480px",
          marginBottom: "40px",
        }}
      >
        Have a question about our solar appointment system? Want to see if your
        market qualifies? Reach out — we respond within 24 hours.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {/* Phone */}
        <div style={cardStyle}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(245,166,35,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F5A623"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: "4px",
            }}
          >
            Phone
          </h2>
          <a
            href="tel:+17179907176"
            style={{
              color: "#F5A623",
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            (717) 990-7176
          </a>
        </div>

        {/* Email */}
        <div style={cardStyle}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(245,166,35,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F5A623"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: "4px",
            }}
          >
            Email
          </h2>
          <a
            href="mailto:hello@sunleadsai.com"
            style={{
              color: "#F5A623",
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            hello@sunleadsai.com
          </a>
        </div>

        {/* Website */}
        <div style={cardStyle}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(245,166,35,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F5A623"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: "4px",
            }}
          >
            Website
          </h2>
          <a
            href="https://sunleadsai.com"
            style={{
              color: "#F5A623",
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            sunleadsai.com
          </a>
        </div>

        {/* Business Hours */}
        <div style={cardStyle}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(245,166,35,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F5A623"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: "4px",
            }}
          >
            Business Hours
          </h2>
          <p style={{ color: "#8B95A8", fontSize: "15px" }}>
            Monday – Friday, 9 AM – 6 PM ET
          </p>
          <p style={{ color: "#4A5568", fontSize: "13px", marginTop: "4px" }}>
            We typically respond within 24 hours.
          </p>
        </div>
      </div>
    </LegalShell>
  );
}

import Link from "next/link";
import LegalShell from "@/components/LegalShell";
import { pageMetadata } from "@/lib/seo/metadata";

// Previously set only a title, so this page inherited the homepage's
// description — identical metadata across three URLs.
export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How SunLeads AI collects, uses, and protects data for solar companies using our AI appointment-setting platform.",
  path: "/privacy",
});

const heading = {
  fontSize: "18px",
  fontWeight: 600,
  color: "#FFFFFF",
  marginBottom: "12px",
  fontFamily: "var(--font-bricolage), system-ui, sans-serif",
} as const;

const body = {
  color: "#C0C7D3",
  fontSize: "15px",
  lineHeight: 1.75,
} as const;

export default function PrivacyPolicy() {
  return (
    <LegalShell activePath="/privacy">
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
        Privacy Policy
      </h1>
      <p style={{ fontSize: "14px", color: "#8B95A8", marginBottom: "40px" }}>
        Last Updated: June 6, 2026
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {/* 1 */}
        <section>
          <h2 style={heading}>1. Introduction</h2>
          <p style={body}>
            Welcome to SunLeads AI (&quot;we&quot;, &quot;us&quot;, or
            &quot;our&quot;). Your privacy is important to us. This Privacy
            Policy outlines how we collect, use, and protect your personal
            information when you visit our website, use our services, or
            interact with us in any way. By using our website or services, you
            agree to the terms of this Privacy Policy.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 style={heading}>2. Information We Collect</h2>
          <p style={{ ...body, marginBottom: "8px" }}>
            We may collect the following types of information:
          </p>
          <ul
            style={{
              ...body,
              paddingLeft: "24px",
              listStyleType: "disc",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <li>
              <strong style={{ color: "#FFFFFF" }}>
                Personal Information:
              </strong>{" "}
              Name, email address, phone number, or other details you provide
              when filling out a form or contacting us.
            </li>
            <li>
              <strong style={{ color: "#FFFFFF" }}>Usage Data:</strong>{" "}
              Information about how you access and use our website, such as IP
              address, browser type, device information, and pages visited.
            </li>
            <li>
              <strong style={{ color: "#FFFFFF" }}>
                Cookies and Tracking:
              </strong>{" "}
              We use cookies, pixels, and similar tracking technologies to
              improve your experience and analyze website traffic.
            </li>
          </ul>
        </section>

        {/* 3 */}
        <section>
          <h2 style={heading}>3. How We Use Your Information</h2>
          <p style={{ ...body, marginBottom: "8px" }}>
            We use the information we collect for the following purposes:
          </p>
          <ul
            style={{
              ...body,
              paddingLeft: "24px",
              listStyleType: "disc",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <li>To provide and improve our services</li>
            <li>To process transactions</li>
            <li>
              To communicate with you about updates, service information, and
              important notices
            </li>
            <li>
              To send appointment reminders and service-related messages via
              SMS/MMS
            </li>
            <li>To analyze usage patterns and improve website performance</li>
            <li>To fulfill legal obligations</li>
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2 style={heading}>4. How We Share Your Information</h2>
          <p style={body}>
            <strong style={{ color: "#FFFFFF" }}>
              We do not sell, rent, trade, or otherwise share your personal
              information with any third parties.
            </strong>{" "}
            Your information is used solely by SunLeads AI to provide our
            services to you. It will never be shared, distributed, or disclosed
            to outside parties for any reason.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 style={heading}>
            5. SMS/Text Messaging &amp; Mobile Information
          </h2>
          <p style={{ ...body, marginBottom: "12px" }}>
            No mobile information will be shared with third
            parties/affiliates for marketing/promotional purposes. Information
            sharing to subcontractors in support services, such as customer
            service, is permitted. All other use case categories exclude text
            messaging originator opt-in data and consent; this information will
            not be shared with any third parties.
          </p>
          <p style={body}>
            By opting into our SMS program, you consent to receive appointment
            reminders, service updates, and informational messages from SunLeads
            AI. Message frequency varies. Message and data rates may apply. You
            may opt out at any time by replying STOP. Reply HELP for assistance.
            For more details, see our{" "}
            <Link
              href="/terms"
              style={{ color: "#F5A623", textDecoration: "underline" }}
            >
              Terms and Conditions
            </Link>
            .
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 style={heading}>6. Data Security</h2>
          <p style={body}>
            We take appropriate measures to protect your information against
            unauthorized access, alteration, disclosure, or destruction. However,
            no system is completely secure, and we cannot guarantee the absolute
            security of your data.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 style={heading}>7. Your Rights and Choices</h2>
          <ul
            style={{
              ...body,
              paddingLeft: "24px",
              listStyleType: "disc",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <li>Access, update, or delete your personal information</li>
            <li>Opt out of marketing communications</li>
            <li>Disable cookies through your browser settings</li>
          </ul>
          <p style={body}>Contact us to exercise any of these rights.</p>
        </section>

        {/* 8 */}
        <section>
          <h2 style={heading}>8. Retention of Data</h2>
          <p style={body}>
            We retain personal data only as long as necessary to fulfill the
            purposes outlined in this policy or as required by law.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 style={heading}>9. Links to Other Websites</h2>
          <p style={body}>
            Our website may contain links to third-party sites. We are not
            responsible for the privacy practices or content of those sites.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 style={heading}>10. Changes to This Policy</h2>
          <p style={body}>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with a new &quot;Last Updated&quot; date.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 style={heading}>11. Contact Us</h2>
          <p style={body}>
            <strong style={{ color: "#FFFFFF" }}>SunLeads AI</strong>
            <br />
            Phone:{" "}
            <a href="tel:+17179907176" style={{ color: "#F5A623" }}>
              (717) 990-7176
            </a>
            <br />
            Email:{" "}
            <a href="mailto:hello@sunleadsai.com" style={{ color: "#F5A623" }}>
              hello@sunleadsai.com
            </a>
            <br />
            Website: sunleadsai.com
          </p>
        </section>
      </div>
    </LegalShell>
  );
}

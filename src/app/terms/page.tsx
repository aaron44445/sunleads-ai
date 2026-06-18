import Link from "next/link";
import LegalShell from "@/components/LegalShell";

export const metadata = {
  title: "Terms and Conditions — SunLeads AI",
};

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

export default function TermsAndConditions() {
  return (
    <LegalShell activePath="/terms">
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
        Terms and Conditions
      </h1>
      <p style={{ fontSize: "14px", color: "#8B95A8", marginBottom: "40px" }}>
        Last Updated: June 6, 2026
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <p style={body}>
          These Terms and Conditions govern your use of sunleadsai.com and the
          services offered by SunLeads AI. By accessing our website, you agree to
          comply with these terms.
        </p>

        {/* 1 */}
        <section>
          <h2 style={heading}>1. Website Use</h2>
          <p style={{ ...body, marginBottom: "8px" }}>
            You agree to use this website only for lawful purposes. You may not:
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
            <li>Attempt unauthorized access to our systems</li>
            <li>Use our content commercially without written permission</li>
            <li>Transmit malicious code or interfere with site operations</li>
          </ul>
        </section>

        {/* 2 */}
        <section>
          <h2 style={heading}>2. Accounts &amp; Purchases</h2>
          <p style={body}>
            You must provide accurate information when creating accounts or
            making purchases. You are responsible for maintaining the
            confidentiality of your password and account. We reserve the right to
            refuse or cancel orders in cases of suspected fraud or
            unavailability.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 style={heading}>3. Payment &amp; Refunds</h2>
          <p style={body}>
            Full payment is required at the time of purchase unless otherwise
            stated. Refunds are handled in accordance with our Refund Policy.
            Non-payment may result in the suspension of services.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 style={heading}>4. Intellectual Property</h2>
          <p style={body}>
            All content on this website — including text, graphics, logos,
            videos, and software — is the property of SunLeads AI and is
            protected by copyright laws. Reproduction requires prior written
            permission.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 style={heading}>5. Warranty Disclaimer</h2>
          <p style={body}>
            Our services are provided &quot;as is&quot; without express or
            implied warranties regarding operation, accuracy, or fitness for
            specific purposes.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 style={heading}>6. Limitation of Liability</h2>
          <p style={body}>
            SunLeads AI limits its liability to the amounts paid for services. We
            exclude indirect, consequential, or punitive damages to the fullest
            extent allowed by law.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 style={heading}>7. Indemnification</h2>
          <p style={body}>
            You agree to protect the company from claims, damages, and expenses
            arising from your use of the website or violation of these terms.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 style={heading}>8. Third-Party Links</h2>
          <p style={body}>
            Our website may contain links to external websites. We are not
            responsible for their content or privacy practices.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 style={heading}>9. Termination</h2>
          <p style={body}>
            We may suspend or terminate your access without notice for suspected
            violations or fraudulent activity.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 style={heading}>10. Governing Law</h2>
          <p style={body}>
            These terms are governed by the laws of the State of Pennsylvania
            without regard to conflict-of-law provisions.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 style={heading}>11. Updates to Terms</h2>
          <p style={body}>
            We may modify these terms at any time. Updates will be posted on this
            page with a revised date. Continued use of the website implies
            acceptance of the updated terms.
          </p>
        </section>

        {/* 12 */}
        <section>
          <h2 style={heading}>12. SMS Messaging Program</h2>
          <p style={{ ...body, marginBottom: "12px" }}>
            <strong style={{ color: "#FFFFFF" }}>About SunLeads AI:</strong>{" "}
            SunLeads AI provides AI-powered solar appointment generation
            services. By opting into our SMS program, you consent to receive
            appointment reminders, service updates, and informational messages
            from SunLeads AI.
          </p>
          <p style={{ ...body, marginBottom: "12px" }}>
            <strong style={{ color: "#FFFFFF" }}>Message Frequency:</strong>{" "}
            Message frequency varies. Message and data rates may apply. Carriers
            are not liable for message delays. You must be 18 or older to opt in.
          </p>
          <p style={{ ...body, marginBottom: "12px" }}>
            <strong style={{ color: "#FFFFFF" }}>
              Opt-Out &amp; Support:
            </strong>{" "}
            You can cancel the SMS service at any time. Just text &quot;STOP&quot;
            to the short code or phone number from which you received messages.
            After you send the SMS message &quot;STOP&quot; to us, we will send
            you an SMS message to confirm that you have been unsubscribed. After
            this, you will no longer receive SMS messages from us. If you want to
            join again, just sign up as you did the first time and we will start
            sending SMS messages to you again. If you are experiencing issues
            with the messaging program you can reply with the keyword HELP for
            more assistance, or you can get help directly at{" "}
            <a href="tel:+17179907176" style={{ color: "#F5A623" }}>
              (717) 990-7176
            </a>{" "}
            or{" "}
            <a
              href="mailto:hello@sunleadsai.com"
              style={{ color: "#F5A623" }}
            >
              hello@sunleadsai.com
            </a>
            .
          </p>
          <p style={body}>
            For information on how we handle your data, please see our{" "}
            <Link
              href="/privacy"
              style={{ color: "#F5A623", textDecoration: "underline" }}
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        {/* 13 */}
        <section>
          <h2 style={heading}>13. Contact Us</h2>
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

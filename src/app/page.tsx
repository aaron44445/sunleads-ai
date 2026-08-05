import Link from "next/link";
import Booking from "./Booking";
import JsonLd from "@/components/JsonLd";
import { DEFAULT_DESCRIPTION } from "@/lib/seo/config";
import {
  organizationSchema,
  videoSchema,
  websiteSchema,
} from "@/lib/seo/schema";
import "./v2.css";

const VSL_URL = "https://www.youtube.com/embed/1S1jJ-kWA1k";

const STATS = [
  { value: "60", unit: "sec", label: "Speed to lead" },
  { value: "100", unit: "%", label: "Leads followed up" },
  { value: "<30", unit: "%", label: "No-show rate" },
  { value: "0", unit: "", label: "Leads bought from lists" },
];

const STEPS = [
  {
    n: "01",
    title: "Capture",
    tag: "Meta ads",
    body: "Targeted Meta campaigns put your offer in front of solar-ready homeowners in your exact service area. No shared leads. No recycled lists.",
  },
  {
    n: "02",
    title: "Qualify",
    tag: "AI voice + SMS",
    body: "AI calls and texts every lead within 60 seconds, screening for homeownership, roof condition, bill size, and timeline. Tire-kickers never reach you.",
  },
  {
    n: "03",
    title: "Book",
    tag: "Calendar sync",
    body: "Qualified homeowners land directly on your reps\u2019 calendars, with reminders that keep them showing up. Your team just closes.",
  },
];

const TICKER = [
  "Speed to lead — 60 sec",
  "No shared leads",
  "AI voice + SMS",
  "Booked on your calendar",
  "No-show reminders",
  "Live pipeline dashboard",
  "Solar only",
];

function Dial() {
  return (
    <div className="v2-dial" aria-hidden>
      <svg viewBox="0 0 300 300" fill="none" style={{ width: "100%", height: "auto" }}>
        {/* fine tick ring (60 ticks) */}
        <circle
          cx="150"
          cy="150"
          r="140"
          stroke="var(--ink-3)"
          strokeWidth="9"
          strokeDasharray="1 13.66"
          opacity="0.45"
        />
        {/* major tick ring (12 ticks) */}
        <circle
          cx="150"
          cy="150"
          r="137"
          stroke="var(--ink-2)"
          strokeWidth="15"
          strokeDasharray="1.5 70.2"
          opacity="0.6"
        />
        {/* station orbit */}
        <circle cx="150" cy="150" r="112" stroke="var(--rule)" strokeWidth="1" />
        {/* inner reference circle */}
        <circle cx="150" cy="150" r="86" stroke="var(--rule-soft)" strokeWidth="1" />

        {/* radar sweep: amber arc + tip dot, rotating */}
        <g className="v2-dial-ring">
          <circle
            cx="150"
            cy="150"
            r="126"
            stroke="var(--sun)"
            strokeWidth="2"
            strokeDasharray="132 659.7"
            transform="rotate(-90 150 150)"
          />
          <circle cx="150" cy="24" r="3" fill="var(--sun)" />
        </g>

        {/* stations: Capture / Qualify / Book */}
        <circle cx="150" cy="38" r="3" fill="var(--sun)" />
        <text x="150" y="26" textAnchor="middle" fill="var(--ink-2)" fontFamily="var(--mono)" fontSize="9" letterSpacing="2">
          CAPTURE
        </text>
        <circle cx="247" cy="206" r="3" fill="var(--sun)" />
        <text x="252" y="226" textAnchor="middle" fill="var(--ink-2)" fontFamily="var(--mono)" fontSize="9" letterSpacing="2">
          QUALIFY
        </text>
        <circle cx="53" cy="206" r="3" fill="var(--sun)" />
        <text x="48" y="226" textAnchor="middle" fill="var(--ink-2)" fontFamily="var(--mono)" fontSize="9" letterSpacing="2">
          BOOK
        </text>

        {/* center reading */}
        <text x="150" y="112" textAnchor="middle" fill="var(--ink-3)" fontFamily="var(--mono)" fontSize="8.5" letterSpacing="2.5">
          SPEED TO LEAD
        </text>
        <text x="150" y="166" textAnchor="middle" fill="var(--ink)" fontFamily="var(--mono)" fontSize="46" fontWeight="500" className="v2-num">
          60
        </text>
        <text x="150" y="192" textAnchor="middle" fill="var(--ink-3)" fontFamily="var(--mono)" fontSize="10" letterSpacing="3">
          SECONDS
        </text>
      </svg>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      className="v2-btn-arrow"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden
    >
      <path
        d="M1.5 7.5h12M9 3l4.5 4.5L9 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="v2-root font-body">
      <JsonLd
        data={[
          organizationSchema(DEFAULT_DESCRIPTION),
          websiteSchema(),
          videoSchema(),
        ]}
      />
      <div className="v2-progress" aria-hidden />
      <div className="v2-rails" aria-hidden />

      {/* ── Nav ── */}
      <header className="v2-nav">
        <div className="v2-wrap v2-nav-inner">
          <Link href="/" className="v2-mono" style={{ color: "var(--ink)" }}>
            SunLeads<span className="v2-amber">.</span>AI
          </Link>
          <nav className="v2-navlinks">
            <span className="v2-mono v2-faint v2-status">
              Onboarding 3 cos&nbsp;/&nbsp;mo
            </span>
            <a href="#watch" className="v2-mono v2-navlink hidden sm:block">
              Watch
            </a>
            <a href="#how" className="v2-mono v2-navlink hidden sm:block">
              How it works
            </a>
            <a href="#book" className="v2-mono v2-navlink">
              Book a call
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="v2-wrap v2-hero">
          <Dial />
          <div className="v2-eyebrow v2-rise v2-rise-1">
            <p className="v2-mono v2-faint">
              AI appointment-setting for solar companies
            </p>
            <p className="v2-mono v2-faint v2-eyebrow-right v2-num">
              Solar only &mdash; US service areas
            </p>
          </div>

          <h1 className="font-display v2-h1" style={{ marginTop: "2.5rem" }}>
            <span className="v2-rise v2-rise-2" style={{ display: "block" }}>
              We fill solar
            </span>
            <span className="v2-rise v2-rise-3" style={{ display: "block" }}>
              calendars<span className="v2-amber">.</span>
            </span>
            <span
              className="v2-dim v2-rise v2-rise-4"
              style={{ display: "block" }}
            >
              You close deals.
            </span>
          </h1>

          <div className="v2-hero-foot v2-rise v2-rise-5">
            <p className="v2-body">
              Ads, 60-second follow-up, qualification, and booking &mdash; one
              system that turns homeowners into appointments on your
              reps&rsquo; calendars.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", alignItems: "flex-start" }}>
              <a href="#book" className="v2-btn">
                Book a strategy call <Arrow />
              </a>
              <a href="#watch" className="v2-ghost">
                Or watch the 4-minute breakdown
              </a>
            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="v2-rule-t v2-rule-b">
          <div className="v2-wrap v2-stats v2-cross">
            {STATS.map((s) => (
              <div key={s.label} className="v2-stat">
                <div className="font-display v2-num v2-stat-value">
                  {s.value}
                  <span className="v2-faint" style={{ fontSize: "0.5em" }}>
                    {s.unit}
                  </span>
                </div>
                <div className="v2-mono v2-faint" style={{ marginTop: "0.8rem" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── VSL ── */}
        <section id="watch" className="v2-wrap v2-section">
          <span className="font-display v2-bignum" aria-hidden>
            01
          </span>
          <div className="v2-section-head">
            <p className="v2-mono v2-faint v2-label">01 &mdash; Watch</p>
            <h2 className="font-display v2-h2" style={{ maxWidth: "20ch" }}>
              The whole system, explained in four minutes.
            </h2>
          </div>
          <div className="v2-frame">
            <iframe
              className="v2-vsl"
              src={VSL_URL}
              title="SunLeads AI — how the system works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="v2-mono v2-faint" style={{ marginTop: "1.25rem" }}>
            4 min &mdash; sound on
          </p>
        </section>

        {/* ── How it works ── */}
        <section id="how" className="v2-rule-t">
          <div className="v2-wrap v2-section v2-cross">
            <span className="font-display v2-bignum" aria-hidden>
              02
            </span>
            <div className="v2-section-head">
              <p className="v2-mono v2-faint v2-label">02 &mdash; How it works</p>
              <h2 className="font-display v2-h2" style={{ maxWidth: "18ch" }}>
                Lead to appointment, fully automated.
              </h2>
            </div>
            <div>
              {STEPS.map((step) => (
                <div key={step.n} className="v2-row">
                  <span className="v2-mono v2-row-index">{step.n}</span>
                  <h3 className="font-display v2-row-title">
                    {step.title}
                    <span className="v2-mono v2-row-tag">{step.tag}</span>
                  </h3>
                  <p className="v2-row-body">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Statement ── */}
        <section className="v2-rule-t">
          <div className="v2-wrap v2-section v2-cross">
            <p className="font-display v2-statement">
              The first company to reach a homeowner{" "}
              <span className="v2-amber">closes the deal.</span> We make sure
              that&rsquo;s you &mdash; every time.
            </p>
          </div>
        </section>

        {/* ── Ticker ── */}
        <section className="v2-rule-t" aria-hidden>
          <div className="v2-ticker">
            <div className="v2-ticker-track">
              {[0, 1].map((dup) => (
                <div key={dup} className="v2-ticker-group">
                  {TICKER.map((item) => (
                    <span key={item} className="v2-mono v2-ticker-item">
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Booking ── */}
        <section id="book" className="v2-rule-t">
          <div className="v2-wrap v2-section v2-cross">
            <span className="font-display v2-bignum" aria-hidden>
              03
            </span>
            <div className="v2-section-head">
              <p className="v2-mono v2-faint v2-label">03 &mdash; Book</p>
              <div>
                <h2 className="font-display v2-h2" style={{ maxWidth: "18ch" }}>
                  Twenty minutes. No retainer pitch.
                </h2>
                <p className="v2-body" style={{ marginTop: "1.5rem" }}>
                  Pick a time below. We&rsquo;ll map your current lead flow,
                  show you where deals are leaking, and tell you exactly what
                  the system would look like for your team. We onboard three
                  new companies per month.
                </p>
              </div>
            </div>
            <div className="v2-frame">
              <Booking />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="v2-wrap v2-footer">
        <span className="v2-mono v2-faint">
          &copy; {new Date().getFullYear()} SunLeads AI
        </span>
        <div className="v2-footer-links">
          <Link href="/privacy" className="v2-mono v2-navlink">
            Privacy
          </Link>
          <Link href="/terms" className="v2-mono v2-navlink">
            Terms
          </Link>
          <Link href="/contact" className="v2-mono v2-navlink">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

const BOTTLENECKS = [
  "Speed-to-lead (are you contacting within 5 minutes?)",
  "Contact rate (what % of leads actually get reached?)",
  "Qualification filtering (are unqualified leads wasting rep time?)",
  "Booking conversion (how many contacted leads become appointments?)",
  "Show rate (what % of booked appointments actually sit?)",
];

export default function Scorecard() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reveals = section.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scorecard"
      className="relative overflow-hidden px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Section Tag */}
        <div className="mb-4 flex items-center justify-center gap-4" data-reveal>
          <span
            className="block h-[1px] w-6"
            style={{ background: "#F5A623" }}
          />
          <span
            className="text-xs font-semibold uppercase"
            style={{
              color: "#F5A623",
              fontSize: "11px",
              letterSpacing: "3px",
            }}
          >
            Free Tool
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display text-3xl font-bold text-white sm:text-4xl"
          style={{ letterSpacing: "-0.8px" }}
          data-reveal
        >
          Not Sure Where Your Appointments Are{" "}
          <span style={{ color: "#F5A623" }}>Leaking?</span>
        </h2>

        {/* Body */}
        <p
          className="mx-auto mt-4 max-w-2xl"
          style={{ color: "#8B95A8", fontSize: "17px", lineHeight: 1.7 }}
          data-reveal
        >
          Take the Lead Waste Scorecard — a 2-minute diagnostic that identifies
          your biggest appointment bottleneck. No email required. Instant
          results.
        </p>

        {/* Bottleneck bullets */}
        <div
          className="mx-auto mt-8 max-w-md rounded-xl px-6 py-6 text-left"
          style={{
            background: "rgba(13,17,25,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          data-reveal
        >
          <p
            className="mb-3 text-xs font-semibold uppercase"
            style={{ color: "#F5A623", letterSpacing: "2px" }}
          >
            It checks for
          </p>
          <ul className="space-y-2.5">
            {BOTTLENECKS.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm"
                style={{ color: "#EAEAEA", lineHeight: 1.5 }}
              >
                <span
                  className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "#F5A623" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-8" data-reveal>
          <a
            href="https://chatgpt.com/g/g-6a170671c81c8191b83d632cd865df36-solar-lead-waste-auditor"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-base font-semibold transition-all duration-200"
            style={{
              border: "1px solid rgba(245,166,35,0.4)",
              background: "rgba(245,166,35,0.08)",
              color: "#F5A623",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(245,166,35,0.15)";
              e.currentTarget.style.borderColor = "rgba(245,166,35,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(245,166,35,0.08)";
              e.currentTarget.style.borderColor = "rgba(245,166,35,0.4)";
            }}
          >
            Take the Free Lead Waste Scorecard
            <svg
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Supporting line */}
        <p
          className="mt-4 text-sm"
          style={{ color: "#4A5568" }}
          data-reveal
        >
          Bring your score to the audit call — we&apos;ll show you exactly how
          to fix what it finds.
        </p>
      </div>
    </section>
  );
}

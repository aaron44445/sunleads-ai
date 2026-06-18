"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  "We run targeted Meta ads to solar-interested homeowners in your service area",
  "Every lead gets contacted by AI within 60 seconds — call, text, or both",
  "AI qualifies the lead: homeownership, roof condition, electric bill, timeline, decision-maker status",
  "Qualified leads get booked directly onto your reps' calendars",
  "Automated reminders (SMS + email) reduce no-shows to under 30%",
  "Every unqualified or unreached lead enters a multi-touch nurture sequence",
  "You get a live dashboard showing exactly where every lead sits in the pipeline",
];

export default function Solution() {
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
      id="how-it-works"
      className="relative overflow-hidden px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section Tag */}
        <div className="mb-4 flex items-center gap-4" data-reveal>
          <span
            className="block h-[1px] w-6"
            style={{ background: "#7FFF00" }}
          />
          <span
            className="text-xs font-semibold uppercase"
            style={{
              color: "#7FFF00",
              fontSize: "11px",
              letterSpacing: "3px",
            }}
          >
            The System
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          style={{ letterSpacing: "-0.8px" }}
          data-reveal
        >
          SunLeads AI Installs the{" "}
          <span style={{ color: "#7FFF00" }}>Missing System</span>
        </h2>

        {/* Intro */}
        <p
          className="mt-4 max-w-2xl"
          style={{ color: "#8B95A8", fontSize: "17px", lineHeight: 1.7 }}
          data-reveal
        >
          We handle the front end of your appointment pipeline — from ad click
          to qualified sit. Your reps only talk to homeowners who are pre-vetted
          and ready to hear a proposal.
        </p>

        {/* Steps */}
        <div className="mt-10 space-y-4" data-reveal>
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-lg px-5 py-4"
              style={{
                background: "rgba(13,17,25,0.4)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold"
                style={{
                  background: "rgba(127,255,0,0.1)",
                  color: "#7FFF00",
                  border: "1px solid rgba(127,255,0,0.25)",
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  color: "#EAEAEA",
                  fontSize: "15px",
                  lineHeight: 1.6,
                }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Closing */}
        <p
          className="mt-8 font-display text-lg font-semibold"
          style={{ color: "#EAEAEA" }}
          data-reveal
        >
          Your reps should be closing, not chasing cold forms.
        </p>

        {/* CTA */}
        <div className="mt-6" data-reveal>
          <a
            href="#a2p-form"
            className="inline-flex items-center gap-2 rounded-lg px-7 py-3 text-sm font-semibold transition-all duration-200"
            style={{ background: "#7FFF00", color: "#000" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#8FFF20";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#7FFF00";
            }}
          >
            See If Your Pipeline Qualifies
            <svg
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
      </div>
    </section>
  );
}

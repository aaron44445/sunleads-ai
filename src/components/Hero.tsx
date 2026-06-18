"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* Subtle Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(245,166,35,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Hero Content */}
      <div
        className="relative z-10 flex max-w-5xl flex-col items-center text-center"
        data-reveal
      >
        {/* Eyebrow Badge */}
        <div
          className="mb-6 inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-sm font-medium"
          style={{
            border: "1px solid rgba(245,166,35,0.3)",
            background: "rgba(245,166,35,0.06)",
            color: "#F5A623",
          }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{
              background: "#F5A623",
              animation: "dotPulse 2s ease-in-out infinite",
            }}
          />
          AI-Powered Solar Appointment System
        </div>

        {/* Headline */}
        <h1
          className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          style={{ letterSpacing: "-1.5px" }}
        >
          Stop Wasting Solar Leads
          <br />
          <span className="relative inline-block">
            <span style={{ color: "#F5A623" }}>Before They Become Appointments</span>
            <span
              className="absolute bottom-0 left-0 h-[3px] w-full rounded-full sm:bottom-1"
              style={{ background: "rgba(245,166,35,0.4)" }}
            />
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl"
          style={{ color: "#8B95A8" }}
        >
          Most solar companies don&apos;t have a lead problem. They have a lead
          waste problem — uncontacted leads, no-shows, and zero follow-up
          eating 40–60% of their ad spend.
        </p>
      </div>

      {/* VSL Embed */}
      <div
        className="relative z-10 mt-10 w-full max-w-3xl"
        data-reveal
      >
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(13,17,25,0.4)",
            aspectRatio: "16/9",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/1S1jJ-kWA1k"
            title="SunLeads AI — How solar companies lose 40–60% of paid leads"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            style={{ border: "none" }}
          />
        </div>
      </div>

      {/* Supporting line */}
      <p
        className="relative z-10 mt-6 max-w-xl text-center text-base font-medium"
        style={{ color: "#EAEAEA" }}
        data-reveal
      >
        Get 30 qualified booked solar appointments, or we work free until
        delivered.
      </p>

      {/* CTAs */}
      <div
        className="relative z-10 mt-6 flex flex-col items-center gap-4 sm:flex-row"
        data-reveal
      >
        {/* Primary CTA */}
        <a
          href="#a2p-form"
          className="group inline-flex items-center gap-2.5 rounded-lg px-8 py-3.5 text-base font-semibold transition-all duration-200"
          style={{ background: "#7FFF00", color: "#000" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#8FFF20";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#7FFF00";
          }}
        >
          Book a Solar Lead Waste Audit
          <svg
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            width="18"
            height="18"
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

        {/* Secondary CTA */}
        <a
          href="https://chatgpt.com/g/g-6a170671c81c8191b83d632cd865df36-solar-lead-waste-auditor"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-base font-medium transition-all duration-200"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#EAEAEA",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.background = "transparent";
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

      {/* Trust line */}
      <p
        className="relative z-10 mt-5 max-w-lg text-center text-sm"
        style={{ color: "#4A5568" }}
        data-reveal
      >
        No fluff. No generic strategy call. We audit your current lead flow,
        show you where appointments are leaking, and give you the fix —
        whether you work with us or not.
      </p>
    </section>
  );
}

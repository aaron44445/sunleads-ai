"use client";

import { useEffect, useRef } from "react";

export default function FinalCTA() {
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
      id="book"
      className="relative overflow-hidden px-6 py-16 sm:py-24"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Content */}
      <div
        className="relative mx-auto max-w-4xl text-center"
        data-reveal
      >
        {/* Heading */}
        <h2
          className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          style={{
            letterSpacing: "-1px",
          }}
        >
          Find Out Where Your Solar Appointments Are{" "}
          <span style={{ color: "#F5A623" }}>Leaking</span>
        </h2>

        {/* Body */}
        <p
          className="mx-auto mt-4 max-w-xl text-base"
          style={{ color: "#8B95A8" }}
        >
          Book a 15-minute Lead Waste Audit. We&apos;ll review your current
          pipeline, identify the biggest drop-off point, and show you what
          30 qualified appointments/month looks like for your market.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#a2p-form"
            className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-base font-semibold transition-all duration-200"
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
          <a
            href="https://chatgpt.com/g/g-6a170671c81c8191b83d632cd865df36-solar-lead-waste-auditor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-base font-medium transition-all duration-200"
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
            Take the Free Scorecard
          </a>
        </div>
      </div>

    </section>
  );
}

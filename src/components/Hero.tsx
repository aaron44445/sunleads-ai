"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { value: "500%", unit: "+", label: "Contact Rate" },
  { value: "<60", unit: "s", label: "Response Time" },
  { value: "24/7", unit: "", label: "Always Running" },
  { value: "0%", unit: "", label: "Leads Missed" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for data-reveal elements
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-16"
    >
      {/* ── Subtle Background Glow ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(245,166,35,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Hero Content ── */}
      <div
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
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
          AI-Powered Lead Generation for Solar
        </div>

        {/* Headline */}
        <h1
          className="font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
          style={{ letterSpacing: "-1.5px" }}
        >
          We Fill Your Calendar.
          <br />
          <span className="relative inline-block">
            <span style={{ color: "#F5A623" }}>Close The Deals.</span>
            <span
              className="absolute bottom-1 left-0 h-[3px] w-full rounded-full sm:bottom-2"
              style={{ background: "rgba(245,166,35,0.4)" }}
            />
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-4 max-w-2xl text-lg leading-relaxed sm:text-xl"
          style={{ color: "#8B95A8" }}
        >
          Our AI calls every lead in under 60 seconds, qualifies them, and books
          appointments directly on your calendar — so you never miss a deal again.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          {/* Primary CTA */}
          <a
            href="#book"
            className="group inline-flex items-center gap-2.5 rounded-lg px-8 py-3.5 text-base font-semibold transition-all duration-200"
            style={{ background: "#7FFF00", color: "#000" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#8FFF20";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#7FFF00";
            }}
          >
            Book Your Free Strategy Call
            {/* Arrow icon */}
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
            href="#how-it-works"
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
            See How It Works
            {/* Chevron down icon */}
            <svg
              className="transition-transform duration-200 group-hover:translate-y-0.5"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div
        className="relative z-10 mt-12 w-full max-w-4xl"
        data-reveal
      >
        <div
          className="grid grid-cols-2 gap-y-8 rounded-xl px-6 py-8 sm:grid-cols-4 sm:gap-y-0 sm:px-0 sm:py-6"
          style={{
            background: "rgba(13,17,25,0.3)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="relative flex flex-col items-center gap-1"
            >
              {/* Vertical divider — hidden on first item and on mobile between rows */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-1/2 hidden h-10 -translate-y-1/2 sm:block"
                  style={{
                    width: "1px",
                    background: "rgba(255,255,255,0.07)",
                  }}
                />
              )}
              <div className="flex items-baseline gap-0.5">
                <span className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span
                    className="text-lg font-semibold"
                    style={{ color: "#F5A623" }}
                  >
                    {stat.unit}
                  </span>
                )}
              </div>
              <span
                className="text-xs font-medium uppercase"
                style={{
                  color: "#4A5568",
                  letterSpacing: "1.5px",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

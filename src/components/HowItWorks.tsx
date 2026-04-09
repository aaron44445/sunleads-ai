"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "We Run Targeted Ads",
    description:
      "Facebook and Instagram campaigns built for solar — targeting homeowners in your service area who are actively interested in going solar.",
  },
  {
    number: "02",
    title: "AI Calls Every Lead",
    description:
      "Our AI caller contacts every lead within 60 seconds. It sounds human, qualifies the homeowner, and answers their questions — 24/7, no days off.",
  },
  {
    number: "03",
    title: "Appointments Booked",
    description:
      "Only qualified homeowners make it onto your sales calendar. You show up, present your proposal, and close the deal.",
  },
];

export default function HowItWorks() {
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
      id="process"
      className="relative overflow-hidden px-6 py-12 sm:py-16"
    >
      {/* ── Section Header ── */}
      <div className="mx-auto max-w-6xl text-center" data-reveal>
        {/* Section Tag */}
        <div className="mb-4 flex items-center justify-center gap-4">
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
            How It Works
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display text-4xl font-bold text-white sm:text-5xl"
          style={{ fontSize: "clamp(32px, 5vw, 44px)", letterSpacing: "-0.5px" }}
        >
          Three Steps to a Full Pipeline
        </h2>

        {/* Subtitle */}
        <p
          className="mx-auto mt-3 max-w-lg text-base"
          style={{ color: "#8B95A8" }}
        >
          We handle the leads. You handle the installs.
        </p>
      </div>

      {/* ── Cards Grid ── */}
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            data-reveal
            style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            className="group relative"
          >
            <div
              className="relative flex h-full flex-col overflow-hidden p-6 transition-all duration-200 ease-out"
              style={{
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(13,17,25,0.3)",
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.borderColor = "rgba(245,166,35,0.2)";
                card.style.background = "rgba(13,17,25,0.4)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.borderColor = "rgba(255,255,255,0.08)";
                card.style.background = "rgba(13,17,25,0.3)";
              }}
            >
              {/* Number Badge */}
              <div
                className="relative mb-4 flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold"
                style={{
                  background: "rgba(245,166,35,0.06)",
                  border: "1px solid rgba(245,166,35,0.12)",
                  color: "#F5A623",
                }}
              >
                {step.number}
              </div>

              {/* Title */}
              <h3
                className="font-display text-lg font-bold text-white"
                style={{ fontSize: "19px" }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="mt-2 leading-relaxed"
                style={{ color: "#8B95A8", fontSize: "14px" }}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

const INCLUDES = [
  "Targeted Meta ad campaigns built for your service area",
  "AI-powered speed-to-lead (every lead contacted in under 60 seconds)",
  "Full qualification system — only real prospects hit your calendar",
  "Automated appointment booking directly onto your reps' schedules",
  "No-show prevention with multi-touch reminders",
  "Nurture sequences for leads not yet ready to book",
  "Live pipeline dashboard — see exactly where every lead sits",
];

export default function Offer() {
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
      id="offer"
      className="relative overflow-hidden px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section Tag */}
        <div className="mb-4 flex items-center gap-4" data-reveal>
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
            The Offer
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display text-3xl font-bold text-white sm:text-4xl"
          style={{ letterSpacing: "-0.8px" }}
          data-reveal
        >
          What You Get
        </h2>

        {/* Offer Card */}
        <div
          className="mt-8 overflow-hidden rounded-xl"
          style={{
            background: "rgba(13,17,25,0.5)",
            border: "1px solid rgba(127,255,0,0.2)",
          }}
          data-reveal
        >
          {/* Card Header */}
          <div
            className="px-6 py-5 sm:px-8"
            style={{
              borderBottom: "1px solid rgba(127,255,0,0.1)",
              background: "rgba(127,255,0,0.03)",
            }}
          >
            <h3
              className="font-display text-2xl font-bold sm:text-3xl"
              style={{ color: "#7FFF00" }}
            >
              Qualified, Booked Solar Appointments
            </h3>
            <p className="mt-1 text-sm" style={{ color: "#8B95A8" }}>
              A done-for-you system from ad click to rep sitting across from a
              qualified homeowner
            </p>
          </div>

          {/* Card Body */}
          <div className="px-6 py-6 sm:px-8">
            {/* What's included */}
            <div className="mb-6">
              <p
                className="mb-3 text-xs font-semibold uppercase"
                style={{ color: "#F5A623", letterSpacing: "2px" }}
              >
                What&apos;s Included
              </p>
              <ul className="space-y-2.5">
                {INCLUDES.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "#EAEAEA", lineHeight: 1.5 }}
                  >
                    <svg
                      className="mt-0.5 shrink-0"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7FFF00"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantee */}
            <div
              className="rounded-lg px-4 py-3"
              style={{
                background: "rgba(127,255,0,0.05)",
                border: "1px solid rgba(127,255,0,0.15)",
              }}
            >
              <p className="text-sm font-medium" style={{ color: "#7FFF00" }}>
                Performance guarantee: if we don&apos;t deliver, we keep working
                at no additional cost until we do.
              </p>
            </div>

            {/* Note */}
            <p className="mt-4 text-sm" style={{ color: "#4A5568" }}>
              Pricing, appointment targets, and qualification criteria are
              covered on the audit call — every market is different.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center" data-reveal>
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
            Book Your Audit Call
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
        </div>
      </div>
    </section>
  );
}

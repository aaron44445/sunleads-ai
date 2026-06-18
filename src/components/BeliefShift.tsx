"use client";

import { useEffect, useRef } from "react";

const FUNNEL_STEPS = [
  { label: "Lead Captured", status: "ok" },
  { label: "Contact Attempted", status: "leak" },
  { label: "Qualified", status: "leak" },
  { label: "Appointment Booked", status: "leak" },
  { label: "Appointment Showed", status: "leak" },
  { label: "Deal Closed", status: "ok" },
];

export default function BeliefShift() {
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
            The Bottleneck
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display text-3xl font-bold text-white sm:text-4xl"
          style={{ letterSpacing: "-0.8px" }}
          data-reveal
        >
          The Real Bottleneck Is Usually Between{" "}
          <span style={{ color: "#F5A623" }}>
            Lead Capture and Booking
          </span>
        </h2>

        {/* Body */}
        <p
          className="mt-4 max-w-2xl"
          style={{ color: "#8B95A8", fontSize: "17px", lineHeight: 1.7 }}
          data-reveal
        >
          Most solar companies optimize the top (ads) and the bottom (closing).
          But the middle — where leads become appointments — runs on hope and
          manual effort. That&apos;s where 40–60% of your ad spend dies.
        </p>

        {/* Funnel Visual */}
        <div
          className="mt-10 flex flex-col items-center gap-0"
          data-reveal
        >
          {FUNNEL_STEPS.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center">
              {/* Connector line (above, except first) */}
              {i > 0 && (
                <div
                  className="h-6 w-[2px]"
                  style={{
                    background:
                      step.status === "leak"
                        ? "rgba(245,166,35,0.4)"
                        : "rgba(127,255,0,0.3)",
                  }}
                />
              )}

              {/* Step pill */}
              <div
                className="flex items-center gap-3 rounded-lg px-5 py-3"
                style={{
                  background:
                    step.status === "leak"
                      ? "rgba(245,166,35,0.08)"
                      : "rgba(127,255,0,0.06)",
                  border: `1px solid ${
                    step.status === "leak"
                      ? "rgba(245,166,35,0.25)"
                      : "rgba(127,255,0,0.2)"
                  }`,
                  minWidth: "260px",
                }}
              >
                {/* Status indicator */}
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    background:
                      step.status === "leak" ? "#F5A623" : "#7FFF00",
                  }}
                />
                <span
                  className="text-sm font-medium"
                  style={{
                    color:
                      step.status === "leak" ? "#F5A623" : "#7FFF00",
                  }}
                >
                  {step.label}
                </span>
                {step.status === "leak" && (
                  <span
                    className="ml-auto text-xs font-medium"
                    style={{ color: "rgba(245,166,35,0.7)" }}
                  >
                    ← leak
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Closing copy */}
        <p
          className="mt-8 text-center"
          style={{ color: "#8B95A8", fontSize: "15px", lineHeight: 1.7 }}
          data-reveal
        >
          You don&apos;t need more leads. You need to track and fix the leaks in
          the middle — where contacted leads fail to become booked, qualified
          appointments.
        </p>
      </div>
    </section>
  );
}

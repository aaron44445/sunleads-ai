"use client";

import { useEffect, useRef } from "react";

const FOR_LIST = [
  "Residential solar installers doing 10–30+ installs/month",
  "Already spending on Meta/Google ads and getting leads",
  "Have a sales team (2–15 reps) that needs qualified appointments",
  "Tired of no-shows, bad leads, and wasted ad spend",
  "Ready to invest in a system that delivers booked sits, not just leads",
];

const NOT_FOR_LIST = [
  "Solar brokers or lead resellers",
  "Companies not yet running paid ads",
  "Startups with no sales team to handle appointments",
  "Anyone looking for \"free solar leads\" or a magic bullet",
  "Companies doing fewer than 5 installs/month",
];

export default function Audience() {
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
            Fit Check
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display text-3xl font-bold text-white sm:text-4xl"
          style={{ letterSpacing: "-0.8px" }}
          data-reveal
        >
          Who This Is For
        </h2>

        {/* Two Column Grid */}
        <div
          className="mt-8 grid gap-6 sm:grid-cols-2"
          data-reveal
        >
          {/* For Column */}
          <div
            className="rounded-xl px-6 py-6"
            style={{
              background: "rgba(127,255,0,0.03)",
              border: "1px solid rgba(127,255,0,0.15)",
            }}
          >
            <p
              className="mb-4 text-sm font-semibold uppercase"
              style={{ color: "#7FFF00", letterSpacing: "2px" }}
            >
              Good Fit
            </p>
            <ul className="space-y-3">
              {FOR_LIST.map((item, i) => (
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

          {/* Not For Column */}
          <div
            className="rounded-xl px-6 py-6"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              className="mb-4 text-sm font-semibold uppercase"
              style={{ color: "#4A5568", letterSpacing: "2px" }}
            >
              Not a Fit
            </p>
            <ul className="space-y-3">
              {NOT_FOR_LIST.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "#8B95A8", lineHeight: 1.5 }}
                >
                  <svg
                    className="mt-0.5 shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4A5568"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

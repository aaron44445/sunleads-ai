"use client";

import { useEffect, useRef } from "react";

const PROBLEMS = [
  "Leads come in but nobody calls them back within 5 minutes",
  "Reps cherry-pick the \"best\" leads and ignore the rest",
  "No system to follow up after the first missed call",
  "Appointments get booked but 40%+ no-show",
  "No pre-qualification — reps sit with unqualified prospects",
  "You're paying for leads that never get a real conversation",
];

export default function Problem() {
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
      id="problem"
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
            The Real Problem
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          style={{ letterSpacing: "-0.8px" }}
          data-reveal
        >
          Your Leads Might Not Be Bad.{" "}
          <span style={{ color: "#F5A623" }}>
            They Might Be Getting Wasted.
          </span>
        </h2>

        {/* Body */}
        <div className="mt-6 max-w-3xl space-y-4" data-reveal>
          <p style={{ color: "#8B95A8", fontSize: "17px", lineHeight: 1.7 }}>
            Solar companies spend $3,000–$10,000/month on Meta ads. The leads
            come in. But somewhere between form fill and booked appointment,
            most of them disappear.
          </p>
          <p style={{ color: "#8B95A8", fontSize: "17px", lineHeight: 1.7 }}>
            It&apos;s not that the leads are bad. It&apos;s that the system
            between &quot;lead captured&quot; and &quot;rep sitting across from a
            homeowner&quot; is broken — or doesn&apos;t exist at all.
          </p>
        </div>

        {/* Problem Bullets */}
        <div
          className="mt-8 rounded-xl p-6 sm:p-8"
          style={{
            background: "rgba(13,17,25,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          data-reveal
        >
          <p
            className="mb-4 text-sm font-semibold uppercase"
            style={{ color: "#F5A623", letterSpacing: "2px" }}
          >
            Sound familiar?
          </p>
          <ul className="space-y-3">
            {PROBLEMS.map((problem, i) => (
              <li
                key={i}
                className="flex items-start gap-3"
                style={{ color: "#EAEAEA", fontSize: "15px", lineHeight: 1.6 }}
              >
                <span
                  className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "#F5A623" }}
                />
                {problem}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

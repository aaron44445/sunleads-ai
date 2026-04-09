"use client";

import { useEffect, useRef } from "react";

export default function About() {
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
      id="about"
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
            About
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display text-4xl font-bold text-white sm:text-5xl"
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            letterSpacing: "-0.8px",
          }}
        >
          Why SunLeads AI
        </h2>

        {/* Subtitle */}
        <p
          className="mx-auto mt-3 max-w-xl text-base"
          style={{ color: "#8B95A8" }}
        >
          We&rsquo;re not another marketing agency. We&rsquo;re your growth
          engine.
        </p>
      </div>

      {/* ── Content ── */}
      <div
        className="mx-auto mt-10 max-w-3xl"
        data-reveal
        style={{ transitionDelay: "0.15s" }}
      >
        <h3
          className="font-display font-bold text-white"
          style={{ fontSize: "28px", lineHeight: 1.3 }}
        >
          Most solar companies lose leads before they even pick up the phone.
        </h3>

        <p
          className="mt-6"
          style={{
            color: "#8B95A8",
            fontSize: "16px",
            lineHeight: 1.8,
          }}
        >
          Studies show that leads contacted within 5 minutes are 500% more
          likely to convert. But most sales teams take hours — or never call
          back at all.
        </p>

        <p
          className="mt-4"
          style={{
            color: "#8B95A8",
            fontSize: "16px",
            lineHeight: 1.8,
          }}
        >
          SunLeads AI fixes that. Our AI-powered system calls every lead
          instantly, qualifies them with real conversation, and books the good
          ones straight onto your calendar. You stop chasing. You start
          closing.
        </p>

        {/* ── Guarantee Badge ── */}
        <div
          className="mt-8 inline-flex items-center gap-3 rounded-xl px-5 py-3.5"
          style={{
            background: "rgba(127,255,0,0.06)",
            border: "1px solid rgba(127,255,0,0.2)",
          }}
        >
          {/* Shield + Check SVG */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7FFF00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span
            className="text-sm font-medium"
            style={{ color: "#7FFF00" }}
          >
            30 appointments in 90 days, or we keep working for free.
          </span>
        </div>
      </div>
    </section>
  );
}

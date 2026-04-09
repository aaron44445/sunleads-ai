"use client";

import { useEffect, useRef, useCallback } from "react";

const METRICS = [
  {
    value: 30,
    prefix: "",
    suffix: "+",
    label: "Appointments guaranteed in 90 days",
    gold: true,
  },
  {
    value: 25,
    prefix: "$",
    suffix: "K+",
    label: "Average solar deal value",
    gold: false,
  },
  {
    value: 60,
    prefix: "<",
    suffix: "s",
    label: "AI lead response time",
    gold: true,
  },
  {
    value: 90,
    prefix: "",
    suffix: "",
    label: "Day performance guarantee",
    gold: false,
  },
];

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersStarted = useRef(false);

  const animateCounter = useCallback(
    (el: HTMLElement, target: number, duration: number) => {
      const start = performance.now();
      const update = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Power ease-out curve (cubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = String(current);
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = String(target);
        }
      };
      requestAnimationFrame(update);
    },
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Scroll reveal observer
    const reveals = section.querySelectorAll("[data-reveal]");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    // Counter animation observer
    const counterEls = section.querySelectorAll("[data-target]");
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted.current) {
            countersStarted.current = true;
            counterEls.forEach((el) => {
              const target = parseInt(
                (el as HTMLElement).dataset.target || "0",
                10
              );
              animateCounter(el as HTMLElement, target, 2000);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const grid = section.querySelector("[data-counter-grid]");
    if (grid) counterObserver.observe(grid);

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, [animateCounter]);

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative overflow-hidden px-6 py-12 sm:py-16"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >

      {/* ── Section Header ── */}
      <div className="relative mx-auto max-w-6xl text-center" data-reveal>
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
            Results
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
          Built to Scale Solar Companies
        </h2>

        {/* Subtitle */}
        <p
          className="mx-auto mt-3 max-w-lg text-base"
          style={{ color: "#8B95A8" }}
        >
          Numbers that move the needle.
        </p>
      </div>

      {/* ── Metrics Grid ── */}
      <div
        data-counter-grid
        className="relative mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {METRICS.map((metric, i) => (
          <div
            key={metric.label}
            data-reveal
            style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
          >
            <div
              className="flex h-full flex-col items-center justify-center px-4 py-10 text-center transition-all duration-200 ease-out sm:px-6"
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
              {/* Number */}
              <div
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(40px, 6vw, 52px)",
                  letterSpacing: "-2px",
                  color: metric.gold ? "#F5A623" : "#FFFFFF",
                  lineHeight: 1.1,
                }}
              >
                {metric.prefix && (
                  <span>{metric.prefix}</span>
                )}
                <span data-target={metric.value}>0</span>
                {metric.suffix && (
                  <span>{metric.suffix}</span>
                )}
              </div>

              {/* Label */}
              <p
                className="mt-3 text-sm leading-snug"
                style={{ color: "#8B95A8", maxWidth: "180px" }}
              >
                {metric.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

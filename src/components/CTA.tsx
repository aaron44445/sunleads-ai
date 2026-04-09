"use client";

import { useEffect, useRef } from "react";

export default function CTA() {
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
      className="relative overflow-hidden px-6 py-12 sm:py-16"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Content ── */}
      <div
        className="relative mx-auto max-w-4xl text-center"
        data-reveal
      >
        {/* Heading */}
        <h2
          className="font-display text-4xl font-bold text-white sm:text-5xl"
          style={{
            fontSize: "clamp(36px, 5vw, 52px)",
            letterSpacing: "-1px",
          }}
        >
          Ready to{" "}
          <span style={{ color: "#F5A623" }}>Fill Your Calendar?</span>
        </h2>

        {/* Subtitle */}
        <p
          className="mx-auto mt-3 max-w-xl text-base"
          style={{ color: "#8B95A8" }}
        >
          Book a free strategy call and see how our AI-powered system can
          transform your solar lead pipeline in 30 days.
        </p>
      </div>

      {/* ── Calendar Embed ── */}
      <div
        className="relative mx-auto mt-8"
        style={{ maxWidth: "660px" }}
        data-reveal
      >
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(13,17,25,0.3)",
          }}
        >
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/eNLEbcTw42cqH0HQNZat"
            style={{
              width: "100%",
              border: "none",
              overflow: "hidden",
              minHeight: "600px",
            }}
            scrolling="no"
            id="eNLEbcTw42cqH0HQNZat_booking"
          />
        </div>
      </div>
      <script src="https://link.msgsndr.com/js/form_embed.js" type="text/javascript"></script>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function A2PForm() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
      id="a2p-form"
      className="relative overflow-hidden px-6 pt-28 pb-16"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 20%, rgba(245,166,35,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-2xl text-center" data-reveal>
        {/* Eyebrow */}
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider"
          style={{
            border: "1px solid rgba(245,166,35,0.25)",
            background: "rgba(245,166,35,0.06)",
            color: "#F5A623",
          }}
        >
          Quick Start
        </div>

        <h2
          className="font-display text-2xl font-bold text-white sm:text-3xl"
          style={{ letterSpacing: "-0.5px" }}
        >
          Get Started in 60 Seconds
        </h2>
        <p
          className="mx-auto mt-2 max-w-md text-sm leading-relaxed"
          style={{ color: "#8B95A8" }}
        >
          Fill out the form below and we&apos;ll reach out to set up your
          solar lead system.
        </p>
      </div>

      {/* Form card */}
      <div
        className="relative mx-auto mt-8 max-w-2xl"
        data-reveal
      >
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(13,17,25,0.4)",
          }}
        >
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/LD1eLn8kx2XYaYrFlHCi"
            style={{
              width: "100%",
              height: "625px",
              border: "none",
            }}
            id="inline-LD1eLn8kx2XYaYrFlHCi"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="A2P Form for website"
            data-height="625"
            data-layout-iframe-id="inline-LD1eLn8kx2XYaYrFlHCi"
            data-form-id="LD1eLn8kx2XYaYrFlHCi"
            title="A2P Form for website"
          />
        </div>

        {/* A2P SMS Disclosure */}
        <p
          className="mt-4 text-center text-xs leading-relaxed"
          style={{ color: "#4A5568" }}
        >
          By submitting this form, you consent to receive SMS/MMS messages
          from SunLeads AI including appointment reminders, service updates,
          and marketing messages. Message frequency varies. Message and data
          rates may apply. Reply STOP to opt out at any time. Reply HELP for
          assistance.{" "}
          <Link href="/privacy" className="underline" style={{ color: "#8B95A8" }}>
            Privacy Policy
          </Link>{" "}
          &amp;{" "}
          <Link href="/terms" className="underline" style={{ color: "#8B95A8" }}>
            Terms &amp; Conditions
          </Link>
        </p>
      </div>
    </section>
  );
}

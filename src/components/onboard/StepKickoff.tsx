"use client";

import { useState, useEffect } from "react";
import type { OnboardingData } from "@/lib/types";
import GlassCard from "./GlassCard";

const GHL_CALENDAR_URL =
  "https://api.leadconnectorhq.com/widget/booking/2Bq8HTCK3izLu9aJRbES";

const PREP_ITEMS = [
  "Your company logo files (PNG or SVG preferred)",
  "2-3 customer testimonials or Google review links",
  "What makes you different from competitors in your area",
  "Target zip codes or cities you want to generate leads in",
  "Average system size you typically install",
  "Financing products you offer (loan, lease, PPA, cash)",
];

export default function StepKickoff({
  data,
  onNext,
  loading,
}: {
  data: OnboardingData;
  onNext: (data: Record<string, unknown>) => void;
  loading: boolean;
}) {
  const [booked, setBooked] = useState(data.kickoff_booked ?? false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <GlassCard>
      <div className="mb-6">
        <h2
          className="font-display text-xl font-bold text-white"
          style={{ letterSpacing: "-0.3px" }}
        >
          Book Your Success Call
        </h2>
        <p className="mt-1 text-sm" style={{ color: "#8B95A8" }}>
          This is a 30-minute call where we finalize your targeting, review your
          ad copy and creative, and lock in your launch timeline.
        </p>
      </div>

      {/* Calendar embed */}
      <div
        className="mb-6 overflow-hidden rounded-lg"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <iframe
          src={GHL_CALENDAR_URL}
          style={{ width: "100%", height: "600px", border: "none" }}
          title="Book Success Call"
        />
      </div>

      {/* Prep checklist */}
      <div
        className="mb-6 rounded-lg p-4"
        style={{
          background: "rgba(245,166,35,0.04)",
          border: "1px solid rgba(245,166,35,0.12)",
        }}
      >
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "#F5A623" }}
        >
          What to Have Ready for the Call
        </p>
        <ul className="space-y-2">
          {PREP_ITEMS.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#EAEAEA" }}>
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "#F5A623" }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Checkbox */}
      <label
        className="flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors"
        style={{
          background: booked ? "rgba(127,255,0,0.05)" : "transparent",
          border: booked
            ? "1px solid rgba(127,255,0,0.2)"
            : "1px solid rgba(255,255,255,0.06)",
          borderRadius: "8px",
        }}
      >
        <input
          type="checkbox"
          checked={booked}
          onChange={(e) => setBooked(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded accent-green-400"
        />
        <span className="text-sm" style={{ color: "#EAEAEA" }}>
          I&apos;ve booked my success call
        </span>
      </label>

      <button
        onClick={() =>
          onNext({
            kickoff_booked: booked,
            kickoff_booked_at: booked ? new Date().toISOString() : null,
          })
        }
        disabled={!booked || loading}
        className="mt-6 w-full rounded-lg px-6 py-3.5 text-sm font-bold transition-opacity disabled:opacity-50"
        style={{ background: "#7FFF00", color: "#080B10" }}
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </GlassCard>
  );
}

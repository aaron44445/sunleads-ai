"use client";

import { useState } from "react";
import type { OnboardingData } from "@/lib/types";
import GlassCard from "./GlassCard";

const SLACK_INVITE_URL = "https://join.slack.com/t/sunleadsai/shared_invite/zt-40ednbf3r-~ugUZRVTeZSkgel6juZWPQ";

export default function StepSlack({
  data,
  onNext,
  loading,
}: {
  data: OnboardingData;
  onNext: (data: Record<string, unknown>) => void;
  loading: boolean;
}) {
  const [joined, setJoined] = useState(data.slack_joined ?? false);

  return (
    <GlassCard>
      <div className="mb-6">
        <h2
          className="font-display text-xl font-bold text-white"
          style={{ letterSpacing: "-0.3px" }}
        >
          Join Our Slack
        </h2>
        <p className="mt-1 text-sm" style={{ color: "#8B95A8" }}>
          Slack is where we communicate during your campaign. You&apos;ll get a
          private channel for real-time updates, lead alerts, and direct access
          to your team.
        </p>
      </div>

      {/* Instructions */}
      <div
        className="mb-6 rounded-lg p-4"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <ol className="space-y-3 text-sm" style={{ color: "#EAEAEA" }}>
          <li className="flex gap-3">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: "rgba(245,166,35,0.15)", color: "#F5A623" }}
            >
              1
            </span>
            Click the button below to open the Slack invite
          </li>
          <li className="flex gap-3">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: "rgba(245,166,35,0.15)", color: "#F5A623" }}
            >
              2
            </span>
            Create an account or sign in with your existing Slack
          </li>
          <li className="flex gap-3">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: "rgba(245,166,35,0.15)", color: "#F5A623" }}
            >
              3
            </span>
            Check the box below once you&apos;re in
          </li>
        </ol>
      </div>

      {/* Slack invite button */}
      <a
        href={SLACK_INVITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#EAEAEA",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M14.5 2a2.5 2.5 0 00-2.5 2.5V9h4.5A2.5 2.5 0 0014.5 2z" fill="#E01E5A"/>
          <path d="M2 14.5a2.5 2.5 0 002.5 2.5H9V12.5A2.5 2.5 0 002 14.5z" fill="#36C5F0"/>
          <path d="M9.5 22a2.5 2.5 0 002.5-2.5V15H7.5A2.5 2.5 0 009.5 22z" fill="#2EB67D"/>
          <path d="M22 9.5a2.5 2.5 0 00-2.5-2.5H15v4.5A2.5 2.5 0 0022 9.5z" fill="#ECB22E"/>
        </svg>
        Open Slack Invite
      </a>

      {/* Checkbox */}
      <label
        className="flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors"
        style={{
          background: joined ? "rgba(127,255,0,0.05)" : "transparent",
          border: joined
            ? "1px solid rgba(127,255,0,0.2)"
            : "1px solid rgba(255,255,255,0.06)",
          borderRadius: "8px",
        }}
      >
        <input
          type="checkbox"
          checked={joined}
          onChange={(e) => setJoined(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded accent-green-400"
        />
        <span className="text-sm" style={{ color: "#EAEAEA" }}>
          I&apos;ve joined the SunLeads AI Slack workspace
        </span>
      </label>

      <button
        onClick={() => onNext({ slack_joined: joined })}
        disabled={!joined || loading}
        className="mt-6 w-full rounded-lg px-6 py-3.5 text-sm font-bold transition-opacity disabled:opacity-50"
        style={{ background: "#7FFF00", color: "#080B10" }}
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </GlassCard>
  );
}

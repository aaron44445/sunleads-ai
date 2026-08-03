"use client";

import { useState } from "react";
import type { OnboardingData } from "@/lib/types";
import { estimateMonthlyCost, A2P_ONE_TIME_FEE } from "@/lib/costEstimate";
import GlassCard from "./GlassCard";

const DEFAULT_DAILY_AD_BUDGET = 40;

const GUIDE_STEPS = [
  {
    num: 1,
    title: "Create your own Retell account",
    desc: "Sign up at retell.ai using your own business email — this is the AI voice caller that qualifies and calls your leads.",
  },
  {
    num: 2,
    title: "Add a payment method inside Retell",
    desc: "In Retell's billing settings, add a card. This is what covers your AI-caller minutes going forward — it's billed to you directly, not to us.",
  },
  {
    num: 3,
    title: "Connect that Retell account to your GHL sub-account",
    desc: "In GoHighLevel, open the Retell connector app (under Integrations / Marketplace) and link it to the Retell account you just created.",
  },
  {
    num: 4,
    title: "Confirm SMS + A2P billing is on your sub-account",
    desc: "Text messages and A2P carrier fees run through your GHL sub-account's own billing, same as the Retell minutes — nothing routes through our account.",
  },
];

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

export default function StepRetellBilling({
  data,
  onNext,
  loading,
  dailyAdBudget,
}: {
  data: OnboardingData;
  onNext: (data: Record<string, unknown>) => void;
  loading: boolean;
  dailyAdBudget?: number | null;
}) {
  const [connected, setConnected] = useState(data.retell_billing_connected ?? false);
  const [notes, setNotes] = useState(data.retell_notes ?? "");

  const estimate = estimateMonthlyCost(dailyAdBudget ?? DEFAULT_DAILY_AD_BUDGET);

  function handleSubmit() {
    onNext({
      retell_billing_connected: connected,
      retell_notes: notes || null,
    });
  }

  return (
    <GlassCard>
      <div className="mb-6">
        <h2
          className="font-display text-xl font-bold text-white"
          style={{ letterSpacing: "-0.3px" }}
        >
          Connect Your AI Caller & Billing
        </h2>
        <p className="mt-1 text-sm" style={{ color: "#8B95A8" }}>
          Your AI voice calls, texts, and carrier registration run on your own
          account — so the ongoing usage is billed to you, not to us.
        </p>
      </div>

      {/* Cost estimate */}
      <div
        className="mb-6 rounded-lg p-4"
        style={{
          background: "rgba(245,166,35,0.04)",
          border: "1px solid rgba(245,166,35,0.12)",
        }}
      >
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "#F5A623" }}
        >
          What this actually costs
        </p>
        <ul className="space-y-1.5 text-sm" style={{ color: "#EAEAEA" }}>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#F5A623" }} />
            <span>
              AI voice calls (Retell): roughly{" "}
              <strong className="text-white">
                ${estimate.retellLow}&ndash;{estimate.retellHigh}/mo
              </strong>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#F5A623" }} />
            <span>
              Texting (GHL SMS): roughly{" "}
              <strong className="text-white">
                ${estimate.smsLow}&ndash;{estimate.smsHigh}/mo
              </strong>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#F5A623" }} />
            <span>
              Carrier registration (A2P): a one-time{" "}
              <strong className="text-white">~${A2P_ONE_TIME_FEE}</strong> fee,
              then <strong className="text-white">~$2&ndash;10/mo</strong>
            </span>
          </li>
        </ul>
        <p className="mt-3 text-sm font-semibold" style={{ color: "#7FFF00" }}>
          Typical total: ~${estimate.totalLow}&ndash;{estimate.totalHigh}/month
          (~{estimate.leadsLow}&ndash;{estimate.leadsHigh} leads/mo at your ad
          budget), plus a ~${A2P_ONE_TIME_FEE} one-time fee in month one.
        </p>
        <p className="mt-2 text-xs" style={{ color: "#8B95A8" }}>
          This is usage-based, not a flat subscription — it moves with how many
          leads come in, not a fixed number. More ad spend and more leads means
          a bit more here; a quiet month costs less.
        </p>
      </div>

      {/* Guide */}
      <div className="mb-6 space-y-3">
        {GUIDE_STEPS.map((step) => (
          <div
            key={step.num}
            className="flex items-start gap-3 rounded-lg p-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: "rgba(245,166,35,0.15)", color: "#F5A623" }}
            >
              {step.num}
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{step.title}</p>
              <p className="mt-0.5 text-sm" style={{ color: "#8B95A8" }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label
          className="mb-1 block text-xs font-medium"
          style={{ color: "#8B95A8" }}
        >
          Notes{" "}
          <span className="font-normal">
            (optional &mdash; questions, issues, need help?)
          </span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full resize-none rounded-lg px-4 py-3 text-sm text-white outline-none"
          style={inputStyle}
        />
      </div>

      {/* Checkbox */}
      <label
        className="flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors"
        style={{
          background: connected ? "rgba(127,255,0,0.05)" : "transparent",
          border: connected
            ? "1px solid rgba(127,255,0,0.2)"
            : "1px solid rgba(255,255,255,0.06)",
          borderRadius: "8px",
        }}
      >
        <input
          type="checkbox"
          checked={connected}
          onChange={(e) => setConnected(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded accent-green-400"
        />
        <span className="text-sm" style={{ color: "#EAEAEA" }}>
          I&apos;ve created my Retell account, added a payment method, and connected it to my GHL sub-account.
        </span>
      </label>

      <button
        onClick={handleSubmit}
        disabled={!connected || loading}
        className="mt-6 w-full rounded-lg px-6 py-3.5 text-sm font-bold transition-opacity disabled:opacity-50"
        style={{ background: "#7FFF00", color: "#080B10" }}
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </GlassCard>
  );
}

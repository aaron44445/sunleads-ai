"use client";

import { useState } from "react";
import type { OnboardingData } from "@/lib/types";
import { estimateMonthlyCost, A2P_ONE_TIME_FEE } from "@/lib/costEstimate";
import GlassCard from "./GlassCard";

const DEFAULT_DAILY_AD_BUDGET = 40;
const INVITE_EMAIL = "aaronmcbride577@gmail.com";

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(INVITE_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-xs font-mono transition-colors"
      style={{
        background: copied ? "rgba(127,255,0,0.15)" : "rgba(245,166,35,0.12)",
        color: copied ? "#7FFF00" : "#F5A623",
        cursor: "pointer",
        border: "none",
      }}
      title="Click to copy"
    >
      {INVITE_EMAIL}
    </button>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      style={{ color: "#F5A623" }}
    >
      {children}
    </a>
  );
}

const GUIDE_STEPS = [
  {
    num: 1,
    title: "Create your own Retell account",
    summary: "Sign up at dashboard.retellai.com with your own business email.",
    details: (
      <ol className="list-decimal space-y-2 pl-4 text-sm" style={{ color: "#EAEAEA" }}>
        <li>
          Go to <ExternalLink href="https://dashboard.retellai.com/">dashboard.retellai.com</ExternalLink>{" "}
          and click <strong className="text-white">Sign Up</strong>.
        </li>
        <li>Use your own business email — not a personal one, and not ours.</li>
        <li>Verify your email if prompted. You&apos;re in.</li>
      </ol>
    ),
  },
  {
    num: 2,
    title: "Add a payment method inside Retell",
    summary: "Dashboard → Billing → add a card.",
    details: (
      <ol className="list-decimal space-y-2 pl-4 text-sm" style={{ color: "#EAEAEA" }}>
        <li>
          In <ExternalLink href="https://dashboard.retellai.com/">the Retell dashboard</ExternalLink>,
          find <strong className="text-white">Billing</strong> in the left-side menu.
        </li>
        <li>Add a card there.</li>
        <li>
          This is what covers your AI-caller minutes going forward — billed to you
          directly, not to us.
        </li>
      </ol>
    ),
  },
  {
    num: 3,
    title: "Invite us onto your Retell account",
    summary: "Team settings → invite us as Developer (not Admin).",
    details: (
      <ol className="list-decimal space-y-2 pl-4 text-sm" style={{ color: "#EAEAEA" }}>
        <li>In the Retell dashboard, open your workspace&apos;s team/user management settings.</li>
        <li>
          Invite <CopyEmail /> and set the role to{" "}
          <strong className="text-white">Developer</strong>.
        </li>
        <li>
          Developer gives full access to build and configure your call agent,
          plus the API/webhook access needed to connect it to GHL — without
          touching your billing or being able to manage other members. It
          doesn&apos;t hand over ownership.
        </li>
        <li>
          Not sure where the invite screen is? See{" "}
          <ExternalLink href="https://docs.retellai.com/accounts/access-control">
            Retell&apos;s access control docs
          </ExternalLink>
          .
        </li>
      </ol>
    ),
  },
  {
    num: 4,
    title: "Add a payment method to your GHL sub-account",
    summary: "In your sub-account (not our agency account): Settings → Billing → Add New Card.",
    details: (
      <ol className="list-decimal space-y-2 pl-4 text-sm" style={{ color: "#EAEAEA" }}>
        <li>
          Make sure you&apos;re inside <strong className="text-white">your</strong>{" "}
          GHL sub-account — not our agency account.
        </li>
        <li>
          Go to <strong className="text-white">Settings → Billing</strong>.
        </li>
        <li>
          Find the <strong className="text-white">Payment Methods</strong> section,
          click <strong className="text-white">Add New Card</strong>, and enter your
          card details.
        </li>
        <li>
          That&apos;s what covers your texting and A2P carrier fees directly —
          separate from Retell, and separate from us.
        </li>
        <li>
          Full walkthrough:{" "}
          <ExternalLink href="https://help.gohighlevel.com/support/solutions/articles/155000004182-account-billing-dashboard">
            GHL&apos;s billing dashboard guide
          </ExternalLink>
          .
        </li>
      </ol>
    ),
  },
];

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
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

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

      {/* Guide — expandable step-by-step */}
      <div className="mb-6 space-y-3">
        {GUIDE_STEPS.map((step) => (
          <div
            key={step.num}
            className="rounded-lg overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <button
              type="button"
              onClick={() =>
                setExpandedStep(expandedStep === step.num ? null : step.num)
              }
              className="flex w-full items-start gap-3 p-4 text-left"
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
                  {step.summary}
                </p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-1 shrink-0 transition-transform duration-200"
                style={{
                  transform:
                    expandedStep === step.num ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="#4A5568"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {expandedStep === step.num && (
              <div
                className="px-4 pb-4 pt-1"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div className="mt-3">{step.details}</div>
              </div>
            )}
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
          I&apos;ve created my Retell account, added a payment method to it,
          invited <CopyEmail /> as a Developer, and added a payment method to
          my GHL sub-account.
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

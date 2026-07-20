"use client";

import { useState } from "react";
import Image from "next/image";
import type { OnboardingData } from "@/lib/types";
import GlassCard from "./GlassCard";

const INVITE_EMAIL = "aaronmcbride577@gmail.com";

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
      {copied ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2" />
        </svg>
      )}
    </button>
  );
}

const GUIDE_STEPS = [
  {
    num: 1,
    title: "Open Settings",
    desc: (
      <>
        Go to{" "}
        <a
          href="https://business.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "#F5A623" }}
        >
          business.facebook.com
        </a>
        . Click{" "}
        <strong className="text-white">Settings</strong> in the bottom-left
        sidebar, then click{" "}
        <strong className="text-white">People</strong> under Users.
      </>
    ),
    img: "/guides/fb/step1-settings.png",
  },
  {
    num: 2,
    title: "Click Invite People",
    desc: (
      <>
        On the People page, click the blue{" "}
        <strong className="text-white">+ Invite people</strong> button in the
        top-right corner.
      </>
    ),
    img: "/guides/fb/step2-users.png",
  },
  {
    num: 3,
    title: "Enter Our Email",
    desc: (
      <>
        Type <CopyEmail /> into the email field, then click{" "}
        <strong className="text-white">Next</strong>.
      </>
    ),
    img: "/guides/fb/step3-invite.png",
  },
  {
    num: 4,
    title: "Grant Full Control",
    desc: (
      <>
        Under <strong className="text-white">Full Control</strong>, toggle the
        switch next to <strong className="text-white">Manage</strong> so
        it&apos;s turned on. Then click{" "}
        <strong className="text-white">Next</strong>.
      </>
    ),
    img: "/guides/fb/step4-full-control.png",
  },
  {
    num: 5,
    title: "Skip Asset Assignment",
    desc: (
      <>
        Don&apos;t select any assets &mdash; leave it at{" "}
        <strong className="text-white">0 assets selected</strong>. Just click{" "}
        <strong className="text-white">Next</strong>.
      </>
    ),
    img: "/guides/fb/step5-assets.png",
  },
  {
    num: 6,
    title: "Send the Invite",
    desc: (
      <>
        Review the invitation details, then click{" "}
        <strong className="text-white">
          Invite with 0 assets
        </strong>
        . That&apos;s it &mdash; you&apos;re done.
      </>
    ),
    img: "/guides/fb/step6-confirm.png",
  },
];

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

export default function StepFacebook({
  data,
  onNext,
  loading,
  variant = "company_owner",
}: {
  data: OnboardingData;
  onNext: (data: Record<string, unknown>) => void;
  loading: boolean;
  variant?: "company_owner" | "individual_closer";
}) {
  const isIndividual = variant === "individual_closer";
  const [connected, setConnected] = useState(data.fb_connected ?? false);
  const [notes, setNotes] = useState(data.fb_notes ?? "");
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [fbAccess, setFbAccess] = useState<"has_admin" | "needs_new_page" | null>(
    data.fb_page_access ?? null
  );
  const [desiredPageName, setDesiredPageName] = useState<string>(
    data.desired_page_name ?? ""
  );

  const needsNewPage = isIndividual && fbAccess === "needs_new_page";
  const showInviteFlow = !isIndividual || fbAccess === "has_admin";

  const canSubmit = isIndividual
    ? fbAccess === "has_admin"
      ? connected
      : fbAccess === "needs_new_page"
        ? desiredPageName.trim().length > 0 && connected
        : false
    : connected;

  function handleSubmit() {
    onNext({
      fb_connected: connected,
      fb_notes: notes || null,
      ...(isIndividual && {
        fb_page_access: fbAccess,
        desired_page_name: needsNewPage ? desiredPageName.trim() : null,
      }),
    });
  }

  return (
    <GlassCard>
      <div className="mb-6">
        <h2
          className="font-display text-xl font-bold text-white"
          style={{ letterSpacing: "-0.3px" }}
        >
          Connect Facebook
        </h2>
        <p className="mt-1 text-sm" style={{ color: "#8B95A8" }}>
          {isIndividual
            ? "Choose how we'll run your ads. Two options below."
            : "We need access to your Meta Business Suite so we can run ads on your behalf. Follow the steps below to invite us."}
        </p>
      </div>

      {isIndividual && (
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {[
            {
              key: "has_admin" as const,
              title: "I have admin access to the company Page",
              blurb:
                "You'll invite us into the company's existing Meta Business Suite.",
            },
            {
              key: "needs_new_page" as const,
              title: "I need a new Page built under my name",
              blurb:
                "We'll spin up a personal-brand Page and ad account for you.",
            },
          ].map((opt) => {
            const active = fbAccess === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setFbAccess(opt.key)}
                className="rounded-xl p-4 text-left transition-colors"
                style={{
                  background: active
                    ? "rgba(127,255,0,0.06)"
                    : "rgba(255,255,255,0.03)",
                  border: active
                    ? "1px solid rgba(127,255,0,0.25)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  className="text-sm font-bold"
                  style={{ color: active ? "#7FFF00" : "#EAEAEA" }}
                >
                  {opt.title}
                </p>
                <p className="mt-1 text-xs" style={{ color: "#8B95A8" }}>
                  {opt.blurb}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {needsNewPage && (
        <div
          className="mb-6 rounded-lg p-4"
          style={{
            background: "rgba(127,255,0,0.04)",
            border: "1px solid rgba(127,255,0,0.15)",
          }}
        >
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#7FFF00" }}
          >
            We'll build the Page
          </p>
          <p className="mb-4 text-sm" style={{ color: "#EAEAEA" }}>
            Give us the desired Page name / handle. We'll set up the Meta
            Business Suite under your name and hand back full admin access
            before we launch.
          </p>
          <label className="mb-1 block text-xs font-medium" style={{ color: "#8B95A8" }}>
            Desired Page name / handle <span style={{ color: "#FF6B6B" }}>*</span>
          </label>
          <input
            type="text"
            value={desiredPageName}
            onChange={(e) => setDesiredPageName(e.target.value)}
            placeholder="e.g. Nick Nascimento Solar"
            className="w-full rounded-lg px-4 py-3 text-sm text-white outline-none"
            style={inputStyle}
          />
        </div>
      )}

      {isIndividual && !fbAccess && (
        <p className="mb-6 text-xs" style={{ color: "#8B95A8" }}>
          Pick one of the two options above to continue.
        </p>
      )}

      {showInviteFlow && (
      <>
      {/* Prerequisites */}
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
          Before you start
        </p>
        <ul className="space-y-1.5 text-sm" style={{ color: "#EAEAEA" }}>
          <li className="flex items-start gap-2">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: "#F5A623" }}
            />
            <span>
              You need a{" "}
              <a
                href="https://www.facebook.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "#F5A623" }}
              >
                Facebook personal account
              </a>
              . If you don&apos;t have one, create one first.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: "#F5A623" }}
            />
            <span>
              You need a{" "}
              <a
                href="https://business.facebook.com/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "#F5A623" }}
              >
                Meta Business Suite account
              </a>
              . If you don&apos;t have one,{" "}
              <a
                href="https://business.facebook.com/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "#F5A623" }}
              >
                click here to create one
              </a>{" "}
              &mdash; it takes about 2 minutes.
            </span>
          </li>
        </ul>
      </div>

      {/* Step-by-step guide with screenshots */}
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
            {/* Step header — always visible */}
            <button
              type="button"
              onClick={() =>
                setExpandedStep(expandedStep === step.num ? null : step.num)
              }
              className="flex w-full items-start gap-3 p-4 text-left"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: "rgba(245,166,35,0.15)",
                  color: "#F5A623",
                }}
              >
                {step.num}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{step.title}</p>
                <p className="mt-0.5 text-sm" style={{ color: "#8B95A8" }}>
                  {step.desc}
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
                    expandedStep === step.num
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
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

            {/* Screenshot — shown when expanded */}
            {expandedStep === step.num && (
              <div
                className="px-4 pb-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div
                  className="mt-3 overflow-hidden rounded-md"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Image
                    src={step.img}
                    alt={`Step ${step.num}: ${step.title}`}
                    width={1280}
                    height={720}
                    className="w-full h-auto"
                    style={{ display: "block" }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      </>
      )}

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
          {needsNewPage ? (
            <>Locked in — I&apos;m ready for Aaron to build the Page.</>
          ) : (
            <>I&apos;ve sent the invite to <CopyEmail /></>
          )}
        </span>
      </label>

      <button
        onClick={handleSubmit}
        disabled={!canSubmit || loading}
        className="mt-6 w-full rounded-lg px-6 py-3.5 text-sm font-bold transition-opacity disabled:opacity-50"
        style={{ background: "#7FFF00", color: "#080B10" }}
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </GlassCard>
  );
}

"use client";

import { useState } from "react";

const OFFERS = {
  pay_per_sit: {
    label: "Pay-Per-Sit",
    setup_fee: 0,
    per_sit_fee: 250,
    daily_ad_budget: 200,
    term_days: 90,
  },
  foundation: {
    label: "Foundation",
    setup_fee: 1500,
    per_sit_fee: 100,
    daily_ad_budget: 100,
    term_days: 90,
  },
} as const;

type OfferType = keyof typeof OFFERS;

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const labelStyle = { color: "#F5A623" };

export default function DealReportClient() {
  const [loading, setLoading] = useState(false);
  const [offerType, setOfferType] = useState<OfferType>("pay_per_sit");
  const [setupFee, setSetupFee] = useState<number>(OFFERS.pay_per_sit.setup_fee);
  const [perSitFee, setPerSitFee] = useState<number>(OFFERS.pay_per_sit.per_sit_fee);
  const [dailyBudget, setDailyBudget] = useState<number>(OFFERS.pay_per_sit.daily_ad_budget);
  const [billThreshold, setBillThreshold] = useState<number>(100);
  const [termDays, setTermDays] = useState<number>(OFFERS.pay_per_sit.term_days);
  const [result, setResult] = useState<{
    success: boolean;
    onboardUrl?: string;
    contractUrl?: string;
    emailSent?: boolean;
    error?: string;
  } | null>(null);

  function handleOfferChange(type: OfferType) {
    setOfferType(type);
    const defaults = OFFERS[type];
    setSetupFee(defaults.setup_fee);
    setPerSitFee(defaults.per_sit_fee);
    setDailyBudget(defaults.daily_ad_budget);
    setTermDays(defaults.term_days);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const body: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      body[key] = value as string;
    });

    // Override with state-managed values
    body.offer_type = offerType;
    body.setup_fee = setupFee;
    body.per_sit_fee = perSitFee;
    body.daily_ad_budget = dailyBudget;
    body.bill_threshold = billThreshold;
    body.term_days = termDays;

    try {
      const res = await fetch("/api/deal-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setResult({ success: false, error: data.error || "Something went wrong." });
      }
    } catch {
      setResult({ success: false, error: "Network error. Try again." });
    }
    setLoading(false);
  }

  if (result?.success) {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{
          background: "rgba(13,17,25,0.4)",
          border: "1px solid rgba(127,255,0,0.2)",
        }}
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "rgba(127,255,0,0.1)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="#7FFF00"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2
          className="font-display text-lg font-bold text-white"
          style={{ letterSpacing: "-0.3px" }}
        >
          Client Created
        </h2>
        <p className="mt-2 text-sm" style={{ color: "#8B95A8" }}>
          {result.emailSent
            ? "Onboarding email sent to the client."
            : "Email failed to send — copy the links below and share manually."}
        </p>

        {/* Onboarding link */}
        <LinkBlock label="Onboarding Link" url={result.onboardUrl || ""} />

        {/* Contract link */}
        {result.contractUrl && (
          <LinkBlock label="Contract Link" url={result.contractUrl} />
        )}

        <button
          onClick={() => setResult(null)}
          className="mt-4 block w-full text-sm underline"
          style={{ color: "#8B95A8" }}
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl p-8"
      style={{
        background: "rgba(13,17,25,0.4)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {result?.error && (
        <div
          className="rounded-lg p-3 text-sm"
          style={{
            background: "rgba(255,107,107,0.1)",
            border: "1px solid rgba(255,107,107,0.2)",
            color: "#FF6B6B",
          }}
        >
          {result.error}
        </div>
      )}

      {/* Client info */}
      <fieldset className="space-y-4">
        <legend
          className="mb-2 text-xs font-semibold uppercase tracking-wider"
          style={labelStyle}
        >
          Client Info
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="company_name" label="Company Name" required />
          <Field name="contact_name" label="Contact Name" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="contact_email" label="Email" type="email" required />
          <Field name="contact_phone" label="Phone" type="tel" required />
        </div>
        <Field name="service_area" label="Service Area" placeholder="e.g. Tampa Bay, FL" required />
      </fieldset>

      {/* Offer type */}
      <fieldset className="space-y-4">
        <legend
          className="mb-2 text-xs font-semibold uppercase tracking-wider"
          style={labelStyle}
        >
          Offer
        </legend>

        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.entries(OFFERS) as [OfferType, (typeof OFFERS)[OfferType]][]).map(
            ([key, offer]) => {
              const active = offerType === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleOfferChange(key)}
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
                    {offer.label}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: "#8B95A8" }}>
                    ${offer.setup_fee.toLocaleString()} setup
                    {" / "}${offer.per_sit_fee}/sit
                    {" / "}${offer.daily_ad_budget}/day ad spend
                  </p>
                </button>
              );
            }
          )}
        </div>

        {/* Editable deal terms */}
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Setup Fee ($)"
            value={setupFee}
            onChange={setSetupFee}
          />
          <NumberField
            label="Per-Sit Fee ($)"
            value={perSitFee}
            onChange={setPerSitFee}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Daily Ad Budget ($)"
            value={dailyBudget}
            onChange={setDailyBudget}
          />
          <NumberField
            label="Bill Threshold ($)"
            value={billThreshold}
            onChange={setBillThreshold}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Term (days)"
            value={termDays}
            onChange={setTermDays}
          />
          <Field
            name="start_date"
            label="Start Date"
            type="date"
            required
          />
        </div>
      </fieldset>

      {/* Deal details */}
      <fieldset className="space-y-4">
        <legend
          className="mb-2 text-xs font-semibold uppercase tracking-wider"
          style={labelStyle}
        >
          Deal Details
        </legend>
        <Field name="closer_name" label="Closer Name" required />
        <div>
          <label className="mb-1 block text-xs font-medium" style={{ color: "#8B95A8" }}>
            Notes / Overrides
          </label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Any deal-specific overrides, custom terms, or context"
            className="w-full rounded-lg px-4 py-3 text-sm text-white outline-none resize-none"
            style={inputStyle}
          />
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg px-4 py-3 text-sm font-bold transition-opacity disabled:opacity-50"
        style={{ background: "#7FFF00", color: "#080B10" }}
      >
        {loading ? "Creating Client..." : "Submit Deal Report"}
      </button>
    </form>
  );
}

/* ── Subcomponents ── */

function LinkBlock({ label, url }: { label: string; url: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div
      className="mt-4 rounded-lg p-3 text-left"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <p className="mb-1 text-xs font-medium" style={{ color: "#F5A623" }}>
        {label}
      </p>
      <p
        className="break-all text-sm font-mono"
        style={{ color: "#EAEAEA" }}
      >
        {url}
      </p>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="mt-2 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
        style={{ background: "rgba(255,255,255,0.08)", color: "#EAEAEA" }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium" style={{ color: "#8B95A8" }}>
        {label}
        {required && <span style={{ color: "#F5A623" }}> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg px-4 py-3 text-sm text-white outline-none"
        style={inputStyle}
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium" style={{ color: "#8B95A8" }}>
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg px-4 py-3 text-sm text-white outline-none"
        style={inputStyle}
      />
    </div>
  );
}

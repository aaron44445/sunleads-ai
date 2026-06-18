"use client";

import { useState } from "react";

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const labelStyle = { color: "#F5A623" };

export default function DealReportClient() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    onboardUrl?: string;
    emailSent?: boolean;
    error?: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const body: Record<string, string> = {};
    formData.forEach((value, key) => {
      body[key] = value as string;
    });

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
            : "Email failed to send — copy the link below and share manually."}
        </p>
        <div
          className="mt-4 rounded-lg p-3 text-left"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p className="mb-1 text-xs font-medium" style={{ color: "#F5A623" }}>
            Onboarding Link
          </p>
          <p
            className="break-all text-sm font-mono"
            style={{ color: "#EAEAEA" }}
          >
            {result.onboardUrl}
          </p>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(result.onboardUrl || "");
          }}
          className="mt-3 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: "rgba(255,255,255,0.08)", color: "#EAEAEA" }}
        >
          Copy Link
        </button>
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

      {/* Deal details */}
      <fieldset className="space-y-4">
        <legend
          className="mb-2 text-xs font-semibold uppercase tracking-wider"
          style={labelStyle}
        >
          Deal Details
        </legend>
        <Field name="closer_name" label="Closer Name" required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="deal_value" label="Deal Value ($)" type="number" required />
          <Field name="pricing_model" label="Pricing Model" placeholder="e.g. pay-per-sit" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="ad_spend_agreed" label="Ad Spend Agreed ($)" type="number" required />
          <Field name="contract_months" label="Contract Months" type="number" required />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium" style={{ color: "#8B95A8" }}>
            Notes
          </label>
          <textarea
            name="notes"
            rows={3}
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

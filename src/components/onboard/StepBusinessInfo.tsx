"use client";

import { useState } from "react";
import type { OnboardingData } from "@/lib/types";
import GlassCard from "./GlassCard";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

const FINANCING_OPTIONS = ["Cash", "Loan", "Lease", "PPA"];

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

export default function StepBusinessInfo({
  data,
  onNext,
  loading,
}: {
  data: OnboardingData;
  onNext: (data: Record<string, unknown>) => void;
  loading: boolean;
}) {
  const [formError, setFormError] = useState("");
  const [financing, setFinancing] = useState<string[]>(
    data.financing_products ? data.financing_products.split(", ") : []
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    const fd = new FormData(e.currentTarget);

    const stepData = {
      // A2P fields
      business_legal_name: fd.get("business_legal_name") as string,
      ein: fd.get("ein") as string,
      business_address: fd.get("business_address") as string,
      business_city: fd.get("business_city") as string,
      business_state: fd.get("business_state") as string,
      business_zip: fd.get("business_zip") as string,
      authorized_rep_name: fd.get("authorized_rep_name") as string,
      authorized_rep_title: fd.get("authorized_rep_title") as string,
      authorized_rep_phone: fd.get("authorized_rep_phone") as string,
      authorized_rep_email: fd.get("authorized_rep_email") as string,
      // Business info
      company_display_name: fd.get("company_display_name") as string,
      target_regions: fd.get("target_regions") as string,
      avg_profit_per_install: fd.get("avg_profit_per_install") as string,
      deal_breakers: (fd.get("deal_breakers") as string) || null,
      differentiators: fd.get("differentiators") as string,
      financing_products: financing.join(", ") || null,
      testimonials_url: (fd.get("testimonials_url") as string) || null,
      logo_url: (fd.get("logo_url") as string) || null,
      ad_photos_url: (fd.get("ad_photos_url") as string) || null,
      home_address: (fd.get("home_address") as string) || null,
    };

    // Validate required fields
    const required = [
      "business_legal_name", "ein", "business_address", "business_city",
      "business_state", "business_zip", "authorized_rep_name",
      "authorized_rep_title", "authorized_rep_phone", "authorized_rep_email",
      "company_display_name", "target_regions", "avg_profit_per_install",
      "differentiators",
    ];

    for (const key of required) {
      const val = stepData[key as keyof typeof stepData];
      if (!val || !val.trim()) {
        setFormError("Please fill out all required fields.");
        return;
      }
    }

    onNext(stepData);
  }

  return (
    <GlassCard>
      <div className="mb-6">
        <h2
          className="font-display text-xl font-bold text-white"
          style={{ letterSpacing: "-0.3px" }}
        >
          Business Information
        </h2>
        <p className="mt-1 text-sm" style={{ color: "#8B95A8" }}>
          Everything we need to register your business for SMS, build your ads,
          and launch your campaign.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formError && (
          <p className="text-sm" style={{ color: "#FF6B6B" }}>
            {formError}
          </p>
        )}

        {/* ── Section: A2P Registration ── */}
        <SectionHeader label="A2P Registration" />
        <p className="text-xs" style={{ color: "#8B95A8" }}>
          Required by carriers before we can send appointment confirmations via SMS.
        </p>

        <Field
          name="business_legal_name"
          label="Legal Business Name"
          defaultValue={data.business_legal_name}
        />
        <Field
          name="ein"
          label="EIN (Employer Identification Number)"
          placeholder="XX-XXXXXXX"
          defaultValue={data.ein}
        />
        <Field
          name="business_address"
          label="Business Address"
          defaultValue={data.business_address}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <Field name="business_city" label="City" defaultValue={data.business_city} />
          <div>
            <label className="mb-1 block text-xs font-medium" style={{ color: "#8B95A8" }}>
              State <span style={{ color: "#F5A623" }}>*</span>
            </label>
            <select
              name="business_state"
              required
              defaultValue={data.business_state || ""}
              className="w-full rounded-lg px-4 py-3 text-sm text-white outline-none appearance-none"
              style={inputStyle}
            >
              <option value="" style={{ background: "#1a1f2e", color: "#EAEAEA" }}>Select</option>
              {US_STATES.map((s) => (
                <option key={s} value={s} style={{ background: "#1a1f2e", color: "#EAEAEA" }}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <Field name="business_zip" label="ZIP" defaultValue={data.business_zip} />
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#F5A623" }}>
          Authorized Representative
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="authorized_rep_name" label="Full Name" defaultValue={data.authorized_rep_name} />
          <Field name="authorized_rep_title" label="Title" placeholder="e.g. Owner, CEO" defaultValue={data.authorized_rep_title} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="authorized_rep_phone" label="Phone" type="tel" defaultValue={data.authorized_rep_phone} />
          <Field name="authorized_rep_email" label="Email" type="email" defaultValue={data.authorized_rep_email} />
        </div>

        {/* ── Section: About Your Business ── */}
        <Divider />
        <SectionHeader label="About Your Business" />

        <Field
          name="company_display_name"
          label="Company / Brand Name"
          placeholder="The name your customers know you by"
          defaultValue={data.company_display_name}
        />
        <Field
          name="target_regions"
          label="Service Area"
          placeholder="e.g. Phoenix metro, Maricopa County, 85001-85099"
          defaultValue={data.target_regions}
          textarea
        />
        <Field
          name="avg_profit_per_install"
          label="Average Profit per Install"
          placeholder="e.g. $5,000"
          defaultValue={data.avg_profit_per_install}
        />

        {/* Financing checkboxes */}
        <div>
          <label className="mb-2 block text-xs font-medium" style={{ color: "#8B95A8" }}>
            Financing Products You Offer
          </label>
          <div className="flex flex-wrap gap-2">
            {FINANCING_OPTIONS.map((opt) => (
              <label
                key={opt}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
                style={{
                  background: financing.includes(opt)
                    ? "rgba(127,255,0,0.08)"
                    : "rgba(255,255,255,0.03)",
                  border: financing.includes(opt)
                    ? "1px solid rgba(127,255,0,0.2)"
                    : "1px solid rgba(255,255,255,0.06)",
                  color: financing.includes(opt) ? "#7FFF00" : "#EAEAEA",
                }}
              >
                <input
                  type="checkbox"
                  checked={financing.includes(opt)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFinancing([...financing, opt]);
                    } else {
                      setFinancing(financing.filter((f) => f !== opt));
                    }
                  }}
                  className="h-3.5 w-3.5 rounded accent-green-400"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <Field
          name="differentiators"
          label="What Makes You Different from Competitors?"
          placeholder="e.g. In-house install crews, 25-year warranty, fastest permitting in the area"
          defaultValue={data.differentiators}
          textarea
        />
        <Field
          name="deal_breakers"
          label="Any Deal-Breakers?"
          placeholder="e.g. Tile roofs, mobile homes, specific HOAs, credit below 650"
          defaultValue={data.deal_breakers}
          textarea
          optional
        />

        {/* ── Section: Creative Assets ── */}
        <Divider />
        <SectionHeader label="Creative Assets" />
        <p className="text-xs" style={{ color: "#8B95A8" }}>
          Paste a link (Google Drive, Dropbox, etc.) or share files in the Slack channel after setup.
        </p>

        <Field
          name="testimonials_url"
          label="Testimonials or Google Review Links"
          placeholder="Paste review links or testimonial text"
          defaultValue={data.testimonials_url}
          textarea
          optional
        />
        <Field
          name="logo_url"
          label="Logo"
          placeholder="Link to your logo file (PNG or SVG preferred)"
          defaultValue={data.logo_url}
          optional
        />
        <Field
          name="ad_photos_url"
          label="2-3 Photos for Ads"
          placeholder="Link to photos — crew on a roof, finished installs, your team"
          defaultValue={data.ad_photos_url}
          optional
        />

        {/* ── Section: Home Address ── */}
        <Divider />
        <Field
          name="home_address"
          label="Home Address"
          placeholder="Street, City, State ZIP"
          defaultValue={data.home_address}
          optional
          hint="P.S. We may occasionally send something your way"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg px-6 py-3.5 text-sm font-bold transition-opacity disabled:opacity-50"
          style={{ background: "#7FFF00", color: "#080B10" }}
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </form>
    </GlassCard>
  );
}

/* ── Subcomponents ── */

function SectionHeader({ label }: { label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
      style={{
        border: "1px solid rgba(245,166,35,0.25)",
        background: "rgba(245,166,35,0.06)",
        color: "#F5A623",
      }}
    >
      {label}
    </div>
  );
}

function Divider() {
  return (
    <hr className="my-2" style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)" }} />
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  defaultValue,
  textarea,
  optional,
  hint,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string | null;
  textarea?: boolean;
  optional?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium" style={{ color: "#8B95A8" }}>
        {label}
        {!optional && <span style={{ color: "#F5A623" }}> *</span>}
        {optional && <span className="font-normal" style={{ color: "#4A5568" }}> (optional)</span>}
      </label>
      {hint && (
        <p className="mb-1.5 text-xs" style={{ color: "#F5A623" }}>
          {hint}
        </p>
      )}
      {textarea ? (
        <textarea
          name={name}
          required={!optional}
          placeholder={placeholder}
          defaultValue={defaultValue || ""}
          rows={3}
          className="w-full resize-none rounded-lg px-4 py-3 text-sm text-white outline-none"
          style={inputStyle}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={!optional}
          placeholder={placeholder}
          defaultValue={defaultValue || ""}
          className="w-full rounded-lg px-4 py-3 text-sm text-white outline-none"
          style={inputStyle}
        />
      )}
    </div>
  );
}

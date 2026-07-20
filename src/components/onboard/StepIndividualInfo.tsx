"use client";

import { useState } from "react";
import type { Client, OnboardingData } from "@/lib/types";
import GlassCard from "./GlassCard";

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

export default function StepIndividualInfo({
  client,
  data,
  onNext,
  loading,
  token,
}: {
  client: Client;
  data: OnboardingData;
  onNext: (data: Record<string, unknown>) => void;
  loading: boolean;
  token: string;
}) {
  const [formError, setFormError] = useState("");
  const [ownerApproval, setOwnerApproval] = useState<boolean>(
    data.owner_approval_confirmed || false
  );
  const [paymentMethod, setPaymentMethod] = useState<string>(
    data.personal_payment_method || ""
  );
  const [logoUrl, setLogoUrl] = useState(data.logo_url || "");
  const [adPhotoUrls, setAdPhotoUrls] = useState<string[]>(
    data.ad_photos_url ? data.ad_photos_url.split(",") : []
  );
  const [uploading, setUploading] = useState<string | null>(null);

  async function uploadFile(file: File, field: string): Promise<string | null> {
    const body = new FormData();
    body.append("file", file);
    body.append("token", token);
    body.append("field", field);

    const res = await fetch("/api/onboard/upload", { method: "POST", body });
    const result = await res.json();
    if (!res.ok) {
      setFormError(result.error || "Upload failed.");
      return null;
    }
    return result.url;
  }

  async function handleLogoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading("logo");
    setFormError("");
    const url = await uploadFile(file, "logo");
    if (url) setLogoUrl(url);
    setUploading(null);
  }

  async function handlePhotosSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading("photos");
    setFormError("");
    const urls: string[] = [...adPhotoUrls];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file, "ad-photos");
      if (url) urls.push(url);
    }
    setAdPhotoUrls(urls);
    setUploading(null);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    if (!ownerApproval) {
      setFormError(
        `Confirm that the owner of ${client.company_name} has authorized this before continuing.`
      );
      return;
    }
    if (!paymentMethod.trim()) {
      setFormError("Enter a personal payment method so we can bill you.");
      return;
    }

    onNext({
      owner_approval_confirmed: true,
      personal_payment_method: paymentMethod.trim(),
      logo_url: logoUrl || null,
      ad_photos_url: adPhotoUrls.length > 0 ? adPhotoUrls.join(",") : null,
    });
  }

  return (
    <GlassCard>
      <div className="mb-6">
        <h2
          className="font-display text-xl font-bold text-white"
          style={{ letterSpacing: "-0.3px" }}
        >
          Your Info
        </h2>
        <p className="mt-1 text-sm" style={{ color: "#8B95A8" }}>
          Individual closer path — no business entity. We use your personal
          identity for Meta verification and bill you personally.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formError && (
          <p className="text-sm" style={{ color: "#FF6B6B" }}>
            {formError}
          </p>
        )}

        {/* Identity read-back */}
        <section className="space-y-3">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#F5A623" }}
          >
            Identity on file
          </p>
          <div
            className="rounded-lg p-4 text-sm"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <ReadRow label="Legal name" value={client.contact_name} />
            <ReadRow label="Personal email" value={client.contact_email} />
            <ReadRow label="Personal phone" value={client.contact_phone} />
            <ReadRow
              label="Closing under"
              value={client.company_name}
            />
            <p className="mt-3 text-xs" style={{ color: "#8B95A8" }}>
              This is what Meta will see on your personal ad account
              verification. If any of it is wrong, message us in Slack before
              continuing.
            </p>
          </div>
        </section>

        {/* Owner approval */}
        <section className="space-y-3">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#F5A623" }}
          >
            Owner approval <span style={{ color: "#FF6B6B" }}>*</span>
          </p>
          <label
            className="flex cursor-pointer items-start gap-3 rounded-lg p-4"
            style={{
              background: ownerApproval
                ? "rgba(127,255,0,0.05)"
                : "rgba(255,255,255,0.03)",
              border: ownerApproval
                ? "1px solid rgba(127,255,0,0.2)"
                : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <input
              type="checkbox"
              checked={ownerApproval}
              onChange={(e) => setOwnerApproval(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded accent-green-400"
            />
            <span className="text-sm" style={{ color: "#EAEAEA" }}>
              I confirm the owner of{" "}
              <strong className="text-white">{client.company_name}</strong>{" "}
              knows I'm running self-gen ads under their brand and has
              authorized this.
            </span>
          </label>
        </section>

        {/* Personal payment */}
        <section className="space-y-3">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#F5A623" }}
          >
            Personal payment method <span style={{ color: "#FF6B6B" }}>*</span>
          </p>
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            placeholder="e.g. Zelle 555-0100 or Visa ending 4242"
            className="w-full rounded-lg px-4 py-3 text-sm text-white outline-none"
            style={inputStyle}
          />
          <p className="text-xs" style={{ color: "#8B95A8" }}>
            No business bank required. Aaron bills this manually against your
            PIF or per-sit invoice.
          </p>
        </section>

        {/* Optional brand assets */}
        <section className="space-y-3">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#F5A623" }}
          >
            Brand assets (optional)
          </p>
          <p className="text-xs" style={{ color: "#8B95A8" }}>
            If you have a personal logo or ad-worthy photos of yourself with
            installs, drop them here. Skip if you don't.
          </p>

          <div className="space-y-2">
            <label className="text-xs" style={{ color: "#8B95A8" }}>
              Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoSelect}
              className="block w-full text-xs text-white file:mr-3 file:rounded file:border-0 file:px-3 file:py-2 file:text-xs file:font-semibold"
              style={{ color: "#EAEAEA" }}
            />
            {uploading === "logo" && (
              <p className="text-xs" style={{ color: "#F5A623" }}>
                Uploading…
              </p>
            )}
            {logoUrl && (
              <p className="break-all text-xs" style={{ color: "#7FFF00" }}>
                Uploaded: {logoUrl}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs" style={{ color: "#8B95A8" }}>
              Photos (of you with installs, on jobsites, etc.)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotosSelect}
              className="block w-full text-xs text-white file:mr-3 file:rounded file:border-0 file:px-3 file:py-2 file:text-xs file:font-semibold"
              style={{ color: "#EAEAEA" }}
            />
            {uploading === "photos" && (
              <p className="text-xs" style={{ color: "#F5A623" }}>
                Uploading…
              </p>
            )}
            {adPhotoUrls.length > 0 && (
              <p className="text-xs" style={{ color: "#7FFF00" }}>
                {adPhotoUrls.length} photo(s) uploaded
              </p>
            )}
          </div>
        </section>

        <button
          type="submit"
          disabled={loading || uploading !== null}
          className="w-full rounded-lg px-4 py-3 text-sm font-bold transition-opacity disabled:opacity-50"
          style={{ background: "#7FFF00", color: "#080B10" }}
        >
          {loading ? "Saving…" : "Continue"}
        </button>
      </form>
    </GlassCard>
  );
}

function ReadRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 py-2 last:border-b-0">
      <span className="text-xs uppercase tracking-wider" style={{ color: "#8B95A8" }}>
        {label}
      </span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Contract } from "@/lib/types";

export default function ContractClient({
  contract,
  token,
}: {
  contract: Contract;
  token: string;
}) {
  const [signerName, setSignerName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signed, setSigned] = useState(contract.status === "signed");
  const [error, setError] = useState("");

  async function handleSign() {
    if (!signerName.trim() || !agreed) return;
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/contract/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, signer_name: signerName.trim() }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to sign. Try again.");
        setLoading(false);
        return;
      }
      setSigned(true);
    } catch {
      setError("Network error. Try again.");
    }
    setLoading(false);
  }

  const startDate = new Date(contract.start_date + "T00:00:00");
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + contract.term_days);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const isPayPerSit = contract.offer_type === "pay_per_sit";
  const offerLabel = isPayPerSit ? "Pay-Per-Sit" : "Foundation";

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: "#080B10" }}
    >
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#F5A623" }}
          >
            Service Agreement
          </p>
          <h1
            className="mt-2 text-2xl font-bold text-white sm:text-3xl"
            style={{ letterSpacing: "-0.5px" }}
          >
            SunLeads AI &times; {contract.client_business_name}
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#8B95A8" }}>
            {offerLabel} Agreement &mdash; {formatDate(startDate)}
          </p>
        </div>

        {/* Contract body */}
        <div
          className="rounded-xl p-6 sm:p-8"
          style={{
            background: "rgba(13,17,25,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="prose-contract space-y-6 text-sm leading-relaxed" style={{ color: "#EAEAEA" }}>

            <Section title="1. Parties">
              <p>
                This Service Agreement (&ldquo;Agreement&rdquo;) is entered into
                as of <Strong>{formatDate(startDate)}</Strong> by and between:
              </p>
              <p>
                <Strong>SunLeads AI</Strong> (&ldquo;Agency&rdquo;), a digital
                marketing agency specializing in solar lead generation, and
              </p>
              <p>
                <Strong>{contract.client_business_name}</Strong> (&ldquo;Client&rdquo;),
                represented by {contract.client_contact_name},{" "}
                contactable at {contract.client_email} and {contract.client_phone}.
              </p>
            </Section>

            <Section title="2. Services">
              <p>
                Agency will provide done-for-you solar lead generation services
                via paid Meta (Facebook/Instagram) advertising, including:
              </p>
              <ul className="ml-4 list-disc space-y-1" style={{ color: "#8B95A8" }}>
                <li>Ad creative production and copywriting</li>
                <li>Campaign setup, optimization, and management</li>
                <li>AI-powered lead qualification and appointment setting</li>
                <li>Delivery of qualified, exclusive appointments (&ldquo;sits&rdquo;)</li>
              </ul>
            </Section>

            <Section title="3. Pricing">
              <div
                className="rounded-lg p-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <TermLine label="Offer" value={offerLabel} />
                  <TermLine label="Setup Fee" value={`$${contract.setup_fee.toLocaleString()}`} />
                  <TermLine label="Per Qualified Sit" value={`$${contract.per_sit_fee}`} />
                  <TermLine label="Daily Ad Budget" value={`$${contract.daily_ad_budget}/day`} />
                  <TermLine label="Term" value={`${contract.term_days} days`} />
                  <TermLine label="Bill Threshold" value={`$${contract.bill_threshold}+/mo`} />
                </div>
              </div>

              {isPayPerSit ? (
                <p className="mt-3" style={{ color: "#8B95A8" }}>
                  No setup fee. Client pays <Strong>${contract.per_sit_fee}</Strong> per
                  qualified sit delivered. Ad spend is funded by the Client in their own
                  Meta ad account at a recommended <Strong>${contract.daily_ad_budget}/day</Strong>.
                </p>
              ) : (
                <p className="mt-3" style={{ color: "#8B95A8" }}>
                  One-time setup fee of <Strong>${contract.setup_fee.toLocaleString()}</Strong>,
                  collected on the closing call. Client pays <Strong>${contract.per_sit_fee}</Strong> per
                  qualified sit delivered. Ad spend is funded by the Client in their own
                  Meta ad account at a recommended <Strong>${contract.daily_ad_budget}/day</Strong>.
                </p>
              )}
            </Section>

            <Section title="4. Qualified Sit Definition">
              <p>
                A &ldquo;Qualified Sit&rdquo; is defined as an appointment where
                ALL of the following are true:
              </p>
              <ul className="ml-4 list-disc space-y-1" style={{ color: "#8B95A8" }}>
                <li>The lead is a homeowner</li>
                <li>Decision-maker(s) are present</li>
                <li>Roof is under 25 years old with no major shading issues</li>
                <li>Monthly electric bill is at or above <Strong>${contract.bill_threshold}/month</Strong></li>
                <li>Lead was verbally confirmed by the AI qualification caller</li>
                <li>Appointment was on the calendar</li>
                <li>Lead showed up and engaged for at least 10&ndash;15 minutes</li>
              </ul>
              <p className="mt-2" style={{ color: "#8B95A8" }}>
                No-shows do not count as qualified sits. Rescheduled appointments
                that result in a completed sit do count.
              </p>
            </Section>

            <Section title="5. Guarantee">
              {isPayPerSit ? (
                <p>
                  Any sit that is not qualified per the definition above, or where
                  the lead does not show, will be <Strong>replaced at no charge</Strong>.
                </p>
              ) : (
                <>
                  <p>
                    Any sit that is not qualified per the definition above, or where
                    the lead does not show, will be <Strong>replaced at no charge</Strong>.
                  </p>
                  <p className="mt-2">
                    If Agency fails to deliver at least one qualified sit within
                    21 calendar days of the start date, the{" "}
                    <Strong>${contract.setup_fee.toLocaleString()} setup fee will be refunded in full</Strong>.
                  </p>
                </>
              )}
            </Section>

            <Section title="6. Ad Spend">
              <p>
                Client funds all ad spend directly in their own Meta ad account.
                Agency does not handle or hold ad spend funds. The recommended
                daily budget is <Strong>${contract.daily_ad_budget}/day</Strong>.
                Client may adjust budget after consulting with Agency.
              </p>
            </Section>

            <Section title="7. Term &amp; Termination">
              <p>
                This Agreement begins on <Strong>{formatDate(startDate)}</Strong> and
                runs for <Strong>{contract.term_days} days</Strong>, ending
                on <Strong>{formatDate(endDate)}</Strong>.
              </p>
              <p className="mt-2">
                Either party may terminate with 14 days written notice. Upon
                termination, Client retains full ownership of their ad account,
                leads, data, and funnel assets.
              </p>
            </Section>

            <Section title="8. Ownership">
              <p>
                Client owns their Meta ad account, all leads generated, all data
                collected, and all funnel/landing-page assets created during
                the engagement. Agency retains no proprietary claim to Client&apos;s
                leads or data.
              </p>
            </Section>

            <Section title="9. Exclusivity">
              <p>
                All leads generated through this engagement are exclusive to
                Client. Agency will not resell, recycle, or share Client&apos;s
                leads with any other party.
              </p>
            </Section>
          </div>

          {/* Signature section */}
          <div
            className="mt-8 rounded-lg p-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: signed
                ? "1px solid rgba(127,255,0,0.2)"
                : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {signed ? (
              <div className="text-center">
                <div
                  className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: "rgba(127,255,0,0.1)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#7FFF00"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold" style={{ color: "#7FFF00" }}>
                  Agreement Signed
                </p>
                <p className="mt-1 text-xs" style={{ color: "#8B95A8" }}>
                  Signed by {contract.signer_name || signerName} on{" "}
                  {contract.signed_at
                    ? new Date(contract.signed_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    : "just now"}
                </p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-xs font-medium" style={{ color: "#F5A623" }}>
                  Sign below to accept this agreement
                </p>

                {error && (
                  <div
                    className="mb-3 rounded-lg p-2 text-xs"
                    style={{
                      background: "rgba(255,107,107,0.1)",
                      border: "1px solid rgba(255,107,107,0.2)",
                      color: "#FF6B6B",
                    }}
                  >
                    {error}
                  </div>
                )}

                <div className="mb-4">
                  <label className="mb-1 block text-xs" style={{ color: "#8B95A8" }}>
                    Full legal name
                  </label>
                  <input
                    type="text"
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    placeholder="Type your full name"
                    className="w-full rounded-lg px-4 py-3 text-sm text-white outline-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>

                <label className="mb-4 flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded accent-green-400"
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "#8B95A8" }}>
                    I, {signerName || "[your name]"}, have read and agree to the
                    terms of this Service Agreement between SunLeads AI
                    and {contract.client_business_name}.
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleSign}
                  disabled={loading || !signerName.trim() || !agreed}
                  className="w-full rounded-lg px-6 py-3 text-sm font-bold transition-opacity disabled:opacity-40"
                  style={{ background: "#7FFF00", color: "#080B10" }}
                >
                  {loading ? "Signing..." : "Sign Agreement"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <p
          className="mt-6 text-center text-xs"
          style={{ color: "#4A5568" }}
        >
          SunLeads AI &mdash; Solar Lead Generation
        </p>
      </div>
    </div>
  );
}

/* ── Subcomponents ── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        className="mb-2 text-sm font-bold uppercase tracking-wide"
        style={{ color: "#F5A623" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}

function TermLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span style={{ color: "#8B95A8" }}>{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

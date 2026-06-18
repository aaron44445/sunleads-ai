import GlassCard from "./GlassCard";

const NEXT_STEPS = [
  { label: "A2P Approval", desc: "Your business registration is processing (1-3 business days)" },
  { label: "Ad Account Build", desc: "We configure your Meta ad account, pixel, and targeting" },
  { label: "Campaign Launch", desc: "First ads go live — leads start flowing to your calendar" },
];

export default function StepComplete({
  companyName,
}: {
  companyName: string;
}) {
  return (
    <GlassCard>
      {/* Success icon */}
      <div className="mb-6 text-center">
        <div
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgba(127,255,0,0.1)" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
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
          className="font-display text-xl font-bold text-white sm:text-2xl"
          style={{ letterSpacing: "-0.5px" }}
        >
          You&apos;re all set, {companyName}.
        </h2>
        <p className="mt-2 text-sm" style={{ color: "#8B95A8" }}>
          Your onboarding is complete. Here&apos;s what happens next.
        </p>
      </div>

      {/* What happens next */}
      <div className="space-y-0">
        {NEXT_STEPS.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: "rgba(127,255,0,0.12)",
                  color: "#7FFF00",
                  border: "1px solid rgba(127,255,0,0.2)",
                }}
              >
                {i + 1}
              </div>
              {i < NEXT_STEPS.length - 1 && (
                <div
                  className="w-px flex-1"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                />
              )}
            </div>
            <div className="pb-5">
              <p className="text-sm font-semibold text-white">{step.label}</p>
              <p className="mt-0.5 text-sm" style={{ color: "#8B95A8" }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Support links */}
      <div
        className="mt-6 rounded-lg p-4 text-center"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p className="text-sm" style={{ color: "#8B95A8" }}>
          Questions? Reach us on{" "}
          <span className="font-medium text-white">Slack</span> or email{" "}
          <a
            href="mailto:support@sunleadsai.com"
            className="underline"
            style={{ color: "#F5A623" }}
          >
            support@sunleadsai.com
          </a>
        </p>
      </div>
    </GlassCard>
  );
}

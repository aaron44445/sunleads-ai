import GlassCard from "./GlassCard";

const TIMELINE = [
  { label: "Today", desc: "Complete this setup (about 10 minutes)" },
  { label: "48 Hours", desc: "We submit your A2P registration and build your ad account" },
  { label: "Week 1", desc: "Success call — we finalize targeting, copy, and creative" },
  { label: "Week 2", desc: "First ads go live, leads start flowing" },
];

export default function StepWelcome({
  companyName,
  onNext,
  loading,
}: {
  companyName: string;
  onNext: () => void;
  loading: boolean;
}) {
  return (
    <GlassCard>
      {/* Payment confirmed badge */}
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full"
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
        <div>
          <p className="text-sm font-semibold" style={{ color: "#7FFF00" }}>
            Payment received
          </p>
          <p className="text-xs" style={{ color: "#8B95A8" }}>
            You&apos;re locked in — let&apos;s get you set up.
          </p>
        </div>
      </div>

      <h2
        className="font-display text-xl font-bold text-white sm:text-2xl"
        style={{ letterSpacing: "-0.5px" }}
      >
        Welcome to SunLeads AI, {companyName}.
      </h2>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "#8B95A8" }}>
        This setup takes about 10 minutes. It covers everything we need to get
        your first campaign launched. Your progress saves automatically — you can
        close and come back anytime.
      </p>

      {/* Timeline */}
      <div className="mt-6 space-y-0">
        {TIMELINE.map((item, i) => (
          <div key={i} className="flex gap-4">
            {/* Vertical line + dot */}
            <div className="flex flex-col items-center">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  background: i === 0 ? "#7FFF00" : "rgba(255,255,255,0.12)",
                  border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.2)",
                }}
              />
              {i < TIMELINE.length - 1 && (
                <div
                  className="w-px flex-1"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                />
              )}
            </div>
            {/* Content */}
            <div className="pb-5">
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#F5A623" }}
              >
                {item.label}
              </p>
              <p className="mt-0.5 text-sm" style={{ color: "#EAEAEA" }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={loading}
        className="mt-6 w-full rounded-lg px-6 py-3.5 text-sm font-bold transition-opacity disabled:opacity-50"
        style={{ background: "#7FFF00", color: "#080B10" }}
      >
        {loading ? "Saving..." : "Get Started"}
      </button>
    </GlassCard>
  );
}

export const metadata = {
  title: "Onboarding — SunLeads AI",
  robots: "noindex, nofollow",
};

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: "#080B10" }}
    >
      {/* Minimal header */}
      <header className="flex items-center justify-center px-6 py-6">
        <span
          className="font-display text-lg font-bold tracking-tight text-white"
          style={{ letterSpacing: "-0.3px" }}
        >
          SunLeads AI
        </span>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center px-4 pb-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs" style={{ color: "#4A5568" }}>
        Need help?{" "}
        <a
          href="mailto:support@sunleadsai.com"
          className="underline"
          style={{ color: "#8B95A8" }}
        >
          support@sunleadsai.com
        </a>
      </footer>
    </div>
  );
}

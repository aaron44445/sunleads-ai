import { cookies } from "next/headers";
import PasswordGate from "../password-gate";
import DealReportClient from "./deal-report-client";

export const metadata = {
  title: "Deal Report — SunLeads AI Internal",
};

export default async function DealReportPage() {
  const cookieStore = await cookies();
  const authed =
    cookieStore.get("sl_internal")?.value === process.env.INTERNAL_API_SECRET;

  if (!authed) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-4"
        style={{ background: "#080B10" }}
      >
        <PasswordGate />
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{ background: "#080B10" }}
    >
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1
            className="font-display text-2xl font-bold text-white"
            style={{ letterSpacing: "-0.5px" }}
          >
            New Deal Report
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#8B95A8" }}>
            Submit a deal to create the client record and send the onboarding
            link.
          </p>
        </div>
        <DealReportClient />
      </div>
    </div>
  );
}

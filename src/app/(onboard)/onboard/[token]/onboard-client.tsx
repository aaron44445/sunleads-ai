"use client";

import { useState } from "react";
import type { Client, OnboardingData } from "@/lib/types";
import StepIndicator from "@/components/onboard/StepIndicator";
import StepCampaignSetup from "@/components/onboard/StepCampaignSetup";
import StepWelcome from "@/components/onboard/StepWelcome";
import StepBusinessInfo from "@/components/onboard/StepBusinessInfo";
import StepIndividualInfo from "@/components/onboard/StepIndividualInfo";
import StepSlack from "@/components/onboard/StepSlack";
import StepFacebook from "@/components/onboard/StepFacebook";
import StepKickoff from "@/components/onboard/StepKickoff";
import StepComplete from "@/components/onboard/StepComplete";
import StepRetellBilling from "@/components/onboard/StepRetellBilling";

const TOTAL_STEPS = 7;

export default function OnboardClient({
  client,
  onboardingData,
  token,
  dailyAdBudget,
}: {
  client: Client;
  onboardingData: OnboardingData;
  token: string;
  dailyAdBudget?: number | null;
}) {
  const [step, setStep] = useState(client.current_step);
  const [data, setData] = useState(onboardingData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isIndividual = client.client_type === "individual_closer";

  const completed =
    client.onboard_status === "completed" || step > TOTAL_STEPS;

  async function handleNext(stepData: Record<string, unknown>) {
    setError("");
    setLoading(true);

    const nextStep = step + 1;

    try {
      const res = await fetch("/api/onboard/save-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, currentStep: step, nextStep, stepData }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Something went wrong. Try again.");
        setLoading(false);
        return;
      }

      // Update local data optimistically
      setData((prev) => ({ ...prev, ...stepData } as OnboardingData));

      // If we just finished the last step, mark complete
      if (nextStep > TOTAL_STEPS) {
        await fetch("/api/onboard/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      }

      setStep(nextStep);
    } catch {
      setError("Network error. Try again.");
    }

    setLoading(false);
  }

  if (completed) {
    return (
      <div className="w-full max-w-xl">
        <StepComplete companyName={client.company_name} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      <StepIndicator currentStep={step} />

      {step > 1 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="mb-4 flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-100"
          style={{ color: "#8B95A8", opacity: 0.7 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      )}

      {error && (
        <div
          className="mb-4 rounded-lg p-3 text-sm"
          style={{
            background: "rgba(255,107,107,0.1)",
            border: "1px solid rgba(255,107,107,0.2)",
            color: "#FF6B6B",
          }}
        >
          {error}
        </div>
      )}

      {/* Step 1: Campaign Setup (low-friction, about their outcome) */}
      {step === 1 && (
        <StepCampaignSetup
          companyName={client.company_name}
          data={data}
          onNext={handleNext}
          loading={loading}
        />
      )}
      {/* Step 2: Welcome / timeline */}
      {step === 2 && (
        <StepWelcome
          companyName={client.company_name}
          onNext={() => handleNext({})}
          loading={loading}
        />
      )}
      {/* Step 3: Business info + A2P (or Individual identity for self-gen variant) */}
      {step === 3 &&
        (isIndividual ? (
          <StepIndividualInfo
            client={client}
            data={data}
            onNext={handleNext}
            loading={loading}
            token={token}
          />
        ) : (
          <StepBusinessInfo data={data} onNext={handleNext} loading={loading} token={token} />
        ))}
      {/* Step 4: Retell / billing (client owns SMS, A2P, and AI-caller costs) */}
      {step === 4 && (
        <StepRetellBilling
          data={data}
          onNext={handleNext}
          loading={loading}
          dailyAdBudget={dailyAdBudget}
        />
      )}
      {/* Step 5: Slack */}
      {step === 5 && (
        <StepSlack data={data} onNext={handleNext} loading={loading} />
      )}
      {/* Step 6: Facebook access */}
      {step === 6 && (
        <StepFacebook
          data={data}
          onNext={handleNext}
          loading={loading}
          variant={client.client_type}
        />
      )}
      {/* Step 7: Kickoff call */}
      {step === 7 && (
        <StepKickoff data={data} onNext={handleNext} loading={loading} />
      )}
    </div>
  );
}

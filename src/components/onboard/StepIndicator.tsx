const TOP_LEVEL_STEPS = ["Campaign", "Onboarding", "Success Call"];

function getTopLevelIndex(currentStep: number): number {
  if (currentStep <= 1) return 0; // Campaign setup
  if (currentStep <= 5) return 1; // Onboarding (steps 2-5)
  return 2; // Success Call (step 6)
}

function getSubStep(currentStep: number): number {
  // Steps 2,3,4,5 map to sub-steps 1,2,3,4
  return currentStep - 1;
}

const SUB_STEP_COUNT = 4;

export default function StepIndicator({
  currentStep,
}: {
  currentStep: number;
  totalSteps?: number;
}) {
  const topLevelIndex = getTopLevelIndex(currentStep);

  return (
    <div className="mb-8">
      {/* Top-level bars */}
      <div className="flex items-center justify-between gap-2">
        {TOP_LEVEL_STEPS.map((label, i) => {
          const isComplete = i < topLevelIndex;
          const isCurrent = i === topLevelIndex;

          return (
            <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className="h-1 w-full rounded-full transition-all duration-300"
                style={{
                  background: isComplete
                    ? "#7FFF00"
                    : isCurrent
                      ? "#F5A623"
                      : "rgba(255,255,255,0.08)",
                }}
              />
              <span
                className="text-[10px] font-medium uppercase tracking-wider"
                style={{
                  color: isComplete
                    ? "#7FFF00"
                    : isCurrent
                      ? "#F5A623"
                      : "#4A5568",
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Nested sub-step indicator for Onboarding (steps 2-5) */}
      {currentStep >= 2 && currentStep <= 5 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {Array.from({ length: SUB_STEP_COUNT }, (_, i) => i + 1).map((sub) => {
            const activeSub = getSubStep(currentStep);
            const isSubComplete = sub < activeSub;
            const isSubCurrent = sub === activeSub;

            return (
              <div
                key={sub}
                className="h-1 w-8 rounded-full transition-all duration-300"
                style={{
                  background: isSubComplete
                    ? "#7FFF00"
                    : isSubCurrent
                      ? "#F5A623"
                      : "rgba(255,255,255,0.08)",
                }}
              />
            );
          })}
          <span
            className="ml-1 text-[10px] font-medium"
            style={{ color: "#8B95A8" }}
          >
            {getSubStep(currentStep)} of {SUB_STEP_COUNT}
          </span>
        </div>
      )}
    </div>
  );
}

"use server";

import { getSupabase } from "@/lib/supabase";

const TOTAL_STEPS = 5;

export async function saveStepAction(
  token: string,
  currentStep: number,
  nextStep: number,
  stepData: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  // Validate step progression
  if (
    nextStep !== currentStep + 1 ||
    currentStep < 1 ||
    nextStep > TOTAL_STEPS + 1
  ) {
    return { success: false, error: "Invalid step progression." };
  }

  const supabase = getSupabase();

  // Look up client by token and verify current step matches
  const { data: client, error: lookupErr } = await supabase
    .from("clients")
    .select("id, current_step")
    .eq("onboard_token", token)
    .single();

  if (lookupErr || !client) {
    return { success: false, error: "Invalid onboarding session." };
  }

  if (client.current_step !== currentStep) {
    return { success: false, error: "Step mismatch. Please refresh the page." };
  }

  // Save step data to onboarding_data (only non-empty fields)
  if (Object.keys(stepData).length > 0) {
    const { error: dataErr } = await supabase
      .from("onboarding_data")
      .update({ ...stepData, updated_at: new Date().toISOString() })
      .eq("client_id", client.id);

    if (dataErr) {
      return { success: false, error: dataErr.message };
    }
  }

  // Advance client step
  const { error: stepErr } = await supabase
    .from("clients")
    .update({
      current_step: nextStep,
      onboard_status: "in_progress",
      updated_at: new Date().toISOString(),
    })
    .eq("id", client.id);

  if (stepErr) {
    return { success: false, error: stepErr.message };
  }

  return { success: true };
}

export async function completeOnboardingAction(
  token: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();

  // Verify the token exists and isn't already completed
  const { data: client, error: lookupErr } = await supabase
    .from("clients")
    .select("id, onboard_status")
    .eq("onboard_token", token)
    .single();

  if (lookupErr || !client) {
    return { success: false, error: "Invalid session." };
  }

  if (client.onboard_status === "completed") {
    return { success: true }; // Already done, idempotent
  }

  const { error } = await supabase
    .from("clients")
    .update({
      onboard_status: "completed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", client.id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

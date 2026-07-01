import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const TOTAL_STEPS = 6;

export async function POST(request: NextRequest) {
  const { token, currentStep, nextStep, stepData } = await request.json();

  if (!token || currentStep == null || nextStep == null) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  // Validate step progression
  if (
    nextStep !== currentStep + 1 ||
    currentStep < 1 ||
    nextStep > TOTAL_STEPS + 1
  ) {
    return NextResponse.json(
      { error: "Invalid step progression." },
      { status: 400 }
    );
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 500 }
    );
  }

  // Look up client by token and verify current step matches
  const { data: client, error: lookupErr } = await supabase
    .from("clients")
    .select("id, current_step")
    .eq("onboard_token", token)
    .single();

  if (lookupErr || !client) {
    return NextResponse.json(
      { error: "Invalid onboarding session." },
      { status: 404 }
    );
  }

  if (client.current_step !== currentStep) {
    return NextResponse.json(
      { error: "Step mismatch. Please refresh the page." },
      { status: 409 }
    );
  }

  // Save step data to onboarding_data (only non-empty fields)
  if (stepData && Object.keys(stepData).length > 0) {
    const { error: dataErr } = await supabase
      .from("onboarding_data")
      .update({ ...stepData, updated_at: new Date().toISOString() })
      .eq("client_id", client.id);

    if (dataErr) {
      return NextResponse.json({ error: dataErr.message }, { status: 500 });
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
    return NextResponse.json({ error: stepErr.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

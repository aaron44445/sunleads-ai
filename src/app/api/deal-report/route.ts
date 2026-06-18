import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { generateToken } from "@/lib/tokens";
import { sendOnboardingEmail } from "@/lib/email";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sunleadsai.com";

export async function POST(request: NextRequest) {
  // Verify auth
  const cookieStore = await cookies();
  const authed =
    cookieStore.get("sl_internal")?.value === process.env.INTERNAL_API_SECRET;

  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const {
    company_name,
    contact_name,
    contact_email,
    contact_phone,
    service_area,
    closer_name,
    deal_value,
    pricing_model,
    ad_spend_agreed,
    contract_months,
    notes,
  } = body;

  if (
    !company_name ||
    !contact_name ||
    !contact_email ||
    !contact_phone ||
    !service_area
  ) {
    return NextResponse.json(
      { error: "All client fields are required." },
      { status: 400 }
    );
  }

  if (
    !closer_name ||
    !deal_value ||
    !pricing_model ||
    !ad_spend_agreed ||
    !contract_months
  ) {
    return NextResponse.json(
      { error: "All deal fields are required." },
      { status: 400 }
    );
  }

  const token = generateToken();

  let supabase;
  try {
    supabase = getSupabase();
  } catch {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 500 }
    );
  }

  // 1. Create client record
  const { data: client, error: clientErr } = await supabase
    .from("clients")
    .insert({
      company_name,
      contact_name,
      contact_email,
      contact_phone,
      service_area,
      onboard_token: token,
      onboard_status: "pending",
      current_step: 1,
      deal_closed_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (clientErr || !client) {
    return NextResponse.json(
      { error: clientErr?.message || "Failed to create client." },
      { status: 500 }
    );
  }

  // 2. Create onboarding_data row
  const { error: onboardErr } = await supabase
    .from("onboarding_data")
    .insert({ client_id: client.id });

  if (onboardErr) {
    return NextResponse.json({ error: onboardErr.message }, { status: 500 });
  }

  // 3. Create deal report
  const { error: dealErr } = await supabase.from("deal_reports").insert({
    client_id: client.id,
    closer_name,
    deal_value: Number(deal_value),
    pricing_model,
    ad_spend_agreed: Number(ad_spend_agreed),
    contract_months: Number(contract_months),
    notes: notes || null,
  });

  if (dealErr) {
    return NextResponse.json({ error: dealErr.message }, { status: 500 });
  }

  // 4. Send onboarding email (non-blocking — don't fail the whole request)
  const onboardUrl = `${BASE_URL}/onboard/${token}`;
  let emailSent = false;
  try {
    const emailResult = await sendOnboardingEmail(
      contact_email,
      contact_name,
      company_name,
      token
    );
    emailSent = emailResult.success;
  } catch {
    emailSent = false;
  }

  return NextResponse.json({
    success: true,
    onboardUrl,
    emailSent,
  });
}

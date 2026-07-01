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
    offer_type,
    setup_fee,
    per_sit_fee,
    daily_ad_budget,
    bill_threshold,
    start_date,
    term_days,
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

  if (!closer_name || !offer_type || !start_date) {
    return NextResponse.json(
      { error: "Closer name, offer type, and start date are required." },
      { status: 400 }
    );
  }

  const onboardToken = generateToken();
  const contractToken = generateToken();

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
      onboard_token: onboardToken,
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
    deal_value: Number(setup_fee) + Number(per_sit_fee) * 10, // estimated deal value
    pricing_model: offer_type,
    ad_spend_agreed: Number(daily_ad_budget) * Number(term_days),
    contract_months: Math.ceil(Number(term_days) / 30),
    notes: notes || null,
  });

  if (dealErr) {
    return NextResponse.json({ error: dealErr.message }, { status: 500 });
  }

  // 4. Create contract record
  const { error: contractErr } = await supabase.from("contracts").insert({
    client_id: client.id,
    token: contractToken,
    offer_type,
    setup_fee: Number(setup_fee),
    per_sit_fee: Number(per_sit_fee),
    daily_ad_budget: Number(daily_ad_budget),
    bill_threshold: Number(bill_threshold) || 100,
    start_date,
    term_days: Number(term_days) || 90,
    client_business_name: company_name,
    client_contact_name: contact_name,
    client_email: contact_email,
    client_phone: contact_phone,
    status: "pending",
    notes: notes || null,
  });

  if (contractErr) {
    return NextResponse.json({ error: contractErr.message }, { status: 500 });
  }

  // 5. Send onboarding email (non-blocking)
  const onboardUrl = `${BASE_URL}/onboard/${onboardToken}`;
  const contractUrl = `${BASE_URL}/contract/${contractToken}`;
  let emailSent = false;
  try {
    const emailResult = await sendOnboardingEmail(
      contact_email,
      contact_name,
      company_name,
      onboardToken
    );
    emailSent = emailResult.success;
  } catch {
    emailSent = false;
  }

  return NextResponse.json({
    success: true,
    onboardUrl,
    contractUrl,
    emailSent,
  });
}

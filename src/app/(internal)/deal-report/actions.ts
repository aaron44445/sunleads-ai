"use server";

import { getSupabase } from "@/lib/supabase";
import { generateToken } from "@/lib/tokens";
import { sendOnboardingEmail } from "@/lib/email";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sunleadsai.com";

export async function submitDealReportAction(formData: FormData): Promise<{
  success: boolean;
  onboardUrl?: string;
  emailSent?: boolean;
  error?: string;
}> {
  const companyName = formData.get("company_name") as string;
  const contactName = formData.get("contact_name") as string;
  const contactEmail = formData.get("contact_email") as string;
  const contactPhone = formData.get("contact_phone") as string;
  const serviceArea = formData.get("service_area") as string;
  const closerName = formData.get("closer_name") as string;
  const dealValue = Number(formData.get("deal_value"));
  const pricingModel = formData.get("pricing_model") as string;
  const adSpendAgreed = Number(formData.get("ad_spend_agreed"));
  const contractMonths = Number(formData.get("contract_months"));
  const notes = (formData.get("notes") as string) || null;

  if (!companyName || !contactName || !contactEmail || !contactPhone || !serviceArea) {
    return { success: false, error: "All client fields are required." };
  }
  if (!closerName || !dealValue || !pricingModel || !adSpendAgreed || !contractMonths) {
    return { success: false, error: "All deal fields are required." };
  }

  const token = generateToken();
  const supabase = getSupabase();

  // 1. Create client record
  const { data: client, error: clientErr } = await supabase
    .from("clients")
    .insert({
      company_name: companyName,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      service_area: serviceArea,
      onboard_token: token,
      onboard_status: "pending",
      current_step: 1,
      deal_closed_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (clientErr || !client) {
    return { success: false, error: clientErr?.message || "Failed to create client." };
  }

  // 2. Create onboarding_data row (empty, ready for step-by-step fill)
  const { error: onboardErr } = await supabase
    .from("onboarding_data")
    .insert({ client_id: client.id });

  if (onboardErr) {
    return { success: false, error: onboardErr.message };
  }

  // 3. Create deal report
  const { error: dealErr } = await supabase
    .from("deal_reports")
    .insert({
      client_id: client.id,
      closer_name: closerName,
      deal_value: dealValue,
      pricing_model: pricingModel,
      ad_spend_agreed: adSpendAgreed,
      contract_months: contractMonths,
      notes,
    });

  if (dealErr) {
    return { success: false, error: dealErr.message };
  }

  // 4. Send onboarding email
  const onboardUrl = `${BASE_URL}/onboard/${token}`;
  const emailResult = await sendOnboardingEmail(
    contactEmail,
    contactName,
    companyName,
    token
  );

  return {
    success: true,
    onboardUrl,
    emailSent: emailResult.success,
  };
}

import { notFound } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import type { Client, OnboardingData } from "@/lib/types";
import OnboardClient from "./onboard-client";

export const dynamic = "force-dynamic";

export default async function OnboardPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = getSupabase();

  // Fetch client by token
  const { data: client, error: clientErr } = await supabase
    .from("clients")
    .select("*")
    .eq("onboard_token", token)
    .single();

  if (clientErr || !client) {
    notFound();
  }

  // Fetch onboarding data
  const { data: onboardingData, error: onboardErr } = await supabase
    .from("onboarding_data")
    .select("*")
    .eq("client_id", client.id)
    .single();

  if (onboardErr || !onboardingData) {
    notFound();
  }

  return (
    <OnboardClient
      client={client as Client}
      onboardingData={onboardingData as OnboardingData}
      token={token}
    />
  );
}

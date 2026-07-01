import { notFound } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import type { Contract } from "@/lib/types";
import ContractClient from "./contract-client";

export const dynamic = "force-dynamic";

export default async function ContractPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = getSupabase();

  const { data: contract, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("token", token)
    .single();

  if (error || !contract) {
    notFound();
  }

  return <ContractClient contract={contract as Contract} token={token} />;
}

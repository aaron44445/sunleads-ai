import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { token, signer_name } = await request.json();

  if (!token || !signer_name?.trim()) {
    return NextResponse.json(
      { error: "Missing token or signer name." },
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

  // Look up contract
  const { data: contract, error: lookupErr } = await supabase
    .from("contracts")
    .select("id, status")
    .eq("token", token)
    .single();

  if (lookupErr || !contract) {
    return NextResponse.json(
      { error: "Contract not found." },
      { status: 404 }
    );
  }

  if (contract.status === "signed") {
    return NextResponse.json(
      { error: "This contract has already been signed." },
      { status: 409 }
    );
  }

  if (contract.status === "voided") {
    return NextResponse.json(
      { error: "This contract has been voided." },
      { status: 410 }
    );
  }

  // Get client IP from headers
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Sign the contract
  const { error: signErr } = await supabase
    .from("contracts")
    .update({
      signer_name: signer_name.trim(),
      signer_ip: ip,
      signed_at: new Date().toISOString(),
      status: "signed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", contract.id);

  if (signErr) {
    return NextResponse.json({ error: signErr.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

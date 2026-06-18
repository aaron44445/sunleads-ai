import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json(
      { error: "Missing token." },
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

  // Verify the token exists
  const { data: client, error: lookupErr } = await supabase
    .from("clients")
    .select("id, onboard_status")
    .eq("onboard_token", token)
    .single();

  if (lookupErr || !client) {
    return NextResponse.json(
      { error: "Invalid session." },
      { status: 404 }
    );
  }

  // Already done — idempotent
  if (client.onboard_status === "completed") {
    return NextResponse.json({ success: true });
  }

  const { error } = await supabase
    .from("clients")
    .update({
      onboard_status: "completed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", client.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

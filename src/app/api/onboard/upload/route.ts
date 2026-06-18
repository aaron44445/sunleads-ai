import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const token = formData.get("token") as string | null;
  const field = formData.get("field") as string | null;

  if (!file || !token || !field) {
    return NextResponse.json(
      { error: "Missing file, token, or field." },
      { status: 400 }
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WebP, and SVG files are allowed." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File must be under 10 MB." },
      { status: 400 }
    );
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch {
    return NextResponse.json(
      { error: "Storage not configured." },
      { status: 500 }
    );
  }

  // Verify token
  const { data: client, error: lookupErr } = await supabase
    .from("clients")
    .select("id")
    .eq("onboard_token", token)
    .single();

  if (lookupErr || !client) {
    return NextResponse.json(
      { error: "Invalid onboarding session." },
      { status: 404 }
    );
  }

  // Build path: onboarding/{client_id}/{field}/{filename}
  const ext = file.name.split(".").pop() || "png";
  const timestamp = Date.now();
  const path = `${client.id}/${field}/${timestamp}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadErr } = await supabase.storage
    .from("onboarding")
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadErr) {
    return NextResponse.json(
      { error: uploadErr.message },
      { status: 500 }
    );
  }

  const { data: urlData } = supabase.storage
    .from("onboarding")
    .getPublicUrl(path);

  return NextResponse.json({
    success: true,
    url: urlData.publicUrl,
  });
}

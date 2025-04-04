import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return NextResponse.json({ status: "error", message: error.message });
  }

  return NextResponse.json({ status: "success", message: "Signup success, check your email" });
}

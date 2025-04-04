import { cookies } from "next/headers";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ status: "error", message: error.message });
  }

  const accessToken = data.session.access_token;
  const refreshToken = data.session.refresh_token;

  const cookieStore = await cookies();

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ status: "success", message: "Login success" });
}

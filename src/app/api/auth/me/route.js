import { cookies } from "next/headers";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase.auth.getUser(token.value);

  if (error) {
    return NextResponse.json({ status: "error", message: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json({ status: "success", message: "Authenticated" });
}

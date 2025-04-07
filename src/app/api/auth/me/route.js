import { cookies } from "next/headers";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");

    if (!token) {
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase.auth.getUser(token.value);

    if (error) {
      return NextResponse.json({ status: "error", message: "Invalid token" }, { status: 401 });
    }

    const { id } = data.user;
    const { data: dataExistingProfile, error: errorExistingProfile } = await supabase.from("profiles").select("username").eq("user_id", id).single();

    if (errorExistingProfile) {
      return NextResponse.json({ status: "success", message: "Authenticated", data: { email: data.user.email } }, { status: 200 });
    }

    return NextResponse.json({ status: "success", message: "Authenticated", data: { email: data.user.email, username: dataExistingProfile.username } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "something went wrong, please try again.", error, test: "execurted bro" }, { status: 500 });
  }
}

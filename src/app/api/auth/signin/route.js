import { cookies } from "next/headers";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

import { signinUserValidation } from "@/validations/userValidation";
import { validator } from "@/validations/validator";

export async function POST(req) {
  try {
    const validatedData = validator(signinUserValidation, await req.json());
    const { email, password } = validatedData;

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
  } catch (error) {
    if (error.statusCode && error.message) {
      return NextResponse.json({ status: "error", message: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ status: "error", message: "something went wrong, please try again." }, { status: 500 });
  }
}

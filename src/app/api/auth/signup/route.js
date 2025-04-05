import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";
import { signupUserValidation } from "@/validations/userValidation";
import { validator } from "@/validations/validator";

export async function POST(req) {
  try {
    const validatedData = validator(signupUserValidation, await req.json());
    const { username, email, password } = validatedData;

    const { data: dataExistingProfile } = await supabase.from("profiles").select("id").eq("username", username).single();

    if (dataExistingProfile) {
      return NextResponse.json({ status: "error", message: "username not available" }, { status: 409 });
    }

    const { data: dataSignupUser, error: errorSignupUser } = await supabase.auth.signUp({ email, password });

    if (errorSignupUser) {
      return NextResponse.json({ status: "error", message: errorSignupUser.message });
    }

    if (dataSignupUser) {
      const userUUID = dataSignupUser?.user?.id;
      await supabase.from("profiles").insert([
        {
          user_id: userUUID,
          username: username,
        },
      ]);
    }

    return NextResponse.json({ status: "success", message: "signup success, check your email before signin" });
  } catch (error) {
    if (error.statusCode && error.message) {
      return NextResponse.json({ status: "error", message: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ status: "error", message: "something went wrong, please try again." }, { status: 500 });
  }
}

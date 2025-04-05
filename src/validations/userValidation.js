import { z as zod } from "zod";

const signupUserValidation = zod.object({
  username: zod
    .string({ required_error: "required" })
    .min(3, { message: "must be at least 3 characters" })
    .max(15, { message: "must be at most 15 characters" })
    .regex(/^[A-Za-z]+$/, {
      message: "must contain only letters",
    }),
  email: zod.string().email({ message: "invalid email address" }),
  password: zod.string().min(6, { message: "must be at least 6 characters" }),
});

export { signupUserValidation };

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { UserAuth } from "@/contexts/authContext";
import { validator } from "@/validations/validator";
import { signupUserValidation } from "@/validations/userValidation";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { isAuthenticated, authMessage, setAuthMessage, signup } = UserAuth();

  useEffect(() => {
    if (isAuthenticated === "authenticated") {
      router.push("/");
    }
  }, [isAuthenticated, authMessage]);

  async function handleSignup(event) {
    try {
      event.preventDefault();
      setLoading(true);

      if (!username || !email || !password) {
        setAuthMessage("all fields need to be filled");
        return;
      }

      const validatedData = validator(signupUserValidation, { username, email, password });

      const result = await signup(...Object.values(validatedData));
      if (result?.status === "success") {
        router.push("/signin");
      }
    } catch (error) {
      if (error.message) {
        setAuthMessage(error.message);
      } else {
        setAuthMessage("something went wrong, please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-32 px-2 flex flex-col gap-y-3 justify-center items-center">
      <AnimatePresence>
        <div className="relative w-full flex justify-center">
          {authMessage && (
            <motion.p
              key="authMessage"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-xs bg-[#dee3f0] px-2 text-[#54596a] rounded text-center absolute bottom-1"
            >
              {authMessage.charAt(0).toUpperCase() + authMessage.slice(1)}
            </motion.p>
          )}
        </div>
      </AnimatePresence>
      <p>Signup</p>
      <form onSubmit={handleSignup}>
        <div className="flex flex-col gap-y-2 w-full">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="username"
            className="border bg-white text-center font-mono text-xs w-full py-1 rounded-lg outline-none px-2"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="email"
            className="border bg-white text-center font-mono text-xs w-full py-1 rounded-lg outline-none px-2"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
            className="border bg-white text-center font-mono text-xs w-full py-1 rounded-lg outline-none px-2"
          />
        </div>
        <div className="flex justify-center">
          <button className="max-w-fit mt-3 px-3 py-0.5 rounded-lg bg-[#826933] hover:bg-[#7b5e20] font-nunito text-[#eae8e3] font-medium cursor-pointer" type="submit">
            {loading ? <p>Loading...</p> : <p>Register</p>}
          </button>
        </div>
      </form>
      <div>
        <p className="text-center font-nunito">or</p>
        <Link href="/signin" className="text-stone-500 hover:text-stone-800 ">
          Signin
        </Link>
      </div>
    </div>
  );
}

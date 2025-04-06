"use client";

import { UserAuth } from "@/contexts/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { isAuthenticated, authMessage, signin } = UserAuth();

  useEffect(() => {
    if (isAuthenticated === "authenticated") {
      router.push("/");
    }
  }, [isAuthenticated, authMessage]);

  async function handleSignIn(event) {
    event.preventDefault();

    setLoading(true);

    const result = await signin(email, password);
    if (result?.status === "success") {
      router.push("/");
    }
    setLoading(false);
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
      <p>Signin</p>
      <form onSubmit={handleSignIn}>
        <div className="flex flex-col gap-y-2 w-full">
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
          <button className="max-w-fit w-full mt-3 px-3 py-0.5 rounded-lg bg-[#826933] hover:bg-[#7b5e20] font-nunito text-[#eae8e3] font-medium cursor-pointer" type="submit">
            {loading ? <p>Loading...</p> : <p>Login</p>}
          </button>
        </div>
      </form>
      <div>
        <p className="text-center font-nunito">or</p>
        <Link href="/signup" className="text-stone-500 hover:text-stone-800">
          Signup
        </Link>
      </div>
    </div>
  );
}

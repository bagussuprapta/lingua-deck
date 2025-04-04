"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { UserAuth } from "@/contexts/authContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { isAuthenticated, signup } = UserAuth();

  useEffect(() => {
    if (isAuthenticated === "authenticated") {
      router.push("/");
    }
  }, [isAuthenticated]);

  async function handleRegister(event) {
    event.preventDefault();
    setLoading(true);
    const response = await signup(email, password);

    setMessage(response.message);
    setLoading(false);
  }

  return (
    <div>
      <div className="mt-20">
        <div className="px-2 flex flex-col gap-y-3 justify-center items-center">
          <p>Signup</p>
          {message && <p className="text-xs bg-[#dee3f0] px-2 text-[#54596a] rounded text-center">{message.charAt(0).toUpperCase() + message.slice(1)}</p>}
          <form onSubmit={handleRegister}>
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
              <button className="max-w-fit mt-3 px-3 py-0.5 rounded-lg bg-[#826933] hover:bg-[#7b5e20] font-nunito text-[#eae8e3] font-medium cursor-pointer" type="submit">
                {loading ? <p>Loading...</p> : <p>Register</p>}
              </button>
            </div>
          </form>
          <div>
            <p className="text-center font-nunito">or</p>
            <Link href="/signin" className="text-stone-500 hover:text-stone-800 ">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

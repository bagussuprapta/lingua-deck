"use client";

import { UserAuth } from "@/contexts/authContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { isAuthenticated, signout } = UserAuth();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  async function handleLogout() {
    await signout();
  }

  if (!hydrated) {
    return null;
  }

  return (
    <header className="w-full px-2 md:px-48 mt-4 font-nunito text-white">
      <div className="flex gap-x-4 justify-between border-b-4 border-[#232222] bg-[#a4b9b5] rounded-2xl border-2 px-4 py-3">
        <div className="flex gap-x-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
        <div>
          {isAuthenticated === "authenticating" ? (
            <p>Loading...</p>
          ) : isAuthenticated === "authenticated" ? (
            <div className="flex gap-x-4">
              <Link href="/profile">Profile</Link>
              <p className="cursor-pointer" onClick={handleLogout}>
                Signout
              </p>
            </div>
          ) : (
            <Link href="/signin">Signin</Link>
          )}
        </div>
      </div>
    </header>
  );
}

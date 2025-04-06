"use client";

import { UserAuth } from "@/contexts/authContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const baseInitial = { opacity: 0, y: -5 };
const baseExit = { opacity: 0, y: -5, transition: { duration: 0.3 } };
const createSpringAnimate = (delay = 0) => ({
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.4,
    delay,
    ease: "easeOut",
    type: "spring",
    stiffness: 500,
    damping: 20,
  },
});

export default function Navbar() {
  const { isAuthenticated, signout } = UserAuth();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  async function handleLogout() {
    await signout();
  }

  if (!hydrated) return null;

  return (
    <motion.header initial={baseInitial} animate={createSpringAnimate()} exit={baseExit} className="w-full min-w-72 px-2 md:px-48 mt-4 font-nunito text-white fixed">
      <div className="flex gap-x-4 justify-between border-b-4 border-[#232222] bg-[#a4b9b5] rounded-2xl border-2 px-4 py-3">
        <div className="flex gap-x-4">
          <motion.p initial={baseInitial} animate={createSpringAnimate(0.2)} exit={baseExit}>
            <Link href="/" className="hover:text-stone-100">
              Home
            </Link>
          </motion.p>
          <motion.p initial={baseInitial} animate={createSpringAnimate(0.3)} exit={baseExit}>
            <Link href="/about" className="hover:text-stone-100">
              About
            </Link>
          </motion.p>
        </div>
        <div>
          {isAuthenticated === "authenticating" ? null : isAuthenticated === "authenticated" ? (
            <div className="flex gap-x-4">
              <motion.p initial={baseInitial} animate={createSpringAnimate(0.4)} exit={baseExit}>
                <Link href="/profile" className="hover:text-stone-100">
                  Profile
                </Link>
              </motion.p>
              <motion.p
                initial={baseInitial}
                animate={createSpringAnimate(0.5)}
                exit={baseExit}
                className="cursor-pointer bg-[#d5432c] hover:bg-[#c73922] hover:text-stone-100 px-2 rounded-xl"
                onClick={handleLogout}
              >
                Signout
              </motion.p>
            </div>
          ) : (
            <motion.p initial={baseInitial} animate={createSpringAnimate(0.4)} exit={baseExit}>
              <Link href="/signin" className="hover:text-stone-100">
                Signin
              </Link>
            </motion.p>
          )}
        </div>
      </div>
    </motion.header>
  );
}

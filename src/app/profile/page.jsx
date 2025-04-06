"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { UserAuth } from "@/contexts/authContext";
import { InputUserData } from "@/components/Input";
import { ActionButton } from "@/components/ActionButton";

export default function Profile() {
  const { isAuthenticated } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === "not-authenticated") {
      router.push("/signin");
    }
  }, [isAuthenticated]);

  return <ProfileLayout></ProfileLayout>;
}

function ProfileLayout() {
  return (
    <div className="pt-20 px-2 flex justify-center">
      <ProfileDetail></ProfileDetail>
    </div>
  );
}

function ProfileDetail() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { userSession } = UserAuth();

  useEffect(() => {
    setUsername(userSession.username);
    setEmail(userSession.email);
  }, [userSession, username, email]);

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

  return (
    <motion.div initial={baseInitial} animate={createSpringAnimate(0.2)} exit={baseExit} className="border border-stone-200 px-5 py-3 rounded-2xl border-b-[4px] bg-stone-100">
      <motion.p initial={baseInitial} animate={createSpringAnimate(0.3)} exit={baseExit} className="text-center text-sm font-black">
        Your Profile
      </motion.p>
      <form className="mt-3">
        <div className="flex flex-col gap-y-2">
          <InputUserData placeholder="username" type="text" value={username} onChange={setUsername} delay={0.4}></InputUserData>
          <InputUserData placeholder="email" type="text" value={email} onChange={setEmail} delay={0.5}></InputUserData>
        </div>
        <motion.div initial={baseInitial} animate={createSpringAnimate(0.6)} exit={baseExit} className="mt-3 flex justify-center">
          <ActionButton type="submit" text="Update" color="chestnut" />
        </motion.div>
      </form>
    </motion.div>
  );
}

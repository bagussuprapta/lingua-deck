import { motion } from "framer-motion";

export function InputUserData({ onChange, type, placeholder, value = "", delay }) {
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
    <motion.input
      onChange={(e) => {
        onChange(e.target.value);
      }}
      type={type}
      placeholder={placeholder}
      value={value}
      initial={baseInitial}
      animate={createSpringAnimate(delay)}
      exit={baseExit}
      className="border bg-white text-center font-mono text-xs w-fit py-1 mx-auto rounded-lg outline-none px-2"
    />
  );
}

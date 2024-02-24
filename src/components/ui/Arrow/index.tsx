"use client";
import { motion } from "framer-motion";

const Arrow = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="flex relative"
      initial={{
        opacity: 0,
        x: 100,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
          delay: 0.3,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default Arrow;

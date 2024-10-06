"use client";

import { motion } from "framer-motion";
const ProgresBar = ({
  progress,
  transitionDelay,
}: {
  progress: string;
  transitionDelay: number;
}) => {
  return (
    <motion.div
      className="h-full absolute top-0 left-0 z-0 rounded-l-full rounded-r-full text-end"
      initial={{
        backgroundColor: "var(--color-primary-dark)",
        width: "25%",
      }}
      whileInView={{
        width: progress,
        transition: {
          duration: 1,
          ease: "easeInOut",
          delay: transitionDelay * 0.2,
          bounce: 0.5,
          bounceDamping: 10,
        },
      }}
    >
      {progress}
    </motion.div>
  );
};

export default ProgresBar;

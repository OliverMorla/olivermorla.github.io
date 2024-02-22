"use client";

import { motion } from "framer-motion";

const SectionTitle = ({ title, desc }: SectionTitleProps) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center max-md:w-full"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: 0.3 },
      }}
    >
      <h1 className="font-bold text-white text-7xl max-sm:text-5xl tracking-tighter bg-[--color-eerie-black] p-2 uppercase">
        {title}
      </h1>
      <p className="opacity-60 max-sm:text-sm text-white">{desc}</p>
    </motion.div>
  );
};

export default SectionTitle;

"use client";
import { motion } from "framer-motion";

const ResumeFrame = () => {
  return (
    <motion.iframe
      src="/assets/documents/Oliver-Maldonado-Resume.pdf"
      className="relative w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
    />
  );
};

export default ResumeFrame;

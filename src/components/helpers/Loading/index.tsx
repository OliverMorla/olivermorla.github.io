"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LoadingWithBg = () => {
  return (
    <AnimatePresence>
      <motion.main
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        }}
        exit={{
          opacity: 0,
        }}
        className="w-full h-full bg-[--primary] flex justify-center items-center"
      >
        <Image
          src={"/assets/images/loading/spinner.svg"}
          width={512}
          height={512}
          alt="spinner.svg"
          className="object-cover"
        />
      </motion.main>
    </AnimatePresence>
  );
};

const LoadingWithoutBg = () => {
  return (
    <AnimatePresence>
      <motion.main
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        }}
        exit={{
          opacity: 0,
        }}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src={"/assets/images/loading/spinner.svg"}
          width={512}
          height={512}
          alt="spinner.svg"
          className="object-cover"
        />
      </motion.main>
    </AnimatePresence>
  );
};

export { LoadingWithBg, LoadingWithoutBg };

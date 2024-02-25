"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";

const Button = ({ title, iconUrl, fontAwesomeIconUrl }: ButtonProps) => {
  return (
    <>
      <motion.button
        className="px-6 py-4 font-bold flex items-center gap-2 transition-all duration-500"
        style={{
          background:
            "linear-gradient(to right, var(--color-electric-purple) 50%, var(--color-royal-purple) 50%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "right bottom",
        }}
        whileHover={{
          color: "white",
          backgroundPosition: "left bottom",
          transition: {
            duration: 0.1,
            ease: "easeOut",
          },
        }}
        aria-label={title}
      >
        <span>{title}</span>
        {fontAwesomeIconUrl && (
          <FontAwesomeIcon icon={fontAwesomeIconUrl} width={25} height={25} />
        )}

        {iconUrl && <SVG src={iconUrl} width={25} height={25} />}
      </motion.button>
    </>
  );
};

export default Button;

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";

const SocialMediaButton = ({
  title,
  pathUrl,
  iconUrl,
  transitionDelay,
}: SocialMediaButtonProps) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: transitionDelay * 0.4 },
      }}
      whileHover={{
        scale: 1.1,
        color: "var( --color-royal-purple)"
      }}
    >
      <Link href={pathUrl}>
        <FontAwesomeIcon icon={iconUrl} />
      </Link>
    </motion.li>
  );
};

export default SocialMediaButton;

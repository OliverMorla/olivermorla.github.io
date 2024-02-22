"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const MobileNavLink = ({
  title,
  pathUrl,
  transitionDelay,
  isMenuOpen,
}: MobileNavLinkProps) => {
  return (
    <motion.li
      className="px-8 py-2"
      initial={{
        x: -50,
        opacity: 0,
      }}
      animate={{
        x: isMenuOpen ? 0 : -50,
        opacity: isMenuOpen ? 1 : 0,
        transition: {
          delay: transitionDelay,
          duration: 0.8,
        },
      }}
    >
      <Link href={pathUrl}>{title}</Link>
    </motion.li>
  );
};

export default MobileNavLink;

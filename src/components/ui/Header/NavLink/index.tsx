"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const NavLink = ({ title, pathUrl, transitionDelay }: NavLinkProps) => {
  return (
    <motion.li
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: transitionDelay * 0.2 },
      }}
      whileTap={{
        scale: 0.9,
        fontWeight: "bold",
      }}
      whileHover={{
        scale: 1.1,
        fontWeight: "bold",
      }}
    >
      <Link href={pathUrl}>{title}</Link>
    </motion.li>
  );
};

export default NavLink;

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
    >
      <Link href={pathUrl}>{title}</Link>
    </motion.li>
  );
};

export default NavLink;

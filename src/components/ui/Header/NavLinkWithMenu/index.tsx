"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavLinkWithMenu = ({
  title,
  pathUrl,
  fontAwesomeIconUrl,
  showMenu,
  setShowMenu,
  transitionDelay,
}: NavLinkWithMenuProps) => {
  return (
    <motion.li
      className="flex flex-col items-center relative"
      whileTap={{
        y: 10,
      }}
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: transitionDelay * 0.2 },
      }}
      onHoverStart={() => setShowMenu(true)}
    >
      <Link href={pathUrl} className="flex items-center">
        {title}
        <FontAwesomeIcon icon={fontAwesomeIconUrl} width={25} height={25} />
      </Link>
      <motion.div
        className={`bg-[--color-slate-gray] flex flex-col absolute top-16 ${
          showMenu ? "" : "hidden"
        } text-center rounded-lg`}
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: showMenu ? 1 : 0,
          y: showMenu ? 0 : 40,
        }}
        style={{
          boxShadow: "0px 0px 10px 0px #000001",
        }}
        onHoverEnd={() => setShowMenu(false)}
      >
        <Link
          href={"/resume"}
          className="px-8 py-5 hover:bg-[--color-charcoal] transition-colors rounded-t-lg"
        >
          Resume
        </Link>
        <Link
          href={"/repositories"}
          className="px-8 py-5 hover:bg-[--color-charcoal] transition-colors"
        >
          Repositories
        </Link>
        <Link
          href={"/blog"}
          className="px-8 py-5 hover:bg-[--color-charcoal] transition-colors"
        >
          Blog
        </Link>
        <Link
          href={"/auth/sign-in"}
          className="px-8 py-4 hover:bg-[--color-charcoal] transition-colors rounded-b-lg"
        >
          Sign In
        </Link>
      </motion.div>
    </motion.li>
  );
};

export default NavLinkWithMenu;

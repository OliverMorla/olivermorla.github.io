"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { navPrimaryLinks } from "@/constants";
import MenuButton from "@/components/ui/MobileHeader/Menu";
import MobileNavLink from "@/components/ui/MobileHeader/MobileNavLink";

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navListRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="md:hidden max-w-[40px]">
      <motion.div whileTap={{ rotate: 90 }} onClick={toggleMenu}>
        <MenuButton isMenuOpen={isMenuOpen} />
      </motion.div>
      <ul
        className={`flex flex-col text-white bg-[--color-eerie-black] absolute left-0 top-0 transition-all duration-500 mt-[84px] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        ref={navListRef}
      >
        {navPrimaryLinks.map((item, index) => (
          <MobileNavLink
            key={index}
            title={item.title}
            pathUrl={item.pathUrl}
            transitionDelay={index * 0.1}
            isMenuOpen={isMenuOpen}
          />
        ))}
      </ul>
    </div>
  );
};

export default MobileHeader;

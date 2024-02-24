/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { navPrimaryLinks } from "@/constants";
import NavLink from "@/components/ui/Header/NavLink";
import MobileHeader from "@/components/ui/MobileHeader";
import NavLinkWithMenu from "@/components/ui/Header/NavLinkWithMenu";
import { motion } from "framer-motion";

const Header = () => {  
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative">
      <motion.nav
        className={`fixed bg-[--color-eerie-black] flex items-center justify-center w-full z-20 transition-all p-8 max-md:justify-between duration-500 ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        }`}
        onHoverStart={() => setShowMenu(false)}
      >
        <h1 className="text-white font-bold md:hidden">Oliver Morla</h1>
        <ul className="flex gap-10 max-lg:flex-wrap items-center text-white max-md:hidden">
          {navPrimaryLinks.map((item, index) => {
            if (item.title !== "About") {
              return (
                <NavLink
                  key={index}
                  title={item.title}
                  pathUrl={item.pathUrl}
                  transitionDelay={index}
                />
              );
            } else {
              return (
                <NavLinkWithMenu
                  key={index}
                  title={item.title}
                  pathUrl={item.pathUrl}
                  fontAwesomeIconUrl={item.fontAwesomeIconUrl}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  transitionDelay={index}
                />
              );
            }
          })}
        </ul>
        <MobileHeader />
      </motion.nav>
    </header>
  );
};

export default Header;

"use client";

import React from "react";
import Link from "next/link";
import { headerPrimaryLinks } from "@/constants";
import { scroll } from "framer-motion";
import AnimatedLi from "@/components/helpers/AnimatedLi";
import MobileNav from "@/components/ui/MobileNav/MobileNav";
import ThemeSwitcher from "@/components/helpers/ThemeSwitcher";
import HeaderDropdownLink from "./DropdownLink";

const Header = () => {
  React.useEffect(() => {
    const nav = document.querySelector("#desktop-nav");
    scroll((progress: any) =>
      progress > 0.04
        ? nav?.classList.add("-translate-y-[100%]")
        : nav?.classList.remove("-translate-y-[100%]")
    );
  }, []);

  return (
    <header className="relative">
      <nav
        id="desktop-nav"
        className="fixed flex items-center justify-center w-full p-8 dark:bg-neutral-900 bg-neutral-200 dark:text-neutral-100 text-neutral-800 transition-all duration-300 max-lg:hidden z-50"
      >
        <ul className="flex gap-6 items-center justify-center w-full">
          {headerPrimaryLinks.map((item, index) =>
            !item.dropdownLinks ? (
              <AnimatedLi key={index} y={-40} delay={index * 0.1}>
                <Link
                  href={item.href}
                  className="min-w-[70px] px-2 py-1 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 hover:bg-neutral-300 active:bg-neutral-400 transition-all ease-in-out duration-300 rounded-md"
                >
                  {item.title}
                </Link>
              </AnimatedLi>
            ) : (
                <HeaderDropdownLink
                  key={index}
                  y={-40}
                  href={item.href}
                  delay={index * 0.1}
                  dropdownLinks={item.dropdownLinks}
                >
                  {item.title}
                </HeaderDropdownLink>
            )
          )}
        </ul>
        <ThemeSwitcher className="absolute right-8" />
      </nav>

      <MobileNav disableScroll className="fixed top-4 right-4 lg:hidden" />
    </header>
  );
};

export default Header;

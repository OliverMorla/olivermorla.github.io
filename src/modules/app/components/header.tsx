"use client";

import React from "react";
import { scroll } from "motion";
import NavLink from "@/modules/app/components/nav-link";
import { headerPrimaryLinks } from "@/modules/app/lib/constants";
import ResponsiveNav from "@/modules/app/components/responsive-nav";
import ThemeSwitcher from "@/modules/app/components/dynamic/theme-switcher";
import { MotionDiv, MotionLi } from "@/components/helpers/blur-lazy-motion";

const Header = () => {
  React.useEffect(() => {
    const nav = document.querySelector("#desktop-nav");
    scroll((progress: number) =>
      progress > 0.04
        ? nav?.classList.add("-translate-y-[100%]")
        : nav?.classList.remove("-translate-y-[100%]")
    );
  }, []);

  return (
    <header className="relative">
      <nav
        id="desktop-nav"
        className="fixed flex items-center justify-center w-full px-8 max-sm:px-4 py-6 dark:bg-neutral-950/85 backdrop-blur-md bg-neutral-100/75 transition-all duration-300 max-lg:hidden z-50"
      >
        <ul className="flex gap-6 items-center justify-center w-full">
          {headerPrimaryLinks.map((item, idx) => (
            <MotionLi delay={0.1 * idx} key={idx}>
              <NavLink
                href={item.href}
                dropdownLinks={item.dropdownLinks}
                className="px-2 py-1 "
              >
                {item.title}
              </NavLink>
            </MotionLi>
          ))}
        </ul>
        <MotionDiv delay={0.1 * headerPrimaryLinks.length}>
          <ThemeSwitcher />
        </MotionDiv>
      </nav>
      <ResponsiveNav />
    </header>
  );
};

export default Header;

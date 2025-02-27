"use client";

import React from "react";
import Link from "next/link";
import { scroll } from "motion";
import { MotionLi } from "@/components/helpers/Motion";
import { headerPrimaryLinks } from "@/constants";
import ResponsiveNav from "@/modules/app/components/responsive-nav";
import ThemeSwitcher from "@/modules/app/components/dynamic/theme-switcher";

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
        className="fixed flex items-center justify-center w-full px-8 max-sm:px-4 py-6 dark:bg-neutral-950/20 backdrop-blur-md bg-neutral-200/20 dark:text-neutral-100 text-neutral-800 transition-all duration-300 max-lg:hidden z-50"
      >
        <ul className="flex gap-6 items-center justify-center w-full">
          {headerPrimaryLinks.map((item, index) => (
            <MotionLi key={index} y={-40} delay={index * 0.1}>
              <Link
                href={item.href}
                className="min-w-[70px] px-2 py-1 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 hover:bg-neutral-300 active:bg-neutral-400 transition-all ease-in-out duration-300 rounded-md"
              >
                {item.title}
              </Link>
            </MotionLi>
          ))}
        </ul>
        <ThemeSwitcher />
      </nav>
      {/* Responsive Nav for mobile devices */}
      <ResponsiveNav />
    </header>
  );
};

export default Header;

"use client";

import Link from "next/link";
import { cn } from "@/utils/classNames";
import ThemeSwitcher from "./theme-switcher";
import { ChevronRightIcon } from "lucide-react";
import Portal from "@/components/ui/portal";

import useScrollLock from "@/hooks/useScrollLock";
import { FC, HTMLAttributes, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { simpleBlurVariant } from "@/lib/motion/utils";
import { headerPrimaryLinks } from "@/modules/app/lib/constants";
import { MotionDiv } from "@/components/helpers/basic-lazy-motion";

const ResponsiveNav: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  useScrollLock(isOpen);

  return (
    <nav className="relative">
      <div
        onClick={handleClick}
        className={cn(
          "lg:hidden fixed top-4 right-4 z-[1000] cursor-pointer w-[45px] h-[45px] p-3 bg-orange-200/75 dark:bg-neutral-800/75 rounded-lg backdrop-blur-sm",
          className
        )}
        {...props}
      >
        <AnimatePresence>
          <div className="relative flex flex-col items-center justify-center h-full w-full">
            <motion.div
              animate={isOpen ? { rotate: 45 } : { rotate: 0, y: -8 }}
              className="absolute h-0.5 w-full bg-neutral-800 dark:bg-neutral-100 rounded-md origin-center"
            />
            <motion.div
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="absolute h-0.5 w-full bg-neutral-800 dark:bg-neutral-100 rounded-md"
            />
            <motion.div
              animate={isOpen ? { rotate: -45 } : { rotate: 0, y: 8 }}
              className="absolute h-0.5 w-full bg-neutral-800 dark:bg-neutral-100 rounded-md origin-center"
            />
          </div>
        </AnimatePresence>
      </div>
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <aside className="relative z-[100]">
              <div onClick={handleClick} />

              <MotionDiv
                {...simpleBlurVariant(0.1)}
                className="fixed overflow-hidden py-12 top-0 left-0 h-screen w-full max-w-full backdrop-blur-sm bg-gradient-to-b bg-gradient-none z-[100] shadow-xl"
              >
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-neutral-300/75 dark:border-neutral-700/75 flex items-center justify-between">
                    {/* <Link
                      href="/"
                      className="flex items-center lg:hidden w-fit"
                    >
                      <Image />
                    </Link> */}
                    <div
                      onClick={handleClick}
                      className={cn(
                        "lg:hidden fixed top-4 right-4 z-[1000] cursor-pointer w-[45px] h-[45px] p-3 bg-orange-200/75 dark:bg-neutral-950/75 rounded-lg backdrop-blur-sm",
                        className
                      )}
                      {...props}
                    >
                      {/* <AnimatePresence> */}
                      <div className="relative flex flex-col items-center justify-center h-full w-full">
                        <motion.div
                          animate={
                            isOpen ? { rotate: 45 } : { rotate: 0, y: -8 }
                          }
                          className="absolute h-0.5 w-full bg-neutral-800 dark:bg-neutral-100 rounded-md origin-center"
                        />
                        <motion.div
                          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                          className="absolute h-0.5 w-full bg-neutral-800 dark:bg-neutral-100 rounded-md"
                        />
                        <motion.div
                          animate={
                            isOpen ? { rotate: -45 } : { rotate: 0, y: 8 }
                          }
                          className="absolute h-0.5 w-full bg-neutral-800 dark:bg-neutral-100 rounded-md origin-center"
                        />
                      </div>
                      {/* </AnimatePresence> */}
                    </div>
                  </div>
                  <nav className="flex-1 overflow-y-auto p-6">
                    <ul className="flex flex-col gap-6">
                      {headerPrimaryLinks.map((link) =>
                        link.dropdownLinks ? (
                          <li key={link.title} className="flex flex-col gap-4">
                            <Link
                              href={link.href}
                              onClick={handleClick}
                              className="text-neutral-600 dark:text-neutral-300 hover:text-blue-800 active:text-blue-900 dark:hover:text-blue-400 dark:active:text-blue-500 transition-colors flex items-center justify-between "
                            >
                              {link.title}
                              <ChevronRightIcon className="w-4 h-4" />
                            </Link>
                            <ul className="flex flex-col gap-6 bg-orange-200/75 dark:bg-neutral-900/75 rounded-lg p-4">
                              {link.dropdownLinks.map((dropdownLink) => (
                                <li
                                  key={dropdownLink.title}
                                  className="flex items-center justify-between"
                                >
                                  <Link
                                    href={dropdownLink.href}
                                    onClick={handleClick}
                                    className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-300 hover:text-blue-800 active:text-blue-900 dark:hover:text-blue-400 dark:active:text-blue-500 transition-colors rounded-lg"
                                  >
                                    {dropdownLink.title}
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                      {dropdownLink.description}
                                    </span>
                                  </Link>
                                  <ChevronRightIcon className="w-4 h-4" />
                                </li>
                              ))}
                            </ul>
                          </li>
                        ) : (
                          <li key={link.title}>
                            <Link
                              href={link.href}
                              onClick={handleClick}
                              className="flex items-start justify-between text-neutral-600 dark:text-neutral-300 hover:text-blue-800 active:text-blue-900 dark:hover:text-blue-400 dark:active:text-blue-500 transition-colors"
                            >
                              <div className="flex flex-col">
                                <span>{link.title}</span>
                                <span className="text-xs opacity-60">
                                  {link.description}
                                </span>
                              </div>
                              <ChevronRightIcon className="w-4 h-4" />
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                    <ThemeSwitcher wrapperClassName="absolute bottom-4 left-4" />
                  </nav>
                </div>
              </MotionDiv>
            </aside>
          )}
        </AnimatePresence>
      </Portal>
    </nav>
  );
};

export default ResponsiveNav;

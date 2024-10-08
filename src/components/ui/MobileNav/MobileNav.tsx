"use client";
import React from "react";
import AnimatedDiv from "../../helpers/AnimatedDiv";
import { cn, overflowHandler } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import Portal from "../../helpers/Portal";
import AnimatedNav from "../../helpers/AnimatedNav";
import AnimatedLi from "../../helpers/AnimatedLi";
import { headerPrimaryLinks, socialMediaLinks } from "@/constants";
import Link from "next/link";
import ThemeSwitcher from "../../helpers/ThemeSwitcher";
import Icon from "../../helpers/Icon";
import useMediaQuery from "@/hooks/useMediaQuery";

interface MobileNavProps extends React.ComponentPropsWithoutRef<"div"> {
  readonly disableScroll?: boolean;
  readonly containerClassName?: string;
  readonly menuClassName?: string;
}

const MobileNav = React.forwardRef<HTMLDivElement, MobileNavProps>(
  (
    {
      className,
      disableScroll = false,
      containerClassName,
      menuClassName,
      ...props
    },
    ref
  ) => {
    const isLargeScreen = useMediaQuery("(min-width: 1024px)");
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState<string>("");

    const handleClick = React.useCallback(() => {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }, []);

    React.useEffect(() => {
      if (isLargeScreen) {
        setIsOpen(false);
      }
    }, [isLargeScreen]);

    React.useEffect(() => {
      if (disableScroll) {
        overflowHandler(isOpen);
      }
    }, [disableScroll, isOpen]);

    return (
      <>
        <div
          ref={ref}
          onClick={handleClick}
          className={cn(
            `flex flex-col ${
              isOpen ? "justify-center" : "justify-between"
            } h-[30px] w-[35px] cursor-pointer hover:opacity-80 active:opacity-60 active:scale-95 transition-all duration-300 z-[100]`,
            className
          )}
          {...props}
        >
          <AnimatePresence>
            {isOpen ? (
              <React.Fragment>
                <AnimatedDiv
                  className="absolute dark:bg-white bg-neutral-900 border-orange-400 border-[1px] w-full min-h-[3px]"
                  animate={{
                    rotate: 45,
                    opacity: 1,
                  }}
                ></AnimatedDiv>
                <AnimatedDiv
                  className="absolute dark:bg-white bg-neutral-900 border-orange-400 border-[1px] w-full min-h-[3px]"
                  animate={{
                    rotate: -45,
                    opacity: 1,
                  }}
                ></AnimatedDiv>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <AnimatedDiv className="dark:bg-white bg-neutral-900 border-orange-400 border-[1px] w-full min-h-[3px] mb-1"></AnimatedDiv>
                <AnimatedDiv className="dark:bg-white bg-neutral-900 border-orange-400 border-[1px] w-full min-h-[3px] my-1"></AnimatedDiv>
                <AnimatedDiv className="dark:bg-white bg-neutral-900 border-orange-400 border-[1px] w-full min-h-[3px] mt-1"></AnimatedDiv>
              </React.Fragment>
            )}
          </AnimatePresence>
        </div>

        <Portal>
          {isOpen && (
            <AnimatedNav
              id="mobile-nav"
              transition={{ type: "tween" }}
              className={cn(
                "lg:hidden fixed dark:bg-neutral-900 bg-neutral-100 left-0 top-0 w-full h-full max-h-screen flex flex-col gap-6 z-50 pt-[60px] pb-8 max-sm:pb-4 px-8 max-sm:px-4 overflow-y-auto",
                containerClassName
              )}
            >
              <ul className="flex flex-col gap-6 items-center w-full">
                <AnimatedLi className="text-4xl text-start w-full py-2 border-b-[1px] dark:border-b-neutral-800 border-b-neutral-200">
                  Oliver Morla
                </AnimatedLi>
                {headerPrimaryLinks.map((item, index) =>
                  !item.dropdownLinks ? (
                    <AnimatedLi
                      key={index}
                      y={-40}
                      delay={index * 0.1}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 hover:bg-neutral-300 active:bg-neutral-400 transition-all ease-in-out duration-300 rounded-md text-2xl flex items-center justify-between"
                      >
                        <div>
                          <span>{item.title}</span>
                          <p className="text-sm font-light opacity-60">
                            {item.description}
                          </p>
                        </div>
                        <Icon faIcon="chevronRight" />
                      </Link>
                    </AnimatedLi>
                  ) : (
                    <AnimatedLi
                      key={index}
                      y={-40}
                      delay={index * 0.1}
                      className="w-full"
                    >
                      <div
                        onClick={() => {
                          if (isDropdownOpen === item.title) {
                            setIsDropdownOpen("");
                          } else {
                            setIsDropdownOpen(item.title);
                          }
                        }}
                        className="relative flex flex-col gap-4 transition-all ease-in-out duration-300 rounded-md text-2xl cursor-pointer"
                      >
                        <div className="p-2 flex items-center justify-between dark:hover:bg-neutral-800 dark:active:bg-neutral-700 hover:bg-neutral-300 active:bg-neutral-400 rounded-md">
                          <div>
                            <span>{item.title}</span>
                            <p className="text-sm font-light opacity-60">
                              {item.description}
                            </p>
                          </div>
                          <Icon
                            faIcon="chevronRight"
                            className={`transition-all duration-300 ${
                              isDropdownOpen ? "rotate-90" : "rotate-0"
                            }`}
                          />
                        </div>
                        <AnimatePresence>
                          {isDropdownOpen === item.title && (
                            <AnimatedDiv
                              key={item.title}
                              transition={{ type: "tween" }}
                              className="px-2 py-2 dark:bg-neutral-700 dark:active:bg-neutral-600 hover:bg-neutral-400 active:bg-neutral-500 rounded-md"
                            >
                              {item.dropdownLinks.map((dropdownLink, index) => (
                                <Link
                                  key={index}
                                  href={dropdownLink.href}
                                  onClick={() => setIsOpen(!isOpen)}
                                  className="opacity-60 font-light pl-4 px-2 py-2 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 hover:bg-neutral-300 active:bg-neutral-400 transition-all ease-in-out duration-300 rounded-md text-xl flex items-center justify-between"
                                >
                                  <div>
                                    <span>{dropdownLink.title}</span>
                                    <p className="text-sm font-light opacity-60">
                                      {dropdownLink.description}
                                    </p>
                                  </div>
                                  <Icon faIcon="chevronRight" />
                                </Link>
                              ))}
                            </AnimatedDiv>
                          )}
                        </AnimatePresence>
                      </div>
                    </AnimatedLi>
                  )
                )}
                <AnimatedLi
                  className="absolute top-2 left-4"
                  y={-40}
                  delay={headerPrimaryLinks.length * 0.1}
                >
                  <ThemeSwitcher />
                </AnimatedLi>
              </ul>
              <ul className="mt-auto flex items-center justify-evenly gap-2 flex-wrap border-t-[1px] dark:border-t-neutral-800 border-t-neutral-200 pt-6">
                {socialMediaLinks.map((item, index) => (
                  <AnimatedLi key={index}>
                    <Link
                      href={item.href}
                      className="hover:opacity-80 active:opacity-60 transition-opacity"
                    >
                      {item.title}
                    </Link>
                  </AnimatedLi>
                ))}
              </ul>
            </AnimatedNav>
          )}
        </Portal>
      </>
    );
  }
);

MobileNav.displayName = "MobileNav";

export default MobileNav;

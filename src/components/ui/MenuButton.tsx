"use client";
import React, { SetStateAction } from "react";
import AnimatedDiv from "../helpers/AnimatedDiv";
import { cn, overflowHandler } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";

interface MenuButtonProps extends React.ComponentPropsWithoutRef<"div"> {
  readonly onToggle: (
    value: any,
    setter?: React.Dispatch<SetStateAction<boolean>>
  ) => void;
  readonly disableScroll?: boolean;
}
const MenuButton = React.forwardRef<HTMLDivElement, MenuButtonProps>(
  ({ className, disableScroll = false, onToggle, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        // Update state
        setIsOpen(!isOpen);

        // Invoke callback to allow values to be used on parent
        onToggle(!isOpen, setIsOpen);
      },

      [isOpen, onToggle]
    );

    // If true, disable scroll on body else allow
    if (disableScroll) {
      isOpen ? overflowHandler(isOpen) : overflowHandler(isOpen);
    }

    return (
      <div
        ref={ref}
        {...props}
        onClick={handleClick}
        className={cn(
          `flex flex-col ${
            isOpen ? "justify-center" : "justify-between"
          } h-[30px] w-[35px] cursor-pointer hover:opacity-80 active:opacity-60 active:scale-95 transition-all duration-300`,
          className
        )}
      >
        <AnimatePresence>
          {isOpen ? (
            <React.Fragment>
              <AnimatedDiv
                className="absolute dark:bg-white bg-neutral-900 w-full min-h-[3px]"
                animate={{
                  rotate: 45,
                  opacity: 1,
                }}
              ></AnimatedDiv>
              <AnimatedDiv
                className="absolute dark:bg-white bg-neutral-900 w-full min-h-[3px]"
                animate={{
                  rotate: -45,
                  opacity: 1,
                }}
              ></AnimatedDiv>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <AnimatedDiv className="dark:bg-white bg-neutral-900 w-full min-h-[3px]"></AnimatedDiv>
              <AnimatedDiv className="dark:bg-white bg-neutral-900 w-full min-h-[3px]"></AnimatedDiv>
              <AnimatedDiv className="dark:bg-white bg-neutral-900 w-full min-h-[3px]"></AnimatedDiv>
            </React.Fragment>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

MenuButton.displayName = "MenuButton";

export default MenuButton;

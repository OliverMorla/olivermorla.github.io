"use client";
import React from "react";
import AnimatedLi, { AnimatedLiProps } from "@/components/helpers/AnimatedLi";
import { AnimatePresence, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import ButtonLink from "@/components/shared/ui/ButtonLink";
import { HeaderDropdownLinksTypes } from "@/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "@/components/helpers/Icon";
import AnimatedDiv from "@/components/helpers/AnimatedDiv";

interface HeaderDropdownLinkProps extends AnimatedLiProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly containerClassName?: string;
  readonly dropdownLinkClassName?: string;

  // ------------------------------------------- //
  readonly dropdownLinks?: HeaderDropdownLinksTypes;
}

const HeaderDropdownLink = React.forwardRef<
  HTMLLIElement,
  HeaderDropdownLinkProps & MotionProps
>(
  (
    {
      children,
      href,
      dropdownLinks,
      className,
      containerClassName,
      dropdownLinkClassName,
      ...props
    },
    ref
  ) => {
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Handle mouse enter event
    const handleMouseEnter = React.useCallback(() => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current); // Clear any existing timeout to prevent hiding
      }
      setShowMenu(true); // Show the dropdown menu
    }, []);

    // Handle mouse leave event
    const handleMouseLeave = React.useCallback(() => {
      dropdownTimeoutRef.current = setTimeout(() => {
        setShowMenu(false); // Hide the dropdown menu after a delay
      }, 100);
    }, []);

    // Clean up the timeout when the component unmounts
    React.useEffect(() => {
      return () => {
        if (dropdownTimeoutRef.current) {
          clearTimeout(dropdownTimeoutRef.current);
        }
      };
    }, []);

    return (
      <AnimatedLi
        ref={ref}
        className={cn(
          containerClassName,
          "flex flex-col justify-center items-center"
        )}
        {...props}
      >
        <ButtonLink
          href={href}
          size="sm"
          variant="none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn("relative flex items-center max-h-[21px]", className)}
        >
          {children}
        </ButtonLink>
        <AnimatePresence>
          {showMenu && (
            <AnimatedDiv className="mx-auto absolute -bottom-4">
              <Icon
                faIcon="chevronDown"
                className="dark:text-neutral-100 opacity-20"
              />
            </AnimatedDiv>
          )}
          {dropdownLinks && showMenu && (
            <AnimatedDiv
              className="absolute flex flex-col gap-2 top-[50px] transform z-10 rounded-md bg-neutral-200 dark:bg-neutral-900 p-4 shadow-sm max-w-[235px] min-w-[235px]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Icon
                faIcon="chevronUp"
                className="dark:text-neutral-100 opacity-20"
              />
              {dropdownLinks.map((item, index) => (
                <ButtonLink
                  key={index}
                  size={"none"}
                  variant="none"
                  href={item.href}
                  className={cn(
                    dropdownLinkClassName,
                    "flex flex-col items-start gap-0 hover:bg-neutral-300 hover:dark:bg-neutral-800 transition-all duration-300 ease-in-out w-full p-2 rounded-md"
                  )}
                >
                  <h1 className="text-sm font-bold flex items-center gap-2">
                    <span>
                      <FontAwesomeIcon
                        icon={item.faIconUrl}
                        width={15}
                        height={15}
                      />
                    </span>
                    <span>{item.title}</span>
                  </h1>
                  <p className="opacity-60">{item.description}</p>
                </ButtonLink>
              ))}
            </AnimatedDiv>
          )}
        </AnimatePresence>
      </AnimatedLi>
    );
  }
);

HeaderDropdownLink.displayName = "HeaderDropdownLink";

export default HeaderDropdownLink;

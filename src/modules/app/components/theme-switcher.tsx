"use client";

import React from "react";
import { cn } from "@/utils";
import Icon from "@/components/helpers/Icon";
import useEffectMount from "@/hooks/useEffectMount";
import { MotionDiv } from "@/components/helpers/Motion";
import { Theme, useTheme } from "@/providers/theme-provider";
import { type ButtonProps } from "@/components/shared/ui/Button";

const themeIcons = {
  dark: "moon",
  light: "sun",
} as const;

interface ThemeSwitcherProps extends ButtonProps {
  readonly useIcon?: boolean;
  readonly wrapperClassName?: string;
}

const ThemeSwitcher = React.forwardRef<HTMLButtonElement, ThemeSwitcherProps>(
  ({ className, wrapperClassName, useIcon = true, ...props }, ref) => {
    // useMount is used to prevent the theme switcher from being rendered on the server
    const isMounted = useEffectMount();

    // useTheme is used to get the current theme and set the theme
    const { resolvedTheme, theme, setTheme } = useTheme();
    console.log(resolvedTheme);

    // newTheme is used to get the new theme found in local storage
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";

    // icon is used to get the icon for the theme
    const icon = themeIcons[newTheme];

    // handleThemeChange is used to change the theme
    const handleThemeChange = React.useCallback(() => {
      setTheme(newTheme);
    }, [setTheme, newTheme]);

    // if the theme switcher is not mounted, return skeleton loader
    if (!isMounted)
      return (
        <div
          className={cn(
            "rounded-full p-2 bg-neutral-200 dark:bg-neutral-800 w-[30px] h-[30px] flex items-center justify-center animate-pulse",
            wrapperClassName
          )}
        >
          <div
            className={cn(
              "w-5 h-5 rounded-full bg-neutral-300 dark:bg-neutral-700",
              className
            )}
          />
        </div>
      );

    if (useIcon) {
      return (
        <MotionDiv
          onClick={handleThemeChange}
          className={cn(
            "rounded-full p-2 bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 cursor-pointer dark:bg-neutral-700 dark:hover:bg-neutral-800 dark:active:bg-neutral-900 max-w-[30px] max-h-[30px] min-w-[30px] min-h-[30px] flex items-center justify-center transition-colors ease-linear",
            wrapperClassName
          )}
        >
          <Icon
            faIcon={icon}
            width={25}
            height={25}
            className={cn("text-neutral-900 dark:text-neutral-100 transition-colors ease-linear", className)}
          />
        </MotionDiv>
      );
    }

    return (
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="bg-neutral-200 dark:bg-neutral-700 px-4 py-2 rounded-md transition-all duration-500 ease-in-out"
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    );
  }
);

ThemeSwitcher.displayName = "ThemeSwitcher";

export default ThemeSwitcher;

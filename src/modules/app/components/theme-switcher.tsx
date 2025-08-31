"use client";

import { FC, useCallback } from "react";
import { cn } from "@/utils/classNames";
import { useTheme } from "next-themes";
import { blurVariant } from "@/lib/motion/utils";
import useEffectMount from "@/hooks/useEffectMount";
import { LucideProps, Moon, Sun } from "lucide-react";
// import { MotionDiv } from "@/components/helpers/basic-lazy-motion";

const themeIcons = {
  dark: (props: LucideProps) => <Moon />,
  light: (props: LucideProps) => <Sun />,
} as const;

interface ThemeSwitcherProps extends LucideProps {
  readonly useIcon?: boolean;
  readonly wrapperClassName?: string;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  className,
  wrapperClassName,
  useIcon = true,
  ...props
}) => {
  // useMount is used to prevent the theme switcher from being rendered on the server
  const isMounted = useEffectMount();

  // useTheme is used to get the current theme and set the theme
  const { theme, setTheme } = useTheme();

  // newTheme is used to get the new theme found in local storage
  const newTheme = theme === "dark" ? "light" : "dark";

  // icon is used to get the icon for the new theme
  const icon = themeIcons[newTheme](props);

  // handleThemeChange is used to change the theme
  const handleThemeChange = useCallback(() => {
    setTheme(newTheme);
  }, [setTheme, newTheme]);

  // if the theme switcher is not mounted, return skeleton loader
  if (!isMounted)
    return (
      <div
        className={cn(
          "rounded-full p-2 bg-indigo-200 dark:bg-neutral-800 max-w-[30px] max-h-[30px] min-w-[30px] min-h-[30px] flex items-center justify-center animate-pulse",
          wrapperClassName
        )}
      >
        <div
          className={cn(
            "w-5 h-5 rounded-full bg-indigo-300 dark:bg-neutral-700",
            className
          )}
        />
      </div>
    );

  if (useIcon) {
    return (
      <div
        {...blurVariant(0.1)}
        onClick={handleThemeChange}
        className={cn(
          "rounded-full p-2 bg-indigo-200 hover:bg-indigo-300 active:bg-neutral-300 cursor-pointer dark:bg-neutral-700 dark:hover:bg-neutral-800 dark:active:bg-neutral-900 max-w-[30px] max-h-[30px] min-w-[30px] min-h-[30px] flex items-center justify-center transition-colors ease-linear",
          wrapperClassName
        )}
      >
        {icon}
      </div>
    );
  }

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="bg-neutral-200 dark:bg-neutral-700 px-4 py-2 rounded-md transition-all duration-500 ease-in-out"
    >
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
};

ThemeSwitcher.displayName = "ThemeSwitcher";

export default ThemeSwitcher;

"use client";

import { cn } from "@/utils/classNames";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type ThemeSwitcherProps = {
  className?: string;
};

/**
 * Both icons are rendered and CSS shows the right one for the active theme,
 * so the button needs no mount check and never flashes or mismatches during
 * hydration.
 */
const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className={cn(
        "grid size-9 cursor-pointer place-items-center rounded-full text-neutral-700 transition-colors outline-none hover:bg-neutral-200 focus-visible:ring-[3px] focus-visible:ring-ring/50 active:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-900",
        className,
      )}
    >
      <Moon aria-hidden className="size-4 dark:hidden" />
      <Sun aria-hidden className="hidden size-4 dark:block" />
    </button>
  );
};

export default ThemeSwitcher;

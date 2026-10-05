"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { useLiquidLens } from "./use-liquid-lens";

// Floats in the bottom-right corner on every section. Liquid glass that
// follows the theme, so it stays legible over light and dark content.
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { lensProps, lensFilter } = useLiquidLens(buttonRef, {
    bezel: 12,
    scale: 24,
  });

  return (
    <>
      <button
        ref={buttonRef}
        {...lensProps}
        type="button"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        aria-label="Toggle dark mode"
        className="glass liquid liquid-day hero-in fixed right-[calc(var(--gutter)+0.75rem+env(safe-area-inset-right))] bottom-[calc(var(--gutter)+0.75rem+env(safe-area-inset-bottom))] z-50 grid size-12 place-items-center rounded-full text-ink transition-transform duration-150 ease-[var(--ease-out)] active:scale-95"
        style={{ ...lensProps.style, "--d": "400ms" } as React.CSSProperties}
      >
        {/* Both icons render; CSS shows the right one, so the server markup
          matches before the theme is known. */}
        <Sun aria-hidden="true" className="hidden size-5 dark:block" />
        <Moon aria-hidden="true" className="size-5 dark:hidden" />
      </button>
      {lensFilter}
    </>
  );
}

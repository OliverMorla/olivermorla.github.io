"use client";

import { cn } from "@/utils/classNames";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { links } from "../_lib/content";
import MobileMenu, { type MenuOrigin } from "./mobile-menu";
import { useLiquidLens } from "./use-liquid-lens";

// Root-relative, so they work from /portfolio too; on the home page they're
// plain in-page jumps.
const sections = [
  { label: "Work", href: links.portfolio },
  { label: "Services", href: "/#services" },
  { label: "Experience", href: "/#experience" },
  { label: "Process", href: "/#process" },
];

// The nav's vertical centre, in px from the top of the viewport.
const PROBE = 44;

// The menu sheet grows out of the menu button, far enough to cover every
// corner of the screen.
function originOf(button: HTMLElement | null): MenuOrigin | null {
  const box = button?.getBoundingClientRect();
  if (!box?.width) return null;
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  const r = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  return { x, y, r };
}

/**
 * A floating liquid-glass pill, sized to its links. It reads light-on-glass
 * over dark panels and dark-on-frost over light ones, so it never needs a
 * solid bar. Panels marked data-night="dark" (the hero) only count as dark
 * in dark mode. On small screens it's a menu button and "Book a call"; the
 * button opens a full-screen menu and turns into its close button.
 */
export default function Nav() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [onNight, setOnNight] = useState(true);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { lensProps, lensFilter } = useLiquidLens(navRef);
  const [menuOpen, setMenuOpen] = useState(false);
  const [origin, setOrigin] = useState<MenuOrigin>({ x: 0, y: 0, r: 0 });

  // Measured ahead of time (and again as a press starts) so the circle's
  // centre never slides when the menu opens.
  const measureOrigin = () => {
    const origin = originOf(menuButtonRef.current);
    if (origin) setOrigin(origin);
  };

  useEffect(() => {
    const measure = () => {
      const origin = originOf(menuButtonRef.current);
      if (origin) setOrigin(origin);
    };
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // While the menu is open: no page scroll, nothing behind it focusable,
  // Escape closes it, and it closes itself if the screen widens past it.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const behind = document.querySelectorAll("main, footer");
    const wide = window.matchMedia("(min-width: 768px)");
    const close = () => setMenuOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const button = menuButtonRef.current;

    root.style.overflow = "hidden";
    root.dataset.menuOpen = "";
    behind.forEach((el) => el.setAttribute("inert", ""));
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", close);
    return () => {
      root.style.overflow = "";
      delete root.dataset.menuOpen;
      behind.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", close);
      button?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  useEffect(() => {
    const dark = resolvedTheme === "dark";
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-night]"),
    ).filter((panel) => panel.dataset.night !== "dark" || dark);
    const check = () => {
      setOnNight(
        panels.some((panel) => {
          const { top, bottom } = panel.getBoundingClientRect();
          return top <= PROBE && bottom >= PROBE;
        }),
      );
    };
    const frame = requestAnimationFrame(check);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [resolvedTheme]);

  // Over the open menu the pill sits on the page colour, not a dark panel.
  const night = onNight && !menuOpen;
  const quiet = night
    ? "text-ice-soft hover:text-paper"
    : "text-ink/75 hover:text-ink";

  return (
    <>
      <header
        className="hero-in pointer-events-none fixed inset-x-0 top-[calc(var(--gutter)+0.75rem)] z-50 flex justify-center px-[calc(var(--gutter)+0.75rem)]"
        style={{ "--d": "250ms" } as React.CSSProperties}
      >
        <nav
          ref={navRef}
          aria-label="Primary"
          {...lensProps}
          className={cn(
            "glass liquid pointer-events-auto flex h-14 items-center gap-1 rounded-full px-2 transition-[background-color,box-shadow,color] duration-300 ease-[ease]",
            night ? "liquid-night on-night text-paper" : "liquid-day text-ink",
          )}
        >
          <button
            ref={menuButtonRef}
            type="button"
            onPointerDown={measureOrigin}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={cn(
              "grid size-10 place-items-center rounded-full transition-colors duration-150 ease-[ease] md:hidden",
              night ? "hover:bg-white/10" : "hover:bg-ink/5",
            )}
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            {/* Two bars that cross into an X. */}
            <span
              aria-hidden="true"
              className="relative block h-3 w-[1.125rem]"
            >
              <span
                className={cn(
                  "absolute top-0 left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-[var(--ease-out)]",
                  menuOpen && "translate-y-[5.25px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-[var(--ease-out)]",
                  menuOpen && "-translate-y-[5.25px] -rotate-45",
                )}
              />
            </span>
          </button>

          <ul className="flex items-center">
            {sections.map((section) => (
              <li key={section.href} className="hidden md:block">
                <a
                  href={section.href}
                  aria-current={pathname === section.href ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-[0.9375rem] transition-colors duration-150 ease-[ease]",
                    quiet,
                    night
                      ? "aria-[current=page]:text-paper"
                      : "aria-[current=page]:text-ink",
                  )}
                >
                  {section.label}
                </a>
              </li>
            ))}
            <li className="hidden md:block">
              <a
                href={links.resume}
                className={cn(
                  "rounded-full px-3 py-2 text-[0.9375rem] transition-colors duration-150 ease-[ease]",
                  quiet,
                )}
              >
                Résumé
              </a>
            </li>
          </ul>

          <a
            href={links.schedule}
            className={cn(
              "btn h-10 px-4 text-[0.875rem]",
              night
                ? "bg-paper text-night hover:bg-ice"
                : "bg-ink text-page hover:opacity-85",
            )}
          >
            Book a call
          </a>
        </nav>
        {lensFilter}
      </header>
      <MobileMenu
        open={menuOpen}
        origin={origin}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

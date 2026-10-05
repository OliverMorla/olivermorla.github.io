"use client";

import { cn } from "@/utils/classNames";
import { useEffect, useState } from "react";
import { links } from "../_lib/content";

const sections = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200 ease-[ease]",
        scrolled
          ? "border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="wrap flex h-16 items-center justify-between gap-6"
      >
        <a
          href="#top"
          className="text-[1.0625rem] font-[620] tracking-[-0.03em] [font-stretch:115%]"
        >
          Oliver Morla
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((section) => (
            <li key={section.href}>
              <a
                href={section.href}
                className="rounded-full px-3.5 py-2 text-[0.9375rem] text-ink-soft transition-colors duration-150 ease-[ease] hover:text-ink"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={links.schedule}
          className="btn h-10 bg-ink px-4 text-[0.875rem] text-canvas hover:bg-ink-soft"
        >
          Book a call
        </a>
      </nav>
    </header>
  );
}

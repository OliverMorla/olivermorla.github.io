"use client";

import { Menu } from "lucide-react";
import { useRef } from "react";
import { links } from "../_lib/content";

const sections = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Clients", href: "#clients" },
];

/**
 * A smoked-glass pill that floats inside the hero card's inset and stays
 * pinned as the page scrolls. On small screens the links move into a
 * native popover menu.
 */
export default function Nav() {
  const menu = useRef<HTMLDivElement>(null);

  return (
    <header
      className="rise pointer-events-none fixed inset-x-0 top-[calc(var(--gutter)+0.75rem)] z-50 px-[calc(var(--gutter)+0.75rem)]"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <nav
        aria-label="Primary"
        className="glass pointer-events-auto relative mx-auto flex h-14 w-full max-w-[52rem] items-center justify-between gap-2 rounded-full pr-2 pl-5 text-bone"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[1.0625rem] font-semibold tracking-[-0.03em]"
        >
          <span aria-hidden className="bg-gradient size-2 rounded-full" />
          Oliver Morla
        </a>

        <ul className="hidden items-center md:flex">
          {sections.map((section) => (
            <li key={section.href}>
              <a
                href={section.href}
                className="rounded-full px-3.5 py-2 text-[0.9375rem] text-ash transition-colors duration-150 ease-[ease] hover:text-bone"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={links.schedule}
            className="btn btn-primary h-10 px-4 text-[0.875rem]"
          >
            Book a call
          </a>
          <button
            type="button"
            popoverTarget="site-menu"
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-full text-bone transition-colors duration-150 ease-[ease] hover:bg-white/10 md:hidden"
          >
            <Menu aria-hidden className="size-5" />
          </button>
        </div>

        <div
          ref={menu}
          id="site-menu"
          popover="auto"
          className="menu-sheet glass fixed inset-auto top-[calc(var(--gutter)+4.75rem)] right-[calc(var(--gutter)+0.75rem)] m-0 w-56 rounded-3xl p-2 text-bone"
        >
          <ul className="flex flex-col">
            {sections.map((section) => (
              <li key={section.href}>
                <a
                  href={section.href}
                  onClick={() => menu.current?.hidePopover()}
                  className="block rounded-2xl px-4 py-3 text-[1rem] transition-colors duration-150 ease-[ease] hover:bg-white/[0.08]"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

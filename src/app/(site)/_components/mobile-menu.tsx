"use client";

import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/icons";
import { useEffect, useRef } from "react";
import { links } from "../_lib/content";
import PaperPlane from "./paper-plane";

const items = [
  { label: "Work", href: links.portfolio, hint: "20+ products shipped" },
  { label: "Services", href: "/#services", hint: "Web, mobile, automation" },
  { label: "Experience", href: "/#experience", hint: "7+ years" },
  { label: "Process", href: "/#process", hint: "Kickoff to launch" },
  { label: "Résumé", href: links.resume, hint: "Full history" },
];

const social = [
  { label: "GitHub", href: links.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedInIcon },
  { label: "X", href: links.x, Icon: XIcon },
];

export type MenuOrigin = { x: number; y: number; r: number };

/**
 * The full-screen menu for small screens. It grows as a circle out of the
 * menu button (see `.menu-sheet` in site.css) and its links blur in one
 * after another. The rest of the page is inert while it's open.
 */
export default function MobileMenu({
  open,
  origin,
  onClose,
}: {
  open: boolean;
  origin: MenuOrigin;
  onClose: () => void;
}) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => firstLinkRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-open={open}
      className="menu-sheet fixed inset-0 z-40 flex flex-col overflow-y-auto bg-page px-6 pt-28 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:hidden"
      style={
        {
          "--mx": `${origin.x}px`,
          "--my": `${origin.y}px`,
          "--mr": `${origin.r}px`,
        } as React.CSSProperties
      }
    >
      {/* Bottom padding keeps the last row clear of the floating theme
          toggle, which stays usable over the menu. A low violet glow, the
          hero's accent, rises from the bottom. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_55%_at_50%_115%,rgb(139_92_246/0.24),rgb(139_92_246/0)_65%)]"
      />

      <nav aria-label="Sections" className="relative">
        <ul>
          {items.map((item, i) => (
            <li
              key={item.href}
              className="menu-link border-b border-line"
              style={{ "--i": i } as React.CSSProperties}
            >
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={onClose}
                className="flex items-baseline justify-between gap-4 py-4 outline-offset-4"
              >
                <span className="text-[clamp(2rem,1.2rem+4vw,2.75rem)] leading-none font-semibold tracking-[-0.035em] text-ink">
                  {item.label}
                </span>
                <span className="text-right text-[0.875rem] text-slate">
                  {item.hint}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className="menu-link relative mt-auto pt-10"
        style={{ "--i": items.length } as React.CSSProperties}
      >
        <a
          href={links.schedule}
          className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 text-[1rem] font-semibold text-white shadow-[0_14px_32px_-14px_rgb(129_140_248/0.8)] transition-transform duration-150 active:scale-[0.98]"
        >
          Book a 15-min call
          <PaperPlane />
        </a>

        <div className="mt-6 flex items-center justify-between gap-4 text-[0.9375rem] text-slate">
          <a href={links.email} className="truncate hover:text-ink">
            {links.email.replace("mailto:", "")}
          </a>
          <ul className="flex shrink-0 items-center">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full hover:bg-mist hover:text-ink"
                >
                  <Icon className="size-[1.125rem]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

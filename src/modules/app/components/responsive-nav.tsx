"use client";

import ThemeSwitcher from "@/modules/app/components/theme-switcher";
import { headerPrimaryLinks } from "@/modules/app/lib/constants";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

/**
 * Mobile menu built on the native <dialog>: showModal() gives focus trapping,
 * Escape to close, an inert page behind it and focus restoration for free.
 */
const ResponsiveNav = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        className="grid size-10 place-items-center rounded-full text-neutral-800 transition-colors hover:bg-neutral-200 dark:text-neutral-100 dark:hover:bg-neutral-800"
      >
        <Menu aria-hidden className="size-5" />
      </button>

      <dialog
        id="mobile-nav"
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setIsOpen(false)}
        className="nav-sheet m-0 h-dvh max-h-none w-full max-w-none bg-white p-0 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4">
            <Link
              href="/"
              onClick={close}
              className="text-base font-semibold tracking-tight"
            >
              Oliver Morla
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-6">
            <ul className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
              {headerPrimaryLinks.map((link) => (
                <li key={link.href} className="py-1">
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex flex-col py-3"
                  >
                    <span className="text-lg font-medium">{link.title}</span>
                    {link.description && (
                      <span className="text-muted text-sm">
                        {link.description}
                      </span>
                    )}
                  </Link>
                  {link.dropdownLinks && (
                    <ul className="mb-3 ml-3 border-l border-neutral-200 pl-4 dark:border-neutral-800">
                      {link.dropdownLinks.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            onClick={close}
                            className="text-muted block py-2 text-base hover:text-neutral-900 dark:hover:text-neutral-100"
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-between gap-4 border-t border-neutral-200 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-neutral-800">
            <Link
              href="/schedule"
              onClick={close}
              className="flex-1 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-center font-medium text-white"
            >
              Book a 15-min call
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ResponsiveNav;

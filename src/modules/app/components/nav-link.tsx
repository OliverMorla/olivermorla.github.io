"use client";

import type { NavItem } from "@/modules/app/lib/constants";
import { cn } from "@/utils/classNames";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linkClassName =
  "rounded-md px-2 py-1 text-sm transition-colors outline-none hover:text-indigo-500 focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:hover:text-indigo-300";

/**
 * Desktop navigation item. Dropdowns open on hover and on keyboard focus
 * (focus-within), so they are reachable without a pointer.
 */
const NavLink = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();
  const isActive = item.href !== "/" && pathname === item.href;

  if (!item.dropdownLinks?.length) {
    return (
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(linkClassName, isActive && "font-semibold")}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          linkClassName,
          "flex items-center gap-1",
          isActive && "font-semibold",
        )}
      >
        {item.title}
        <ChevronDown
          aria-hidden
          className="size-3 transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
        />
      </Link>
      <div className="invisible absolute top-full left-1/2 w-60 -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="overflow-hidden rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
          {item.dropdownLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex flex-col gap-0.5 rounded-lg px-3 py-2 outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800"
              >
                <span className="text-sm font-medium">{link.title}</span>
                {link.description && (
                  <span className="text-muted text-xs">{link.description}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavLink;

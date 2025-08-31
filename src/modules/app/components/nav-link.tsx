"use client";

import Link from "next/link";
import { HTMLAttributes } from "react";
import { cn } from "@/utils/classNames";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import ButtonLink from "@/components/ui/button-link";

const NavLink = ({
  href,
  children,
  className,
  dropdownLinks,
  ...props
}: HTMLAttributes<HTMLAnchorElement> & {
  href: string;
  dropdownLinks?: {
    href: string;
    title: string;
    description?: string;
  }[];
}) => {
  const pathname = usePathname();

  const isActive = pathname === href && pathname.length !== 1;

  if (dropdownLinks) {
    return (
      <div className="relative group">
        <Link
          href={href}
          className={cn(
            isActive
              ? "font-black text-indigo-300/75"
              : "font-normal hover:text-indigo-300/75 active:text-indigo-500/75 transition",
            "flex items-center justify-center gap-2",
            className
          )}
          {...props}
        >
          <span className="text-medium group-hover:text-indigo-300/75">
            {children}
          </span>
          {/* <ChevronUp className="w-3 h-3 transition group-hover:rotate-180 group-hover:text-indigo-300/75" /> */}
        </Link>
        <div className="absolute top-full min-w-48 invisible opacity-0 group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-2 transition ease-in-out  rounded-lg overflow-hidden border border-neutral-300/25 dark:border-neutral-700/25">
          {dropdownLinks.map((link) => (
            <ButtonLink
              href={link.href}
              key={link.href}
              className="rounded-none w-full flex flex-col items-start gap-px hover:text-indigo-300/75"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-medium">{link.title}</span>
                <ChevronRight className="w-3 h-3 text-muted" />
              </div>
              <p className="text-xs text-muted">{link.description}</p>
            </ButtonLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        isActive
          ? "font-black text-indigo-300/75"
          : "font-normal hover:text-indigo-300/75 active:text-indigo-500/75 transition",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;

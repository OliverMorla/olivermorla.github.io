"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Analytics" },
  { href: "/dashboard/chat", label: "Chat" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className="flex items-center gap-1 text-sm">
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`relative rounded-md px-2.5 py-1.5 font-medium transition-colors ${
              active ? "text-ink" : "text-ink-2 hover:text-ink"
            }`}
          >
            {/* The pill slides to the new tab, so the switch reads as one
                control changing state rather than two pages. */}
            {active && (
              <motion.span
                layoutId="dashboard-nav-pill"
                transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                className="absolute inset-0 rounded-md bg-surface ring-1 ring-line"
              />
            )}
            <span className="relative">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

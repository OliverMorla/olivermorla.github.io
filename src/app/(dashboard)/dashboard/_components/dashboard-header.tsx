import type { Access } from "@/lib/access";
import Link from "next/link";
import { SignOutButton, ThemeToggle } from "./account-actions";
import DashboardNav from "./dashboard-nav";

type Props = {
  email: string;
  userId: string;
  access: Exclude<Access, "none">;
  /** Full-bleed for the chat, which fills the viewport. */
  wide?: boolean;
};

export default function DashboardHeader({
  email,
  userId,
  access,
  wide,
}: Props) {
  return (
    <header
      className={`flex h-16 shrink-0 items-center justify-between gap-4 border-b border-line ${
        wide ? "px-4 sm:px-5" : ""
      }`}
    >
      <div className="flex items-center gap-5">
        <Link
          href="/"
          aria-label="Oliver Morla, back to the site"
          className="grid size-8 place-items-center rounded-lg bg-ink text-[0.8125rem] font-bold text-page"
        >
          OM
        </Link>
        {/* Friends only have the chat, so a one-item nav would be noise. */}
        {access === "admin" && <DashboardNav />}
      </div>
      <div className="flex items-center gap-2">
        <span className="mr-1 hidden max-w-[16rem] truncate text-sm text-ink-2 md:inline">
          {email}
        </span>
        <ThemeToggle />
        <SignOutButton userId={userId} />
      </div>
    </header>
  );
}

import ButtonLink from "@/components/ui/button-link";
import HeaderShell from "@/modules/app/components/header-shell";
import NavLink from "@/modules/app/components/nav-link";
import ResponsiveNav from "@/modules/app/components/responsive-nav";
import ThemeSwitcher from "@/modules/app/components/theme-switcher";
import { headerPrimaryLinks } from "@/modules/app/lib/constants";
import Link from "next/link";

// The wordmark links home, so the desktop bar doesn't repeat "Home".
const desktopLinks = headerPrimaryLinks.filter((link) => link.href !== "/");

/** Server-rendered header; only the interactive pieces are client islands. */
const Header = () => (
  <HeaderShell>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow dark:focus:bg-neutral-900"
    >
      Skip to content
    </a>
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
      <Link
        href="/"
        className="shrink-0 text-base font-semibold tracking-tight"
        aria-label="Oliver Morla, home"
      >
        Oliver Morla
      </Link>

      <nav aria-label="Primary" className="max-lg:hidden">
        <ul className="flex items-center gap-4">
          {desktopLinks.map((item) => (
            <li key={item.href}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <ThemeSwitcher className="max-lg:hidden" />
        <ButtonLink
          href="/schedule"
          variant="gradient"
          fontSize="sm"
          className="max-lg:hidden"
        >
          Book a call
        </ButtonLink>
        <div className="lg:hidden">
          <ResponsiveNav />
        </div>
      </div>
    </div>
  </HeaderShell>
);

export default Header;

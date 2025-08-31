import Link from "next/link";
import {
  footerPrimaryLinks,
  socialMediaLinks,
  pages,
} from "@/modules/app/lib/constants";
import Image from "next/image";
import ButtonLink from "@/components/ui/button-link";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

const Footer = async () => {
  const currentYear = new Date().getFullYear();
  const navLinks =
    footerPrimaryLinks.find((g) => g.title === "Navigation")?.links ?? [];
  const legalLinks =
    footerPrimaryLinks.find((g) => g.title === "Legal")?.links ?? [];

  return (
    <footer className="relative w-full py-12">
      <div className="absolute inset-0 h-full w-full">
        <div className="absolute inset-0 z-10 h-full w-full bg-gradient-none-inverted" />
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-20 dark:opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            id="footer-pattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M30 0L60 30L30 60L0 30L30 0Z M15 30L30 15L45 30L30 45L15 30Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="relative z-20 container mx-auto rounded-2xl border border-neutral-200 bg-gradient-to-r from-neutral-100 to-neutral-50 px-8 py-16 shadow-lg dark:border-neutral-700 dark:from-neutral-800 dark:to-neutral-900">
        <div className="relative flex flex-col justify-between gap-8 sm:items-center md:flex-row">
          <div className="max-w-4xl space-y-4">
            <h2 className="text-4xl font-bold md:text-5xl">
              Ready to Build{" "}
              <span className="text-gradient-normal">Something</span> Great?
            </h2>
            <p className="text-muted text-lg max-sm:text-base">
              {pages.contact.description}
            </p>
          </div>
          <div className="md:ml-8">
            <ButtonLink href="/schedule" variant="gradient">
              Book a 15-min Call
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="relative z-20 container mx-auto px-6 pt-12">
        <div className="grid grid-cols-[400px_1fr_1fr_1fr] gap-12 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <Image
                width={64}
                height={64}
                alt="profile-photo"
                src={"/assets/media/portrait_1.webp"}
                className="w-full max-w-24 object-cover aspect-square object-top border border-neutral-300/75 rounded-xl dark:border-neutral-700/75"
              />
              <div>
                <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Oliver Morla
                </h1>
                <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 text-balance">
                  Full‑stack developer building fast, scalable apps with modern
                  tooling.
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              I design, build, and ship production‑ready software—React/Next.js
              on the front, Node on the back, and clean, maintainable code
              throughout.
            </p>
            <div className="flex items-center gap-12">
              {socialMediaLinks.map((social, index) => (
                <Link
                  key={index}
                  target="_blank"
                  href={social.href}
                  aria-label={social.title}
                  className="text-neutral-600 transition-colors hover:text-neutral-800 active:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-200 dark:active:text-neutral-50"
                >
                  <Icon
                    className="text-lg"
                    icon={social.iconUrl}
                    aria-label={social.title}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Quick Links
            </h2>
            <ul className="space-y-4">
              {navLinks.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Contact Me
            </h2>
            <ul className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex items-center gap-2">
                olivermorla3@gmail.com
              </li>
              <li className="flex items-center gap-2">
                New York, New York, USA
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Service Areas
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Based in New York. Working remotely with clients across the US and
              worldwide.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-neutral-300/75 pt-8 text-center sm:flex-row dark:border-neutral-700/75">
          <div className="flex flex-col gap-2">
            <p className="text-muted-normal text-sm">
              © {currentYear} Oliver Morla. All rights reserved.
            </p>
            <p className="text-muted text-center text-xs">
              Website designed and developed by{" "}
              <Link
                href="/#contact"
                className="text-neutral-600 transition-colors hover:text-neutral-800 active:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-200 dark:active:text-neutral-50"
              >
                Oliver Morla
              </Link>
            </p>
          </div>
          <div className="flex gap-6">
            {legalLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-neutral-600 transition-colors hover:text-neutral-800 active:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-200 dark:active:text-neutral-50"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

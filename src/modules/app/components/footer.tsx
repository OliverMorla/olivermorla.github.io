import ButtonLink from "@/components/ui/button-link";
import { socialIcons } from "@/components/ui/icons";
import {
  contactEmail,
  footerLinks,
  pages,
  socialMediaLinks,
} from "@/modules/app/lib/constants";
import Image from "next/image";
import Link from "next/link";

const mutedLink =
  "text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100";

const Footer = () => (
  <footer className="relative w-full overflow-hidden px-4 py-12 sm:px-8">
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full text-neutral-400 opacity-20 dark:opacity-5"
    >
      <pattern
        id="footer-pattern"
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

    <div className="relative container mx-auto flex flex-col gap-12">
      <div className="flex flex-col justify-between gap-8 rounded-2xl border border-neutral-200 bg-gradient-to-r from-neutral-100 to-neutral-50 p-6 shadow-lg sm:p-10 md:flex-row md:items-center lg:p-16 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Ready to build something great?
          </h2>
          <p className="text-muted text-base sm:text-lg">
            {pages.contact.description}
          </p>
        </div>
        <ButtonLink
          href="/schedule"
          variant="gradient"
          padding="lg"
          className="w-full shrink-0 sm:w-fit"
        >
          Book a 15-min call
        </ButtonLink>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_1fr_1fr_1fr] lg:gap-12">
        <div className="space-y-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start gap-4">
            <Image
              width={80}
              height={80}
              sizes="80px"
              alt=""
              src="/assets/media/portrait_1.webp"
              className="aspect-square size-20 shrink-0 rounded-xl border border-neutral-300 object-cover object-top dark:border-neutral-700"
            />
            <div>
              <p className="text-xl font-bold">Oliver Morla</p>
              <p className="text-sm leading-relaxed text-pretty text-neutral-600 dark:text-neutral-400">
                Full-stack developer building fast, scalable apps with modern
                tooling.
              </p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            I design, build, and ship production-ready software—React/Next.js on
            the front, Node on the back, and clean, maintainable code
            throughout.
          </p>
          <ul className="flex items-center gap-2">
            {socialMediaLinks.map((social) => {
              const Icon = socialIcons[social.icon];
              const isExternal = social.href.startsWith("http");
              return (
                <li key={social.href}>
                  <a
                    href={social.href}
                    aria-label={social.title}
                    {...(isExternal && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className={`grid size-10 place-items-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 ${mutedLink}`}
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer" className="space-y-3">
          <h2 className="font-semibold">Quick links</h2>
          <ul className="space-y-3 text-sm">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={mutedLink}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h2 className="font-semibold">Contact</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${contactEmail}`} className={mutedLink}>
                {contactEmail}
              </a>
            </li>
            <li className="text-neutral-600 dark:text-neutral-400">
              New York, NY, USA
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold">Service areas</h2>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Based in New York. Working remotely with clients across the US and
            worldwide.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 border-t border-neutral-300 pt-8 text-center text-sm text-neutral-600 sm:flex-row sm:text-left dark:border-neutral-800 dark:text-neutral-400">
        <p>© {new Date().getFullYear()} Oliver Morla. All rights reserved.</p>
        <p>Designed and developed by Oliver Morla.</p>
      </div>
    </div>
  </footer>
);

export default Footer;

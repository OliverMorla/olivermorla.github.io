import { links } from "../_lib/content";

const footerLinks = [
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
  { label: "X", href: links.x },
  { label: "Email", href: links.email },
  { label: "Resume", href: links.resume },
];

export default function Footer() {
  return (
    <footer className="wrap flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between md:py-12">
      <div>
        <p className="text-[1.0625rem] font-[620] tracking-[-0.03em] [font-stretch:115%]">
          Oliver Morla
        </p>
        <p className="mt-1 text-[0.875rem] text-slate">
          Senior full-stack developer in Queens, New York.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:items-end">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
          {footerLinks.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="text-ink-soft transition-colors duration-150 ease-[ease] hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="text-[0.8125rem] text-slate">
          &copy; {new Date().getFullYear()} Oliver Morla
        </p>
      </div>
    </footer>
  );
}

import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/icons";
import { links } from "../_lib/content";

const social = [
  { label: "GitHub", href: links.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedInIcon },
  { label: "X", href: links.x, Icon: XIcon },
];

export default function Footer() {
  return (
    <footer className="wrap flex flex-col gap-6 pt-8 pb-10 text-[0.9375rem] text-slate sm:flex-row sm:items-center sm:justify-between">
      <p>&copy; {new Date().getFullYear()} Oliver Morla, New York</p>

      <div className="flex items-center gap-6">
        <a href={links.resume} className="hover:text-ink">
          Résumé
        </a>
        <ul className="flex items-center gap-1">
          {social.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full transition-colors duration-150 hover:bg-mist hover:text-ink"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

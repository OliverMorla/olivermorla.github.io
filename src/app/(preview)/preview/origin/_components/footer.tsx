import { links } from "../_lib/content";

const social = [
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
  { label: "X", href: links.x },
  { label: "Email", href: links.email },
  { label: "Resume", href: links.resume },
];

export default function Footer() {
  return (
    <footer className="on-light bg-paper text-ink">
      <div className="wrap flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between md:py-14">
        <div>
          <p className="flex items-center gap-2.5 text-[1.0625rem] font-semibold tracking-[-0.03em]">
            <span aria-hidden className="bg-gradient size-2 rounded-full" />
            Oliver Morla
          </p>
          <p className="mt-2 text-[0.9375rem] text-slate">
            Senior full-stack developer in Queens, New York. Founder of{" "}
            <a
              href={links.studio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-ink/20 underline-offset-4 transition-colors duration-150 ease-[ease] hover:decoration-ink"
            >
              Appify Visions
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[0.9375rem] text-slate transition-colors duration-150 ease-[ease] hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[0.875rem] text-slate">&copy; 2026 Oliver Morla</p>
        </div>
      </div>
    </footer>
  );
}

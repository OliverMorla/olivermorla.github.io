import Link from "next/link";
import { socialMediaLinks } from "@/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeSwitcher from "@/modules/app/components/theme-switcher";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral-100 dark:bg-[var(--color-tertiary-darker)] dark:text-[var(--color-text-primary)] text-[var(--color-tertiary)]">
      <section className="container mx-auto flex flex-col items-center text-center">
        <div className="flex flex-col items-center justify-center gap-6 border-b-neutral-200 dark:border-b-neutral-800 border-b-[1px] p-8 max-sm:p-4">
          <div className="flex flex-col max-w-lg">
            <h1 className="font-bold text-xl">Oliver Morla</h1>
            <p className="opacity-60">
              I&#39;m always looking for opportunities to collaborate, share
              knowledge, and explore new challenges in the data engineering
              field. Whether you&#39;re interested in discussing a potential
              project, sharing insights, or simply connecting to exchange ideas,
              I&#39;d love to hear from you.
            </p>
          </div>
          <ul className="list-none flex items-center gap-6">
            {socialMediaLinks.map((item, index) => (
              <Link href={item.href} key={index}>
                <FontAwesomeIcon
                  icon={item.iconUrl}
                  className="hover:text-[var(--color-primary)] active:text-[var(--color-primary-dark)] transition-all duration-300 ease-in-out cursor-pointer"
                />
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 p-8 max-sm:p-4">
          <h1 className="text-sm opacity-60">
            © {currentYear} Oliver Morla. All rights reserved.
          </h1>
          <ThemeSwitcher />
        </div>
      </section>
    </footer>
  );
};

export default Footer;

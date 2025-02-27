import Link from "next/link";
import { socialMediaLinks } from "@/constants";
import ThemeSwitcher from "@/modules/app/components/dynamic/theme-switcher";
import FontAwesomeIcon from "@/modules/app/components/dynamic/font-awesome-icon";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900">
      <section className="container mx-auto flex flex-col items-center text-center">
        <div className="flex flex-col items-center justify-center gap-6 border-b-neutral-200 dark:border-b-neutral-800 border-b-[1px] p-8 max-sm:p-4">
          <div className="flex flex-col max-w-lg">
            <h1 className="font-bold text-xl">Oliver Morla</h1>
            <p className="opacity-70">
              I&#39;m always looking for opportunities to collaborate, share
              knowledge, and explore new challenges in the software development
              field. Whether you&#39;re interested in discussing a potential
              project, sharing insights, or simply connecting to exchange ideas,
              I&#39;d love to hear from you.
            </p>
          </div>
          <ul className="list-none flex items-center gap-6">
            {socialMediaLinks.map((item, index) => (
              <li
                key={index}
                aria-label={item.title}
                className="hover:text-blue-300 active:text-blue-600 transition-colors ease-in cursor-pointer"
              >
                <Link href={item.href} aria-label={item.title}>
                  <FontAwesomeIcon
                    icon={item.iconUrl}
                    aria-label={item.title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 p-8 max-sm:p-4">
          <h1 className="text-sm opacity-70">
            © {currentYear} Oliver Morla. All rights reserved.
          </h1>
          <ThemeSwitcher />
        </div>
      </section>
    </footer>
  );
};

export default Footer;

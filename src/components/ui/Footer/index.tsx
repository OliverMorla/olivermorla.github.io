/* eslint-disable react/no-unescaped-entities */

import { footerPrimaryLinks, socialLinks } from "@/constants";

import SocialMediaButton from "@/components/ui/Button/SocialMedia";
import NavLink from "@/components/ui/Footer/NavLink";
import QuestionForm from "@/components/ui/Footer/QuestionForm";

const Footer = () => {
  return (
    <footer className="bg-[--color-eerie-black] px-24 flex flex-col text-white ">
      <div className="py-10">
        <h1>Let's Connect Here</h1>
      </div>

      <div className="flex justify-between flex-wrap border-y-[--color-electric-purple] border-y-[1px] py-10 max-lg:gap-4">
        <div className="flex flex-col max-w-[600px]">
          <h4 className="font-bold text-xl">Oliver Morla</h4>
          <p className="font-light opacity-80">
            I'm always looking for opportunities to collaborate, share
            knowledge, and explore new challenges in the data engineering field.
            Whether you're interested in discussing a potential project, sharing
            insights, or simply connecting to exchange ideas, I'd love to hear
            from you.
          </p>
          <div className="flex">
            {socialLinks.map((item, index) => (
              <SocialMediaButton
                key={index}
                title={item.title}
                pathUrl={item.pathUrl}
                iconUrl={item.iconUrl}
                transitionDelay={index * 0.1 + 0.3}
              />
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-xl">Quick Links</h4>
          <div className="font-light opacity-80">
            <ul className="flex flex-col">
              {footerPrimaryLinks.map((item, index) => (
                <NavLink
                  key={index}
                  title={item.title}
                  pathUrl={item.pathUrl}
                  transitionDelay={index * 0.1 + 0.3}
                />
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-xl">Contact</h4>
          <address className="font-light opacity-80 flex flex-col">
            <span>olivermorla3@gmail.com</span>
            <span>3473020492</span>
            <span>New York, United States</span>
          </address>
        </div>

        <div>
          <h4 className="font-bold text-xl">Have Any Questions?</h4>
          <QuestionForm />
        </div>
      </div>

      <div className="flex justify-center py-10">
        <h4>© 2024 Oliver Morla. All rights reserved.</h4>
      </div>
    </footer>
  );
};

export default Footer;

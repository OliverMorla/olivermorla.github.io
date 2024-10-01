/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/shared/ui/Button";
import ButtonLink from "@/components/shared/ui/ButtonLink";

const AboutSection = () => {
  return (
    <section
      className="h-auto bg-[--color-dark-gray] text-[--text-color] flex justify-evenly py-[88px] px-10 flex-wrap max-sm:items-center max-sm:flex-col max-lg:gap-10"
      id="about"
    >
      <div className="flex max-sm:flex-col max-sm:items-center">
        <h1
          className="uppercase font-bold text-7xl text-white rotate-180 w-fit text-end max-sm:hidden bg-[--color-eerie-black] p-2"
          style={{
            writingMode: "vertical-rl",
          }}
        >
          About
        </h1>
        <h1 className="uppercase font-bold text-7xl text-[--text-color] sm:hidden text-center">
          About
        </h1>
        <div className="bg-white h-28 w-[1px] max-sm:hidden"></div>
        <div className="bg-white h-[1px] w-28 sm:hidden"></div>
        <div className="max-w-xl flex flex-col gap-10">
          <Image
            src={"/assets/images/portrait/2.webp"}
            width={450}
            height={450}
            className="w-[450px] h-[450px] max-sm:object-cover"
            alt="self-portrait-2"
          />

          <div className="max-w-xl flex flex-col gap-1">
            <h1 className="uppercase font-bold text-5xl text-[--text-color] tracking-tight max-sm:text-2xl">
              Summary
            </h1>
            <div className="bg-white h-[1px] w-28"></div>
            <p>
              Hello! I'm Oliver M. Morla Maldonado, a passionate Full Stack
              Developer based in Long Island City, NY. Welcome to my portfolio,
              where innovation meets precision in the realm of web development.
              Graduating with a Bachelor of Technology in Computer Systems
              Technology from New York City College of Technology (NYCCT), my
              academic journey laid the foundation for my technical expertise
              and problem-solving skills.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 justify-between">
        <div className="max-w-xl flex flex-col gap-1">
          <h1 className="uppercase font-bold text-5xl text-[--text-color] tracking-tight max-sm:text-2xl">
            Work Experience
          </h1>
          <div className="bg-white h-[1px] w-28"></div>
          <p>
            Throughout my career at dynamic companies like Gambit Dev LLC and
            New Yorkers International, I've played key roles in driving
            technology adoption, optimizing application performance, and
            enhancing user engagement through strategic development initiatives.
            My work spans across various aspects of web development, from
            front-end to back-end, and includes significant contributions to
            database management and cloud services.
          </p>
        </div>

        <div className="max-w-xl flex flex-col gap-1">
          <h1 className="uppercase font-bold text-5xl text-[--text-color] tracking-tight max-sm:text-2xl">
            Technical Toolkit
          </h1>
          <div className="bg-white h-[1px] w-28"></div>
          <p>
            My technical proficiency encompasses a wide range of languages,
            libraries, frameworks, and tools. With expertise in C/C++, C#, Java,
            Python, JavaScript (ES6+), TypeScript, ReactJS, NextJS, Django,
            Spring Boot, MongoDB, PostgreSQL, AWS, and more, I am equipped to
            tackle complex development challenges across the full stack.
          </p>
        </div>

        <div className="max-w-xl flex flex-col items-start gap-1">
          <h1 className="uppercase font-bold text-5xl text-[--text-color] tracking-tight max-sm:text-2xl">
            Let's Connect
          </h1>
          <div className="bg-white h-[1px] w-28"></div>
          <p>
            I'm excited to explore how we can collaborate on your next project.
            With a passion for technology and a track record of success, I'm
            ready to bring your vision to life with the same dedication and
            precision that have marked my career to date.
          </p>
          <ButtonLink href={"#contact"} faPresetIcon="paperPlane">
            Contact me
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

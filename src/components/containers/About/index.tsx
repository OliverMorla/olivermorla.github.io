import Image from "next/image";
import ButtonLink from "@/components/shared/ui/ButtonLink";

const AboutSection = () => {
  return (
    <section
      className="h-auto flex justify-evenly max-lg:items-center py-24 px-8 max-sm:px-4 max-lg:flex-col max-lg:gap-12"
      id="about"
    >
      <div className="flex max-lg:flex-col max-lg:items-center lg:gap-6">
        <h1
          className="uppercase font-bold text-6xl rotate-180 w-fit text-end max-lg:hidden bg-neutral-200 dark:bg-[var(--color-overlay)] p-4 max-sm:p-2"
          style={{
            writingMode: "vertical-rl",
          }}
        >
          About
        </h1>
        <h1 className="relative uppercase font-bold text-6xl tracking-tight w-fit lg:hidden">
          <span className="relative z-20 lg:hidden">About</span>
          <span className="lg:hidden absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-blue-500 to-purple-500 -skew-x-12"></span>
        </h1>
        <div className="max-w-xl w-full flex flex-col gap-6">
          <Image
            src={"/assets/images/portrait/2.webp"}
            width={600}
            height={600}
            className="w-full"
            alt="self-portrait-2"
          />

          <div className="flex flex-col gap-1">
            <h1 className="relative uppercase font-bold text-6xl tracking-tight w-fit">
              <span className="relative z-20">Summary</span>
              <span className="absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-blue-500 to-purple-500 -skew-x-12"></span>
            </h1>
            <p>
              Hello! I&#39;m Oliver M. Morla Maldonado, a passionate Full Stack
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
        <div className="max-w-xl flex flex-col gap-2">
          <h1 className="relative uppercase font-bold text-6xl tracking-tight w-fit">
            <span className="relative z-20">Experience</span>
            <span className="absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-blue-500 to-purple-500 -skew-x-12"></span>
          </h1>
          <p>
            Throughout my career at dynamic companies like Gambit Dev LLC and
            New Yorkers International, I&#39;ve played key roles in driving
            technology adoption, optimizing application performance, and
            enhancing user engagement through strategic development initiatives.
            My work spans across various aspects of web development, from
            front-end to back-end, and includes significant contributions to
            database management and cloud services.
          </p>
        </div>

        <div className="max-w-xl flex flex-col gap-2">
          <h1 className="relative uppercase font-bold text-6xl tracking-tight w-fit">
            <span className="relative z-20">Proficiency</span>
            <span className="absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-blue-500 to-purple-500 -skew-x-12"></span>
          </h1>
          <p>
            My technical proficiency encompasses a wide range of languages,
            libraries, frameworks, and tools. With expertise in C/C++, C#, Java,
            Python, JavaScript (ES6+), TypeScript, ReactJS, NextJS, Django,
            Spring Boot, MongoDB, PostgreSQL, AWS, and more, I am equipped to
            tackle complex development challenges across the full stack.
          </p>
        </div>

        <div className="max-w-xl flex flex-col items-start gap-2">
          <h1 className="relative uppercase font-bold text-6xl tracking-tight w-fit">
            <span className="relative z-20">Let&#39;s Connect</span>
            <span className="absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-blue-500 to-purple-500 -skew-x-12"></span>
          </h1>
          <p>
            I&#39;m excited to explore how we can collaborate on your next
            project. With a passion for technology and a track record of
            success, I&#39;m ready to bring your vision to life with the same
            dedication and precision that have marked my career to date.
          </p>
          <ButtonLink
            href={"mailto:olivermorla3@gmail.com"}
            faPresetIcon="paperPlane"
            className="mt-2"
          >
            Contact me
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

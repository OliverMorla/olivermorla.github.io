import CTAButtons from "@/modules/app/components/cta-buttons";
import Image from "next/image";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-24 max-sm:py-16 px-8 max-sm:px-4"
    >
      <section className="relative container mx-auto flex flex-col lg:flex-row justify-center gap-12">
        <div className="absolute inset-0 bg-grid-pattern bg-grid-pattern-neutral-600 bg-grid-pattern-lg opacity-50" />
        {/* Left Column */}
        <div className="flex flex-col lg:flex-row gap-6 relative max-w-xl w-full">
          {/* Desktop Vertical Title */}
          <h1
            className="hidden lg:block uppercase font-bold text-4xl xl:text-6xl rotate-180 w-fit text-end bg-neutral-200 dark:bg-neutral-800 p-4 hover:scale-105"
            style={{ writingMode: "vertical-rl" }}
          >
            About
          </h1>

          {/* Mobile Title */}
          <h1 className="lg:hidden relative uppercase font-bold text-3xl sm:text-4xl xl:text-5xl tracking-tight w-fit mb-6">
            <span className="relative z-20">About</span>
            <span className="absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-neutral-300 to-neutral-300 dark:from-neutral-700 dark:to-stone-700 -skew-x-12"></span>
          </h1>

          <div className="flex flex-col gap-6 w-full">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={"/placeholder_3.svg"}
                width={600}
                height={600}
                alt="portrait-no-bg"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="relative uppercase font-bold text-3xl sm:text-4xl tracking-tight w-fit">
                <span className="relative z-20">Summary</span>
                <span className="absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-neutral-300 to-neutral-300 dark:from-neutral-700 dark:to-stone-700 -skew-x-12"></span>
              </h2>
              <p className="leading-relaxed">
                Hello! I&#39;m Oliver M. Morla Maldonado, a passionate Full
                Stack Developer based in Long Island City, NY. Welcome to my
                portfolio, where innovation meets precision in the realm of web
                development. Graduating with a Bachelor of Technology in
                Computer Systems Technology from New York City College of
                Technology (NYCCT), my academic journey laid the foundation for
                my technical expertise and problem-solving skills.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 max-w-xl w-full">
          {/* Experience Section */}
          <div className="flex flex-col gap-4 sm:p-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-300">
            <h2 className="relative uppercase font-bold text-3xl sm:text-4xl tracking-tight w-fit">
              <span className="relative z-20">Experience</span>
              <span className="absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-neutral-300 to-neutral-300 dark:from-neutral-700 dark:to-stone-700 -skew-x-12"></span>
            </h2>
            <p className="leading-relaxed">
              Throughout my career at dynamic companies like Gambit Dev LLC and
              New Yorkers International, I&#39;ve played key roles in driving
              technology adoption, optimizing application performance, and
              enhancing user engagement through strategic development
              initiatives. My work spans across various aspects of web
              development, from front-end to back-end, and includes significant
              contributions to database management and cloud services.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:p-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-300">
            <h2 className="relative uppercase font-bold text-3xl sm:text-4xl tracking-tight w-fit">
              <span className="relative z-20">Proficiency</span>
              <span className="absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-neutral-300 to-neutral-300 dark:from-neutral-700 dark:to-stone-700 -skew-x-12"></span>
            </h2>
            <p className="leading-relaxed">
              My technical proficiency encompasses a wide range of languages,
              libraries, frameworks, and tools. With expertise in C/C++, C#,
              Java, Python, JavaScript (ES6+), TypeScript, ReactJS, NextJS,
              Django, Spring Boot, MongoDB, PostgreSQL, AWS, and more, I am
              equipped to tackle complex development challenges across the full
              stack.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:p-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-300">
            <h2 className="relative uppercase font-bold text-3xl sm:text-4xl tracking-tight w-fit">
              <span className="relative z-20">Let&#39;s Connect</span>
              <span className="absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-neutral-300 to-neutral-300 dark:from-neutral-700 dark:to-stone-700 -skew-x-12"></span>
            </h2>
            <p className="leading-relaxed">
              I&#39;m excited to explore how we can collaborate on your next
              project. With a passion for technology and a track record of
              success, I&#39;m ready to bring your vision to life with the same
              dedication and precision that have marked my career to date.
            </p>
            <CTAButtons />
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;

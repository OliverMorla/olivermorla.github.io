import Image from "next/image";
import { formatDate, getImageUrl } from "@/utils";
import { getProjects } from "@/lib/server/queries";
import SectionTitle from "@/modules/app/components/section-title";
import ButtonLink from "@/components/shared/ui/dynamic/ButtonLink";
import { MotionInViewDiv } from "@/components/helpers/dynamic/Motion";
import Carousel from "@/modules/portfolio/components/dynamic/carousel";

const Portfolio = async () => {
  const projects = await getProjects();

  const doesProjectsExist = !!projects.docs.length;

  if (!doesProjectsExist) return null;

  const featuredProject = projects.docs.find(
    (project) => project.featured === true
  );

  return (
    <section
      className="min-h-screen h-auto flex flex-col gap-12 justify-center items-center p-8 bg-gradient-to-b from-transparent to-neutral-50/5 dark:to-neutral-900"
      id="portfolio"
    >
      <SectionTitle
        title="Portfolio"
        description="Transforming ideas into reality through code. Explore my latest projects and technical achievements."
      />
      <MotionInViewDiv once y={40} delay={0.2} className="container mx-auto">
        <Carousel projects={projects.docs} />
      </MotionInViewDiv>
      <div className="container mx-auto flex flex-col gap-6">
        <MotionInViewDiv once x={-40} delay={0.2} className="flex flex-col">
          <h1 className="text-2xl font-bold">Featured Project</h1>
          <p className="text-neutral-400">
            Here are some of my projects that I&apos;ve worked on.
          </p>
        </MotionInViewDiv>
        <MotionInViewDiv
          once
          x={-40}
          delay={0.2}
          className="backdrop-blur-sm bg-white/5 rounded-lg border border-neutral-200/10 overflow-hidden shadow-lg"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden">
              <Image
                src={getImageUrl(featuredProject?.images?.[0])}
                alt="Project preview"
                width={1000}
                height={1000}
                className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex flex-col justify-between gap-12 p-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <h2 className="text-lg font-bold">
                      {featuredProject?.title}
                    </h2>
                    <span className="px-4 py-1.5 rounded-full bg-neutral-100/10 border border-neutral-200/20 text-sm">
                      {formatDate(featuredProject?.createdAt ?? "")}
                    </span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    {featuredProject?.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Tech Stack</h3>
                  <div className="flex flex-wrap gap-4 text-3xl text-neutral-300">
                    {featuredProject?.stack?.map((tech) => (
                      <p
                        key={tech}
                        className="dark:bg-neutral-800/20 bg-neutral-100/20 dark:border-neutral-700/40 border border-neutral-200/20 px-4 py-1.5 rounded-full text-sm"
                      >
                        {tech}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <ButtonLink
                  href={featuredProject?.link ?? ""}
                  className="flex items-center gap-2"
                >
                  {/* <Icon faIcon="globe" className="text-lg" /> */}
                  Live Demo
                </ButtonLink>
                {/* <ButtonLink
                  href={featuredProject?.link ?? ""}
                  variant="solidLight"
                  className="flex items-center gap-2"
                >
                  <Icon faIcon="github" className="text-lg" />
                  Source Code
                </ButtonLink> */}
              </div>
            </div>
          </div>
        </MotionInViewDiv>
      </div>
    </section>
  );
};

export default Portfolio;

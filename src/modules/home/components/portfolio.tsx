import { MotionInViewDiv } from "@/components/helpers/blur-lazy-motion";
import LazyImage from "@/components/helpers/lazy-image";
import ButtonLink from "@/components/ui/button-link";
import { getImageMediaUrl } from "@/lib/payload/client/utils";
import { getProjects } from "@/lib/payload/server/queries";
import CTAButtons from "@/modules/app/components/cta-buttons";
import SectionTitle from "@/modules/app/components/section-title";
import { pages } from "@/modules/app/lib/constants";
import Carousel from "@/modules/portfolio/components/dynamic/carousel";
import { ArrowRight } from "lucide-react";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
  });
};

const Portfolio = async () => {
  const projects = await getProjects();

  const doesProjectsExist = !!projects.docs.length;

  if (!doesProjectsExist) return null;

  const featuredProject = projects.docs.find(
    (project) => project.featured === true,
  );

  return (
    <section
      id="portfolio"
      className="relative min-h-screen flex flex-col p-8 max-sm:p-4 bg-gradient-none"
    >
      <section className="relative mx-auto container flex flex-col gap-12">
        <SectionTitle
          title={pages.portfolio.title}
          tagline={pages.portfolio.tagline}
          subtitle={pages.portfolio.subtitle}
          description={pages.portfolio.description}
          className="text-end items-end ml-auto"
        />
        <div className="flex justify-end gap-2">
          <ButtonLink href="/portfolio" variant="gradient">View All</ButtonLink>
          <ButtonLink href="/#contact" variant="solidLight">Learn more</ButtonLink>
        </div>
        <MotionInViewDiv>
          <Carousel projects={projects.docs} />
        </MotionInViewDiv>
        <div className="container mx-auto flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Featured</h1>
            <p className="text-neutral-400">
              Built with React/Next.js/AWS & Node—Hardened for Production and
              shipped in 6 weeks.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 backdrop-blur-sm bg-white/5 rounded-lg border border-neutral-200/10 overflow-hidden shadow-lg">
            <div className="relative group overflow-hidden">
              {featuredProject?.images?.[0] && (
                <LazyImage
                  src={getImageMediaUrl(featuredProject.images[0])}
                  alt="Project preview"
                  width={1000}
                  height={1000}
                  className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex flex-col justify-between gap-12 p-8 max-sm:p-4">
              <div className="flex flex-col gap-6">
                <div className="space-y-6">
                  <div className="flex justify-between sm:items-center max-sm:flex-col gap-2">
                    <h2 className="text-lg font-bold">
                      {featuredProject?.title}
                    </h2>
                    <span className="px-4 py-1.5 rounded-md bg-neutral-100/25 border border-neutral-300/75 dark:border-neutral-700/75 text-sm w-fit">
                      {formatDate(featuredProject?.createdAt ?? "")}
                    </span>
                  </div>
                  <p className="text-muted leading-relaxed">
                    {featuredProject?.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Tech Stack</h3>
                  <div className="flex flex-wrap gap-4 text-3xl text-muted">
                    {featuredProject?.stack?.map((tech) => (
                      <p
                        key={tech}
                        className="dark:bg-neutral-800/25 bg-neutral-200/25 border border-neutral-300/75 dark:border-neutral-700/75 px-4 py-1.5 rounded-md text-sm"
                      >
                        {tech}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between max-sm:flex-col gap-4">
                <CTAButtons />
                {featuredProject?.link && (
                  <ButtonLink
                    href={featuredProject.link}
                    className="flex items-center gap-2 max-sm:w-full"
                  >
                    Live Demo
                    <ArrowRight className="max-sm:hidden size-4" />
                  </ButtonLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Portfolio;

import ButtonLink from "@/components/ui/button-link";
import { getMediaImage } from "@/lib/payload/client/utils";
import { getProjects } from "@/lib/payload/server/queries";
import CTAButtons from "@/modules/app/components/cta-buttons";
import SectionTitle from "@/modules/app/components/section-title";
import { pages } from "@/modules/app/lib/constants";
import Carousel from "@/modules/portfolio/components/carousel";
import ProjectCard from "@/modules/portfolio/components/project-card";
import { formatYear } from "@/utils/date";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const RAIL_LIMIT = 12;

const Portfolio = async () => {
  const projects = await getProjects();
  if (!projects.length) return null;

  const featured = projects.find((project) => project.featured);
  const rail = projects.slice(0, RAIL_LIMIT);
  const featuredImage = featured?.images?.[0];
  const featuredYear = formatYear(featured?.startedAt);

  return (
    <section
      id="portfolio"
      className="bg-gradient-none relative flex flex-col px-4 py-24 sm:px-8"
    >
      <div className="relative container mx-auto flex flex-col gap-12">
        <SectionTitle
          title={pages.portfolio.title}
          tagline={pages.portfolio.tagline}
          subtitle={pages.portfolio.subtitle}
          description={pages.portfolio.description}
          className="ml-auto items-end text-end"
        />
        <div className="flex justify-end gap-2">
          <ButtonLink href="/portfolio" variant="gradient">
            View all projects
          </ButtonLink>
          <ButtonLink href="/#contact" variant="solidLight">
            Start a project
          </ButtonLink>
        </div>

        <Carousel label="Recent projects">
          {rail.map((project) => (
            <li
              key={project.id}
              className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <ProjectCard
                project={project}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 85vw"
              />
            </li>
          ))}
        </Carousel>

        {featured && (
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-bold">Featured</h3>
              <p className="text-muted">
                Built with React/Next.js/AWS & Node—hardened for production and
                shipped in 6 weeks.
              </p>
            </div>
            <article className="grid overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg lg:grid-cols-2 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200 lg:aspect-auto lg:min-h-96 dark:bg-neutral-800">
                {featuredImage && (
                  <Image
                    src={getMediaImage(featuredImage).src}
                    alt={`${featured.title ?? "Featured project"} screenshot`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                )}
              </div>

              <div className="flex flex-col justify-between gap-10 p-6 sm:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-xl font-bold">{featured.title}</h4>
                    {featuredYear && (
                      <span className="w-fit rounded-md border border-neutral-300 px-3 py-1 text-sm dark:border-neutral-700">
                        Since {featuredYear}
                      </span>
                    )}
                  </div>
                  {featured.description && (
                    <p className="text-muted leading-relaxed">
                      {featured.description}
                    </p>
                  )}
                  {!!featured.stack?.length && (
                    <div className="flex flex-col gap-2">
                      <h5 className="font-semibold">Tech stack</h5>
                      <ul className="flex flex-wrap gap-2">
                        {featured.stack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md border border-neutral-300 px-3 py-1 text-sm dark:border-neutral-700"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {featured.link && (
                    <ButtonLink
                      href={featured.link}
                      variant="solidDark"
                      className="w-full sm:w-fit"
                    >
                      Live demo
                      <ArrowUpRight aria-hidden className="size-4" />
                    </ButtonLink>
                  )}
                  <CTAButtons className="sm:w-fit" />
                </div>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;

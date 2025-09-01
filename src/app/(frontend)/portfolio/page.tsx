import { MotionSection } from "@/components/helpers/basic-lazy-motion";
import { MotionDiv } from "@/components/helpers/blur-lazy-motion";
import LazyImage from "@/components/helpers/lazy-image";
import ButtonLink from "@/components/ui/button-link";
import { getImageMediaUrl } from "@/lib/payload/client/utils";
import { getProjects } from "@/lib/payload/server/queries";
import CTAButtons from "@/modules/app/components/cta-buttons";
import SectionTitle from "@/modules/app/components/section-title";
import { pages } from "@/modules/app/lib/constants";
import { Project } from "@/payload-types";
import { cn } from "@/utils/classNames";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

export type ProjectCardProps = ComponentProps<"div"> &
  Readonly<{
    project: Project;
  }>;

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  return (
    <div
      className={cn(
        "bg-neutral-50 dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition ease-in-out p-4 flex flex-col gap-6",
        className,
      )}
    >
      {project.images?.[0] && (
        <Image
          src={getImageMediaUrl(project.images[0])}
          alt={project.title ?? "project-image"}
          width={400}
          height={200}
          className="rounded-lg w-full object-cover sm:max-h-52 max-h-72 object-top"
        />
      )}
      <div className="flex justify-between flex-wrap gap-2">
        <p className="text-nowrap text-muted bg-neutral-200/25 dark:bg-neutral-700/25 border border-neutral-300/75 dark:border-neutral-700/75 text-xs px-4 py-1.5 rounded-md">
          {project.status}
        </p>
        <p className="text-nowrap text-muted bg-neutral-200/25 dark:bg-neutral-700/25 border border-neutral-300/75 dark:border-neutral-700/75 text-xs px-4 py-1.5 rounded-md">
          Since —{" "}
          {project.startedAt
            ? new Date(project.startedAt).toLocaleDateString("en-US", {
                year: "numeric",
              })
            : new Date().getFullYear()}
        </p>
      </div>
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="text-muted line-clamp-2">{project.description}</p>
      <ButtonLink
        href={project.link ?? "/"}
        target="_blank"
        variant="gradient"
        className="self-end mt-auto"
      >
        View Project
      </ButtonLink>
    </div>
  );
};

const Portfolio = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
  }>;
}) => {
  const { status } = await searchParams;
  const projects = await getProjects(status);
  // const statuses = await getProjectStatuses();
  return (
    <main className="w-full min-h-screen flex flex-col flex-grow items-center justify-center py-24 px-8 max-sm:px-4 bg-gradient-none">
      <MotionSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto container flex flex-col gap-12"
      >
        <SectionTitle
          title={pages.portfolio.title}
          tagline={pages.portfolio.tagline}
          subtitle={pages.portfolio.subtitle}
          description={pages.portfolio.description}
          className="text-center items-center mx-auto max-w-3xl"
        />
        <div className="flex flex-col items-center gap-4">
          {/* <div className="flex flex-wrap justify-center gap-4">
            <ButtonLink href="/portfolio" className="max-sm:text-sm">
              All
            </ButtonLink>
            {statuses.map((status) => (
              <ButtonLink
                className="max-sm:text-sm"
                key={status}
                href={`/portfolio?status=${status}`}
              >
                {status}
              </ButtonLink>
            ))}
          </div> */}
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full",
            )}
          >
            {projects.docs.map((project, idx) => (
              <MotionDiv
                key={project.id}
                delay={idx * 0.2}
                className="h-full w-full"
              >
                <ProjectCard project={project} className="h-full w-full" />
              </MotionDiv>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col flex-grow gap-6">
          <SectionTitle
            title="Got a project in mind?"
            tagline="Let's talk"
            subtitle="First, pick out a design unless you already have one."
            description="I'm always looking for new projects to work on. If you have a project in mind, please contact me."
            className="text-start items-start mr-auto max-w-3xl"
          />
          <LazyImage
            src="/api/media/file/dribble-example-res.webp"
            alt="dribble-example"
            width={1920}
            height={1080}
            wrapperClassName="sm:min-h-[calc(100vh-200px)]"
            className="rounded-lg w-full h-full object-cover"
          />

          <div className="max-sm:hidden absolute inset-0 flex flex-col items-center justify-center">
            <svg
              className="absolute bottom-0 w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="currentColor"
                className="text-white dark:text-neutral-800"
                fillOpacity="0.9"
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>

            <div className="absolute bottom-0 w-full bg-gradient-to-t from-neutral-50 dark:from-neutral-800 to-transparent pb-8 pt-24">
              <div className="container mx-auto flex flex-col gap-4 items-center px-8 text-center">
                <h2 className="text-3xl max-sm:text-2xl font-bold mb-4">
                  Ready to Turn Your Design into Reality?
                </h2>
                <p className="text-lg opacity-80 mb-8">
                  With 1+ million designs to choose from, I can bring your
                  vision to life.
                </p>
                <CTAButtons />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:hidden relative bottom-0 w-full bg-gradient-to-t from-neutral-50 dark:from-neutral-800 to-transparent pb-8 pt-12">
          <div className="container mx-auto px-8 text-center flex flex-col gap-2">
            <h2 className="text-3xl max-sm:text-2xl font-bold ">
              Ready to Turn Your Design into Reality?
            </h2>
            <p className="text-lg text-muted">
              With 1+ million designs to choose from, I can bring your vision to
              life.
            </p>
            <CTAButtons />
          </div>
        </div>
        <div className="container mx-auto flex flex-col gap-6 px-8 text-center">
          <p className="text-sm opacity-60">List of design sources:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              target="_blank"
              href="https://dribbble.com/"
              className="text-sm opacity-60 bg-neutral-100/20 border border-neutral-200/30  px-4 py-1.5 rounded-md"
            >
              Dribbble
            </Link>
            <Link
              target="_blank"
              href="https://www.behance.net"
              className="text-sm opacity-60 bg-neutral-100/20 border border-neutral-200/30 px-4 py-1.5 rounded-md"
            >
              Behance
            </Link>
            <Link
              target="_blank"
              href="https://www.figma.com/"
              className="text-sm opacity-60 bg-neutral-100/20 border border-neutral-200/30 px-4 py-1.5 rounded-md"
            >
              Figma
            </Link>
            <Link
              target="_blank"
              href="https://www.designspiration.com/"
              className="text-sm opacity-60 bg-neutral-100/20 border border-neutral-200/30 px-4 py-1.5 rounded-md"
            >
              Designspiration
            </Link>
          </div>
          <p className="text-sm opacity-60 max-w-2xl mx-auto">
            Note: I do not own any of the designs listed above. I only use them
            as inspiration for my own designs. You can even use your own designs
            as inspiration for your own project, anything goes!
          </p>
        </div>
      </MotionSection>
    </main>
  );
};

export default Portfolio;

export const revalidate = 14400; // 4 hours

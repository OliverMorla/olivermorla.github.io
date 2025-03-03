import Image from "next/image";
import { getImageUrl } from "@/utils";
import { Project } from "@/payload-types";
import { getProjects } from "@/lib/server/queries";
import SectionTitle from "@/modules/app/components/section-title";
import ButtonLink from "@/components/shared/ui/dynamic/ButtonLink";
import { MotionDiv } from "@/components/helpers/dynamic/Motion";
import Link from "next/link";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 flex flex-col gap-4">
      <Image
        src={getImageUrl(project.images?.[0])}
        alt={project.title ?? "project-image"}
        width={400}
        height={200}
        className="rounded-lg w-full"
      />
      <div className="flex justify-between flex-wrap gap-2">
        <p className="text-nowrapinline-block opacity-60 bg-neutral-100/20 border border-neutral-200/30 text-xs px-4 py-1.5 rounded-md">
          {project.status}
        </p>
        <p className="text-nowrap inline-block opacity-60 bg-neutral-100/20 border border-neutral-200/30 text-xs px-4 py-1.5 rounded-md">
          {new Date(project.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
          })}
        </p>
      </div>
      <h3 className="text-lg font-medium">{project.title}</h3>
      <p className="opacity-60">{project.description}</p>
      <ButtonLink href={project.link ?? "/"} className="w-fit">
        View Project
      </ButtonLink>
    </div>
  );
};

const Portfolio = async () => {
  const projects = await getProjects();
  return (
    <main className="w-full min-h-screen flex flex-col gap-12 items-center justify-center py-32 px-8 max-sm:px-4">
      <SectionTitle
        title="Portfolio"
        description="Here's a showcase of all my successful projects"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.docs.map((project, index) => (
          <MotionDiv key={project.id} delay={index * 0.1}>
            <ProjectCard project={project} />
          </MotionDiv>
        ))}
      </div>

      <div className="w-full h-full relative">
        <Image
          src="https://ihcntrkzhwqeiajreqfp.supabase.co/storage/v1/object/public/olivermorlax-bucket/public/media/dribble-example-res.webp"
          alt="dribble-example"
          width={1280}
          height={720}
          className="rounded-lg w-full"
        />

        {/* Wave SVG Overlay */}
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

          {/* CTA Content */}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-white dark:from-neutral-800 to-transparent pb-8 pt-24">
            <div className="container mx-auto px-8 text-center">
              <h2 className="text-3xl max-sm:text-2xl font-bold mb-4">
                Ready to Turn Your Design into Reality?
              </h2>
              <p className="text-lg opacity-80 mb-8">
                With 1+ million designs to choose from, I can bring your vision
                to life.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <ButtonLink
                  href="https://www.linkedin.com/in/olivermorla/"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Connect on LinkedIn
                </ButtonLink>
                <ButtonLink
                  href="mailto:olivermorla3@gmail.com"
                  className="bg-neutral-800 dark:bg-white dark:text-neutral-800 hover:bg-neutral-900 dark:hover:bg-neutral-100 text-white"
                >
                  Email Me
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden relative bottom-0 w-full bg-gradient-to-t from-white dark:from-neutral-800 to-transparent pb-8 pt-12">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-3xl max-sm:text-2xl font-bold mb-4">
            Ready to Turn Your Design into Reality?
          </h2>
          <p className="text-lg opacity-80 mb-8">
            With 1+ million designs to choose from, I can bring your vision to
            life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <ButtonLink
              href="https://www.linkedin.com/in/olivermorla/"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Connect on LinkedIn
            </ButtonLink>
            <ButtonLink
              href="mailto:olivermorla3@gmail.com"
              className="bg-neutral-800 dark:bg-white dark:text-neutral-800 hover:bg-neutral-900 dark:hover:bg-neutral-100 text-white"
            >
              Email Me
            </ButtonLink>
          </div>
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
          Note: I do not own any of the designs listed above. I only use them as
          inspiration for my own designs. You can even use your own designs as
          inspiration for your own project, anything goes!
        </p>
      </div>
    </main>
  );
};

export default Portfolio;

export const revalidate = 86400; // 24 hours (24 * 60 * 60 = 86400 seconds)

import Image from "next/image";
import { getImageUrl } from "@/utils";
import { Project } from "@/payload-types";
import { getProjects } from "@/lib/server/queries";
import SectionTitle from "@/modules/app/components/section-title";
import ButtonLink from "@/components/shared/ui/dynamic/ButtonLink";
import { MotionDiv } from "@/components/helpers/dynamic/Motion";

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

      <div>
        <h1>
          You can get 
        </h1>
      </div>
    </main>
  );
};

export default Portfolio;

export const revalidate = 86400; // 24 hours (24 * 60 * 60 = 86400 seconds)

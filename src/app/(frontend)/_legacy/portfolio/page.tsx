import { getProjects } from "@/lib/payload/server/queries";
import CTAButtons from "@/modules/app/components/cta-buttons";
import SectionTitle from "@/modules/app/components/section-title";
import { pages } from "@/modules/app/lib/constants";
import ProjectCard from "@/modules/portfolio/components/project-card";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Web and mobile apps I've designed, built and launched for startups and small businesses.",
  alternates: { canonical: "/portfolio" },
};

// Statically generated; project edits in the CMS revalidate it immediately.
export const revalidate = 14400; // 4 hours

const designSources = [
  { name: "Dribbble", href: "https://dribbble.com/" },
  { name: "Behance", href: "https://www.behance.net/" },
  { name: "Figma", href: "https://www.figma.com/" },
  { name: "Designspiration", href: "https://www.designspiration.com/" },
];

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="bg-gradient-none flex min-h-svh flex-col items-center px-4 pt-28 pb-24 sm:px-8">
      <div className="container mx-auto flex flex-col gap-16">
        <SectionTitle
          as="h1"
          title={pages.portfolio.title}
          tagline={pages.portfolio.tagline}
          subtitle={pages.portfolio.subtitle}
          description={pages.portfolio.description}
          className="mx-auto max-w-3xl items-center text-center"
        />

        {projects.length ? (
          <ul className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCard
                  project={project}
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-xl border border-dashed border-neutral-300 p-10 text-center dark:border-neutral-700">
            <p className="font-medium">Projects are on their way.</p>
            <p className="text-muted text-sm">
              The case studies are being updated. Book a call and I&apos;ll walk
              you through recent work live.
            </p>
            <CTAButtons className="justify-center" />
          </div>
        )}

        <section className="flex flex-col gap-8">
          <SectionTitle
            title="Got a project in mind?"
            tagline="Let's talk"
            subtitle="First, pick out a design unless you already have one."
            description="I'm always looking for new projects to work on. If you have a project in mind, please contact me."
            className="mr-auto max-w-3xl items-start text-start"
          />

          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="relative aspect-video bg-neutral-200 dark:bg-neutral-800">
              <Image
                src="/api/media/file/dribble-example-res.webp"
                alt="A collage of website designs from Dribbble"
                fill
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/40 to-transparent max-md:hidden dark:from-neutral-900 dark:via-neutral-900/40"
              />
            </div>
            <div className="flex flex-col items-center gap-4 p-6 text-center md:absolute md:inset-x-0 md:bottom-0 md:p-10">
              <h2 className="text-2xl font-bold text-balance sm:text-3xl">
                Ready to turn your design into reality?
              </h2>
              <p className="text-muted max-w-xl">
                With 1+ million designs to choose from, I can bring your vision
                to life.
              </p>
              <CTAButtons className="max-w-md" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <h3 className="text-muted text-sm">Where to find designs</h3>
            <ul className="flex flex-wrap justify-center gap-3">
              {designSources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md border border-neutral-300 px-4 py-1.5 text-sm transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                  >
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-muted max-w-2xl text-sm">
              I don&apos;t own the designs listed above; they&apos;re a starting
              point for inspiration. Your own designs work just as well.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

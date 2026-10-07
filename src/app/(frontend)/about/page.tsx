import ButtonLink from "@/components/ui/button-link";
import { socialIcons } from "@/components/ui/icons";
import CTAButtons from "@/modules/app/components/cta-buttons";
import {
  education,
  experienceHistory,
  socialMediaLinks,
  toolkit,
} from "@/modules/app/lib/constants";
import { cn } from "@/utils/classNames";
import { FileText } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior full-stack developer in Queens, New York. Experience, education and the tools I build with.",
  alternates: { canonical: "/about" },
};

const profileLinks = socialMediaLinks.filter((link) => link.icon !== "email");

const SectionHeading = ({
  id,
  children,
}: {
  id?: string;
  children: string;
}) => (
  <h2 id={id} className="text-2xl font-bold tracking-tight sm:text-3xl">
    {children}
  </h2>
);

export default function AboutPage() {
  return (
    <div className="bg-gradient-none px-4 pt-28 pb-24 sm:px-8">
      <div className="container mx-auto grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait column: the one bold element, pinned while you read. */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900">
            <Image
              src="/assets/media/portrait_1_2.webp"
              alt="Oliver Morla"
              fill
              preload
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_20%]"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-lg font-semibold">Oliver Morla</p>
              <p className="text-muted">
                Senior full-stack developer, Queens, New York
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ButtonLink href="/resume" variant="solidDark" fontSize="sm">
                <FileText aria-hidden className="size-4" />
                Resume
              </ButtonLink>
              {profileLinks.map((link) => {
                const Icon = socialIcons[link.icon];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.title}
                    className="grid size-10 place-items-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="flex flex-col gap-16 lg:col-span-7">
          <section className="flex max-w-2xl flex-col gap-5">
            <h1 className="title">About</h1>
            <p className="text-xl leading-relaxed text-pretty">
              I&apos;m Oliver Morla, a senior full-stack developer in Queens,
              New York. I design, build and launch web and mobile apps for
              startups and small businesses.
            </p>
            <p className="text-muted leading-relaxed text-pretty">
              I studied Computer Systems Technology at New York City College of
              Technology and have shipped production software since 2019: at New
              Yorkers International, then Gambit Dev, and now as a senior
              engineer at FUJIFILM Biotechnologies. Alongside that I run my own
              studio, Appify Visions, which I started in college.
            </p>
            <p className="text-muted leading-relaxed text-pretty">
              Most of my work is React and Next.js on the front end, Node on the
              back end, and AWS underneath. You work with me directly, from the
              first call to launch.
            </p>
          </section>

          <section aria-labelledby="experience" className="flex flex-col gap-8">
            <SectionHeading id="experience">Experience</SectionHeading>
            <ol className="flex flex-col border-l border-neutral-200 dark:border-neutral-800">
              {experienceHistory.map((job, index) => {
                const isCurrent = job.endDate === "Current";
                return (
                  <li
                    key={`${job.companyName}-${job.startDate}`}
                    className="relative pb-10 pl-6 last:pb-0 sm:pl-8"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-1.5 -left-[5px] size-2.5 rounded-full ring-4 ring-white dark:ring-black",
                        isCurrent
                          ? "bg-emerald-500"
                          : "bg-neutral-400 dark:bg-neutral-600",
                      )}
                    />
                    <p className="text-muted text-sm tabular-nums">
                      {job.startDate} – {isCurrent ? "Present" : job.endDate}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">
                      {job.position}
                    </h3>
                    <p className="text-muted">
                      {job.companyName}, {job.location}
                    </p>
                    <ul
                      className={cn(
                        "mt-4 flex max-w-2xl list-disc flex-col gap-2 pl-4 marker:text-neutral-400",
                        index > 0 && "text-neutral-600 dark:text-neutral-400",
                      )}
                    >
                      {job.highlights.map((highlight) => (
                        <li key={highlight} className="text-pretty">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </section>

          <section aria-labelledby="education" className="flex flex-col gap-6">
            <SectionHeading id="education">Education</SectionHeading>
            <ul className="flex flex-col gap-4">
              {education.map((school) => (
                <li
                  key={school.institution}
                  className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <div>
                    <h3 className="font-semibold">{school.degree}</h3>
                    <p className="text-muted">{school.institution}</p>
                  </div>
                  <p className="text-muted shrink-0 text-sm tabular-nums">
                    {school.graduationYear}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="skills" className="flex flex-col gap-6">
            <SectionHeading id="skills">Skills</SectionHeading>
            <dl className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
              {toolkit.map((group) => (
                <div
                  key={group.area}
                  className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <dt className="text-muted text-sm sm:pt-0.5">{group.area}</dt>
                  <dd>{group.tools.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-neutral-200 p-6 sm:p-8 dark:border-neutral-800">
            <h2 className="text-xl font-semibold">Have a project in mind?</h2>
            <p className="text-muted">
              Tell me what you&apos;re building and I&apos;ll tell you how
              I&apos;d approach it.
            </p>
            <CTAButtons className="max-w-md" />
          </section>
        </div>
      </div>
    </div>
  );
}

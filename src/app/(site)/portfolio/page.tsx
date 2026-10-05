import type { Metadata } from "next";
import BackToTop from "../_components/back-to-top";
import Closing from "../_components/closing";
import Footer from "../_components/footer";
import Nav from "../_components/nav";
import ThemeToggle from "../_components/theme-toggle";
import { projects, sectors } from "../_lib/content";
import { showDrafts, testimonialFor } from "../_lib/testimonials";
import ProjectIndex, { type IndexProject } from "./_components/project-index";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Web and mobile apps I've designed, built and launched for startups and small businesses, from fintech in Peru to a family bakery.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  // Each project carries its client's quote, when there is one this
  // deployment may show (drafts never reach production).
  const items: IndexProject[] = projects.map((project) => {
    const t = testimonialFor(project.slug);
    return t
      ? {
          ...project,
          quote: {
            pull: t.pull,
            name: t.name,
            role: t.role,
            draft: showDrafts && t.draft === true,
          },
        }
      : project;
  });

  return (
    // No intro on this page, so nothing waits for its handoff.
    <div style={{ "--handoff": "0ms" } as React.CSSProperties}>
      <Nav />
      <ThemeToggle />
      <BackToTop />
      <main>
        <ProjectIndex projects={items} sectors={sectors} />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}

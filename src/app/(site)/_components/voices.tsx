import { projects } from "../_lib/content";
import { showDrafts, testimonials } from "../_lib/testimonials";
import ProofReel, { type ReelItem } from "./proof-reel";

// Server half of the testimonials: decides which quotes this deployment may
// show (drafts never reach production) and pairs each with its product.
export default function Voices() {
  const items: ReelItem[] = testimonials.map((t) => {
    const project = projects.find((p) => p.slug === t.project);
    // A pull line that opens the quote isn't repeated in the body.
    const opens = t.quote.startsWith(t.pull);

    return {
      name: t.name,
      role: t.role,
      pull: t.pull,
      body: opens ? t.quote.slice(t.pull.length).trim() : t.quote,
      pullRepeated: !opens,
      draft: showDrafts && t.draft === true,
      project: project && {
        name: project.name,
        summary: project.summary,
        image: project.image,
        focus: project.focus,
        domain: project.domain,
      },
    };
  });

  if (items.length === 0) return null;
  return <ProofReel items={items} />;
}

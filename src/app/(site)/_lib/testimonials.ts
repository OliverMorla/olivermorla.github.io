import "server-only";

export type Testimonial = {
  name: string;
  // Title, company or both, as the client signs off.
  role: string;
  // The line that leads the card: a sentence (or the end of one) taken word
  // for word from `quote`.
  pull: string;
  quote: string;
  // The product they're talking about (a `projects` slug in content.ts),
  // shown beside the quote.
  project?: string;
  // Written for the client to approve. Drafts show in development and on
  // preview deployments, never in production: set `draft` to false (or
  // delete it) once the client has signed off on the wording.
  draft?: true;
};

// LinkedIn recommendations, trimmed to whole sentences with typos fixed.
// Then current clients, newest first. Long and short quotes alternate so
// the reel never bunches up.
const all: Testimonial[] = [
  {
    name: "Altaf Ahmad",
    role: "CEO, Mirza’s Construction",
    pull: "He was fast, reliable, and highly professional.",
    quote:
      "He was fast, reliable, and highly professional. Oliver built my website from the ground up and made sure to walk me through the process at every stage, making it simple and easy to understand. On top of that, he went above and beyond by designing and printing my business cards.",
    project: "mirza-construction",
  },
  {
    name: "Ruben Rivera Luis",
    role: "Altoken and DDPay",
    pull: "He feels like part of the company.",
    quote:
      "Oliver built two products for us: Altoken for tokenized real estate and DDPay for payments across Peru. He moves fast, asks the right questions about how money actually flows, and explains every tradeoff so we can decide quickly. He feels like part of the company.",
    project: "ddpay",
    draft: true,
  },
  {
    name: "Victoria Emem",
    role: "Wellness Operations, New York",
    pull: "He really went above and beyond every step of the way.",
    quote:
      "He was very thorough with the questions he asked in the initial conversation and was great with communication along the way. Sometimes I gave him the bare minimum and he used his own creativity for content and to make it look amazing. He really went above and beyond every step of the way.",
  },
  {
    name: "Joseph Czerniawski",
    role: "Magnet",
    pull: "He sweats the small details that make people trust a product.",
    quote:
      "Magnet had to feel calm before anyone read a word, and Oliver understood that from the first call. He turned a complex care model into something gentle and simple to use, and he sweats the small details that make people trust a product with their mental health.",
    project: "magnet",
    draft: true,
  },
  {
    name: "Jeff Miah",
    role: "Train with Jeffrey",
    pull: "What really sets Oliver apart is his collaboration and ownership.",
    quote:
      "He approaches challenges thoughtfully, writes clean and maintainable code, and isn’t afraid to dig deep to find the right solution rather than just the fastest one. What really sets Oliver apart is his collaboration and ownership. You can trust him to take responsibility for his tasks and see them through to completion.",
    project: "train-with-jeffrey",
  },
  {
    name: "Martha McHugh",
    role: "State Senate campaign, 2026",
    pull: "He made it feel like it belonged in a much bigger race.",
    quote:
      "Oliver built our campaign site on a tight timeline, and he made it feel like it belonged in a much bigger race. My team updates news and events on their own, and when we need something changed, he turns it around fast.",
    project: "martha-mchugh",
    draft: true,
  },
  {
    name: "Joanne LeBel",
    role: "Crunch Fitness",
    pull: "Revolutionizing how we track and manage our inventory.",
    quote:
      "Oliver developed an outstanding inventory management app for our Crunch Fitness facility, revolutionizing how we track and manage our inventory. The app’s sleek design, comprehensive functionality, and robust features like order printing and sales reset have significantly improved our operational efficiency.",
    project: "crunch-fitness-utilities",
  },
  {
    name: "Benjamin Kosten",
    role: "Quip, bed.gg and Gambit Dev",
    pull: "When something is hard, he’s the engineer I hand it to.",
    quote:
      "Oliver has shipped across Quip, bed.gg and Gambit Dev. Real-time games, payments, polished front ends: he handles all of it with the same care. When something is hard, he’s the engineer I hand it to.",
    project: "quip",
    draft: true,
  },
  {
    name: "Johnny Luna",
    role: "Personal Trainer, Queens",
    pull: "My experience with Oliver has been nothing but phenomenal.",
    quote:
      "My experience with Oliver has been nothing but phenomenal. He allocated personal time to chat and discuss my needs and wants! He sent me resources and put such a creative spin on our project! His work effort and genuine care about my website have been nothing but excellent.",
    project: "johnny-luna",
  },
  {
    name: "Ninette Diogene",
    role: "Croix Technologies and Bon Gou Foods",
    pull: "Two completely different worlds, and he got both right.",
    quote:
      "Oliver has built for both of my businesses: a payments product at Croix Technologies and online ordering for Bon Gou Foods. Two completely different worlds, and he got both right. Clear communication, thoughtful design, and he always delivers what he promises.",
    project: "bon-gou-foods",
    draft: true,
  },
  {
    name: "Jonathan Lizama",
    role: "CEO and Founder",
    pull: "Could not recommend him enough!",
    quote:
      "I have had the pleasure of working with Oliver on multiple occasions for both of my companies regarding website and SEO services. Oliver has been a very responsive and supportive person to work with, very knowledgeable with his line of work and could not recommend him enough!",
    project: "ny-general-renovation",
  },
];

/** True when unapproved drafts may render (everywhere but production). */
export const showDrafts = process.env.VERCEL_ENV !== "production";

/** The testimonials this deployment is allowed to show, in order. */
export const testimonials = all.filter((t) => showDrafts || !t.draft);

/** The testimonial about a project, if one may be shown. */
export const testimonialFor = (slug: string) =>
  testimonials.find((t) => t.project === slug);

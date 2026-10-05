// All copy and project data for the /preview/shipped landing page lives here,
// so wording, links and ordering can be edited without touching layout code.

export type Project = {
  slug: string;
  name: string;
  summary: string;
  industry: string;
  image: string;
  // Only set when the live site is confirmed; projects without one render unlinked.
  domain?: string;
};

const shot = (file: string) => `/assets/media/projects/${file}.webp`;

export const projects = {
  bedgg: {
    slug: "bedgg",
    name: "bed.gg",
    summary: "Player profiles for competitive Minecraft",
    industry: "Gaming",
    image: shot("bed-gg"),
    domain: "bed.gg",
  },
  quip: {
    slug: "quip",
    name: "Quip",
    summary: "Real-money skill games",
    industry: "Gaming",
    image: shot("quip"),
    domain: "quip.gg",
  },
  trainWithJeffry: {
    slug: "train-with-jeffry",
    name: "Train with Jeffry",
    summary: "Boxing and personal training brand",
    industry: "Fitness",
    image: shot("train-with-jeffry"),
    domain: "trainwithjeffry.com",
  },
  bonGou: {
    slug: "bon-gou-foods",
    name: "Bon Gou Foods",
    summary: "Online ordering for a family bakery",
    industry: "Food",
    image: shot("bon-gou-foods"),
    domain: "bongoufoods.com",
  },
  zpowa: {
    slug: "zpowa",
    name: "Zpowa Nutrition",
    summary: "Supplement storefront",
    industry: "Ecommerce",
    image: shot("zpowa-nutrition"),
    domain: "zpowa.com",
  },
  johnnyLuna: {
    slug: "johnny-luna",
    name: "Johnny Luna",
    summary: "Coaching site with free strategy calls",
    industry: "Fitness",
    image: shot("johnny-luna"),
    domain: "johnnyluna.com",
  },
  liftforge: {
    slug: "liftforge",
    name: "LiftForge",
    summary: "Lift renderings from a single site photo",
    industry: "Construction tech",
    image: shot("liftforge"),
  },
  unifiedStopPayment: {
    slug: "unified-stop-payment",
    name: "Unified Stop Payment",
    summary: "One stop-payment request, held on every rail",
    industry: "Fintech",
    image: shot("unified-stop-payment"),
  },
  mindBodyShift: {
    slug: "mind-body-shift",
    name: "Mind Body Shift",
    summary: "Coaching platform and member portal",
    industry: "Wellness",
    image: shot("mind-body-shift-light"),
    domain: "mindbodyshift.net",
  },
  quipWrld: {
    slug: "quip-wrld",
    name: "Quip WRLD",
    summary: "A player-built online world",
    industry: "Gaming",
    image: shot("quip-wrld"),
  },
  ddpay: {
    slug: "ddpay",
    name: "DDPay",
    summary: "Payments for small merchants in Peru",
    industry: "Fintech",
    image: shot("ddpay"),
  },
  altoken: {
    slug: "altoken",
    name: "Altoken",
    summary: "Fractional ownership of real estate",
    industry: "Fintech",
    image: shot("altoken"),
  },
  aquastock: {
    slug: "aquastock",
    name: "Aquastock",
    summary: "Savings matched by a sponsor",
    industry: "Fintech",
    image: shot("aquastock"),
  },
  magnet: {
    slug: "magnet",
    name: "Magnet",
    summary: "Everyday mental health support",
    industry: "Health",
    image: shot("magnet"),
  },
  crunch: {
    slug: "crunch-fitness-utilities",
    name: "Crunch Fitness Utilities",
    summary: "Inventory and sales tools for gym staff",
    industry: "Operations",
    image: shot("crunch-fitness-utilities"),
    domain: "crunchfitness.app",
  },
  marthaMchugh: {
    slug: "martha-mchugh",
    name: "Martha McHugh",
    summary: "Campaign site",
    industry: "Civic",
    image: shot("martha-mchugh"),
  },
  elemental: {
    slug: "elemental-roofing",
    name: "Elemental Roof Solutions",
    summary: "Roofing company site with free inspections",
    industry: "Trades",
    image: shot("elemental-roofing"),
    domain: "elementalroofsolutions.com",
  },
  nyGeneral: {
    slug: "ny-general-renovation",
    name: "NY General Renovation",
    summary: "Renovation company site",
    industry: "Trades",
    image: shot("ny-general-renovation"),
    domain: "nygeneralrenovation.com",
  },
  mirza: {
    slug: "mirza-construction",
    name: "Mirza's Construction",
    summary: "Construction company site",
    industry: "Trades",
    image: shot("mirza-construction"),
    domain: "mirzasconstruction.com",
  },
  appify: {
    slug: "appify-visions",
    name: "Appify Visions",
    summary: "Studio site for a software agency",
    industry: "Agency",
    image: shot("appify-visions"),
    domain: "appifyvisions.com",
  },
} satisfies Record<string, Project>;

// Cycled in the hero. Every entry here must have a domain that is currently live.
export const heroStack: Project[] = [
  projects.bedgg,
  projects.trainWithJeffry,
  projects.quip,
  projects.bonGou,
  projects.zpowa,
  projects.johnnyLuna,
];

// Large tiles at the top of the work section, in grid order.
export const featured: Project[] = [
  projects.liftforge,
  projects.bedgg,
  projects.unifiedStopPayment,
  projects.mindBodyShift,
];

// Everything else, listed as an index below the featured tiles.
export const index: Project[] = [
  projects.quipWrld,
  projects.ddpay,
  projects.altoken,
  projects.trainWithJeffry,
  projects.aquastock,
  projects.magnet,
  projects.bonGou,
  projects.zpowa,
  projects.crunch,
  projects.quip,
  projects.johnnyLuna,
  projects.marthaMchugh,
  projects.elemental,
  projects.nyGeneral,
  projects.mirza,
  projects.appify,
];

export const services = [
  {
    title: "Web apps",
    body: "Sites, dashboards and SaaS products that load fast and convert.",
    stack: "Next.js, React, TypeScript, Postgres",
  },
  {
    title: "Mobile apps",
    body: "iOS and Android from one codebase, plus the backend behind it.",
    stack: "React Native, Expo, Node.js",
  },
  {
    title: "Tools and automations",
    body: "Internal tools and integrations that give your team hours back.",
    stack: "Node.js, Python, AWS",
  },
];

// Spans are in weeks on an 8-week timeline.
export const phases = [
  {
    name: "Discover",
    start: 0,
    end: 1,
    duration: "Week 1",
    body: "Goals, scope and a plan you can hold me to.",
  },
  {
    name: "Prototype",
    start: 1,
    end: 3,
    duration: "Weeks 2–3",
    body: "Clickable flows, signed off before any code.",
  },
  {
    name: "Build",
    start: 3,
    end: 7,
    duration: "Weeks 4–7",
    body: "Weekly demos on a live preview link.",
  },
  {
    name: "Launch",
    start: 7,
    end: 8,
    duration: "Week 8",
    body: "Monitoring, docs and a clean handoff.",
  },
];

export const outcomes = [
  { figure: "6 weeks", label: "from kickoff to a launched MVP" },
  { figure: "43%", label: "less time spent onboarding new users" },
  { figure: "28%", label: "lower monthly infrastructure cost" },
  { figure: "200ms", label: "faster Core Web Vitals" },
];

export const links = {
  schedule: "/schedule",
  email: "mailto:olivermorla3@gmail.com",
  github: "https://github.com/OliverMorla",
  linkedin: "https://www.linkedin.com/in/oliver-morla/",
  x: "https://twitter.com/OliverMorlaX",
  resume: "/resume",
};

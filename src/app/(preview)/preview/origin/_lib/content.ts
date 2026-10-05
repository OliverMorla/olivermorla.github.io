// All copy and project data for the /preview/origin landing page lives here,
// so wording, links and ordering can be edited without touching layout code.

export type Project = {
  name: string;
  summary: string;
  industry: string;
  image: string;
  // Only set when the live site is confirmed; projects without one render unlinked.
  domain?: string;
};

const shot = (file: string) => `/assets/media/projects/${file}.webp`;

// Typed out by the hero typewriter, in this order.
export const roles = [
  "Software Developer",
  "Web Developer",
  "Mobile Developer",
];

// The live site's scroll-velocity band, kept word for word.
export const marquee = "Web Development. Mobile Development. UI/UX Web Design.";

export const stats = [
  { value: 5, suffix: "+", label: "Years shipping production apps" },
  { value: 20, suffix: "+", label: "Products launched" },
  { value: 25, suffix: "+", label: "Happy clients" },
  { value: 8, suffix: "", label: "Weeks from kickoff to launch" },
];

export const clients = [
  "Croix Technologies",
  "Magnet",
  "Altoken",
  "DDPay",
  "bed.gg",
  "Quip",
  "Crunch Fitness",
  "Bon Gou Foods",
  "Train with Jeffry",
  "Gambit Dev",
  "Mirza's Construction",
  "Zpowa Nutrition",
  "NY General Renovation",
  "Appify Visions",
];

// Shown one at a time in the work browser, in this order.
export const featured: Project[] = [
  {
    name: "Unified Stop Payment",
    summary: "One stop-payment request, held on every rail",
    industry: "Fintech",
    image: shot("unified-stop-payment"),
    domain: "croixtechnologies.com",
  },
  {
    name: "Magnet",
    summary: "Calm, everyday mental health support",
    industry: "Health",
    image: shot("magnet"),
    domain: "magnet.care",
  },
  {
    name: "bed.gg",
    summary: "Player profiles for competitive Minecraft",
    industry: "Gaming",
    image: shot("bed-gg"),
    domain: "bed.gg",
  },
  {
    name: "LiftForge",
    summary: "Lift renderings from a single site photo",
    industry: "Construction tech",
    image: shot("liftforge"),
  },
  {
    name: "Train with Jeffry",
    summary: "Boxing and personal training brand",
    industry: "Fitness",
    image: shot("train-with-jeffry"),
    domain: "trainwithjeffrey.com",
  },
];

// Every shipped product, on the tilted wall. Split into columns in this
// order, so neighbours should differ in colour and density.
export const wall: { name: string; image: string }[] = [
  { name: "Quip WRLD", image: shot("quip-wrld") },
  { name: "Altoken", image: shot("altoken") },
  { name: "Zpowa Nutrition", image: shot("zpowa-nutrition") },
  { name: "Train with Jeffry", image: shot("train-with-jeffry") },
  { name: "DDPay", image: shot("ddpay") },
  { name: "Magnet", image: shot("magnet") },
  { name: "Quip", image: shot("quip") },
  { name: "Elemental Roof Solutions", image: shot("elemental-roofing") },
  { name: "Aquastock", image: shot("aquastock") },
  { name: "Martha McHugh", image: shot("martha-mchugh") },
  { name: "Crunch Fitness Utilities", image: shot("crunch-fitness-utilities") },
  { name: "Johnny Luna", image: shot("johnny-luna") },
  { name: "Mind Body Shift", image: shot("mind-body-shift-light") },
  { name: "NY General Renovation", image: shot("ny-general-renovation") },
  { name: "Appify Visions", image: shot("appify-visions") },
  { name: "Mirza's Construction", image: shot("mirza-construction") },
  { name: "Unified Stop Payment", image: shot("unified-stop-payment-alt") },
  { name: "bed.gg", image: shot("bed-gg") },
  { name: "LiftForge", image: shot("liftforge") },
  { name: "Bon Gou Foods", image: shot("bon-gou-foods") },
];

export type ServiceIcon = "web" | "mobile" | "software";

export const services: {
  title: string;
  body: string;
  icon: ServiceIcon;
  stack: string[];
}[] = [
  {
    title: "Web apps",
    body: "Sites, dashboards and SaaS products that load fast and convert.",
    icon: "web",
    stack: ["Next.js", "React", "TypeScript", "Postgres"],
  },
  {
    title: "Mobile apps",
    body: "iOS and Android from one codebase, plus the backend behind it.",
    icon: "mobile",
    stack: ["React Native", "Expo", "Node.js"],
  },
  {
    title: "Software and automation",
    body: "Internal tools and integrations that give your team hours back.",
    icon: "software",
    stack: ["Node.js", "Python", "AWS"],
  },
];

export const steps = [
  {
    name: "Discover",
    when: "Week 1",
    body: "Goals, scope and a plan you can hold me to.",
    deliverables: ["Brief and scope", "Backlog", "System outline"],
  },
  {
    name: "Prototype",
    when: "Weeks 2–3",
    body: "Clickable flows, signed off before any code.",
    deliverables: ["Clickable prototype", "Flow map", "Visual direction"],
  },
  {
    name: "Build",
    when: "Weeks 4–7",
    body: "Weekly demos on a live preview link.",
    deliverables: ["Weekly demos", "Preview links", "Tests"],
  },
  {
    name: "Launch",
    when: "Week 8",
    body: "Monitoring, docs and a clean handoff.",
    deliverables: ["Launch checklist", "Monitoring", "Handoff docs"],
  },
];

export const links = {
  schedule: "/schedule",
  email: "mailto:olivermorla3@gmail.com",
  portfolio: "/portfolio",
  resume: "/resume",
  studio: "https://www.appifyvisions.com",
  github: "https://github.com/OliverMorla",
  linkedin: "https://www.linkedin.com/in/oliver-morla/",
  recommendations:
    "https://www.linkedin.com/in/oliver-morla/details/recommendations/",
  x: "https://twitter.com/OliverMorlaX",
};

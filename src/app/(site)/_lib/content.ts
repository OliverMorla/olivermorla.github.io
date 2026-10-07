// All copy and project data for the home page and /portfolio lives here, so
// wording, links and ordering can be edited without touching layout code.

export const sectors = [
  "Fintech",
  "Health & fitness",
  "Gaming",
  "Local business",
] as const;
export type Sector = (typeof sectors)[number];

export type Project = {
  slug: string;
  name: string;
  summary: string;
  // Filters /portfolio. Projects without one only show under "All".
  sector?: Sector;
  image: string;
  // object-position for tight crops, when the default top-centre cuts off
  // the part of the screenshot that matters.
  focus?: string;
  // Only set when the live site is confirmed (checked Oct 2026); projects
  // without one render unlinked.
  domain?: string;
};

const shot = (file: string) => `/assets/media/projects/${file}.webp`;

// Every shipped product, in the order /portfolio lists them.
export const projects: Project[] = [
  {
    slug: "magnet",
    name: "Magnet",
    summary: "Everyday mental health support",
    sector: "Health & fitness",
    image: shot("magnet"),
    // The headline sits on the left of this screenshot.
    focus: "left top",
    domain: "magnet.care",
  },
  {
    slug: "ddpay",
    name: "DDPay",
    summary: "Payments for small merchants in Peru",
    sector: "Fintech",
    image: shot("ddpay"),
    domain: "ddpay.io",
  },
  {
    slug: "bedgg",
    name: "bed.gg",
    summary: "Player profiles for competitive Minecraft",
    sector: "Gaming",
    image: shot("bed.gg"),
    domain: "bed.gg",
  },
  {
    slug: "gambit-dev",
    name: "Gambit Dev",
    summary: "Studio site for skill-based games",
    sector: "Gaming",
    image: shot("gambitdev"),
    domain: "gambit.dev",
  },
  {
    slug: "unified-stop-payment",
    name: "Unified Stop Payment",
    summary: "One stop-payment request, held on every rail",
    sector: "Fintech",
    image: shot("unified-stop-payment"),
  },
  {
    slug: "bon-gou-foods",
    name: "Bon Gou Foods",
    summary: "Online ordering for a family bakery",
    sector: "Local business",
    image: shot("bon-gou-foods"),
    focus: "left top",
    domain: "bongoufoods.com",
  },
  {
    slug: "altoken",
    name: "Altoken",
    summary: "Fractional ownership of real estate",
    sector: "Fintech",
    image: shot("altoken"),
    domain: "altoken.io",
  },
  {
    slug: "new-yorkers-international",
    name: "New Yorker\u2019s International",
    summary: "Commodity trading from New York to Lahore",
    image: shot("nyi"),
    domain: "newyorkersinternational.com",
  },
  {
    slug: "quip",
    name: "Quip",
    summary: "Real-money skill games",
    sector: "Gaming",
    image: shot("quip"),
    domain: "quip.gg",
  },
  {
    slug: "train-with-jeffrey",
    name: "Train with Jeffrey",
    summary: "Boxing and personal training brand",
    sector: "Health & fitness",
    image: shot("train-with-jeffry"),
    domain: "trainwithjeffrey.com",
  },
  {
    slug: "mirza-construction",
    name: "Mirza\u2019s Construction",
    summary: "Construction company site",
    sector: "Local business",
    image: shot("mirza-construction"),
    domain: "mirzasconstruction.com",
  },
  {
    slug: "crunch-fitness-utilities",
    name: "Crunch Fitness Utilities",
    summary: "Inventory and sales tools for gym staff",
    sector: "Health & fitness",
    image: shot("crunch-fitness-utilities"),
  },
  {
    slug: "quip-wrld",
    name: "Quip WRLD",
    summary: "A player-built online world",
    sector: "Gaming",
    image: shot("quip.gg"),
  },
  {
    slug: "johnny-luna",
    name: "Johnny Luna",
    summary: "Coaching site with free strategy calls",
    sector: "Health & fitness",
    image: shot("johnny-luna"),
    domain: "johnnyluna.com",
  },
  {
    slug: "aquastock",
    name: "Aquastock",
    summary: "Savings matched by a sponsor",
    sector: "Fintech",
    image: shot("aquastock"),
  },
  {
    slug: "martha-mchugh",
    name: "Martha McHugh",
    summary: "Campaign site",
    image: shot("martha-mchugh"),
  },
  {
    slug: "ny-general-renovation",
    name: "NY General Renovation",
    summary: "Renovation company site",
    sector: "Local business",
    image: shot("ny-general-renovation"),
    domain: "nygeneralrenovation.com",
  },
  {
    slug: "mind-body-shift",
    name: "Mind Body Shift",
    summary: "Coaching platform and member portal",
    sector: "Health & fitness",
    image: shot("mind-body-shift-light"),
  },
  {
    slug: "zpowa-nutrition",
    name: "Zpowa Nutrition",
    summary: "Supplement storefront",
    sector: "Health & fitness",
    image: shot("zpowa-nutrition"),
    domain: "zpowa.com",
  },
  {
    slug: "elemental-roofing",
    name: "Elemental Roof Solutions",
    summary: "Roofing company site with free inspections",
    sector: "Local business",
    image: shot("elemental-roofing"),
  },
  {
    slug: "liftforge",
    name: "LiftForge",
    summary: "Lift renderings from a single site photo",
    image: shot("liftforge"),
  },
  {
    slug: "appify-visions",
    name: "Appify Visions",
    summary: "My studio\u2019s own site",
    image: shot("appifyvisions"),
    domain: "appifyvisions.com",
  },
  {
    slug: "oliver-morla",
    name: "Oliver Morla",
    summary: "The site you\u2019re on",
    image: shot("olivermorla"),
    domain: "olivermorla.com",
  },
];

const bySlug = (slug: string) => {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`No project with slug "${slug}"`);
  return project;
};

// The home page's bento, in order: the first tile is the large one.
export const featured: Project[] = [
  "magnet",
  "bedgg",
  "unified-stop-payment",
  "bon-gou-foods",
  "ddpay",
].map(bySlug);

// Every other shipped product, shown on the tilted wall. Split into columns
// in this order, so neighbours should differ in colour and density.
export const wall: { name: string; image: string }[] = [
  ...[
    "quip-wrld",
    "altoken",
    "zpowa-nutrition",
    "train-with-jeffrey",
    "ddpay",
    "magnet",
    "quip",
    "elemental-roofing",
    "aquastock",
    "martha-mchugh",
    "crunch-fitness-utilities",
    "johnny-luna",
    "mind-body-shift",
    "ny-general-renovation",
    "appify-visions",
    "mirza-construction",
    "bedgg",
    "gambit-dev",
    "liftforge",
    "bon-gou-foods",
    "oliver-morla",
    "new-yorkers-international",
  ].map(bySlug),
  { name: "Unified Stop Payment", image: shot("unified-stop-payment-alt") },
];

// Scrolls along the bottom of the hero.
export const clients = [
  "bed.gg",
  "Train with Jeffrey",
  "Quip",
  "Bon Gou Foods",
  "LiftForge",
  "Zpowa Nutrition",
  "DDPay",
  "Crunch Fitness",
  "Mind Body Shift",
  "Altoken",
  "Johnny Luna",
  "Elemental Roof Solutions",
  "Aquastock",
  "NY General Renovation",
  "Magnet",
  "Mirza's Construction",
];

export const manifesto =
  "No account managers, no junior team. The person on your call is the person who designs it, builds it and launches it.";

export const services = [
  {
    title: "Web apps",
    body: "Sites, dashboards and SaaS products that load fast and convert.",
    stack: ["Next.js", "React", "TypeScript", "Postgres"],
    // Typed in the terminal beside the list while this row is in focus.
    dir: "web-app",
    command: "pnpm create next-app",
    result: "Live preview on every push",
  },
  {
    title: "Mobile apps",
    body: "iOS and Android from one codebase, plus the backend behind it.",
    stack: ["React Native", "Expo", "Node.js"],
    dir: "mobile-app",
    command: "npx expo run:ios",
    result: "One codebase, iOS and Android",
  },
  {
    title: "Tools and automations",
    body: "Internal tools and integrations that give your team hours back.",
    stack: ["Node.js", "Python", "AWS"],
    dir: "automations",
    command: "node workflows/sync.ts",
    result: "Runs every hour, hands-free",
  },
];

// Matches LinkedIn (Oct 2026), plus his own studio. Current roles first,
// then newest first; the last entry is education. "7+ years" counts from the
// Oct 2019 internship; keep the metric, menu and section copy in step.
// `url` links the organisation's name to its site. `logo` is a square tile
// in /assets/media/companies; without one, `initials` fill the tile.
export const experience: {
  years: string;
  role: string;
  org: string;
  url?: string;
  logo?: string;
  initials: string;
  place: string;
  body?: string;
}[] = [
  {
    years: "2026 – Now",
    role: "Senior Full Stack Engineer",
    org: "FUJIFILM Biotechnologies",
    url: "https://fujifilmbiotechnologies.fujifilm.com/",
    // No logo until he confirms the contract allows showing it.
    initials: "F",
    place: "remote contract",
    body: "Internal platforms, several with automated workflows, that make everyday work smoother for the teams using them. TypeScript end to end: React and Next.js up front, Node, Express and Fastify on AWS (ECS, Lambda, S3, API Gateway), shipped in agile sprints.",
  },
  {
    years: "2019 – Now",
    role: "Founder",
    org: "Appify Visions",
    url: "https://www.appifyvisions.com/",
    logo: "/assets/media/companies/appify-visions.webp",
    initials: "AV",
    place: "New York, NY",
    body: "My own studio: websites, apps and AI tools for startups and small businesses, from first call to launch. Started in college in 2019; registered as Appify Visions Group LLC in March 2026.",
  },
  {
    years: "2023 – 2026",
    role: "Full Stack Developer",
    org: "Gambit Dev",
    url: "https://gambit.dev/",
    logo: "/assets/media/companies/gambit-dev.webp",
    initials: "G",
    place: "Long Island City, NY (remote)",
    body: "SaaS platforms, storefronts and AI tools for clients, on AWS serverless. Cut infrastructure costs 20%.",
  },
  {
    years: "2019 – 2023",
    role: "Full Stack Engineer",
    org: "New Yorker’s International",
    url: "https://www.newyorkersinternational.com/",
    logo: "/assets/media/companies/new-yorkers-international.webp",
    initials: "NY",
    place: "Queens, NY (remote)",
    body: "Web and mobile trading platforms for a global commodities firm, starting as an intern. The rebuilt trading interface lifted engagement 40%.",
  },
  {
    years: "2023",
    role: "B.Tech, Computer Systems Technology",
    org: "NYC College of Technology",
    url: "https://www.citytech.cuny.edu/",
    // City Tech only publishes a 16px icon, too small to use.
    initials: "CT",
    place: "Brooklyn, NY",
    body: "Plus IBM’s Full Stack Software Developer certificate.",
  },
];

export const steps = [
  {
    name: "Discover",
    when: "Week 1",
    body: "Goals, scope and a plan you can hold me to.",
  },
  {
    name: "Prototype",
    when: "Weeks 2–3",
    body: "Clickable flows, signed off before any code.",
  },
  {
    name: "Build",
    when: "Weeks 4–7",
    body: "Weekly demos on a live preview link.",
  },
  {
    name: "Launch",
    when: "Week 8",
    body: "Monitoring, docs and a clean handoff.",
  },
];

export const links = {
  schedule: "/schedule",
  email: "mailto:olivermorla3@gmail.com",
  portfolio: "/portfolio",
  resume: "/resume",
  // Appify Visions Group LLC, his own studio (DBA Appify Visions).
  studio: "https://www.appifyvisions.com/",
  github: "https://github.com/OliverMorla",
  linkedin: "https://www.linkedin.com/in/oliver-morla/",
  x: "https://twitter.com/OliverMorlaX",
};

// The hero keeps the live site's layout (portrait on the right, particles,
// the oversized marquee); the left side is rewritten. The swapped word
// starts on "vision" to echo the intro's slogan.
export const hero = {
  greeting: "Hi, I\u2019m Oliver Morla",
  lead: "Bringing your",
  // Short on purpose: the word shares line two with "to life.", which has
  // to fit beside the portrait (about 495px wide at 1024px screens).
  words: ["vision", "startup", "web app", "SaaS", "store", "idea"],
  tail: "to life.",
  body: "Senior full-stack engineer in New York. I design, build and launch web and mobile apps for founders and small businesses.",
  trust: "Trusted by gyms, contractors, fintechs and founders.",
  logos: [
    { name: "Around Your Way Fitness", src: "around-your-way-fitness" },
    { name: "Elemental Roof Solutions", src: "elemental-roof-solutions" },
    { name: "Mind Body Shift", src: "mind-body-shift" },
    { name: "NY General Renovation", src: "nygeneralrenovation" },
    { name: "Zpowa Nutrition", src: "zpowa-nutrition" },
  ].map((logo) => ({
    ...logo,
    src: `/assets/media/partners/${logo.src}.webp`,
  })),
  marquee: "Web Development. Mobile Development. UI/UX Web Design.",
};

// The band under the hero. The live hero's "Age 25" became the age he
// started coding, which says more.
export const metrics = [
  { value: 7, suffix: "+", label: "Years of professional work" },
  { value: 20, suffix: "+", label: "Products shipped" },
  { value: 25, suffix: "+", label: "Happy clients" },
  { value: 14, suffix: "", label: "Age I wrote my first line of code" },
];

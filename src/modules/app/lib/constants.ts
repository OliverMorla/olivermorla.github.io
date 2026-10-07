export const contactEmail = "olivermorla3@gmail.com";

export const pages = {
  home: {
    tagline: "Build once. Ship everywhere.",
    title: "Full-Stack Apps that Launch Fast & Scale Clean",
    byline: "Hi, I'm Oliver —",
    subtitle:
      "Desktop • Web — delivered by a senior JavaScript engineer with 5+ years and 25+ happy clients",
    description:
      "I design, build, and ship production-ready apps end-to-end—React/Next.js on the front, Node/Express on the back, and modern tooling throughout. Get predictable timelines, clean code, and a partner who sweats the details.",

    stats: [
      {
        title: "Experience",
        value: 5,
      },

      {
        title: "Projects",
        value: 20,
      },

      {
        title: "Happy Clients",
        value: 25,
      },
      {
        title: "Age",
        value: 25,
      },
    ],
  },

  about: {
    tagline: "Get to know me",
    title: "My Story",
    subtitle: "A brief introduction to my life and work",
    description:
      "I'm a full-stack developer with a passion for building web applications.",
  },

  services: {
    tagline: "Outcomes over outputs",
    title: "Full-Stack Apps that Launch Fast & Scale Clean",
    subtitle:
      "Desktop • Web • Mobile — delivered by a senior JavaScript engineer with 5+ years and 25+ happy clients",
    description:
      "Have an idea to launch or a product to scale? I turn requirements into working software fast—without surprises. Clear scope, short feedback loops, and a build you can grow.",
  },
  process: {
    tagline: "No guesswork",
    title: "Plan. Prototype. Build. Launch",
    subtitle: "Transparency from kickoff to handoff.",
  },

  testimonials: {
    tagline: "Clients, unfiltered",
    title: "I’d Hire Them Again Tomorrow",
    subtitle: "Specific, credible, metric-backed quotes",
    description: "Real voices from real projects—no fluff.",
  },

  portfolio: {
    tagline: "Results that speak",
    title: "Ship Faster. Convert Higher. Scale Smarter.",
    subtitle: "Short stories, big outcomes.",
    description:
      "Production isn’t just a deployment—it’s a standard. I bake in performance budgets, accessibility, and security from day one, backed by analytics and monitoring. Faster pages, happier users, fewer fires later.",
  },

  certifications: {
    tagline: "Certifications are the best way to grow.",
    title: "Hear from our clients",
    subtitle: "See what our clients have to say about our services",
  },

  contact: {
    tagline: "Your move",
    title: "Ready to Build Something Great?",
    subtitle: "Fast response. Clear next steps.",
    description:
      "Let's get started. I'm ready to help you build something great.",
  },
};

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  dropdownLinks?: NavItem[];
};

export const headerPrimaryLinks: NavItem[] = [
  {
    title: "Home",
    href: "/",
    description: "Welcome to my portfolio",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn more about me and my background",
    dropdownLinks: [
      {
        title: "Skills",
        href: "/about#skills",
        description: "Technical skills and expertise",
      },
      {
        title: "Resume",
        href: "/resume",
        description: "Download my full resume",
      },
    ],
  },
  {
    title: "Portfolio",
    href: "/portfolio",
    description: "Showcase of my projects and work",
    dropdownLinks: [
      {
        title: "All Projects",
        href: "/portfolio",
        description: "All my masterpieces in one place",
      },
    ],
  },
  {
    title: "Services",
    href: "/#services",
    description: "Professional services I offer",
  },
  {
    title: "Testimonials",
    href: "/#testimonials",
    description: "What my clients say about me",
  },
  {
    title: "Contact",
    href: "/#contact",
    description: "Ready to build something great?",
  },
];

// Absolute paths so they work from every page, not just the home page.
export const footerLinks: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Services", href: "/#services" },
  { title: "Resume", href: "/resume" },
  { title: "Contact", href: "/#contact" },
];

export type SocialIcon = "github" | "linkedin" | "x" | "email";

export const socialMediaLinks: {
  title: string;
  href: string;
  icon: SocialIcon;
}[] = [
  {
    title: "GitHub",
    href: "https://github.com/OliverMorla",
    icon: "github",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/oliver-morla/",
    icon: "linkedin",
  },
  {
    title: "X (Twitter)",
    href: "https://twitter.com/OliverMorlaX",
    icon: "x",
  },
  {
    title: "Email",
    href: `mailto:${contactEmail}`,
    icon: "email",
  },
];

export type ServiceIcon = "web" | "mobile" | "software";

// Page content
export const listOfServices: {
  title: string;
  icon: ServiceIcon;
  price: string;
  description: string;
  libraries: string[];
  features: string[];
}[] = [
  {
    title: "Web Development",
    icon: "web",
    price: "$200 - $1800",
    description:
      "Expert web developer who specializes in building and maintaining high-quality websites and web-based applications.",
    libraries: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    features: [
      "Custom website design and development",
      "Responsive design for all devices",
      "Integration of third-party services",
      "Database management and optimization",
      "Security enhancements",
      "Performance optimization",
      "Regular updates and maintenance",
    ],
  },
  {
    title: "Mobile Development",
    icon: "mobile",
    price: "$600 - $2400",
    description:
      "Experienced application developer who specializes in creating custom software solutions for businesses.",
    libraries: [
      "React Native",
      "Expo",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    features: [
      "Custom mobile app development",
      "API integration",
      "Database management",
      "Security enhancements",
      "Performance optimization",
      "Regular updates and maintenance",
    ],
  },
  {
    title: "Software Development",
    icon: "software",
    price: "$400 - $2000",
    libraries: [
      "Electron.js",
      "Python",
      "Django",
      "SQL",
      "Tableau",
      "AWS",
      "Docker",
    ],
    description:
      "Custom tailored software solutions for businesses and organizations.",
    features: [
      "Custom software development",
      "API integration",
      "Database management",
      "Security enhancements",
      "Performance optimization",
      "Regular updates and maintenance",
    ],
  },
];

// Keep in step with `experience` in src/app/(site)/_lib/content.ts.
export const experienceHistory = [
  {
    companyName: "FUJIFILM Biotechnologies",
    location: "Remote (contract)",
    position: "Senior Full Stack Engineer",
    startDate: "Apr 2026",
    endDate: "Current",
    highlights: [
      "Build internal platforms, several with automated workflows, that make everyday work smoother for the teams using them.",
      "TypeScript end to end: React and Next.js up front, Node, Express and Fastify on AWS (ECS, Lambda, S3, API Gateway).",
    ],
    responsibilities: [
      "Build internal platforms, several with automated workflows, that make everyday work smoother for the teams using them.",
      "TypeScript end to end: React and Next.js up front, Node, Express and Fastify on AWS (ECS, Lambda, S3, API Gateway).",
      "Ship in agile sprints alongside the teams that use the tools.",
    ],
  },
  {
    companyName: "Appify Visions",
    location: "New York, NY",
    position: "Founder",
    startDate: "2019",
    endDate: "Current",
    highlights: [
      "My own studio: websites, apps and AI tools for startups and small businesses, from first call to launch.",
      "Started in college in 2019; registered as Appify Visions Group LLC in March 2026.",
    ],
    responsibilities: [
      "My own studio: websites, apps and AI tools for startups and small businesses, from first call to launch.",
      "Started in college in 2019; registered as Appify Visions Group LLC in March 2026.",
    ],
  },
  {
    companyName: "Gambit Dev LLC",
    location: "Long Island City, NY",
    position: "Full Stack Developer",
    startDate: "Feb 2023",
    endDate: "Mar 2026",
    // A short pick from `responsibilities`, shown on the About page.
    highlights: [
      "Pioneered the use of TypeScript in web application development, achieving a 30% reduction in code maintenance efforts.",
      "Cut operational expenses by 20% by implementing AWS Lambda and API Gateway for serverless architecture.",
      "Integrated AI models, leveraging LLM expertise to enhance application capabilities by 35%, improving user interaction.",
    ],
    responsibilities: [
      "Pioneered the use of TypeScript in web application development, achieving a 30% reduction in code maintenance efforts.",
      "Revolutionized user interface creation with custom React UI Components, boosting user retention by 25% across platforms.",
      "Optimized data management using MongoDB and Prisma, improving database performance by 25%.",
      "Boosted application performance and scalability by 50% and 30%, respectively, via strategic integration of AWS cloud services.",
      "Cut operational expenses by 20% by implementing AWS Lambda and API Gateway for serverless architecture.",
      "Employed Redux for state management in React apps, streamlining state handling and reducing debugging time by 30%.",
      "Decreased deployment issues by 25% using Docker for consistent environments across development, testing, and production.",
      "Increased customer satisfaction by 20% and accessibility compliance by 30% through collaboration on React-based interfaces.",
      "Integrated AI models, leveraging LLM expertise to enhance application capabilities by 35%, improving user interaction.",
    ],
  },
  {
    companyName: "New Yorkers International",
    location: "Queens, NY",
    position: "Full Stack Engineer",
    startDate: "May 2020",
    endDate: "Jan 2023",
    highlights: [
      "Increased user engagement by 40% through React, TypeScript, and Next.js, enhancing UI/UX and overall performance.",
      "Reduced server response times by 50% and improved reliability by 30% with a microservices architecture transition.",
      "Built cross-platform mobile apps with React Native, contributing to a 25% increase in mobile user engagement.",
    ],
    responsibilities: [
      "Increased user engagement by 40% through React, TypeScript, and Next.js, enhancing UI/UX and overall performance.",
      "Reduced server response times by 50% and improved reliability by 30% with a microservices architecture transition.",
      "Managed backend services using Node.js/Express and Django, achieving a 50% increase in application processing speed.",
      "Constructed robust testing frameworks with Jest and Selenium, reducing software anomalies by 35% post-launch.",
      "Delivered over 10 significant product enhancements, collaborating with diverse teams.",
      "Automated complex workflows using Python, saving the team 20 hours monthly in manual tasks.",
      "Orchestrated AWS RDS instances for PostgreSQL, ensuring 99.99% uptime and robust data replication and backup solutions.",
      "Advocated for code quality and team growth through mentorship and regular code reviews.",
      "Built cross-platform mobile apps with React Native, contributing to a 25% increase in mobile user engagement.",
    ],
  },
  {
    companyName: "New Yorkers International",
    location: "Queens, NY",
    position: "SW Engineering Intern",
    startDate: "Oct 2019",
    endDate: "Apr 2020",
    highlights: [
      "Refined SQL queries in collaboration with database specialists, achieving a 30% increase in database throughput.",
      "Formulated innovative data processing algorithms, improving the accuracy and speed of Tableau report generation.",
    ],
    responsibilities: [
      "Boosted system efficiency by 25% through comprehensive software testing and optimization.",
      "Refined SQL queries in collaboration with database specialists, achieving a 30% increase in database throughput.",
      "Formulated innovative data processing algorithms, improving the accuracy and speed of Tableau report generation.",
      "Facilitated the completion of 7 critical projects with key insights in data analysis and software evaluation.",
      "Recommended and executed system enhancements, contributing to three significant software updates.",
      "Streamlined operational processes, assisting in the development of system improvements.",
    ],
  },
];

// Grouped by where each tool sits in the stack (About page, #skills).
export const toolkit = [
  {
    area: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML & CSS"],
  },
  {
    area: "Backend",
    tools: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB"],
  },
  {
    area: "Mobile",
    tools: ["React Native", "Expo"],
  },
  {
    area: "Cloud & tooling",
    tools: ["AWS", "Docker", "Git & GitHub", "Figma"],
  },
];

export const certifications = [
  {
    title: "IBM Full Stack Software Developer Professional Certificate",
    certs: [
      "Introduction to Cloud Computing",
      "Introduction to Web Development with HTML, CSS, JavaScript",
      "Introduction to Containers w/Docker, Kubernetes & OpenShift",
      "Getting Started with Git and GitHub",
      "Developing Front-End Apps with React",
      "Developing Back-End Apps with Node.js and Express",
      "Developing AI Applications with Python and Flask",
      "Application Development Using Microservices and Serverless",
      "Python for Data Science, AI, & Development",
      "Django Application Development with SQL and Databases",
      "Generative AI: Introduction",
    ],
    institution: "IBM",
  },
  {
    title: "AWS Certified Developer – Associate",
    institution: "AWS",
    status: "In Progress",
  },
];

export const achievements = [
  {
    description: "Application Performance Optimization",
    impact:
      "Improved application performance by 25%, increasing user capacity through critical code refactoring and optimization.",
  },
  {
    description: "Team Leadership and Project Delivery",
    impact:
      "Led a team of 8 developers, delivering 15 feature-rich releases on time, achieving 95% stakeholder satisfaction.",
  },
  {
    description: "Cloud Infrastructure Migration",
    impact:
      "Reduced operational costs by 20% and enhanced scalability by migrating legacy systems to AWS cloud infrastructure.",
  },
  {
    description: "Full-Stack Feature Development",
    impact:
      "Boosted annual revenue by 30% by designing full-stack features with React, Node.js, and MongoDB.",
  },
  {
    description: "Team Productivity Enhancement",
    impact:
      "Enhanced team productivity by 35% and shortened onboarding time through mentoring and training junior developers.",
  },
  {
    description: "Scalability Solution Implementation",
    impact:
      "Solved a scalability issue, improving system resilience and increasing traffic handling capacity by 40% with microservices.",
  },
  {
    description: "Data-Driven Decision Making",
    impact:
      "Developed a custom analytics dashboard, increasing marketing ROI by 20% with real-time data visualization insights.",
  },
];

export const education = [
  {
    institution: "New York City College of Technology (NYCCT)",
    degree: "Bachelor of Technology in Computer Systems Technology",
    graduationYear: 2023,
  },
];

export const skillsIcons = [
  { title: "React", progress: "95%" },
  { title: "JavaScript", progress: "95%" },
  { title: "HTML5", progress: "95%" },
  { title: "CSS3", progress: "95%" },
  { title: "Github", progress: "95%" },
  { title: "Git", progress: "95%" },
  { title: "Python", progress: "95%" },
  { title: "Node.js", progress: "95%" },
  { title: "AWS Lambda & API Gateway", progress: "95%" },
  { title: "Figma", progress: "95%" },
];

export const projects = [
  {
    title: "Portfolio",
    category: "Portfolio",
    demoUrl: "https://www.olivermorla.com/",
    imageUrl: "/assets/images/portfolio/olivermorla.webp",
    sourceCodeUrl: null,
    description:
      "My personal portfolio website built with Next.js, Tailwind CSS, and TypeScript.",
  },
  {
    title: "Mind Body Shift",
    category: "Health & Wellness",
    demoUrl: "https://www.mindbodyshift.net/",
    imageUrl: "/assets/images/portfolio/mindbodyshift.webp",
    sourceCodeUrl: null,
    description:
      "Transform your lifestyle with Mind Body Shift's personalized coaching, MBS Portal, and courses on nutrition, exercise mastery, and mental health.",
  },
  {
    title: "Johnny Luna",
    category: "Portfolio",
    demoUrl: "https://www.johnnyluna.com/",
    imageUrl: "/assets/images/portfolio/johnnyluna.webp",
    sourceCodeUrl: null,
    description:
      "Portfolio website for Johnny Luna built with Next.js, Tailwind CSS, and TypeScript.",
  },
  {
    title: "Gambit Dev",
    category: "Gaming & eSports",
    demoUrl: "https://www.gambit.dev/",
    imageUrl: "/assets/images/portfolio/gambitdev.webp",
    sourceCodeUrl: null,
    description:
      "Here at Gambit Dev, we strive to deliver the best, innovate where others have not, and to create a fun and enjoyable workplace for our employees and clients.",
  },
  {
    title: "Elemental Roofing Solutions",
    category: "Business & Finance",
    demoUrl: "https://www.elementalroofsolutions.com/",
    imageUrl: "/assets/images/portfolio/elementalroofsolutions.webp",
    sourceCodeUrl: null,
    description:
      "Elemental is more than a roofing company. As a family-owned business rooted in integrity and craftsmanship, we bring over two decades of expertise to every project.",
  },
  {
    title: "Around Your Way Fitness",
    category: "Health & Wellness",
    demoUrl: "https://www.aroundyourwayfitness.com/",
    imageUrl: "/assets/images/portfolio/aroundyourwayfitness.webp",
    sourceCodeUrl: null,
    description:
      "A comprehensive fitness platform tailored for a personal trainer to deliver accessible fitness services.",
  },
  {
    title: "Crunch Fitness - Utilities",
    category: "Business & Finance",
    demoUrl: "https://www.crunchfitness.app/",
    imageUrl: "/assets/images/portfolio/crunch-utilities.webp",
    sourceCodeUrl: null,
    description:
      "Crunch Fitness Utilities is a suite of tools designed to streamline operations and enhance the customer experience at Crunch Fitness.",
  },
  {
    title: "Bed.gg",
    category: "Gaming & eSports",
    demoUrl: "https://bed.gg/",
    imageUrl: "/assets/images/portfolio/bedgg.webp",
    sourceCodeUrl: null,
    description: "Experience Competitive Minecraft like never before",
  },
  {
    title: "Quip.gg",
    category: "Gaming & eSports",
    demoUrl: "https://quip.gg/",
    imageUrl: "/assets/images/portfolio/quipgg.webp",
    description: "Crypto e-sports. Real money gaming. Competitive Experience.",
    sourceCodeUrl: null,
  },
  {
    title: "Rohan Hossain",
    category: "Portfolio",
    demoUrl: "https://www.rohanhossain.com/",
    imageUrl: "/assets/images/portfolio/rohanhossain.webp",
    sourceCodeUrl: null,
    description:
      "A personal portfolio website designed to showcase skills, experiences, and projects of a data engineer and developer.",
  },
  {
    title: "Tasmiah Chowdhury",
    category: "Portfolio",
    demoUrl: "https://tasmiahch.com/",
    imageUrl: "/assets/images/portfolio/tasmiahch.webp",
    sourceCodeUrl: null,
    description:
      "A professional real estate portfolio platform designed to elevate the personal brand and services of a licensed realtor in New York City.",
  },
];

export const personalProjects = [
  {
    title: "Hollister Clone",
    description:
      "Devised a high-caliber, responsive e-commerce platform mirroring Hollister, utilizing ReactJS, NextJS, TypeScript, and Framer-Motion, delivering an exceptional UI/UX.",
    imageUrl: "/assets/portfolio/hollisterclone.webp",
    category: "E-commerce",
    demoUrl: "https://hollister-clone.vercel.app/",
    sourceCodeUrl: "https://github.com/OliverMorla/hollister-clone",
  },
  {
    title: "Threads Clone",
    imageUrl: "/assets/portfolio/threads-clone-login.webp",
    description:
      'Developed a dynamic social media platform, "Threads-Clone," using a MERN stack, incorporating MongoDB, NextJS 14 with server actions, React, and Tailwind CSS, showcasing state-of-the-art web development practices.',
    category: "Social Media",
    sourceCodeUrl: "https://github.com/OliverMorla/threads-clone",
    demoUrl: "https://threads-clone-two-amber.vercel.app/",
  },
  {
    title: "NextBlogs",
    description:
      "A blog website built with Next.js, Tailwind CSS, and TypeScript.",
    imageUrl: "/assets/portfolio/nextblogs.webp",
    category: "Blog",
    demoUrl: "https://nextblogs-olivermorla.vercel.app/",
    sourceCodeUrl: "https://github.com/OliverMorla/nextblogs",
  },
  {
    title: "PyNotes",
    description:
      "A note-taking application built with Python, Django, and SQLite.",
    imageUrl: "/assets/portfolio/pynotes.webp",
    category: "Blog",
    demoUrl: "https://github.com/OliverMorla/pynotes",
    sourceCodeUrl: "https://github.com/OliverMorla/pynotes",
  },
  {
    title: "Job Finder",
    description:
      "A job finding application built with React native and Firebase.",
    imageUrl: "/assets/portfolio/job-finder.webp",
    category: "Job Finder",
    demoUrl: "https://github.com/OliverMorla/job-finder",
    sourceCodeUrl: "https://github.com/OliverMorla/job-finder",
  },
];

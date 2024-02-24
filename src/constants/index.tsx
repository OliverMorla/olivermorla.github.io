import {
  faAws,
  faCss3,
  faFigma,
  faGit,
  faGithub,
  faHtml5,
  faInstagram,
  faJs,
  faLinkedin,
  faNodeJs,
  faPython,
  faReact,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";

const navPrimaryLinks = [
  {
    title: "Home",
    pathUrl: "/",
    iconUrl: "",
  },
  {
    title: "About",
    pathUrl: "#about",
    fontAwesomeIconUrl: faArrowAltCircleDown,
  },
  {
    title: "Skills",
    pathUrl: "#skills",
    iconUrl: "",
  },
  {
    title: "Blog",
    pathUrl: "/blog",
    iconUrl: "",
  },
  {
    title: "Portfolio",
    pathUrl: "#portfolio",
    iconUrl: "",
  },
  {
    title: "Services",
    pathUrl: "#services",
    iconUrl: "",
  },
  {
    title: "Contact",
    pathUrl: "#contact",
    iconUrl: "",
  },
];

const footerPrimaryLinks = [
  {
    title: "Home",
    pathUrl: "/",
  },
  {
    title: "About",
    pathUrl: "#about",
  },
  {
    title: "Skills",
    pathUrl: "#skills",
  },
  {
    title: "Blog",
    pathUrl: "/blog",
  },
  {
    title: "Portfolio",
    pathUrl: "#portfolio",
  },
  {
    title: "Services",
    pathUrl: "#services",
  },
  {
    title: "Contact",
    pathUrl: "#contact",
  },
];

const socialLinks = [
  {
    title: "GitHub",
    pathUrl: "https://github.com/OliverMorla",
    iconUrl: faGithub,
  },
  {
    title: "LinkedIn",
    pathUrl: "https://www.linkedin.com/in/oliver-morla/",
    iconUrl: faLinkedin,
  },
  {
    title: "Twitter",
    pathUrl: "https://twitter.com/OliverMorla",
    iconUrl: faTwitter,
  },
  {
    title: "Instagram",
    pathUrl: "https://www.instagram.com/oliverm11_/",
    iconUrl: faInstagram,
  },
];

const listOfServices = [
  {
    title: "Web Development",
    fontAwesomeIconUrl: faReact,
    description:
      "Expert web developer who specializes in building and maintaining high-quality websites and web-based applications.",
  },
  {
    title: "App Development",
    fontAwesomeIconUrl: faJs,
    description:
      "Experienced application developer who specializes in creating custom software solutions for businesses.",
  },
  {
    title: "UI/UX Design",
    fontAwesomeIconUrl: faFigma,
    description:
      "Creative UI/UX designer who specializes in creating unique and engaging user experiences for digital products.",
  },
];

const experienceHistory = [
  {
    companyName: "Gambit Dev LLC",
    location: "Long Island City, NY",
    position: "Full Stack Developer",
    startDate: "Feb 2023",
    endDate: "Current",
    responsibilities: [
      "Pioneered the use of TypeScript in web application development, achieving a 30% reduction in code maintenance efforts.",
      "Revolutionized user interface creation with React, boosting user retention by 25% across platforms.",
      "Optimized data management using MongoDB and Mongoose, improving database performance by 25%.",
      "Boosted application performance and scalability by 50% and 30%, respectively, via strategic integration of AWS cloud services.",
      "Cut operational expenses by 20% by implementing AWS Lambda and API Gateway for serverless architecture.",
      "Employed Redux for state management in React apps, streamlining state handling and reducing debugging time by 30%.",
      "Applied Docker for containerization of React/Node.js applications, ensuring consistency across development, testing, and production environments and reducing deployment issues by 25%.",
      "Collaborated with design teams to create React-based interfaces, improving customer satisfaction by 20% and compliance with accessibility standards by 30%.",
    ],
  },
  {
    companyName: "SR Tech",
    location: "Queens, NY",
    position: "Full Stack Engineer",
    startDate: "May 2020",
    endDate: "Jan 2023",
    responsibilities: [
      "Developed high-impact web applications using React, TypeScript, and Next.js, which improved user engagement by 40% due to superior UI/UX designs.",
      "Drove the transition to a microservices architecture, halving server response times, enhancing reliability by 30%, and significantly boosting system scalability and maintainability.",
      "Managed backend services using Node.js/Express and Django, achieving a 50% increase in application processing speed.",
      "Constructed robust testing frameworks with Jest and Selenium, reducing software anomalies by 35% post-launch.",
      "Delivered over 10 significant product enhancements, collaborating effectively with diverse teams.",
      "Automated complex workflows using Python, saving the team 20 hours monthly in manual tasks.",
      "Orchestrated AWS RDS instances for PostgreSQL, ensuring 99.99% uptime and robust data replication and backup solutions.",
      "Advocated for code quality and team growth through mentorship and regular code reviews.",
      "Built cross-platform mobile apps with React Native, contributing to a 25% increase in mobile user engagement.",
    ],
  },
  {
    companyName: "SR Tech",
    location: "Queens, NY",
    position: "Software Engineering Intern",
    startDate: "Oct 2019",
    endDate: "Apr 2020",
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

const certifications = [
  {
    title: "IBM Full Stack Software Developer Professional Certificate",
    certs: [
      "Introduction to Cloud Computing",
      "Introduction to Web Development with HTML, CSS, JavaScript",
      "Introduction to Containers w/Docker, Kubernetes & OpenShift",
      "Getting Started with Git and GitHub",
      "Developing Front-End Apps with React",
      "Developing Back-End Apps with Node.js and Express",
      "Python for Data Science, AI, & Development",
      "Django Application Development with SQL and Databases",
    ],
    institution: "IBM",
  },
  {
    title: "AWS Certified Developer – Associate",
    status: "In Progress",
  },
];

const achievements = [
  {
    description: "Optimized Application Performance",
    impact:
      "Increased existing application performance by refactoring critical code sections, resulting in a 25% increase in concurrent user capacity.",
  },
  {
    description: "Led Cross-Functional Teams",
    impact:
      "Led a team of 8 developers and collaborated with UX/UI designers and product managers to deliver over 15 feature-rich releases on schedule, maintaining a 95% satisfaction rating from stakeholders.",
  },
  {
    description: "Cloud Infrastructure Optimization",
    impact:
      "Successfully migrated legacy systems to AWS, achieving a 20% reduction in operational costs and significant improvements in scalability and reliability.",
  },
  {
    description: "Crafted Full-Stack Features",
    impact:
      "Played a key role in designing and implementing full-stack features using React, Node.js, and MongoDB, contributing to a 30% increase in annual revenue for a flagship product.",
  },
  {
    description: "Mentored and Trained Junior Developers",
    impact:
      "Heightened team productivity by 35% and significantly reduced onboarding time for new team members by mentoring and training junior developers.",
  },
  {
    description: "Innovative Problem-Solving",
    impact:
      "Solved a critical scalability issue by implementing a microservices architecture, improving system resilience, and facilitating a 40% increase in traffic handling capacity.",
  },
  {
    description: "Data-Driven Decision Making",
    impact:
      "Developed a custom analytics dashboard with real-time data visualization, enabling data-driven decision-making and contributing to a 20% increase in marketing ROI.",
  },
];

const education = [
  {
    institution: "New York City College of Technology (NYCCT)",
    degree: "Bachelor of Technology in Computer Systems Technology",
    graduationYear: "Already Graduated",
  },
];

const skillsIcons = [
  {
    title: "React",
    progress: "95%",
    fontAwesomeIconUrl: faReact,
  },
  {
    title: "JavaScript",
    progress: "95%",
    fontAwesomeIconUrl: faJs,
  },
  {
    title: "HTML5",
    progress: "95%",
    fontAwesomeIconUrl: faHtml5,
  },
  {
    title: "CSS3",
    progress: "95%",
    fontAwesomeIconUrl: faCss3,
  },
  {
    title: "Github",
    progress: "95%",
    fontAwesomeIconUrl: faGithub,
  },
  {
    title: "Git",
    progress: "95%",
    fontAwesomeIconUrl: faGit,
  },
  {
    title: "Python",
    progress: "95%",
    fontAwesomeIconUrl: faPython,
  },
  {
    title: "Node.js",
    progress: "95%",
    fontAwesomeIconUrl: faNodeJs,
  },
  {
    title: "AWS Lambda & API Gateway",
    progress: "95%",
    fontAwesomeIconUrl: faAws,
  },
  {
    title: "Figma",
    progress: "95%",
    fontAwesomeIconUrl: faFigma,
  },
];

const portfolioImages = [
  {
    imageUrl: "/assets/portfolio/portfolio.webp",
    title: "Portfolio",
    description: "",
    projectType: "Portfolio",
    sourceCodeUrl: "https://github.com/OliverMorla/olivermorla.github.io",
    demoUrl: "https://www.olivermorla.com/",
  },
  {
    imageUrl: "/assets/portfolio/hollister-clone.webp",
    title: "Hollister Clone",
    description:
      "Devised a high-caliber, responsive e-commerce platform mirroring Hollister, utilizing ReactJS, NextJS, TypeScript, and Framer-Motion, delivering an exceptional UI/UX.",
    projectType: "E-commerce",
    sourceCodeUrl: "https://github.com/OliverMorla/hollister-clone",
    demoUrl: "https://hollister-clone.vercel.app/",
  },
  {
    imageUrl: "/assets/portfolio/threads-clone-login.webp",
    title: "Threads Clone",
    description:
      'Developed a dynamic social media platform, "Threads-Clone," using a MERN stack, incorporating MongoDB, NextJS 14 with server actions, React, and Tailwind CSS, showcasing state-of-the-art web development practices.',
    projectType: "Social Media",
    sourceCodeUrl: "https://github.com/OliverMorla/threads-clone",
    demoUrl: "https://threads-clone-two-amber.vercel.app/",
  },
];

export {
  navPrimaryLinks,
  footerPrimaryLinks,
  socialLinks,
  listOfServices,
  experienceHistory,
  achievements,
  certifications,
  education,
  skillsIcons,
  portfolioImages,
};

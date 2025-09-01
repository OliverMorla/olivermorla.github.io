import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  fields: [
    {
      name: "position",
      type: "number",
      min: 1,
      admin: {
        position: "sidebar",
        description: "This is used to sort the projects from least to greatest",
      },
    },
    {
      name: "title",
      type: "text",
      admin: {
        description: "Optional, if you want to add a title to the project.",
      },
    },
    {
      name: "category",
      type: "select",
      // List categories to match projects of web dev, mobile dev, etc.
      options: [
        "Web Development",
        "Mobile Development",
        "Software Development",
        "Portfolio",
        "eCommerce",
        "Landing Page",
        "SaaS",
        "Blog",
        "Other",
      ],
      admin: {
        description: "Optional, if you want to add a category to the project.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      admin: {
        description:
          "If you want to feature this project on the homepage, check this box.",
      },
    },
    {
      name: "link",
      type: "text",
      admin: {
        description: "Optional, if you want to add a link to the project.",
      },
    },
    {
      name: "status",
      type: "select",
      options: ["Completed", "In Progress", "On Hold", "Cancelled"],
      admin: {
        description: "Optional, if you want to add a status to the project.",
      },
    },
    {
      name: "startedAt",
      type: "date",
      admin: {
        description: "For example: 2024-01-01",
      },
    },
    {
      name: "completedAt",
      type: "date",
      admin: {
        description: "For example: 2024-01-01",
      },
    },
    {
      name: "stack",
      type: "select",
      options: [
        "All",
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "SQLite",
        "Git",
        "GitHub",
        "Redis",
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "Azure - App Service",
        "Azure - Storage",
        "Azure - Functions",
        "Firebase",
        "Supabase",
        "Vercel",
        "Cloudflare",
        "Cloudflare R2",
        "PostHog",
        "Plausible",
        "Google Analytics",
        "OpenAI",
        "Stripe",
        "Resend",
        "Mailjet",
        "AWS - S3",
        "AWS - Lambda",
        "AWS - API Gateway",
        "AWS - CloudFront",
      ],
      hasMany: true,
      admin: {
        description: "Optional, if you want to add a stack to the project.",
      },
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        description:
          "Optional, if you want to add a description to the project.",
      },
    },
    {
      name: "audience",
      type: "select",
      options: ["Client", "Personal"],
      admin: {
        description: "Optional, if you want to add a publicity to the project.",
      },
    },
  ],
};

// import { faPresetIconsKeys } from "@/constants";

import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  fields: [
    {
      name: "position",
      type: "number",
      min: 1,
      admin: {
        position: "sidebar",
        description:
          "This is used to sort the services from least to greatest, for example: Service 1, Service 2, Service 3, etc.",
      },
    },

    {
      name: "title",
      type: "text",
      required: true,
    },

    {
      name: "subtitle",
      type: "text",
      admin: {
        description:
          "This is used to add a subtitle to the service. The subtitle is optional and it's located below the title.",
      },
    },
    {
      name: "price",
      type: "text",
      admin: {
        description:
          "This is used to add a price to the service. The price is optional and it's located below the subtitle.",
      },
    },
    {
      name: "tags",
      type: "select",
      options: [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "Node.js",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "SQLite",
        "Docker",
        "Kubernetes",
        "AWS",
      ],
      admin: {
        description:
          "This is used to add tags to the service. The tags are optional and they're located below the price.",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "benefits",
      type: "array",
      fields: [
        {
          name: "benefit",
          type: "text",
        },
      ],
    },
  ],
};

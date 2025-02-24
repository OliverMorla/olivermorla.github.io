import type { CollectionConfig } from "payload";

export const Experience: CollectionConfig = {
  slug: "experience",
  fields: [
    {
      name: "position",
      type: "text",
      required: true,
    },
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "startDate",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      type: "date",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "roles",
      type: "array",
      fields: [
        {
          name: "role",
          type: "text",
        },
      ],
    },
  ],
};

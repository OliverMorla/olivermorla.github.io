import type { CollectionConfig } from "payload";

export const Images: CollectionConfig = {
  slug: "images",
  fields: [
    {
      name: "title",
      type: "text",
      admin: {
        description: "Optional, if you want to add a title to the image.",
      },
    },
    {
      name: "position",
      type: "number",
      min: 1,
      admin: {
        position: "sidebar",
        description:
          "This is used to sort the process from least to greatest, for example: Process 1, Process 2, Process 3, etc.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        description: "Optional, if you want to add a description to the image.",
      },
    },
    {
      name: "page",
      type: "relationship",
      relationTo: "pages",
      hasMany: true,
    },
  ],
};

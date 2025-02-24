import type { CollectionConfig } from "payload";

export const Resume: CollectionConfig = {
  slug: "resume",
  fields: [
    {
      name: "document",
      type: "upload",
      relationTo: "documents",
      admin: {
        description: "Upload a PDF document",
      },
    },
    {
      name: "content",
      type: "richText",
      admin: {
        description: "Write down the resume content",
      },
    },
  ],
};

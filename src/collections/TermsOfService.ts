import type { CollectionConfig } from "payload";

export const TermsOfService: CollectionConfig = {
  slug: "terms-of-service",
  admin: {
    description:
      "NOTE: Choose one, for example a PDF or a written-version of Terms of Service",
  },
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
        description: "Write down the terms of service content",
      },
    },
  ],
};

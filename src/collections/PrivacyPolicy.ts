import type { CollectionConfig } from "payload";

export const PrivacyPolicy: CollectionConfig = {
  slug: "privacy-policy",
  admin: {
    description:
      "NOTE: Choose one, for example a PDF or a written-version of Privacy Policy",
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
        description: "Write down the privacy policy content",
      },
    },
  ],
};

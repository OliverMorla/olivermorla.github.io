import type { CollectionConfig } from "payload";

export const FAQ: CollectionConfig = {
  slug: "faq",
  admin: {
    useAsTitle: "question",
  },
  fields: [
    {
      name: "question",
      type: "text",
    },
    {
      name: "answer",
      type: "textarea",
    },
    {
      name: "position",
      type: "number",
      min: 1,
      admin: {
        position: "sidebar",
        description: "This is used to sort the faqs from least to greatest",
      },
    },
  ],
};

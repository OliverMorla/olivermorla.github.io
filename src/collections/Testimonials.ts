import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  fields: [
    {
      name: "position",
      type: "number",
      min: 1,
      admin: {
        position: "sidebar",
        description:
          "This is used to sort the testimonials from least to greatest",
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
      admin: {
        placeholder: "Queens, NY",
      },
      defaultValue: "New York, US",
    },
    {
      name: "role",
      type: "text",
      admin: {
        placeholder: "Software Engineer",
      },
    },
    {
      name: "company",
      type: "text",
      admin: {
        placeholder: "Google",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
  ],
};

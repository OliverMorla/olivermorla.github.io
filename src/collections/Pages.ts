import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "route",
  },
  fields: [
    {
      name: "title",
      admin: {
        description: "The title of the page, for example: About",
      },
      type: "text",
    },
    {
      name: "route",
      admin: {
        description: "The route of the page, for example: /about",
      },
      type: "text",

    },
  ],
};

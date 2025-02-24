import type { CollectionConfig } from "payload";

export const Logo: CollectionConfig = {
  slug: "logo",
  access: {
    read: () => true,
  },
  upload: true,
  fields: [],
};


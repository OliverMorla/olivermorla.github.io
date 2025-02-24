import type { CollectionConfig } from "payload";

export const Documents: CollectionConfig = {
  slug: "documents",
  access: {
    read: () => true,
  },
  upload: true,
  fields: [],
};

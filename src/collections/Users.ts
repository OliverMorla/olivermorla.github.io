import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "name",
      type: "text",
      admin: {
        placeholder: "John Doe",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
};

import type { CollectionConfig } from "payload";
import { revalidatePaths } from "./hooks/revalidate";

export const Resume: CollectionConfig = {
  slug: "resume",
  hooks: revalidatePaths(["/resume"]),
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

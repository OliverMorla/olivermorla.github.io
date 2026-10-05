import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  RequestContext,
} from "payload";

const revalidate = (paths: readonly string[], context: RequestContext) => {
  // Seed scripts and migrations can opt out with `context.disableRevalidate`.
  if (context.disableRevalidate) return;

  for (const path of paths) {
    try {
      revalidatePath(path);
    } catch {
      // Outside a Next.js request (e.g. the Payload CLI) there is no cache to
      // invalidate; the next build or ISR window picks the change up.
    }
  }
};

/**
 * Collection hooks that refresh the pages rendering a collection as soon as an
 * editor saves or deletes a document, instead of waiting for the ISR window.
 */
export const revalidatePaths = (paths: readonly string[]) => {
  const afterChange: CollectionAfterChangeHook = ({ doc, req }) => {
    revalidate(paths, req.context);
    return doc;
  };

  const afterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
    revalidate(paths, req.context);
    return doc;
  };

  return { afterChange: [afterChange], afterDelete: [afterDelete] };
};

import Link from "next/link";
import type { Metadata } from "next";
import { payload } from "@/lib/payload";
import {
  type JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
});

export const metadata: Metadata = {
  title: "Resume",
  description: "Learn more about my skills and experiences",
};

const Resume = async () => {
  // Get the data from CMS
  const data = await payload.find({ collection: "resume" });

  // Check if the document exist
  const doesDocumentExist =
    data.docs?.[0]?.document && typeof data?.docs?.[0]?.document === "object";

  // Check if the content exist
  const doesContentExist = !!data.docs?.[0]?.content?.root.children.length;
  if (!doesContentExist && !doesDocumentExist) {
    return (
      <main className="relative flex flex-col items-center justify-center gap-6 min-h-screen h-full w-full text-neutral-900 dark:text-neutral-100 sm:pt-[78px]">
        <div className="container mx-auto p-8 max-sm:p-4 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold">No content found</h1>
            <p className="text-neutral-600">
              We are currently working on this page. Please check back later or{" "}
              <Link href="/contact" className="text-blue-500">
                contact us
              </Link>{" "}
              for more information.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col gap-6 min-h-screen h-full w-full text-neutral-900 dark:text-neutral-100 sm:pt-[78px]">
      {doesDocumentExist && (
        <iframe
          src={
            typeof data.docs[0].document === "object"
              ? String(data.docs[0]?.document?.url)
              : ""
          }
          loading="lazy"
          allowFullScreen
          className="w-full h-screen"
        />
      )}
      {doesContentExist && (
        <RichText
          converters={jsxConverters}
          className="prose dark:prose-invert mx-auto py-24"
          data={data.docs[0].content as SerializedEditorState}
        />
      )}
    </main>
  );
};

export default Resume;

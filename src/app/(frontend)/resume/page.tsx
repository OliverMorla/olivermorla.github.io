import ButtonLink from "@/components/ui/button-link";
import { getResume } from "@/lib/payload/server/queries";
import { contactEmail } from "@/modules/app/lib/constants";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Download } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Oliver Morla's experience, skills and education.",
  alternates: { canonical: "/resume" },
};

// Statically generated; resume edits in the CMS revalidate it immediately.
export const revalidate = 14400; // 4 hours

export default async function ResumePage() {
  const resume = await getResume();

  const documentUrl =
    resume?.document && typeof resume.document === "object"
      ? resume.document.url
      : null;
  const hasContent = !!resume?.content?.root.children.length;

  return (
    <div className="bg-gradient-none min-h-svh px-4 pt-28 pb-24 sm:px-8">
      <div className="container mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="title">Resume</h1>
            <p className="text-muted">
              Experience, skills and education at a glance.
            </p>
          </div>
          {documentUrl && (
            <ButtonLink
              href={documentUrl}
              variant="solidDark"
              download
              prefetch={false}
              className="w-full sm:w-fit"
            >
              <Download aria-hidden className="size-4" />
              Download PDF
            </ButtonLink>
          )}
        </div>

        {documentUrl && (
          <iframe
            src={documentUrl}
            title="Oliver Morla's resume (PDF)"
            loading="lazy"
            className="h-[80svh] w-full rounded-xl border border-neutral-200 bg-white dark:border-neutral-800"
          />
        )}

        {hasContent && (
          <RichText
            className="prose dark:prose-invert max-w-none"
            data={resume.content as SerializedEditorState}
          />
        )}

        {!documentUrl && !hasContent && (
          <div className="flex flex-col items-start gap-4 rounded-xl border border-dashed border-neutral-300 p-8 dark:border-neutral-700">
            <h2 className="text-xl font-semibold">
              The resume isn&apos;t published yet.
            </h2>
            <p className="text-muted max-w-prose">
              Email me and I&apos;ll send you a copy, or book a call to talk
              through my experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href={`mailto:${contactEmail}?subject=Resume request`}
                variant="solidDark"
              >
                Email me
              </ButtonLink>
              <ButtonLink href="/schedule">Book a 15-min call</ButtonLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

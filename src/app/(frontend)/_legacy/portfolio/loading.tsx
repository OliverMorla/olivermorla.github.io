import {
  ProjectGridSkeleton,
  SectionTitleSkeleton,
} from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="bg-gradient-none flex min-h-svh flex-col px-4 pt-28 pb-24 sm:px-8">
      <div className="container mx-auto flex flex-col gap-16">
        <SectionTitleSkeleton />
        <ProjectGridSkeleton />
      </div>
    </div>
  );
}

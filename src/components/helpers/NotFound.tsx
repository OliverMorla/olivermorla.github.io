import React from "react";
import type { Metadata } from "next";
import ButtonLink from "../shared/ui/ButtonLink";
import AnimatedDiv from "./AnimatedDiv";

export const metadata: Metadata = {
  title: "404, Not Found",
  description:
    "The page you are looking for doesn&#39;t exist or has been moved. Please go back to the homepage.",
};

interface NotFoundProps extends React.ComponentPropsWithoutRef<"div"> {
  redirectUrl?: string;
  redirectTitle?: string;
  description?: string;
  title?: string;
}

const NotFound = async ({
  redirectUrl = "/",
  redirectTitle = "Go Home",
  description = "The page you are looking for doesn't exist or has been moved. Please go back to the homepage.",
}: NotFoundProps) => {
  return (
    <main className="relative flex flex-col items-center justify-center gap-6 p-8 max-sm:p-4 bg-neutral-100 dark:bg-neutral-900 w-full">
      <AnimatedDiv className="flex flex-col items-center justify-center gap-6 h-screen">
        <div className="text-center">
          <h1 className="text-7xl max-2xl:text-6xl max-xl:text-5xl max-lg:text-5xl max-md:text-4xl font-extrabold">
            404
          </h1>
          <p className="text-sm opacity-60">Not Found</p>
        </div>
        <p className="w-full text-center">{description}</p>
        <ButtonLink
          href={redirectUrl}
          faPresetIcon="house"
          variant="solidLight"
        >
          {redirectTitle}
        </ButtonLink>
      </AnimatedDiv>
    </main>
  );
};

// export const revalidate = 1800;

export default NotFound;

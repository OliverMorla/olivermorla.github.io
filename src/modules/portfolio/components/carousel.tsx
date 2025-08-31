"use client";

// Import React

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import LazyImage from "@/components/helpers/lazy-image";
import { getImageMediaUrl } from "@/lib/payload/client/utils";
import { Project } from "@/payload-types";
import { cn } from "@/utils/classNames";
import Link from "next/link";
import { ComponentProps } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export type CarouselProps = ComponentProps<typeof Swiper> & {
  projects: Project[];
};

const Carousel = ({ projects, className, ...props }: CarouselProps) => {
  return (
    <Swiper
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={{
        enabled: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className={cn("w-full h-full", className)}
      {...props}
    >
      {projects.map((project, index) => (
        <SwiperSlide key={index}>
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="text-start flex flex-col gap-2">
              <h1 className="text-lg font-medium">{project.title}</h1>
              <p className="text-muted max-sm:text-xs">{project.description}</p>
            </div>
            <div className="bg-neutral-200/25 dark:bg-neutral-800/25 px-3 py-2 rounded-lg text-sm max-sm:text-xs text-nowrap">
              {project.status}
            </div>
          </div>
          <Link
            target="_blank"
            href={project.link ?? "/"}
            className="hover:opacity-60 transition ease-in-out w-full h-full max-h-[calc(100vh-200px)] overflow-hidden"
          >
            {project.images?.[0] && (
              <LazyImage
                src={getImageMediaUrl(project.images[0])}
                width={1024}
                height={1024}
                alt="photo"
                className="w-full max-h-[calc(100vh-200px)] object-cover object-top rounded-lg"
                wrapperClassName="w-full sm:min-h-[calc(100vh-200px)]"
              />
            )}
          </Link>
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-medium text-sm">
              Category: {project.category}
            </h2>
            <div className="text-sm opacity-60 px-4 py-1.5 rounded-md bg-neutral-100/10 border border-neutral-200/20 my-2">
              {new Date(project.startedAt ?? "01/01/2024").toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                },
              )}
            </div>
          </div>
          {/* <div className="flex items-center justify-between gap-2">
              {project.sourceCodeUrl ? (
                <span>
                  <span className="text-neutral-900 dark:text-neutral-100">
                    Source:
                  </span>
                  <Link
                    href={project.sourceCodeUrl}
                    target="_blank"
                    className="text-blue-500 hover:underline ml-2"
                  >
                    {project.sourceCodeUrl}
                  </Link>
                </span>
              ) : (
                <p className="text-sm opacity-60">Source: Private</p>
              )}
            </div> */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

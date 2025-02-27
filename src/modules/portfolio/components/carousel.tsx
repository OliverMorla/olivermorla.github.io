"use client";

// Import React
import React from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Project } from "@/payload-types";
import Link from "next/link";
import { cn, getImageUrl } from "@/utils";
const Carousel = ({ projects }: { projects: Project[] }) => {
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
    >
      {projects.map((project, index) => (
        <SwiperSlide key={index}>
          <div className="flex items-start justify-between">
            <div className="text-start mb-4">
              <h1 className="text-xl font-medium">{project.title}</h1>
              <p className="text-sm opacity-60">{project.description}</p>
            </div>
            <div
              className={cn(
                "px-4 py-1.5 rounded-full bg-neutral-100/10 border border-neutral-200/20 text-sm",
                project.status === "Completed" && "bg-green-500/10 text-green-500",
                project.status === "In Progress" &&"bg-yellow-500/10 text-yellow-500",
                project.status === "On Hold" && "bg-red-500/10 text-red-500",
                project.status === "Cancelled" && "bg-red-500/10 text-red-500",
              )}
            >
              {project.status}
            </div>
          </div>
          <Link
            target="_blank"
            href={project.link ?? "/"}
            className="hover:opacity-60 transition-all duration-300 ease-in-out"
          >
            <Image
              src={getImageUrl(project.images?.[0])}
              width={1280}
              height={720}
              alt="photo"
              className="w-full h-full object-contain"
            />
          </Link>
          {/* <div className="flex items-center justify-between gap-2">
              <h2 className="font-bold">Category: {project.category}</h2>
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

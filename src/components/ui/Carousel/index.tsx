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
import { projects } from "@/constants";
import Link from "next/link";
const Carousel = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {projects.map((project, index) => (
        <React.Fragment key={index}>
          <SwiperSlide key={index}>
            <div className="text-start">
              <h1 className="text-2xl font-light">{project.title}</h1>
              <p className="text-sm opacity-60">{project.description}</p>
            </div>
            <Link
              href={project.demoUrl}
              target="_blank"
              className="hover:opacity-60 transition-all duration-300 ease-in-out"
            >
              <Image
                src={project.imageUrl ?? "/assets/images/placeholder.jpg"}
                width={1280}
                height={720}
                alt="photo"
                className="w-full h-full object-contain"
              />
            </Link>
            <div className="flex items-center justify-between gap-2">
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
            </div>
          </SwiperSlide>
        </React.Fragment>
      ))}
    </Swiper>
  );
};

export default Carousel;

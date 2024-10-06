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
            <div className="text-center">
              <h1 className="text-2xl font-light">{project.title}</h1>
              <p className="text-sm opacity-60">{project.description}</p>
            </div>
            <Image
              src={project.imageUrl ?? "/assets/images/placeholder.jpg"}
              width={1280}
              height={720}
              alt="photo"
              className="w-full"
            />
            <h2 className="font-bold">Category: {project.category}</h2>
          </SwiperSlide>
        </React.Fragment>
      ))}
    </Swiper>
  );
};

export default Carousel;

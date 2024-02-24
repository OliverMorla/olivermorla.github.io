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

const Carousel = ({ images }: { images: any[] }) => {
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
      {images.map((image, index) => (
        <React.Fragment key={index}>
          <SwiperSlide key={index}>
            <Image
              src={image.imageUrl}
              width={1280}
              height={720}
              alt="photo"
              className="w-full h-full"
            />
            <h2 className="font-bold">Category: {image.projectType}</h2>
          </SwiperSlide>
        </React.Fragment>
      ))}
    </Swiper>
  );
};

export default Carousel;

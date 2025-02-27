"use client";

import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("@/modules/portfolio/components/carousel"), {
  ssr: false,
});

export default Carousel;

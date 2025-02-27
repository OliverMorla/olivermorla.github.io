"use client";

import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("@/components/ui/Carousel"), {
  ssr: false,
});

export default Carousel;

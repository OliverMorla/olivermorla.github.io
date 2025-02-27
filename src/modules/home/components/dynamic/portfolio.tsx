"use client";

import dynamic from "next/dynamic";
import { Loader } from "lucide-react";

const Portfolio = dynamic(() => import("../portfolio"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <Loader className="animate-spin" />
    </div>
  ),
});

export default Portfolio;

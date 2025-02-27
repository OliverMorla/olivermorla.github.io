"use client";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

export const MotionDiv = dynamic(
  () => import("../Motion").then((mod) => mod.MotionDiv),
  {
    ssr: false,
    loading: () => <Loader2 className="animate-spin" />,
  }
);

export const MotionH1 = dynamic(
  () => import("../Motion").then((mod) => mod.MotionH1),
  {
    ssr: false,
    loading: () => <Loader2 className="animate-spin" />,
  }
);

export const MotionH2 = dynamic(
  () => import("../Motion").then((mod) => mod.MotionH2),
  {
    ssr: false,
    loading: () => <Loader2 className="animate-spin" />,
  }
);

export const MotionLi = dynamic(
  () => import("../Motion").then((mod) => mod.MotionLi),
  {
    ssr: false,
    loading: () => <Loader2 className="animate-spin" />,
  }
);

export const MotionText = dynamic(
  () => import("../Motion").then((mod) => mod.MotionText),
  {
    ssr: false,
    loading: () => <Loader2 className="animate-spin" />,
  }
);

export const MotionInViewDiv = dynamic(
  () => import("../Motion").then((mod) => mod.MotionInViewDiv),
  {
    ssr: false,
    loading: () => <Loader2 className="animate-spin" />,
  }
);

export const MotionInViewH1 = dynamic(
  () => import("../Motion").then((mod) => mod.MotionInViewH1),
  {
    ssr: false,
    loading: () => <Loader2 className="animate-spin" />,
  }
);

export const MotionInViewH2 = dynamic(
  () => import("../Motion").then((mod) => mod.MotionInViewH2),
  {
    ssr: false,
    loading: () => <Loader2 className="animate-spin" />,
  }
);

export const MotionInViewText = dynamic(
  () => import("../Motion").then((mod) => mod.MotionInViewText),
  {
    ssr: false,
    loading: () => <Loader2 className="animate-spin" />,
  }
);

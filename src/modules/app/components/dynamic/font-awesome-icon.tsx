"use client";

import dynamic from "next/dynamic";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

const DynamicFontAwesomeIcon = dynamic(
  () =>
    import("@fortawesome/react-fontawesome").then((mod) => mod.FontAwesomeIcon),
  {
    ssr: false,
    loading: () => (
      <div className="w-6 h-6 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
    ),
  }
);

export default function FontAwesomeIcon({ ...props }: FontAwesomeIconProps) {
  return <DynamicFontAwesomeIcon {...props} />;
}

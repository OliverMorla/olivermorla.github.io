"use client";

import dynamic from "next/dynamic";
import { ComponentProps } from "react";

const DynamicThemeSwitcher = dynamic(
  () => import("@/modules/app/components/theme-switcher"),
  {
    ssr: false,
    loading: () => (
      <div className="w-6 h-6 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
    ),
  }
);

export default function ThemeSwitcher({
  ...props
}: ComponentProps<typeof DynamicThemeSwitcher>) {
  return <DynamicThemeSwitcher {...props} />;
}

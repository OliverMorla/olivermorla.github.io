"use client";

import dynamic from "next/dynamic";

const Button = dynamic(() => import("../Button"), {
  ssr: false,
  loading: () => (
    <button className="appearance-none border-none outline-none cursor-default select-none pointer-events-none bg-neutral-100 dark:bg-neutral-900 rounded-md p-2 animate-pulse w-[150px] h-[40px] flex items-center justify-center shadow-sm" />
  ),
});

export default Button;

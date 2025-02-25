"use client";

import { Loader } from "lucide-react";
import dynamic from "next/dynamic";

const PostHogProvider = dynamic(
  () => import("../posthog-provider").then((mod) => mod.PostHogProvider),
  {
    ssr: false,
    loading: () => <Loader className="animate-spin" />,
  }
);

export default PostHogProvider;

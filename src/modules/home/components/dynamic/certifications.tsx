"use client";

import Loading from "@/app/(frontend)/loading";
import dynamic from "next/dynamic";

const DynamicCertifications = dynamic(
  () => import("@/modules/home/components/certifications"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export default function Certifications() {
  return <DynamicCertifications />;
}

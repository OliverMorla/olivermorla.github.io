import CalScheduler from "@/modules/schedule/components/cal-scheduler";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a free 15-minute call to talk through your project and next steps.",
  alternates: { canonical: "/schedule" },
};

export default function SchedulePage() {
  return (
    <div className="bg-gradient-none min-h-svh px-4 pt-28 pb-24 sm:px-8">
      <div className="container mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex max-w-2xl flex-col gap-3">
          <h1 className="title">Book a 15-minute call</h1>
          <p className="text-muted text-pretty">
            Pick a time that works for you. We&apos;ll talk through what
            you&apos;re building, the timeline, and whether I&apos;m the right
            fit.
          </p>
        </div>
        <CalScheduler />
      </div>
    </div>
  );
}

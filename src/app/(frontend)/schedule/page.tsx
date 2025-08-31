import { Metadata } from "next";
import CalScheduler from "@/modules/schedule/components/cal-scheduler";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Ready to discuss your project?",
};

const Schedule = () => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center text-center p-8 max-sm:p-4">
      <CalScheduler />
    </main>
  );
};

export default Schedule;

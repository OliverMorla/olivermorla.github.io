import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default Loading;

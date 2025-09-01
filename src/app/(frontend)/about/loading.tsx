import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-none">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default Loading;

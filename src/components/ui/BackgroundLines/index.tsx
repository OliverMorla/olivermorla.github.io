"use client";

const BackgroundLines = () => {
  return (
    <div className="fixed flex justify-evenly w-full h-full top-0 left-0 opacity-5 pointer-events-none select-none z-0">
      <span className="w-[1px] h-full bg-neutral-700 dark:bg-neutral-200"></span>
      <span className="w-[1px] h-full bg-neutral-700 dark:bg-neutral-200"></span>
      <span className="w-[1px] h-full bg-neutral-700 dark:bg-neutral-200"></span>
      <span className="w-[1px] h-full bg-neutral-700 dark:bg-neutral-200"></span>
      <span className="w-[1px] h-full bg-neutral-700 dark:bg-neutral-200"></span>
    </div>
  );
};

export default BackgroundLines;

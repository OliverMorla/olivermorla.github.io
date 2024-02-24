"use client";

const BackgroundLines = () => {
  return (
    <div className="fixed flex justify-evenly w-full h-full top-0 left-0 opacity-15 pointer-events-none z-0">
      <div className="w-[1px] h-full bg-[--color-slate-gray]"></div>
      <div className="w-[1px] h-full bg-[--color-slate-gray]"></div>
      <div className="w-[1px] h-full bg-[--color-slate-gray]"></div>
      <div className="w-[1px] h-full bg-[--color-slate-gray]"></div>
    </div>
  );
};

export default BackgroundLines;

const SectionTitle = ({ title, desc }: SectionTitleProps) => {
  return (
    <div className="text-center flex flex-col items-center">
      <h1 className="relative uppercase font-bold text-6xl tracking-tight w-fit">
        <span className="relative z-20">{title}</span>
        <span className="absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-blue-500 to-purple-500 -skew-x-12"></span>
      </h1>
      <p className="opacity-60">{desc}</p>
    </div>
  );
};

export default SectionTitle;

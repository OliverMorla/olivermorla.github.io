import Image from "next/image";

// The load sequence (see `.intro` in site.css): portrait, name and slogan,
// then the sheet dissolves into the hero. Decorative only: the page
// underneath is fully rendered and readable by assistive tech throughout.
export default function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="flex flex-col items-center px-6 text-center">
        <div className="intro-portrait w-[clamp(8.5rem,6.5rem+7vw,11.5rem)]">
          {/* Same file, size and sizes as the hero portrait, so the browser
              fetches it once and the hero's preload covers both. */}
          <div className="image-morph">
            <Image
              src="/assets/media/portrait_1.webp"
              alt=""
              width={1792}
              height={2304}
              sizes="(max-width: 768px) 100vw, 448px"
              loading="eager"
              className="h-auto w-full object-cover grayscale"
            />
          </div>
        </div>
        <span className="intro-name mt-7 text-[clamp(2rem,1.5rem+2.2vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.035em]">
          Oliver Morla
        </span>
        <span className="intro-slogan mt-3 text-[clamp(1rem,0.92rem+0.35vw,1.1875rem)] text-slate">
          Bringing Your Vision To Life
        </span>
      </div>
    </div>
  );
}

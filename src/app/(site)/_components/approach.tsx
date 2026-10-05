import Image from "next/image";
import { manifesto } from "../_lib/content";
import Statement from "./statement";

export default function Approach() {
  return (
    <section className="wrap py-32 md:py-44">
      <Statement text={manifesto} />

      <div className="mt-10 flex items-center gap-3.5">
        {/* The hero's portrait, whole: same file and sizes as the hero, so
            it's already cached, in the same morphing shape. */}
        <span className="image-morph block w-12 shrink-0">
          <Image
            src="/assets/media/portrait_1.webp"
            alt=""
            width={1792}
            height={2304}
            sizes="(max-width: 768px) 100vw, 448px"
            className="h-auto w-full object-contain grayscale"
          />
        </span>
        <span className="leading-tight">
          <span className="block font-semibold">Oliver Morla</span>
          <span className="block text-[0.9375rem] text-slate">
            Senior full-stack developer
          </span>
        </span>
      </div>
    </section>
  );
}

import { Send } from "lucide-react";
import Image from "next/image";
import { links } from "../_lib/content";

export default function Cta() {
  return (
    <section id="contact" className="wrap">
      <div className="on-dark relative isolate grid overflow-clip rounded-[2rem] bg-carbon text-bone md:grid-cols-12 md:rounded-[2.75rem]">
        <div aria-hidden className="grid-lines" />
        <div
          aria-hidden
          className="absolute right-[-10%] bottom-[-30%] -z-10 aspect-square w-[70%] rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.35),rgb(79_70_229/0.12)_55%,transparent)] blur-2xl"
        />

        <div className="relative z-10 flex flex-col justify-center px-6 pt-2 pb-10 md:col-span-7 md:px-12 md:py-20 lg:px-20 lg:py-24">
          <p className="type-eyebrow text-gradient">Your move</p>
          <h2 className="type-title mt-5 max-w-[12ch]">
            Ready to build something great?
          </h2>
          <p className="type-lede mt-6 max-w-[26rem] text-ash">
            Book a 15-minute call. You&rsquo;ll talk to me, not a sales team.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={links.schedule}
              className="btn btn-primary h-12 px-6 text-[0.9375rem]"
            >
              Book a 15-min call
              <Send aria-hidden className="size-4" />
            </a>
            <a
              href={links.email}
              className="btn btn-ghost h-12 px-6 text-[0.9375rem]"
            >
              Email me
            </a>
          </div>
        </div>

        {/* The portrait's black backdrop melts into the panel. */}
        <div className="relative order-first h-[22rem] [mask-image:linear-gradient(to_bottom,black_45%,transparent_96%)] sm:h-[26rem] md:order-last md:col-span-5 md:h-auto md:min-h-[34rem] md:[mask-image:linear-gradient(to_right,transparent,black_55%)]">
          <Image
            src="/assets/media/portrait_1_2.webp"
            alt="Oliver Morla"
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover object-[50%_18%]"
          />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { links } from "../_lib/content";

export default function Contact() {
  return (
    <section id="contact" className="pb-4 md:pb-6">
      <div className="wrap">
        <div className="on-dark relative grid overflow-hidden rounded-[32px] bg-ink text-canvas md:grid-cols-12 md:rounded-[44px]">
          <div className="relative z-10 flex flex-col justify-center px-6 pt-2 pb-10 md:col-span-7 md:px-12 md:py-20 lg:px-20 lg:py-24">
            <h2 className="type-h2 max-w-[11ch] text-[clamp(2.5rem,1.6rem+3.4vw,4.25rem)]">
              Have something to build?
            </h2>
            <p className="type-lede mt-6 max-w-[26rem] text-band-muted">
              Book a 15-minute call and we&rsquo;ll scope it together. You work
              with me directly, from first call to launch.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={links.schedule}
                className="btn h-12 bg-canvas px-6 text-[0.9375rem] text-ink hover:bg-white"
              >
                Book a 15-min call
              </a>
              <a
                href={links.email}
                className="btn h-12 px-6 text-[0.9375rem] text-canvas ring-1 ring-white/20 ring-inset hover:bg-white/[0.06]"
              >
                Email me
              </a>
            </div>
          </div>

          {/* The portrait's black backdrop melts into the panel. */}
          <div className="relative order-first h-[22rem] [mask-image:linear-gradient(to_bottom,black_45%,transparent_96%)] sm:h-[26rem] md:order-last md:col-span-5 md:h-auto md:min-h-[34rem] md:[mask-image:linear-gradient(to_right,transparent,black_60%)]">
            <Image
              src="/assets/media/portrait_1_2.webp"
              alt="Oliver Morla"
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover object-[50%_18%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

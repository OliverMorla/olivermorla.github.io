import { services } from "../_lib/content";

export default function Services() {
  return (
    <section id="services" className="pt-24 md:pt-32">
      <div className="wrap">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <h2 className="type-h2 lg:col-span-7">What I build</h2>
          <p className="max-w-[24rem] text-slate lg:col-span-5 lg:justify-self-end">
            One developer from first sketch to launch. Design, code and
            infrastructure included.
          </p>
        </div>

        <div className="mt-12 grid border-t border-line md:mt-16 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col border-b border-line py-8 md:border-b-0 md:border-l md:px-8 md:py-10 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <h3 className="type-h3">{service.title}</h3>
              <p className="mt-3 max-w-[22rem] text-slate">{service.body}</p>
              <p className="mt-auto pt-8 text-[0.875rem] text-ink-soft">
                {service.stack}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[0.9375rem] text-slate md:mt-2">
          Every project ships with analytics, error monitoring and a clean
          handoff.
        </p>
      </div>
    </section>
  );
}

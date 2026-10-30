import Image from "next/image";
import { Check, Quote } from "lucide-react";
import { partnersEmployers } from "@/data/partners";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Employer Partnerships, as a bento of three tiles: a tall cream tile with
 * the title, the ten ways employers can engage and the brief's call to
 * become an employer partner; beside it a photograph, and under that the
 * brief's Employer Promise on navy, set as a quotation.
 */
export function Employers() {
  const { cta, image, promise } = partnersEmployers;

  return (
    <section
      id={partnersEmployers.id}
      aria-labelledby="employers-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          <div className="flex flex-col rounded-panel bg-cream p-6 sm:p-10 lg:col-span-7 lg:row-span-2 lg:p-12">
            <Reveal variant="fade">
              <Kicker>{partnersEmployers.kicker}</Kicker>
            </Reveal>
            <Title
              id="employers-title"
              lead={partnersEmployers.titleLead}
              accent={partnersEmployers.titleAccent}
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 max-w-xl text-lead text-slate">{partnersEmployers.lead}</p>
              <p className="mt-7 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-orange-ink">
                {partnersEmployers.listLabel}
              </p>
            </Reveal>
            <ul className="mt-5 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {partnersEmployers.items.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  variant="up"
                  delay={200 + index * 45}
                  className="flex items-center gap-3 text-[1rem] font-medium text-ink"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-orange text-white">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </span>
                  {item}
                </Reveal>
              ))}
            </ul>

            {/* The brief's call, pushed to the foot of the tile. */}
            <Reveal delay={150} className="mt-auto pt-9">
              <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 sm:rounded-card sm:bg-white sm:p-6 sm:ring-1 sm:ring-ink/6">
                <p className="max-w-xs font-display text-[1.25rem] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
                  {cta.line}
                </p>
                <Cta href={cta.href}>{cta.label}</Cta>
              </div>
            </Reveal>
          </div>

          {/* From large screens the photograph fills its row, so the tile
              beside it sets the height and no gap opens beneath. */}
          <Reveal variant="image" delay={100} className="lg:col-span-5">
            <div className="reveal-clip relative aspect-[4/3] overflow-hidden rounded-panel bg-sand lg:aspect-auto lg:h-full lg:min-h-[18rem]">
              <div className="reveal-media absolute inset-0">
                <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1760px) 720px, (min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: image.position }}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={200} className="lg:col-span-5">
            <figure className="relative isolate flex h-full flex-col justify-between overflow-hidden rounded-panel bg-navy-950 p-7 text-white sm:p-10">
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-ocean-600/30 blur-[90px]"
              />
              <Quote aria-hidden="true" className="h-9 w-9 icon-orange" strokeWidth={1.4} />
              <blockquote className="mt-6 font-display text-[clamp(1.375rem,1.8vw,1.75rem)] leading-[1.35] text-white [font-variation-settings:'SOFT'_100]">
                {promise.text}
              </blockquote>
              <figcaption className="mt-6 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-orange">
                {promise.label}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

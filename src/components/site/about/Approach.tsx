import Image from "next/image";
import { BadgeCheck, Ear, Handshake, Lightbulb, Network, Sprout, type LucideIcon } from "lucide-react";
import { cx } from "@/lib/cx";
import { aboutApproach, type PrincipleIcon } from "@/data/about";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<PrincipleIcon, LucideIcon> = {
  community: Ear,
  partnership: Network,
  prevention: Sprout,
  innovation: Lightbulb,
  accountability: BadgeCheck,
};

/**
 * Our Approach, in the ELA "Quality Assurance" style the home page's Work
 * With Us uses: one rounded sand panel with the brief's subtitle, its
 * belief and the five principles two to a row on the left (the fifth runs
 * the full width), and a dark photo card on the right carrying the block's
 * opening lines about how the barriers communities face are connected.
 */
export function Approach() {
  const { card } = aboutApproach;

  return (
    <section
      id={aboutApproach.id}
      aria-labelledby="approach-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="rounded-[2.5rem] bg-sand p-6 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal variant="fade">
                <Kicker>{aboutApproach.kicker}</Kicker>
              </Reveal>
              <Title
                id="approach-title"
                lead={aboutApproach.titleLead}
                accent={aboutApproach.titleAccent}
                inline
                className="mt-5"
              />
              <Reveal delay={150}>
                <p className="mt-6 max-w-2xl text-lead text-slate">{aboutApproach.lead}</p>
                <p
                  id="principles-label"
                  className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink"
                >
                  {aboutApproach.principlesLabel}
                </p>
              </Reveal>

              <ul aria-labelledby="principles-label" className="mt-6 grid gap-y-7 sm:grid-cols-2 sm:gap-x-8">
                {aboutApproach.principles.map((principle, index) => {
                  const Icon = icons[principle.icon];
                  const last = index === aboutApproach.principles.length - 1;
                  return (
                    <Reveal
                      as="li"
                      key={principle.name}
                      delay={index * 70}
                      className={cx("group flex gap-4", last && "sm:col-span-2 sm:max-w-[calc(50%-1rem)]")}
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors duration-500 group-hover:bg-lagoon-600">
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink">
                          {principle.name}
                        </span>
                        <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-slate">
                          {principle.line}
                        </span>
                      </span>
                    </Reveal>
                  );
                })}
              </ul>
            </div>

            <Reveal variant="image" delay={150} className="lg:col-span-5">
              <div className="reveal-clip group relative isolate flex h-full min-h-[28rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-navy-950 p-8 text-white sm:p-10 lg:p-12">
                <div className="reveal-media absolute inset-0 -z-20">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={card.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover transition-transform duration-[2s] ease-out-soft group-hover:scale-105"
                      style={{ objectPosition: card.image.position }}
                    />
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(6_26_48/0.25)_0%,rgb(6_26_48/0.7)_45%,rgb(6_26_48/0.92)_100%)]"
                />

                <Handshake aria-hidden="true" className="h-9 w-9 icon-orange" strokeWidth={1.3} />
                <p className="mt-6 max-w-md font-display text-[2rem] leading-[1.12] text-white [font-variation-settings:'SOFT'_100] sm:text-[2.375rem]">
                  {card.lines[0]}
                </p>
                <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-white/80">{card.lines[1]}</p>
                <Cta href={card.cta.href} variant="saffron" className="mt-8 self-start">
                  {card.cta.label}
                </Cta>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

import Image from "next/image";
import {
  Globe,
  HeartHandshake,
  Laptop,
  Lightbulb,
  Rocket,
  Store,
  TrendingUp,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { programmesEnterprise, type EnterpriseIcon } from "@/data/programmes-page";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";

const icons: Record<EnterpriseIcon, LucideIcon> = {
  ideas: Lightbulb,
  startups: Rocket,
  freelancers: Laptop,
  soleTraders: UserRound,
  micro: Store,
  online: Globe,
  growing: TrendingUp,
  social: HeartHandshake,
};

/**
 * Enterprise & Self-Employment, in one rounded sand panel (ELA's Quality
 * Assurance block, as the home page's Work With Us): the brief's heading,
 * line and the eight kinds of enterprise it supports as an icon list, two
 * to a row, on the left; on the right a dark photograph card carrying the
 * sixteen kinds of support as running text and the call to register.
 */
export function Enterprise() {
  const { image, cta } = programmesEnterprise;

  return (
    <section
      id={programmesEnterprise.id}
      aria-labelledby="enterprise-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="rounded-[2.5rem] bg-sand p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 lg:self-center">
              <Reveal variant="fade">
                <Kicker>{programmesEnterprise.kicker}</Kicker>
              </Reveal>
              <Title
                id="enterprise-title"
                lead={programmesEnterprise.titleLead}
                accent={programmesEnterprise.titleAccent}
                inline
                className="mt-5"
              />
              <Reveal delay={150}>
                <p className="mt-6 max-w-xl text-lead text-slate">{programmesEnterprise.lead}</p>
                <p
                  id="enterprise-who"
                  className="mt-7 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
                >
                  {programmesEnterprise.whoLabel}
                </p>
              </Reveal>

              <ul
                aria-labelledby="enterprise-who"
                className="mt-5 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5"
              >
                {programmesEnterprise.who.map((kind, index) => {
                  const Icon = icons[kind.icon];
                  return (
                    <Reveal
                      as="li"
                      key={kind.label}
                      variant="up"
                      delay={index * 60}
                      className="group flex items-center gap-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors duration-500 group-hover:bg-lagoon-600 sm:h-12 sm:w-12">
                        <Icon aria-hidden="true" className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.6} />
                      </span>
                      <span className="text-[0.9375rem] font-semibold leading-snug text-ink sm:text-[1rem]">
                        {kind.label}
                      </span>
                    </Reveal>
                  );
                })}
              </ul>
            </div>

            <Reveal variant="image" delay={150} className="lg:col-span-5">
              <div className="reveal-clip group relative isolate flex h-full min-h-[30rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-navy-950 p-8 text-white sm:p-10">
                <div className="reveal-media absolute inset-0 -z-20">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1760px) 640px, (min-width: 1024px) 38vw, 100vw"
                      className="object-cover transition-transform duration-[2s] ease-out-soft group-hover:scale-105"
                      style={{ objectPosition: image.position }}
                    />
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(6_26_48/0.2)_0%,rgb(6_26_48/0.72)_42%,rgb(6_26_48/0.95)_100%)]"
                />

                <h3
                  id="enterprise-support"
                  className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-saffron-300"
                >
                  {programmesEnterprise.supportLabel}
                </h3>
                <RunList
                  items={programmesEnterprise.support}
                  labelledBy="enterprise-support"
                  dot="bg-saffron-400"
                  className="mt-4 text-[1rem] leading-[1.95] text-white"
                />
                <Cta href={cta.href} variant="saffron" className="mt-8 self-start">
                  {cta.label}
                </Cta>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

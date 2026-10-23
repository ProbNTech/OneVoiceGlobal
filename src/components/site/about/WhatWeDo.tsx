import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Compass,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Languages,
  LifeBuoy,
  MonitorSmartphone,
  Rocket,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { aboutWhatWeDo, type ServiceIcon } from "@/data/about";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<ServiceIcon, LucideIcon> = {
  education: GraduationCap,
  employment: BriefcaseBusiness,
  english: Languages,
  digital: MonitorSmartphone,
  enterprise: Rocket,
  guidance: Compass,
  wellbeing: HeartPulse,
  support: LifeBuoy,
  mentoring: UsersRound,
  community: HeartHandshake,
};

type Service = (typeof aboutWhatWeDo.items)[number];

/**
 * What We Do. The Centre's ten services as photo cards, five to a row and two
 * rows deep: a photograph with the service's icon on a saffron tab over its
 * corner, then the name, the brief's line and the way through. It is the ELA
 * card the home page's Programmes section already uses, set out as a full
 * grid rather than a rail.
 */
export function WhatWeDo() {
  return (
    <section
      id={aboutWhatWeDo.id}
      aria-labelledby="what-we-do-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Kicker>{aboutWhatWeDo.kicker}</Kicker>
            </Reveal>
            <Title
              id="what-we-do-title"
              lead={aboutWhatWeDo.titleLead}
              accent={aboutWhatWeDo.titleAccent}
              className="mt-4"
              inline
            />
          </div>
          <Reveal delay={150} className="lg:col-span-7 lg:flex lg:items-end lg:justify-between lg:gap-8">
            <p className="max-w-xl text-lead text-slate">{aboutWhatWeDo.lead}</p>
            <Cta href={aboutWhatWeDo.cta.href} className="mt-5 shrink-0 lg:mt-0">
              {aboutWhatWeDo.cta.label}
            </Cta>
          </Reveal>
        </div>

        <ol className="scrollbar-none -mx-(--gutter) mt-8 flex snap-x snap-mandatory scroll-px-(--gutter) gap-4 overflow-x-auto px-(--gutter) pb-4 lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-5 lg:overflow-visible lg:p-0">
          {aboutWhatWeDo.items.map((service, index) => (
            <Reveal
              as="li"
              key={service.name}
              variant="up"
              delay={(index % 5) * 80}
              className="flex w-[70vw] max-w-xs shrink-0 snap-start sm:w-[44vw] lg:w-auto lg:max-w-none"
            >
              <ServiceCard service={service} number={index + 1} />
            </Reveal>
          ))}
        </ol>
      </Shell>
    </section>
  );
}

function ServiceCard({ service, number }: { service: Service; number: number }) {
  const Icon = icons[service.icon];
  return (
    <Link
      href={aboutWhatWeDo.cta.href}
      /* Ten cards lead to the same page until the services have pages of their
         own, so each link is named for its service rather than "learn more". */
      aria-label={`${service.name} — ${aboutWhatWeDo.cta.label}`}
      className="group flex w-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-ink/8 shadow-[0_20px_44px_-36px_rgb(10_37_64/0.55)] transition-[transform,box-shadow] duration-700 ease-out-soft hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-40px_rgb(10_37_64/0.6)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1280px) 20vw, 48vw"
          className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.07]"
          style={{ objectPosition: service.image.position }}
        />
        {/* The tab sits in the photograph's corner, as ELA sets it. */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 grid h-11 w-11 place-items-center bg-saffron-500 text-navy-950 transition-colors duration-500 ease-out-soft group-hover:bg-ink group-hover:text-white"
        >
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span
          aria-hidden="true"
          className="font-display text-[0.8125rem] font-light text-saffron-ink [font-variation-settings:'SOFT'_100]"
        >
          {String(number).padStart(2, "0")}
        </span>
        <h3 className="mt-1.5 text-[0.8125rem] font-bold uppercase leading-snug tracking-[0.1em] text-ink transition-colors duration-500 ease-out-soft group-hover:text-lagoon-600">
          {service.name}
        </h3>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-slate">{service.line}</p>

        <span
          aria-hidden="true"
          className="mt-4 flex items-center gap-2 pt-1 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors duration-500 ease-out-soft group-hover:text-saffron-ink"
        >
          Learn more
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out-soft group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

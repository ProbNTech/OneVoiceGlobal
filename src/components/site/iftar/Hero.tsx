"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, CalendarDays, MapPin, Users } from "lucide-react";
import { iftarHero } from "@/data/iftar";
import { Photo } from "../ui/Photo";
import { ArrowLink, Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const cardIcons = { venue: MapPin, people: Users } as const;

/**
 * Community Iftar 2027 hero, on cream like the other inner pages: a way back
 * to Events 2027, the event's name as the headline with its two-part
 * subtitle, its date and place, its first paragraph and its three calls to
 * act. On the right a tall photograph of guests waiting to break the fast,
 * framed as a pointed arch (the `#iftar-arch` clip below, a gentle nod to
 * the season rather than a literal building), and a round photograph of a
 * plate of dates being passed, set into its lower left; the two drift apart
 * a little as the page scrolls. A thin crescent draws itself in orange
 * in the room the arch leaves at its upper left as the hero arrives
 * (`.ring-draw`). The venue and proposed
 * attendance sit on a card across the foot.
 *
 * The header keeps its dark logo and links over this band (it is not in
 * SiteHeader's DARK_HERO).
 */
export function Hero() {
  const collageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: collageRef, offset: ["start start", "end start"] });
  const mainY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -30]);
  const circleY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 50]);
  const { images, card } = iftarHero;

  return (
    <section
      aria-labelledby="iftar-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-32 lg:pt-40"
    >
      {/* The arch, in the frame's own proportions: straight sides and two
          curves meeting in a soft point at the top. */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <clipPath id="iftar-arch" clipPathUnits="objectBoundingBox">
            <path d="M0,1 L0,0.36 C0,0.17 0.2,0.07 0.5,0 C0.8,0.07 1,0.17 1,0.36 L1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Soft evening light behind the collage. */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-orange-soft blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-56 right-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-lagoon-100/70 blur-[110px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal variant="fade" delay={40} margin="0px">
              <Link
                href={iftarHero.back.href}
                className="group inline-flex items-center gap-2 text-[0.875rem] font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 ease-out-soft group-hover:-translate-x-1"
                />
                {iftarHero.back.label}
              </Link>
            </Reveal>
            <Reveal variant="fade" delay={100} margin="0px" className="mt-5">
              <Kicker>{iftarHero.kicker}</Kicker>
            </Reveal>
            <Title
              as="h1"
              id="iftar-hero-title"
              lead={iftarHero.titleLead}
              accent={iftarHero.titleAccent}
              delay={180}
              className="mt-5"
            />
            <Reveal delay={320} margin="0px">
              <p className="mt-4 font-display text-[clamp(1.375rem,2.2vw,2rem)] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
                {iftarHero.subtitle[0]} <em className="font-light text-lagoon-600">{iftarHero.subtitle[1]}</em>
              </p>
              <p className="mt-5 inline-flex items-center gap-2.5 text-[1rem] font-semibold text-ink">
                <CalendarDays aria-hidden="true" className="h-5 w-5 icon-orange-ink" strokeWidth={1.8} />
                {iftarHero.when}
              </p>
            </Reveal>
            <Reveal delay={440} margin="0px">
              <p className="mt-5 max-w-2xl text-lead text-slate">{iftarHero.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Cta href={iftarHero.primaryCta.href} variant="saffron">
                  {iftarHero.primaryCta.label}
                </Cta>
                <Cta href={iftarHero.secondaryCta.href} variant="outline">
                  {iftarHero.secondaryCta.label}
                </Cta>
              </div>
              <ArrowLink href={iftarHero.tertiaryCta.href} className="mt-5">
                {iftarHero.tertiaryCta.label}
              </ArrowLink>
            </Reveal>
          </div>

          {/* Collage. The padding at the foot is the room the round photograph
              and the card hang into. */}
          <div
            ref={collageRef}
            className="relative mx-auto w-full max-w-md pb-24 lg:col-span-5 lg:ml-auto lg:mr-0 lg:max-w-[33rem] lg:pb-28"
          >
            {/* The crescent, drawn in the room the arch leaves at its upper left. */}
            <Reveal variant="fade" margin="0px" className="pointer-events-none absolute left-[-4%] top-[2%] w-[30%]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-auto w-full">
                <path
                  d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
                  fill="none"
                  /* In the icon's 24 units: about 1.4px at the crescent's
                     width. A non-scaling stroke would measure the dashes
                     that draw it in screen pixels and leave gaps. */
                  strokeWidth="0.22"
                  strokeLinejoin="round"
                  pathLength={100}
                  strokeDasharray="100"
                  className="ring-draw stroke-orange"
                />
              </svg>
            </Reveal>

            <motion.div style={{ y: mainY }} className="ml-auto w-[78%]">
              <Reveal variant="image" delay={120} margin="0px">
                {/* The shadow is a filter on a wrapper and the arch a clip on
                    another, so the curtain reveal keeps its own clip. */}
                <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.22)]">
                  <div className="[clip-path:url(#iftar-arch)]">
                    <div className="reveal-clip relative aspect-[3/4] overflow-hidden bg-sand">
                      <div className="reveal-media absolute inset-0">
                        <Photo
                          image={images.main}
                          preload
                          sizes="(min-width: 1760px) 420px, (min-width: 1024px) 26vw, 78vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </motion.div>

            <motion.div style={{ y: circleY }} className="absolute bottom-44 left-0 w-[40%] lg:bottom-20">
              <Reveal variant="image" delay={300} margin="0px">
                {/* The cream ring is padding, not a ring: a ring is a
                    box-shadow, which the clip would cut away. */}
                <div className="rounded-full bg-cream p-2 drop-shadow-[0_24px_30px_rgb(10_37_64/0.25)] sm:p-2.5">
                  <div className="reveal-clip relative aspect-square overflow-hidden rounded-full bg-sand">
                    <div className="reveal-media absolute inset-0">
                      <Photo image={images.circle} sizes="(min-width: 1024px) 13vw, 38vw" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </motion.div>

            {/* The venue and the proposed attendance. */}
            <Reveal
              variant="up"
              delay={560}
              margin="0px"
              className="absolute bottom-0 right-0 z-10 w-[17.5rem] sm:w-[21rem] lg:-right-4"
            >
              <dl className="space-y-3 rounded-card bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:p-5">
                {card.map((row) => {
                  const Icon = cardIcons[row.icon];
                  return (
                    <div key={row.label} className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange text-white">
                        <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-muted">
                          {row.label}
                        </dt>
                        <dd className="mt-0.5 text-[0.875rem] font-semibold leading-snug text-ink">{row.value}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

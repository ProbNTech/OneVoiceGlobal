"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, HandHeart, House, Sprout, type LucideIcon } from "lucide-react";
import { cx } from "@/lib/cx";
import { refugeeHero } from "@/data/refugee-support";
import { Photo } from "../ui/Photo";
import { ArrowLink, Cta, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* One icon and one of the logo's colours for each of the three priorities, in the document's order. */
const priorityIcons: LucideIcon[] = [HandHeart, Sprout, House];
const priorityTones = ["bg-lagoon-600", "bg-ocean-600", "bg-orange"];

/**
 * Refugee & Asylum Seeker Support hero, on cream like the other inner pages:
 * a way back to Our Work, the service's name as the headline with its
 * subtitle, "Providing Hope, Dignity and Opportunities for a New Beginning",
 * beneath, its two opening paragraphs and three of its buttons. On the
 * right, the "new beginning" made literal: one photograph cut as a rising
 * sun, a circle whose foot sits flat on the horizon, with a thin orange arc
 * that draws itself over it as the hero arrives; as the page scrolls the
 * sun rises a little. The document's three priorities sit on a card along
 * the horizon.
 *
 * The header keeps its dark logo and links over this band (it is not in
 * SiteHeader's DARK_HERO).
 */
export function Hero() {
  const sunRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sunRef, offset: ["start start", "end start"] });
  const rise = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -36]);
  const glow = useTransform(scrollYProgress, [0, 0.7], reduceMotion ? [0.8, 0.8] : [0.5, 1]);
  const { priorities, image } = refugeeHero;

  return (
    <section
      aria-labelledby="refugee-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-32 lg:pt-40"
    >
      {/* Soft light in the logo's colours behind the sun. */}
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-32 -z-10 h-[34rem] w-[34rem] rounded-full bg-lagoon-100/70 blur-[120px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal variant="fade" delay={40} margin="0px">
              <Link
                href={refugeeHero.back.href}
                className="group inline-flex items-center gap-2 text-[0.875rem] font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 ease-out-soft group-hover:-translate-x-1"
                />
                {refugeeHero.back.label}
              </Link>
            </Reveal>
            <Title
              as="h1"
              id="refugee-hero-title"
              lead={refugeeHero.titleLead}
              accent={refugeeHero.titleAccent}
              delay={140}
              className="mt-6"
            />
            <Reveal delay={300} margin="0px">
              <p className="mt-5 font-display text-[clamp(1.375rem,2.2vw,2rem)] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
                {refugeeHero.subtitle[0]} <em className="font-light text-lagoon-600">{refugeeHero.subtitle[1]}</em>
              </p>
            </Reveal>
            <Reveal delay={420} margin="0px">
              <p className="mt-6 max-w-2xl text-lead text-ink">{refugeeHero.lead}</p>
              <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-slate">{refugeeHero.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Cta href={refugeeHero.primaryCta.href} variant="saffron">
                  {refugeeHero.primaryCta.label}
                </Cta>
                <Cta href={refugeeHero.secondaryCta.href} variant="outline">
                  {refugeeHero.secondaryCta.label}
                </Cta>
              </div>
              <ArrowLink href={refugeeHero.tertiaryCta.href} className="mt-5">
                {refugeeHero.tertiaryCta.label}
              </ArrowLink>
            </Reveal>
          </div>

          {/* The sun. The padding at the foot is the room the card hangs into. */}
          <div
            ref={sunRef}
            className="relative mx-auto w-full max-w-md pb-24 sm:pb-20 lg:col-span-5 lg:ml-auto lg:mr-0 lg:max-w-[33rem]"
          >
            {/* Warm light behind the sun, brighter as it rises. */}
            <motion.div
              aria-hidden="true"
              style={{ opacity: glow }}
              className="absolute inset-x-[6%] top-[8%] -z-10 aspect-square rounded-full bg-orange-soft blur-3xl"
            />

            <motion.div style={{ y: rise }} className="relative">
              {/* The arc over the sun: a circle round the sun's own centre,
                  a little wider than the sun, running from just above the
                  horizon on one side over the top to the other, in the
                  frame's own units (the sun is 100 across, its centre at
                  50,50 and the horizon at 88; radius 56 meets y = 80 at
                  x = 50 ± 47.3). */}
              <Reveal variant="fade" margin="0px" className="pointer-events-none absolute inset-0 z-10">
                <svg aria-hidden="true" viewBox="0 0 100 88" className="h-full w-full overflow-visible">
                  <path
                    d="M 2.7 80 A 56 56 0 1 1 97.3 80"
                    fill="none"
                    /* In the frame's units: about 1.5px across a 33rem sun. A
                       non-scaling stroke would measure the dashes that draw
                       the arc in screen pixels and break it into pieces. */
                    strokeWidth="0.28"
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray="100"
                    className="ring-draw stroke-orange"
                  />
                </svg>
              </Reveal>

              <Reveal variant="image" delay={120} margin="0px">
                {/* The shadow is a filter on a wrapper and the sun a clip on
                    another, so the curtain reveal keeps its own clip. The
                    frame is 100 wide and 88 tall, and the circle is 100
                    across with its centre 50 down (56.8% of 88), so the
                    frame's foot cuts it flat. */}
                <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                  <div className="aspect-[100/88] [clip-path:circle(farthest-side_at_50%_56.82%)]">
                    <div className="reveal-clip relative h-full overflow-hidden bg-sand">
                      <div className="reveal-media absolute inset-0">
                        <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                          <Photo
                            image={image}
                            preload
                            sizes="(min-width: 1760px) 530px, (min-width: 1024px) 34vw, 92vw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </motion.div>

            {/* The three priorities, along the horizon. */}
            <Reveal variant="up" delay={560} margin="0px" className="absolute inset-x-0 bottom-0 z-20">
              <div className="mx-auto w-[94%] rounded-card bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:w-[90%] sm:p-5">
                <p
                  id="refugee-priorities"
                  className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-muted"
                >
                  {priorities.label}
                </p>
                <ul aria-labelledby="refugee-priorities" className="mt-3 grid grid-cols-3 gap-3">
                  {priorities.items.map((item, index) => {
                    const Icon = priorityIcons[index] ?? HandHeart;
                    return (
                      <li key={item} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                        <span
                          className={cx(
                            "grid h-9 w-9 shrink-0 place-items-center rounded-full text-white",
                            priorityTones[index],
                          )}
                        >
                          <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                        <span className="font-display text-[0.9375rem] leading-tight text-ink [font-variation-settings:'SOFT'_100] sm:text-[1rem]">
                          {item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

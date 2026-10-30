"use client";

import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, CalendarDays } from "lucide-react";
import { cx } from "@/lib/cx";
import { eventsHero } from "@/data/events";
import { Photo } from "../ui/Photo";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* The last word of each line takes one of the logo's colours. */
const accentColours = ["text-lagoon-600", "text-ocean-600", "text-lagoon-600"];

/**
 * Events 2027 hero, on cream like the other inner pages: the block's
 * subtitle as the headline, one phrase to a line with its last word in one
 * of the logo's colours, its first paragraph beneath and the two calls to
 * act. On the right two tall photographs stand side by side, one under an
 * arched top and one cut as a capsule and set lower; they drift apart a
 * little as the page scrolls. A card across their foot names the event the
 * calendar opens with and leads down to it.
 *
 * The header keeps its dark logo and links over this band (it is not in
 * SiteHeader's DARK_HERO).
 */
export function Hero() {
  const collageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: collageRef, offset: ["start start", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -40]);
  const rightY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 50]);
  const { images, card } = eventsHero;

  return (
    <section
      aria-labelledby="events-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-28 lg:pt-32"
    >
      {/* Soft light in the logo's colours behind the collage. */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-saffron-100/80 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-56 right-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-lagoon-100/70 blur-[110px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker>{eventsHero.kicker}</Kicker>
            </Reveal>
            <Reveal
              as="h1"
              id="events-hero-title"
              variant="lines"
              delay={180}
              margin="0px"
              className="mt-6 font-display text-title font-normal text-ink [font-variation-settings:'SOFT'_100]"
            >
              {eventsHero.title.map((line, lineIndex) => {
                const words = line.split(" ");
                const accent = words.pop();
                return (
                  <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                    <span className="line-inner block" style={{ "--line": lineIndex } as CSSProperties}>
                      {words.join(" ")} <em className={cx("font-light", accentColours[lineIndex])}>{accent}</em>
                    </span>
                  </span>
                );
              })}
            </Reveal>
            <Reveal delay={420} margin="0px">
              <p className="mt-7 max-w-2xl text-lead text-slate">{eventsHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={eventsHero.primaryCta.href}>{eventsHero.primaryCta.label}</Cta>
                <Cta href={eventsHero.secondaryCta.href} variant="outline">
                  {eventsHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* Collage. The padding at the foot is the room the lower
              photograph and the card hang down into. */}
          <div
            ref={collageRef}
            className="relative mx-auto w-full max-w-md pb-24 lg:col-span-5 lg:ml-auto lg:mr-0 lg:max-w-[34rem] lg:pb-28"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <motion.div style={{ y: leftY }}>
                <Reveal variant="image" delay={120} margin="0px">
                  {/* The shadow is a filter on a wrapper: a box-shadow on the
                      clip would be cut off at its square box. */}
                  <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                    <div className="reveal-clip relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand">
                      <div className="reveal-media absolute inset-0">
                        <Photo
                          image={images.main}
                          preload
                          sizes="(min-width: 1760px) 300px, (min-width: 1024px) 17vw, 46vw"
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </motion.div>

              <motion.div style={{ y: rightY }} className="mt-16 sm:mt-20">
                <Reveal variant="image" delay={280} margin="0px">
                  <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                    <div className="reveal-clip relative aspect-[3/4] overflow-hidden rounded-full bg-sand">
                      <div className="reveal-media absolute inset-0">
                        <Photo image={images.side} sizes="(min-width: 1760px) 300px, (min-width: 1024px) 17vw, 46vw" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </motion.div>
            </div>

            {/* The calendar's opening event, leading down to it. */}
            <Reveal
              variant="left"
              delay={560}
              margin="0px"
              className="absolute bottom-0 left-0 z-10 w-[17rem] sm:w-[22rem] lg:-left-8"
            >
              <Link
                href={card.event.href}
                className="group flex items-center gap-4 rounded-card bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:p-5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-saffron-500 text-ink">
                  <CalendarDays aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    {card.label}
                  </span>
                  <span className="mt-1 block font-display text-[1.125rem] leading-snug text-ink transition-colors duration-500 [font-variation-settings:'SOFT'_100] group-hover:text-lagoon-600">
                    {card.event.name}
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] text-slate">{card.event.when}</span>
                </span>
                <ArrowDownRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-lagoon-600 transition-transform duration-500 ease-out-soft group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

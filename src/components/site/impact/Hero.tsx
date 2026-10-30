"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowDownRight, TrendingUp } from "lucide-react";
import type { HomeImage } from "@/data/home";
import { impactHero } from "@/data/impact";
import { Photo } from "../ui/Photo";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* Each column's height, as a share of the tallest: they rise left to right. */
const HEIGHTS = ["62%", "80%", "100%"];

/**
 * Impact hero, on cream like the other inner pages: OUR IMPACT's subtitle
 * as the headline, its opening sentence and the Foundation's purpose
 * beneath, and the two calls to act. On the right three photographs stand
 * side by side as arched columns that rise from left to right, like the
 * bars of a chart that grows, each uncovered from its foot up; as the page
 * scrolls they drift apart at different speeds. A card across their foot
 * leads down to the success stories.
 *
 * The header keeps its dark logo and links over this band (it is not in
 * SiteHeader's DARK_HERO).
 */
export function Hero() {
  const collageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: collageRef, offset: ["start start", "end start"] });
  const drift = [
    useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 50]),
    useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 20]),
    useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -20]),
  ];
  const { images, card } = impactHero;

  return (
    <section
      aria-labelledby="impact-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-28 lg:pt-32"
    >
      {/* Soft light in the logo's colours behind the collage. */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-lagoon-100/80 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-56 right-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-saffron-100/80 blur-[110px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker>{impactHero.kicker}</Kicker>
            </Reveal>
            <Title
              as="h1"
              id="impact-hero-title"
              lead={impactHero.titleLead}
              accent={impactHero.titleAccent}
              size="display"
              delay={180}
              className="mt-6"
            />
            <Reveal delay={420} margin="0px">
              <p className="mt-7 max-w-2xl text-lead text-ink">{impactHero.description[0]}</p>
              <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-slate">{impactHero.description[1]}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={impactHero.primaryCta.href}>{impactHero.primaryCta.label}</Cta>
                <Cta href={impactHero.secondaryCta.href} variant="outline">
                  {impactHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* Collage. The padding at the foot is the room the card hangs
              down into. */}
          <div
            ref={collageRef}
            className="relative mx-auto w-full max-w-md pb-20 lg:col-span-5 lg:ml-auto lg:mr-0 lg:max-w-[34rem]"
          >
            <div className="flex aspect-[6/5] items-end gap-3 sm:gap-4">
              {images.map((image, index) => (
                <Column key={image.pending ?? image.src} image={image} index={index} y={drift[index]} />
              ))}
            </div>

            {/* The success stories, one scroll away. */}
            <Reveal
              variant="left"
              delay={620}
              margin="0px"
              className="absolute bottom-0 left-0 z-10 w-[16.5rem] sm:w-[20rem] lg:-left-8"
            >
              <Link
                href={card.href}
                className="group flex items-center gap-4 rounded-card bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:p-5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white">
                  <TrendingUp aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-muted">
                    {card.label}
                  </span>
                  <span className="mt-1 block font-display text-[1.1875rem] leading-snug text-ink transition-colors duration-500 [font-variation-settings:'SOFT'_100] group-hover:text-lagoon-600">
                    {card.line}
                  </span>
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

/** One column of the collage: an arched photograph at its own height, drifting at its own speed. */
function Column({ image, index, y }: { image: HomeImage; index: number; y: MotionValue<number> }) {
  return (
    <motion.div style={{ y, height: HEIGHTS[index] }} className="flex-1">
      <Reveal variant="image" delay={120 + index * 160} margin="0px" className="h-full">
        {/* The shadow is a filter on a wrapper: a box-shadow on the clip
            would be cut off at its square box. */}
        <div className="h-full drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
          <div className="reveal-clip relative h-full overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] bg-sand">
            <div className="reveal-media absolute inset-0">
              <Photo
                image={image}
                preload={index === 2}
                sizes="(min-width: 1760px) 180px, (min-width: 1024px) 11vw, 31vw"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </motion.div>
  );
}

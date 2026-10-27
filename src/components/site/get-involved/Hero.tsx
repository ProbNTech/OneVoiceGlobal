"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cx } from "@/lib/cx";
import { getInvolvedHero } from "@/data/get-involved";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { logo } from "@/data/site";

/* The last word of each line takes one of the logo's colours, as the
   Community hero sets its own on cream. */
const accentColours = ["text-ocean-600", "text-lagoon-600"];

/**
 * Get Involved hero, on cream like the Community hero: the brief's "Support
 * our Work" subtitle as the headline, its opening sentence beneath and the
 * two calls to act. On the right, a tall photograph of volunteers at work
 * cut with a leaf corner, and a round photograph of a tutor and learner
 * overlapping its lower corner; the two drift apart a little as the page
 * scrolls. The block's closing sentence sits on a card across the tall
 * photograph's edge.
 *
 * The header keeps its dark logo and links over this band (it is not in
 * SiteHeader's DARK_HERO).
 */
export function Hero() {
  const collageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: collageRef, offset: ["start start", "end start"] });
  const mainY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -30]);
  const insetY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 60]);
  const { images } = getInvolvedHero;

  return (
    <section
      aria-labelledby="get-involved-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-28 lg:pt-32"
    >
      {/* Soft light in the logo's colours behind the collage. */}
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-48 -z-10 h-[38rem] w-[38rem] rounded-full bg-saffron-100/90 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 right-1/3 -z-10 h-[26rem] w-[26rem] rounded-full bg-lagoon-100/70 blur-[110px]"
      />

      <Shell>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker>{getInvolvedHero.kicker}</Kicker>
            </Reveal>
            <Reveal
              as="h1"
              id="get-involved-hero-title"
              variant="lines"
              delay={180}
              margin="0px"
              className="mt-6 font-display text-title font-normal text-ink [font-variation-settings:'SOFT'_100]"
            >
              {getInvolvedHero.title.map((line, lineIndex) => {
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
              <p className="mt-7 max-w-xl text-lead text-slate">{getInvolvedHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={getInvolvedHero.primaryCta.href}>{getInvolvedHero.primaryCta.label}</Cta>
                <Cta href={getInvolvedHero.secondaryCta.href} variant="outline">
                  {getInvolvedHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* Collage. The padding at the foot is the room the round
              photograph hangs down into. It stops growing past 38rem, so
              wide screens keep the hero to its usual height. */}
          <div ref={collageRef} className="relative w-full pb-16 lg:col-span-6 lg:ml-auto lg:max-w-[38rem] lg:pb-20">
            <motion.div style={{ y: mainY }} className="ml-auto w-[82%]">
              <Reveal variant="image" delay={120} margin="0px">
                {/* The shadow is a filter on a wrapper: a box-shadow on the
                    clip would be cut off at its square box. */}
                <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                  <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[2rem_8rem_2rem_2rem] bg-sand">
                    <div className="reveal-media absolute inset-0">
                      <Image
                        src={images.main.src}
                        alt={images.main.alt}
                        fill
                        preload
                        sizes="(min-width: 1760px) 640px, (min-width: 1024px) 40vw, 82vw"
                        className="object-cover"
                        style={{ objectPosition: images.main.position }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </motion.div>

            <motion.div style={{ y: insetY }} className="absolute bottom-0 left-0 w-[44%]">
              <Reveal variant="image" delay={300} margin="0px">
                {/* The cream frame round the circle is padding, not a ring: a
                    ring is a box-shadow, which the clip would cut away. */}
                <div className="rounded-full bg-cream p-2 drop-shadow-[0_24px_30px_rgb(10_37_64/0.25)] sm:p-2.5">
                  <div className="reveal-clip relative aspect-square overflow-hidden rounded-full bg-sand">
                    <div className="reveal-media absolute inset-0">
                      <Image
                        src={images.inset.src}
                        alt={images.inset.alt}
                        fill
                        sizes="(min-width: 1760px) 340px, (min-width: 1024px) 22vw, 44vw"
                        className="object-cover"
                        style={{ objectPosition: images.inset.position }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </motion.div>

            <Reveal
              variant="left"
              delay={560}
              margin="0px"
              /* Over the tall photograph's lower right on phones, clear of
                 the round one; across its top-left edge from large screens. */
              className="absolute bottom-2 right-0 z-10 max-w-[14.5rem] sm:max-w-[19rem] lg:-left-6 lg:bottom-auto lg:right-auto lg:top-10"
            >
              <div className="flex items-start gap-3 rounded-card bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:p-5">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="mt-0.5 h-9 w-auto shrink-0 sm:h-10"
                />
                <p className="text-[0.8125rem] font-medium leading-snug text-ink">{getInvolvedHero.card}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

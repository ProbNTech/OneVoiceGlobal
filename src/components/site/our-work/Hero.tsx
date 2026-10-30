"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cx } from "@/lib/cx";
import { ourWorkHero } from "@/data/our-work";
import { logo } from "@/data/site";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* The last word of each line takes one of the logo's colours, as the other
   inner heroes set theirs on cream. */
const accentColours = ["text-lagoon-600", "text-ocean-600", "text-lagoon-600"];

/**
 * Our Work hero, on cream like the other inner pages: the block's subtitle
 * "Programmes designed around people and potential" as the headline, its
 * opening sentence beneath and two calls to act. On the right, the brief's
 * own photograph for Our Work, cut as an arched window, with the brief's
 * photograph for the block's introduction set lower in a leaf-cornered
 * frame across its foot; the two drift apart a little as the page scrolls.
 * The brief's line for Our Work sits on a card in the room the arch leaves
 * at its upper left.
 *
 * The header keeps its dark logo and links over this band (it is not in
 * SiteHeader's DARK_HERO).
 */
export function Hero() {
  const collageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: collageRef, offset: ["start start", "end start"] });
  const mainY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -30]);
  const insetY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 55]);
  const { images } = ourWorkHero;

  return (
    <section
      aria-labelledby="our-work-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-32 lg:pt-40"
    >
      {/* Soft light in the logo's colours behind the collage. */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-48 -z-10 h-[38rem] w-[38rem] rounded-full bg-lagoon-100/70 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 right-1/3 -z-10 h-[26rem] w-[26rem] rounded-full bg-orange-soft opacity-80 blur-[110px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker>{ourWorkHero.kicker}</Kicker>
            </Reveal>
            <Reveal
              as="h1"
              id="our-work-hero-title"
              variant="lines"
              delay={180}
              margin="0px"
              className="mt-6 font-display text-title font-normal text-ink [font-variation-settings:'SOFT'_100]"
            >
              {ourWorkHero.title.map((line, lineIndex) => {
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
              <p className="mt-7 max-w-xl text-lead text-slate">{ourWorkHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={ourWorkHero.primaryCta.href}>{ourWorkHero.primaryCta.label}</Cta>
                <Cta href={ourWorkHero.secondaryCta.href} variant="outline">
                  {ourWorkHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* Collage. The padding at the foot is the room the lower frame
              hangs into; past 38rem it stops growing, so wide screens keep
              the hero to its usual height. */}
          <div ref={collageRef} className="relative w-full pb-20 lg:col-span-6 lg:ml-auto lg:max-w-[38rem] lg:pb-24">
            <motion.div style={{ y: mainY }} className="ml-auto w-[86%]">
              <Reveal variant="image" delay={120} margin="0px">
                {/* The shadow is a filter on a wrapper: a box-shadow on the
                    clip would be cut off at its square box. */}
                <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                  <div className="reveal-clip relative aspect-[5/4] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand">
                    <div className="reveal-media absolute inset-0">
                      <Image
                        src={images.main.src}
                        alt={images.main.alt}
                        fill
                        preload
                        sizes="(min-width: 1760px) 560px, (min-width: 1024px) 40vw, 86vw"
                        className="object-cover"
                        style={{ objectPosition: images.main.position }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </motion.div>

            <motion.div style={{ y: insetY }} className="absolute bottom-0 left-0 w-[40%]">
              <Reveal variant="image" delay={300} margin="0px">
                {/* The cream frame is padding, not a ring: a ring is a
                    box-shadow, which the clip would cut away. */}
                <div className="rounded-[5.5rem_1.9rem_1.9rem_1.9rem] bg-cream p-2 drop-shadow-[0_24px_30px_rgb(10_37_64/0.25)] sm:p-2.5">
                  <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[5rem_1.5rem_1.5rem_1.5rem] bg-sand">
                    <div className="reveal-media absolute inset-0">
                      <Image
                        src={images.inset.src}
                        alt={images.inset.alt}
                        fill
                        sizes="(min-width: 1760px) 260px, (min-width: 1024px) 19vw, 40vw"
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
              /* In the room the arch leaves at its upper left. */
              className="absolute left-0 top-2 z-10 max-w-[13.5rem] sm:top-6 sm:max-w-[17rem]"
            >
              <div className="flex items-center gap-3 rounded-card bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:p-5">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-9 w-auto shrink-0 sm:h-10"
                />
                <p className="text-[0.8125rem] font-semibold leading-snug text-ink">{ourWorkHero.card}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

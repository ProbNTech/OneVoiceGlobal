"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Handshake, ShieldCheck } from "lucide-react";
import { cx } from "@/lib/cx";
import { partnersHero } from "@/data/partners";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* The last word of each line takes one of the logo's colours, as the other
   inner heroes set theirs on cream. */
const accentColours = ["text-lagoon-600", "text-ocean-600"];

/**
 * Partners hero, on cream like the other inner pages: the brief's "From
 * Shared Challenges to Shared Solutions" as the headline, its line beneath
 * and the two calls to act. On the right, two photographs of people working
 * together overlap on a diagonal, a wide one cut with a leaf corner and a
 * tall one with its own leaf at the opposite corner, and a teal disc with a
 * handshake sits where the two meet; they drift apart a little as the page
 * scrolls. The brief's promise about how partnerships are governed sits on
 * a card in the room the two frames leave at the lower left.
 *
 * The header keeps its dark logo and links over this band (it is not in
 * SiteHeader's DARK_HERO).
 */
export function Hero() {
  const collageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: collageRef, offset: ["start start", "end start"] });
  const wideY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -30]);
  const tallY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 50]);
  const { images } = partnersHero;

  return (
    <section
      aria-labelledby="partners-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-32 lg:pt-40"
    >
      {/* Soft light in the logo's colours behind the collage. */}
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-48 -z-10 h-[38rem] w-[38rem] rounded-full bg-navy-100/70 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 right-1/3 -z-10 h-[26rem] w-[26rem] rounded-full bg-lagoon-100/70 blur-[110px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker>{partnersHero.kicker}</Kicker>
            </Reveal>
            <Reveal
              as="h1"
              id="partners-hero-title"
              variant="lines"
              delay={180}
              margin="0px"
              className="mt-6 font-display text-title font-normal text-ink [font-variation-settings:'SOFT'_100]"
            >
              {partnersHero.title.map((line, lineIndex) => {
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
              <p className="mt-7 max-w-xl text-lead text-slate">{partnersHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={partnersHero.primaryCta.href}>{partnersHero.primaryCta.label}</Cta>
                <Cta href={partnersHero.secondaryCta.href} variant="outline">
                  {partnersHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* Collage. The wide frame sits at the top left, the tall one rises
              into its lower right corner, and the card takes the room left
              below the wide one (on phones it sits under the two instead,
              clear of the people in them). Past 38rem it stops growing, so wide
              screens keep the hero to its usual height. */}
          <div ref={collageRef} className="relative w-full lg:col-span-6 lg:ml-auto lg:max-w-[38rem]">
            <motion.div style={{ y: wideY }} className="w-[72%]">
              <Reveal variant="image" delay={120} margin="0px">
                {/* The shadow is a filter on a wrapper: a box-shadow on the
                    clip would be cut off at its square box. */}
                <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                  <div className="reveal-clip relative aspect-[4/3] overflow-hidden rounded-[6rem_1.75rem_1.75rem_1.75rem] bg-sand">
                    <div className="reveal-media absolute inset-0">
                      <Image
                        src={images.wide.src}
                        alt={images.wide.alt}
                        fill
                        preload
                        sizes="(min-width: 1760px) 440px, (min-width: 1024px) 34vw, 72vw"
                        className="object-cover"
                        style={{ objectPosition: images.wide.position }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </motion.div>

            <motion.div style={{ y: tallY }} className="relative -mt-[18%] ml-auto w-[50%]">
              <Reveal variant="image" delay={300} margin="0px">
                {/* The cream frame is padding, not a ring: a ring is a
                    box-shadow, which the clip would cut away. */}
                <div className="rounded-[1.9rem_1.9rem_6.5rem_1.9rem] bg-cream p-2 drop-shadow-[0_24px_30px_rgb(10_37_64/0.25)] sm:p-2.5">
                  <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[1.5rem_1.5rem_6rem_1.5rem] bg-sand">
                    <div className="reveal-media absolute inset-0">
                      <Image
                        src={images.tall.src}
                        alt={images.tall.alt}
                        fill
                        sizes="(min-width: 1760px) 310px, (min-width: 1024px) 24vw, 50vw"
                        className="object-cover"
                        style={{ objectPosition: images.tall.position }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Where the two frames meet. */}
              <Reveal
                variant="scale"
                delay={700}
                margin="0px"
                className="absolute -left-7 -top-7 z-10 sm:-left-9 sm:-top-9"
              >
                <span
                  aria-hidden="true"
                  className="relative grid h-14 w-14 place-items-center rounded-full bg-lagoon-600 text-white shadow-[0_18px_36px_-16px_rgb(14_122_118/0.8)] sm:h-18 sm:w-18"
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] -rotate-90 text-lagoon-600/45"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      pathLength={100}
                      strokeDasharray="100"
                      vectorEffect="non-scaling-stroke"
                      className="ring-draw"
                    />
                  </svg>
                  <Handshake className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.6} />
                </span>
              </Reveal>
            </motion.div>

            <Reveal
              variant="up"
              delay={560}
              margin="0px"
              className="relative z-10 mt-5 sm:absolute sm:bottom-[10%] sm:left-0 sm:mt-0 sm:w-[46%]"
            >
              <p className="flex items-start gap-3 rounded-card bg-white p-4 text-[0.8125rem] leading-relaxed text-slate shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:gap-4 sm:p-5 sm:text-[0.875rem]">
                <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white sm:grid">
                  <ShieldCheck aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                {partnersHero.card}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

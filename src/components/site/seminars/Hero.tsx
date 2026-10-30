"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cx } from "@/lib/cx";
import { seminarsHero } from "@/data/seminars";
import { logo } from "@/data/site";
import { Photo } from "../ui/Photo";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* The second and fourth phrases are the accent, in two of the logo's colours. */
const accentColours: Record<number, string> = { 1: "text-lagoon-600", 3: "text-ocean-600" };

/**
 * Seminars & Workshops hero, on cream like the other inner pages: the
 * overview's four-part subtitle as the headline, one phrase to a line, its
 * opening sentence beneath and the two calls to act. On the right a tall
 * photograph of a seminar under an arched top, and a round photograph of a
 * family workshop set into its lower left inside a cream ring; the two
 * drift apart a little as the page scrolls. The overview's line on
 * community languages sits on a card in the room the arch leaves at its
 * upper left.
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
  const { images } = seminarsHero;

  return (
    <section
      aria-labelledby="seminars-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-32 lg:pt-40"
    >
      {/* Soft light in the logo's colours behind the collage. */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-48 -z-10 h-[38rem] w-[38rem] rounded-full bg-lagoon-100/70 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 right-1/3 -z-10 h-[26rem] w-[26rem] rounded-full bg-saffron-100/80 blur-[110px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker>{seminarsHero.kicker}</Kicker>
            </Reveal>
            <Reveal
              as="h1"
              id="seminars-hero-title"
              variant="lines"
              delay={180}
              margin="0px"
              className="mt-6 font-display text-title font-normal text-ink [font-variation-settings:'SOFT'_100]"
            >
              {seminarsHero.title.map((phrase, index) => (
                <span key={phrase} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                  <span className="line-inner block" style={{ "--line": index } as CSSProperties}>
                    {accentColours[index] ? (
                      <em className={cx("font-light", accentColours[index])}>{phrase}</em>
                    ) : (
                      phrase
                    )}
                  </span>
                </span>
              ))}
            </Reveal>
            <Reveal delay={480} margin="0px">
              <p className="mt-7 max-w-2xl text-lead text-slate">{seminarsHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={seminarsHero.primaryCta.href}>{seminarsHero.primaryCta.label}</Cta>
                <Cta href={seminarsHero.secondaryCta.href} variant="outline">
                  {seminarsHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* Collage. The padding at the foot is the room the round
              photograph hangs into. */}
          <div
            ref={collageRef}
            className="relative mx-auto w-full max-w-md pb-14 lg:col-span-5 lg:ml-auto lg:mr-0 lg:max-w-[34rem] lg:pb-16"
          >
            <motion.div style={{ y: mainY }} className="ml-auto w-[80%]">
              <Reveal variant="image" delay={120} margin="0px">
                {/* The shadow is a filter on a wrapper: a box-shadow on the
                    clip would be cut off at its square box. */}
                <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                  <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand">
                    <div className="reveal-media absolute inset-0">
                      <Photo
                        image={images.main}
                        preload
                        sizes="(min-width: 1760px) 440px, (min-width: 1024px) 33vw, 80vw"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </motion.div>

            <motion.div style={{ y: circleY }} className="absolute bottom-0 left-0 w-[46%]">
              <Reveal variant="image" delay={300} margin="0px">
                {/* The cream ring is padding, not a ring: a ring is a
                    box-shadow, which the clip would cut away. */}
                <div className="rounded-full bg-cream p-2 drop-shadow-[0_24px_30px_rgb(10_37_64/0.25)] sm:p-2.5">
                  <div className="reveal-clip relative aspect-square overflow-hidden rounded-full bg-sand">
                    <div className="reveal-media absolute inset-0">
                      <Photo image={images.circle} sizes="(min-width: 1024px) 15vw, 42vw" />
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
              className="absolute left-0 top-4 z-10 max-w-[14rem] sm:top-8 sm:max-w-[17.5rem]"
            >
              <div className="flex items-start gap-3 rounded-card bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:p-5">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-9 w-auto shrink-0 sm:h-10"
                />
                <p className="text-[0.8125rem] font-semibold leading-snug text-ink">{seminarsHero.languages}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

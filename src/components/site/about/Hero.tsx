"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cx } from "@/lib/cx";
import { aboutHero } from "@/data/about";
import type { HomeImage } from "@/data/home";
import { logo } from "@/data/site";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* The last word of each line takes one of the logo's colours, as the other
   inner heroes set theirs on cream. */
const accentColours = ["text-lagoon-600", "text-ocean-600", "text-lagoon-600"];

/* Each frame's outer corner takes the large curve, so the four read as one
   rounded shape opening out from the centre, where the mark sits. */
const corners = [
  "rounded-[7rem_1.25rem_1.25rem_1.25rem]",
  "rounded-[1.25rem_7rem_1.25rem_1.25rem]",
  "rounded-[1.25rem_1.25rem_1.25rem_7rem]",
  "rounded-[1.25rem_1.25rem_7rem_1.25rem]",
];

/**
 * About hero, on cream like the other inner pages: the brief's tagline for
 * the Foundation as the headline, one phrase to a line, the belief its
 * "About us" block states beneath, and two calls to act. On the right, four
 * photographs of people learning and working together form one rounded
 * mosaic, its two columns drifting apart a little as the page scrolls, with
 * the logo's figures on a white disc where the four meet. The Foundation's
 * subtitle sits on a card across the mosaic's lower left edge.
 *
 * The header keeps its dark logo and links over this band (it is not in
 * SiteHeader's DARK_HERO).
 */
export function Hero() {
  const collageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: collageRef, offset: ["start start", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -24]);
  const rightY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 36]);
  const { images } = aboutHero;

  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-28 lg:pt-32"
    >
      {/* Soft light in the logo's colours behind the mosaic. */}
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-48 -z-10 h-[38rem] w-[38rem] rounded-full bg-saffron-100/80 blur-[120px]"
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
              <Kicker>{aboutHero.kicker}</Kicker>
            </Reveal>
            <Reveal
              as="h1"
              id="about-hero-title"
              variant="lines"
              delay={180}
              margin="0px"
              className="mt-6 font-display text-title font-normal text-ink [font-variation-settings:'SOFT'_100]"
            >
              {aboutHero.title.map((line, lineIndex) => {
                const words = line.split(" ");
                const accent = words.pop();
                return (
                  <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                    <span className="line-inner block" style={{ "--line": lineIndex } as CSSProperties}>
                      {words.length ? `${words.join(" ")} ` : null}
                      <em className={cx("font-light", accentColours[lineIndex])}>{accent}</em>
                    </span>
                  </span>
                );
              })}
            </Reveal>
            <Reveal delay={420} margin="0px">
              <p className="mt-7 max-w-xl text-lead text-slate">{aboutHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={aboutHero.primaryCta.href}>{aboutHero.primaryCta.label}</Cta>
                <Cta href={aboutHero.secondaryCta.href} variant="outline">
                  {aboutHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* Mosaic. Past 36rem it stops growing, so wide screens keep the
              hero to its usual height. */}
          <div ref={collageRef} className="relative w-full lg:col-span-6 lg:ml-auto lg:max-w-[36rem]">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[0, 1].map((column) => (
                <motion.div key={column} style={{ y: column === 0 ? leftY : rightY }} className="grid gap-3 sm:gap-4">
                  {[column, column + 2].map((index) => (
                    <Tile key={index} image={images[index]} corner={corners[index]} delay={120 + index * 110} />
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Where the four meet. */}
            <Reveal
              variant="scale"
              delay={640}
              margin="0px"
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-white shadow-[0_20px_40px_-18px_rgb(10_37_64/0.55)] ring-[6px] ring-cream sm:h-24 sm:w-24">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-11 w-auto sm:h-13"
                />
              </span>
            </Reveal>

            <Reveal
              variant="left"
              delay={760}
              margin="0px"
              className="absolute -bottom-5 left-3 z-10 max-w-[14rem] sm:left-5 sm:max-w-[17rem] lg:-left-8"
            >
              <p className="rounded-card bg-white px-5 py-4 text-[0.8125rem] font-semibold leading-snug text-ink shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                {aboutHero.card}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function Tile({ image, corner, delay }: { image: HomeImage; corner: string; delay: number }) {
  return (
    <Reveal variant="image" delay={delay} margin="0px">
      {/* The shadow is a filter on a wrapper: a box-shadow on the clip would
          be cut off at its square box and show in the corners the curves
          give up. */}
      <div className="drop-shadow-[0_24px_28px_rgb(10_37_64/0.18)]">
        <div className={cx("reveal-clip relative aspect-square overflow-hidden bg-sand", corner)}>
          <div className="reveal-media absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload={delay < 200}
              sizes="(min-width: 1760px) 290px, (min-width: 1024px) 22vw, 46vw"
              className="object-cover"
              style={{ objectPosition: image.position }}
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cx } from "@/lib/cx";
import { communityHero } from "@/data/community";
import type { HomeImage } from "@/data/home";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { logo } from "@/data/site";

/* The last word of each line takes one of the logo's colours, as the other
   heroes set theirs; on cream they are the full-strength teal and blue. */
const accentColours = ["text-lagoon-600", "text-ocean-600"];

/**
 * Community hero, on cream rather than navy: the page is about people
 * gathering, so it opens warm and light where Home and About open dark. The
 * brief's pair of lines is the headline, with its line beneath and two calls
 * to act; on the right three photographs of people together, cut in the arch
 * and leaf shapes the home page's portrait rows use, drift apart a little as
 * the page scrolls. The brief's closing line for the Foundation sits on a
 * card across the foot of the collage.
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
  const { images } = communityHero;

  return (
    <section
      aria-labelledby="community-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-28 lg:pt-32"
    >
      {/* Soft light in the logo's colours behind the collage. */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-lagoon-100/70 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 right-1/4 -z-10 h-[26rem] w-[26rem] rounded-full bg-saffron-100/80 blur-[110px]"
      />

      <Shell>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker>{communityHero.kicker}</Kicker>
            </Reveal>
            <Reveal
              as="h1"
              id="community-hero-title"
              variant="lines"
              delay={180}
              margin="0px"
              className="mt-6 font-display text-title font-normal text-ink [font-variation-settings:'SOFT'_100]"
            >
              {communityHero.title.map((line, lineIndex) => {
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
              <p className="mt-7 max-w-xl text-lead text-slate">{communityHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={communityHero.primaryCta.href}>{communityHero.primaryCta.label}</Cta>
                <Cta href={communityHero.secondaryCta.href} variant="outline">
                  {communityHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* Collage: a tall arch on the left, a leaf and a round-topped frame
              stacked on the right and set lower, so the three step down
              together. The padding at the foot is the room the card hangs
              into. */}
          <div ref={collageRef} className="relative pb-10 lg:col-span-6 lg:pb-12">
            <div className="grid grid-cols-[1.1fr_1fr] items-start gap-4 sm:gap-5">
              <motion.div style={{ y: leftY }}>
                <Photo
                  image={images.main}
                  delay={120}
                  shape="rounded-t-[999px] rounded-b-[1.75rem]"
                  aspect="aspect-[3/4.3]"
                  sizes="(min-width: 1760px) 450px, (min-width: 1024px) 26vw, 52vw"
                  preload
                />
              </motion.div>
              <motion.div style={{ y: rightY }} className="mt-10 space-y-4 sm:mt-14 sm:space-y-5">
                <Photo
                  image={images.top}
                  delay={260}
                  shape="rounded-[1.75rem_6rem_1.75rem_1.75rem]"
                  aspect="aspect-[5/4]"
                  sizes="(min-width: 1760px) 410px, (min-width: 1024px) 24vw, 46vw"
                />
                <Photo
                  image={images.foot}
                  delay={380}
                  shape="rounded-[1.75rem_1.75rem_6rem_1.75rem]"
                  aspect="aspect-[5/4]"
                  sizes="(min-width: 1760px) 410px, (min-width: 1024px) 24vw, 46vw"
                />
              </motion.div>
            </div>

            <Reveal
              variant="up"
              delay={560}
              margin="0px"
              className="absolute bottom-0 left-4 z-10 max-w-[17rem] sm:left-8 sm:max-w-[20rem]"
            >
              <div className="flex items-center gap-3 rounded-[1.25rem] bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-10 w-auto shrink-0"
                />
                <p className="text-[0.8125rem] font-semibold leading-snug text-ink">{communityHero.badge}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function Photo({
  image,
  delay,
  shape,
  aspect,
  sizes,
  preload = false,
}: {
  image: HomeImage;
  delay: number;
  shape: string;
  aspect: string;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <Reveal variant="image" delay={delay} margin="0px">
      {/* The shadow is a filter on a wrapper, not a box-shadow on the clip:
          the clip would cut a box-shadow off at its square box and leave it
          showing in the corners the curves give up. */}
      <div className="drop-shadow-[0_28px_32px_rgb(10_37_64/0.2)]">
        <div className={cx("reveal-clip relative overflow-hidden bg-sand", aspect, shape)}>
          <div className="reveal-media absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload={preload}
              sizes={sizes}
              className="object-cover"
              style={{ objectPosition: image.position }}
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

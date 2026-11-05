"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cx } from "@/lib/cx";
import { scholarshipsHero } from "@/data/scholarships";
import { logo } from "@/data/site";
import { Photo } from "../ui/Photo";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* Each phrase of the card takes one of the logo's colours in turn. */
const cardColours = ["text-ink", "text-lagoon-600", "text-ocean-600"];

/**
 * Scholarships hero, on cream like the other inner pages: the main banner's
 * headline, its two opening paragraphs and its two calls to act. On the
 * right, the document's "Opening Doors" made literal: two tall photographs
 * stand as the leaves of an arched doorway, each with a quarter of the arch
 * on its outer corner, and as the page scrolls they part a little, letting
 * warm light through the gap between them. The document's title line,
 * "Opening Doors. Supporting Potential. Transforming Futures.", sits on a
 * card across their foot.
 *
 * The header keeps its dark logo and links over this band (it is not in
 * SiteHeader's DARK_HERO).
 */
export function Hero() {
  const doorRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: doorRef, offset: ["start start", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -28]);
  const rightX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 28]);
  const glow = useTransform(scrollYProgress, [0, 0.6], reduceMotion ? [0.7, 0.7] : [0.35, 1]);
  const { images, card } = scholarshipsHero;

  return (
    <section
      aria-labelledby="scholarships-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-32 lg:pt-40"
    >
      {/* Soft light in the logo's colours behind the doorway. */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-lagoon-100/70 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-56 right-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-orange-soft blur-[110px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker>{scholarshipsHero.kicker}</Kicker>
            </Reveal>
            <Title
              as="h1"
              id="scholarships-hero-title"
              lead={scholarshipsHero.titleLead}
              accent={scholarshipsHero.titleAccent}
              delay={180}
              className="mt-6"
            />
            <Reveal delay={420} margin="0px">
              <p className="mt-7 max-w-2xl text-lead text-ink">{scholarshipsHero.lead}</p>
              <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-slate">
                {scholarshipsHero.description}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={scholarshipsHero.primaryCta.href}>{scholarshipsHero.primaryCta.label}</Cta>
                <Cta href={scholarshipsHero.secondaryCta.href} variant="outline">
                  {scholarshipsHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* The doorway. The padding at the foot is the room the card hangs
              down into. */}
          <div
            ref={doorRef}
            className="relative mx-auto w-full max-w-md pb-16 lg:col-span-5 lg:ml-auto lg:mr-0 lg:max-w-[32rem]"
          >
            <div className="relative aspect-[4/5]">
              {/* Light through the gap, brighter as the leaves part. */}
              <motion.div
                aria-hidden="true"
                style={{ opacity: glow }}
                className="absolute inset-y-[12%] left-1/2 -z-10 w-1/3 -translate-x-1/2 rounded-full bg-orange-soft blur-2xl"
              />
              <div className="flex h-full gap-[4%]">
                {[images.left, images.right].map((image, index) => (
                  <motion.div
                    key={image.pending ?? image.src}
                    style={{ x: index === 0 ? leftX : rightX }}
                    className="h-full w-[48%]"
                  >
                    <Reveal variant="image" delay={120 + index * 160} margin="0px" className="h-full">
                      {/* The shadow is a filter on a wrapper: a box-shadow on
                          the clip would be cut off at its square box. */}
                      <div className="h-full drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                        <div
                          className={cx(
                            "reveal-clip relative h-full overflow-hidden bg-sand",
                            /* A quarter of the arch on each leaf's outer
                               corner (100% of its width across, the same
                               length down), small corners elsewhere. */
                            index === 0
                              ? "rounded-[0.5rem_0.5rem_0.5rem_1.5rem] [border-top-left-radius:100%_38%]"
                              : "rounded-[0.5rem_0.5rem_1.5rem_0.5rem] [border-top-right-radius:100%_38%]",
                          )}
                        >
                          <div className="reveal-media absolute inset-0">
                            <Photo
                              image={image}
                              preload={index === 0}
                              sizes="(min-width: 1760px) 250px, (min-width: 1024px) 15vw, 44vw"
                            />
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* The document's title line, one phrase to a line. */}
            <Reveal
              variant="left"
              delay={620}
              margin="0px"
              className="absolute bottom-0 left-0 z-10 w-[17rem] sm:w-[21rem] lg:-left-8"
            >
              <div className="flex items-center gap-4 rounded-card bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:p-5">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-12 w-auto shrink-0"
                />
                <p className="font-display text-[1.125rem] leading-snug [font-variation-settings:'SOFT'_100] sm:text-[1.25rem]">
                  {card.map((phrase, index) => (
                    <span
                      key={phrase}
                      className={cx("block whitespace-nowrap", cardColours[index], index > 0 && "italic font-light")}
                    >
                      {phrase}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

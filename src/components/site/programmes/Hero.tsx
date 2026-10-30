"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cx } from "@/lib/cx";
import { programmesHero } from "@/data/programmes-page";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { logo } from "@/data/site";

/* The second word of each line takes one of the logo's colours. */
const accentColours = ["text-lagoon-600", "text-ocean-600"];

/** How long each of the card's words stays before the next rises in. */
const WORD_MS = 2200;

/**
 * Programmes hero, on cream like the other inner pages: the Centre's motto
 * as the headline, its line on who it supports beneath and the brief's two
 * calls to act. On the right two tall photographs of people learning stand
 * side by side, one arched and one cut with a leaf corner, the second set
 * lower; they drift apart a little as the page scrolls. A card across their
 * foot names what the programmes bring together, one word at a time, each
 * rising in as the last leaves (the full list is there for screen readers).
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
  const { images, card } = programmesHero;

  const [word, setWord] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setWord((current) => (current + 1) % card.words.length), WORD_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion, card.words.length]);

  return (
    <section
      aria-labelledby="programmes-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-32 lg:pt-40"
    >
      {/* Soft light in the logo's colours behind the collage. */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-lagoon-100/80 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-56 right-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-orange-soft opacity-80 blur-[110px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker>{programmesHero.kicker}</Kicker>
            </Reveal>
            <Reveal
              as="h1"
              id="programmes-hero-title"
              variant="lines"
              delay={180}
              margin="0px"
              className="mt-6 font-display text-title font-normal text-ink [font-variation-settings:'SOFT'_100]"
            >
              {programmesHero.title.map((line, lineIndex) => {
                const [first, second] = line.split(" ");
                return (
                  <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                    <span className="line-inner block" style={{ "--line": lineIndex } as CSSProperties}>
                      {first} <em className={cx("font-light", accentColours[lineIndex])}>{second}</em>
                    </span>
                  </span>
                );
              })}
            </Reveal>
            <Reveal delay={420} margin="0px">
              <p className="mt-7 max-w-xl text-lead text-slate">{programmesHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={programmesHero.primaryCta.href}>{programmesHero.primaryCta.label}</Cta>
                <Cta href={programmesHero.secondaryCta.href} variant="outline">
                  {programmesHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* Collage. The padding at the foot is the room the lower
              photograph and the card hang down into. */}
          <div ref={collageRef} className="relative w-full pb-20 lg:col-span-6 lg:ml-auto lg:max-w-[38rem] lg:pb-24">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <motion.div style={{ y: leftY }}>
                <Reveal variant="image" delay={120} margin="0px">
                  {/* The shadow is a filter on a wrapper: a box-shadow on the
                      clip would be cut off at its square box. */}
                  <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                    <div className="reveal-clip relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand">
                      <div className="reveal-media absolute inset-0">
                        <Image
                          src={images.main.src}
                          alt={images.main.alt}
                          fill
                          preload
                          sizes="(min-width: 1760px) 300px, (min-width: 1024px) 19vw, 46vw"
                          className="object-cover"
                          style={{ objectPosition: images.main.position }}
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </motion.div>

              <motion.div style={{ y: rightY }} className="mt-16 sm:mt-20">
                <Reveal variant="image" delay={280} margin="0px">
                  <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                    <div className="reveal-clip relative aspect-[3/4] overflow-hidden rounded-[2rem_6rem_2rem_2rem] bg-sand">
                      <div className="reveal-media absolute inset-0">
                        <Image
                          src={images.side.src}
                          alt={images.side.alt}
                          fill
                          preload
                          sizes="(min-width: 1760px) 300px, (min-width: 1024px) 19vw, 46vw"
                          className="object-cover"
                          style={{ objectPosition: images.side.position }}
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </motion.div>
            </div>

            {/* What the programmes bring together, one word at a time. */}
            <Reveal
              variant="left"
              delay={560}
              margin="0px"
              className="absolute bottom-0 left-0 z-10 w-[16rem] sm:w-[21.5rem] lg:-left-8"
            >
              <div className="flex items-center gap-4 rounded-card bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:p-5">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-11 w-auto shrink-0 sm:h-12"
                />
                <div className="min-w-0">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">{card.lead}</p>
                  <p className="sr-only">{card.words.join(", ")}.</p>
                  <p
                    aria-hidden="true"
                    className="relative mt-1 h-[1.3em] overflow-hidden font-display text-[1.625rem] leading-[1.3] text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.875rem]"
                  >
                    {card.words.map((text, index) => (
                      <span
                        key={text}
                        className={cx(
                          "absolute inset-0 transition-[translate,opacity] duration-700 ease-out-soft",
                          index === word
                            ? "translate-y-0 opacity-100"
                            : index === (word - 1 + card.words.length) % card.words.length
                              ? "-translate-y-full opacity-0"
                              : "translate-y-full opacity-0",
                        )}
                      >
                        {text}
                        {index < card.words.length - 1 ? <span className="text-orange"> +</span> : null}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

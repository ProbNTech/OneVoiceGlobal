"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cx } from "@/lib/cx";
import { brand, logo } from "@/data/site";
import { homeHero, type HomeImage } from "@/data/home";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* The three key words of the headline take light tints of the logo's three
   figure colours, in the order they sit around the mark. */
const accentColours = ["text-ocean-300", "text-lagoon-300", "text-saffron-400"];

const SLIDE_MS = 2500;
/* The cross-fade overlaps the next slide's time, so it stays short. */
const FADE_MS = 900;

/**
 * Home hero: a full-screen slideshow of photographs, one for each word of the
 * motto (Learn. Develop. Connect. Progress.), with the headline over it. Each
 * slide settles out of a slow zoom and cross-fades into the next; it advances
 * when its progress bar fills, so bar and slide never drift apart; the bar
 * holds while the hero is off screen or motion is reduced. As the page scrolls away the photographs drift
 * slower than the page and the copy lifts and fades.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2 });
  const paused = Boolean(reduceMotion) || !inView;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const still = Boolean(reduceMotion);
  const backdropY = useTransform(scrollYProgress, [0, 1], still ? ["0%", "0%"] : ["0%", "22%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], still ? [1, 1] : [1, 0.15]);

  const slides = homeHero.slides;
  const next = () => setIndex((current) => (current + 1) % slides.length);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[max(100svh,40rem)] flex-col overflow-clip bg-navy-950 text-white"
    >
      {/* The photographs. */}
      <motion.div aria-hidden="true" style={{ y: backdropY }} className="absolute inset-0 -z-20">
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          const image: HomeImage = slide.image;
          return (
            <div
              key={slide.word}
              className={cx(
                "absolute inset-0 transition-opacity duration-[900ms] ease-out",
                active ? "z-10 opacity-100" : "z-0 opacity-0",
              )}
            >
              <Image
                src={image.src}
                alt=""
                fill
                preload={slideIndex === 0}
                sizes="100vw"
                quality={80}
                /* Phones see a tall slice of a wide photograph, so a slide
                   can steer that slice separately (`positionMobile`). */
                className={cx(
                  "object-cover [object-position:var(--position-mobile)] md:[object-position:var(--position)]",
                  active && "animate-kenburns",
                  paused && "[animation-play-state:paused]",
                )}
                style={
                  {
                    "--position": image.position ?? "50% 50%",
                    "--position-mobile": image.positionMobile ?? image.position ?? "50% 50%",
                    "--slide-duration": `${SLIDE_MS + FADE_MS}ms`,
                  } as CSSProperties
                }
              />
            </div>
          );
        })}
      </motion.div>

      {/* Shade where the copy sits, thinning out across the picture. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy-950/60 md:bg-transparent md:bg-[linear-gradient(90deg,rgb(6_26_48/0.88)_0%,rgb(6_26_48/0.7)_40%,rgb(6_26_48/0.25)_72%,rgb(6_26_48/0.12)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-linear-to-t from-navy-950/75 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-navy-950/55 to-transparent"
      />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="flex flex-1 items-center pb-44 pt-32 sm:pb-40 lg:pt-36"
      >
        <Shell>
          <div className="max-w-3xl">
            <Reveal variant="fade" delay={80}>
              <Kicker tone="dark">{homeHero.kicker}</Kicker>
            </Reveal>
            <Reveal
              as="h1"
              id="hero-title"
              variant="lines"
              delay={180}
              className="mt-6 font-display text-display font-normal text-white [font-variation-settings:'SOFT'_100]"
            >
              {homeHero.title.map((line, lineIndex) => {
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
            <Reveal delay={560}>
              <p className="mt-8 max-w-xl text-lead text-white/80">{homeHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={homeHero.primaryCta.href} variant="saffron">
                  {homeHero.primaryCta.label}
                </Cta>
                <Cta href={homeHero.secondaryCta.href} variant="outline-light">
                  {homeHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>
        </Shell>
      </motion.div>

      {/* Foot of the hero: the slides on the left, the turning badge in the corner. */}
      <div className="absolute inset-x-0 bottom-0">
        <Shell className="flex items-end justify-between gap-6 pb-7 sm:pb-10">
          <Reveal
            variant="fade"
            delay={900}
            margin="0px"
            className="flex min-w-0 flex-1 items-end gap-4 sm:gap-6 lg:max-w-2xl"
          >
            <ol className="flex min-w-0 flex-1 gap-2.5 sm:gap-5" aria-label="Slides">
              {slides.map((slide, slideIndex) => {
                const active = slideIndex === index;
                const done = slideIndex < index;
                return (
                  <li key={slide.word} className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setIndex(slideIndex)}
                      aria-current={active ? "true" : undefined}
                      aria-label={slide.word}
                      // On phones only the bars show, so the button keeps a finger-sized height.
                      className="group/slide w-full cursor-pointer py-3 text-left sm:py-0"
                    >
                      <span
                        className={cx(
                          "hidden whitespace-nowrap font-display text-[0.8125rem] transition-colors duration-500 sm:block [font-variation-settings:'SOFT'_100] sm:text-[1.25rem] lg:text-[1.5rem]",
                          active ? "text-white" : "text-white/55 group-hover/slide:text-white/85",
                        )}
                      >
                        {slide.word}.
                      </span>
                      <span className="block h-0.5 overflow-hidden rounded-full bg-white/25 sm:mt-2.5">
                        {active ? (
                          <span
                            key={`${index}`}
                            onAnimationEnd={next}
                            className={cx(
                              "block h-full origin-left rounded-full bg-saffron-400 animate-slide-progress",
                              paused && "[animation-play-state:paused]",
                            )}
                            style={{ "--slide-duration": `${SLIDE_MS}ms` } as CSSProperties}
                          />
                        ) : (
                          <span className={cx("block h-full rounded-full bg-white/70", done ? "w-full" : "w-0")} />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal variant="scale" delay={1000} margin="0px" className="shrink-0">
            <TaglineBadge />
          </Reveal>
        </Shell>
      </div>
    </section>
  );
}

/** The tagline set on a circle around the logo mark, turning slowly. */
function TaglineBadge() {
  const text = `${brand.tagline.replace(/, /g, " · ")} · `;
  return (
    <div className="relative grid h-24 w-24 place-items-center rounded-full bg-white/95 shadow-[0_24px_50px_-20px_rgb(0_0_0/0.55)] sm:h-32 sm:w-32 lg:h-40 lg:w-40">
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow text-ink"
      >
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current text-[11px] font-semibold uppercase tracking-[0.14em]">
          {/* Stretched to the circle exactly, so the phrase meets its own start. */}
          <textPath href="#badge-circle" textLength={488} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <Image
        src={logo.mark.src}
        alt=""
        width={logo.mark.width}
        height={logo.mark.height}
        className="h-8 w-auto sm:h-11 lg:h-14"
      />
      <span className="sr-only">{brand.tagline}</span>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { hero } from "@/data/home";

/**
 * Hero — the most important section on the page (brief section 02 / spec H-02).
 *
 * Follows the approved design: a full-bleed community photograph with a deep
 * navy gradient wash from the left so the headline stays legible, a left-aligned
 * three-line headline, a warm-gold primary action beside a white outlined
 * secondary, the supporting tagline behind a gold rule, and a soft curved
 * divider sweeping into the ivory section below.
 *
 * Client component purely for the staggered on-mount choreography; it degrades
 * to a static, fully legible hero when the viewer prefers reduced motion.
 */
export function HeroSection() {
  const shouldReduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.12,
        delayChildren: shouldReduce ? 0 : 0.1,
      },
    },
  };

  const item: Variants = shouldReduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
        },
      };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[580px] items-center overflow-hidden bg-brand-navy lg:min-h-[82vh]"
    >
      {/* Photograph */}
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        sizes="100vw"
        // On desktop the full frame is visible and this has no effect; on
        // narrow viewports it holds the crop on the exchange at the centre of
        // the photograph rather than drifting onto the right-hand edge.
        className="object-cover object-[58%_center]"
      />

      {/* Brand wash at 10% — keeps the photograph clearly visible. */}
      <div aria-hidden="true" className="absolute inset-0 bg-brand-navy/10" />

      {/* Narrow legibility gradient behind the copy column only, so the white
          headline keeps sufficient contrast. It clears well before the faces. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/25 to-transparent"
      />

      {/* Content */}
      <div className="container-page relative z-10 pb-28 pt-16 sm:pb-32 sm:pt-20 lg:pb-36 lg:pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.p
            variants={item}
            className="section-eyebrow mb-6 font-bold uppercase tracking-[0.18em] text-brand-gold"
          >
            {hero.label}
          </motion.p>

          <motion.h1
            variants={item}
            id="hero-heading"
            className="font-heading text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]"
          >
            {hero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/80"
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href={hero.primaryCta.href}
              className="gold-sheen group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-gold px-6 text-[0.9375rem] font-semibold text-brand-ink outline-none transition-colors hover:bg-brand-gold-hover focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              {hero.primaryCta.label}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            <Link
              href={hero.secondaryCta.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/40 px-6 text-[0.9375rem] font-semibold text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              {hero.secondaryCta.label}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-10 border-l-2 border-brand-gold pl-4 text-sm font-medium tracking-[0.12em] text-white/85"
          >
            {hero.supporting}
          </motion.p>
        </motion.div>
      </div>

      {/* Curved divider into the ivory band below */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 h-6 bg-brand-ivory sm:h-8 lg:h-10"
        style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }}
      />
    </section>
  );
}

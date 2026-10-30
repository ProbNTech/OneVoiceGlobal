"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { HomeImage } from "@/data/home";
import type { NavLink } from "@/data/site";
import { cx } from "@/lib/cx";
import { Photo } from "./Photo";
import { Cta, Kicker, Shell, Title } from "./primitives";
import { Reveal } from "./Reveal";

/**
 * The closing call to action, as a photographic banner inside the page
 * measure (after the CWEF sponsorship banner). The copy is centred and runs
 * the full width of the banner, so it stays a few lines tall; the photograph
 * fills the banner behind it and drifts a little slower than the page.
 *
 * The shade over the photograph is the logo's own blue running into its
 * teal, bright rather than near-black, lifted by a soft light at the top.
 * Two dotted rings, after the circle of dots round the logo's emblem, turn
 * slowly at the sides on wider screens (and hold still under reduced
 * motion), and the main button carries a soft orange glow.
 */
export function CtaBanner({
  id,
  kicker,
  titleLead,
  titleAccent,
  description,
  primaryCta,
  secondaryCta,
  image,
}: {
  /** The title's id, which the section is labelled by. */
  id: string;
  kicker: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  image: HomeImage;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-10%", "10%"]);

  return (
    <section aria-labelledby={id} className="relative isolate bg-cream py-band">
      <Shell>
        <Reveal variant="scale">
          <div
            ref={ref}
            className="relative isolate overflow-hidden rounded-panel bg-ocean-700 px-6 py-12 text-center text-white shadow-[0_50px_90px_-45px_rgb(11_83_148/0.8)] ring-1 ring-inset ring-white/15 sm:px-12 lg:py-16"
          >
            <motion.div aria-hidden="true" style={{ y }} className="absolute inset-x-0 -inset-y-[14%] -z-20">
              <Photo image={image} decorative sizes="(min-width: 1920px) 1760px, 100vw" quality={80} />
            </motion.div>
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgb(10_70_125/0.9)_0%,rgb(11_83_148/0.8)_45%,rgb(14_122_118/0.86)_100%)]"
            />
            <div
              aria-hidden="true"
              className="absolute -top-48 left-1/2 -z-10 h-[24rem] w-[44rem] -translate-x-1/2 rounded-full bg-ocean-300/30 blur-[110px]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-40 -left-24 -z-10 h-[24rem] w-[24rem] rounded-full bg-lagoon-300/35 blur-[110px]"
            />
            <DotRing className="-right-28 -top-28 hidden h-[22rem] w-[22rem] motion-safe:animate-orbit sm:block lg:-right-20 lg:h-[28rem] lg:w-[28rem]" />
            <DotRing className="-bottom-36 -left-36 hidden h-[18rem] w-[18rem] motion-safe:animate-orbit-counter sm:block lg:h-[22rem] lg:w-[22rem]" />

            <Kicker tone="dark" className="justify-center">
              {kicker}
            </Kicker>
            <Title
              id={id}
              lead={titleLead}
              accent={titleAccent}
              tone="dark"
              accentTone="saffron-light"
              inline
              className="mx-auto mt-5 max-w-5xl"
            />
            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-3xl text-lead text-white/90">{description}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Cta
                  href={primaryCta.href}
                  variant="saffron"
                  className="rounded-full shadow-[0_18px_40px_-14px_color-mix(in_srgb,var(--orange-bright-2)_80%,transparent)]"
                >
                  {primaryCta.label}
                </Cta>
                <Cta href={secondaryCta.href} variant="outline-light">
                  {secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}

/* A ring of dots in the logo's colours, mostly white with an orange and a
   teal dot set among them, like the circle round the emblem. */
function DotRing({ className }: { className: string }) {
  const count = 48;
  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" className={cx("absolute -z-10 opacity-50", className)}>
      {Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const accent = index % 12 === 5 ? "fill-orange" : index % 12 === 11 ? "fill-lagoon-300" : "fill-white/75";
        return (
          <circle
            key={index}
            cx={(100 + Math.cos(angle) * 92).toFixed(2)}
            cy={(100 + Math.sin(angle) * 92).toFixed(2)}
            r={index % 12 === 5 || index % 12 === 11 ? 3.6 : 2}
            className={accent}
          />
        );
      })}
    </svg>
  );
}

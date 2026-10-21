"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { homeFinalCta } from "@/data/home";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Final call to action, as a photographic banner inside the page measure
 * (after the CWEF sponsorship banner). The copy is centred and runs the full
 * width of the banner, so it stays a few lines tall; the photograph fills the
 * banner behind it under an even shade and drifts a little slower than the
 * page.
 */
export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-10%", "10%"]);
  const { image } = homeFinalCta;

  return (
    <section aria-labelledby="cta-title" className="relative isolate bg-cream py-band">
      <Shell>
        <Reveal variant="scale">
          <div
            ref={ref}
            className="relative isolate overflow-hidden rounded-panel bg-navy-950 px-6 py-12 text-center text-white shadow-[0_50px_90px_-50px_rgb(6_26_48/0.75)] sm:px-12 lg:py-16"
          >
            <motion.div aria-hidden="true" style={{ y }} className="absolute inset-x-0 -inset-y-[14%] -z-20">
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 1920px) 1760px, 100vw"
                quality={80}
                className="object-cover"
                style={{ objectPosition: image.position }}
              />
            </motion.div>
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-950/72" />

            <Kicker tone="dark" className="justify-center">
              {homeFinalCta.closing}
            </Kicker>
            <Title
              id="cta-title"
              lead={homeFinalCta.titleLead}
              accent={homeFinalCta.titleAccent}
              tone="dark"
              accentTone="saffron"
              inline
              className="mx-auto mt-5 max-w-5xl"
            />
            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-3xl text-lead text-white/80">{homeFinalCta.description}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Cta href={homeFinalCta.primaryCta.href} variant="saffron">
                  {homeFinalCta.primaryCta.label}
                </Cta>
                <Cta href={homeFinalCta.secondaryCta.href} variant="outline-light">
                  {homeFinalCta.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}

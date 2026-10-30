"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { contactHero } from "@/data/contact";
import { cx } from "@/lib/cx";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { logo } from "@/data/site";

/* The three dots of the logo, as a reply being written. */
const typingDots = ["bg-ocean-600", "bg-lagoon-500", "bg-saffron-500"];

/**
 * Contact hero, on cream like the other inner pages: the brief's "Start
 * with one conversation" as the headline, its welcome to enquiries beneath
 * and the two calls to act, both of which open the form below. On the right,
 * two photographs of people talking, cut like speech bubbles (each has one
 * near-square corner, the tail): a tall one, and a square one that answers
 * it from the lower right, with a small bubble of three dots in the logo's
 * colours, as a reply being written. The two drift apart a little as the
 * page scrolls. The line before the headline in the brief sits on a white
 * bubble across the tall photograph's upper edge.
 *
 * The header keeps its dark logo and links over this band (it is not in
 * SiteHeader's DARK_HERO).
 */
export function Hero() {
  const collageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: collageRef, offset: ["start start", "end start"] });
  const mainY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -30]);
  const replyY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 60]);
  const { images } = contactHero;

  return (
    <section
      aria-labelledby="contact-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-32 lg:pt-40"
    >
      {/* Soft light in the logo's colours behind the collage. */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-lagoon-100/80 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-56 right-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-saffron-100/80 blur-[110px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker>{contactHero.kicker}</Kicker>
            </Reveal>
            <Title
              as="h1"
              id="contact-hero-title"
              lead={contactHero.titleLead}
              accent={contactHero.titleAccent}
              delay={180}
              className="mt-6"
            />
            <Reveal delay={420} margin="0px">
              <p className="mt-7 max-w-xl text-lead text-slate">{contactHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={contactHero.primaryCta.href}>{contactHero.primaryCta.label}</Cta>
                <Cta href={contactHero.secondaryCta.href} variant="outline">
                  {contactHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* Collage. The padding at the foot is the room the answering
              photograph hangs down into; past 38rem it stops growing, so
              wide screens keep the hero to its usual height. */}
          <div ref={collageRef} className="relative w-full pb-14 lg:col-span-6 lg:ml-auto lg:max-w-[38rem] lg:pb-16">
            <motion.div style={{ y: mainY }} className="w-[76%]">
              <Reveal variant="image" delay={120} margin="0px">
                {/* The shadow is a filter on a wrapper: a box-shadow on the
                    clip would be cut off at its square box. */}
                <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                  <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[2.5rem_2.5rem_2.5rem_0.75rem] bg-sand">
                    <div className="reveal-media absolute inset-0">
                      <Image
                        src={images.main.src}
                        alt={images.main.alt}
                        fill
                        preload
                        sizes="(min-width: 1760px) 600px, (min-width: 1024px) 38vw, 76vw"
                        className="object-cover"
                        style={{ objectPosition: images.main.position }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </motion.div>

            <motion.div style={{ y: replyY }} className="absolute bottom-0 right-0 w-[46%]">
              <Reveal variant="image" delay={300} margin="0px">
                {/* The cream frame is padding, not a ring: a ring is a
                    box-shadow, which the clip would cut away. */}
                <div className="rounded-[2.75rem_2.75rem_0.9rem_2.75rem] bg-cream p-2 drop-shadow-[0_24px_30px_rgb(10_37_64/0.25)] sm:p-2.5">
                  <div className="reveal-clip relative aspect-square overflow-hidden rounded-[2.25rem_2.25rem_0.5rem_2.25rem] bg-sand">
                    <div className="reveal-media absolute inset-0">
                      <Image
                        src={images.reply.src}
                        alt={images.reply.alt}
                        fill
                        sizes="(min-width: 1760px) 300px, (min-width: 1024px) 22vw, 46vw"
                        className="object-cover"
                        style={{ objectPosition: images.reply.position }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="scale" delay={900} margin="0px" className="absolute -top-6 left-3 sm:-top-7 sm:left-5">
                <div
                  aria-hidden="true"
                  className="flex h-10 items-center gap-1.5 rounded-[1.25rem_1.25rem_1.25rem_0.35rem] bg-white px-4 shadow-[0_18px_36px_-18px_rgb(10_37_64/0.45)] sm:h-11"
                >
                  {typingDots.map((colour, index) => (
                    <span
                      key={colour}
                      className={cx("h-2 w-2 animate-typing rounded-full motion-reduce:animate-none", colour)}
                      style={{ animationDelay: `${index * 160}ms` }}
                    />
                  ))}
                </div>
              </Reveal>
            </motion.div>

            <Reveal
              variant="left"
              delay={560}
              margin="0px"
              /* Across the tall photograph's upper right edge, in the room
                 to its right. */
              className="absolute right-0 top-8 z-10 max-w-[13.5rem] sm:top-12 sm:max-w-[17rem]"
            >
              <div className="flex items-center gap-3 rounded-[1.5rem_1.5rem_0.4rem_1.5rem] bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:p-5">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-9 w-auto shrink-0 sm:h-10"
                />
                <p className="font-display text-[1rem] leading-snug text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.125rem]">
                  {contactHero.card}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

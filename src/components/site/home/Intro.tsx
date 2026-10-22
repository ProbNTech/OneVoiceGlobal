"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  BriefcaseBusiness,
  GraduationCap,
  HandHeart,
  House,
  Landmark,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { homeIntro, type ConnectIcon } from "@/data/home";
import { Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<ConnectIcon, LucideIcon> = {
  residents: House,
  organisations: UsersRound,
  authorities: Landmark,
  education: GraduationCap,
  charities: HandHeart,
  employers: BriefcaseBusiness,
};

/**
 * The hero's opening paragraph, as an introduction to the Foundation: a
 * collage of two photographs on the left (the smaller one drifting against
 * the larger as the page scrolls, with the Foundation's subtitle on a card
 * over them), and on the right the statement, its purpose, and the six groups
 * it exists to connect, each an icon with its name beside it.
 */
export function Intro() {
  const collageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: collageRef, offset: ["start end", "end start"] });
  const insetY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [60, -60]);
  const { statement, images } = homeIntro;

  return (
    <section aria-labelledby="intro-title" className="relative isolate overflow-clip bg-cream py-band">
      <Shell>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Collage */}
          <div ref={collageRef} className="relative pb-16 lg:col-span-6 lg:pb-20">
            <Reveal variant="image" className="w-[82%]">
              <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[2rem_9rem_2rem_2rem] bg-sand">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={images.main.src}
                      alt={images.main.alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 82vw"
                      className="object-cover"
                      style={{ objectPosition: images.main.position }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <motion.div style={{ y: insetY }} className="absolute bottom-0 right-0 w-[52%]">
              <Reveal variant="image" delay={250}>
                <div className="reveal-clip relative aspect-square overflow-hidden rounded-[1.75rem] bg-sand shadow-[0_40px_80px_-40px_rgb(10_37_64/0.6)] ring-8 ring-cream">
                  <div className="reveal-media absolute inset-0">
                    <Image
                      src={images.inset.src}
                      alt={images.inset.alt}
                      fill
                      sizes="(min-width: 1024px) 26vw, 52vw"
                      className="object-cover"
                      style={{ objectPosition: images.inset.position }}
                    />
                  </div>
                </div>
              </Reveal>
            </motion.div>

            <Reveal
              variant="left"
              delay={450}
              className="absolute left-4 top-8 max-w-[15rem] sm:left-8 lg:-left-6 lg:top-12"
            >
              <div className="flex items-center gap-3 rounded-[1.25rem] bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <Image src="/images/brand/mark.png" alt="" width={477} height={503} className="h-10 w-auto shrink-0" />
                <p className="text-[0.8125rem] font-semibold leading-snug text-ink">{homeIntro.badge}</p>
              </div>
            </Reveal>
          </div>

          {/* Statement */}
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <Kicker>
                <span id="intro-title">{homeIntro.kicker}</span>
              </Kicker>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 font-display text-[clamp(1.625rem,2.5vw,2.375rem)] font-normal leading-[1.24] tracking-[-0.02em] text-ink [font-variation-settings:'SOFT'_100]">
                {statement.before}
                <em className="font-light text-lagoon-600">{statement.accent}</em>
                {statement.after}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-7 max-w-2xl text-lead text-slate">{homeIntro.purpose}</p>
            </Reveal>

            <ul aria-label="Who OneVoice connects" className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              {homeIntro.connects.map((group, index) => {
                const Icon = icons[group.icon];
                return (
                  <Reveal
                    as="li"
                    key={group.label}
                    variant="up"
                    delay={250 + index * 70}
                    className="group flex items-center gap-3"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lagoon-50 text-lagoon-600 transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-[0.9375rem] font-semibold leading-snug text-ink">{group.label}</span>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </Shell>
    </section>
  );
}

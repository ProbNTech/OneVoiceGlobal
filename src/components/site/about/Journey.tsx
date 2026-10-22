"use client";

import Image from "next/image";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { ChevronDown } from "lucide-react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { cx } from "@/lib/cx";
import { aboutJourney } from "@/data/about";
import type { HomeImage } from "@/data/home";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/** Follows a media query, and reports false until the page is interactive. */
function useMedia(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * The OneVoice Journey drawn as a diagram down the left of the panel:
 * Connect at the head, forking into Discover and Develop, each of which leads
 * on to its own step. Three photographs stand beside it, and London sits
 * behind the whole panel under a heavy wash.
 *
 * The nodes light one after another as the panel rises into view. The page is
 * never held; the lighting is paced against the panel's own climb up the
 * screen. The nodes carry no reveal of their own: the panel already decides
 * when each is lit, and a second thing driving the same opacity is how the
 * steps went blank before.
 *
 * Below large screens the diagram has no room, so the branches fold into one
 * column and the joins are hidden; the nodes then stand in the brief's order,
 * one to five, and every one of them is lit.
 */
export function Journey() {
  const panel = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const wide = useMedia("(min-width: 1024px)");
  const drawing = wide && !reduceMotion;
  const [lit, setLit] = useState(0);
  const steps = aboutJourney.steps;

  const { scrollYProgress } = useScroll({ target: panel, offset: ["start 0.9", "start 0.35"] });
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.max(0, Math.min(steps.length - 1, Math.floor(progress * (steps.length + 1))));
    setLit((current) => (current === next ? current : next));
  });

  const node = (index: number) => {
    const step = steps[index]!;
    const isLit = !drawing || index <= lit;
    return (
      <div
        className={cx(
          "flex min-w-0 flex-col items-center text-center transition-opacity duration-700 ease-out-soft",
          isLit ? "opacity-100" : "opacity-30",
        )}
      >
        <span
          aria-hidden="true"
          className={cx(
            "grid h-16 w-16 shrink-0 place-items-center rounded-full text-[1rem] font-bold tabular-nums transition-colors duration-700 ease-out-soft",
            isLit
              ? "bg-saffron-400 text-navy-950 shadow-[0_0_0_0.4375rem_rgb(233_176_79/0.15)]"
              : "bg-white/[0.07] text-white/55 ring-1 ring-inset ring-white/20",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-5 font-display text-[clamp(1.5rem,1.9vw,2rem)] leading-tight text-white [font-variation-settings:'SOFT'_100]">
          {step.name}
        </h3>
        <p className="mt-2.5 max-w-[16rem] text-[1.0625rem] leading-relaxed text-white/75">{step.line}</p>
      </div>
    );
  };

  return (
    <section ref={panel} aria-labelledby="journey-title" className="relative isolate overflow-clip bg-cream py-band">
      <Shell>
        <div className="relative isolate overflow-hidden rounded-panel bg-navy-950 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          {/* London, drifting as the page scrolls. */}
          <div aria-hidden="true" className="absolute inset-0 -z-30">
            <div className="parallax absolute inset-x-0 -inset-y-[8%]">
              <Image
                src={aboutJourney.backdrop.src}
                alt=""
                fill
                quality={80}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: aboutJourney.backdrop.position }}
              />
            </div>
          </div>
          {/* Deeper where the copy sits, lighter across the middle. */}
          <div aria-hidden="true" className="absolute inset-0 -z-20 bg-navy-950/84" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(6_26_48/0.6)_0%,rgb(6_26_48/0.2)_45%,rgb(6_26_48/0.75)_100%)]"
          />

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="text-center">
                <Reveal variant="fade" className="flex justify-center">
                  <Kicker tone="dark">{aboutJourney.kicker}</Kicker>
                </Reveal>
                <Title
                  id="journey-title"
                  lead={aboutJourney.titleLead}
                  accent={aboutJourney.titleAccent}
                  tone="dark"
                  accentTone="saffron"
                  className="mt-5"
                />
              </div>

              <div className="mt-10 grid gap-y-10 lg:mt-12 lg:gap-y-0">
                {/* The head of the journey. */}
                <div className="lg:flex lg:justify-center">{node(0)}</div>

                {/* The fork: a stem, then an elbow out to each branch.
                    Drawn as two bordered boxes meeting at the stem, so the
                    turns are rounded rather than square corners. */}
                <div aria-hidden="true" className="relative hidden h-20 lg:block">
                  <span className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-white/30" />
                  <span className="absolute left-1/4 top-8 h-12 w-1/4 rounded-tl-2xl border-l border-t border-white/30" />
                  <span className="absolute right-1/4 top-8 h-12 w-1/4 rounded-tr-2xl border-r border-t border-white/30" />
                </div>

                <div className="grid gap-y-10 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-0">
                  {node(1)}
                  {node(2)}
                </div>

                {/* A drop from each branch to the step it leads to. */}
                <div aria-hidden="true" className="hidden h-16 lg:grid lg:grid-cols-2 lg:gap-x-10">
                  <Drop />
                  <Drop />
                </div>

                <div className="grid gap-y-10 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-0">
                  {node(3)}
                  {node(4)}
                </div>
              </div>

              <Reveal variant="up" delay={200} className="mt-12 flex justify-center">
                <Cta href={aboutJourney.cta.href} variant="saffron">
                  {aboutJourney.cta.label}
                </Cta>
              </Reveal>
            </div>

            {/* One wide photograph over two square ones. */}
            <div className="grid gap-4 lg:col-span-5">
              <Photo
                image={aboutJourney.images[0]}
                ratio="aspect-[4/3]"
                shape="rounded-[2rem_1.25rem_1.25rem_1.25rem]"
                wide
              />
              <div className="grid grid-cols-2 gap-4">
                <Photo image={aboutJourney.images[1]} ratio="aspect-square" shape="rounded-[1.25rem]" />
                <Photo
                  image={aboutJourney.images[2]}
                  ratio="aspect-square"
                  shape="rounded-[1.25rem_1.25rem_1.25rem_2.5rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function Photo({
  image,
  ratio,
  shape,
  wide = false,
}: {
  image: HomeImage;
  ratio: string;
  shape: string;
  wide?: boolean;
}) {
  return (
    <Reveal variant="image" className={cx("group relative", ratio)}>
      <div className={cx("reveal-clip absolute inset-0 overflow-hidden bg-navy-900 ring-1 ring-white/10", shape)}>
        <div className="reveal-media absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={
              wide
                ? "(min-width: 1760px) 680px, (min-width: 1024px) 40vw, 100vw"
                : "(min-width: 1760px) 330px, (min-width: 1024px) 20vw, 50vw"
            }
            className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.07]"
            style={{ objectPosition: image.position }}
          />
        </div>
      </div>
    </Reveal>
  );
}

function Drop() {
  return (
    <div className="relative">
      <span className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-white/30" />
      <ChevronDown className="absolute left-1/2 top-10 h-6 w-6 -translate-x-1/2 text-white/40" strokeWidth={1.6} />
    </div>
  );
}

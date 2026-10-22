"use client";

import Image from "next/image";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { cx } from "@/lib/cx";
import { aboutJourney } from "@/data/about";
import { Kicker, Shell, Title } from "../ui/primitives";
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
 * The OneVoice Journey, split across one panel: London fills the right at
 * full strength, and a navy wedge with an amber edge carries the five steps
 * down the left. The steps light one after another, and the rail beside them
 * draws down to meet each one, as the panel rises into view. The page is
 * never held; the drawing is paced against the panel's own climb up the
 * screen, over roughly half a screen of ordinary scrolling.
 *
 * Each step carries its own length of rail, so consecutive lengths join and
 * the drawing needs no arithmetic about how tall a step happens to be.
 *
 * Below large screens there is no room for a diagonal: the wedge gives way to
 * an even wash over the whole panel and the copy runs its full width. The
 * lighting is for large screens too — on phones, and under reduced motion,
 * every step is simply lit.
 */
export function Journey() {
  const panel = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const wide = useMedia("(min-width: 1024px)");
  const drawing = wide && !reduceMotion;
  const [lit, setLit] = useState(0);
  const steps = aboutJourney.steps;

  // Measured from the panel's own climb: nothing is lit while it is still low
  // on the screen, and the path is complete by the time it is a third of the
  // way up. That is about half a screen of scrolling for the five steps.
  const { scrollYProgress } = useScroll({ target: panel, offset: ["start 0.9", "start 0.35"] });
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.max(0, Math.min(steps.length - 1, Math.floor(progress * (steps.length + 1))));
    setLit((current) => (current === next ? current : next));
  });

  return (
    <section ref={panel} aria-labelledby="journey-title" className="relative isolate overflow-clip bg-cream py-band">
      <Shell>
        <div className="relative isolate overflow-hidden rounded-panel bg-navy-950">
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

          {/* Small screens: the copy runs the full width, so the photograph is
              held well back behind it. */}
          <div aria-hidden="true" className="absolute inset-0 -z-20 bg-navy-950/92 lg:hidden" />

          {/* Large screens: an amber edge, with the navy wedge laid over it a
              shade narrower, which is what leaves the line showing. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 hidden bg-saffron-500 lg:block lg:[clip-path:polygon(0_0,60.25%_0,48.25%_100%,0_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 hidden bg-navy-950 lg:block lg:[clip-path:polygon(0_0,60%_0,48%_100%,0_100%)]"
          />

          {/* Kept clear of the diagonal: the wedge is never narrower than 48%
              of the panel, and the copy stops at 45%. */}
          <div className="p-6 sm:p-10 lg:w-[45%] lg:p-14">
            <Reveal variant="fade">
              <Kicker tone="dark">{aboutJourney.kicker}</Kicker>
            </Reveal>
            <Title
              id="journey-title"
              lead={aboutJourney.titleLead}
              accent={aboutJourney.titleAccent}
              tone="dark"
              accentTone="saffron"
              size="statement"
              className="mt-5"
            />

            <ol className="mt-8 lg:mt-10">
              {steps.map((step, index) => {
                const isLit = !drawing || index <= lit;
                return (
                  // Connect is both the first step and the fourth.
                  <Reveal
                    as="li"
                    key={`${step.name}-${index}`}
                    variant="up"
                    delay={index * 80}
                    className="relative pl-9"
                  >
                    {/* This step's length of rail, and the colour that draws
                        down it. */}
                    <span aria-hidden="true" className="absolute left-[0.3125rem] top-0 h-full w-px bg-white/15" />
                    <span
                      aria-hidden="true"
                      className={cx(
                        "absolute left-[0.3125rem] top-0 h-full w-px origin-top bg-saffron-400 transition-transform duration-700 ease-out-soft",
                        isLit ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    {/* Outside the dimming, so an unlit marker stays a marker. */}
                    <span
                      aria-hidden="true"
                      className={cx(
                        "absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full transition-[background-color,box-shadow] duration-700 ease-out-soft",
                        isLit ? "bg-saffron-400 shadow-[0_0_0_0.3125rem_rgb(233_176_79/0.18)]" : "bg-white/25",
                      )}
                    />

                    <div
                      className={cx(
                        "pb-7 transition-opacity duration-700 ease-out-soft",
                        isLit ? "opacity-100" : "opacity-30",
                      )}
                    >
                      <p className="text-[0.75rem] font-bold tabular-nums tracking-[0.22em] text-saffron-300">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1.5 font-display text-[1.375rem] leading-tight text-white [font-variation-settings:'SOFT'_100]">
                        {step.name}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/75">{step.line}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </Shell>
    </section>
  );
}

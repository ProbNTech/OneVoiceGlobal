"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "motion/react";
import { ourWorkHeroSlides } from "@/data/work";
import { cn } from "@/lib/utils";

/* --- Timing, in seconds. One place, so the progress bar and the slide change
       can never drift apart. ----------------------------------------------- */
const INTERVAL = 3;
const FADE = 0.7;
const FADE_REDUCED = 0.2;
const KEN_BURNS_FROM = 1.045;

const EASE_FADE = [0.4, 0, 0.2, 1] as const;
const COUNT = ourWorkHeroSlides.length;

/**
 * The Our Work hero carousel.
 *
 * Three photographs cross-fading under a near-invisible Ken Burns zoom, with
 * three slim gold progress bars in the bottom-right corner. There are no
 * visible controls: the photography is the point, and the panel stays clean.
 *
 * HOW THE TIMING WORKS: there is no `setInterval`. The progress bar's own
 * animation IS the timer — a single Motion playback driving a motion value
 * from 0 to 1 over `INTERVAL`, whose `onComplete` advances the slide. The bar
 * therefore cannot drift out of sync with the slide change, because they are
 * the same animation. Pausing calls `.pause()` on that playback, so the bar
 * freezes exactly where it is and resumes from there rather than restarting.
 *
 * CROSSFADE: every slide stays mounted and stacked, and opacity is animated
 * per slide. Nothing unmounts mid-transition, so the two images genuinely
 * overlap and the panel is never blank.
 *
 * PAUSING (WCAG 2.2 SC 2.2.2): content that moves for more than five seconds
 * needs a way to stop it. Rotation pauses on hover and when the tab is hidden,
 * and does not run at all under `prefers-reduced-motion` — but none of those
 * is reachable from a keyboard, so a pause control is kept in the markup and
 * revealed on focus, the same pattern as the site's skip link. It is invisible
 * until someone tabs to it.
 *
 * HYDRATION: `initial={false}` on the animated layers means the server renders
 * the resting state, and the motion preference only ever changes durations —
 * never the markup — so the server and client agree.
 */
export function OurWorkImageCarousel() {
  const shouldReduce = useReducedMotion();

  const [index, setIndex] = useState(0);

  // The visitor's intent. Kept as plain state so the pause control renders
  // identically on the server and the client.
  const [autoplay, setAutoplay] = useState(true);

  // Transient suspensions — these never change the control's meaning.
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const running = autoplay && !hovered && !tabHidden && !shouldReduce;

  const progress = useMotionValue(0);
  const playback = useRef<AnimationPlaybackControls | null>(null);

  /* The timer. Restarts on each slide, and whenever autoplay is switched back
     on. Stopping it leaves the bar where it stood. */
  useEffect(() => {
    if (!running) return;

    progress.set(0);
    const controls = animate(progress, 1, {
      duration: INTERVAL,
      ease: "linear",
      onComplete: () => setIndex((current) => (current + 1) % COUNT),
    });
    playback.current = controls;

    return () => {
      controls.stop();
      playback.current = null;
    };
  }, [index, running, progress]);

  /* Hover and tab-visibility pause the playback in place rather than tearing
     it down, so leaving the carousel resumes mid-bar. */
  useEffect(() => {
    const controls = playback.current;
    if (!controls) return;
    if (hovered || tabHidden) controls.pause();
    else controls.play();
  }, [hovered, tabHidden]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const fade = shouldReduce ? FADE_REDUCED : FADE;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="OneVoice at work"
      className="relative size-full overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Slides. `aria-live` follows the APG carousel pattern: silent while
          rotating on its own, polite once the visitor is in control. */}
      <div
        className="absolute inset-0"
        aria-live={running ? "off" : "polite"}
        aria-atomic="false"
      >
        {ourWorkHeroSlides.map((slide, i) => {
          const active = i === index;

          return (
            <motion.div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${COUNT}`}
              aria-hidden={!active}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: fade, ease: EASE_FADE }}
            >
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{
                  scale: shouldReduce || active ? 1 : KEN_BURNS_FROM,
                }}
                transition={{
                  duration: active ? INTERVAL : 0,
                  ease: "linear",
                  // Reset the zoom only once this slide has finished fading
                  // out, so the snap back is never visible.
                  delay: active ? 0 : fade,
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  // Only the opening frame is worth preloading; the others are
                  // not needed for first paint.
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: slide.objectPosition ?? "center" }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Just enough shading for the progress bars to read on a bright
          photograph — far lighter than the homepage hero's navy wash. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-ink/35 to-transparent"
      />

      <ul className="absolute bottom-5 right-5 flex items-center gap-1.5 sm:bottom-[30px] sm:right-[30px]">
        {ourWorkHeroSlides.map((slide, i) => {
          const active = i === index;
          return (
            <li key={slide.id}>
              <span
                aria-hidden="true"
                className={cn(
                  "relative block h-0.5 w-9 overflow-hidden rounded-full sm:w-11",
                  active ? "bg-brand-gold/40" : "bg-white/35"
                )}
              >
                <motion.span
                  className="absolute inset-0 origin-left bg-brand-gold"
                  style={{ scaleX: active ? progress : 0 }}
                />
              </span>
            </li>
          );
        })}
      </ul>

      {/* Keyboard-reachable pause control. Invisible until focused. */}
      <button
        type="button"
        onClick={() => setAutoplay((on) => !on)}
        className="sr-only focus:not-sr-only focus:absolute focus:bottom-5 focus:left-5 focus:z-10 focus:inline-flex focus:size-11 focus:items-center focus:justify-center focus:rounded-full focus:border focus:border-white/60 focus:bg-brand-ink/60 focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        {autoplay ? (
          <Pause className="size-4" aria-hidden="true" />
        ) : (
          <Play className="size-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {autoplay ? "Pause slideshow" : "Play slideshow"}
        </span>
      </button>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

interface CountUpProps {
  /** The real, final value. Always what assistive technology is given. */
  value: number;
  suffix?: string;
  /** Seconds. */
  duration?: number;
}

/**
 * A number that counts up once, when it first scrolls into view.
 *
 * Accessibility: the animating digits are `aria-hidden`, and a visually hidden
 * sibling carries the true final value from the first render — so a screen
 * reader never announces an intermediate number, and never reads "0". When the
 * viewer prefers reduced motion the figure is simply printed, with no tween.
 *
 * Only the digits are a client component; everything around them stays server
 * rendered.
 */
export function CountUp({ value, suffix = "", duration = 1.3 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const shouldReduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // A zero-duration tween rather than an early `setDisplay(value)`: it keeps
    // every state update inside the animation callback (no cascading render
    // from the effect body) and keeps the first render identical on the server
    // and the client, whatever the motion preference resolves to.
    const controls = animate(0, value, {
      duration: shouldReduce ? 0 : duration,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
      onComplete: () => setDisplay(value),
    });

    return () => controls.stop();
  }, [inView, shouldReduce, value, duration]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}

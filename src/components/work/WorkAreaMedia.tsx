"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { PlaceholderImage } from "@/components/shared/PlaceholderImage";
import type { AreaMedia } from "@/data/work";
import { cn } from "@/lib/utils";

interface WorkAreaMediaProps extends AreaMedia {
  className?: string;
}

/**
 * The photograph beside a service area.
 *
 * Two effects, both deliberately restrained:
 *
 *   1. A mask reveal — the frame uncovers from the bottom up via `clip-path`.
 *      The frame itself never changes size, so nothing around it shifts.
 *   2. Scroll-linked drift — the picture moves ±26px against the scroll, run
 *      through a spring so it settles rather than tracking the wheel exactly.
 *      The image layer is inset by -7% (larger than the frame) so the drift
 *      can never expose an edge.
 *
 * Both are driven by Motion's scroll hooks rather than a scroll listener, and
 * both animate only `clip-path` and `transform` — no layout properties.
 *
 * With `prefers-reduced-motion` set, the mask and the drift are both skipped
 * and the photograph simply renders.
 *
 * Every section photograph loads lazily: they are all below the fold, and the
 * hero is the page's LCP element, so none of them should compete with it.
 *
 * Where no approved photograph exists the labelled `PlaceholderImage` slot is
 * rendered at the same dimensions, so the layout is already correct when real
 * photography arrives.
 */
export function WorkAreaMedia({
  src,
  alt,
  caption,
  tone = "ivory",
  className,
}: WorkAreaMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The motion preference changes the VALUES, never the markup: the server
  // cannot know the preference, so branching on it to add or drop `initial`
  // (or a `style` prop) would make the server and client render different
  // DOM. Collapsing the ranges and durations instead keeps hydration exact,
  // and reduced motion simply means "arrives instantly, never drifts".
  const drift = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [26, -26]
  );
  const y = useSpring(drift, { stiffness: 70, damping: 22, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="relative aspect-[4/3] overflow-hidden lg:aspect-[4/5]"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{
          duration: shouldReduce ? 0 : 0.9,
          ease: [0.22, 0.61, 0.36, 1],
        }}
      >
        {src ? (
          <motion.div className="absolute inset-[-7%]" style={{ y }}>
            <Image
              src={src}
              alt={alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        ) : (
          <PlaceholderImage
            alt={alt}
            caption={caption}
            tone={tone}
            aspect="square"
            rounded="rounded-none"
            className={cn("absolute inset-0 size-full ring-0")}
          />
        )}
      </motion.div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface WorkFeatureMediaProps {
  src: string;
  alt: string;
  /** Object-position for the crop, where the centre loses the subject. */
  position?: string;
  className?: string;
}

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * The photograph in an editorial row.
 *
 * The frame uncovers from the bottom up via `clip-path` while the picture
 * inside settles from 1.04 to 1 — the frame itself never changes size, so
 * nothing around it shifts and no layout is animated. Both effects run on
 * `clip-path` and `transform` only.
 *
 * This is the same mask-reveal language as `WorkAreaMedia` further down the
 * page, at a wider 4:3 crop with the restrained radius and shadow the
 * editorial rows use, so the two bands read as one system.
 *
 * The motion preference changes the DURATIONS, never the markup: the server
 * cannot know the preference, so branching on it to drop `initial` would make
 * the server and client disagree. Reduced motion therefore means "arrives
 * instantly", and the `data-reveal` hook lets the section's `<noscript>` rule
 * show the photograph outright when JavaScript never runs.
 */
export function WorkFeatureMedia({
  src,
  alt,
  position = "center",
  className,
}: WorkFeatureMediaProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-brand-navy/5",
        "shadow-[0_24px_48px_-32px_rgb(16_61_99_/_0.45)]",
        className
      )}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: shouldReduce ? 0 : 0.9, ease: EASE }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: shouldReduce ? 0 : 1, ease: EASE }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          // Below the fold on every breakpoint; the hero is the page's LCP
          // element and nothing here should compete with it.
          loading="lazy"
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
    </motion.div>
  );
}

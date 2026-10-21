"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealTag = "div" | "section" | "li" | "span" | "article" | "figure" | "p";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Anchor id, so a revealed card can be an in-page link target. */
  id?: string;
  /** Entrance delay in seconds — pass an incrementing value to stagger a list. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  as?: RevealTag;
  once?: boolean;
}

/**
 * Scroll-triggered entrance animation.
 *
 * A thin wrapper around Motion for React that fades content up as it enters the
 * viewport. It is the single, consistent reveal used across every homepage
 * section, so motion reads as one deliberate system rather than per-section
 * improvisation.
 *
 * Accessibility: when the OS "reduce motion" preference is set, the element
 * renders immediately with no transform and no animation. Content is passed in
 * as server-rendered `children`, so the only client cost is the observer.
 */
export function Reveal({
  children,
  className,
  id,
  delay = 0,
  y = 22,
  as = "div",
  once = true,
}: RevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    const Tag = as;
    return (
      <Tag id={id} className={className} data-reveal="">
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      id={id}
      className={className}
      // A hook for a section's `<noscript>` rule: the opening frame below is
      // server-rendered, so a page without JavaScript needs a way to show
      // these elements outright.
      data-reveal=""
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

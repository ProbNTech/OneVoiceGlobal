"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { cx } from "@/lib/cx";

const spring = { stiffness: 260, damping: 20, mass: 0.5 };

/**
 * Lets its child lean a few pixels towards a mouse pointer and spring back
 * when it leaves. Mouse only: touch and pen input, and reduced motion, leave
 * it still.
 */
export function Magnetic({
  children,
  className,
  strength = 0.14,
}: {
  children: ReactNode;
  className?: string;
  /** Share of the pointer's distance from the centre that the child follows. */
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const follow = (event: PointerEvent) => {
    const node = ref.current;
    if (!node || reduceMotion || event.pointerType !== "mouse") return;
    const box = node.getBoundingClientRect();
    x.set((event.clientX - (box.left + box.width / 2)) * strength);
    y.set((event.clientY - (box.top + box.height / 2)) * strength * 1.6);
  };

  const release = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onPointerMove={follow}
      onPointerLeave={release}
      className={cx("inline-flex", className)}
    >
      {children}
    </motion.span>
  );
}

"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Momentum smoothing for wheel and trackpad scrolling (Lenis). The page still
 * scrolls natively underneath, so the header, motion's useScroll and the CSS
 * scroll-driven effects all read the real scroll position. Touch scrolling is
 * left native, anything marked `data-lenis-prevent` (the full menu) scrolls on
 * its own, and nothing is smoothed for visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, wheelMultiplier: 0.95 });
    return () => lenis.destroy();
  }, []);

  return null;
}

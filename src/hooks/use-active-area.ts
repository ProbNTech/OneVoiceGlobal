"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently the one being read.
 *
 * Uses a single IntersectionObserver with a tall negative root margin, so the
 * observer only reports the section crossing the middle band of the viewport.
 * That means state updates fire a handful of times across the whole page
 * rather than on every scroll frame — no scroll listener, no per-frame React
 * render.
 *
 * Returns `null` before any section reaches the middle of the viewport, so
 * callers can render a neutral state rather than wrongly highlighting the
 * first item while the visitor is still reading the hero.
 */
export function useActiveArea(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  // The ids are a stable, module-level list; joining them keeps the effect
  // from re-subscribing on every render because the array identity changed.
  const key = ids.join(",");

  useEffect(() => {
    const elements = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inBand = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (inBand.length > 0) setActive(inBand[0].target.id);
      },
      // Only the slice of viewport between 45% and 55% counts as "being read".
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { serviceAreas } from "@/data/services";
import { useActiveArea } from "@/hooks/use-active-area";
import { cn } from "@/lib/utils";

const slugs = serviceAreas.map((area) => area.slug);
const ease = [0.22, 0.61, 0.36, 1] as const;

/**
 * The five-area navigation strip, sitting directly beneath the hero.
 *
 * Five columns on desktop separated by thin rules; below `lg` it becomes a
 * horizontally scrollable row, which keeps five items usable on a phone
 * without cramming them into a grid or burying them in a stack.
 *
 * It is deliberately NOT sticky: a second sticky bar under the site header
 * would crowd the top of every section it scrolls past, and the brief's
 * progress rail already carries the sense of place while reading. The active
 * highlight is still useful here — it is visible whenever a visitor scrolls
 * back up to re-navigate.
 *
 * The motion preference changes durations and delays only, never the rendered
 * markup — the server cannot know the preference, so branching on it to drop
 * `initial` would desynchronise hydration. Reduced motion therefore means the
 * strip arrives instantly rather than not at all.
 *
 * Links are plain anchors, so jumping between areas works with JavaScript
 * disabled; `scroll-mt` on each target clears the sticky header.
 */
export function WorkAreaNavigation() {
  const active = useActiveArea(slugs);
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="areas"
      aria-label="The five areas of work"
      className="relative scroll-mt-24 border-b border-brand-line bg-brand-ivory"
    >
      {/* Top rule draws left to right as the strip arrives. */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-brand-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduce ? 0 : 0.9, ease }}
      />

      <div className="container-page">
        <ul className="-mx-5 flex snap-x snap-mandatory overflow-x-auto px-5 md:mx-0 md:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {serviceAreas.map((area, i) => {
            const isActive = active === area.slug;

            return (
              <motion.li
                key={area.slug}
                className={cn(
                  "relative w-48 shrink-0 snap-start md:w-56 lg:w-auto",
                  "border-brand-line lg:border-l lg:first:border-l-0"
                )}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{
                  duration: shouldReduce ? 0 : 0.5,
                  delay: shouldReduce ? 0 : i * 0.09,
                  ease,
                }}
              >
                <Link
                  href={`#${area.slug}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative flex h-full flex-col gap-3 py-6 pr-6 outline-none transition-colors duration-200",
                    "focus-visible:ring-2 focus-visible:ring-ring lg:px-6 lg:py-8",
                    "hover:bg-brand-navy/[0.025]",
                    isActive && "bg-brand-navy/[0.035]"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-heading text-sm font-bold tabular-nums transition-colors duration-200",
                      isActive ? "text-brand-gold" : "text-brand-gold/75"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={cn(
                      "font-heading text-base font-bold leading-snug transition-colors duration-200 lg:text-lg",
                      isActive
                        ? "text-brand-blue"
                        : "text-brand-navy group-hover:text-brand-blue"
                    )}
                  >
                    {area.shortName}
                  </span>

                  <ArrowRight
                    className="size-5 shrink-0 text-brand-navy transition-transform duration-200 group-hover:translate-x-[5px]"
                    aria-hidden="true"
                  />

                  {/* Gold rule grows from the left on hover, and stays put
                      while this area is the one being read. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all duration-200 lg:left-6",
                      isActive
                        ? "w-12"
                        : "w-0 group-hover:w-12 group-focus-visible:w-12"
                    )}
                  />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

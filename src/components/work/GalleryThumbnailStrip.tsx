"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ImageIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { GalleryImage } from "@/data/work";
import { cn } from "@/lib/utils";

interface GalleryThumbnailStripProps {
  items: GalleryImage[];
  activeIndex: number;
  onSelect: (index: number) => void;
  /** Unique per gallery instance, so two strips cannot share an indicator. */
  layoutIdPrefix: string;
}

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * The thumbnail row beneath the gallery.
 *
 * Scrolls horizontally when the thumbnails outrun the width available, and
 * keeps the active one in view by setting `scrollLeft` on its own container
 * rather than calling `scrollIntoView` — which, on a horizontal strip, also
 * scrolls the page vertically and would yank a reader away from the row they
 * are using.
 *
 * The active marker is a single `layoutId` element, so selecting a thumbnail
 * slides the gold ring across instead of switching it off and on again.
 */
export function GalleryThumbnailStrip({
  items,
  activeIndex,
  onSelect,
  layoutIdPrefix,
}: GalleryThumbnailStripProps) {
  const shouldReduce = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hasMoved = useRef(false);

  useEffect(() => {
    // Skip the first pass: on mount the gallery is below the fold and the
    // strip is already at its start, so there is nothing to centre.
    if (!hasMoved.current) {
      hasMoved.current = true;
      return;
    }

    const strip = stripRef.current;
    const thumb = thumbRefs.current[activeIndex];
    if (!strip || !thumb) return;

    const target =
      thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2;

    strip.scrollTo({
      left: Math.max(0, target),
      behavior: shouldReduce ? "auto" : "smooth",
    });
  }, [activeIndex, shouldReduce]);

  return (
    <div
      ref={stripRef}
      role="group"
      aria-label="Choose a photograph"
      className="relative mt-3 flex snap-x gap-2 overflow-x-auto pb-1"
    >
      {items.map((item, i) => {
        const active = i === activeIndex;

        return (
          <button
            key={item.id}
            ref={(node) => {
              thumbRefs.current[i] = node;
            }}
            type="button"
            onClick={() => onSelect(i)}
            aria-current={active ? "true" : undefined}
            aria-label={`Show image ${i + 1} of ${items.length}: ${item.caption}`}
            className={cn(
              "relative h-14 w-20 shrink-0 snap-start overflow-hidden rounded-md outline-none",
              "transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              active ? "opacity-100" : "opacity-60 hover:opacity-100"
            )}
          >
            {item.src ? (
              <Image
                src={item.src}
                alt=""
                fill
                loading="lazy"
                // Thumbnails are never shown larger than this, so there is no
                // reason to fetch a desktop-sized file for each one.
                sizes="80px"
                className="object-cover"
                style={{ objectPosition: item.objectPosition ?? "center" }}
              />
            ) : (
              <span className="flex size-full items-center justify-center bg-brand-navy/10 text-brand-navy/60">
                <ImageIcon className="size-4" aria-hidden="true" />
              </span>
            )}

            {active && (
              <motion.span
                layoutId={`${layoutIdPrefix}-thumb`}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-inset ring-brand-gold"
                transition={{ duration: shouldReduce ? 0 : 0.35, ease: EASE }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import { useCallback, useId, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/shared/Reveal";
import { GalleryThumbnailStrip } from "@/components/work/GalleryThumbnailStrip";
import type { GalleryImage } from "@/data/work";
import { cn } from "@/lib/utils";

interface CommunityImageGalleryProps {
  items: GalleryImage[];
  /** Region label, e.g. "Community photography". */
  label: string;
  className?: string;
}

/* --- Timing, in seconds. One place, so the crossfade, the zoom and the
       caption can never drift apart. ---------------------------------------- */
const FADE = 0.55;
const FADE_REDUCED = 0.15;
const ZOOM = 0.65;
const ZOOM_FROM = 1.035;
const CAPTION = 0.35;

const EASE = [0.22, 0.61, 0.36, 1] as const;

const toneClass: Record<NonNullable<GalleryImage["tone"]>, string> = {
  navy: "bg-brand-navy text-white/80",
  ivory: "bg-brand-ivory text-brand-navy",
  blue: "bg-gradient-to-br from-brand-blue to-brand-navy text-white/90",
};

const badgeClass: Record<NonNullable<GalleryImage["tone"]>, string> = {
  navy: "bg-white/10",
  ivory: "bg-brand-navy/[0.07]",
  blue: "bg-white/15",
};

/** The current image and its two neighbours — see `loaded` below. */
function neighbours(index: number, count: number) {
  if (count < 2) return [0];
  return [index, (index + 1) % count, (index - 1 + count) % count];
}

/**
 * The Community photo gallery.
 *
 * MANUAL ONLY. There is no autoplay and no timer: the hero at the top of this
 * page already rotates on its own, and a second self-advancing gallery a
 * screen below it would set two things moving against each other. This one
 * changes on a click, a thumbnail or an arrow key, and on nothing else.
 *
 * CROSSFADE: every slide stays mounted and stacked, and only opacity is
 * animated, so the outgoing and incoming photographs genuinely overlap and
 * the frame is never blank between them. The incoming picture settles from
 * 1.035 to 1 — slow enough to read as weight rather than as a zoom — and the
 * outgoing one resets its scale only once it has finished fading, so the snap
 * back is never visible.
 *
 * LOADING: a gallery must not pull every photograph at full size the moment
 * it scrolls into view. Only the current image and its two neighbours are
 * mounted; indexes that have been shown stay mounted, so nothing is torn down
 * mid-crossfade.
 *
 * HYDRATION: `initial={false}` on the animated layers means the server
 * renders the resting state, and the motion preference only ever changes
 * durations — never the markup — so the server and the client agree.
 *
 * Where no approved photograph exists, a labelled slot renders in its place
 * at the same dimensions (spec §6.6), and a photograph that fails to load
 * falls back to the same slot rather than to a broken frame.
 */
export function CommunityImageGallery({
  items,
  label,
  className,
}: CommunityImageGalleryProps) {
  const shouldReduce = useReducedMotion();
  const layoutIdPrefix = useId();
  const count = items.length;

  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(() => new Set(neighbours(0, count)));
  const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set());

  // Moving also widens the load window, in the same handler: an image is
  // always mounted a move before it can be shown, so nothing is fetched that
  // the visitor has not come within one step of.
  const goTo = useCallback(
    (next: number) => {
      const target = ((next % count) + count) % count;
      setIndex(target);
      setLoaded((prev) => {
        const missing = neighbours(target, count).filter((i) => !prev.has(i));
        return missing.length === 0 ? prev : new Set([...prev, ...missing]);
      });
    },
    [count]
  );

  // Arrow keys work whenever focus is inside the gallery — the thumbnails and
  // the two arrows are the only focusable things in it, so this never steals
  // a key press from a reader who is simply scrolling past.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  const fade = shouldReduce ? FADE_REDUCED : FADE;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={className}
    >
      <Reveal y={24}>
        <div
          data-reveal
          className={cn(
            "relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-brand-navy/5",
            "shadow-[0_24px_48px_-32px_rgb(16_61_99_/_0.45)]"
          )}
        >
          {/* The slide stack. `aria-live="polite"` because every change here
              is one the visitor asked for. */}
          <div className="absolute inset-0" aria-live="polite" aria-atomic="false">
            {items.map((item, i) => {
              const active = i === index;
              const src = failed.has(item.id) ? undefined : item.src;

              return (
                <motion.div
                  key={item.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  aria-hidden={!active}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active ? 1 : 0 }}
                  transition={{ duration: fade, ease: EASE }}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      scale: shouldReduce || active ? 1 : ZOOM_FROM,
                    }}
                    transition={{
                      duration: active && !shouldReduce ? ZOOM : 0,
                      ease: EASE,
                      // Reset the outgoing slide's zoom only once it has
                      // faded out, so the reset is never seen.
                      delay: active ? 0 : fade,
                    }}
                  >
                    {src ? (
                      // Outside the load window the layer stays empty: it is
                      // fully transparent, and it is always mounted before it
                      // can become the active slide.
                      loaded.has(i) && (
                        <Image
                          src={src}
                          alt={item.alt}
                          fill
                          loading="lazy"
                          sizes="(min-width: 1024px) 45vw, 100vw"
                          className="object-cover"
                          style={{
                            objectPosition: item.objectPosition ?? "center",
                          }}
                          onError={() =>
                            setFailed((prev) => new Set([...prev, item.id]))
                          }
                        />
                      )
                    ) : (
                      <GallerySlot tone={item.tone} />
                    )}
                  </motion.div>

                  {/* Caption. It lives inside the slide so a screen reader
                      hears the picture and its description as one change,
                      and so it cross-fades with the photograph it belongs
                      to. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-ink/75 via-brand-ink/35 to-transparent"
                  />
                  <motion.p
                    className="absolute inset-x-0 bottom-0 px-5 pb-4 text-sm font-medium leading-snug text-white sm:px-6 sm:pb-5"
                    initial={false}
                    animate={{
                      opacity: active ? 1 : 0,
                      y: active || shouldReduce ? 0 : 8,
                    }}
                    transition={{
                      duration: shouldReduce ? FADE_REDUCED : CAPTION,
                      ease: EASE,
                      delay: active && !shouldReduce ? 0.18 : 0,
                    }}
                  >
                    {item.caption}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>

          {/* Counter. Hidden from assistive technology: each slide already
              announces "n of m". */}
          <p
            aria-hidden="true"
            className="absolute right-4 top-4 rounded-full bg-brand-ink/55 px-3 py-1 text-xs font-semibold tabular-nums tracking-[0.12em] text-white backdrop-blur-[2px]"
          >
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>

          <GalleryArrow
            side="left"
            label="Previous image"
            onClick={() => goTo(index - 1)}
          />
          <GalleryArrow
            side="right"
            label="Next image"
            onClick={() => goTo(index + 1)}
          />
        </div>
      </Reveal>

      <Reveal delay={0.14} y={14}>
        <GalleryThumbnailStrip
          items={items}
          activeIndex={index}
          onSelect={goTo}
          layoutIdPrefix={layoutIdPrefix}
        />
      </Reveal>
    </div>
  );
}

/**
 * A labelled slot, shown where no approved photograph exists yet or where one
 * fails to load. Same language as `PlaceholderImage` elsewhere on the site,
 * written out here because this one fills an absolutely-positioned layer
 * inside the gallery frame rather than owning its own aspect ratio — and
 * because the intended subject is already on screen as the slide's caption,
 * so the slot carries the badge alone.
 */
function GallerySlot({ tone }: { tone: GalleryImage["tone"] }) {
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center p-6 text-center",
        toneClass[tone ?? "ivory"]
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]",
          badgeClass[tone ?? "ivory"]
        )}
      >
        <ImageIcon className="size-3.5" aria-hidden="true" />
        Photography to follow
      </span>
    </div>
  );
}

/** Previous / next, sized to a 44px target and set inside the frame edge. */
function GalleryArrow({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "group/arrow absolute top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full",
        "border border-white/30 bg-brand-navy/45 text-white outline-none backdrop-blur-[2px]",
        "transition-colors duration-200 hover:bg-brand-navy/70",
        "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        side === "left" ? "left-3 sm:left-4" : "right-3 sm:right-4"
      )}
    >
      <Icon
        className={cn(
          "size-5 transition-transform duration-200",
          side === "left"
            ? "group-hover/arrow:-translate-x-0.5"
            : "group-hover/arrow:translate-x-0.5"
        )}
        aria-hidden="true"
      />
    </button>
  );
}

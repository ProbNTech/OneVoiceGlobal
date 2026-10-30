"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { aboutWhatWeDo } from "@/data/about";
import { Reveal } from "../ui/Reveal";

/**
 * What We Do: the Centre's ten services as a row that scrolls sideways
 * under the reader's own hand (swipe, trackpad, or the two arrow buttons),
 * snapping to each service; nothing moves on its own and nothing is pinned.
 * Each is a photograph from the supplied set with its number on a white
 * disc, the service's name in spaced capitals and the brief's line, with no
 * card behind them. The buttons dim at either end of the row.
 */
export function WhatWeDo() {
  const rail = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState<{ start: boolean; end: boolean }>({ start: true, end: false });

  const onScroll = () => {
    const node = rail.current;
    if (!node) return;
    setEdge({
      start: node.scrollLeft < 8,
      end: node.scrollLeft + node.clientWidth > node.scrollWidth - 8,
    });
  };

  /** Moves the row on by one service. */
  const step = (direction: 1 | -1) => {
    const node = rail.current;
    const card = node?.querySelector("li");
    if (!node || !card) return;
    node.scrollBy({ left: direction * (card.getBoundingClientRect().width + 20), behavior: "smooth" });
  };

  return (
    <div id={aboutWhatWeDo.id} className="mt-12 scroll-mt-28 lg:mt-14">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <Reveal>
          <h3
            id="what-we-do-title"
            className="font-display text-[2rem] leading-tight text-ink [font-variation-settings:'SOFT'_100] sm:text-[2.5rem]"
          >
            {aboutWhatWeDo.title}
          </h3>
          <p className="mt-2 max-w-2xl text-[1.0625rem] leading-relaxed text-slate">{aboutWhatWeDo.lead}</p>
        </Reveal>
        <div className="hidden gap-2.5 sm:flex">
          {(
            [
              [-1, "Previous service", ArrowLeft, edge.start],
              [1, "Next service", ArrowRight, edge.end],
            ] as const
          ).map(([direction, label, Icon, atEdge]) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              aria-controls="what-we-do-rail"
              disabled={atEdge}
              onClick={() => step(direction)}
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-white text-ink ring-1 ring-ink/12 transition-colors duration-500 hover:bg-ink hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-ink"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={rail}
        id="what-we-do-rail"
        aria-labelledby="what-we-do-title"
        onScroll={onScroll}
        className="scrollbar-none -mx-(--gutter) mt-7 flex snap-x snap-mandatory scroll-px-(--gutter) gap-5 overflow-x-auto px-(--gutter) pb-2"
      >
        {aboutWhatWeDo.items.map((item, index) => (
          <Reveal
            as="li"
            key={item.name}
            variant="rise"
            delay={Math.min(index, 4) * 80}
            className="group w-[80vw] max-w-[22rem] shrink-0 snap-start sm:w-[21rem] lg:w-[23rem] lg:max-w-none"
          >
            <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-sand shadow-[0_30px_60px_-40px_rgb(10_37_64/0.55)]">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 1024px) 368px, (min-width: 640px) 336px, 80vw"
                className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.07]"
                style={{ objectPosition: "position" in item.image ? item.image.position : undefined }}
              />
              <span
                className={cx(
                  "absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-[0.8125rem] font-bold tabular-nums text-ink shadow-[0_8px_20px_-10px_rgb(10_37_64/0.6)]",
                  "transition-colors duration-500 group-hover:bg-orange group-hover:text-white",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h4 className="mt-5 text-[0.875rem] font-bold uppercase tracking-[0.12em] text-ink transition-colors duration-500 group-hover:text-lagoon-600">
              {item.name}
            </h4>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{item.line}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

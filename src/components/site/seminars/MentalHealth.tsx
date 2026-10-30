"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Info, Quote, Signpost } from "lucide-react";
import { cx } from "@/lib/cx";
import { seminarsMentalHealth } from "@/data/seminars";
import { Photo } from "../ui/Photo";
import { Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { PhraseTitle } from "./PhraseTitle";

/**
 * Mental Health & Wellbeing, in the calm teal register the brief's design
 * notes ask for: a white band with soft teal light. The programme's
 * headline beside its subtitle and aim, then its six programme areas as a
 * row that scrolls sideways under the reader's own hand (swipe, trackpad or
 * the two arrow buttons), snapping to each area, as the About page's What We
 * Do does; nothing moves on its own. Each area is a photograph cut with a
 * leaf corner and its number on a white disc, the area's title and the
 * brief's line, with no card behind them. Beneath, the brief's line that
 * mental health challenges are not a personal failure, set large, beside
 * its note on the limits of the programme's role and its important
 * information.
 */
export function MentalHealth() {
  const { areas, important } = seminarsMentalHealth;
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

  /** Moves the row on by one area. */
  const step = (direction: 1 | -1) => {
    const node = rail.current;
    const item = node?.querySelector("li");
    if (!node || !item) return;
    node.scrollBy({ left: direction * (item.getBoundingClientRect().width + 20), behavior: "smooth" });
  };

  return (
    <section
      id={seminarsMentalHealth.id}
      aria-labelledby="mental-health-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      {/* Soft teal light, for the section's calm register. */}
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-lagoon-50 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-lagoon-100/60 blur-[120px]"
      />

      <Shell>
        <div className="grid grid-cols-1 gap-x-14 gap-y-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{seminarsMentalHealth.kicker}</Kicker>
            </Reveal>
            <PhraseTitle id="mental-health-title" phrases={seminarsMentalHealth.title} className="mt-5" />
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:pb-2">
            <p className="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-lagoon-700">
              {seminarsMentalHealth.subtitle}
            </p>
            <p className="mt-3 text-lead text-slate">{seminarsMentalHealth.lead}</p>
          </Reveal>
        </div>

        <div className="mt-10 flex items-end justify-between gap-6 lg:mt-12">
          <Reveal variant="fade">
            <h3
              id="mental-health-areas"
              className="text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
            >
              {seminarsMentalHealth.areasLabel}
            </h3>
          </Reveal>
          <div className="hidden gap-2.5 sm:flex">
            {(
              [
                [-1, "Previous area", ArrowLeft, edge.start],
                [1, "Next area", ArrowRight, edge.end],
              ] as const
            ).map(([direction, label, Icon, atEdge]) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                aria-controls="mental-health-rail"
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
          id="mental-health-rail"
          aria-labelledby="mental-health-areas"
          onScroll={onScroll}
          className="scrollbar-none -mx-(--gutter) mt-6 flex snap-x snap-mandatory scroll-px-(--gutter) gap-5 overflow-x-auto px-(--gutter) pb-2"
        >
          {areas.map((area, index) => (
            <Reveal
              as="li"
              key={area.title}
              variant="rise"
              delay={Math.min(index, 4) * 80}
              className="group w-[80vw] max-w-[22rem] shrink-0 snap-start sm:w-[21rem] lg:w-[23rem] lg:max-w-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem_4rem_1.25rem_1.25rem] bg-mist shadow-[0_30px_60px_-40px_rgb(10_37_64/0.55)]">
                <Photo
                  image={area.image}
                  sizes="(min-width: 1024px) 368px, (min-width: 640px) 336px, 80vw"
                  className="transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.07]"
                />
                <span
                  className={cx(
                    "absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-[0.8125rem] font-bold tabular-nums text-ink shadow-[0_8px_20px_-10px_rgb(10_37_64/0.6)]",
                    "transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h4 className="mt-5 font-display text-[1.375rem] leading-snug text-ink transition-colors duration-500 [font-variation-settings:'SOFT'_100] group-hover:text-lagoon-600">
                {area.title}
              </h4>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{area.line}</p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 grid grid-cols-1 gap-x-14 gap-y-8 lg:mt-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <Quote aria-hidden="true" className="h-8 w-8 text-lagoon-600" strokeWidth={1.4} />
            <p className="mt-4 max-w-3xl font-display text-[1.5rem] leading-[1.3] text-ink [font-variation-settings:'SOFT'_100] sm:text-[2rem]">
              {seminarsMentalHealth.quote}
            </p>
          </Reveal>
          <Reveal delay={120} className="space-y-5 lg:col-span-5">
            <p className="flex items-start gap-3.5 text-[1rem] leading-relaxed text-ink">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white">
                <Signpost aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.7} />
              </span>
              {seminarsMentalHealth.role}
            </p>
            <p className="flex items-start gap-3.5 text-[0.875rem] leading-relaxed text-ink-muted">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lagoon-50 text-lagoon-600">
                <Info aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.7} />
              </span>
              <span>
                <strong className="font-semibold text-ink">{important.label}:</strong> {important.text}
              </span>
            </p>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

import type { ReactNode } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { CtaLink } from "@/components/shared/CtaLink";
import type { WorkFeature } from "@/data/work";
import { cn } from "@/lib/utils";

interface WorkFeatureRowProps {
  feature: WorkFeature;
  /** The photograph or gallery that sits opposite the copy. */
  media: ReactNode;
  /** Which side the media takes from `lg` up. Default: left. */
  mediaSide?: "left" | "right";
  /** Entrance delays are offset per row so a row never animates twice over. */
  baseDelay?: number;
}

/**
 * One editorial row: a column of copy opposite a photograph or a gallery.
 *
 * The copy always comes first in the DOM. On a phone that puts the heading
 * and the explanation above the picture — a visitor meets the point before
 * the illustration — and in the tab order the heading always precedes its own
 * content. Desktop placement is handled with `order` utilities, so swapping
 * sides never changes the reading order.
 *
 * Columns are 53/47 rather than an even split: the text column carries a
 * heading, two paragraphs, a list and a link, and an even split leaves it
 * noticeably taller than the frame beside it.
 *
 * Server component. Only the media needs the client, and each kind of media
 * draws its own boundary.
 */
export function WorkFeatureRow({
  feature,
  media,
  mediaSide = "left",
  baseDelay = 0,
}: WorkFeatureRowProps) {
  const mediaLeft = mediaSide === "left";
  const headingId = `${feature.slug}-feature-heading`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "grid items-center gap-10 lg:gap-16 xl:gap-20",
        mediaLeft
          ? "lg:grid-cols-[minmax(0,47fr)_minmax(0,53fr)]"
          : "lg:grid-cols-[minmax(0,53fr)_minmax(0,47fr)]"
      )}
    >
      <div className={mediaLeft ? "lg:order-2" : "lg:order-1"}>
        <Reveal delay={baseDelay}>
          <p className="flex items-center gap-4 text-sm font-bold uppercase tracking-[0.18em] text-brand-navy">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-brand-gold" />
            {feature.shortName}
          </p>
        </Reveal>

        <Reveal delay={baseDelay + 0.08}>
          <h3
            id={headingId}
            className="mt-5 text-balance font-heading text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl"
          >
            {feature.heading}
          </h3>
        </Reveal>

        <Reveal delay={baseDelay + 0.16}>
          <p className="mt-4 font-heading text-lg font-semibold leading-snug text-brand-blue">
            {feature.name}
          </p>
        </Reveal>

        <Reveal delay={baseDelay + 0.24}>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-navy/90">
            {feature.intro}
          </p>
        </Reveal>

        <Reveal delay={baseDelay + 0.32}>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground">
            {feature.support}
          </p>
        </Reveal>

        {/* A compact set of the area's own activities — not the full list,
            which the area's section further down the page carries in full. */}
        <ul className="mt-8 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {feature.highlights.map((highlight, i) => (
            <Reveal
              as="li"
              key={highlight}
              delay={baseDelay + 0.4 + i * 0.08}
              y={14}
              className="flex items-start gap-3"
            >
              <span
                aria-hidden="true"
                className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-brand-gold"
              />
              <span className="text-[0.9375rem] leading-relaxed text-brand-navy">
                {highlight}
              </span>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={baseDelay + 0.72}>
          <div className="mt-9">
            <CtaLink
              href={feature.href}
              variant="text"
              className="border-b-2 border-brand-blue/25 pb-2 text-base transition-colors hover:border-brand-blue"
            >
              {feature.ctaLabel}
            </CtaLink>
          </div>
        </Reveal>
      </div>

      <div className={mediaLeft ? "lg:order-1" : "lg:order-2"}>{media}</div>
    </article>
  );
}

import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { WorkAreaMedia } from "@/components/work/WorkAreaMedia";
import { areaMedia } from "@/data/work";
import type { ServiceArea } from "@/types/content";
import { cn } from "@/lib/utils";

interface WorkAreaSectionProps {
  area: ServiceArea;
  /** Zero-based position; drives the ordinal and the alternating layout. */
  index: number;
}

/**
 * One area of work, told as an editorial spread rather than a card.
 *
 * The composition alternates — photograph left for the odd-numbered areas
 * (01, 03, 05), text left for the even ones — which gives the run of five a
 * rhythm and stops them reading as a repeated template. Backgrounds alternate
 * between white and ivory for the same reason.
 *
 * Order is set with `order` utilities rather than by reordering the markup, so
 * the heading always precedes its own content in the DOM and in the tab order.
 *
 * The run starts on ivory so that every boundary on the page carries a change
 * of colour — the introduction above is white, and two white bands back to
 * back turn their combined padding into one large empty gap.
 *
 * Server component: only the photograph needs the client, and it is isolated
 * in `WorkAreaMedia`.
 */
export function WorkAreaSection({ area, index }: WorkAreaSectionProps) {
  const media = areaMedia[area.slug];
  const mediaFirst = index % 2 === 0;
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <Section
      id={area.slug}
      spacing="tight"
      aria-labelledby={`${area.slug}-heading`}
      className={cn(index % 2 === 0 ? "bg-brand-ivory" : "bg-background")}
    >
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <WorkAreaMedia
            {...media}
            className={mediaFirst ? "lg:order-1" : "lg:order-2"}
          />

          <div className={mediaFirst ? "lg:order-2" : "lg:order-1"}>
            <Reveal>
              <p
                aria-hidden="true"
                className="font-heading text-sm font-bold tabular-nums tracking-[0.1em] text-brand-gold"
              >
                {ordinal}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                id={`${area.slug}-heading`}
                className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
              >
                {area.name}
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-4 font-heading text-lg font-semibold leading-snug text-brand-blue">
                {area.summary}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {area.description}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-9 text-xs font-bold uppercase tracking-[0.16em] text-brand-navy/60">
                What this involves
              </p>
            </Reveal>

            <ul className="mt-4 space-y-2.5">
              {area.activities.map((activity, i) => (
                <Reveal
                  as="li"
                  key={activity}
                  delay={0.28 + i * 0.06}
                  y={14}
                  className="flex items-start gap-3"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-brand-gold"
                  />
                  <span className="text-[0.9375rem] leading-relaxed text-brand-navy">
                    {activity}
                  </span>
                </Reveal>
              ))}
            </ul>

            {/* The limits the source is explicit about. Rendered at the same
                weight as the activities, not tucked away. */}
            {area.caveat && (
              <Reveal delay={0.3}>
                <p className="mt-7 max-w-xl border-l-2 border-brand-line-strong pl-5 text-sm leading-relaxed text-muted-foreground">
                  {area.caveat}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

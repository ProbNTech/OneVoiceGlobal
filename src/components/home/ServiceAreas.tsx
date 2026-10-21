import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaLink } from "@/components/shared/CtaLink";
import { Reveal } from "@/components/shared/Reveal";
import { resolveIcon } from "@/components/shared/icons";
import { serviceAreas, serviceAreasCta } from "@/data/services";

/**
 * The numbered arrow badge that opens each card.
 *
 * Two clip-paths over one another: a navy chevron pointing into the card, and
 * a gold corner wedge carrying the ordinal. Purely decorative — the ordinal is
 * already implied by reading order, so the whole badge is hidden from
 * assistive technology and the icon carries no label.
 *
 * The number uses ink on gold so the small ordinal stays readable.
 */
function AreaBadge({ order, Icon }: { order: number; Icon: LucideIcon }) {
  return (
    <span
      aria-hidden="true"
      className="relative block size-18 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <span
        className="absolute inset-0 bg-brand-navy transition-colors duration-300 group-hover:bg-brand-blue"
        style={{ clipPath: "polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%)" }}
      />
      <span
        className="absolute inset-0 bg-brand-gold"
        style={{ clipPath: "polygon(0 100%, 0 45%, 55% 100%)" }}
      />
      <span className="absolute bottom-1 left-1.5 font-heading text-[0.6875rem] font-bold leading-none text-brand-ink">
        {String(order).padStart(2, "0")}
      </span>
      <Icon
        className="absolute left-[38%] top-[38%] size-5 -translate-x-1/2 -translate-y-1/2 text-white"
        strokeWidth={1.75}
      />
    </span>
  );
}

/**
 * Our Five Areas of Work (brief section 06 / spec H-05).
 *
 * A six-slot card grid: the five areas, then a closing navy card for visitors
 * who do not yet know which area they need. Each card leads with a numbered
 * arrow badge, so the areas still read as an ordered set rather than six
 * interchangeable tiles.
 *
 * The International Network card keeps its explicit "longer-term ambition"
 * label, matching the client's document — the source positions it as future
 * growth, not an established global network.
 */
interface ServiceAreasProps {
  /**
   * Prefix for the section's link to the Programmes band. Empty on the
   * homepage, where that band sits on the same page; "/" on the Our Work page,
   * where it lives back on the homepage. Keeps the rule that no link ever
   * points at a section that is not there (spec FR-01).
   *
   * The contact link needs no prefix — the footer renders on every page.
   */
  hrefPrefix?: string;
}

export function ServiceAreas({ hrefPrefix = "" }: ServiceAreasProps) {
  return (
    <Section id="areas" className="bg-brand-ivory">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our work"
          title="Five Areas. One Shared Mission."
          description="Five connected areas of work, each a different way into the same goal — stronger, more inclusive communities where people can participate and progress."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {serviceAreas.map((area, i) => {
            const Icon = resolveIcon(area.icon);
            const future = area.slug === "international-network";

            return (
              <Reveal
                as="li"
                key={area.slug}
                id={area.slug}
                delay={i * 0.07}
                className="group flex h-full scroll-mt-28 gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40 hover:shadow-card"
              >
                <AreaBadge order={i + 1} Icon={Icon} />

                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="font-heading text-lg font-bold leading-snug text-brand-navy">
                    {area.name}
                  </h3>

                  {future && (
                    <span className="mt-2 inline-flex w-fit rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-brand-slate ring-1 ring-brand-line">
                      Longer-term ambition
                    </span>
                  )}

                  <span
                    aria-hidden="true"
                    className="mt-3 block h-0.5 w-10 bg-brand-gold transition-all duration-300 group-hover:w-16"
                  />

                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {area.summary}
                  </p>

                  <div className="mt-auto pt-5">
                    <CtaLink href={`${hrefPrefix}#programmes`} variant="text">
                      Learn More
                    </CtaLink>
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* Sixth slot — the way in for anyone who cannot place themselves in
              one of the five areas. */}
          <Reveal
            as="li"
            delay={serviceAreas.length * 0.07}
            className="flex h-full flex-col justify-center rounded-2xl bg-brand-navy p-7 shadow-card"
          >
            <h3 className="font-heading text-xl font-extrabold text-white">
              {serviceAreasCta.heading}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/75">
              {serviceAreasCta.body}
            </p>
            <div className="mt-6">
              <CtaLink href={serviceAreasCta.cta.href} variant="onDark">
                {serviceAreasCta.cta.label}
              </CtaLink>
            </div>
          </Reveal>
        </ul>
      </div>
    </Section>
  );
}

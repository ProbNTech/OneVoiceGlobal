import { Section } from "@/components/shared/Section";
import { CtaLink } from "@/components/shared/CtaLink";
import { Reveal } from "@/components/shared/Reveal";
import { ourWorkCta } from "@/data/work";

/**
 * Closing call to action for the Our Work page.
 *
 * Deep navy, white type, one gold rule that draws itself in. No photograph
 * behind it — the five sections above are photograph-led, so the page ends on
 * flat colour and typography instead of a sixth image.
 *
 * Both actions point back at homepage sections (`/#contact`, `/#partners`),
 * which is where those destinations live; the links are root-relative so they
 * resolve from this route.
 */
export function OurWorkCTA() {
  return (
    <Section
      spacing="tight"
      className="bg-brand-navy"
      aria-labelledby="our-work-cta-heading"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">
              {ourWorkCta.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="our-work-cta-heading"
              className="mt-5 text-balance font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {ourWorkCta.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <span
              aria-hidden="true"
              className="animate-draw-x mx-auto mt-8 block h-0.5 w-24 bg-brand-gold"
            />
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/80">
              {ourWorkCta.body}
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
              <CtaLink
                href={ourWorkCta.primaryCta.href}
                variant="primary"
                className="focus-visible:ring-white focus-visible:ring-offset-brand-navy"
              >
                {ourWorkCta.primaryCta.label}
              </CtaLink>
              <CtaLink
                href={ourWorkCta.secondaryCta.href}
                variant="onDarkOutline"
              >
                {ourWorkCta.secondaryCta.label}
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

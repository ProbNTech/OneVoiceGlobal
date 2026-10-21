import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaLink } from "@/components/shared/CtaLink";
import { Reveal } from "@/components/shared/Reveal";
import { partnerAudiences } from "@/data/home";

/**
 * Partnerships (brief section 12 / spec H-11).
 *
 * How collaboration creates pathways into education, employment, enterprise and
 * community participation. No partner logos are shown — none are approved for
 * display (spec FR-07).
 */
export function PartnersSection() {
  return (
    <Section id="partners">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="max-w-md">
            <SectionHeading
              eyebrow="Work with us"
              title="Creating Opportunity Together"
              description="We work alongside partners to open routes into education, employment, enterprise and community participation. Together we reach further and create more lasting change."
            />
            <div className="mt-8">
              <CtaLink href="#contact" variant="primary">
                Become a Partner
              </CtaLink>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Partner organisations will be listed here once collaborations are
              confirmed and approved for display.
            </p>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {partnerAudiences.map((partner, i) => (
              <Reveal
                as="li"
                key={partner.label}
                delay={i * 0.06}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
              >
                <h3 className="font-heading text-lg font-bold text-brand-navy">
                  {partner.label}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {partner.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

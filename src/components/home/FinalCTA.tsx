import Image from "next/image";
import { Section } from "@/components/shared/Section";
import { CtaLink } from "@/components/shared/CtaLink";
import { Reveal } from "@/components/shared/Reveal";
import { assets, finalCta } from "@/data/home";

/**
 * Final Call to Action (brief section 13 / spec H-12).
 *
 * One of the most memorable bands: the approved photograph behind a deep brand
 * wash, bold typography, the two primary actions, and the campaign closing line.
 */
export function FinalCTA() {
  return (
    <Section
      id="get-involved"
      className="relative overflow-hidden bg-brand-navy"
      aria-labelledby="final-cta-heading"
    >
      <Image
        src={assets.heroPhoto}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-brand-navy/97 via-brand-navy/94 to-brand-blue/90"
      />

      <div className="container-page relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2
            id="final-cta-heading"
            className="text-balance font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {finalCta.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            {finalCta.body}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <CtaLink href={finalCta.primaryCta.href} variant="primary">
              {finalCta.primaryCta.label}
            </CtaLink>
            <CtaLink href={finalCta.secondaryCta.href} variant="onDarkOutline">
              {finalCta.secondaryCta.label}
            </CtaLink>
          </div>

          <p className="mt-14 text-[0.8125rem] font-bold uppercase tracking-[0.22em] text-brand-gold">
            {finalCta.tagline}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

import { Check } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaLink } from "@/components/shared/CtaLink";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "@/components/shared/CountUp";
import { PlaceholderImage } from "@/components/shared/PlaceholderImage";
import { resolveIcon } from "@/components/shared/icons";
import {
  aboutContent,
  aboutMarkers,
  aboutPillars,
  aboutStats,
  assets,
} from "@/data/home";

/**
 * About OneVoice (brief section 03).
 *
 * A split editorial layout on warm ivory: the story reads down the left —
 * eyebrow, headline, lead line, two paragraphs, positioning markers, action —
 * while the right carries a layered composition (approved photograph with a
 * floating checklist card and the navy approach card). A full-width navy
 * statistics band follows. Soft brand blobs give the composition depth
 * without visual noise.
 *
 * CONTENT INTEGRITY: the figures in the bar are NOT impact statistics. Each one
 * counts content actually published on this site or restates a fact from the
 * source document. Participant numbers and
 * outcomes stay in the Impact section, and only once verified.
 *
 * Motion: entrance reveals are staggered down the left column and across the
 * bar; the float and drift loops are CSS, so the global reduced-motion rule in
 * globals.css settles everything into the static layout.
 */
export function AboutSection() {
  return (
    <>
      <Section
        id="about"
        className="relative overflow-hidden bg-brand-ivory"
      >
        {/* Ambient brand blobs — decorative, behind everything. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span className="animate-drift absolute -right-24 top-16 size-80 rounded-full bg-brand-gold/10 blur-3xl" />
          <span className="animate-drift-slow absolute -left-28 bottom-8 size-96 rounded-full bg-brand-blue/10 blur-3xl" />
        </div>

        <div className="container-page relative">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            {/* ---------------------------------------------------------------- */}
            {/*  Story                                                           */}
            {/* ---------------------------------------------------------------- */}
            <div className="max-w-xl">
              <Reveal>
                <SectionHeading
                  eyebrow="Who we are"
                  title={aboutContent.heading}
                />
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 font-heading text-xl font-bold text-brand-navy sm:text-2xl">
                  {aboutContent.lead}
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {aboutContent.intro}
                </p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {aboutContent.body}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                  {aboutMarkers.map((marker) => (
                    <li
                      key={marker}
                      className="flex items-center gap-2 text-[0.9375rem] font-semibold text-brand-blue"
                    >
                      <Check
                        className="size-4 shrink-0 text-brand-gold-ink"
                        aria-hidden="true"
                      />
                      {marker}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="mt-9">
                  <CtaLink href={aboutContent.cta.href} variant="primary">
                    {aboutContent.cta.label}
                  </CtaLink>
                </div>
              </Reveal>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/*  Layered composition                                            */}
            {/* ---------------------------------------------------------------- */}
            <div>
              <Reveal delay={0.1}>
                <div className="relative">
                  <PlaceholderImage
                    src={assets.secondaryPhoto}
                    alt={aboutContent.imageAlt}
                    aspect="landscape"
                    position="center 40%"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="shadow-[var(--shadow-card)]"
                  />

                  {/* Floating checklist card. Overhangs the photo's top-right,
                      clear of the subjects, and is hidden on the narrowest
                      screens where there is no room to overhang safely. */}
                  <div className="animate-float absolute -right-4 -top-7 hidden w-64 rounded-2xl border border-brand-line bg-white p-5 shadow-[var(--shadow-lift)] sm:block lg:-right-7">
                    <h3 className="gold-lettering text-xs font-bold uppercase tracking-[0.16em]">
                      What we do
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {aboutPillars.map((pillar) => (
                        <li key={pillar} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white"
                          >
                            <Check className="size-2.5" strokeWidth={3} />
                          </span>
                          <span className="text-[0.8125rem] leading-snug text-brand-navy">
                            {pillar}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Approach card, overlapping the foot of the photograph. */}
                  <div className="relative -mt-12 ml-4 max-w-sm rounded-2xl bg-brand-navy p-6 shadow-[var(--shadow-lift)] transition-transform duration-300 hover:-translate-y-1 sm:ml-10">
                    <p className="text-[0.8125rem] font-bold uppercase tracking-[0.18em] text-brand-gold">
                      Our approach
                    </p>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/85">
                      {aboutContent.mission}
                    </p>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </Section>

      <Section spacing="none" className="bg-brand-navy" aria-label="OneVoice at a glance">
        <div className="container-page">
          <ul className="grid grid-cols-2 md:grid-cols-4">
            {aboutStats.map((stat) => {
              const Icon = resolveIcon(stat.icon);
              return (
                <li
                  key={stat.label}
                  className="flex flex-col items-center justify-center border-white/15 px-4 py-5 text-center odd:border-r max-md:[&:nth-child(-n+2)]:border-b md:border-r md:last:border-r-0 md:py-6"
                >
                  <Icon
                    className="size-5 text-brand-gold"
                    aria-hidden="true"
                  />
                  <p className="mt-2.5 font-heading text-3xl font-extrabold leading-tight tabular-nums text-white sm:text-[2rem]">
                    {stat.value !== null ? (
                      <CountUp value={stat.value} />
                    ) : (
                      stat.text
                    )}
                  </p>
                  <p className="mt-2 max-w-48 text-[0.6875rem] font-semibold uppercase leading-relaxed tracking-[0.1em] text-white/75">
                    {stat.label}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>
    </>
  );
}

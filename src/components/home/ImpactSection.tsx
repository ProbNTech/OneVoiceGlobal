import { ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { impactFramework, impactIntro, intendedOutcomes } from "@/data/home";

/**
 * Our Impact (brief section 09 / spec H-10).
 *
 * CRITICAL: no statistics, totals or percentages are shown, because none are
 * verified. Instead the organisation's intended impact framework
 * (REACH → ENGAGE → DEVELOP → PROGRESS → SUSTAIN) is presented, with the areas
 * it intends to measure clearly labelled as intended — not achieved. The band
 * is built so verified figures can slot in later without a redesign.
 */
export function ImpactSection() {
  return (
    <Section
      id="impact"
      className="bg-brand-navy"
      aria-labelledby="impact-heading"
    >
      <div className="container-page">
        <SectionHeading
          id="impact-heading"
          eyebrow="Making a difference"
          title="Progress That Matters"
          description={impactIntro}
          align="center"
          tone="dark"
          className="mx-auto max-w-2xl"
        />

        {/* Framework flow */}
        <Reveal delay={0.1}>
          <ol className="mt-14 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            {impactFramework.map((stage, i) => (
              <li
                key={stage.label}
                className="flex items-center gap-3 sm:flex-col sm:gap-3"
              >
                <div className="flex w-full items-center gap-4 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-4 sm:w-36 sm:flex-col sm:gap-2 sm:px-4 sm:text-center">
                  <span className="font-heading text-sm font-bold text-brand-gold">
                    {String(stage.order).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-base font-bold uppercase tracking-[0.08em] text-white">
                    {stage.label}
                  </span>
                </div>
                {i < impactFramework.length - 1 && (
                  <ArrowRight
                    className="hidden size-5 shrink-0 text-white/40 sm:block"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Intended measurement areas */}
        <Reveal delay={0.15}>
          <div className="mt-14 rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-[0.8125rem] font-bold uppercase tracking-[0.18em] text-brand-gold">
              What we intend to measure
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {intendedOutcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="rounded-full border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white/85"
                >
                  {outcome}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/60">
              These are the outcomes we are building the means to measure. We
              will publish verified figures here as programmes begin and results
              are confirmed — never estimates presented as achievements.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

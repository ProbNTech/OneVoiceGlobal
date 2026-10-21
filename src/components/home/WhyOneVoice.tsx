import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { whyOneVoice } from "@/data/home";

/**
 * Why OneVoice? (brief section 05 / spec H-04).
 *
 * The emotional core of the brand on a deep-navy band: "One Organisation. Many
 * Pathways.", the holistic storytelling lines, and the eight threads shown as
 * an interlinked sequence to reinforce that one person's needs are different
 * and interconnected.
 */
export function WhyOneVoice() {
  return (
    <Section
      id="approach"
      className="relative overflow-hidden bg-brand-navy"
      aria-labelledby="why-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 size-96 rounded-full bg-brand-blue/20 blur-3xl"
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            {/* Matches the eyebrow in SectionHeading — see that component. */}
            <p className="section-eyebrow mb-4 font-bold uppercase tracking-[0.18em] text-brand-gold">
              Our approach
            </p>
            <h2
              id="why-heading"
              className="text-balance font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {whyOneVoice.differentiator}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mx-auto mt-9 max-w-xl space-y-2">
              {whyOneVoice.lines.map((line) => (
                <li
                  key={line}
                  className="text-lg leading-relaxed text-white/70"
                >
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-xl font-semibold text-white sm:text-2xl">
              {whyOneVoice.conclusion}
            </p>
          </Reveal>
        </div>

        {/* Connected threads */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto mt-14 max-w-4xl">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-white/15 lg:block"
            />
            <ul className="relative flex flex-wrap items-center justify-center gap-2.5">
              {whyOneVoice.threads.map((thread) => (
                <li
                  key={thread}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-brand-gold/60"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-brand-gold"
                  />
                  {thread}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

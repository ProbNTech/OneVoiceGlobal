import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { aboutTheory } from "@/data/about";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* The bars deepen from the palest teal to the logo's teal as they climb. */
const barTones = ["bg-lagoon-100", "bg-lagoon-300", "bg-lagoon-400", "bg-lagoon-500", "bg-lagoon-600"];

/**
 * Our Theory of Change: the brief's five steps "from community needs to
 * measurable progress" drawn as a rising staircase. On large screens each
 * step's number, name and line stand on a bar a step taller than the last,
 * so the five climb from left to right; on phones the bars lie flat under
 * each step and grow longer instead. The bars grow into place as each step
 * arrives (`.rise-draw`). The brief's long-term ambition closes the section.
 */
export function TheoryOfChange() {
  return (
    <section
      id={aboutTheory.id}
      aria-labelledby="theory-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal variant="fade" className="flex justify-center">
            <Kicker>{aboutTheory.kicker}</Kicker>
          </Reveal>
          <Title
            id="theory-title"
            lead={aboutTheory.titleLead}
            accent={aboutTheory.titleAccent}
            inline
            className="mt-5"
          />
          <Reveal delay={120}>
            <p className="mx-auto mt-6 max-w-2xl text-lead text-slate">{aboutTheory.lead}</p>
          </Reveal>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:mt-12 lg:grid-cols-5 lg:items-end lg:gap-x-5">
          {aboutTheory.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.name}
              delay={index * 110}
              className="flex flex-col"
              style={{ "--step": index } as CSSProperties}
            >
              <p className="font-display text-[2.5rem] leading-none text-lagoon-600/60 [font-variation-settings:'SOFT'_100] text-outline">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-[0.875rem] font-bold uppercase tracking-[0.14em] text-ink">{step.name}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{step.line}</p>
              <span
                aria-hidden="true"
                className={cx(
                  "rise-draw mt-5 block h-2.5 w-[calc(32%_+_var(--step)_*_17%)] rounded-full",
                  "lg:h-[calc(3rem_+_var(--step)_*_2.75rem)] lg:w-full lg:rounded-[1.25rem_1.25rem_0.375rem_0.375rem]",
                  barTones[index],
                )}
              />
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200}>
          <p className="mx-auto mt-10 max-w-3xl text-center font-display text-[1.375rem] font-light italic leading-snug text-ocean-600 [font-variation-settings:'SOFT'_100] sm:text-[1.625rem] lg:mt-12">
            {aboutTheory.closing}
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

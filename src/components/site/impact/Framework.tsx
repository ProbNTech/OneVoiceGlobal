import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { impactFramework } from "@/data/impact";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* Each step is set a size larger than the last, so the five words grow
   from Reach to Sustain as the framework does. */
const SIZES = [
  "text-[clamp(1.75rem,2.6vw,2.5rem)]",
  "text-[clamp(2rem,3.1vw,3rem)]",
  "text-[clamp(2.25rem,3.7vw,3.625rem)]",
  "text-[clamp(2.5rem,4.3vw,4.25rem)]",
  "text-[clamp(2.75rem,5vw,5rem)]",
];

/* Every other step is set in the italic accent of the site's titles. */
const ACCENTS = ["text-ink", "text-lagoon-600", "text-ink", "text-ocean-600", "text-ink"];

/**
 * Our Impact Framework, centred on cream: the brief's five words, Reach,
 * Engage, Develop, Progress and Sustain, set as one rising line in the
 * display face, each a size larger than the last and joined by an amber
 * arrow, so the framework reads as growth. They light up one after another
 * as the line arrives (`[data-reveal="phrases"]` in site.css). On phones
 * the words stand one under another, still growing, with the arrows
 * turned down.
 */
export function Framework() {
  const { steps } = impactFramework;

  return (
    <section
      id={impactFramework.id}
      aria-labelledby="framework-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[24rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lagoon-50 blur-[120px]"
      />
      <Shell>
        <div className="text-center">
          <Reveal variant="fade" className="flex justify-center">
            <Kicker>{impactFramework.kicker}</Kicker>
          </Reveal>
          <Title
            id="framework-title"
            lead={impactFramework.titleLead}
            accent={impactFramework.titleAccent}
            inline
            className="mt-5"
          />
        </div>

        <Reveal variant="phrases" delay={150} className="mt-8 lg:mt-12">
          <ol className="flex flex-col items-center gap-1 font-display leading-none tracking-[-0.025em] [font-variation-settings:'SOFT'_100] lg:flex-row lg:items-end lg:justify-center lg:gap-6 xl:gap-8">
            {steps.map((step, index) => (
              <li
                key={step}
                className="phrase flex flex-col items-center gap-1 lg:flex-row lg:items-end lg:gap-6 xl:gap-8"
                style={{ "--i": index } as CSSProperties}
              >
                <span
                  className={cx(SIZES[index], ACCENTS[index], index % 2 === 1 && "font-light italic", "pb-[0.08em]")}
                >
                  {step}
                </span>
                {index < steps.length - 1 ? (
                  <ArrowRight
                    aria-hidden="true"
                    className="mb-[0.6em] h-6 w-6 shrink-0 rotate-90 text-saffron-500 lg:mb-[0.9em] lg:h-7 lg:w-7 lg:rotate-0"
                    strokeWidth={1.6}
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </Shell>
    </section>
  );
}

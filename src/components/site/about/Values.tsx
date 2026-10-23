import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { aboutValues } from "@/data/about";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { GlideTrack } from "../ui/GlideTrack";
import { Reveal } from "../ui/Reveal";

/* The accent on each card, cycling through the three colours of the logo's
   figures so a row of cards carries the mark across it. */
const ACCENTS = ["var(--color-ocean-600)", "var(--color-lagoon-600)", "var(--color-saffron-500)"];

/**
 * Our Values, built the way the reference sites build a set of short items:
 * the values as zero-padded numbered cards, 01 to 08, closed off by a gliding
 * ribbon of their names.
 *
 * Two pieces of motion, both of them the site's own. The ribbon runs on the
 * marquee token and eases to a stop under the pointer (`GlideTrack`, as the
 * home page's people rows do). Each card's rule draws itself across the top
 * as the card arrives (`.line-draw`), which is the line treatment ELA sets
 * over its blocks. Without JavaScript, and with reduced motion, the ribbon
 * sits still and the rules are simply drawn.
 */
export function Values() {
  return (
    <section
      id={aboutValues.id}
      aria-labelledby="values-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div>
            <Reveal variant="fade">
              <Kicker as="h2" id="values-title">
                {aboutValues.kicker}
              </Kicker>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-3 max-w-xl text-lead text-slate">{aboutValues.lead}</p>
            </Reveal>
          </div>
          <Reveal delay={200} className="flex flex-wrap gap-3">
            <Cta href={aboutValues.primaryCta.href} variant="saffron">
              {aboutValues.primaryCta.label}
            </Cta>
            <Cta href={aboutValues.secondaryCta.href} variant="outline">
              {aboutValues.secondaryCta.label}
            </Cta>
          </Reveal>
        </div>
        <ol className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-9 lg:grid-cols-4 lg:gap-5">
          {aboutValues.items.map((value, index) => (
            <Reveal
              as="li"
              key={value.name}
              variant="up"
              delay={(index % 4) * 90}
              style={{ "--accent": ACCENTS[index % ACCENTS.length] } as CSSProperties}
              className="group relative flex flex-col overflow-hidden rounded-card bg-white p-4 ring-1 sm:p-6 ring-ink/6 shadow-[0_20px_44px_-36px_rgb(10_37_64/0.55)] transition-transform duration-700 ease-out-soft hover:-translate-y-1.5"
            >
              {/* The rule draws itself across the card's head. */}
              <span aria-hidden="true" className="line-draw absolute inset-x-0 top-0 h-[3px] bg-(--accent)" />

              <span
                aria-hidden="true"
                className="font-display text-[0.9375rem] font-light text-saffron-ink [font-variation-settings:'SOFT'_100]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className={cx(
                  "mt-4 font-display text-[1.375rem] leading-tight text-ink [font-variation-settings:'SOFT'_100]",
                  "transition-colors duration-500 ease-out-soft group-hover:text-lagoon-600",
                )}
              >
                {value.name}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-slate">{value.line}</p>
            </Reveal>
          ))}
        </ol>
      </Shell>

      {/* The ribbon closes the band. It runs to the screen edge, so it sits
          outside the page measure, and it repeats the names the cards carry
          above, so it is decorative and hidden from screen readers. */}
      <Reveal variant="fade" delay={120} className="mask-fade-x mt-7 overflow-hidden lg:mt-9">
        <GlideTrack
          aria-hidden="true"
          className="flex w-max animate-marquee motion-reduce:animate-none"
          style={{ "--marquee-duration": "48s" } as CSSProperties}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {aboutValues.items.map((value) => (
                <span key={value.name} className="flex items-center">
                  <span className="text-outline font-display text-[2.25rem] leading-none whitespace-nowrap text-ink/45 [font-variation-settings:'SOFT'_100] lg:text-[3rem]">
                    {value.name}
                  </span>
                  <span className="mx-7 flex gap-1 lg:mx-9">
                    <span className="h-1.5 w-1.5 rounded-full bg-ocean-600" />
                    <span className="h-1.5 w-1.5 rounded-full bg-lagoon-500" />
                    <span className="h-1.5 w-1.5 rounded-full bg-saffron-500" />
                  </span>
                </span>
              ))}
            </div>
          ))}
        </GlideTrack>
      </Reveal>
    </section>
  );
}

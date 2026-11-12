import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { refugeeApproach } from "@/data/refugee-support";
import { Photo } from "../ui/Photo";
import { Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* The four words take the logo's colours in turn, the second and fourth in the accent's italic. */
const WORD_TONES = ["text-ink", "font-light italic text-lagoon-600", "text-ink", "font-light italic text-ocean-600"];

/**
 * Our Approach, on sand: the document's four words, "Compassion. Dignity.
 * Inclusion. Opportunity.", as the heading, large, each lighting up after
 * the last as the band arrives (`Reveal variant="phrases"`). Beneath, a tall
 * photograph cut as a capsule beside the approach's paragraph and its five
 * principles, numbered in orange, each its name in the display face and the
 * document's line, with nothing behind or between them.
 */
export function Approach() {
  const { words, principles, image } = refugeeApproach;

  return (
    <section
      id={refugeeApproach.id}
      aria-labelledby="approach-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-sand py-band"
    >
      <Shell>
        <Reveal variant="fade">
          <Kicker>{refugeeApproach.kicker}</Kicker>
        </Reveal>
        <Reveal
          as="h2"
          id="approach-title"
          variant="phrases"
          delay={120}
          className="mt-5 font-display text-[clamp(2.5rem,6.2vw,6rem)] font-normal leading-[1.02] tracking-[-0.025em] [font-variation-settings:'SOFT'_100]"
        >
          {words.map((word, index) => (
            <span
              key={word}
              className={cx("phrase inline-block pr-[0.28em]", WORD_TONES[index])}
              style={{ "--i": index } as CSSProperties}
            >
              {word}
            </span>
          ))}
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:mt-12 lg:grid-cols-12 xl:gap-x-20">
          <Reveal variant="image" className="mx-auto w-full max-w-[22rem] lg:col-span-4 lg:max-w-none">
            <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
              <div className="reveal-clip relative aspect-[2/3] overflow-hidden rounded-full bg-cream">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Photo image={image} sizes="(min-width: 1760px) 520px, (min-width: 1024px) 28vw, 352px" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="max-w-3xl text-lead text-ink">{refugeeApproach.lead}</p>
              <p
                id="approach-principles"
                className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink"
              >
                {refugeeApproach.principlesLabel}
              </p>
            </Reveal>
            <ol aria-labelledby="approach-principles" className="mt-6 grid gap-x-10 gap-y-7 md:grid-cols-2">
              {principles.map((principle, index) => (
                <Reveal
                  as="li"
                  key={principle.name}
                  delay={(index % 2) * 90}
                  className={cx(
                    "flex items-start gap-4",
                    index === principles.length - 1 && "md:col-span-2 md:max-w-[calc(50%-1.25rem)]",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="w-8 shrink-0 pt-1 font-display text-[1.5rem] leading-none text-orange [font-variation-settings:'SOFT'_100]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.375rem] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
                      {principle.name}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate">{principle.line}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Shell>
    </section>
  );
}

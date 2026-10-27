import Image from "next/image";
import type { CSSProperties } from "react";
import { ShieldCheck } from "lucide-react";
import { cx } from "@/lib/cx";
import { partnersHero } from "@/data/partners";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* The last word of each line takes a light tint of the logo's colours, as
   the other dark heroes set theirs. */
const accentColours = ["text-ocean-300", "text-saffron-400"];

/**
 * Partners hero, on navy: the page speaks to organisations, so it opens in
 * the site's most formal tone. The brief's line is the headline, with the
 * two calls to act beneath; on large screens a photograph of partners at
 * work runs off the right edge of the screen, rounded only on the side that
 * faces the copy. The brief's promise about how partnerships are governed
 * sits on a card across the photograph's lower edge. Phones set the
 * photograph under the copy.
 *
 * The band is dark, so the header keeps its white logo and links over it
 * until the page moves (see DARK_HERO in SiteHeader).
 */
export function Hero() {
  const { image } = partnersHero;

  return (
    <section aria-labelledby="partners-hero-title" className="relative isolate overflow-clip bg-navy-950 text-white">
      {/* Light gathers in the corner, as it does behind the logo's globe. */}
      <div
        aria-hidden="true"
        className="absolute -left-48 -top-56 -z-10 h-[40rem] w-[40rem] rounded-full bg-ocean-600/25 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-56 left-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-lagoon-600/15 blur-[140px]"
      />

      <Shell>
        <div className="grid lg:min-h-[44rem] lg:grid-cols-12 lg:items-center">
          <div className="pb-10 pt-32 lg:col-span-6 lg:pb-20 lg:pt-36">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker tone="dark">{partnersHero.kicker}</Kicker>
            </Reveal>
            <Reveal
              as="h1"
              id="partners-hero-title"
              variant="lines"
              delay={180}
              margin="0px"
              className="mt-6 font-display text-title font-normal text-white [font-variation-settings:'SOFT'_100]"
            >
              {partnersHero.title.map((line, lineIndex) => {
                const words = line.split(" ");
                const accent = words.pop();
                return (
                  <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                    <span className="line-inner block" style={{ "--line": lineIndex } as CSSProperties}>
                      {words.join(" ")} <em className={cx("font-light", accentColours[lineIndex])}>{accent}</em>
                    </span>
                  </span>
                );
              })}
            </Reveal>
            <Reveal delay={420} margin="0px">
              <p className="mt-7 max-w-xl text-lead text-white/80">{partnersHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={partnersHero.primaryCta.href} variant="saffron">
                  {partnersHero.primaryCta.label}
                </Cta>
                <Cta href={partnersHero.secondaryCta.href} variant="outline-light">
                  {partnersHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>

      {/* The photograph. Below the copy on phones (the padding at the foot is
          the room the card hangs into); from large screens it stands beside
          the copy and runs off the right edge. */}
      <div className="relative px-(--gutter) pb-16 lg:absolute lg:bottom-14 lg:right-0 lg:top-28 lg:w-[46%] lg:p-0">
        <Reveal variant="image" delay={150} margin="0px" className="h-full">
          <div className="reveal-clip relative aspect-[4/3] overflow-hidden rounded-panel bg-navy-900 lg:aspect-auto lg:h-full lg:rounded-l-[3rem] lg:rounded-r-none">
            <div className="reveal-media absolute inset-0">
              <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  preload
                  quality={80}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: image.position }}
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal
          variant="up"
          delay={520}
          margin="0px"
          className="absolute bottom-6 left-[calc(var(--gutter)+0.75rem)] z-10 max-w-[20rem] sm:max-w-[24rem] lg:-left-12 lg:bottom-10"
        >
          <p className="flex items-start gap-4 rounded-card bg-white p-5 text-[0.875rem] leading-relaxed text-slate shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)]">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white">
              <ShieldCheck aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
            </span>
            {partnersHero.card}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

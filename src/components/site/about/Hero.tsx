import Image from "next/image";
import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { aboutHero } from "@/data/about";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* The last word of each line takes a light tint of one of the logo's three
   figure colours, in the order they sit around the mark, as the home hero
   sets its headline. */
const accentColours = ["text-ocean-300", "text-lagoon-300", "text-saffron-400"];

/**
 * About Us hero: a London skyline under a heavy navy wash, carrying the
 * brief's tagline as the headline and the two calls to act, with a collage on
 * the right of a tall photograph and a square one overlapping its foot. The
 * motto sits on a white pill across the large photograph's lower edge.
 *
 * The band is dark, so the header keeps its white logo and links over it
 * until the page moves (see DARK_HERO in SiteHeader).
 */
export function Hero() {
  const { backdrop, images } = aboutHero;

  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative isolate overflow-clip bg-navy-950 pb-14 pt-32 text-white lg:pb-20 lg:pt-40"
    >
      {/* London behind the band, drifting as the page scrolls. It is left just
          visible under the wash below, so it reads as the city the Foundation
          works in rather than as a photograph in its own right. */}
      <div aria-hidden="true" className="absolute inset-0 -z-30 overflow-hidden">
        <div className="parallax absolute inset-x-0 -inset-y-[10%]">
          <Image
            src={backdrop.src}
            alt=""
            fill
            preload
            quality={80}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: backdrop.position }}
          />
        </div>
      </div>

      {/* The wash: an even navy over the whole band, deeper on the left where
          the headline sits, and fading to solid navy at both edges so the bar
          above and the strip below meet a clean colour. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-navy-950/80" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgb(6_26_48/0.55)_0%,rgb(6_26_48/0.25)_55%,rgb(6_26_48/0)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-20 h-32 bg-linear-to-b from-navy-950 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-20 h-24 bg-linear-to-t from-navy-950 to-transparent"
      />

      {/* Light gathers in the top corner, as it does behind the logo's globe. */}
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-56 -z-10 h-[42rem] w-[42rem] rounded-full bg-ocean-600/25 blur-[150px]"
      />

      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal variant="fade" delay={80}>
              <Kicker tone="dark">{aboutHero.kicker}</Kicker>
            </Reveal>

            <Reveal
              as="h1"
              id="about-hero-title"
              variant="lines"
              delay={180}
              className="mt-6 font-display text-title font-normal text-white [font-variation-settings:'SOFT'_100]"
            >
              {aboutHero.title.map((line, lineIndex) => {
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

            <Reveal delay={420}>
              <p className="mt-7 max-w-xl text-lead text-white/80">{aboutHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={aboutHero.primaryCta.href} variant="saffron">
                  {aboutHero.primaryCta.label}
                </Cta>
                <Cta href={aboutHero.secondaryCta.href} variant="outline-light">
                  {aboutHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* Collage. The padding at the foot is the room the square photograph
              hangs down into. */}
          <div className="relative ml-auto w-full max-w-[34rem] pb-12 lg:col-span-5 lg:col-start-8 lg:pb-14">
            <Reveal variant="image" delay={150} className="relative ml-auto w-[90%]">
              <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[2rem_6rem_2rem_2rem] bg-navy-900 shadow-[0_50px_90px_-50px_rgb(0_0_0/0.8)]">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={images.main.src}
                      alt={images.main.alt}
                      fill
                      quality={80}
                      sizes="(min-width: 1760px) 500px, (min-width: 1024px) 31vw, 90vw"
                      className="object-cover"
                      style={{ objectPosition: images.main.position }}
                    />
                  </div>
                </div>
              </div>

              {/* The motto, straddling the photograph's lower edge. */}
              <Reveal
                variant="up"
                delay={520}
                margin="0px"
                className="absolute -bottom-5 right-5 z-10 max-w-[calc(100%-2.5rem)]"
              >
                <p className="whitespace-nowrap rounded-full bg-white px-5 py-3 text-[0.8125rem] font-semibold text-ink shadow-[0_18px_40px_-20px_rgb(0_0_0/0.65)] sm:text-[0.875rem]">
                  {aboutHero.badge}
                </p>
              </Reveal>
            </Reveal>

            <Reveal variant="image" delay={320} className="absolute bottom-0 left-0 w-[48%]">
              <div className="reveal-clip relative aspect-square overflow-hidden rounded-[1.5rem] bg-navy-900 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.85)] ring-8 ring-navy-950">
                <div className="reveal-media absolute inset-0">
                  <Image
                    src={images.inset.src}
                    alt={images.inset.alt}
                    fill
                    sizes="(min-width: 1760px) 270px, (min-width: 1024px) 17vw, 48vw"
                    className="object-cover"
                    style={{ objectPosition: images.inset.position }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

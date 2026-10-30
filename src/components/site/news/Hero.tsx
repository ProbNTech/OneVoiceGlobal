import { Newspaper } from "lucide-react";
import { newsHero } from "@/data/news";
import { Photo } from "../ui/Photo";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * News & Resources hero, on cream like the other inner pages: the block's
 * name as the headline, its opening line beneath and the two calls to act.
 * On the right one wide photograph with a leaf curve on its top-right
 * corner, and over its lower-left corner a white card with the block's line
 * for News, like a note pinned to a board.
 *
 * The header keeps its dark logo and links over this band (it is not in
 * SiteHeader's DARK_HERO).
 */
export function Hero() {
  const { card, image } = newsHero;

  return (
    <section
      aria-labelledby="news-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-32 lg:pt-40"
    >
      {/* Soft light in the logo's colours behind the photograph. */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-ocean-100/70 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 right-1/4 -z-10 h-[26rem] w-[26rem] rounded-full bg-saffron-100/80 blur-[110px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker>{newsHero.kicker}</Kicker>
            </Reveal>
            <Title
              as="h1"
              id="news-hero-title"
              lead={newsHero.title[0]}
              accent={newsHero.title[1]}
              accentTone="ocean"
              size="display"
              delay={180}
              className="mt-6"
            />
            <Reveal delay={420} margin="0px">
              <p className="mt-7 max-w-xl text-lead text-slate">{newsHero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={newsHero.primaryCta.href}>{newsHero.primaryCta.label}</Cta>
                <Cta href={newsHero.secondaryCta.href} variant="outline">
                  {newsHero.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          {/* Photograph. The padding at the foot is the room the card hangs into. */}
          <div className="relative w-full pb-12 lg:col-span-6 lg:ml-auto lg:max-w-[42rem]">
            <Reveal variant="image" delay={120} margin="0px">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[5/4] overflow-hidden rounded-[2rem_8rem_2rem_2rem] bg-sand">
                  <div className="reveal-media absolute inset-0">
                    <Photo image={image} preload sizes="(min-width: 1760px) 672px, (min-width: 1024px) 46vw, 92vw" />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal
              variant="up"
              delay={520}
              margin="0px"
              className="absolute bottom-0 left-0 z-10 max-w-[17rem] sm:-left-6 sm:max-w-[20rem]"
            >
              <div className="flex items-start gap-4 rounded-card bg-white p-5 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ocean-600 text-white">
                  <Newspaper aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-saffron-ink">
                    {card.label}
                  </p>
                  <p className="mt-1 font-display text-[1.125rem] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
                    {card.line}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

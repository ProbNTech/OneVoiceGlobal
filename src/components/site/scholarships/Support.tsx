import { Building, CalendarSync, Gem, HandCoins, Landmark, type LucideIcon } from "lucide-react";
import { cx } from "@/lib/cx";
import { scholarshipsSupport, type SupportIcon } from "@/data/scholarships";
import { Photo } from "../ui/Photo";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<SupportIcon, LucideIcon> = {
  individual: HandCoins,
  corporate: Building,
  named: Gem,
  annual: CalendarSync,
  legacy: Landmark,
};

/* The dot after each word, cycling through the logo's colours. */
const DOTS = ["bg-ocean-600", "bg-lagoon-500", "bg-orange"];

/**
 * Support a Student – Become a Scholarship Donor, on sand. A photograph of a
 * business owner and a student cut with a leaf corner, with the document's
 * line on how small a contribution can be on a card across its foot; beside
 * it the heading, its line on who can help, and what a contribution can
 * help fund, set as large running words (as the Community page's hub sets
 * its activities), then the two calls to act. The five ways to support
 * follow in one row on large screens, each an icon circle, its name and the
 * document's line, with nothing behind them.
 */
export function Support() {
  const { fund, ways, image } = scholarshipsSupport;

  return (
    <section
      id={scholarshipsSupport.id}
      aria-labelledby="support-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative order-2 w-full pb-10 lg:order-1 lg:col-span-5 lg:max-w-[34rem]">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[8rem_2rem_2rem_2rem] bg-cream">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Photo image={image} sizes="(min-width: 1760px) 680px, (min-width: 1024px) 38vw, 92vw" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal
              variant="up"
              delay={320}
              className="absolute bottom-0 right-0 z-10 max-w-[19rem] sm:-right-5 sm:max-w-[23rem]"
            >
              <p className="rounded-card bg-white p-5 font-display text-[1.125rem] leading-snug text-ink shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] [font-variation-settings:'SOFT'_100]">
                {scholarshipsSupport.difference}
              </p>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{scholarshipsSupport.kicker}</Kicker>
            </Reveal>
            <Title
              id="support-title"
              lead={scholarshipsSupport.titleLead}
              accent={scholarshipsSupport.titleAccent}
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 max-w-2xl text-lead text-slate">{scholarshipsSupport.lead}</p>
            </Reveal>

            <Reveal variant="fade" delay={150}>
              <p id="support-fund" className="mt-7 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">
                {scholarshipsSupport.fundLabel}
              </p>
            </Reveal>
            <ul aria-labelledby="support-fund" className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 lg:gap-x-5">
              {fund.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  variant="up"
                  delay={200 + index * 55}
                  className="flex items-center gap-4 lg:gap-5"
                >
                  <span
                    className={cx(
                      "font-display text-[clamp(1.375rem,2.1vw,2rem)] leading-[1.3] tracking-[-0.015em] [font-variation-settings:'SOFT'_100]",
                      index % 2 === 0 ? "text-ink" : "font-light italic text-lagoon-600",
                    )}
                  >
                    {item}
                  </span>
                  {index < fund.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className={cx("h-2 w-2 shrink-0 rounded-full", DOTS[index % DOTS.length])}
                    />
                  ) : null}
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
              <Cta href={scholarshipsSupport.primaryCta.href} variant="saffron">
                {scholarshipsSupport.primaryCta.label}
              </Cta>
              <Cta href={scholarshipsSupport.secondaryCta.href} variant="outline">
                {scholarshipsSupport.secondaryCta.label}
              </Cta>
            </Reveal>
          </div>
        </div>

        <Reveal variant="fade" className="mt-12 lg:mt-14">
          <h3 id="support-ways" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">
            {scholarshipsSupport.waysLabel}
          </h3>
        </Reveal>
        <ul aria-labelledby="support-ways" className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-5">
          {ways.map((way, index) => {
            const Icon = icons[way.icon];
            return (
              <Reveal as="li" key={way.name} delay={index * 80} className="group">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-lagoon-600 transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h4 className="mt-4 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-ink">{way.name}</h4>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{way.line}</p>
              </Reveal>
            );
          })}
        </ul>
      </Shell>
    </section>
  );
}

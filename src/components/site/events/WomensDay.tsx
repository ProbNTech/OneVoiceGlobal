import { Award, BriefcaseBusiness, CalendarDays, Handshake, Mic, UsersRound, type LucideIcon } from "lucide-react";
import { eventsWomensDay, type WomensDayIcon } from "@/data/events";
import { Photo } from "../ui/Photo";
import { ArrowLink, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { EventKicker } from "./EventKicker";
import { EventMeta } from "./EventMeta";

const icons: Record<WomensDayIcon, LucideIcon> = {
  speakers: Mic,
  networking: Handshake,
  careers: BriefcaseBusiness,
  mentoring: UsersRound,
  recognition: Award,
};

/**
 * 2. International Women's Day: a photograph of a speaker and her audience
 * cut with a leaf corner, with the day's date on a round white seal over its
 * lower corner, set as the calendar sets it. Beside it the event's theme as
 * the title, its date, the brief's description and its five proposed
 * highlights as a plain icon list, two to a row (an icon circle and the
 * highlight, nothing behind them), then the call to register interest.
 */
export function WomensDay() {
  const { image, date, highlights } = eventsWomensDay;

  return (
    <section
      id={eventsWomensDay.id}
      aria-labelledby="womens-day-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          {/* Photograph. The padding at the foot is the room the seal
              hangs into. */}
          <div className="relative w-full pb-10 lg:col-span-5 lg:max-w-[34rem]">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[2rem_8rem_2rem_2rem] bg-sand">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Photo image={image} sizes="(min-width: 1760px) 680px, (min-width: 1024px) 38vw, 92vw" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal variant="scale" delay={320} className="absolute bottom-0 right-4 z-10 sm:right-8 lg:-right-6">
              <p className="grid h-32 w-32 place-items-center rounded-full bg-white text-center shadow-[0_24px_50px_-24px_rgb(10_37_64/0.5)] sm:h-36 sm:w-36">
                <span>
                  <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-saffron-ink">
                    {date.secondary}
                  </span>
                  <span className="mt-1 block font-display text-[2.75rem] leading-none text-ink [font-variation-settings:'SOFT'_100]">
                    {date.primary}
                  </span>
                  <span className="mt-1 block text-[0.75rem] text-ink-muted">{date.detail}</span>
                </span>
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <EventKicker number={eventsWomensDay.number} name={eventsWomensDay.name} />
            </Reveal>
            <Title
              id="womens-day-title"
              lead={eventsWomensDay.titleLead}
              accent={eventsWomensDay.titleAccent}
              className="mt-5"
            />
            <Reveal delay={150}>
              <EventMeta className="mt-6" items={[{ icon: CalendarDays, text: eventsWomensDay.when }]} />
              <p className="mt-5 max-w-2xl text-lead text-slate">{eventsWomensDay.lead}</p>
            </Reveal>

            <Reveal variant="fade" delay={150}>
              <h3
                id="womens-day-highlights"
                className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
              >
                {eventsWomensDay.highlightsLabel}
              </h3>
            </Reveal>
            <ul aria-labelledby="womens-day-highlights" className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {highlights.map((highlight, index) => {
                const Icon = icons[highlight.icon];
                return (
                  <Reveal
                    as="li"
                    key={highlight.label}
                    delay={180 + index * 60}
                    className="group flex items-center gap-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lagoon-50 text-lagoon-600 transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-[1rem] font-semibold leading-snug text-ink">{highlight.label}</span>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={200} className="mt-8">
              <ArrowLink href={eventsWomensDay.cta.href}>{eventsWomensDay.cta.label}</ArrowLink>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

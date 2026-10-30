import Link from "next/link";
import { ArrowDownRight, Info } from "lucide-react";
import { cx } from "@/lib/cx";
import { eventsCalendar } from "@/data/events";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Proposed Annual Calendar: the block's paragraphs on the year ahead and its
 * note that dates and venues are provisional, then the seven events as an
 * agenda, two to a row on large screens. Each entry sets its date as the
 * brief writes it (the day or month large in the display face, the month or
 * year above it and the weekday or status beneath), beside the event's name
 * and its theme, venue or timing, and leads down to the event's own
 * section. Entries are told apart by space, with nothing ruled between them.
 */
export function Calendar() {
  return (
    <section
      id={eventsCalendar.id}
      aria-labelledby="calendar-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Kicker>{eventsCalendar.kicker}</Kicker>
            </Reveal>
            <Title
              id="calendar-title"
              lead={eventsCalendar.titleLead}
              accent={eventsCalendar.titleAccent}
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-7 lg:pb-2">
            <p className="text-lead text-ink">{eventsCalendar.paragraphs[0]}</p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate">{eventsCalendar.paragraphs[1]}</p>
          </Reveal>
        </div>

        <ol className="mt-10 grid gap-x-14 gap-y-7 lg:mt-12 lg:grid-cols-2 xl:gap-x-20">
          {eventsCalendar.events.map((event, index) => (
            <Reveal as="li" key={event.id} delay={(index % 2) * 90 + Math.floor(index / 2) * 60}>
              <Link href={event.href} className="group flex items-center gap-5 sm:gap-7">
                {/* The date, as the brief writes it. */}
                <span className="w-24 shrink-0 sm:w-28">
                  <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-orange-ink">
                    {event.date.secondary}
                  </span>
                  <span
                    className={cx(
                      "mt-1 block font-display leading-none text-ink transition-colors duration-500 [font-variation-settings:'SOFT'_100] group-hover:text-lagoon-600",
                      event.date.primary.length > 3
                        ? "whitespace-nowrap text-[1.5rem] sm:text-[1.625rem]"
                        : "text-[2.5rem] sm:text-[3rem]",
                    )}
                  >
                    {event.date.primary}
                  </span>
                  <span className="mt-1.5 block text-[0.8125rem] text-ink-muted">{event.date.detail}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.75rem] font-bold tabular-nums tracking-[0.2em] text-lagoon-600">
                    {event.number}
                  </span>
                  <span className="mt-1 block font-display text-[1.25rem] leading-snug text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.5rem]">
                    {event.name}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] leading-snug text-slate">{event.line}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink ring-1 ring-ink/10 transition-colors duration-500 group-hover:bg-ink group-hover:text-white"
                >
                  <ArrowDownRight className="h-4 w-4" strokeWidth={2} />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 lg:mt-12">
          <p className="flex max-w-3xl items-start gap-3.5 text-[0.9375rem] leading-relaxed text-ink-muted">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white icon-orange-ink">
              <Info aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </span>
            {eventsCalendar.note}
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

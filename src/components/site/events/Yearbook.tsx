import { BookOpen, CalendarDays } from "lucide-react";
import { eventsYearbook } from "@/data/events";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";
import { EventKicker } from "./EventKicker";
import { EventMeta } from "./EventMeta";

/**
 * 6. Yearbook 2027 – 100 Inspiring Personalities, on white and without a
 * photograph: a publication, so it is set in type. On the left the number
 * the yearbook is named for, very large in outlined figures, with
 * "Inspiring Personalities" in the italic accent beneath; on the right the
 * brief's opening words as the title, its date, the rest of its
 * description, the people it would profile as running text, and what else
 * it could showcase.
 */
export function Yearbook() {
  return (
    <section
      id={eventsYearbook.id}
      aria-labelledby="yearbook-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <div
        aria-hidden="true"
        className="absolute -left-32 top-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-orange-soft blur-[110px]"
      />

      <Shell>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          <Reveal variant="scale" className="lg:col-span-5">
            {/* The figure says again what the title and kicker say, so it
                is hidden from screen readers. */}
            <div aria-hidden="true" className="select-none">
              <p className="text-outline font-display text-[clamp(8.5rem,19vw,17rem)] leading-[0.82] tracking-[-0.04em] text-ocean-600 [font-variation-settings:'SOFT'_100]">
                {eventsYearbook.numeral}
              </p>
              <p className="mt-3 font-display text-[clamp(1.625rem,2.6vw,2.5rem)] font-light italic leading-tight text-lagoon-600 [font-variation-settings:'SOFT'_100]">
                {eventsYearbook.numeralLine}
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <EventKicker number={eventsYearbook.number} name={eventsYearbook.name} />
            </Reveal>
            <Title
              id="yearbook-title"
              lead={eventsYearbook.titleLead}
              accent={eventsYearbook.titleAccent}
              accentTone="ocean"
              className="mt-5"
            />
            <Reveal delay={150}>
              <EventMeta className="mt-6" items={[{ icon: CalendarDays, text: eventsYearbook.when }]} />
              <p className="mt-5 max-w-2xl text-lead text-slate">{eventsYearbook.lead}</p>

              <p
                id="yearbook-profiles"
                className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink"
              >
                {eventsYearbook.profilesLabel}
              </p>
              <RunList
                items={eventsYearbook.profiles}
                labelledBy="yearbook-profiles"
                dot="bg-orange"
                className="mt-3 max-w-3xl font-display text-[1.375rem] leading-[1.6] text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.625rem]"
              />
              <p className="mt-3 text-[1rem] italic leading-relaxed text-slate">{eventsYearbook.focus}</p>

              <p className="mt-7 flex max-w-2xl items-start gap-3.5 text-[1rem] leading-relaxed text-ink">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white">
                  <BookOpen aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.7} />
                </span>
                {eventsYearbook.showcase}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

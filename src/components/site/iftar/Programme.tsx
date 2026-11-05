import { Building, CalendarDays, Clock3, Info, MapPin, Moon, Users, type LucideIcon } from "lucide-react";
import { cx } from "@/lib/cx";
import { iftarProgramme } from "@/data/iftar";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const rowIcons: Record<(typeof iftarProgramme.venue.rows)[number]["icon"], LucideIcon> = {
  date: CalendarDays,
  venue: MapPin,
  people: Users,
  organiser: Building,
};

/* The evening, from daylight to dusk: each step's disc a little further
   towards night than the last, from the site's orange (its stops, as
   styles/brand-colours.ts publishes them) to the logo's navy. The shared
   Iftar falls at sunset. */
const SKY = [
  "bg-(--orange-light-1) text-ink",
  "bg-(--orange-light-2) text-ink",
  "bg-(--orange-bright-2) text-white",
  "bg-(--orange-bright-3) text-white",
  "bg-(--orange-ink-3) text-white",
  "bg-navy-800 text-white",
  "bg-navy-950 text-white",
];

/**
 * Proposed Event Programme and Venue & Event Information, on white. On the
 * left the programme in its order, each step a disc whose colour moves from
 * daylight orange to evening navy as the list goes on, the step's number in
 * it and its name in the display face beside it; the shared Iftar carries a
 * crescent in place of its number and is set in the italic accent. Nothing
 * is drawn between the steps. The document's note on timing follows. On the
 * right the venue and event information as a plain list of icon rows, with
 * the Events 2027 note that dates and venues are provisional until
 * confirmed, as the document's layout asks.
 */
export function Programme() {
  const { items, iftarItem, venue } = iftarProgramme;

  return (
    <section
      id={iftarProgramme.id}
      aria-labelledby="iftar-programme-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{iftarProgramme.kicker}</Kicker>
            </Reveal>
            <Title
              id="iftar-programme-title"
              lead={iftarProgramme.titleLead}
              accent={iftarProgramme.titleAccent}
              inline
              className="mt-5"
            />
            <Reveal delay={100}>
              <p id="iftar-programme-lead" className="mt-5 text-lead text-slate">
                {iftarProgramme.lead}
              </p>
            </Reveal>
            <ol aria-labelledby="iftar-programme-lead" className="mt-6 space-y-3.5">
              {items.map((item, index) => {
                const isIftar = index === iftarItem;
                return (
                  <Reveal
                    as="li"
                    key={item}
                    variant="left"
                    delay={120 + index * 80}
                    className="flex items-center gap-5"
                  >
                    <span
                      className={cx(
                        "grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-[1.125rem] tabular-nums shadow-[0_12px_24px_-14px_rgb(10_37_64/0.6)] [font-variation-settings:'SOFT'_100]",
                        SKY[index],
                      )}
                    >
                      {isIftar ? (
                        <Moon aria-hidden="true" className="h-5 w-5 icon-orange" strokeWidth={1.8} />
                      ) : (
                        <span aria-hidden="true">{index + 1}</span>
                      )}
                    </span>
                    <span
                      className={cx(
                        "font-display text-[1.25rem] leading-snug [font-variation-settings:'SOFT'_100] sm:text-[1.4375rem]",
                        isIftar ? "italic font-light text-lagoon-600" : "text-ink",
                      )}
                    >
                      {item}
                    </span>
                  </Reveal>
                );
              })}
            </ol>
            <Reveal delay={200}>
              <p className="mt-7 flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink">
                <Clock3 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 icon-orange-ink" strokeWidth={1.7} />
                {iftarProgramme.timing}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-3">
            <Reveal>
              <h3
                id="iftar-venue-title"
                className="font-display text-[1.75rem] leading-tight text-ink [font-variation-settings:'SOFT'_100] sm:text-[2rem]"
              >
                {venue.title}
              </h3>
            </Reveal>
            <dl aria-labelledby="iftar-venue-title" className="mt-6 space-y-5">
              {venue.rows.map((row, index) => {
                const Icon = rowIcons[row.icon];
                return (
                  <Reveal key={row.label} delay={100 + index * 80} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lagoon-50 text-lagoon-600">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <dt className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink-muted">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-[1.0625rem] font-semibold leading-snug text-ink">{row.value}</dd>
                    </div>
                  </Reveal>
                );
              })}
            </dl>
            <Reveal delay={300}>
              <p className="mt-7 flex items-start gap-3 text-[0.875rem] leading-relaxed text-ink-muted">
                <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-lagoon-600" strokeWidth={1.8} />
                {venue.note}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

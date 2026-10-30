import { CalendarDays, Check, MapPin } from "lucide-react";
import { eventsIftar } from "@/data/events";
import { Photo } from "../ui/Photo";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { EventKicker } from "./EventKicker";
import { EventMeta } from "./EventMeta";

/**
 * 1. Community Iftar & Official Launch, the event the year opens with, as
 * the page's one full-bleed photograph (as the Community page's
 * Integration): a large Iftar under a marquee at sunset fills the band edge
 * to edge and drifts as the page scrolls, shaded only on the left where the
 * title, date, venue and the brief's description sit. Its proposed
 * highlights are set on a white card over the right of the picture, each
 * beside an orange tick.
 */
export function Iftar() {
  const { image, venue } = eventsIftar;

  return (
    <section
      id={eventsIftar.id}
      aria-labelledby="iftar-title"
      className="relative isolate overflow-clip bg-navy-950 py-band text-white"
    >
      {/* The photograph carries the section's meaning, so it keeps its
          description although the copy sits over it. */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="parallax absolute inset-x-0 -inset-y-[10%]">
          <Photo image={image} quality={80} sizes="100vw" />
        </div>
      </div>
      {/* Even on phones, where the copy runs across the whole picture; from
          large screens a wash that is deep under the title and clear across
          the people on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy-950/72 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgb(6_26_48/0.92)_0%,rgb(6_26_48/0.74)_40%,rgb(6_26_48/0.22)_72%,rgb(6_26_48/0.1)_100%)]"
      />

      <Shell>
        <div className="grid items-center gap-8 py-6 lg:min-h-[34rem] lg:grid-cols-12 lg:gap-12 lg:py-10">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <EventKicker number={eventsIftar.number} name={eventsIftar.name} tone="dark" />
            </Reveal>
            <Title
              id="iftar-title"
              lead={eventsIftar.titleLead}
              accent={eventsIftar.titleAccent}
              tone="dark"
              accentTone="saffron"
              className="mt-5"
            />
            <Reveal delay={150}>
              <EventMeta
                tone="dark"
                className="mt-6"
                items={[
                  { icon: CalendarDays, text: eventsIftar.when },
                  { icon: MapPin, label: venue.label, text: venue.text },
                ]}
              />
              <p className="mt-6 max-w-xl text-lead text-white/85">{eventsIftar.lead}</p>
            </Reveal>
          </div>

          <Reveal variant="right" delay={200} className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-panel bg-white p-7 text-slate shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] sm:p-9">
              <p
                id="iftar-highlights"
                className="text-[0.75rem] font-bold uppercase tracking-[0.22em] text-saffron-ink"
              >
                {eventsIftar.highlightsLabel}
              </p>
              <ul aria-labelledby="iftar-highlights" className="mt-6 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                {eventsIftar.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-[1rem] font-medium leading-snug text-ink">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-saffron-500 text-white">
                      <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

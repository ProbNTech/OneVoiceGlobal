import type { CSSProperties } from "react";
import { CalendarDays, Moon, Sunset } from "lucide-react";
import { cx } from "@/lib/cx";
import { eventsEid } from "@/data/events";
import { Photo } from "../ui/Photo";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { EventKicker } from "./EventKicker";
import { EventMeta } from "./EventMeta";

/* The dot after each word, cycling through the colours of the logo's figures. */
const DOTS = ["var(--color-ocean-600)", "var(--color-lagoon-500)", "var(--color-saffron-500)"];

/**
 * 3. Eid Bazaar, on sand: the brief's own opening words as the title, its
 * date and timing, then what the marketplace is focused on as large running
 * words (as the Community page's hub sets its activities), alternating
 * upright and italic and each closed by a dot in one of the logo's colours.
 * Its proposed highlights follow as a plain list. A photograph of a festive
 * evening marketplace stands beside them under an arched top, with the
 * brief's note on the date of Eid on a card over its foot.
 */
export function EidBazaar() {
  const { image, timing, focus, highlights } = eventsEid;

  return (
    <section id={eventsEid.id} aria-labelledby="eid-title" className="relative isolate overflow-clip bg-sand py-band">
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <EventKicker number={eventsEid.number} name={eventsEid.name} />
            </Reveal>
            <Title
              id="eid-title"
              lead={eventsEid.titleLead}
              accent={eventsEid.titleAccent}
              accentTone="ocean"
              className="mt-5"
            />
            <Reveal delay={150}>
              <EventMeta
                className="mt-6"
                items={[
                  { icon: CalendarDays, text: eventsEid.when },
                  { icon: Sunset, label: timing.label, text: timing.text },
                ]}
              />
            </Reveal>

            <Reveal variant="fade" delay={150}>
              <h3 id="eid-focus" className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink">
                {eventsEid.focusLabel}
              </h3>
            </Reveal>
            <ul aria-labelledby="eid-focus" className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 lg:gap-x-5">
              {focus.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  variant="up"
                  delay={200 + index * 55}
                  style={{ "--dot": DOTS[index % DOTS.length] } as CSSProperties}
                  className="group flex items-center gap-4 lg:gap-5"
                >
                  <span
                    className={cx(
                      "font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.3] tracking-[-0.015em] transition-colors duration-500 ease-out-soft [font-variation-settings:'SOFT'_100]",
                      index % 2 === 0
                        ? "text-ink group-hover:text-ocean-600"
                        : "font-light italic text-lagoon-600 group-hover:text-ink",
                    )}
                  >
                    {item}
                  </span>
                  {index < focus.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full bg-(--dot) transition-transform duration-500 ease-out-soft group-hover:scale-150"
                    />
                  ) : null}
                </Reveal>
              ))}
            </ul>

            <Reveal delay={150}>
              <h3
                id="eid-highlights"
                className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
              >
                {eventsEid.highlightsLabel}
              </h3>
              <ul aria-labelledby="eid-highlights" className="mt-4 grid max-w-3xl gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink">
                    <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative w-full pb-10 lg:col-span-5 lg:ml-auto lg:max-w-[34rem]">
            <Reveal variant="image" delay={100}>
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-cream">
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
              className="absolute bottom-0 left-0 z-10 max-w-[19rem] sm:-left-5 sm:max-w-[22rem]"
            >
              <p className="flex items-start gap-4 rounded-card bg-white p-5 text-[0.875rem] leading-relaxed text-ink shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ocean-600 text-white">
                  <Moon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                {eventsEid.note}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

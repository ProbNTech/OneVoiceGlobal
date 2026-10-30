import type { CSSProperties } from "react";
import {
  CalendarDays,
  HandCoins,
  HandHeart,
  HeartPulse,
  Info,
  Route,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cx } from "@/lib/cx";
import { eventsWalks, type WalkIcon } from "@/data/events";
import { Photo } from "../ui/Photo";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { EventKicker } from "./EventKicker";
import { EventMeta } from "./EventMeta";

const icons: Record<WalkIcon, LucideIcon> = {
  routes: Route,
  family: Users,
  teams: Trophy,
  fundraising: HandCoins,
  wellbeing: HeartPulse,
  sponsorship: HandHeart,
};

/* The disc before each highlight, cycling through the logo's colours; the
   amber one takes a dark icon, as white on amber would be too faint. */
const DISCS = ["bg-lagoon-600 text-white", "bg-ocean-600 text-white", "bg-saffron-500 text-ink"];

/* Every other highlight is set in the italic accent of the site's titles. */
const ACCENTS = ["text-lagoon-600", "text-ocean-600", "text-saffron-ink"];

/**
 * 5. OneVoice East London Community Marathon Walks, on cream: the event's
 * theme as the title beside its date and the brief's description, then a
 * wide photograph of a community walk rounded into a pill, drifting a
 * little as the page scrolls. Its proposed highlights follow as one
 * statement in the display face, each opening on a disc with its icon and
 * every other one in the italic accent, lighting up one after another as it
 * arrives (`[data-reveal="phrases"]` in site.css). The brief's note on
 * routes and permissions closes the section.
 */
export function Walks() {
  const { image, highlights } = eventsWalks;

  return (
    <section
      id={eventsWalks.id}
      aria-labelledby="walks-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <EventKicker number={eventsWalks.number} name={eventsWalks.name} />
            </Reveal>
            <Title id="walks-title" lead={eventsWalks.titleLead} accent={eventsWalks.titleAccent} className="mt-5" />
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:pb-2">
            <EventMeta items={[{ icon: CalendarDays, text: eventsWalks.when }]} />
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate">{eventsWalks.lead}</p>
          </Reveal>
        </div>

        <Reveal variant="image" className="mt-8 lg:mt-10">
          <div className="reveal-clip relative aspect-[16/5] overflow-hidden rounded-full bg-sand shadow-[0_40px_70px_-50px_rgb(10_37_64/0.6)]">
            <div className="reveal-media absolute inset-0">
              <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                <Photo image={image} sizes="(min-width: 1920px) 1760px, 92vw" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 lg:mt-10">
          <Reveal variant="fade">
            <p id="walks-highlights" className="text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-saffron-ink">
              {eventsWalks.highlightsLabel}
            </p>
          </Reveal>
          <Reveal variant="phrases" delay={120} className="mt-4">
            <ul
              aria-labelledby="walks-highlights"
              className="max-w-[88rem] font-display text-statement text-ink [font-variation-settings:'SOFT'_100]"
            >
              {highlights.map((highlight, index) => {
                const Icon = icons[highlight.icon];
                /* The disc keeps to the highlight's first word, so it is
                   never left alone at the end of a line. */
                const [first, ...rest] = highlight.label.split(" ");
                return (
                  <li key={highlight.label} className="phrase inline" style={{ "--i": index } as CSSProperties}>
                    <span
                      className={cx(
                        index % 2 === 1 && cx("italic font-light", ACCENTS[((index - 1) / 2) % ACCENTS.length]),
                      )}
                    >
                      <span className="whitespace-nowrap">
                        <span
                          aria-hidden="true"
                          className={cx(
                            "mr-[0.3em] inline-grid h-[1.05em] w-[1.05em] place-items-center rounded-full align-[-0.16em] not-italic",
                            DISCS[index % DISCS.length],
                          )}
                        >
                          <Icon className="h-[0.5em] w-[0.5em]" strokeWidth={1.8} />
                        </span>
                        {first}
                      </span>{" "}
                      {rest.join(" ")}
                    </span>{" "}
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-7 flex max-w-3xl items-start gap-3.5 text-[0.9375rem] leading-relaxed text-ink-muted">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-lagoon-600">
                <Info aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </span>
              {eventsWalks.note}
            </p>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

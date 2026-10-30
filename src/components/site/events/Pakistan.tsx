import { CalendarDays } from "lucide-react";
import { cx } from "@/lib/cx";
import { eventsPakistan } from "@/data/events";
import { Photo } from "../ui/Photo";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { EventKicker } from "./EventKicker";
import { EventMeta } from "./EventMeta";

/* The three frames: a leaf on the outer corner of each side frame and an
   arch in the middle, which stands a little higher than the other two. */
const frames = [
  "rounded-[6rem_2rem_2rem_2rem] sm:mt-12",
  "rounded-t-[999px] rounded-b-[2rem]",
  "rounded-[2rem_6rem_2rem_2rem] sm:mt-12",
];

/**
 * 4. Pakistan Independence Day & Community Celebration, as the page's navy
 * band, centred: the event's theme as the title, its date and the brief's
 * description. Then the theme's three parts, Heritage, Identity and Shared
 * Futures, each named in the display face under a photograph of its own;
 * the three stand side by side in organic frames, the middle one higher.
 * The proposed highlights close the section, each led by an orange dot.
 */
export function Pakistan() {
  const { theme, highlights } = eventsPakistan;

  return (
    <section
      id={eventsPakistan.id}
      aria-labelledby="pakistan-title"
      className="relative isolate overflow-clip bg-navy-950 py-band text-white/75"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-lagoon-600/20 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -right-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-ocean-600/25 blur-[140px]"
      />

      <Shell>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal variant="fade" className="flex justify-center">
            <EventKicker number={eventsPakistan.number} name={eventsPakistan.name} tone="dark" />
          </Reveal>
          <Title
            id="pakistan-title"
            lead={eventsPakistan.titleLead}
            accent={eventsPakistan.titleAccent}
            tone="dark"
            accentTone="saffron"
            className="mt-5"
          />
          <Reveal delay={150}>
            <EventMeta
              tone="dark"
              className="mt-6 justify-center"
              items={[{ icon: CalendarDays, text: eventsPakistan.when }]}
            />
            <p className="mx-auto mt-5 max-w-2xl text-lead text-white/80">{eventsPakistan.lead}</p>
          </Reveal>
        </div>

        <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-3 gap-3 sm:gap-6 lg:mt-12 lg:gap-8">
          {theme.map((part, index) => (
            <Reveal as="li" key={part.word} variant="image" delay={index * 140}>
              <figure className={frames[index]}>
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[inherit] bg-navy-900">
                  <div className="reveal-media absolute inset-0">
                    <Photo
                      image={part.image}
                      sizes="(min-width: 1920px) 380px, (min-width: 1024px) 22vw, 31vw"
                      className="transition-transform duration-[1.4s] ease-out-soft hover:scale-[1.07]"
                    />
                  </div>
                </div>
                <figcaption
                  className={cx(
                    "mt-4 text-center font-display text-[1.125rem] leading-tight [font-variation-settings:'SOFT'_100] sm:mt-5 sm:text-[1.625rem] lg:text-[2rem]",
                    index % 2 === 0 ? "text-white" : "font-light italic text-orange",
                  )}
                >
                  {part.word}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={150} className="mx-auto mt-10 max-w-5xl text-center lg:mt-12">
          <h3 id="pakistan-highlights" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange">
            {eventsPakistan.highlightsLabel}
          </h3>
          <ul
            aria-labelledby="pakistan-highlights"
            className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[1rem] leading-snug text-white"
          >
            {highlights.map((highlight) => (
              <li key={highlight} className="inline-flex items-start gap-2.5 text-left">
                <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                {highlight}
              </li>
            ))}
          </ul>
        </Reveal>
      </Shell>
    </section>
  );
}

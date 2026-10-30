import { Award, CalendarDays, ShieldCheck } from "lucide-react";
import { eventsAwards } from "@/data/events";
import { Photo } from "../ui/Photo";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { EventKicker } from "./EventKicker";
import { EventMeta } from "./EventMeta";

/**
 * 7. OneVoice Achievement Awards 2027, on sand: a photograph of an awards
 * evening cut with a leaf corner, with Draft01's line on transparent
 * criteria and governance on a card over its foot. Beside it the event's
 * theme as the title, its date, the brief's two sentences, its proposed
 * highlights, and its ten potential categories, two to a row, each led by a
 * small amber award mark with nothing behind it.
 */
export function Awards() {
  const { image, highlights, categories } = eventsAwards;

  return (
    <section
      id={eventsAwards.id}
      aria-labelledby="awards-title"
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
              className="absolute bottom-0 left-0 z-10 max-w-[19rem] sm:-left-5 sm:max-w-[22rem]"
            >
              <p className="flex items-start gap-4 rounded-card bg-white p-5 text-[0.875rem] leading-relaxed text-ink shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white">
                  <ShieldCheck aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                {eventsAwards.governance}
              </p>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal variant="fade">
              <EventKicker number={eventsAwards.number} name={eventsAwards.name} />
            </Reveal>
            <Title id="awards-title" lead={eventsAwards.titleLead} accent={eventsAwards.titleAccent} className="mt-5" />
            <Reveal delay={150}>
              <EventMeta className="mt-6" items={[{ icon: CalendarDays, text: eventsAwards.when }]} />
              <p className="mt-5 max-w-2xl text-lead text-ink">{eventsAwards.lead[0]}</p>
              <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-slate">{eventsAwards.lead[1]}</p>

              <h3
                id="awards-highlights"
                className="mt-7 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
              >
                {eventsAwards.highlightsLabel}
              </h3>
              <ul aria-labelledby="awards-highlights" className="mt-4 grid max-w-3xl gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink">
                    <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="fade" delay={150}>
              <h3
                id="awards-categories"
                className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
              >
                {eventsAwards.categoriesLabel}
              </h3>
            </Reveal>
            <ul aria-labelledby="awards-categories" className="mt-4 grid max-w-3xl gap-x-8 gap-y-3 sm:grid-cols-2">
              {categories.map((category, index) => (
                <Reveal
                  as="li"
                  key={category}
                  delay={150 + index * 45}
                  className="group flex items-center gap-3 font-display text-[1.1875rem] leading-snug text-ink [font-variation-settings:'SOFT'_100]"
                >
                  <Award
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-saffron-500 transition-transform duration-500 ease-out-soft group-hover:-rotate-12 group-hover:scale-110"
                    strokeWidth={1.6}
                  />
                  {category}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Shell>
    </section>
  );
}

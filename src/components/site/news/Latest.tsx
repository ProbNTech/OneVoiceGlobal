import Link from "next/link";
import { ArrowUpRight, Info, Newspaper } from "lucide-react";
import { newsLatest } from "@/data/news";
import { ArrowLink, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * News and Events, on white. On the left, the block's line for News as the
 * title and, set large in the display face, the plain fact that no news has
 * been published yet. On the right, the events the brief does give: Events
 * 2027's proposed calendar as a list of dates, each linking to its event,
 * with that page's note on provisional dates beneath.
 */
export function Latest() {
  const { events } = newsLatest;

  return (
    <section
      id={newsLatest.id}
      aria-labelledby="news-latest-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Kicker>{newsLatest.kicker}</Kicker>
            </Reveal>
            <Title
              id="news-latest-title"
              lead={newsLatest.titleLead}
              accent={newsLatest.titleAccent}
              accentTone="ocean"
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-8 flex items-center gap-4 font-display text-statement text-ink [font-variation-settings:'SOFT'_100]">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-saffron-500 text-white">
                  <Newspaper aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
                </span>
                {newsLatest.status}
              </p>
            </Reveal>
          </div>

          <div id={events.id} className="scroll-mt-24 lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{events.kicker}</Kicker>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="mt-5 font-display text-[1.5rem] leading-snug text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.75rem]">
                {events.title}
              </h3>
            </Reveal>

            <ul className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {events.items.map((item, index) => (
                <Reveal as="li" key={item.id} delay={140 + index * 60}>
                  <Link href={item.href} className="group flex items-center gap-4 py-3">
                    <span className="w-16 shrink-0 text-center">
                      <span className="block font-display text-[1.75rem] leading-none text-ocean-600 [font-variation-settings:'SOFT'_100]">
                        {item.date.primary}
                      </span>
                      <span className="mt-1 block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                        {item.date.secondary}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1 text-[0.9375rem] font-semibold leading-snug text-ink transition-colors duration-500 group-hover:text-lagoon-600">
                      {item.name}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-500 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lagoon-600"
                      strokeWidth={1.6}
                    />
                  </Link>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200}>
              <p className="mt-6 flex items-start gap-3 text-[0.875rem] leading-relaxed text-ink-muted">
                <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-lagoon-600" strokeWidth={1.6} />
                {newsLatest.note}
              </p>
              <ArrowLink href={events.cta.href} className="mt-5">
                {events.cta.label}
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

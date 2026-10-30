import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { impactStories } from "@/data/impact";
import { logo } from "@/data/site";
import { Photo } from "../ui/Photo";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Success Stories, on sand: a photograph cut with a leaf corner, with the
 * brief's line on what the stories will be on a card over its foot. Beside
 * it the heading, the brief's line that stories can show the difference
 * support makes, and its six example journeys, each set as a turn in one
 * line: where it starts, in muted italic, an orange arrow, and where it
 * leads, in the display face. On hover the arrow moves on and the
 * destination takes the logo's teal. The journeys are the brief's own
 * examples, not stories of real participants, and the page presents them
 * that way.
 */
export function Stories() {
  const { journeys, labels, image } = impactStories;

  return (
    <section
      id={impactStories.id}
      aria-labelledby="stories-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative order-2 w-full pb-10 lg:order-1 lg:col-span-5 lg:max-w-[34rem]">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[2rem_2rem_2rem_8rem] bg-cream">
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
              className="absolute bottom-0 right-0 z-10 max-w-[18rem] sm:-right-5 sm:max-w-[21rem]"
            >
              <div className="flex items-center gap-4 rounded-card bg-white p-5 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-11 w-auto shrink-0"
                />
                <span className="text-[0.9375rem] font-semibold leading-snug text-ink">{impactStories.card}</span>
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{impactStories.kicker}</Kicker>
            </Reveal>
            <Title
              id="stories-title"
              lead={impactStories.titleLead}
              accent={impactStories.titleAccent}
              inline
              className="mt-5"
            />
            <Reveal delay={150}>
              <p id="stories-lead" className="mt-6 max-w-2xl text-lead text-slate">
                {impactStories.lead}
              </p>
            </Reveal>

            <ul aria-labelledby="stories-lead" className="mt-7 space-y-3 sm:space-y-4">
              {journeys.map((journey, index) => (
                <Reveal
                  as="li"
                  key={journey.to}
                  variant="left"
                  delay={180 + index * 80}
                  className="group flex flex-wrap items-baseline gap-x-4 gap-y-1"
                >
                  <span className="font-display text-[1.25rem] font-light italic leading-snug text-ink-muted [font-variation-settings:'SOFT'_100] sm:text-[1.5rem]">
                    {labels.from} {journey.from}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 translate-y-0.5 self-center text-saffron-500 transition-transform duration-500 ease-out-soft group-hover:translate-x-1.5"
                    strokeWidth={1.8}
                  />
                  <span className="font-display text-[1.5rem] leading-snug text-ink transition-colors duration-500 [font-variation-settings:'SOFT'_100] group-hover:text-lagoon-600 sm:text-[1.875rem]">
                    {labels.to} {journey.to}.
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Shell>
    </section>
  );
}

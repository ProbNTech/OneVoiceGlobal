import Image from "next/image";
import type { CSSProperties } from "react";
import {
  Building2,
  CalendarDays,
  GraduationCap,
  HandHeart,
  Handshake,
  House,
  Info,
  LibraryBig,
  MapPin,
  School,
  type LucideIcon,
} from "lucide-react";
import { cx } from "@/lib/cx";
import { communityOutreach, type OutreachIcon } from "@/data/community";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { logo } from "@/data/site";

const icons: Record<OutreachIcon, LucideIcon> = {
  centre: Building2,
  library: LibraryBig,
  faith: HandHeart,
  college: School,
  university: GraduationCap,
  housing: House,
  events: CalendarDays,
  venue: MapPin,
  partner: Handshake,
};

type Place = (typeof communityOutreach.places)[number];

/* How far each place steps out from the photograph on large screens, so the
   two columns follow the curve of the circle rather than standing straight:
   the middle of each column sits closest, its ends furthest away. */
const LEFT_ARC = ["-2.75rem", "-0.75rem", "0rem", "-0.75rem", "-2.75rem"];
const RIGHT_ARC = ["2rem", "0.25rem", "0.25rem", "2rem"];

/**
 * Community Outreach: OneVoice going out to where people already are. A
 * round photograph of volunteers out in the neighbourhood stands at the
 * centre, with a ring that draws itself round it and a dotted orbit turning
 * slowly beyond that; the nine places the brief names gather either side of
 * it along the curve, each an icon with its name beside it. The brief's
 * opening sentence is the statement under the title, and its closing one
 * sits beneath the circle.
 */
export function Outreach() {
  const { places } = communityOutreach;
  const split = Math.ceil(places.length / 2);

  return (
    <section
      id={communityOutreach.id}
      aria-labelledby="outreach-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal variant="fade" className="flex justify-center">
            <Kicker>{communityOutreach.kicker}</Kicker>
          </Reveal>
          <Title
            id="outreach-title"
            lead={communityOutreach.titleLead}
            accent={communityOutreach.titleAccent}
            className="mt-5"
          />
          <Reveal delay={150}>
            <p className="mt-5 font-display text-[clamp(1.375rem,1.9vw,1.75rem)] font-light italic leading-snug text-ink [font-variation-settings:'SOFT'_100]">
              {communityOutreach.statement}
            </p>
            <p className="mt-2 text-lead text-slate">{communityOutreach.lead}</p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-2 items-center gap-x-5 gap-y-8 lg:mt-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-14">
          <PlaceList places={places.slice(0, split)} arc={LEFT_ARC} side="left" offset={0} />
          <Circle />
          <PlaceList places={places.slice(split)} arc={RIGHT_ARC} side="right" offset={split} />
        </div>

        <Reveal delay={150} className="mt-8 flex justify-center lg:mt-10">
          <p className="flex max-w-3xl gap-3 rounded-card bg-white p-5 text-left text-[0.9375rem] leading-relaxed text-slate ring-1 ring-ink/5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-lagoon-600" strokeWidth={1.8} />
            {communityOutreach.closing}
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

/* The photograph, its drawn ring and the orbit. Phones set it across both
   columns, above the two lists. */
function Circle() {
  const { image } = communityOutreach;
  return (
    <Reveal
      variant="image"
      className="relative order-first col-span-2 mx-auto w-[min(72vw,20rem)] lg:order-0 lg:col-span-1 lg:w-[clamp(18rem,25vw,26rem)]"
    >
      {/* The orbit: a dotted circle with a dot in each of the logo's colours,
          turning once a minute. It stands still under reduced motion. */}
      <div aria-hidden="true" className="absolute -inset-[11%] animate-orbit motion-reduce:animate-none">
        <svg viewBox="0 0 100 100" className="h-full w-full text-ink/15">
          <circle
            cx="50"
            cy="50"
            r="49.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="1 5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {/* Three points on the circle, a third of a turn apart. */}
        <span className="absolute left-1/2 top-[0.5%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-600" />
        <span className="absolute left-[15.3%] top-[86%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lagoon-500" />
        <span className="absolute left-[84.7%] top-[86%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange" />
      </div>

      {/* The ring draws itself round the photograph as it arrives (.ring-draw). */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute -inset-[4.5%] h-[109%] w-[109%] -rotate-90 text-lagoon-600/50"
      >
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          pathLength={100}
          strokeDasharray="100"
          vectorEffect="non-scaling-stroke"
          className="ring-draw"
        />
      </svg>

      {/* The shadow is a filter on a wrapper: a box-shadow on the clip would
          be cut off at its square box and show in the corners. */}
      <div className="drop-shadow-[0_28px_32px_rgb(10_37_64/0.22)]">
        <div className="reveal-clip relative aspect-square overflow-hidden rounded-full bg-sand">
          <div className="reveal-media absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1760px) 420px, (min-width: 1024px) 25vw, 72vw"
              className="object-cover"
              style={{ objectPosition: image.position }}
            />
          </div>
        </div>
      </div>

      <span className="absolute bottom-[4%] right-[4%] grid h-14 w-14 place-items-center rounded-full bg-white shadow-[0_18px_36px_-18px_rgb(10_37_64/0.6)] sm:h-16 sm:w-16">
        <Image
          src={logo.mark.src}
          alt=""
          width={logo.mark.width}
          height={logo.mark.height}
          className="h-7 w-auto sm:h-8"
        />
      </span>
    </Reveal>
  );
}

function PlaceList({
  places,
  arc,
  side,
  offset,
}: {
  places: readonly Place[];
  arc: string[];
  side: "left" | "right";
  offset: number;
}) {
  return (
    <ul className="flex flex-col gap-y-4 self-start lg:gap-y-6 lg:self-center">
      {places.map((place, index) => {
        const Icon = icons[place.icon];
        return (
          <Reveal
            as="li"
            key={place.label}
            variant={side === "left" ? "left" : "right"}
            delay={(offset + index) * 70}
            className="block"
          >
            {/* The step along the curve sits on an inner wrapper: the reveal
                clears the transform of the element it watches. */}
            <span
              style={{ "--arc": arc[index] } as CSSProperties}
              className={cx(
                "group flex items-center gap-3 lg:translate-x-(--arc) lg:gap-4",
                side === "left" && "lg:flex-row-reverse lg:text-right",
              )}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-lagoon-600 shadow-[0_10px_24px_-14px_rgb(10_37_64/0.45)] ring-1 ring-ink/6 transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white lg:h-12 lg:w-12">
                <Icon className="h-4.5 w-4.5 lg:h-5 lg:w-5" strokeWidth={1.6} />
              </span>
              <span className="text-[0.875rem] font-semibold leading-snug text-ink lg:text-[1rem]">{place.label}</span>
            </span>
          </Reveal>
        );
      })}
    </ul>
  );
}

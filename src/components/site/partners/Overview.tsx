import Image from "next/image";
import type { CSSProperties } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  CalendarHeart,
  GraduationCap,
  HandCoins,
  Handshake,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { cx } from "@/lib/cx";
import { partnersOverview, type CollaborationIcon } from "@/data/partners";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<CollaborationIcon, LucideIcon> = {
  funding: HandCoins,
  expertise: GraduationCap,
  sponsorship: CalendarHeart,
  pathways: BriefcaseBusiness,
  projects: Handshake,
  knowledge: BookOpen,
  referrals: Waypoints,
};

/* The disc before each area, cycling through the logo's colours; the amber
   one takes a dark icon, as white on amber would be too faint. */
const DISCS = ["bg-ocean-600 text-white", "bg-lagoon-600 text-white", "bg-saffron-500 text-ink"];

/* Every other area is set in the italic accent of the site's titles, in
   turn in each of the logo's colours. */
const ACCENTS = ["text-lagoon-600", "text-ocean-600", "text-saffron-ink"];

/**
 * Our Partnerships: the Foundation's own introduction to its partnerships,
 * then the seven areas of collaboration it names, run together as one
 * statement in the display face, the way the brief's title puts it:
 * collective action. Each area opens on a disc with its icon, every other
 * one is set in the italic accent, and small photographs sit in the line
 * between them like words. As the statement arrives its areas light up one
 * after another (`[data-reveal="phrases"]` in site.css).
 */
export function Overview() {
  return (
    <section
      id={partnersOverview.id}
      aria-labelledby="overview-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{partnersOverview.kicker}</Kicker>
            </Reveal>
            <Title
              id="overview-title"
              lead={partnersOverview.titleLead}
              accent={partnersOverview.titleAccent}
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:pb-2">
            <p className="text-lead text-ink">{partnersOverview.paragraphs[0]}</p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate">{partnersOverview.paragraphs[1]}</p>
          </Reveal>
        </div>

        <div className="mt-10 lg:mt-14">
          <Reveal variant="fade">
            <p
              id="collaboration-label"
              className="text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
            >
              {partnersOverview.listLabel}
            </p>
          </Reveal>
          <Reveal variant="phrases" delay={120} className="mt-5">
            <ul
              aria-labelledby="collaboration-label"
              className="max-w-[88rem] font-display text-statement text-ink [font-variation-settings:'SOFT'_100]"
            >
              {partnersOverview.areas.map((area, index) => {
                const Icon = icons[area.icon];
                const image = "image" in area ? area.image : undefined;
                /* The disc keeps to the area's first word and the picture to
                   its last, so neither is left alone at the end of a line. */
                const [first, ...rest] = area.text.split(" ");
                const last = rest.pop();
                return (
                  <li key={area.text} className="phrase inline" style={{ "--i": index } as CSSProperties}>
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
                      {rest.join(" ")}{" "}
                      <span className="whitespace-nowrap">
                        {last}
                        {image ? (
                          /* A picture in the line, not content of its own:
                             the list reads the same without it. */
                          <span
                            aria-hidden="true"
                            className="relative ml-[0.35em] inline-block h-[1em] w-[2.5em] overflow-hidden rounded-full bg-sand align-[-0.14em] shadow-[0_12px_24px_-14px_rgb(10_37_64/0.6)]"
                          >
                            <Image
                              src={image.src}
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 150px, 100px"
                              className="object-cover transition-[scale] duration-1000 ease-out-soft hover:scale-110"
                              style={{ objectPosition: image.position }}
                            />
                          </span>
                        ) : null}
                      </span>
                    </span>{" "}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

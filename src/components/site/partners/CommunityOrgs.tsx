import Image from "next/image";
import type { CSSProperties } from "react";
import {
  ArrowRightLeft,
  CalendarDays,
  Combine,
  GraduationCap,
  Megaphone,
  Presentation,
  SearchCheck,
  Signpost,
  type LucideIcon,
} from "lucide-react";
import { cx } from "@/lib/cx";
import { partnersCommunity, type OpportunityIcon } from "@/data/partners";
import { Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<OpportunityIcon, LucideIcon> = {
  referrals: ArrowRightLeft,
  joint: Combine,
  outreach: Megaphone,
  events: CalendarDays,
  training: GraduationCap,
  sessions: Presentation,
  pathways: Signpost,
  research: SearchCheck,
};

/* The three words take the three colours of the logo's figures, in the
   order they sit around the mark. */
const WORD_TONES = ["text-ink", "font-light italic text-lagoon-600", "font-light italic text-ocean-600"];

/**
 * Community Organisations: the brief's three-word heading as a triad, each
 * word rising out of its own mask in one of the logo's colours, beside a
 * photograph of a community meeting cut with a leaf corner. Under the
 * brief's line, the eight partnership opportunities as an icon list, two to
 * a row.
 */
export function CommunityOrgs() {
  const { image } = partnersCommunity;

  return (
    <section
      id={partnersCommunity.id}
      aria-labelledby="community-orgs-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="relative w-full lg:col-span-5 lg:max-w-[34rem]">
            <Reveal variant="image">
              {/* The shadow is a filter on a wrapper: a box-shadow on the
                  clip would be cut off at its square box. */}
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[5/4] overflow-hidden rounded-[2rem_2rem_2rem_8rem] bg-cream">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1760px) 544px, (min-width: 1024px) 38vw, 92vw"
                        className="object-cover"
                        style={{ objectPosition: image.position }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{partnersCommunity.kicker}</Kicker>
            </Reveal>
            <Reveal
              as="h2"
              id="community-orgs-title"
              variant="lines"
              className="mt-5 font-display text-title font-normal text-ink [font-variation-settings:'SOFT'_100]"
            >
              {partnersCommunity.title.map((word, index) => (
                <span key={word}>
                  {index > 0 ? " " : null}
                  <span className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <span
                      className={cx("line-inner block", WORD_TONES[index])}
                      style={{ "--line": index } as CSSProperties}
                    >
                      {word}
                    </span>
                  </span>
                </span>
              ))}
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 max-w-2xl text-lead text-slate">{partnersCommunity.lead}</p>
              <p className="mt-7 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-saffron-ink">
                {partnersCommunity.listLabel}
              </p>
            </Reveal>

            <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:gap-y-5">
              {partnersCommunity.items.map((item, index) => {
                const Icon = icons[item.icon];
                return (
                  <Reveal
                    as="li"
                    key={item.label}
                    variant="up"
                    delay={200 + index * 60}
                    className="group flex items-center gap-4"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-lagoon-600 shadow-[0_10px_24px_-14px_rgb(10_37_64/0.45)] transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-[1rem] font-semibold leading-snug text-ink">{item.label}</span>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </Shell>
    </section>
  );
}

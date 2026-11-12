import { BadgeCheck, Landmark } from "lucide-react";
import { cx } from "@/lib/cx";
import { refugeeSponsorship } from "@/data/refugee-support";
import { AreaKicker } from "../our-work/AreaKicker";
import { Photo } from "../ui/Photo";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* Each step rises a little above the last on wide screens, so the seven read
   as a path that climbs from arrival to independence. Written out in full
   so Tailwind can see each class. */
const RISE = [
  "xl:pt-[7.5rem]",
  "xl:pt-[6.25rem]",
  "xl:pt-[5rem]",
  "xl:pt-[3.75rem]",
  "xl:pt-[2.5rem]",
  "xl:pt-[1.25rem]",
  "xl:pt-0",
];

/* And each step's number warms from the logo's teal through its blue to
   orange, like first light. */
const TONES = [
  "bg-lagoon-700 text-white",
  "bg-lagoon-600 text-white",
  "bg-lagoon-500 text-white",
  "bg-ocean-600 text-white",
  "bg-ocean-500 text-white",
  "bg-orange-light text-ink",
  "bg-orange text-white",
];

/**
 * 2. Refugee Community Sponsorship, on navy: the programme's place among the
 * three and its name, its subtitle as the heading, its aspiration and
 * belief, and its condition on approvals as a quieter note, beside a tall
 * photograph of a welcome at a front door under an arched top with a round
 * photograph of a school's front office set into its lower left. Beneath,
 * its seven proposed activities, which run from arrival to independence, as
 * a path of numbered steps that climbs from left to right on wide screens
 * (two or one to a row on smaller ones), with nothing behind or between
 * them. The programme's line on who it will work with closes the band.
 */
export function Sponsorship() {
  const { items, images } = refugeeSponsorship;

  return (
    <section
      id={refugeeSponsorship.id}
      aria-labelledby="sponsorship-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-navy-950 py-band text-white"
    >
      {/* Soft light in the logo's colours. */}
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-lagoon-600/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 right-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-orange-soft opacity-30 blur-[120px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-12 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <AreaKicker number={refugeeSponsorship.number} name={refugeeSponsorship.kicker} tone="dark" />
            </Reveal>
            <Title
              id="sponsorship-title"
              lead={refugeeSponsorship.titleLead}
              accent={refugeeSponsorship.titleAccent}
              tone="dark"
              accentTone="saffron"
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lead text-white/90">{refugeeSponsorship.lead}</p>
              <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-white/70">{refugeeSponsorship.paragraph}</p>
              <p className="mt-6 flex max-w-2xl items-start gap-3.5 text-[0.9375rem] leading-relaxed text-white/80">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/8 text-lagoon-300 ring-1 ring-white/12">
                  <BadgeCheck aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.7} />
                </span>
                <span className="pt-1">{refugeeSponsorship.note}</span>
              </p>
            </Reveal>
          </div>

          {/* Photographs. The padding at the foot is the room the round one
              hangs into. */}
          <div className="relative mx-auto w-full max-w-md pb-16 lg:col-span-5 lg:max-w-none">
            <Reveal variant="image" className="ml-auto w-[80%]">
              <div className="drop-shadow-[0_30px_40px_rgb(0_0_0/0.35)]">
                <div className="reveal-clip relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-navy-900">
                  <div className="reveal-media absolute inset-0">
                    <Photo image={images.main} sizes="(min-width: 1760px) 520px, (min-width: 1024px) 30vw, 360px" />
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal variant="image" delay={260} className="absolute bottom-0 left-0 w-[44%]">
              {/* The navy ring is padding, not a ring: a ring is a box-shadow,
                  which the clip would cut away. */}
              <div className="rounded-full bg-navy-950 p-2 sm:p-2.5">
                <div className="reveal-clip relative aspect-square overflow-hidden rounded-full bg-navy-900">
                  <div className="reveal-media absolute inset-0">
                    <Photo image={images.circle} sizes="(min-width: 1760px) 290px, (min-width: 1024px) 17vw, 200px" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* The path from arrival to independence. */}
        <Reveal variant="fade" className="mt-12 lg:mt-14">
          <h3 id="sponsorship-activities" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange">
            {refugeeSponsorship.listLabel}
          </h3>
        </Reveal>
        <ol
          aria-labelledby="sponsorship-activities"
          className="mt-7 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
        >
          {items.map((item, index) => (
            <Reveal as="li" key={item.name} delay={index * 90} className={RISE[index]}>
              <span
                aria-hidden="true"
                className={cx(
                  "grid h-11 w-11 place-items-center rounded-full font-display text-[1.125rem] tabular-nums [font-variation-settings:'SOFT'_100]",
                  TONES[index],
                )}
              >
                {index + 1}
              </span>
              <h4 className="mt-4 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-white">{item.name}</h4>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">{item.line}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12 lg:mt-14">
          <p className="flex max-w-4xl items-start gap-4 text-[1rem] leading-relaxed text-white/80">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/8 icon-orange ring-1 ring-white/12">
              <Landmark aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.7} />
            </span>
            <span className="pt-1.5">{refugeeSponsorship.closing}</span>
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

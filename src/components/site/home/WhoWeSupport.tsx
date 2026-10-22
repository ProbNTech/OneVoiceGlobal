import Image from "next/image";
import type { CSSProperties } from "react";
import { Info } from "lucide-react";
import { cx } from "@/lib/cx";
import { homeWhoWeSupport } from "@/data/home";
import { Kicker, Shell, Title } from "../ui/primitives";
import { GlideTrack } from "../ui/GlideTrack";
import { Reveal } from "../ui/Reveal";

type Group = (typeof homeWhoWeSupport.groups)[number];

/* Card silhouettes, alternating along each row: an arch and a leaf. Only
   the top corners are shaped; the bottom ones stay small so the group's
   name across the foot is never clipped. */
const shapes = ["rounded-t-[999px] rounded-b-[1.75rem]", "rounded-[1.75rem_7rem_1.75rem_1.75rem]"];

/**
 * OneVoice is for Everyone: the ten groups the brief names, as portrait
 * cards drifting past in two rows that run in opposite directions. Rows
 * glide to a stop under the pointer; with reduced motion they stand still and scroll
 * by hand instead.
 */
export function WhoWeSupport() {
  const groups = homeWhoWeSupport.groups;
  const half = Math.ceil(groups.length / 2);

  return (
    <section aria-labelledby="support-title" className="relative isolate overflow-clip bg-cream py-band">
      <Shell>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{homeWhoWeSupport.kicker}</Kicker>
            </Reveal>
            <Title
              id="support-title"
              lead={homeWhoWeSupport.titleLead}
              accent={homeWhoWeSupport.titleAccent}
              accentTone="ocean"
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 text-lead text-slate">{homeWhoWeSupport.lead}</p>
            </Reveal>
          </div>
          <Reveal delay={200} className="lg:col-span-5 lg:pb-2">
            <p className="flex gap-3 rounded-[1.25rem] bg-white p-5 text-[0.9375rem] leading-relaxed text-slate ring-1 ring-ink/5">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-lagoon-600" strokeWidth={1.8} />
              {homeWhoWeSupport.note}
            </p>
          </Reveal>
        </div>
      </Shell>

      <Reveal variant="fade" delay={150} className="mt-8 space-y-6 lg:mt-10">
        <Row groups={groups.slice(0, half)} offset={0} />
        <Row groups={groups.slice(half)} offset={1} reverse />
      </Reveal>
    </section>
  );
}

function Row({ groups, offset, reverse = false }: { groups: readonly Group[]; offset: number; reverse?: boolean }) {
  return (
    <div className="mask-fade-x overflow-hidden motion-reduce:overflow-x-auto">
      <GlideTrack
        className={cx("flex w-max", reverse ? "animate-marquee-reverse" : "animate-marquee")}
        style={{ "--marquee-duration": "64s" } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 gap-6 pr-6">
            {/* Each list repeats its groups so one copy is wider than any screen. */}
            {[...groups, ...groups].map((group, index) => (
              <Card
                key={`${group.label}-${index}`}
                group={group}
                shape={shapes[(index + offset) % shapes.length]!}
                hidden={index >= groups.length || copy === 1}
              />
            ))}
          </ul>
        ))}
      </GlideTrack>
    </div>
  );
}

function Card({ group, shape, hidden }: { group: Group; shape: string; hidden: boolean }) {
  return (
    <li aria-hidden={hidden || undefined} className="group w-[14rem] shrink-0 sm:w-[16.5rem]">
      <div className={cx("relative aspect-[3/4] overflow-hidden bg-sand", shape)}>
        <Image
          src={group.image.src}
          alt={hidden ? "" : group.image.alt}
          fill
          sizes="(min-width: 640px) 16.5rem, 14rem"
          className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.07]"
          style={{ objectPosition: group.image.position }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-navy-950/55 to-transparent" />
        <p className="absolute inset-x-5 bottom-5 font-display text-[1.375rem] leading-tight text-white [font-variation-settings:'SOFT'_100]">
          {group.label}
        </p>
      </div>
    </li>
  );
}

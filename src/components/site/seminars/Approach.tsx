import { BadgeCheck, BookOpen, Compass, Handshake, ShieldCheck, type LucideIcon } from "lucide-react";
import { cx } from "@/lib/cx";
import { seminarsApproach, type PrincipleIcon } from "@/data/seminars";
import { Photo } from "../ui/Photo";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<PrincipleIcon, LucideIcon> = {
  knowledge: BookOpen,
  independence: Compass,
  safety: ShieldCheck,
  partnerships: Handshake,
  trust: BadgeCheck,
};

/* The icon circles take the logo's three colours in turn. */
const circles = ["bg-ocean-600 text-white", "bg-lagoon-600 text-white", "bg-orange text-white"];

/**
 * Our Approach: the overview's subtitle as the heading across the band, then
 * a photograph cut with a leaf corner, with the first line of the overview's
 * Our Commitment on a white card across its foot, beside the belief the
 * approach starts from and its five principles. Each principle's name is
 * set in two tones like the titles ("Knowledge" upright, "Without Barriers"
 * in italic teal) beside an icon circle in one of the logo's colours, with
 * the brief's line beneath; nothing is drawn behind or between them.
 */
export function Approach() {
  const { principles, commitment, image } = seminarsApproach;

  return (
    <section
      id={seminarsApproach.id}
      aria-labelledby="approach-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <Reveal variant="fade">
          <Kicker>{seminarsApproach.kicker}</Kicker>
        </Reveal>
        <Title
          id="approach-title"
          lead={seminarsApproach.titleLead}
          accent={seminarsApproach.titleAccent}
          inline
          className="mt-5 max-w-6xl"
        />

        <div className="mt-8 grid grid-cols-1 gap-x-14 gap-y-12 lg:mt-10 lg:grid-cols-12 xl:gap-x-20">
          {/* The photograph, with the commitment hanging off its foot. */}
          <div className="relative order-2 pb-16 lg:order-1 lg:col-span-5 lg:pb-14">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[7rem_2rem_2rem_2rem] bg-sand lg:max-w-none">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Photo image={image} sizes="(min-width: 1920px) 700px, (min-width: 1024px) 38vw, 448px" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal
              variant="up"
              delay={260}
              className="absolute inset-x-4 bottom-0 mx-auto max-w-sm sm:inset-x-8 lg:left-8 lg:right-auto lg:max-w-[24rem]"
            >
              <div className="rounded-card bg-white p-6 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">
                  {commitment.label}
                </p>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink">{commitment.text}</p>
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7 lg:self-center">
            <Reveal delay={100}>
              <p className="max-w-2xl text-lead text-ink">{seminarsApproach.belief}</p>
            </Reveal>
            <ul className="mt-8 space-y-7 lg:mt-10">
              {principles.map((principle, index) => {
                const Icon = icons[principle.icon];
                return (
                  <Reveal as="li" key={principle.lead} delay={index * 80} className="group flex items-start gap-5">
                    <span
                      className={cx(
                        "grid h-12 w-12 shrink-0 place-items-center rounded-full transition-transform duration-700 ease-out-soft group-hover:-translate-y-1 group-hover:rotate-[-8deg]",
                        circles[index % circles.length],
                      )}
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="font-display text-[1.5rem] leading-tight text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.75rem]">
                        {principle.lead} <em className="font-light text-lagoon-600">{principle.accent}</em>
                      </h3>
                      <p className="mt-2 max-w-2xl text-[1rem] leading-relaxed text-slate">{principle.line}</p>
                    </div>
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

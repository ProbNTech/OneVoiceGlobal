import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { communityNetwork } from "@/data/community";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Community & Business Network: the eight groups the brief says the network
 * brings together, as a staggered wall of portrait photographs (after CWEF's
 * "One Network. Global Opportunities."), every second column set lower, each
 * named and numbered across its foot. The brief's objective runs beside the
 * introduction as a chain of four words.
 */
export function Network() {
  const { groups, objective } = communityNetwork;

  return (
    <section
      id={communityNetwork.id}
      aria-labelledby="network-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <Kicker>{communityNetwork.kicker}</Kicker>
            </Reveal>
            <Title
              id="network-title"
              lead={communityNetwork.titleLead}
              accent={communityNetwork.titleAccent}
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-6 lg:pb-2">
            <p className="text-lead text-slate">{communityNetwork.lead}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.22em] text-saffron-ink">
                {objective.label}
              </span>
              <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {objective.steps.map((step, index) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="font-display text-[1.375rem] text-ink [font-variation-settings:'SOFT'_100]">
                      {step}
                    </span>
                    {index < objective.steps.length - 1 ? (
                      <ArrowRight aria-hidden="true" className="h-4 w-4 text-saffron-500" strokeWidth={2} />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* The lower columns hang into the padding at the foot of the grid. */}
        <ul className="mt-8 grid grid-cols-2 gap-3 pb-8 sm:gap-4 lg:mt-10 lg:grid-cols-4 lg:gap-5 lg:pb-14">
          {groups.map((group, index) => (
            <li key={group.label} className={cx(index % 2 === 1 && "translate-y-8 lg:translate-y-14")}>
              <Reveal variant="rise" delay={(index % 4) * 90}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-card bg-navy-900 shadow-[0_30px_60px_-40px_rgb(10_37_64/0.55)]">
                  <Image
                    src={group.image.src}
                    alt={group.image.alt}
                    fill
                    sizes="(min-width: 1920px) 440px, (min-width: 1024px) 23vw, 48vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.07]"
                    style={{ objectPosition: group.image.position }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-navy-950/85 via-navy-950/30 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                    <span
                      aria-hidden="true"
                      className="font-display text-[0.875rem] tabular-nums text-saffron-300 [font-variation-settings:'SOFT'_100]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 font-display text-[1.25rem] leading-tight text-white [font-variation-settings:'SOFT'_100] sm:text-[1.625rem]">
                      {group.label}
                    </h3>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

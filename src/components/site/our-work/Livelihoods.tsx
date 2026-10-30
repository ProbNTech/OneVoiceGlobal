import { BriefcaseBusiness, Network, PiggyBank, Presentation, UsersRound, type LucideIcon } from "lucide-react";
import { ourWorkLivelihoods, type LivelihoodIcon } from "@/data/our-work";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { AreaKicker } from "./AreaKicker";

const icons: Record<LivelihoodIcon, LucideIcon> = {
  employment: BriefcaseBusiness,
  workshops: Presentation,
  mentoring: UsersRound,
  finance: PiggyBank,
  connections: Network,
};

/**
 * 2. Livelihoods, Employment and Entrepreneurship, centred: the area's
 * opening sentence as the heading, its lead, and the five pathways it names,
 * in the ELA "Our Process" style the home page's journey uses: a filled
 * teal circle with its icon and a ring that draws itself round it, then the
 * brief's line. Nothing is drawn between them. The area's closing promise
 * sits beneath.
 */
export function Livelihoods() {
  return (
    <section
      id={ourWorkLivelihoods.id}
      aria-labelledby="livelihoods-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="mx-auto max-w-5xl text-center">
          <Reveal variant="fade" className="flex justify-center">
            <AreaKicker number={ourWorkLivelihoods.number} name={ourWorkLivelihoods.kicker} />
          </Reveal>
          <Title
            id="livelihoods-title"
            lead={ourWorkLivelihoods.titleLead}
            accent={ourWorkLivelihoods.titleAccent}
            size="statement"
            className="mt-5"
          />
          <Reveal delay={120}>
            <p id="livelihoods-lead" className="mx-auto mt-5 max-w-2xl text-lead text-slate">
              {ourWorkLivelihoods.lead}
            </p>
          </Reveal>
        </div>

        <ol
          aria-labelledby="livelihoods-lead"
          className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5"
        >
          {ourWorkLivelihoods.items.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.text} delay={index * 90} className="group text-center">
                <span
                  aria-hidden="true"
                  className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-lagoon-600 text-white shadow-[0_18px_36px_-18px_rgb(14_122_118/0.8)] transition-[translate,background-color] duration-700 ease-out-soft group-hover:-translate-y-1.5 group-hover:bg-ink"
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute -inset-2.5 h-[calc(100%+1.25rem)] w-[calc(100%+1.25rem)] -rotate-90 text-lagoon-600/45"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      pathLength={100}
                      strokeDasharray="100"
                      vectorEffect="non-scaling-stroke"
                      className="ring-draw"
                    />
                  </svg>
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <p className="mx-auto mt-6 max-w-[15rem] text-[0.9375rem] font-medium leading-relaxed text-ink">
                  {item.text}
                </p>
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={200}>
          <p className="mx-auto mt-10 max-w-3xl text-center font-display text-[1.25rem] font-light italic leading-snug text-ocean-600 [font-variation-settings:'SOFT'_100] sm:text-[1.5rem] lg:mt-12">
            {ourWorkLivelihoods.closing}
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

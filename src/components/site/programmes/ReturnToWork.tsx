import {
  BriefcaseBusiness,
  ClipboardCheck,
  FileText,
  Laptop,
  MessagesSquare,
  Search,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { programmesReturn, type PathwayIcon } from "@/data/programmes-page";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";

const icons: Record<PathwayIcon, LucideIcon> = {
  review: ClipboardCheck,
  cv: FileText,
  digital: Laptop,
  search: Search,
  interview: MessagesSquare,
  employment: BriefcaseBusiness,
  progression: TrendingUp,
};

/**
 * Return to Work, in ELA's "Our Process" style (as the home page's
 * journey), centred: the brief's heading and line, the seven career breaks
 * it names as running text, then its pathway from Skills Review to
 * Progression, each step a filled teal circle with its icon and a ring that
 * draws itself round it as it arrives (`.ring-draw`), its number and its
 * name in spaced capitals. Nothing is drawn between the steps.
 */
export function ReturnToWork() {
  return (
    <section
      id={programmesReturn.id}
      aria-labelledby="return-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="text-center">
          <Reveal variant="fade" className="flex justify-center">
            <Kicker>{programmesReturn.kicker}</Kicker>
          </Reveal>
          <Title
            id="return-title"
            lead={programmesReturn.titleLead}
            accent={programmesReturn.titleAccent}
            inline
            className="mt-5"
          />
          <Reveal delay={120}>
            <p id="return-reasons" className="mx-auto mt-6 max-w-2xl text-lead text-slate">
              {programmesReturn.lead}
            </p>
            <RunList
              items={programmesReturn.reasons}
              labelledBy="return-reasons"
              dot="bg-saffron-500"
              className="mx-auto mt-3 max-w-3xl text-[1.0625rem] leading-[1.9] text-ink"
            />
          </Reveal>
        </div>

        <Reveal variant="fade" delay={80} className="mt-10 flex justify-center lg:mt-12">
          <p id="return-pathway" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink">
            {programmesReturn.pathwayLabel}
          </p>
        </Reveal>
        <ol
          aria-labelledby="return-pathway"
          className="mx-auto mt-7 flex max-w-7xl flex-wrap justify-center gap-x-4 gap-y-10 lg:flex-nowrap lg:justify-between"
        >
          {programmesReturn.pathway.map((step, index) => {
            const Icon = icons[step.icon];
            return (
              <Reveal
                as="li"
                key={step.label}
                variant="up"
                delay={index * 90}
                className="group w-[6.5rem] text-center sm:w-[9.5rem] lg:w-auto lg:flex-1"
              >
                <span
                  aria-hidden="true"
                  className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-lagoon-600 text-white shadow-[0_18px_36px_-18px_rgb(14_122_118/0.8)] transition-[translate,background-color] duration-700 ease-out-soft group-hover:-translate-y-1.5 group-hover:bg-ink"
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute -inset-2.5 h-[calc(100%+1.25rem)] w-[calc(100%+1.25rem)] -rotate-90 text-lagoon-600/45 transition-transform duration-700 ease-out-soft group-hover:scale-110"
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
                <p className="mt-6 text-[0.875rem] font-bold tabular-nums tracking-[0.22em] text-saffron-ink">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mx-auto mt-2.5 max-w-[10rem] text-[0.875rem] font-bold uppercase leading-snug tracking-[0.14em] text-ink">
                  {step.label}
                </h3>
              </Reveal>
            );
          })}
        </ol>
      </Shell>
    </section>
  );
}

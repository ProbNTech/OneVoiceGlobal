import { ClipboardCheck, GraduationCap, MessagesSquare, Route, Send, TrendingUp, type LucideIcon } from "lucide-react";
import { getInvolvedProcess, type StepIcon } from "@/data/get-involved";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<StepIcon, LucideIcon> = {
  refer: Send,
  conversation: MessagesSquare,
  assessment: ClipboardCheck,
  plan: Route,
  programme: GraduationCap,
  review: TrendingUp,
};

/**
 * Referral Process, in ELA's "Our Process" style (as the home page's
 * journey): a centred title, then the brief's six steps in a row, each a
 * filled teal circle with its icon and a ring that draws itself round it as
 * it arrives (`.ring-draw`), its number and its name in spaced capitals.
 * Nothing is drawn between the steps. The brief's [Get Support] call
 * follows.
 */
export function Process() {
  const { steps } = getInvolvedProcess;

  return (
    <section
      id={getInvolvedProcess.id}
      aria-labelledby="process-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="text-center">
          <Reveal variant="fade" className="flex justify-center">
            <Kicker>{getInvolvedProcess.kicker}</Kicker>
          </Reveal>
          <Title
            id="process-title"
            lead={getInvolvedProcess.titleLead}
            accent={getInvolvedProcess.titleAccent}
            inline
            className="mt-5"
          />
        </div>

        <ol className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:mt-12 lg:grid-cols-6">
          {steps.map((step, index) => {
            const Icon = icons[step.icon];
            return (
              <Reveal as="li" key={step.label} variant="up" delay={(index % 6) * 100} className="group text-center">
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
                <p className="mt-6 text-[0.875rem] font-bold tabular-nums tracking-[0.22em] text-orange-ink">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mx-auto mt-2.5 max-w-[11rem] text-[0.875rem] font-bold uppercase leading-snug tracking-[0.14em] text-ink">
                  {step.label}
                </h3>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-10 flex justify-center lg:mt-12">
          <Cta href={getInvolvedProcess.cta.href}>{getInvolvedProcess.cta.label}</Cta>
        </Reveal>
      </Shell>
    </section>
  );
}

import type { CSSProperties } from "react";
import { ShieldCheck, TriangleAlert } from "lucide-react";
import { seminarsSigns } from "@/data/seminars";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * The "10 Signs" of Healthy Relationships, Healthy Relationships' third
 * programme area in full, on cream. The ten signs stand five to a row, each
 * a number in a ring whose amber arc runs a tenth further round than the
 * last, so the tenth closes the circle; the arcs draw themselves as the
 * signs arrive (`.arc-draw` in site.css). Each sign's name is set in the
 * display face with the brief's line beneath, with nothing behind them. The
 * brief's note on warning signs and its line on when safety comes first
 * close the section, each beside an icon circle.
 */
export function TenSigns() {
  const { signs } = seminarsSigns;

  return (
    <section
      id={seminarsSigns.id}
      aria-labelledby="signs-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 gap-x-14 gap-y-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{seminarsSigns.kicker}</Kicker>
            </Reveal>
            <Title
              id="signs-title"
              lead={seminarsSigns.titleLead}
              accent={seminarsSigns.titleAccent}
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:pb-2">
            <p className="text-lead text-slate">{seminarsSigns.lead}</p>
          </Reveal>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:mt-12 xl:grid-cols-5 xl:gap-x-7">
          {signs.map((sign, index) => {
            const arc = (index + 1) * 10;
            return (
              <Reveal as="li" key={sign.name} delay={(index % 5) * 90} className="group flex gap-5 xl:block">
                <span className="relative grid h-16 w-16 shrink-0 place-items-center">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    className="absolute inset-0 h-full w-full -rotate-90 transition-transform duration-700 ease-out-soft group-hover:scale-110"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-ink/10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      pathLength={100}
                      strokeDasharray={`${arc} 100`}
                      className="arc-draw text-saffron-500"
                      style={{ "--arc": arc } as CSSProperties}
                    />
                  </svg>
                  <span className="font-display text-[1.375rem] italic font-light tabular-nums text-ink [font-variation-settings:'SOFT'_100]">
                    {index + 1}
                  </span>
                </span>
                <div className="min-w-0 xl:mt-5">
                  <h3 className="font-display text-[1.25rem] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
                    {sign.name}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{sign.line}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-14">
          <Reveal className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-saffron-500 text-ink">
              <TriangleAlert aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <p className="max-w-2xl text-[1rem] leading-relaxed text-ink">{seminarsSigns.warning}</p>
          </Reveal>
          <Reveal delay={120} className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white">
              <ShieldCheck aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <p className="max-w-2xl text-[1rem] leading-relaxed text-ink">{seminarsSigns.safety}</p>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

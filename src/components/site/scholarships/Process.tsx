import { Check, Info, ShieldCheck } from "lucide-react";
import { scholarshipsProcess } from "@/data/scholarships";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Our Application & Selection Process, on white: the six steps three to a
 * row, each under its number set large in the orange gradient, with the
 * step's name in the display face and the document's line beneath (the
 * supporting documents of step 2 as a short list). Nothing is drawn between
 * them. Beneath, the document's Commitment to Fairness & Transparency: its
 * heading, its line and its note on the left, and on the right what it
 * aims to ensure, as a checklist two to a row.
 */
export function Process() {
  const { steps, fairness } = scholarshipsProcess;

  return (
    <section
      id={scholarshipsProcess.id}
      aria-labelledby="process-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{scholarshipsProcess.kicker}</Kicker>
            </Reveal>
            <Title
              id="process-title"
              lead={scholarshipsProcess.titleLead}
              accent={scholarshipsProcess.titleAccent}
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:pb-2">
            <p className="text-lead text-slate">{scholarshipsProcess.lead}</p>
          </Reveal>
        </div>

        <ol className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 xl:gap-x-16">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={(index % 3) * 100} className="group">
              <p className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="font-display text-[3.25rem] font-light leading-none tabular-nums text-orange [font-variation-settings:'SOFT'_100]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-ink-muted">
                  {scholarshipsProcess.stepLabel} {index + 1}
                </span>
              </p>
              <h3 className="mt-3 font-display text-[1.5rem] leading-snug text-ink transition-colors duration-500 [font-variation-settings:'SOFT'_100] group-hover:text-lagoon-600">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{step.text}</p>
              {step.items ? (
                <ul className="mt-2.5 space-y-1.5">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink">
                      <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          ))}
        </ol>

        {/* 7. Our Commitment to Fairness & Transparency */}
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-lagoon-600 text-white">
              <ShieldCheck aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <h3
              id="fairness-title"
              className="mt-5 font-display text-[1.875rem] leading-[1.15] text-ink [font-variation-settings:'SOFT'_100] sm:text-[2.25rem]"
            >
              {fairness.title}
            </h3>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate">{fairness.lead}</p>
            <p className="mt-5 flex items-start gap-3 text-[0.875rem] leading-relaxed text-ink-muted">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-lagoon-600" strokeWidth={1.8} />
              {fairness.note}
            </p>
          </Reveal>
          <div className="lg:col-span-7 lg:pt-2">
            <Reveal variant="fade">
              <p id="fairness-list" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">
                {fairness.listLabel}
              </p>
            </Reveal>
            <ul aria-labelledby="fairness-list" className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {fairness.items.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={100 + index * 60}
                  className="flex items-start gap-3 text-[1rem] leading-snug text-ink"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-orange text-white">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </span>
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Shell>
    </section>
  );
}

import { Fragment } from "react";
import { Route } from "lucide-react";
import { cx } from "@/lib/cx";
import { aboutCentre } from "@/data/about";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { WhatWeDo } from "./WhatWeDo";

/**
 * The Skill Development Centre, the Foundation's delivery arm: its belief
 * ("Everyone Has Potential") with its opening line and its approach in five
 * words on the left, and on the right the twelve barriers the brief names,
 * run together in the display face with every other one in italic teal, and
 * the Centre's role beneath them. What We Do follows as a row of the
 * brief's ten services with their photographs.
 */
export function Centre() {
  const { barriers } = aboutCentre;

  return (
    <section
      id={aboutCentre.id}
      aria-labelledby="centre-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12 lg:items-start xl:gap-x-20">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Kicker>{aboutCentre.kicker}</Kicker>
            </Reveal>
            <Title
              id="centre-title"
              lead={aboutCentre.titleLead}
              accent={aboutCentre.titleAccent}
              inline
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 text-lead text-slate">{aboutCentre.lead}</p>
              <p className="mt-6 text-[0.8125rem] font-bold uppercase tracking-[0.18em] text-saffron-ink">
                {aboutCentre.motto}
              </p>
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:col-span-7 lg:pt-12">
            <p id="barriers-lead" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-ink-muted">
              {aboutCentre.barriersLead}
            </p>
            <ul
              aria-labelledby="barriers-lead"
              className="mt-4 font-display text-[1.375rem] leading-[1.55] text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.75rem]"
            >
              {barriers.map((barrier, index) => (
                /* The space after each barrier sits outside it: it is where a
                   line may break, so a dot never starts a line. Phones are
                   too narrow for the longest barrier, so there they wrap. */
                <Fragment key={barrier}>
                  <li
                    className={cx(
                      "inline lg:whitespace-nowrap",
                      index % 2 === 1 && "font-light italic text-lagoon-600",
                    )}
                  >
                    {barrier}
                    {index < barriers.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="ml-[0.45em] mr-[0.2em] inline-block h-[0.22em] w-[0.22em] rounded-full bg-saffron-500 align-middle"
                      />
                    ) : null}
                  </li>{" "}
                </Fragment>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-4 text-[1.0625rem] font-semibold leading-relaxed text-ink">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-saffron-500 text-navy-950">
                <Route aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <span className="pt-2">{aboutCentre.role}</span>
            </p>
          </Reveal>
        </div>

        <WhatWeDo />
      </Shell>
    </section>
  );
}

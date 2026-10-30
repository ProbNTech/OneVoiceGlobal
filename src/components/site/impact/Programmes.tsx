import Link from "next/link";
import { ArrowUpRight, Lock, RefreshCw } from "lucide-react";
import { cx } from "@/lib/cx";
import { impactProgrammes } from "@/data/impact";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* Each programme's list is dotted in its own colour from the logo, as on
   the Seminars & Workshops page. */
const DOTS = ["bg-lagoon-500", "bg-ocean-600", "bg-saffron-500"];

/**
 * Measuring Our Impact: the potential indicators the three Seminars &
 * Workshops programmes name, in three plain columns on white. Each column
 * opens with the programme's name in the display face, a link to its place
 * on the Seminars & Workshops page, then its indicators, each led by a dot
 * in the programme's colour, with nothing behind them. The brief's lines on
 * protecting participants' privacy and on what findings are for close the
 * section, each beside an icon circle.
 */
export function Programmes() {
  return (
    <section
      id={impactProgrammes.id}
      aria-labelledby="programmes-measures-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <Kicker>{impactProgrammes.kicker}</Kicker>
            </Reveal>
            <Title
              id="programmes-measures-title"
              lead={impactProgrammes.titleLead}
              accent={impactProgrammes.titleAccent}
              inline
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-6 lg:pb-2">
            <p className="text-lead text-ink">{impactProgrammes.lead}</p>
            <p className="mt-2 text-[0.9375rem] text-slate">{impactProgrammes.listLabel}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-3 lg:mt-12 lg:gap-14">
          {impactProgrammes.programmes.map((programme, index) => (
            <Reveal key={programme.name} delay={index * 110}>
              <h3>
                <Link
                  href={programme.href}
                  className="group inline-flex items-start gap-2 font-display text-[1.5rem] leading-snug text-ink transition-colors duration-500 [font-variation-settings:'SOFT'_100] hover:text-lagoon-600 sm:text-[1.75rem]"
                >
                  {programme.name}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1.5 h-5 w-5 shrink-0 text-lagoon-600 transition-transform duration-500 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </h3>
              <ul className="mt-5 space-y-3">
                {programme.indicators.map((indicator) => (
                  <li key={indicator} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink">
                    <span
                      aria-hidden="true"
                      className={cx("mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full", DOTS[index])}
                    />
                    {indicator}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-14">
          {[
            { text: impactProgrammes.privacy, Icon: Lock },
            { text: impactProgrammes.findings, Icon: RefreshCw },
          ].map(({ text, Icon }, index) => (
            <Reveal key={text} delay={index * 120} className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lagoon-50 text-lagoon-600">
                <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <p className="max-w-2xl pt-1.5 text-[1rem] leading-relaxed text-ink">{text}</p>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}

import type { CSSProperties } from "react";
import { Info } from "lucide-react";
import { cx } from "@/lib/cx";
import { scholarshipsLevels } from "@/data/scholarships";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * How Much Support Can Applicants Receive?, on cream: the document's
 * indicative grant levels as a table whose middle column draws each range
 * as a bar on one shared £0 to £3,000 scale, so the five can be compared at
 * a glance. Every figure is written out beside its bar, in ink, so the bars
 * only repeat what the text says: one series, no legend, thin bars with
 * rounded ends on a quiet track, and the scale's four marks above them.
 * "Up to £3,000" has no lower figure, so its bar fades in from the start of
 * the scale. Each bar draws itself from its left end as the table arrives
 * (`.line-draw`). The document's two notes on how awards are decided close
 * the section.
 */
export function Levels() {
  const { scale, levels, headers } = scholarshipsLevels;
  const at = (value: number) => `${(value / scale.max) * 100}%`;

  return (
    <section
      id={scholarshipsLevels.id}
      aria-labelledby="levels-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{scholarshipsLevels.kicker}</Kicker>
            </Reveal>
            <Title
              id="levels-title"
              lead={scholarshipsLevels.titleLead}
              accent={scholarshipsLevels.titleAccent}
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:pb-2">
            <p className="text-lead text-slate">{scholarshipsLevels.lead}</p>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-8 lg:mt-10">
          <table className="w-full table-fixed border-separate border-spacing-y-0 text-left">
            <caption className="mb-5 text-left text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">
              {scholarshipsLevels.tableLabel}
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-[56%] pb-3 pr-4 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-muted sm:w-[30%]"
                >
                  {headers.category}
                </th>
                {/* The shared scale, its marks set over the bars' column. */}
                <th scope="col" className="hidden pb-3 sm:table-cell">
                  <span className="sr-only">Range on a scale of £0 to £3,000</span>
                  <span aria-hidden="true" className="relative block h-4">
                    {scale.ticks.map((tick, index) => (
                      <span
                        key={tick}
                        className={cx(
                          "absolute top-0 text-[0.75rem] font-medium tabular-nums text-ink-muted",
                          index === 0 ? "left-0" : index === scale.ticks.length - 1 ? "right-0" : "-translate-x-1/2",
                        )}
                        style={
                          index > 0 && index < scale.ticks.length - 1
                            ? { left: `${(index / (scale.ticks.length - 1)) * 100}%` }
                            : undefined
                        }
                      >
                        {tick}
                      </span>
                    ))}
                  </span>
                </th>
                <th
                  scope="col"
                  className="w-[44%] pb-3 pl-4 text-right text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-muted sm:w-[13rem]"
                >
                  {headers.support}
                </th>
              </tr>
            </thead>
            <tbody>
              {levels.map((level, index) => (
                <tr key={level.category} className="group">
                  <th
                    scope="row"
                    className="py-3.5 pr-4 align-middle font-display text-[1.125rem] font-normal leading-snug text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.3125rem]"
                  >
                    {level.category}
                  </th>
                  <td className="hidden py-3.5 align-middle sm:table-cell">
                    <Reveal variant="fade" delay={150 + index * 90}>
                      <span aria-hidden="true" className="relative block h-3 rounded-full bg-ink/[0.07]">
                        <span
                          className="absolute inset-y-0 block"
                          style={{ left: at(level.from), width: at(level.to - level.from) } as CSSProperties}
                        >
                          <span
                            className={cx(
                              "line-draw block h-full rounded-full bg-orange transition-[filter] duration-500 group-hover:brightness-110",
                              "upTo" in level &&
                                level.upTo &&
                                "[mask-image:linear-gradient(90deg,transparent,#000_70%)]",
                            )}
                          />
                        </span>
                      </span>
                    </Reveal>
                  </td>
                  <td className="py-3.5 pl-4 text-right align-middle font-display text-[1.125rem] tabular-nums whitespace-nowrap text-ink [font-variation-settings:'SOFT'_100] sm:pl-6 sm:text-[1.5rem]">
                    {level.support}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-2 lg:gap-14">
          {scholarshipsLevels.notes.map((note, index) => (
            <Reveal key={note} delay={index * 100}>
              <p className="flex items-start gap-3.5 text-[0.9375rem] leading-relaxed text-ink">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-lagoon-600">
                  <Info aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="pt-1.5">{note}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}

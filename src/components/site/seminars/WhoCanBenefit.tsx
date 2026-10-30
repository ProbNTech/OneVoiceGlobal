"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cx } from "@/lib/cx";
import { seminarsWho } from "@/data/seminars";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* Each programme's list is dotted in its own colour from the logo. */
const dots = ["bg-lagoon-500", "bg-ocean-600", "bg-saffron-500"];

/**
 * Who Can Benefit? The overview's heading, its lead, its note on how
 * activities will be shaped and its welcome on the left, with the call to
 * register; on the right, a switch between the three programmes, each
 * showing the people its own Who Can Benefit? block names, two to a row.
 * On large screens the three lists share one grid cell, so the band keeps
 * the height of the longest and nothing below it moves when the list
 * changes; on phones, where the lists sit above the next band, only the
 * chosen one takes room. The switch
 * follows the usual tab pattern: arrow keys move between programmes.
 */
export function WhoCanBenefit() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { tabs } = seminarsWho;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id={seminarsWho.id}
      aria-labelledby="who-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Kicker>{seminarsWho.kicker}</Kicker>
            </Reveal>
            <Title
              id="who-title"
              lead={seminarsWho.titleLead}
              accent={seminarsWho.titleAccent}
              inline
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 text-lead text-slate">{seminarsWho.lead}</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">{seminarsWho.note}</p>
              <p className="mt-6 font-display text-[1.375rem] italic font-light leading-snug text-lagoon-600 [font-variation-settings:'SOFT'_100]">
                {seminarsWho.closing}
              </p>
              <Cta href={seminarsWho.cta.href} className="mt-8">
                {seminarsWho.cta.label}
              </Cta>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:col-span-7 lg:pt-2">
            <div
              role="tablist"
              aria-label={`${seminarsWho.titleLead} ${seminarsWho.titleAccent}`}
              onKeyDown={onKeyDown}
              className="flex flex-wrap gap-2"
            >
              {tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`who-tab-${index}`}
                  aria-selected={index === active}
                  aria-controls={`who-panel-${index}`}
                  tabIndex={index === active ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={cx(
                    "flex items-center gap-2.5 rounded-full px-5 py-3 text-left text-[0.875rem] font-semibold whitespace-nowrap transition-colors duration-500 sm:px-6",
                    index === active ? "bg-ink text-white" : "bg-cream text-ink hover:bg-sand",
                  )}
                >
                  <span aria-hidden="true" className={cx("h-2 w-2 rounded-full", dots[index])} />
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="mt-8 grid">
              {tabs.map((tab, index) => (
                <div
                  key={tab.name}
                  role="tabpanel"
                  id={`who-panel-${index}`}
                  aria-labelledby={`who-tab-${index}`}
                  className={cx(
                    "col-start-1 row-start-1 transition-[opacity,translate] duration-700 ease-out-soft",
                    index === active
                      ? "visible translate-y-0 opacity-100 max-lg:animate-[rise-in_0.8s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none"
                      : "hidden lg:invisible lg:block lg:translate-y-3 lg:opacity-0",
                  )}
                >
                  <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                    {tab.items.map((item) => (
                      <li key={item} className="flex items-start gap-3.5 text-[1rem] leading-snug text-ink">
                        <span
                          aria-hidden="true"
                          className={cx("mt-[0.45em] h-2 w-2 shrink-0 rounded-full", dots[index])}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

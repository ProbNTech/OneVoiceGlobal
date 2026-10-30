"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { cx } from "@/lib/cx";
import { programmesEmployment } from "@/data/programmes-page";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";

/**
 * Employment & Careers: the brief's objective for its employability work as
 * the heading, then its three programmes behind tabs, Employability & Job
 * Support, Careers Information, Advice & Guidance and Career Development.
 * Each tab shows its heading, line and list beside a photograph of its own,
 * which is uncovered from the foot up over the last (`.photo-stack`, as the
 * Get Involved page's ways). The tabs follow the usual keyboard pattern:
 * arrow keys move between them.
 */
export function Employment() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { tabs } = programmesEmployment;

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
      id={programmesEmployment.id}
      aria-labelledby="employment-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <Reveal variant="fade">
          <Kicker>{programmesEmployment.kicker}</Kicker>
        </Reveal>
        <Title
          id="employment-title"
          lead={programmesEmployment.titleLead}
          accent={programmesEmployment.titleAccent}
          className="mt-5"
        />

        <Reveal delay={120}>
          <div
            role="tablist"
            aria-label={programmesEmployment.kicker}
            onKeyDown={onKeyDown}
            className="mt-8 flex flex-wrap gap-2 lg:mt-10"
          >
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`employment-tab-${index}`}
                aria-selected={index === active}
                aria-controls={`employment-panel-${index}`}
                tabIndex={index === active ? 0 : -1}
                onClick={() => setActive(index)}
                className={cx(
                  "rounded-full px-5 py-3 text-left text-[0.875rem] font-semibold transition-colors duration-500 sm:px-6",
                  index === active ? "bg-ink text-white" : "bg-cream text-ink hover:bg-sand",
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-14">
          <Reveal variant="image" className="lg:col-span-5">
            <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.18)] lg:max-w-[36rem]">
              <div className="reveal-clip relative aspect-square overflow-hidden rounded-[2rem_7rem_2rem_2rem] bg-sand">
                <div className="reveal-media photo-stack absolute inset-0">
                  {tabs.map((tab, index) => (
                    <div
                      key={tab.name}
                      aria-hidden={index !== active}
                      className={cx("absolute inset-0 overflow-hidden", index === active && "is-active")}
                    >
                      <Image
                        src={tab.image.src}
                        alt={tab.image.alt}
                        fill
                        sizes="(min-width: 1920px) 720px, (min-width: 1024px) 38vw, 100vw"
                        className="object-cover"
                        style={{ objectPosition: tab.image.position }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:self-center">
            {tabs.map((tab, index) => (
              <div
                key={tab.name}
                role="tabpanel"
                id={`employment-panel-${index}`}
                aria-labelledby={`employment-tab-${index}`}
                hidden={index !== active}
                className="animate-[rise-in_0.8s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none"
              >
                <h3 className="font-display text-[1.875rem] leading-tight text-ink [font-variation-settings:'SOFT'_100] lg:text-[2.25rem]">
                  {tab.title}
                </h3>
                <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-slate">{tab.lead}</p>
                {/* Careers guidance names its list in its lead already. */}
                {"listLabel" in tab ? (
                  <p className="mt-6 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">
                    {tab.listLabel}
                  </p>
                ) : null}
                <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 xl:grid-cols-3">
                  {tab.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink">
                      <span className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lagoon-50 text-lagoon-600">
                        <Check aria-hidden="true" className="h-3 w-3" strokeWidth={2.4} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                {"extra" in tab && tab.extra ? (
                  <div className="mt-7">
                    <p
                      id={`employment-extra-${index}`}
                      className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink"
                    >
                      {tab.extra.label}
                    </p>
                    <RunList
                      items={tab.extra.items}
                      labelledBy={`employment-extra-${index}`}
                      dot="bg-orange"
                      className="mt-2 text-[0.9375rem] leading-[1.9] text-ink"
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

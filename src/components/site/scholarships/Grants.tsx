"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { cx } from "@/lib/cx";
import { scholarshipsGrants } from "@/data/scholarships";
import { Photo } from "../ui/Photo";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Our Scholarships & Educational Grants, on sand: the six kinds of support,
 * A to F, as a lettered index down the left. Choosing one (click, tap or the
 * arrow keys, as a vertical tab list) lights its letter in orange and
 * lifts its own photograph into the frame on the right from the foot up
 * (`.photo-stack`, as the Programmes page's employment tabs), with its
 * name, the document's lines and its list beneath. Nothing is drawn between
 * the letters.
 */
export function Grants() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { grants } = scholarshipsGrants;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + grants.length) % grants.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id={scholarshipsGrants.id}
      aria-labelledby="grants-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{scholarshipsGrants.kicker}</Kicker>
            </Reveal>
            <Title
              id="grants-title"
              lead={scholarshipsGrants.titleLead}
              accent={scholarshipsGrants.titleAccent}
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:pb-2">
            <p className="text-lead text-slate">{scholarshipsGrants.lead}</p>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div
              role="tablist"
              aria-label={scholarshipsGrants.kicker}
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="flex flex-col gap-1"
            >
              {grants.map((grant, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={grant.letter}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`grant-tab-${index}`}
                    aria-selected={isActive}
                    aria-controls={`grant-panel-${index}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(index)}
                    className="group flex items-center gap-4 rounded-full py-2 pr-4 text-left sm:gap-5"
                  >
                    <span
                      aria-hidden="true"
                      className={cx(
                        "grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-[1.375rem] transition-colors duration-500 [font-variation-settings:'SOFT'_100]",
                        isActive ? "bg-orange text-white" : "bg-white text-ink group-hover:bg-cream",
                      )}
                    >
                      {grant.letter}
                    </span>
                    <span
                      className={cx(
                        "font-display text-[1.25rem] leading-snug transition-colors duration-500 [font-variation-settings:'SOFT'_100] sm:text-[1.5rem]",
                        isActive ? "text-lagoon-600" : "text-ink group-hover:text-lagoon-600",
                      )}
                    >
                      {grant.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.18)]">
                <div className="reveal-clip relative aspect-[16/9] overflow-hidden rounded-[1.5rem_6rem_1.5rem_1.5rem] bg-cream">
                  <div className="reveal-media photo-stack absolute inset-0">
                    {grants.map((grant, index) => (
                      <div
                        key={grant.letter}
                        aria-hidden={index !== active}
                        className={cx("absolute inset-0 overflow-hidden", index === active && "is-active")}
                      >
                        <Photo
                          image={grant.image}
                          sizes="(min-width: 1920px) 1000px, (min-width: 1024px) 52vw, 100vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {grants.map((grant, index) => (
              <div
                key={grant.letter}
                role="tabpanel"
                id={`grant-panel-${index}`}
                aria-labelledby={`grant-tab-${index}`}
                hidden={index !== active}
                className="mt-7 animate-[rise-in_0.8s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none"
              >
                <h3 className="font-display text-[1.75rem] leading-tight text-ink [font-variation-settings:'SOFT'_100] lg:text-[2.125rem]">
                  {grant.name}
                </h3>
                {grant.lines.map((line) => (
                  <p key={line} className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-slate">
                    {line}
                  </p>
                ))}
                {grant.items ? (
                  <>
                    <p
                      id={`grant-list-${index}`}
                      className="mt-5 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink"
                    >
                      {grant.listLabel}
                    </p>
                    <ul aria-labelledby={`grant-list-${index}`} className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {grant.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink">
                          <span className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lagoon-50 text-lagoon-600">
                            <Check aria-hidden="true" className="h-3 w-3" strokeWidth={2.4} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

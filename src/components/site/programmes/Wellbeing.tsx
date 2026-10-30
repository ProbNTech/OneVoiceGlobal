"use client";

import Image from "next/image";
import { useState } from "react";
import { Brain, HeartPulse, House, PiggyBank, Plus, type LucideIcon } from "lucide-react";
import { cx } from "@/lib/cx";
import { programmesWellbeing, type WellbeingIcon } from "@/data/programmes-page";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";

const icons: Record<WellbeingIcon, LucideIcon> = {
  wellbeing: HeartPulse,
  mental: Brain,
  family: House,
  financial: PiggyBank,
};

/**
 * Wellbeing & Family: the brief's Health & Wellbeing, Mental Health
 * Support, Family Support and Financial Capability blocks as an accordion,
 * one open at a time (the first to begin with), beside a tall photograph of
 * a circle of people talking. An open block shows its heading, its line,
 * its list as running text and the brief's notes on where specialist help
 * takes over. Rows are told apart by space and their icon circles, not by
 * rules between them.
 */
export function Wellbeing() {
  const [open, setOpen] = useState(0);
  const { items, image } = programmesWellbeing;

  return (
    <section
      id={programmesWellbeing.id}
      aria-labelledby="wellbeing-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <Reveal variant="fade">
              <Kicker>{programmesWellbeing.kicker}</Kicker>
            </Reveal>
            <Title
              id="wellbeing-title"
              lead={programmesWellbeing.titleLead}
              accent={programmesWellbeing.titleAccent}
              inline
              className="mt-5"
            />
          </div>

          <Reveal variant="image" className="lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
              <div className="reveal-clip relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-mist lg:max-w-[34rem]">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1920px) 720px, (min-width: 1024px) 38vw, 448px"
                      className="object-cover"
                      style={{ objectPosition: image.position }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-3 lg:col-span-7 lg:col-start-6 lg:row-start-2">
            {items.map((item, index) => {
              const Icon = icons[item.icon];
              const isOpen = index === open;
              return (
                <Reveal key={item.name} delay={index * 80}>
                  <h3>
                    <button
                      type="button"
                      id={`wellbeing-button-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`wellbeing-panel-${index}`}
                      onClick={() => setOpen(isOpen ? -1 : index)}
                      className="group flex w-full items-center gap-4 py-2 text-left sm:gap-5"
                    >
                      <span
                        className={cx(
                          "grid h-12 w-12 shrink-0 place-items-center rounded-full transition-colors duration-500",
                          isOpen ? "bg-lagoon-600 text-white" : "bg-white text-lagoon-600 group-hover:bg-lagoon-50",
                        )}
                      >
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span
                        className={cx(
                          "flex-1 font-display text-[1.375rem] leading-snug transition-colors duration-500 [font-variation-settings:'SOFT'_100] sm:text-[1.75rem]",
                          isOpen ? "text-lagoon-600" : "text-ink",
                        )}
                      >
                        {item.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cx(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-[rotate,background-color] duration-500 ease-out-soft",
                          isOpen ? "rotate-45 bg-saffron-500 text-white" : "rotate-0 bg-white text-ink",
                        )}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                      </span>
                    </button>
                  </h3>
                  {/* The panel opens by growing its grid row, so its height
                      animates without being measured. */}
                  <div
                    id={`wellbeing-panel-${index}`}
                    role="region"
                    aria-labelledby={`wellbeing-button-${index}`}
                    inert={!isOpen}
                    className={cx(
                      "grid transition-[grid-template-rows,opacity] duration-700 ease-out-soft",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-4 pl-16 pt-2 sm:pl-[4.25rem]">
                        {item.title ? (
                          <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink">
                            {item.title}
                          </p>
                        ) : null}
                        <p className={cx("max-w-2xl text-[1rem] leading-relaxed text-slate", item.title && "mt-2.5")}>
                          {item.lead}
                        </p>
                        <RunList items={item.list} className="mt-3 text-[1rem] leading-[1.9] text-ink" />
                        {item.notes.map((note) => (
                          <p key={note} className="mt-3 max-w-2xl text-[0.875rem] leading-relaxed text-ink-muted">
                            {note}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Shell>
    </section>
  );
}

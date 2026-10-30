"use client";

import { useState } from "react";
import { CalendarClock, Info, MapPin, Plus } from "lucide-react";
import { cx } from "@/lib/cx";
import { seminarsPriority } from "@/data/seminars";
import { Photo } from "../ui/Photo";
import { ArrowLink, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Priority Workshops for 2027: the three workshops as an accordion, one open
 * at a time (the first to begin with), beside a tall arched photograph. Each
 * shows its number, title and the brief's three-part line; open, it adds
 * the brief's introduction, its date and venue ("To be announced", as the
 * brief's design notes ask planned workshops to be labelled until
 * confirmed), its key topics, who may benefit, its
 * objective, its note and the way to register interest. Opening a workshop
 * lifts its own photograph into the frame from the foot up (`.photo-stack`,
 * as the Get Involved page's ways). A card over the photograph's foot
 * carries the programme's status, with a dot that pulses while it is
 * planned, and the brief's line on when details will be announced. Rows are
 * told apart by space, not by rules between them.
 */
export function PriorityWorkshops() {
  const [open, setOpen] = useState(0);
  /* The photograph stays on the last workshop opened, even once it closes. */
  const [shown, setShown] = useState(0);
  const { workshops, labels, register } = seminarsPriority;

  const toggle = (index: number) => {
    setOpen(open === index ? -1 : index);
    setShown(index);
  };

  return (
    <section
      id={seminarsPriority.id}
      aria-labelledby="priority-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-7 lg:row-start-1">
            <Reveal variant="fade">
              <Kicker>{seminarsPriority.kicker}</Kicker>
            </Reveal>
            <Title
              id="priority-title"
              lead={seminarsPriority.titleLead}
              accent={seminarsPriority.titleAccent}
              inline
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-5 max-w-2xl text-lead text-slate">{seminarsPriority.lead}</p>
            </Reveal>
          </div>

          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative w-full pb-12 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-cream lg:max-w-none">
                  <div className="reveal-media photo-stack absolute inset-0">
                    {workshops.map((workshop, index) => (
                      <div
                        key={workshop.title}
                        aria-hidden={index !== shown}
                        className={cx("absolute inset-0 overflow-hidden", index === shown && "is-active")}
                      >
                        <Photo
                          image={workshop.image}
                          sizes="(min-width: 1920px) 700px, (min-width: 1024px) 38vw, 448px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal
              variant="up"
              delay={300}
              className="absolute bottom-0 left-0 z-10 max-w-[19rem] sm:-left-5 sm:max-w-[22rem]"
            >
              <div className="rounded-card bg-white p-5 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <span className="inline-flex items-center gap-2 rounded-full bg-lagoon-50 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-lagoon-700">
                  <span aria-hidden="true" className="relative grid h-2 w-2 place-items-center">
                    <span className="absolute inset-0 animate-pulse-dot rounded-full bg-lagoon-500 motion-reduce:animate-none" />
                    <span className="relative h-2 w-2 rounded-full bg-lagoon-500" />
                  </span>
                  {seminarsPriority.status}
                </span>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-slate">{seminarsPriority.announcement}</p>
              </div>
            </Reveal>
          </div>

          <ol className="space-y-2 lg:col-span-7 lg:row-start-2">
            {workshops.map((workshop, index) => {
              const isOpen = index === open;
              const count = String(index + 1).padStart(2, "0");
              return (
                <Reveal as="li" key={workshop.title} delay={index * 90}>
                  <h3>
                    <button
                      type="button"
                      id={`workshop-button-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`workshop-panel-${index}`}
                      onClick={() => toggle(index)}
                      className="group flex w-full items-start gap-4 py-3 text-left sm:gap-6"
                    >
                      <span
                        className={cx(
                          "w-10 shrink-0 pt-1 font-display text-[1.625rem] font-light italic leading-none tabular-nums transition-colors duration-500 [font-variation-settings:'SOFT'_100] sm:w-12 sm:text-[2rem]",
                          isOpen ? "text-saffron-500" : "text-saffron-ink",
                        )}
                      >
                        {count}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cx(
                            "block font-display text-[1.5rem] leading-tight transition-colors duration-500 [font-variation-settings:'SOFT'_100] sm:text-[1.875rem]",
                            isOpen ? "text-lagoon-600" : "text-ink group-hover:text-lagoon-600",
                          )}
                        >
                          {workshop.title}
                        </span>
                        <span className="mt-1.5 block text-[0.9375rem] leading-snug text-slate">
                          {workshop.tagline}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={cx(
                          "mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full transition-[rotate,background-color] duration-500 ease-out-soft",
                          isOpen ? "rotate-45 bg-saffron-500 text-ink" : "rotate-0 bg-white text-ink",
                        )}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                      </span>
                    </button>
                  </h3>

                  {/* The panel opens by growing its grid row, so its height
                      animates without being measured. */}
                  <div
                    id={`workshop-panel-${index}`}
                    role="region"
                    aria-labelledby={`workshop-button-${index}`}
                    inert={!isOpen}
                    className={cx(
                      "grid transition-[grid-template-rows,opacity] duration-700 ease-out-soft",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pt-2 sm:pl-[4.5rem]">
                        {workshop.intro.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-slate first:mt-0"
                          >
                            {paragraph}
                          </p>
                        ))}

                        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-[0.875rem] text-ink">
                          {[
                            { label: labels.date, Icon: CalendarClock },
                            { label: labels.venue, Icon: MapPin },
                          ].map(({ label, Icon }) => (
                            <span key={label} className="inline-flex items-center gap-2">
                              <Icon aria-hidden="true" className="h-4 w-4 text-lagoon-600" strokeWidth={1.8} />
                              <span className="font-semibold">{label}:</span> {labels.toBeAnnounced}
                            </span>
                          ))}
                        </p>

                        <p
                          id={`workshop-topics-${index}`}
                          className="mt-5 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
                        >
                          {labels.topics}
                        </p>
                        <ul aria-labelledby={`workshop-topics-${index}`} className="mt-3 max-w-3xl space-y-2">
                          {workshop.topics.map((topic) => (
                            <li key={topic} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink">
                              <span
                                aria-hidden="true"
                                className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-500"
                              />
                              {topic}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-8">
                          <div>
                            <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink">
                              {labels.who}
                            </p>
                            <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{workshop.who}</p>
                          </div>
                          <div>
                            <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink">
                              {labels.objective}
                            </p>
                            <p className="mt-2 font-display text-[1.125rem] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
                              {workshop.objective}
                            </p>
                          </div>
                        </div>

                        {workshop.note ? (
                          <p className="mt-5 flex max-w-2xl items-start gap-2.5 text-[0.8125rem] leading-relaxed text-ink-muted">
                            <Info
                              aria-hidden="true"
                              className="mt-0.5 h-4 w-4 shrink-0 text-lagoon-600"
                              strokeWidth={1.8}
                            />
                            {workshop.note}
                          </p>
                        ) : null}

                        <ArrowLink href={register.href} className="mt-5">
                          {register.label}
                        </ArrowLink>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Shell>
    </section>
  );
}

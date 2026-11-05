"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cx } from "@/lib/cx";
import { scholarshipsFaq } from "@/data/scholarships";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Frequently Asked Questions, on white: the heading on the left and the
 * document's nine questions on the right as an accordion, one open at a
 * time (the first to begin with). Each question is set in the display
 * face; its answer opens beneath it by growing its grid row. Questions are
 * told apart by space, not by rules between them.
 */
export function Faq() {
  const [open, setOpen] = useState(0);
  const { questions } = scholarshipsFaq;

  return (
    <section
      id={scholarshipsFaq.id}
      aria-labelledby="faq-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          <div className="lg:col-span-4">
            <Reveal variant="fade">
              <Kicker>{scholarshipsFaq.kicker}</Kicker>
            </Reveal>
            <Title
              id="faq-title"
              lead={scholarshipsFaq.titleLead}
              accent={scholarshipsFaq.titleAccent}
              className="mt-5"
            />
          </div>

          <div className="space-y-1 lg:col-span-8">
            {questions.map((item, index) => {
              const isOpen = index === open;
              return (
                <Reveal key={item.q} delay={Math.min(index, 4) * 60}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-button-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setOpen(isOpen ? -1 : index)}
                      className="group flex w-full items-start gap-5 py-3 text-left"
                    >
                      <span
                        className={cx(
                          "flex-1 font-display text-[1.25rem] leading-snug transition-colors duration-500 [font-variation-settings:'SOFT'_100] sm:text-[1.4375rem]",
                          isOpen ? "text-lagoon-600" : "text-ink group-hover:text-lagoon-600",
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cx(
                          "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full transition-[rotate,background-color,color] duration-500 ease-out-soft",
                          isOpen ? "rotate-45 bg-orange text-white" : "rotate-0 bg-cream text-ink",
                        )}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    inert={!isOpen}
                    className={cx(
                      "grid transition-[grid-template-rows,opacity] duration-700 ease-out-soft",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl pb-4 pr-14 text-[1rem] leading-relaxed text-slate">{item.a}</p>
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

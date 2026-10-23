import type { CSSProperties } from "react";
import { ArrowRightLeft, BookOpenCheck, FileText, ListChecks, Scale, type LucideIcon } from "lucide-react";
import { aboutSafeguarding, type SafeguardIcon } from "@/data/about";
import { ArrowLink, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<SafeguardIcon, LucideIcon> = {
  policies: FileText,
  procedures: ListChecks,
  training: BookOpenCheck,
  referral: ArrowRightLeft,
  law: Scale,
};

/* The marker on each arrangement, cycling through the colours of the logo's
   figures, as the cards in the bands above do. */
const ACCENTS = ["var(--color-ocean-300)", "var(--color-lagoon-300)", "var(--color-saffron-400)"];

/**
 * Safeguarding. The brief's two paragraphs hold the left column, and the four
 * things the first of them names — policies, procedures, training and referral
 * arrangements — are drawn out of that sentence and numbered on a navy panel
 * beside it, under the brief's own clause. The closing sentence sits at the
 * foot of the panel as a notice, since it is the part that says what happens
 * when something goes wrong.
 */
export function Safeguarding() {
  const { notice } = aboutSafeguarding;
  const NoticeIcon = icons[notice.icon];

  return (
    <section
      id={aboutSafeguarding.id}
      aria-labelledby="safeguarding-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="fade" className="flex justify-center">
            <Kicker>{aboutSafeguarding.kicker}</Kicker>
          </Reveal>
          <Title
            id="safeguarding-title"
            lead={aboutSafeguarding.titleLead}
            accent={aboutSafeguarding.titleAccent}
            className="mt-4"
            inline
          />
        </div>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              {aboutSafeguarding.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-5 text-[1.0625rem] leading-relaxed text-slate first:mt-0">
                  {paragraph}
                </p>
              ))}
              <ArrowLink href={aboutSafeguarding.cta.href} className="mt-7">
                {aboutSafeguarding.cta.label}
              </ArrowLink>
            </Reveal>
          </div>

          <Reveal variant="up" delay={180} className="block lg:col-span-7">
            <div className="rounded-panel bg-navy-950 p-7 shadow-[0_40px_80px_-50px_rgb(10_37_64/0.7)] sm:p-9">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.22em] text-saffron-300">
                {aboutSafeguarding.arrangementsLabel}
              </p>
              <span aria-hidden="true" className="line-draw mt-4 block h-px w-full bg-white/15" />

              <ol className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {aboutSafeguarding.arrangements.map((item, index) => {
                  const Icon = icons[item.icon];
                  return (
                    <li
                      key={item.name}
                      style={{ "--accent": ACCENTS[index % ACCENTS.length] } as CSSProperties}
                      className="group flex items-center gap-4"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/8 text-(--accent) ring-1 ring-white/10 transition-colors duration-500 ease-out-soft group-hover:bg-white/15">
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="min-w-0">
                        <span
                          aria-hidden="true"
                          className="block font-display text-[0.8125rem] font-light text-white/40 [font-variation-settings:'SOFT'_100]"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-0.5 block text-[0.875rem] font-bold uppercase leading-snug tracking-[0.1em] text-white">
                          {item.name}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-7 flex items-start gap-4 border-t border-white/12 pt-6">
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-saffron-500 text-navy-950"
                >
                  <NoticeIcon className="h-4.5 w-4.5" strokeWidth={1.6} />
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-white/70">{notice.text}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

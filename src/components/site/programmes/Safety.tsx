import { Check, Compass, Signpost, Waypoints, type LucideIcon } from "lucide-react";
import { programmesSafety, type AdviceIcon } from "@/data/programmes-page";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";

const icons: Record<AdviceIcon, LucideIcon> = {
  signposting: Signpost,
  advocacy: Waypoints,
  arrival: Compass,
};

/**
 * Safety, Advice & Settlement. The brief's Domestic Abuse Support block in
 * one calm navy panel, with no photograph: its heading, its line, the forms
 * abuse can take as running text, and the support on offer as a checklist,
 * closed by its note on specialist help. Beneath, the brief's three advice
 * programmes (Information, Advice & Signposting; Advocacy & Referral; New
 * Arrival & Settlement Support) as wide rows: name and heading on the left,
 * line, list and closing note on the right, with nothing ruled between them.
 */
export function Safety() {
  const { abuse, advice } = programmesSafety;

  return (
    <section
      id={programmesSafety.id}
      aria-labelledby="safety-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="relative isolate overflow-hidden rounded-panel bg-navy-950 p-6 text-white sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 -z-10 h-[24rem] w-[24rem] rounded-full bg-lagoon-600/25 blur-[110px]"
          />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Reveal variant="fade">
                <Kicker tone="dark">{abuse.kicker}</Kicker>
              </Reveal>
              <Title
                id="safety-title"
                lead={abuse.titleLead}
                accent={abuse.titleAccent}
                tone="dark"
                accentTone="saffron"
                size="statement"
                className="mt-5"
              />
              <Reveal delay={120}>
                <p className="mt-6 max-w-xl text-lead text-white/75">{abuse.lead}</p>
                <p
                  id="abuse-forms"
                  className="mt-6 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-300"
                >
                  {abuse.formsLabel}
                </p>
                <RunList
                  items={abuse.forms}
                  labelledBy="abuse-forms"
                  dot="bg-saffron-400"
                  className="mt-2.5 max-w-xl text-[1.0625rem] leading-[1.9] text-white"
                />
              </Reveal>
            </div>

            <Reveal delay={180} className="lg:col-span-6 lg:self-center">
              <h3 id="abuse-support" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-300">
                {abuse.supportLabel}
              </h3>
              <ul aria-labelledby="abuse-support" className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
                {abuse.support.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-white">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-saffron-500 text-white">
                      <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-7 max-w-xl font-display text-[1.25rem] leading-snug text-white/90 [font-variation-settings:'SOFT'_100]">
                {abuse.closing}
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-12 space-y-10 lg:mt-16 lg:space-y-12">
          {advice.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.name} delay={60} className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-14">
                <div className="flex items-start gap-5 lg:col-span-5">
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ocean-600 text-white">
                    <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
                    <span
                      aria-hidden="true"
                      className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-saffron-500 text-[0.6875rem] font-bold tabular-nums text-white"
                    >
                      {index + 1}
                    </span>
                  </span>
                  <div>
                    <h3 className="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-saffron-ink">
                      {item.name}
                    </h3>
                    <p className="mt-2 font-display text-[1.625rem] leading-snug text-ink [font-variation-settings:'SOFT'_100] lg:text-[1.875rem]">
                      {item.title}
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-7 lg:pt-1">
                  <p className="max-w-3xl text-[1rem] leading-relaxed text-slate">{item.lead}</p>
                  <RunList
                    items={item.items}
                    dot={["bg-ocean-600", "bg-lagoon-500", "bg-saffron-500"][index % 3]}
                    className="mt-2.5 max-w-3xl text-[1.0625rem] leading-[1.9] text-ink"
                  />
                  <p className="mt-3 max-w-3xl text-[0.875rem] leading-relaxed text-ink-muted">{item.closing}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Shell>
    </section>
  );
}

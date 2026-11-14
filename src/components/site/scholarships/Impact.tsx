import { Check, FileText, Info } from "lucide-react";
import { scholarshipsImpact } from "@/data/scholarships";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Our Impact – Measuring Success, as the page's navy band: the heading
 * beside the document's line on what success means; then its intended
 * outcomes as a checklist and its promise of an annual Scholarship Impact
 * Report on the left, and on the right its Initial Programme Ambition, the
 * four proposed first-year targets set large in the orange gradient. The
 * targets are labelled as targets twice over: by their heading and by the
 * document's own note, set right under them, that they are not existing
 * awards or confirmed commitments.
 */
export function Impact() {
  const { outcomes, ambition } = scholarshipsImpact;

  return (
    <section
      id={scholarshipsImpact.id}
      aria-labelledby="scholarship-impact-title"
      className="relative isolate overflow-clip bg-navy-950 py-band text-white/75"
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-ocean-600/25 glow"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-lagoon-600/15 glow"
      />

      <Shell>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker tone="dark">{scholarshipsImpact.kicker}</Kicker>
            </Reveal>
            <Title
              id="scholarship-impact-title"
              lead={scholarshipsImpact.titleLead}
              accent={scholarshipsImpact.titleAccent}
              tone="dark"
              accentTone="saffron"
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:pb-2">
            <p className="text-lead text-white/80">{scholarshipsImpact.lead}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <p id="scholarship-outcomes" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange">
                {scholarshipsImpact.outcomesLabel}
              </p>
            </Reveal>
            <ul aria-labelledby="scholarship-outcomes" className="mt-5 space-y-3.5">
              {outcomes.map((outcome, index) => (
                <Reveal
                  as="li"
                  key={outcome}
                  delay={100 + index * 60}
                  className="flex items-start gap-3 text-[1rem] leading-snug text-white"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-orange text-white">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </span>
                  {outcome}
                </Reveal>
              ))}
            </ul>
            <Reveal delay={200}>
              <p className="mt-7 flex items-start gap-3.5 text-[0.9375rem] leading-relaxed text-white/80">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/8 text-lagoon-300 ring-1 ring-white/10">
                  <FileText aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.7} />
                </span>
                <span className="pt-1.5">{scholarshipsImpact.report}</span>
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <h3 className="font-display text-[1.75rem] leading-tight text-white [font-variation-settings:'SOFT'_100] sm:text-[2rem]">
                {ambition.label}
              </h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-white/75">{ambition.lead}</p>
            </Reveal>
            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-7 sm:gap-x-8">
              {ambition.targets.map((target, index) => (
                <Reveal key={target.label} variant="up" delay={150 + index * 90} className="flex flex-col-reverse">
                  <dt className="mt-2 text-[0.9375rem] leading-snug text-white/80">{target.label}</dt>
                  <dd className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-none tabular-nums text-orange [font-variation-settings:'SOFT'_100]">
                    {target.figure}
                  </dd>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={200}>
              <p className="mt-7 flex items-start gap-3 text-[0.875rem] leading-relaxed text-white/70">
                <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 icon-orange" strokeWidth={1.8} />
                {ambition.note}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

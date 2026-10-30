import { Accessibility, LockKeyhole, ShieldCheck, type LucideIcon } from "lucide-react";
import { contactSafety, type SafetyIcon } from "@/data/contact";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";

const icons: Record<SafetyIcon, LucideIcon> = {
  safeguarding: ShieldCheck,
  privacy: LockKeyhole,
  accessibility: Accessibility,
};

/**
 * Keeping People Safe: the heading beside the brief's 999 advice, set on a
 * navy panel with the number large, then the Foundation's Safeguarding,
 * Confidentiality & Privacy and Accessibility & Inclusion lines in three
 * columns, each under an icon circle and a spaced capital title. The last
 * two have ids of their own: the form links to the first and the strip
 * under the hero to the second.
 */
export function Safety() {
  const { emergency } = contactSafety;

  return (
    <section
      id={contactSafety.id}
      aria-labelledby="safety-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-8 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <Kicker>{contactSafety.kicker}</Kicker>
            </Reveal>
            <Title
              id="safety-title"
              lead={contactSafety.titleLead}
              accent={contactSafety.titleAccent}
              className="mt-5"
            />
          </div>

          <Reveal variant="scale" delay={120} className="lg:col-span-6">
            <div className="relative isolate flex flex-col gap-4 overflow-hidden rounded-panel bg-navy-950 p-7 text-white shadow-[0_40px_80px_-50px_rgb(6_26_48/0.8)] sm:flex-row sm:items-center sm:gap-8 sm:p-9">
              <div
                aria-hidden="true"
                className="absolute -left-16 -top-24 -z-10 h-64 w-64 rounded-full bg-orange opacity-20 blur-[80px]"
              />
              {/* The number is said in the sentence beside it. */}
              <p
                aria-hidden="true"
                className="shrink-0 font-display text-[5rem] leading-[0.9] tracking-[-0.03em] text-orange [font-variation-settings:'SOFT'_100] sm:text-[6.5rem]"
              >
                {emergency.number}
              </p>
              <div>
                <p className="text-[1.1875rem] font-medium leading-snug">{emergency.text}</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/70">{emergency.detail}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3 lg:mt-12 xl:gap-x-16">
          {contactSafety.blocks.map((block, index) => {
            const Icon = icons[block.icon];
            return (
              <Reveal key={block.id} id={block.id} delay={index * 100} className="group scroll-mt-28">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-lagoon-600 shadow-[0_14px_30px_-18px_rgb(10_37_64/0.5)] transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white">
                  <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-[0.875rem] font-bold uppercase tracking-[0.16em] text-ink">{block.title}</h3>
                {block.text.map((line) => (
                  <p key={line} className="mt-3 text-[1rem] leading-relaxed text-slate">
                    {line}
                  </p>
                ))}
                {"list" in block && block.list ? (
                  <RunList items={block.list} dot="bg-orange" className="mt-2 text-[1rem] leading-[1.9] text-ink" />
                ) : null}
                {"closing" in block && block.closing ? (
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-muted">{block.closing}</p>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}

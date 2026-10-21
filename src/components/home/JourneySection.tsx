import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { journeySteps } from "@/data/home";

/**
 * Your OneVoice Journey (brief section 07 / spec H-07).
 *
 * A five-step timeline — horizontal on desktop with a connecting line, vertical
 * on mobile. The client's stage labels (CONNECT, DISCOVER, DEVELOP, CONNECT,
 * PROGRESS) are preserved exactly.
 */
export function JourneySection() {
  return (
    <Section id="journey">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title="Your Journey Starts With One Conversation"
          description="Everyone's journey is different. We help you discover the support and opportunities that are right for you."
          align="center"
          className="mx-auto max-w-2xl"
        />

        {/* Desktop: horizontal */}
        <div className="relative mt-16 hidden lg:block">
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 h-0.5 bg-brand-line"
          />
          <ol className="relative grid grid-cols-5 gap-5">
            {journeySteps.map((step, i) => (
              <Reveal
                as="li"
                key={`${step.order}-${step.label}`}
                delay={i * 0.1}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-brand-blue font-heading text-lg font-bold text-white shadow-[var(--shadow-soft)] ring-4 ring-background">
                    {String(step.order).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-heading text-base font-bold uppercase tracking-[0.08em] text-brand-navy">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Mobile / tablet: vertical */}
        <ol className="mt-12 lg:hidden">
          {journeySteps.map((step, i) => (
            <Reveal
              as="li"
              key={`${step.order}-${step.label}-m`}
              delay={i * 0.08}
            >
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-blue font-heading text-base font-bold text-white">
                    {String(step.order).padStart(2, "0")}
                  </span>
                  {i < journeySteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="my-1 w-0.5 flex-1 bg-brand-line"
                    />
                  )}
                </div>
                <div className="pb-8 pt-2.5">
                  <h3 className="font-heading text-base font-bold uppercase tracking-[0.08em] text-brand-navy">
                    {step.label}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

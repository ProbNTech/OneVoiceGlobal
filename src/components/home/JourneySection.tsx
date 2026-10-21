import { ChevronRight, Compass, GraduationCap, Handshake, Phone, TrendingUp } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { journeySteps } from "@/data/home";

const stepIcons = [Phone, Compass, GraduationCap, Handshake, TrendingUp];

/** The five original OneVoice stages, presented as an illustrated process. */
export function JourneySection() {
  return (
    <Section
      id="journey"
      className="bg-brand-navy"
      aria-labelledby="journey-heading"
    >
      <div className="container-page">
        <SectionHeading
          id="journey-heading"
          eyebrow="How it works"
          title="Your Journey Starts With One Conversation"
          description="Everyone's journey is different. We help you discover the support and opportunities that are right for you."
          align="center"
          tone="dark"
          className="mx-auto max-w-4xl"
        />

        <ol className="mt-10 grid gap-7 lg:mt-12 lg:grid-cols-5 lg:gap-8">
          {journeySteps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <Reveal
                as="li"
                key={`${step.order}-${step.label}`}
                delay={i * 0.08}
                className="relative"
              >
                <div className="flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                  <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] text-brand-gold">
                    <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
                  </span>

                  {i < journeySteps.length - 1 && (
                    <ChevronRight
                      aria-hidden="true"
                      className="absolute -right-6 top-4 hidden size-5 text-brand-gold lg:block"
                      strokeWidth={1.8}
                    />
                  )}

                  <div>
                    <p className="font-heading text-2xl font-bold tabular-nums text-brand-gold lg:mt-4">
                      {String(step.order).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-heading text-base font-bold text-white">
                      {step.label}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/75">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

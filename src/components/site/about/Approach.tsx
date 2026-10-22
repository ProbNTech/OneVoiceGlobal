import { Ear, GraduationCap, Handshake, Lightbulb, TrendingUp, type LucideIcon } from "lucide-react";
import { aboutApproach, type ApproachIcon } from "@/data/about";
import { Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<ApproachIcon, LucideIcon> = {
  listen: Ear,
  understand: Lightbulb,
  develop: GraduationCap,
  connect: Handshake,
  progress: TrendingUp,
};

/**
 * Our Approach, as one navy band: the five steps across it, divided, each an
 * amber icon over its name and the brief's line. Their names read as the
 * brief's own subtitle for the page, Listen. Understand. Develop. Connect.
 * Progress.
 */
export function Approach() {
  return (
    <section
      id={aboutApproach.id}
      aria-labelledby="approach-title"
      className="relative isolate overflow-clip bg-navy-950 py-band text-white/70"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-ocean-600/25 blur-[150px]"
      />

      <Shell>
        <Reveal variant="fade" className="flex justify-center">
          <Kicker tone="dark">
            <span id="approach-title">{aboutApproach.kicker}</span>
          </Kicker>
        </Reveal>

        <ol className="mt-8 grid gap-y-10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-5 lg:gap-y-0 lg:divide-x lg:divide-white/10">
          {aboutApproach.steps.map((step, index) => {
            const Icon = icons[step.icon];
            return (
              <Reveal
                as="li"
                key={step.name}
                variant="up"
                delay={index * 90}
                className="group px-0 text-center lg:px-6"
              >
                <Icon
                  aria-hidden="true"
                  className="mx-auto h-7 w-7 text-saffron-400 transition-transform duration-700 ease-out-soft group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 font-display text-[1.75rem] leading-tight text-white [font-variation-settings:'SOFT'_100]">
                  {step.name}
                </h3>
                <p className="mx-auto mt-3 max-w-[17rem] text-[0.9375rem] leading-relaxed text-white/65">{step.line}</p>
              </Reveal>
            );
          })}
        </ol>
      </Shell>
    </section>
  );
}

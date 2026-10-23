import Image from "next/image";
import { Compass, Handshake, MessageCircleHeart, Sprout, TrendingUp, type LucideIcon } from "lucide-react";
import { aboutJourney } from "@/data/about";
import type { JourneyIcon } from "@/data/home";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<JourneyIcon, LucideIcon> = {
  message: MessageCircleHeart,
  compass: Compass,
  sprout: Sprout,
  handshake: Handshake,
  trending: TrendingUp,
};

/**
 * The OneVoice Journey on a navy panel with London behind it, under a heavy
 * wash: a centred title between two rules, a line setting the steps up, then
 * the five steps themselves, three to a row with the last two centred
 * beneath. Each step is a saffron circle with its icon, its number, the step
 * and the brief's line — nothing drawn between them.
 */
export function Journey() {
  const steps = aboutJourney.steps;

  return (
    <section aria-labelledby="journey-title" className="relative isolate overflow-clip bg-cream py-band">
      <Shell>
        <div className="relative isolate overflow-hidden rounded-panel bg-navy-950 px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          {/* London, drifting as the page scrolls. */}
          <div aria-hidden="true" className="absolute inset-0 -z-30">
            <div className="parallax absolute inset-x-0 -inset-y-[8%]">
              <Image
                src={aboutJourney.backdrop.src}
                alt=""
                fill
                quality={80}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: aboutJourney.backdrop.position }}
              />
            </div>
          </div>
          {/* Deeper where the copy sits, lighter across the middle. */}
          <div aria-hidden="true" className="absolute inset-0 -z-20 bg-navy-950/84" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(6_26_48/0.6)_0%,rgb(6_26_48/0.2)_45%,rgb(6_26_48/0.75)_100%)]"
          />

          <div className="text-center">
            <Reveal variant="fade" className="flex items-center justify-center gap-5">
              <span aria-hidden="true" className="h-px w-10 bg-white/25 sm:w-16" />
              <Kicker tone="dark">{aboutJourney.kicker}</Kicker>
              <span aria-hidden="true" className="h-px w-10 bg-white/25 sm:w-16" />
            </Reveal>
            <Title
              id="journey-title"
              lead={aboutJourney.titleLead}
              accent={aboutJourney.titleAccent}
              tone="dark"
              accentTone="saffron"
              className="mt-6"
            />
            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
                {aboutJourney.lead}
              </p>
            </Reveal>
          </div>

          <ol className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-y-14 lg:mt-14">
            {steps.map((step, index) => {
              const Icon = icons[step.icon];
              return (
                <Reveal
                  as="li"
                  key={`${step.name}-${index}`}
                  variant="up"
                  delay={(index % 3) * 120}
                  className="group basis-full px-6 text-center sm:basis-1/2 lg:basis-1/3"
                >
                  <span
                    aria-hidden="true"
                    className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-saffron-400 text-navy-950 shadow-[0_18px_36px_-18px_rgb(233_176_79/0.9)] transition-[transform,background-color] duration-700 ease-out-soft group-hover:-translate-y-1.5 group-hover:bg-saffron-300"
                  >
                    <Icon className="h-9 w-9" strokeWidth={1.5} />
                  </span>
                  <p className="mt-6 text-[0.875rem] font-bold tabular-nums tracking-[0.22em] text-saffron-400">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-[0.9375rem] font-bold uppercase tracking-[0.16em] text-white">
                    {step.name}
                  </h3>
                  <p className="mx-auto mt-4 max-w-[17rem] text-[0.9375rem] leading-relaxed text-white/75">
                    {step.line}
                  </p>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={120}>
            <p className="mx-auto mt-14 max-w-xl text-center font-display text-[1.25rem] font-light italic leading-snug text-white/80 [font-variation-settings:'SOFT'_100]">
              {aboutJourney.note}
            </p>
          </Reveal>

          <Reveal variant="up" delay={200} className="mt-8 flex justify-center">
            <Cta href={aboutJourney.cta.href} variant="saffron">
              {aboutJourney.cta.label}
            </Cta>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

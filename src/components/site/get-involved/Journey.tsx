import Image from "next/image";
import { Check } from "lucide-react";
import { getInvolvedJourney } from "@/data/get-involved";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Start Your OneVoice Journey: the brief's For Individuals, For Young People
 * and For Men blocks as three cards side by side. The outer two are white,
 * each with its list; the middle one is a photograph of young people at work
 * carrying the brief's words to them, with its four-word motto in orange.
 */
export function Journey() {
  const { individuals, men, youngPeople } = getInvolvedJourney;

  return (
    <section
      id={getInvolvedJourney.id}
      aria-labelledby="journey-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="text-center">
          <Reveal variant="fade" className="flex justify-center">
            <Kicker>{getInvolvedJourney.kicker}</Kicker>
          </Reveal>
          <Title
            id="journey-title"
            lead={getInvolvedJourney.titleLead}
            accent={getInvolvedJourney.titleAccent}
            inline
            className="mt-5"
          />
        </div>

        <div className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-5">
          <Reveal variant="up">
            <div className="flex h-full flex-col rounded-panel bg-white p-7 shadow-[0_30px_60px_-45px_rgb(10_37_64/0.55)] sm:p-9">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.22em] text-orange-ink">
                {individuals.label}
              </p>
              <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-ink [font-variation-settings:'SOFT'_100]">
                {individuals.lead}
              </h3>
              <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3">
                {individuals.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[0.9375rem] leading-snug text-ink">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white">
                      <Check aria-hidden="true" className="h-3 w-3" strokeWidth={2.8} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal variant="image" delay={120}>
            <div className="reveal-clip relative isolate flex h-full min-h-[28rem] flex-col justify-end overflow-hidden rounded-panel bg-navy-950 p-7 text-white sm:p-9">
              <div className="reveal-media absolute inset-0 -z-20">
                <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                  <Image
                    src={youngPeople.image.src}
                    alt={youngPeople.image.alt}
                    fill
                    sizes="(min-width: 1760px) 580px, (min-width: 1024px) 32vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: youngPeople.image.position }}
                  />
                </div>
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(6_26_48/0.1)_0%,rgb(6_26_48/0.55)_40%,rgb(6_26_48/0.94)_100%)]"
              />
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.22em] text-orange">{youngPeople.label}</p>
              <h3 className="mt-3 font-display text-[2rem] leading-tight text-white [font-variation-settings:'SOFT'_100]">
                {youngPeople.title}
              </h3>
              <p className="mt-4 text-[1rem] leading-relaxed text-white/85">{youngPeople.text}</p>
              <p className="mt-5 font-display text-[1.375rem] font-light italic text-orange [font-variation-settings:'SOFT'_100]">
                {youngPeople.motto}
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={240}>
            <div className="flex h-full flex-col rounded-panel bg-white p-7 shadow-[0_30px_60px_-45px_rgb(10_37_64/0.55)] sm:p-9">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.22em] text-orange-ink">{men.label}</p>
              <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-ink [font-variation-settings:'SOFT'_100]">
                {men.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">{men.lead}</p>
              <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3">
                {men.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[0.9375rem] leading-snug text-ink">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ocean-600 text-white">
                      <Check aria-hidden="true" className="h-3 w-3" strokeWidth={2.8} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

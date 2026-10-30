import Image from "next/image";
import { ArrowLeftRight, ArrowRight, Check } from "lucide-react";
import { partnersTraining } from "@/data/partners";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Training Providers. The brief's two blocks face each other across the
 * band: on the left, over a photograph of a class, the routes participants
 * can be connected with; on the right, on white, the providers OneVoice can
 * collaborate with. An orange disc with an exchange arrow sits on the seam
 * between them. The brief's closing line, where those partnerships lead,
 * runs beneath.
 */
export function Training() {
  const { collaborators, participants } = partnersTraining;

  return (
    <section
      id={partnersTraining.id}
      aria-labelledby="training-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="text-center">
          <Reveal variant="fade" className="flex justify-center">
            <Kicker>{partnersTraining.kicker}</Kicker>
          </Reveal>
          <Title
            id="training-title"
            lead={partnersTraining.titleLead}
            accent={partnersTraining.titleAccent}
            inline
            className="mt-5"
          />
        </div>

        <div className="relative mt-8 grid gap-4 lg:mt-10 lg:grid-cols-2 lg:gap-5">
          <Reveal variant="image">
            <div className="reveal-clip relative isolate flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-panel bg-navy-950 p-7 text-white sm:p-10">
              <div className="reveal-media absolute inset-0 -z-20">
                <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                  <Image
                    src={participants.image.src}
                    alt={participants.image.alt}
                    fill
                    sizes="(min-width: 1760px) 860px, (min-width: 1024px) 48vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: participants.image.position }}
                  />
                </div>
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(6_26_48/0.15)_0%,rgb(6_26_48/0.6)_40%,rgb(6_26_48/0.93)_100%)]"
              />

              <p className="max-w-md font-display text-[1.375rem] leading-snug text-white [font-variation-settings:'SOFT'_100]">
                {participants.label}
              </p>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {participants.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[1rem] text-white">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-saffron-500 text-white">
                      <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal variant="up" delay={150}>
            <div className="flex h-full flex-col justify-center rounded-panel bg-white p-7 shadow-[0_30px_60px_-45px_rgb(10_37_64/0.55)] ring-1 ring-ink/6 sm:p-10">
              <h3 className="font-display text-[1.75rem] leading-tight text-ink [font-variation-settings:'SOFT'_100]">
                {collaborators.heading}
              </h3>
              <p className="mt-3 text-[1.0625rem] text-slate">{collaborators.label}</p>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {collaborators.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[1rem] font-medium text-ink">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-lagoon-600 text-white">
                      <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* The seam between the two. */}
          <Reveal
            variant="scale"
            delay={300}
            className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            <span
              aria-hidden="true"
              className="grid h-16 w-16 place-items-center rounded-full bg-saffron-500 text-white shadow-[0_18px_36px_-18px_rgb(10_37_64/0.7)] ring-8 ring-cream"
            >
              <ArrowLeftRight className="h-6 w-6" strokeWidth={1.8} />
            </span>
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-8 flex justify-center lg:mt-10">
          <p className="flex max-w-3xl items-center gap-4 text-left font-display text-[clamp(1.25rem,1.6vw,1.5rem)] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
            <span
              aria-hidden="true"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
            </span>
            {partnersTraining.closing}
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

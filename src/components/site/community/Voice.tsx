import Image from "next/image";
import { LockKeyhole } from "lucide-react";
import { communityVoice } from "@/data/community";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Research & Community Voice. A photograph of people listening to one
 * another on the left, with a quotation mark on an orange disc at its corner
 * and the brief's note on anonymised findings on a card across its foot;
 * on the right the eight things community insight can help OneVoice
 * understand, as an index under large outlined numerals.
 */
export function Voice() {
  const { image } = communityVoice;

  return (
    <section
      id={communityVoice.id}
      aria-labelledby="voice-title"
      className="relative isolate overflow-clip bg-mist py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative w-full pb-12 lg:col-span-5 lg:max-w-[34rem]">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[8rem_2rem_2rem_2rem] bg-white">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1760px) 680px, (min-width: 1024px) 38vw, 92vw"
                        className="object-cover"
                        style={{ objectPosition: image.position }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal variant="scale" delay={250} className="absolute -right-3 top-8 z-10 sm:-right-5">
              <span
                aria-hidden="true"
                className="grid h-16 w-16 place-items-center rounded-full bg-saffron-500 font-display text-[3rem] leading-none text-white shadow-[0_18px_36px_-18px_rgb(10_37_64/0.6)] [font-variation-settings:'SOFT'_100] sm:h-20 sm:w-20 sm:text-[3.75rem]"
              >
                <span className="translate-y-[0.18em]">{"“"}</span>
              </span>
            </Reveal>

            <Reveal
              variant="up"
              delay={350}
              className="absolute bottom-0 left-0 z-10 max-w-[19rem] sm:-left-5 sm:max-w-[23rem]"
            >
              <p className="flex items-start gap-4 rounded-card bg-white p-5 text-[0.875rem] leading-relaxed text-slate shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white">
                  <LockKeyhole aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={1.7} />
                </span>
                {communityVoice.note}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{communityVoice.kicker}</Kicker>
            </Reveal>
            <Title
              id="voice-title"
              lead={communityVoice.titleLead}
              accent={communityVoice.titleAccent}
              accentTone="ocean"
              inline
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 max-w-2xl text-lead text-slate">{communityVoice.lead}</p>
            </Reveal>

            <ol className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:gap-x-8 lg:mt-10 lg:grid-cols-4">
              {communityVoice.areas.map((area, index) => (
                <Reveal as="li" key={area} variant="up" delay={(index % 4) * 80} className="group">
                  <span
                    aria-hidden="true"
                    className="text-outline block font-display text-[2.75rem] leading-none text-ink/35 transition-colors duration-500 ease-out-soft [font-variation-settings:'SOFT'_100] group-hover:text-lagoon-600 lg:text-[3.25rem]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-3 block text-[1rem] font-semibold leading-snug text-ink">{area}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Shell>
    </section>
  );
}

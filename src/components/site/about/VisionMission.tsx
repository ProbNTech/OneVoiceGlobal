import Image from "next/image";
import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { aboutVisionMission } from "@/data/about";
import { Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const accents = {
  lagoon: "text-lagoon-600",
  ocean: "text-ocean-600",
  saffron: "text-saffron-ink",
} as const;

/**
 * Vision & Mission, in the brief's V.2 wording. The Vision is the section's
 * heading: one centred statement whose three hopes are set in italic in the
 * logo's colours and light up one after another as it arrives
 * (`Reveal variant="phrases"`). Beneath, the Mission beside a photograph
 * with a leaf corner: its sentence large, and how the Foundation aims to
 * achieve it in plain text.
 */
export function VisionMission() {
  const { image } = aboutVisionMission;

  return (
    <section
      id={aboutVisionMission.id}
      aria-labelledby="vision-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="mx-auto max-w-6xl text-center">
          <Reveal variant="fade" className="flex justify-center">
            <Kicker>{aboutVisionMission.kicker}</Kicker>
          </Reveal>
          <Reveal variant="fade" delay={80}>
            <p className="mt-6 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-ink-muted">
              {aboutVisionMission.visionLabel}
            </p>
          </Reveal>
          <Reveal
            as="h2"
            id="vision-title"
            variant="phrases"
            delay={160}
            className="mt-4 font-display text-statement font-normal text-ink [font-variation-settings:'SOFT'_100]"
          >
            {aboutVisionMission.vision.map((part, index) => (
              <span
                key={index}
                className={cx(
                  "phrase",
                  "accent" in part && part.accent && cx("italic font-light", accents[part.accent]),
                )}
                style={{ "--i": index } as CSSProperties}
              >
                {part.text}
              </span>
            ))}
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-x-14 gap-y-8 lg:mt-12 lg:grid-cols-12 xl:gap-x-20">
          <Reveal variant="image" className="lg:col-span-5">
            <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.18)]">
              <div className="reveal-clip relative aspect-[4/3] overflow-hidden rounded-[2rem_7rem_2rem_2rem] bg-sand">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1920px) 700px, (min-width: 1024px) 38vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: image.position }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.22em] text-saffron-ink">
              {aboutVisionMission.missionLabel}
            </h3>
            <p className="mt-4 font-display text-[1.625rem] leading-snug text-ink [font-variation-settings:'SOFT'_100] sm:text-[2rem]">
              {aboutVisionMission.mission}
            </p>
            <p className="mt-5 max-w-2xl text-lead text-slate">{aboutVisionMission.missionMore}</p>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

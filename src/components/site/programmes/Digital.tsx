import Image from "next/image";
import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { programmesDigital } from "@/data/programmes-page";
import { GlideTrack } from "../ui/GlideTrack";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";

/* The two ribbons each carry half the courses, and run opposite ways. */
const half = Math.ceil(programmesDigital.courses.length / 2);
const ribbons = [programmesDigital.courses.slice(0, half), programmesDigital.courses.slice(half)];

/**
 * Digital OneVoice, as the page's navy band. The brief's heading and line,
 * then its twenty courses running across the screen in two ribbons that
 * glide to a stop under the pointer (`GlideTrack`); the ribbons repeat for
 * the eye only, and the list itself is there for screen readers. Beneath, a
 * photograph carrying the brief's "Digital Confidence" promise, and its two
 * tracks, Digital for Work and Digital for Business, side by side, each with
 * a round photograph and its list set as running text.
 */
export function Digital() {
  const { confidence, image } = programmesDigital;

  return (
    <section
      id={programmesDigital.id}
      aria-labelledby="digital-title"
      className="relative isolate overflow-clip bg-navy-950 py-band text-white"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-ocean-600/25 blur-[130px]"
      />

      <Shell>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker tone="dark">{programmesDigital.kicker}</Kicker>
            </Reveal>
            <Title
              id="digital-title"
              lead={programmesDigital.titleLead}
              accent={programmesDigital.titleAccent}
              tone="dark"
              accentTone="saffron"
              inline
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:pb-2">
            <p className="text-lead text-white/75">{programmesDigital.lead}</p>
          </Reveal>
        </div>

        <p id="digital-courses" className="sr-only">
          {programmesDigital.coursesLabel}
        </p>
        <ul aria-labelledby="digital-courses" className="sr-only">
          {programmesDigital.courses.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </Shell>

      {/* The ribbons run to the screen's edges, outside the page measure. */}
      <Reveal variant="fade" delay={120} className="mt-8 space-y-3 lg:mt-10">
        {ribbons.map((courses, row) => (
          <div key={row} aria-hidden="true" className="mask-fade-x overflow-hidden">
            <GlideTrack
              className={cx(
                "flex w-max motion-reduce:animate-none",
                row === 0 ? "animate-marquee" : "animate-marquee-reverse",
              )}
              style={{ "--marquee-duration": "70s" } as CSSProperties}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center">
                  {courses.map((course, index) => (
                    <span key={course} className="flex items-center">
                      <span
                        className={cx(
                          "whitespace-nowrap font-display text-[2rem] leading-[1.25] [font-variation-settings:'SOFT'_100] lg:text-[2.75rem]",
                          (index + row) % 2 === 0 ? "text-white" : "text-outline italic font-light text-white/60",
                        )}
                      >
                        {course}
                      </span>
                      <span
                        className={cx(
                          "mx-6 h-2 w-2 rounded-full lg:mx-8",
                          ["bg-ocean-300", "bg-lagoon-300", "bg-saffron-400"][index % 3],
                        )}
                      />
                    </span>
                  ))}
                </div>
              ))}
            </GlideTrack>
          </div>
        ))}
      </Reveal>

      <Shell>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          {/* The brief's promise, over a photograph of a tutor at work. */}
          <Reveal variant="image" className="lg:col-span-5">
            <div className="reveal-clip relative aspect-[5/4] overflow-hidden rounded-[2rem_2rem_2rem_7rem] bg-navy-900">
              <div className="reveal-media absolute inset-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1920px) 720px, (min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: image.position }}
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-navy-950/90 via-navy-950/35 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8 lg:left-16">
                <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-300">
                  {confidence.label}
                </p>
                <p className="mt-2.5 max-w-md font-display text-[1.375rem] leading-snug text-white [font-variation-settings:'SOFT'_100] sm:text-[1.625rem]">
                  {confidence.text}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-7 lg:gap-12">
            {programmesDigital.tracks.map((track, index) => (
              <Reveal key={track.name} delay={index * 120}>
                <div className="flex items-center gap-4">
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-navy-900 ring-2 ring-saffron-400/70 ring-offset-4 ring-offset-navy-950">
                    <Image
                      src={track.image.src}
                      alt={track.image.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                      style={{ objectPosition: track.image.position }}
                    />
                  </span>
                  <div>
                    <h3 className="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-saffron-300">
                      {track.name}
                    </h3>
                    <p className="mt-1 font-display text-[1.375rem] leading-snug text-white [font-variation-settings:'SOFT'_100]">
                      {track.title}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/70">{track.lead}</p>
                <RunList
                  items={track.items}
                  dot="bg-saffron-400"
                  className="mt-3 text-[1rem] leading-[1.95] text-white"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

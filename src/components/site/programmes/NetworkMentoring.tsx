import Image from "next/image";
import type { CSSProperties } from "react";
import { Quote } from "lucide-react";
import { cx } from "@/lib/cx";
import { programmesEnterprise } from "@/data/programmes-page";
import { Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";

/* Each word of the network's heading takes one of the logo's colours. */
const triadColours = ["text-ocean-600", "text-lagoon-600", "text-saffron-ink"];

/**
 * The OneVoice Business Network and Mentoring, side by side, closing the
 * Enterprise & Mentoring theme. On the left the network's three-word
 * heading, each word rising out of its own mask in one of the logo's
 * colours, a photograph of a network event cut as a long pill, and who the
 * network brings together and what it does, as running text. On the right
 * a photograph of a mentor at work carrying the brief's line on what a good
 * mentor gives, then the mentoring pathways and the brief's note on
 * safeguarding.
 */
export function NetworkMentoring() {
  const { network, mentoring } = programmesEnterprise;

  return (
    <section
      aria-label={`${network.kicker} and ${mentoring.kicker}`}
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* OneVoice Business Network */}
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <Kicker>{network.kicker}</Kicker>
            </Reveal>
            <Reveal
              as="h3"
              variant="lines"
              className="mt-5 font-display text-statement text-ink [font-variation-settings:'SOFT'_100]"
            >
              {network.title.map((word, index) => (
                <span key={word}>
                  {index > 0 ? " " : null}
                  <span className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <span
                      className={cx("line-inner block", index === 1 && "italic font-light", triadColours[index])}
                      style={{ "--line": index } as CSSProperties}
                    >
                      {word}
                    </span>
                  </span>
                </span>
              ))}
            </Reveal>

            <Reveal variant="image" delay={120} className="mt-7">
              <div className="reveal-clip relative aspect-[3/1] overflow-hidden rounded-full bg-sand">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={network.image.src}
                      alt={network.image.alt}
                      fill
                      sizes="(min-width: 1920px) 880px, (min-width: 1024px) 46vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: network.image.position }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160} className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <p id="network-who" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink">
                  {network.whoLabel}
                </p>
                <RunList
                  items={network.who}
                  labelledBy="network-who"
                  className="mt-2.5 text-[1rem] leading-[1.9] text-ink"
                />
              </div>
              <div>
                <p
                  id="network-activities"
                  className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
                >
                  {network.activitiesLabel}
                </p>
                <RunList
                  items={network.activities}
                  labelledBy="network-activities"
                  dot="bg-ocean-600"
                  className="mt-2.5 text-[1rem] leading-[1.9] text-ink"
                />
              </div>
            </Reveal>
          </div>

          {/* Mentoring */}
          <div id={mentoring.id} className="scroll-mt-28 lg:col-span-6">
            <div className="relative">
              <Reveal variant="image">
                <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.18)]">
                  <div className="reveal-clip relative aspect-[3/2] overflow-hidden rounded-[7rem_2rem_2rem_2rem] bg-sand">
                    <div className="reveal-media absolute inset-0">
                      <Image
                        src={mentoring.image.src}
                        alt={mentoring.image.alt}
                        fill
                        sizes="(min-width: 1920px) 880px, (min-width: 1024px) 46vw, 100vw"
                        className="object-cover"
                        style={{ objectPosition: mentoring.image.position }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal
                variant="up"
                delay={260}
                className="relative z-10 -mt-12 ml-4 mr-10 sm:absolute sm:-bottom-8 sm:right-6 sm:m-0 sm:max-w-[22rem]"
              >
                <figure className="rounded-card bg-navy-950 p-6 text-white shadow-[0_30px_60px_-30px_rgb(6_26_48/0.7)]">
                  <Quote aria-hidden="true" className="h-6 w-6 text-saffron-400" strokeWidth={1.6} />
                  <blockquote className="mt-3 font-display text-[1.25rem] leading-snug [font-variation-settings:'SOFT'_100]">
                    {mentoring.quote}
                  </blockquote>
                </figure>
              </Reveal>
            </div>

            <Reveal delay={120} className="mt-8 sm:mt-14">
              <Kicker>{mentoring.kicker}</Kicker>
              <h3 className="mt-4 font-display text-[1.875rem] leading-tight text-ink [font-variation-settings:'SOFT'_100] lg:text-[2.25rem]">
                {mentoring.title}
              </h3>
              <p id="mentoring-list" className="mt-4 text-[0.9375rem] leading-relaxed text-slate">
                {mentoring.listLabel}
              </p>
              <RunList
                items={mentoring.items}
                labelledBy="mentoring-list"
                dot="bg-saffron-500"
                className="mt-2 text-[1rem] leading-[1.9] text-ink"
              />
              <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-muted">{mentoring.note}</p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

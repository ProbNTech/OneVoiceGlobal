import Image from "next/image";
import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { communityHub } from "@/data/community";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { logo } from "@/data/site";

/* The dot after each phrase, cycling through the colours of the logo's figures. */
const DOTS = ["var(--color-ocean-600)", "var(--color-lagoon-500)", "var(--color-saffron-500)"];

/**
 * Community Hub. The brief's sentence ends in eleven things people can do at
 * the Centre, so they are set as the sentence's large closing words rather
 * than as a list of tiles: they run on from line to line, alternating upright
 * and italic as the site's two-tone titles do, each closed by a dot in one of
 * the logo's colours. A photograph of a bright community room stands beside
 * them, with the Centre's name and motto on a card over its foot.
 */
export function Hub() {
  const { card, image, items } = communityHub;

  return (
    <section
      id={communityHub.id}
      aria-labelledby="hub-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{communityHub.kicker}</Kicker>
            </Reveal>
            <Title
              id="hub-title"
              lead={communityHub.titleLead}
              accent={communityHub.titleAccent}
              accentTone="ocean"
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 max-w-2xl text-lead text-slate">{communityHub.lead}</p>
            </Reveal>

            <ul className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 lg:mt-8 lg:gap-x-5">
              {items.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  variant="up"
                  delay={200 + index * 55}
                  style={{ "--dot": DOTS[index % DOTS.length] } as CSSProperties}
                  className="group flex items-center gap-4 lg:gap-5"
                >
                  <span
                    className={cx(
                      "font-display text-[clamp(1.5rem,2.5vw,2.375rem)] leading-[1.3] tracking-[-0.015em] transition-colors duration-500 ease-out-soft [font-variation-settings:'SOFT'_100]",
                      index % 2 === 0
                        ? "text-ink group-hover:text-ocean-600"
                        : "font-light italic text-lagoon-600 group-hover:text-ink",
                    )}
                  >
                    {item}
                  </span>
                  {index < items.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full bg-(--dot) transition-transform duration-500 ease-out-soft group-hover:scale-150"
                    />
                  ) : null}
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative w-full pb-10 lg:col-span-5 lg:ml-auto lg:max-w-[34rem]">
            <Reveal variant="image" delay={100}>
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[2rem_8rem_2rem_2rem] bg-cream">
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

            <Reveal
              variant="up"
              delay={320}
              className="absolute bottom-0 left-0 z-10 max-w-[18rem] sm:-left-5 sm:max-w-[21rem]"
            >
              <div className="flex items-center gap-4 rounded-card bg-white p-5 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-11 w-auto shrink-0"
                />
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] font-bold leading-snug text-ink">{card.title}</span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-muted">{card.line}</span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

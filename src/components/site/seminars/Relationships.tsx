import Image from "next/image";
import type { CSSProperties } from "react";
import { Info } from "lucide-react";
import { cx } from "@/lib/cx";
import { seminarsRelationships } from "@/data/seminars";
import { logo } from "@/data/site";
import { Photo } from "../ui/Photo";
import { Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { PhraseTitle } from "./PhraseTitle";

/* The dot after each area, cycling through the colours of the logo's figures. */
const DOTS = ["var(--color-ocean-600)", "var(--color-lagoon-500)", "var(--color-saffron-500)"];

/**
 * Healthy Relationships, in the warm register the brief's design notes ask
 * for, on sand: the programme's headline and belief, then its six programme
 * areas as large running words (as the Community page's hub sets its
 * activities) rather than as tiles, alternating upright and italic as the
 * site's two-tone titles do, each closed by a dot in one of the logo's
 * colours. The brief's line on respecting every relationship and the
 * programme's important information follow. A photograph of three
 * generations of a family stands beside them, cut with a leaf corner, with
 * the programme's subtitle on a card over its foot.
 */
export function Relationships() {
  const { areas, important, image } = seminarsRelationships;

  return (
    <section
      id={seminarsRelationships.id}
      aria-labelledby="relationships-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{seminarsRelationships.kicker}</Kicker>
            </Reveal>
            <PhraseTitle
              id="relationships-title"
              phrases={seminarsRelationships.title}
              accentTone="ocean"
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 max-w-2xl text-lead text-slate">{seminarsRelationships.lead}</p>
            </Reveal>

            <Reveal variant="fade" delay={150}>
              <h3
                id="relationships-areas"
                className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
              >
                {seminarsRelationships.areasLabel}
              </h3>
            </Reveal>
            <ul
              aria-labelledby="relationships-areas"
              className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 lg:gap-x-5"
            >
              {areas.map((area, index) => (
                <Reveal
                  as="li"
                  key={area}
                  variant="up"
                  delay={200 + index * 60}
                  style={{ "--dot": DOTS[index % DOTS.length] } as CSSProperties}
                  className="group flex items-center gap-4 lg:gap-5"
                >
                  <span
                    className={cx(
                      "font-display text-[clamp(1.375rem,2.1vw,2rem)] leading-[1.3] tracking-[-0.015em] transition-colors duration-500 ease-out-soft [font-variation-settings:'SOFT'_100]",
                      index % 2 === 0
                        ? "text-ink group-hover:text-ocean-600"
                        : "font-light italic text-lagoon-600 group-hover:text-ink",
                    )}
                  >
                    {area}
                  </span>
                  {index < areas.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full bg-(--dot) transition-transform duration-500 ease-out-soft group-hover:scale-150"
                    />
                  ) : null}
                </Reveal>
              ))}
            </ul>

            <Reveal delay={150}>
              <p className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-ink">
                {seminarsRelationships.respect}
              </p>
              <p className="mt-5 flex max-w-2xl items-start gap-3.5 text-[0.875rem] leading-relaxed text-ink-muted">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-saffron-ink">
                  <Info aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span>
                  <strong className="font-semibold text-ink">{important.label}:</strong> {important.text}
                </span>
              </p>
            </Reveal>
          </div>

          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative w-full pb-10 lg:col-span-5 lg:ml-auto lg:max-w-[34rem]">
            <Reveal variant="image" delay={100}>
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[2rem_2rem_8rem_2rem] bg-cream">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Photo image={image} sizes="(min-width: 1760px) 680px, (min-width: 1024px) 38vw, 92vw" />
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
                <span className="text-[0.9375rem] font-bold leading-snug text-ink">
                  {seminarsRelationships.subtitle}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

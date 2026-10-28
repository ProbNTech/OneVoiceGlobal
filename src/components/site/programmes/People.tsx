import Image from "next/image";
import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { programmesPeople } from "@/data/programmes-page";
import { Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";

/* Each verb of the women's statement takes one of the logo's colours in turn. */
const verbColours = ["text-lagoon-600", "text-ocean-600", "text-saffron-ink"];

/* The three groups' photographs, each cut in its own organic shape. */
const shapes = [
  "rounded-[5rem_1.5rem_1.5rem_1.5rem]",
  "rounded-t-[999px] rounded-b-[1.5rem]",
  "rounded-[1.5rem_5rem_1.5rem_1.5rem]",
];

/**
 * Women, Men & Young People. The Centre's emphasis towards women opens the
 * band: its five short sentences set large, one to a line, each rising out
 * of its own mask and opening on its verb in one of the logo's colours,
 * beside a photograph of women talking together. Beneath, the brief's three
 * programmes for young people, young men and men side by side, each under a
 * photograph cut in its own shape, with its heading, line and list as
 * running text.
 */
export function People() {
  const { women, groups } = programmesPeople;

  return (
    <section
      id={programmesPeople.id}
      aria-labelledby="people-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal variant="image" className="lg:col-span-4">
            <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.18)]">
              <div className="reveal-clip relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem_2rem_7rem_2rem] bg-sand lg:max-w-none">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={women.image.src}
                      alt={women.image.alt}
                      fill
                      sizes="(min-width: 1920px) 580px, (min-width: 1024px) 30vw, 448px"
                      className="object-cover"
                      style={{ objectPosition: women.image.position }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-8 lg:pl-4">
            <Reveal variant="fade">
              <Kicker as="h2" id="people-title">
                {programmesPeople.kicker}
              </Kicker>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 text-lead text-slate">{women.lead}</p>
            </Reveal>
            <Reveal
              variant="lines"
              delay={160}
              className="mt-4 font-display text-statement text-ink [font-variation-settings:'SOFT'_100]"
            >
              {women.lines.map(([verb, rest], index) => (
                <span key={verb} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
                  <span className="line-inner block" style={{ "--line": index } as CSSProperties}>
                    <em className={cx("font-light", verbColours[index % verbColours.length])}>{verb}</em> {rest}
                  </span>
                </span>
              ))}
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3 lg:mt-16 lg:gap-x-12">
          {groups.map((group, index) => (
            <Reveal as="li" key={group.name} variant="rise" delay={index * 110}>
              <div className="group">
                <div
                  className={cx(
                    "relative aspect-[16/11] overflow-hidden bg-sand shadow-[0_26px_50px_-34px_rgb(10_37_64/0.6)]",
                    shapes[index % shapes.length],
                  )}
                >
                  <Image
                    src={group.image.src}
                    alt={group.image.alt}
                    fill
                    sizes="(min-width: 1920px) 580px, (min-width: 768px) 31vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.07]"
                    style={{ objectPosition: group.image.position }}
                  />
                </div>
                <h3 className="mt-6 text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-saffron-ink">
                  {group.name}
                </h3>
                <p className="mt-2 font-display text-[1.5rem] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
                  {group.title}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">
                  {group.lead}
                  {group.listLabel ? ` ${group.listLabel}` : null}
                </p>
                <RunList
                  items={group.items}
                  dot={["bg-lagoon-500", "bg-ocean-600", "bg-saffron-500"][index % 3]}
                  className="mt-2.5 text-[1rem] leading-[1.9] text-ink"
                />
                {group.closing ? (
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-muted">{group.closing}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

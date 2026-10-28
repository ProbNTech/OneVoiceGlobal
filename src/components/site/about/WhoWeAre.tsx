import Image from "next/image";
import { DoorOpen, MapPin, Sprout, UsersRound, type LucideIcon } from "lucide-react";
import { aboutWhoWeAre, type OutcomeIcon } from "@/data/about";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { logo } from "@/data/site";

const icons: Record<OutcomeIcon, LucideIcon> = {
  connect: UsersRound,
  confidence: Sprout,
  opportunity: DoorOpen,
};

/**
 * Who We Are: a photograph on the right bracketed by two blocks in the logo's
 * colours, the Foundation's subtitle on a card over its top corner and the
 * Centre's home on another over its foot; the statement beside it, with the
 * brief's
 * twelve barriers set out three to a row; and the closing line underneath as
 * three tiles.
 */
export function WhoWeAre() {
  const { badge, barriers, card, image, outcomes, quote } = aboutWhoWeAre;

  return (
    <section
      id={aboutWhoWeAre.id}
      aria-labelledby="who-we-are-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative pb-10 lg:col-span-4 lg:col-start-9">
            <Reveal variant="image" className="relative">
              {/* Two blocks in the logo's colours, offset behind the opposite
                  corners of the photograph so each reads as a bracket around
                  it. They take the corners the two cards leave free. */}
              <Reveal variant="fade" delay={120} className="absolute -left-5 -top-5 -z-10">
                <div className="h-20 w-20 rounded-[1.75rem] bg-saffron-500 sm:h-24 sm:w-24 lg:h-28 lg:w-28" />
              </Reveal>
              <Reveal variant="fade" delay={220} className="absolute -bottom-5 -right-5 -z-10">
                <div className="h-20 w-20 rounded-[1.75rem] bg-lagoon-600 sm:h-24 sm:w-24 lg:h-28 lg:w-28" />
              </Reveal>

              <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[1.5rem_2rem_1.5rem_1.5rem] bg-sand shadow-[0_40px_80px_-45px_rgb(10_37_64/0.6)]">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1760px) 560px, (min-width: 1024px) 30vw, 92vw"
                      className="object-cover"
                      style={{ objectPosition: image.position }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal
              variant="right"
              delay={420}
              className="absolute -right-3 top-6 z-10 max-w-[15.5rem] sm:-right-5 sm:top-8"
            >
              <div className="flex items-center gap-3 rounded-[1.25rem] bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-10 w-auto shrink-0"
                />
                <p className="text-[0.8125rem] font-semibold leading-snug text-ink">{badge}</p>
              </div>
            </Reveal>

            {/* Narrower on phones, where it would otherwise reach across the
                bracket in the corner below it. */}
            <Reveal
              variant="up"
              delay={320}
              className="absolute bottom-0 left-0 z-10 max-w-[15rem] sm:-left-5 sm:max-w-[19rem]"
            >
              <div className="flex items-center gap-4 rounded-[1.25rem] bg-white p-5 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white">
                  <MapPin className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] font-bold text-ink">{card.title}</span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-muted">{card.line}</span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Statement */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <Reveal variant="fade">
              <Kicker>{aboutWhoWeAre.kicker}</Kicker>
            </Reveal>
            <Title
              id="who-we-are-title"
              lead={aboutWhoWeAre.titleLead}
              accent={aboutWhoWeAre.titleAccent}
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 max-w-4xl text-[clamp(1.1875rem,1.3vw,1.375rem)] leading-[1.6] text-slate">
                {aboutWhoWeAre.lead}
              </p>
            </Reveal>
            <Reveal delay={210}>
              <p className="mt-5 max-w-4xl text-[1.0625rem] leading-relaxed text-slate">{aboutWhoWeAre.body}</p>
              <p className="mt-7 max-w-4xl text-[1rem] leading-relaxed text-ink-muted">{barriers.lead}</p>
            </Reveal>

            {/* Twelve barriers, so they are set plainly, three to a row. The
                list carries hard things; a glyph beside each one would make
                light of them. */}
            <ul
              aria-label="Barriers to opportunity"
              className="mt-5 grid max-w-4xl gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {barriers.items.map((barrier, index) => (
                <Reveal
                  as="li"
                  key={barrier}
                  variant="up"
                  delay={240 + index * 45}
                  className="flex items-baseline gap-3 text-[1rem] leading-snug text-ink"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-500" />
                  {barrier}
                </Reveal>
              ))}
            </ul>

            <Reveal as="blockquote" delay={320} className="mt-9 max-w-3xl border-l-2 border-saffron-400 pl-6">
              <span
                aria-hidden="true"
                className="block font-display text-[2.75rem] leading-[0.6] text-saffron-500 [font-variation-settings:'SOFT'_100]"
              >
                {"“"}
              </span>
              <p className="mt-4 font-display text-[clamp(1.25rem,1.5vw,1.5rem)] leading-[1.45] text-ink [font-variation-settings:'SOFT'_100]">
                {quote}
              </p>
            </Reveal>
          </div>
        </div>

        {/* The closing line. */}
        <ul className="mx-auto mt-12 grid max-w-4xl gap-x-8 gap-y-10 sm:grid-cols-3 lg:mt-16">
          {outcomes.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.title} variant="up" delay={index * 110} className="group text-center">
                <span aria-hidden="true" className="relative mx-auto grid h-16 w-16 place-items-center">
                  {/* The amber block sits behind the tile and closes on it as
                      the tile lifts. */}
                  <span className="absolute inset-0 translate-x-2 translate-y-2 rounded-[1.25rem] bg-saffron-500 transition-transform duration-700 ease-out-soft group-hover:translate-x-1 group-hover:translate-y-1" />
                  <span className="relative grid h-16 w-16 place-items-center rounded-[1.25rem] bg-navy-900 text-white transition-transform duration-700 ease-out-soft group-hover:-translate-y-1">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                </span>
                <h3 className="mt-6 text-[0.9375rem] font-bold uppercase tracking-[0.14em] text-ink">{item.title}</h3>
              </Reveal>
            );
          })}
        </ul>
      </Shell>
    </section>
  );
}

import Image from "next/image";
import {
  Armchair,
  Earth,
  GraduationCap,
  HandHeart,
  House,
  MonitorSmartphone,
  Quote,
  UsersRound,
  Venus,
  type LucideIcon,
} from "lucide-react";
import { aboutWhoWeAre, type ServeIcon } from "@/data/about";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<ServeIcon, LucideIcon> = {
  diaspora: Earth,
  women: Venus,
  youth: GraduationCap,
  digital: MonitorSmartphone,
  families: House,
  older: Armchair,
  groups: UsersRound,
  volunteers: HandHeart,
};

/**
 * Who We Are: the Foundation's own "About us" block beside a photograph cut
 * with a leaf corner, the block's closing pair of sentences on a white card
 * across the photograph's foot. Beneath, the brief's list of the people
 * OneVoice will serve, as a plain icon list four to a row: an icon circle
 * and the brief's line, with nothing behind them.
 */
export function WhoWeAre() {
  const { image, serve } = aboutWhoWeAre;

  return (
    <section
      id={aboutWhoWeAre.id}
      aria-labelledby="who-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <Kicker>{aboutWhoWeAre.kicker}</Kicker>
            </Reveal>
            <Title
              id="who-title"
              lead={aboutWhoWeAre.titleLead}
              accent={aboutWhoWeAre.titleAccent}
              inline
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lead text-ink">{aboutWhoWeAre.paragraphs[0]}</p>
              <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-slate">
                {aboutWhoWeAre.paragraphs[1]}
              </p>
            </Reveal>
          </div>

          <div className="relative pb-20 sm:pb-16 lg:col-span-6 lg:pb-12">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[5/4] overflow-hidden rounded-[2rem_2rem_8rem_2rem] bg-sand">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1920px) 820px, (min-width: 1024px) 44vw, 100vw"
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
              delay={300}
              className="absolute bottom-0 left-4 right-4 z-10 sm:right-auto sm:max-w-[26rem] lg:-left-8"
            >
              <figure className="rounded-card bg-white p-5 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:p-6">
                <Quote aria-hidden="true" className="h-6 w-6 icon-orange" strokeWidth={1.6} />
                <blockquote className="mt-3 font-display text-[1.0625rem] leading-snug text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.1875rem]">
                  {aboutWhoWeAre.quote}
                </blockquote>
              </figure>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 lg:mt-14">
          <Reveal variant="fade">
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">{serve.label}</h3>
            <p id="serve-lead" className="mt-3 max-w-3xl text-[1.0625rem] leading-relaxed text-slate">
              {serve.lead}
            </p>
          </Reveal>
          <ul aria-labelledby="serve-lead" className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {serve.groups.map((group, index) => {
              const Icon = icons[group.icon];
              return (
                <Reveal as="li" key={group.text} delay={(index % 4) * 80} className="group flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-lagoon-600 shadow-[0_12px_26px_-16px_rgb(10_37_64/0.5)] transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <p className="text-[0.9375rem] leading-relaxed text-slate">{group.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Shell>
    </section>
  );
}

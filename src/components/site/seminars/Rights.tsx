import type { CSSProperties } from "react";
import {
  BriefcaseBusiness,
  Gavel,
  HandHeart,
  Landmark,
  LockKeyhole,
  Scale,
  Shield,
  UserRoundCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { seminarsRights, type RightsIcon, type TopicIcon } from "@/data/seminars";
import { Photo } from "../ui/Photo";
import { Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { PhraseTitle } from "./PhraseTitle";

const icons: Record<RightsIcon | TopicIcon, LucideIcon> = {
  rights: Scale,
  family: Gavel,
  finance: Wallet,
  safety: Shield,
  work: BriefcaseBusiness,
  services: Landmark,
  confidence: UserRoundCheck,
  digital: LockKeyhole,
};

/* The icon tint on each area, cycling through the light tints of the logo's
   colours, as the site's other navy bands do. */
const ACCENTS = ["var(--color-ocean-300)", "var(--color-lagoon-300)", "var(--color-saffron-400)"];

/**
 * Rights & Empowerment, as the page's navy band, in the confident, practical
 * register the brief's design notes ask for. On the left a photograph cut
 * with a leaf corner, with the programme's commitment on a card across its
 * foot, and beneath it why the programme matters and the barriers it names.
 * On the right the programme's headline, its second line in amber and its
 * aim, then its six programme areas and two additional topics as a plain
 * icon list, two to a row: an icon circle, the area's title and the brief's
 * line, with nothing behind them.
 */
export function Rights() {
  const { areas, why, topics, image } = seminarsRights;

  return (
    <section
      id={seminarsRights.id}
      aria-labelledby="rights-title"
      className="relative isolate overflow-clip bg-navy-950 py-band text-white/75"
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-ocean-600/25 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-lagoon-600/15 blur-[140px]"
      />

      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-5">
            {/* Photograph. The padding at the foot is the room the card
                hangs down into. */}
            <div className="relative w-full pb-12 lg:max-w-[34rem]">
              <Reveal variant="image">
                <div className="reveal-clip relative aspect-[5/4] overflow-hidden rounded-[2rem_6rem_2rem_2rem] bg-navy-900">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Photo image={image} sizes="(min-width: 1760px) 544px, (min-width: 1024px) 38vw, 92vw" />
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal
                variant="up"
                delay={320}
                className="absolute bottom-0 left-0 z-10 max-w-[20rem] sm:-left-5 sm:max-w-[24rem]"
              >
                <p className="flex items-start gap-4 rounded-card bg-white p-5 text-[0.875rem] leading-relaxed text-ink shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white">
                    <HandHeart aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  {seminarsRights.commitment}
                </p>
              </Reveal>
            </div>

            <Reveal className="mt-10">
              <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-300">{why.label}</h3>
              <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-white">{why.text}</p>
              <p id="rights-barriers" className="mt-5 text-[0.9375rem] text-white/70">
                {why.barriersLabel}
              </p>
              <ul aria-labelledby="rights-barriers" className="mt-3 space-y-2.5">
                {why.barriers.map((barrier) => (
                  <li key={barrier} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-white">
                    <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-400" />
                    {barrier}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal variant="fade">
              <Kicker tone="dark">{seminarsRights.kicker}</Kicker>
            </Reveal>
            <PhraseTitle
              id="rights-title"
              phrases={seminarsRights.title}
              tone="dark"
              accentTone="saffron"
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 font-display text-[1.5rem] font-light italic leading-snug text-saffron-300 [font-variation-settings:'SOFT'_100]">
                {seminarsRights.tagline}
              </p>
              <p className="mt-4 max-w-2xl text-lead text-white/80">{seminarsRights.lead}</p>
            </Reveal>

            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {areas.map((area, index) => (
                <Item key={area.title} item={area} index={index} />
              ))}
            </ul>

            <Reveal variant="fade" className="mt-9">
              <h3 id="rights-topics" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-300">
                {topics.label}
              </h3>
            </Reveal>
            <ul aria-labelledby="rights-topics" className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {topics.items.map((topic, index) => (
                <Item key={topic.title} item={topic} index={index + areas.length} />
              ))}
            </ul>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function Item({ item, index }: { item: { title: string; line: string; icon: RightsIcon | TopicIcon }; index: number }) {
  const Icon = icons[item.icon];
  return (
    <Reveal
      as="li"
      variant="up"
      delay={150 + (index % 6) * 60}
      style={{ "--accent": ACCENTS[index % ACCENTS.length] } as CSSProperties}
      className="group flex items-start gap-4"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/8 text-(--accent) ring-1 ring-white/10 transition-colors duration-500 ease-out-soft group-hover:bg-white/15">
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <div className="min-w-0 pt-0.5">
        <h4 className="text-[1rem] font-semibold leading-snug text-white">{item.title}</h4>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-white/65">{item.line}</p>
      </div>
    </Reveal>
  );
}

import {
  Baby,
  HeartPulse,
  Languages,
  LifeBuoy,
  ShoppingBasket,
  Signpost,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { refugeeAsylum, type AsylumIcon } from "@/data/refugee-support";
import { AreaKicker } from "../our-work/AreaKicker";
import { Photo } from "../ui/Photo";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<AsylumIcon, LucideIcon> = {
  essentials: ShoppingBasket,
  hardship: LifeBuoy,
  advice: Signpost,
  health: HeartPulse,
  english: Languages,
  integration: UsersRound,
  family: Baby,
};

/**
 * 1. Asylum Seeker Support, on cream: the programme's place among the three
 * and its name, its subtitle as the heading and its two paragraphs, then
 * its seven planned activities as a plain icon list two to a row (an icon
 * circle, the activity's name and the document's line, nothing behind
 * them). Beside it a tall photograph cut with a leaf on its upper right
 * corner, drifting a little inside its frame, with the programme's closing
 * aim on a card across its foot.
 */
export function Asylum() {
  const { items, image } = refugeeAsylum;

  return (
    <section
      id={refugeeAsylum.id}
      aria-labelledby="asylum-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-12 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <AreaKicker number={refugeeAsylum.number} name={refugeeAsylum.kicker} />
            </Reveal>
            <Title
              id="asylum-title"
              lead={refugeeAsylum.titleLead}
              accent={refugeeAsylum.titleAccent}
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lead text-ink">{refugeeAsylum.paragraphs[0]}</p>
              <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-slate">{refugeeAsylum.paragraphs[1]}</p>
              <p
                id="asylum-activities"
                className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink"
              >
                {refugeeAsylum.listLabel}
              </p>
            </Reveal>
            <ul aria-labelledby="asylum-activities" className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {items.map((item, index) => {
                const Icon = icons[item.icon];
                return (
                  <Reveal as="li" key={item.name} delay={(index % 2) * 90} className="group flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-lagoon-600 shadow-[0_12px_26px_-16px_rgb(10_37_64/0.5)] transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="pt-0.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-ink">
                        {item.name}
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate">{item.line}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative mx-auto w-full max-w-md pb-14 lg:col-span-5 lg:max-w-none">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[2rem_8rem_2rem_2rem] bg-sand">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Photo image={image} sizes="(min-width: 1760px) 640px, (min-width: 1024px) 36vw, 448px" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal
              variant="up"
              delay={300}
              className="absolute bottom-0 left-0 z-10 max-w-[19rem] sm:-left-6 sm:max-w-[24rem]"
            >
              <p className="rounded-card bg-white p-5 font-display text-[1.0625rem] leading-snug text-ink shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] [font-variation-settings:'SOFT'_100] sm:text-[1.125rem]">
                {refugeeAsylum.aim}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

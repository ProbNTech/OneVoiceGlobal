import Image from "next/image";
import { HeartHandshake, Megaphone, Route, ShieldCheck, Signpost, UsersRound, type LucideIcon } from "lucide-react";
import { ourWorkWellbeing, type WellbeingIcon } from "@/data/our-work";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { AreaKicker } from "./AreaKicker";

const icons: Record<WellbeingIcon, LucideIcon> = {
  awareness: Megaphone,
  stigma: HeartHandshake,
  peer: UsersRound,
  signposting: Signpost,
  referral: Route,
};

/**
 * 3. Mental Wellbeing and Family Support, in a calm register on sand: a tall
 * photograph cut with a leaf corner on the left; on the right the area's
 * heading, the five kinds of work it may include as a plain icon list (an
 * icon circle and the brief's line, nothing behind them), and the brief's
 * note on specialist support on a white card.
 */
export function Wellbeing() {
  const { image } = ourWorkWellbeing;

  return (
    <section
      id={ourWorkWellbeing.id}
      aria-labelledby="wellbeing-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:grid-cols-12 xl:gap-x-20">
          <Reveal variant="image" className="lg:col-span-5">
            <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
              <div className="reveal-clip relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem_2rem_2rem_8rem] bg-mist lg:max-w-[32rem]">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1920px) 640px, (min-width: 1024px) 34vw, 448px"
                      className="object-cover"
                      style={{ objectPosition: image.position }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <AreaKicker number={ourWorkWellbeing.number} name={ourWorkWellbeing.kicker} />
            </Reveal>
            <Title
              id="wellbeing-title"
              lead={ourWorkWellbeing.titleLead}
              accent={ourWorkWellbeing.titleAccent}
              size="statement"
              className="mt-5"
            />
            <Reveal delay={120}>
              <p
                id="wellbeing-list"
                className="mt-7 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
              >
                {ourWorkWellbeing.listLabel}
              </p>
            </Reveal>
            <ul aria-labelledby="wellbeing-list" className="mt-5 space-y-4">
              {ourWorkWellbeing.items.map((item, index) => {
                const Icon = icons[item.icon];
                return (
                  <Reveal as="li" key={item.text} delay={index * 70} className="group flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-lagoon-600 shadow-[0_12px_26px_-16px_rgb(10_37_64/0.5)] transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-[1rem] leading-relaxed text-ink">{item.text}</span>
                  </Reveal>
                );
              })}
            </ul>
            <Reveal delay={200}>
              <p className="mt-7 flex items-start gap-4 rounded-card bg-white p-5 text-[0.9375rem] leading-relaxed text-slate shadow-[0_20px_44px_-28px_rgb(10_37_64/0.45)]">
                <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-lagoon-600" strokeWidth={1.7} />
                {ourWorkWellbeing.note}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

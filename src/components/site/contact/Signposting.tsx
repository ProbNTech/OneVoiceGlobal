import Image from "next/image";
import type { CSSProperties } from "react";
import {
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  HandCoins,
  HandHeart,
  HeartPulse,
  House,
  Info,
  Landmark,
  Presentation,
  Scale,
  Shield,
  Stethoscope,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { cx } from "@/lib/cx";
import { contactSignposting, type SignpostIcon } from "@/data/contact";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<SignpostIcon, LucideIcon> = {
  employment: BriefcaseBusiness,
  education: GraduationCap,
  training: Presentation,
  housing: House,
  welfare: HandCoins,
  health: Stethoscope,
  wellbeing: HeartPulse,
  safety: Shield,
  legal: Scale,
  immigration: Landmark,
  family: UsersRound,
  community: Building2,
  charities: HandHeart,
};

/* The signs take the logo's three colours in turn, as soft tints. */
const tones = ["bg-lagoon-50 text-lagoon-700", "bg-navy-50 text-ocean-700", "bg-saffron-50 text-saffron-ink"];

/**
 * Information & Signposting: the brief's INFORMATION, ADVICE & SIGNPOSTING
 * block. Beside an arched photograph of an adviser pointing out a leaflet,
 * its heading, its "knowing where to go" line as a statement, and the
 * thirteen areas it signposts to, each set as a small fingerpost sign with
 * its arrow end. The signs light up one after another as the block arrives
 * (`Reveal variant="phrases"`). The brief's note that OneVoice refers on
 * rather than replacing professional advice sits on a card over the
 * photograph's foot.
 */
export function Signposting() {
  const { image } = contactSignposting;

  return (
    <section
      id={contactSignposting.id}
      aria-labelledby="signposting-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:grid-cols-12 xl:gap-x-20">
          <div className="relative lg:col-span-5">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-mist lg:max-w-[34rem]">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1920px) 640px, (min-width: 1024px) 36vw, 448px"
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
              className="relative z-10 mx-auto -mt-16 w-[88%] max-w-sm sm:-mt-20 lg:absolute lg:-bottom-4 lg:-right-6 lg:mt-0 lg:w-[19rem]"
            >
              <p className="flex items-start gap-3 rounded-card bg-white p-5 text-[0.875rem] leading-relaxed text-slate shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-lagoon-600" strokeWidth={1.8} />
                {contactSignposting.note}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{contactSignposting.kicker}</Kicker>
            </Reveal>
            <Title
              id="signposting-title"
              lead={contactSignposting.titleLead}
              accent={contactSignposting.titleAccent}
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl font-display text-[1.625rem] font-light italic leading-snug text-ocean-600 [font-variation-settings:'SOFT'_100] sm:text-[2rem]">
                {contactSignposting.statement}
              </p>
              <p id="signposting-lead" className="mt-6 text-[1.0625rem] text-slate">
                {contactSignposting.lead}
              </p>
            </Reveal>
            <Reveal variant="phrases" delay={200}>
              <ul aria-labelledby="signposting-lead" className="mt-5 flex flex-wrap gap-x-2 gap-y-2.5">
                {contactSignposting.topics.map((topic, index) => {
                  const Icon = icons[topic.icon];
                  return (
                    <li key={topic.label} className="phrase" style={{ "--i": index } as CSSProperties}>
                      {/* The arrow end is a clip: the polygon keeps the whole
                        left edge, so the rounded end there still shows. */}
                      <span
                        className={cx(
                          "inline-flex h-11 items-center gap-2.5 rounded-l-full pl-4 pr-8 text-[0.9375rem] font-semibold [clip-path:polygon(0_0,calc(100%-1.1rem)_0,100%_50%,calc(100%-1.1rem)_100%,0_100%)]",
                          tones[index % tones.length],
                        )}
                      >
                        <Icon aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                        {topic.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

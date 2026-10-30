import Image from "next/image";
import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Rocket,
  Sparkles,
  UsersRound,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { getInvolvedDonate, type DonationIcon } from "@/data/get-involved";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<DonationIcon, LucideIcon> = {
  training: GraduationCap,
  digital: Wifi,
  materials: BookOpen,
  mentoring: UsersRound,
  activities: Sparkles,
  employment: BriefcaseBusiness,
  youth: Rocket,
  wellbeing: HeartPulse,
};

/**
 * Donate. The eight things a donation can help provide, as an icon list two
 * to a row, beside the page's one orange card: a photograph of a volunteer
 * handing over a parcel, the brief's line on what every contribution can do,
 * and its [Donate Now] call.
 */
export function Donate() {
  const { cta, image } = getInvolvedDonate;

  return (
    <section
      id={getInvolvedDonate.id}
      aria-labelledby="donate-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{getInvolvedDonate.kicker}</Kicker>
            </Reveal>
            <Title
              id="donate-title"
              lead={getInvolvedDonate.titleLead}
              accent={getInvolvedDonate.titleAccent}
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 text-lead text-slate">{getInvolvedDonate.lead}</p>
            </Reveal>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {getInvolvedDonate.items.map((item, index) => {
                const Icon = icons[item.icon];
                return (
                  <Reveal
                    as="li"
                    key={item.label}
                    variant="up"
                    delay={200 + index * 60}
                    className="group flex items-center gap-4"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-saffron-ink shadow-[0_10px_24px_-14px_rgb(10_37_64/0.45)] transition-colors duration-500 group-hover:bg-saffron-500 group-hover:text-white">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-[1rem] font-semibold leading-snug text-ink">{item.label}</span>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          <Reveal variant="up" delay={150} className="lg:col-span-5">
            <div className="relative isolate overflow-hidden rounded-panel bg-saffron-500 p-4 text-white shadow-[0_40px_80px_-50px_rgb(138_91_12/0.9)] sm:p-5">
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-saffron-300/70 blur-[80px]"
              />
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-saffron-400">
                <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1760px) 600px, (min-width: 1024px) 38vw, 92vw"
                    className="object-cover"
                    style={{ objectPosition: image.position }}
                  />
                </div>
              </div>
              <div className="px-3 pb-4 pt-7 sm:px-5 sm:pb-5">
                <HandHeart aria-hidden="true" className="h-8 w-8 text-white" strokeWidth={1.4} />
                <p className="mt-4 font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.2] text-white [font-variation-settings:'SOFT'_100]">
                  {getInvolvedDonate.closing}
                </p>
                <Cta href={cta.href} className="mt-7">
                  {cta.label}
                </Cta>
              </div>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

import Image from "next/image";
import {
  Brain,
  Gavel,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Landmark,
  Languages,
  PiggyBank,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { seminarsWorkWithUs, type SeminarPartnerIcon } from "@/data/seminars";
import { logo } from "@/data/site";
import { Photo } from "../ui/Photo";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<SeminarPartnerIcon, LucideIcon> = {
  legal: Gavel,
  mental: Brain,
  finance: PiggyBank,
  safeguarding: ShieldCheck,
  family: UsersRound,
  languages: Languages,
  faith: HeartHandshake,
  education: GraduationCap,
  public: Landmark,
  funders: HandCoins,
};

/**
 * Work With Us: a photograph of a counsellor and a community leader
 * planning a workshop, cut with a leaf corner, with the overview's question
 * on a card over its foot. Beside it the block's heading, the overview's
 * welcome to enquiries and ten of the partners the programmes name, as a
 * plain icon list two to a row (an icon circle and the partner, nothing
 * behind them), then the opportunities it lists, its close
 * and the call to become a partner.
 */
export function WorkWithUs() {
  const { partners, image } = seminarsWorkWithUs;

  return (
    <section
      id={seminarsWorkWithUs.id}
      aria-labelledby="seminars-work-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative order-2 w-full pb-10 lg:order-1 lg:col-span-5 lg:max-w-[34rem]">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[2rem_8rem_2rem_2rem] bg-sand">
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
              className="absolute bottom-0 left-0 z-10 max-w-[18rem] sm:-left-5 sm:max-w-[22rem]"
            >
              <div className="flex items-center gap-4 rounded-card bg-white p-5 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-11 w-auto shrink-0"
                />
                <span className="font-display text-[1.125rem] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
                  {seminarsWorkWithUs.question}
                </span>
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{seminarsWorkWithUs.kicker}</Kicker>
            </Reveal>
            <Title
              id="seminars-work-title"
              lead={seminarsWorkWithUs.titleLead}
              accent={seminarsWorkWithUs.titleAccent}
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 max-w-2xl text-lead text-slate">{seminarsWorkWithUs.lead}</p>
            </Reveal>

            <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {partners.map((partner, index) => {
                const Icon = icons[partner.icon];
                return (
                  <Reveal
                    as="li"
                    key={partner.label}
                    delay={150 + (index % 4) * 60}
                    className="group flex items-center gap-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lagoon-50 text-lagoon-600 transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-[0.9375rem] font-semibold leading-snug text-ink">{partner.label}</span>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={150}>
              <p
                id="seminars-opportunities"
                className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink"
              >
                {seminarsWorkWithUs.opportunitiesLabel}
              </p>
              <ul aria-labelledby="seminars-opportunities" className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {seminarsWorkWithUs.opportunities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-display text-[1.125rem] leading-snug text-ink [font-variation-settings:'SOFT'_100]"
                  >
                    <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-slate">{seminarsWorkWithUs.closing}</p>
              <Cta href={seminarsWorkWithUs.cta.href} className="mt-8">
                {seminarsWorkWithUs.cta.label}
              </Cta>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

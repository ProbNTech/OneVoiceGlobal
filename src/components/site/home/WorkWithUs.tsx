import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  GraduationCap,
  HandCoins,
  Handshake,
  Landmark,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { homeWorkWithUs, type PartnerIcon } from "@/data/home";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<PartnerIcon, LucideIcon> = {
  employers: BriefcaseBusiness,
  training: GraduationCap,
  community: UsersRound,
  public: Landmark,
  funders: HandCoins,
  businesses: Building2,
};

/**
 * Work With Us, set in one rounded panel: the six partner types as a
 * list, two to a row, on the left, and on the right a photograph carrying the brief's
 * PARTNER WITH ONEVOICE block (its eight commitments and the call to act).
 */
export function WorkWithUs() {
  const { card } = homeWorkWithUs;

  return (
    <section aria-labelledby="work-title" className="relative isolate overflow-clip bg-white py-band">
      <Shell>
        <div className="rounded-[2.5rem] bg-sand p-6 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal variant="fade">
                <Kicker>{homeWorkWithUs.kicker}</Kicker>
              </Reveal>
              <Title
                id="work-title"
                lead={homeWorkWithUs.titleLead}
                accent={homeWorkWithUs.titleAccent}
                className="mt-5"
              />
              <Reveal delay={150}>
                <p className="mt-6 max-w-lg text-lead text-slate">{homeWorkWithUs.description}</p>
              </Reveal>

              {/* Two to a row. */}
              <ul className="mt-8 grid gap-y-7 sm:grid-cols-2 sm:gap-x-8">
                {homeWorkWithUs.partners.map((partner, index) => {
                  const Icon = icons[partner.icon];
                  return (
                    <Reveal as="li" key={partner.title} variant="up" delay={index * 70}>
                      <Link href={partner.href} className="group flex h-full items-center gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors duration-500 group-hover:bg-lagoon-600">
                          <Icon className="h-5 w-5" strokeWidth={1.6} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink">
                            {partner.title}
                          </span>
                          <span className="mt-1 block text-[0.9375rem] text-slate">{partner.line}</span>
                        </span>
                        <ArrowUpRight className="h-5 w-5 shrink-0 -translate-x-2 text-lagoon-600 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </Reveal>
                  );
                })}
              </ul>
            </div>

            <Reveal variant="image" delay={150} className="lg:col-span-5">
              <div className="reveal-clip group relative isolate flex h-full min-h-[30rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-navy-950 p-8 text-white sm:p-10 lg:p-12">
                <div className="reveal-media absolute inset-0 -z-20">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={card.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover transition-transform duration-[2s] ease-out-soft group-hover:scale-105"
                      style={{ objectPosition: card.image.position }}
                    />
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(6_26_48/0.35)_0%,rgb(6_26_48/0.72)_40%,rgb(6_26_48/0.92)_100%)]"
                />

                <Handshake className="h-9 w-9 text-saffron-300" strokeWidth={1.3} />
                <p className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-saffron-300">
                  {card.kicker}
                </p>
                <h3 className="mt-3 max-w-md font-display text-[2.125rem] leading-[1.1] text-white [font-variation-settings:'SOFT'_100] sm:text-[2.5rem]">
                  {card.title}
                </h3>
                <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-white/80">{card.description}</p>
                <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {card.commitments.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.9375rem] text-white">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-saffron-500 text-navy-950">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Cta href={card.cta.href} variant="saffron" className="mt-9 self-start">
                  {card.cta.label}
                </Cta>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

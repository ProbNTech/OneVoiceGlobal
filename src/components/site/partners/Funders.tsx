import Image from "next/image";
import {
  Building,
  Building2,
  Check,
  Globe,
  HandCoins,
  HandHeart,
  Landmark,
  Scale,
  Sprout,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { cx } from "@/lib/cx";
import { partnersFunders, type FunderIcon } from "@/data/partners";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<FunderIcon, LucideIcon> = {
  foundations: HandCoins,
  trusts: Scale,
  authorities: Landmark,
  government: Building2,
  corporate: Building,
  philanthropy: HandHeart,
  community: UsersRound,
  impact: Globe,
};

/**
 * Funders & Social Impact Partners, in one rounded sand panel (ELA's Quality
 * Assurance block): the eight kinds of funder the brief names as an icon
 * list, two to a row, on the left; on the right a photograph carrying what
 * funding can support and the brief's [Partner With Us] call. Beneath the
 * panel, the brief's "Invest in Opportunity" close, its six words set large
 * across the band.
 */
export function Funders() {
  const { card } = partnersFunders;

  return (
    <section
      id={partnersFunders.id}
      aria-labelledby="funders-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="rounded-[2.5rem] bg-sand p-6 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal variant="fade">
                <Kicker>{partnersFunders.kicker}</Kicker>
              </Reveal>
              <Title
                id="funders-title"
                lead={partnersFunders.titleLead}
                accent={partnersFunders.titleAccent}
                inline
                className="mt-5"
              />
              <Reveal delay={150}>
                <p className="mt-6 max-w-lg text-lead text-slate">{partnersFunders.lead}</p>
              </Reveal>

              <ul className="mt-7 grid gap-y-3 sm:mt-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
                {partnersFunders.funders.map((funder, index) => {
                  const Icon = icons[funder.icon];
                  return (
                    <Reveal
                      as="li"
                      key={funder.label}
                      variant="up"
                      delay={index * 60}
                      className="group flex items-center gap-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors duration-500 group-hover:bg-lagoon-600 sm:h-12 sm:w-12">
                        <Icon aria-hidden="true" className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.6} />
                      </span>
                      <span className="text-[0.9375rem] font-semibold leading-snug text-ink sm:text-[1rem]">
                        {funder.label}
                      </span>
                    </Reveal>
                  );
                })}
              </ul>
            </div>

            <Reveal variant="image" delay={150} className="lg:col-span-5">
              <div className="reveal-clip group relative isolate flex h-full min-h-[30rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-navy-950 p-8 text-white sm:p-10">
                <div className="reveal-media absolute inset-0 -z-20">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      sizes="(min-width: 1760px) 640px, (min-width: 1024px) 38vw, 100vw"
                      className="object-cover transition-transform duration-[2s] ease-out-soft group-hover:scale-105"
                      style={{ objectPosition: card.image.position }}
                    />
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(6_26_48/0.25)_0%,rgb(6_26_48/0.7)_40%,rgb(6_26_48/0.94)_100%)]"
                />

                <Sprout aria-hidden="true" className="h-9 w-9 icon-orange" strokeWidth={1.3} />
                <p className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-orange">
                  {card.kicker}
                </p>
                <h3 className="mt-3 font-display text-[2rem] leading-[1.1] text-white [font-variation-settings:'SOFT'_100] sm:text-[2.25rem]">
                  {card.title}
                </h3>
                <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {card.supports.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.9375rem] text-white">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-orange text-white">
                        <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
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

        {/* "Your support can help people access: Skills. Employment. ..." The
            words carry their own full stops, so they alternate upright and
            italic rather than taking separators. */}
        <Reveal className="mt-8 text-center lg:mt-10">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.22em] text-orange-ink">{card.lead}</p>
          <p className="mx-auto mt-4 max-w-6xl font-display text-[clamp(1.625rem,3vw,2.75rem)] leading-[1.25] tracking-[-0.015em] [font-variation-settings:'SOFT'_100]">
            {card.outcomes.map((word, index) => (
              <span key={word}>
                {index > 0 ? " " : null}
                <span
                  className={cx(
                    "whitespace-nowrap",
                    index % 2 === 0 ? "text-ink" : "font-light italic text-lagoon-600",
                  )}
                >
                  {word}
                </span>
              </span>
            ))}
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

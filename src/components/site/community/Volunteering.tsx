import Image from "next/image";
import {
  BriefcaseBusiness,
  CalendarCheck,
  ClipboardList,
  HandCoins,
  HandHeart,
  HeartHandshake,
  Languages,
  Megaphone,
  MessagesSquare,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { communityVolunteering, type VolunteerIcon } from "@/data/community";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<VolunteerIcon, LucideIcon> = {
  mentoring: UsersRound,
  digital: MonitorSmartphone,
  employment: BriefcaseBusiness,
  admin: ClipboardList,
  outreach: Megaphone,
  events: CalendarCheck,
  enterprise: Rocket,
  translation: Languages,
  fundraising: HandCoins,
  communications: MessagesSquare,
  peer: HeartHandshake,
};

/**
 * Volunteering, in one rounded sand panel (ELA's Quality Assurance block):
 * the eleven ways volunteers can help as an icon list, two to a row, on the
 * left, and on the right a photograph of volunteers at work carrying the
 * brief's "Volunteer your expertise" and the call to volunteer, with the
 * block's note on safeguarding set above the button.
 */
export function Volunteering() {
  const { card } = communityVolunteering;

  return (
    <section
      id={communityVolunteering.id}
      aria-labelledby="volunteering-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="rounded-[2.5rem] bg-sand p-6 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal variant="fade">
                <Kicker>{communityVolunteering.kicker}</Kicker>
              </Reveal>
              <Title
                id="volunteering-title"
                lead={communityVolunteering.titleLead}
                accent={communityVolunteering.titleAccent}
                className="mt-5"
              />
              <Reveal delay={150}>
                <p className="mt-6 max-w-lg text-lead text-slate">{communityVolunteering.lead}</p>
              </Reveal>

              <ul className="mt-7 grid gap-y-3 sm:mt-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
                {communityVolunteering.roles.map((role, index) => {
                  const Icon = icons[role.icon];
                  return (
                    <Reveal
                      as="li"
                      key={role.label}
                      variant="up"
                      delay={index * 60}
                      className="group flex items-center gap-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors duration-500 group-hover:bg-lagoon-600 sm:h-12 sm:w-12">
                        <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.6} />
                      </span>
                      <span className="text-[0.9375rem] font-semibold sm:text-[1rem] leading-snug text-ink">
                        {role.label}
                      </span>
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
                  className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(6_26_48/0.2)_0%,rgb(6_26_48/0.65)_42%,rgb(6_26_48/0.93)_100%)]"
                />

                <HandHeart aria-hidden="true" className="h-9 w-9 icon-orange" strokeWidth={1.3} />
                <p className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-orange">
                  {card.kicker}
                </p>
                <h3 className="mt-3 max-w-md font-display text-[2.125rem] leading-[1.1] text-white [font-variation-settings:'SOFT'_100] sm:text-[2.5rem]">
                  {card.title}
                </h3>
                <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-white/85">{card.line}</p>
                <p className="mt-6 flex max-w-md gap-3 text-[0.9375rem] leading-relaxed text-white/70">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 icon-orange" strokeWidth={1.6} />
                  {card.note}
                </p>
                <Cta href={card.cta.href} variant="saffron" className="mt-8 self-start">
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

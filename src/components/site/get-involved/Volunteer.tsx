import Image from "next/image";
import type { CSSProperties } from "react";
import {
  BriefcaseBusiness,
  CalendarCheck,
  ClipboardList,
  HandCoins,
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
import { getInvolvedVolunteer, type RoleIcon } from "@/data/get-involved";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<RoleIcon, LucideIcon> = {
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

/* The icon tint on each role, cycling through the light tints of the logo's
   colours, as the site's other navy panels do. */
const ACCENTS = ["var(--color-ocean-300)", "var(--color-lagoon-300)", "var(--color-saffron-400)"];

/**
 * Volunteer, as the page's navy band: a photograph of volunteers out in the
 * neighbourhood on the left, with the brief's note on recruitment and
 * safeguarding on a card across its foot; on the right the eleven ways
 * volunteers can give their time, two to a row, and the call to register.
 */
export function Volunteer() {
  const { image } = getInvolvedVolunteer;

  return (
    <section
      id={getInvolvedVolunteer.id}
      aria-labelledby="volunteer-title"
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
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative w-full pb-10 lg:col-span-5 lg:max-w-[34rem]">
            <Reveal variant="image">
              <div className="reveal-clip relative aspect-[5/4] overflow-hidden rounded-[2rem_6rem_2rem_2rem] bg-navy-900">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1760px) 544px, (min-width: 1024px) 38vw, 92vw"
                      className="object-cover"
                      style={{ objectPosition: image.position }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal
              variant="up"
              delay={320}
              className="absolute bottom-0 left-0 z-10 max-w-[19rem] sm:-left-5 sm:max-w-[22rem]"
            >
              <p className="flex items-start gap-4 rounded-card bg-white p-5 text-[0.875rem] leading-relaxed text-slate shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white">
                  <ShieldCheck aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                {getInvolvedVolunteer.note}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker tone="dark">{getInvolvedVolunteer.kicker}</Kicker>
            </Reveal>
            <Title
              id="volunteer-title"
              lead={getInvolvedVolunteer.titleLead}
              accent={getInvolvedVolunteer.titleAccent}
              tone="dark"
              accentTone="saffron"
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 max-w-xl text-lead text-white/80">{getInvolvedVolunteer.lead}</p>
            </Reveal>

            <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2 sm:gap-y-4">
              {getInvolvedVolunteer.roles.map((role, index) => {
                const Icon = icons[role.icon];
                return (
                  <Reveal
                    as="li"
                    key={role.label}
                    variant="up"
                    delay={200 + index * 50}
                    style={{ "--accent": ACCENTS[index % ACCENTS.length] } as CSSProperties}
                    className="group flex items-center gap-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/8 text-(--accent) ring-1 ring-white/10 transition-colors duration-500 ease-out-soft group-hover:bg-white/15">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-[1rem] font-semibold leading-snug text-white">{role.label}</span>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={150} className="mt-9">
              <Cta href={getInvolvedVolunteer.cta.href} variant="saffron">
                {getInvolvedVolunteer.cta.label}
              </Cta>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

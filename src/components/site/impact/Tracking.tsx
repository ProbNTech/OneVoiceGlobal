import type { CSSProperties } from "react";
import {
  BriefcaseBusiness,
  CalendarHeart,
  Clock,
  FileText,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartPulse,
  Lightbulb,
  MonitorSmartphone,
  Rocket,
  Store,
  UserRoundCheck,
  Users,
  UsersRound,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { impactTracking, type TrackIcon } from "@/data/impact";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<TrackIcon, LucideIcon> = {
  engaged: Users,
  participants: UserRoundCheck,
  hours: Clock,
  skills: Lightbulb,
  digital: MonitorSmartphone,
  cvs: FileText,
  employment: BriefcaseBusiness,
  progression: GraduationCap,
  enterprise: Rocket,
  businesses: Store,
  mentoring: UsersRound,
  wellbeing: HeartPulse,
  referrals: Waypoints,
  volunteers: HandHeart,
  employers: Handshake,
  community: CalendarHeart,
};

/* The icon tint on each measure, cycling through the light tints of the
   logo's colours, as the site's other navy bands do. */
const ACCENTS = ["var(--color-ocean-300)", "var(--color-lagoon-300)", "var(--color-saffron-400)"];

/**
 * What We Track, as the page's navy band: the heading beside the block's
 * opening sentence, then the sixteen things OneVoice will track as a plain
 * icon list, two to a row on phones and four on large screens: an icon
 * circle in one of the logo's light tints and the measure's name, with
 * nothing behind them and no figures, which the brief does not give yet.
 */
export function Tracking() {
  return (
    <section
      id={impactTracking.id}
      aria-labelledby="tracking-title"
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
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <Kicker tone="dark">{impactTracking.kicker}</Kicker>
            </Reveal>
            <Title
              id="tracking-title"
              lead={impactTracking.titleLead}
              accent={impactTracking.titleAccent}
              tone="dark"
              accentTone="saffron"
              inline
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-6 lg:pb-2">
            <p id="tracking-lead" className="max-w-xl text-lead text-white/80">
              {impactTracking.lead}
            </p>
          </Reveal>
        </div>

        <ul
          aria-labelledby="tracking-lead"
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-8 lg:mt-12 lg:grid-cols-4 lg:gap-y-6"
        >
          {impactTracking.measures.map((measure, index) => {
            const Icon = icons[measure.icon];
            return (
              <Reveal
                as="li"
                key={measure.label}
                variant="up"
                delay={(index % 4) * 70 + Math.floor(index / 4) * 50}
                style={{ "--accent": ACCENTS[index % ACCENTS.length] } as CSSProperties}
                className="group flex items-center gap-3 sm:gap-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/8 text-(--accent) ring-1 ring-white/10 transition-colors duration-500 ease-out-soft group-hover:bg-white/15 sm:h-12 sm:w-12">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="text-[0.9375rem] font-semibold leading-snug text-white sm:text-[1.0625rem]">
                  {measure.label}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </Shell>
    </section>
  );
}

import type { CSSProperties } from "react";
import {
  Handshake,
  Building,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Landmark,
  Store,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { iftarAttend, type AttendIcon } from "@/data/iftar";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<AttendIcon, LucideIcon> = {
  residents: UsersRound,
  faith: HeartHandshake,
  charities: HandHeart,
  business: Store,
  public: Landmark,
  education: GraduationCap,
  corporate: Building,
  volunteers: Handshake,
};

/* The icon tint on each guest, cycling through the light tints of the logo's
   colours, as the site's other navy bands do. */
const ACCENTS = ["var(--color-ocean-300)", "var(--color-lagoon-300)", "var(--color-saffron-400)"];

/**
 * Who Should Attend?, as the page's navy band: the heading and the
 * document's lead on the left, with its closing line on inclusion in the
 * orange gradient; on the right the eight kinds of guest as a plain icon
 * list, two to a row (an icon circle in one of the logo's light tints and
 * the guest, nothing behind them).
 */
export function Attend() {
  return (
    <section
      id={iftarAttend.id}
      aria-labelledby="iftar-attend-title"
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
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Kicker tone="dark">{iftarAttend.kicker}</Kicker>
            </Reveal>
            <Title
              id="iftar-attend-title"
              lead={iftarAttend.titleLead}
              accent={iftarAttend.titleAccent}
              tone="dark"
              accentTone="saffron"
              inline
              className="mt-5"
            />
            <Reveal delay={150}>
              <p id="iftar-attend-lead" className="mt-6 text-lead text-white/80">
                {iftarAttend.lead}
              </p>
              <p className="mt-7 font-display text-[1.375rem] italic font-light leading-snug text-orange [font-variation-settings:'SOFT'_100] sm:text-[1.5rem]">
                {iftarAttend.closing}
              </p>
            </Reveal>
          </div>

          <ul aria-labelledby="iftar-attend-lead" className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-7 lg:pt-3">
            {iftarAttend.guests.map((guest, index) => {
              const Icon = icons[guest.icon];
              return (
                <Reveal
                  as="li"
                  key={guest.label}
                  variant="up"
                  delay={150 + index * 55}
                  style={{ "--accent": ACCENTS[index % ACCENTS.length] } as CSSProperties}
                  className="group flex items-center gap-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/8 text-(--accent) ring-1 ring-white/10 transition-colors duration-500 ease-out-soft group-hover:bg-white/15">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="text-[1rem] font-semibold leading-snug text-white">{guest.label}</span>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Shell>
    </section>
  );
}

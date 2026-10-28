import {
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  HandCoins,
  HandHeart,
  HeartHandshake,
  Laptop,
  Lightbulb,
  Sprout,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { partnersCorporate, type CorporateIcon } from "@/data/partners";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<CorporateIcon, LucideIcon> = {
  sponsorship: HandCoins,
  volunteering: HandHeart,
  skills: Lightbulb,
  mentoring: UsersRound,
  employment: BriefcaseBusiness,
  training: GraduationCap,
  equipment: Laptop,
  events: CalendarDays,
  investment: Sprout,
  responsibility: HeartHandshake,
};

/**
 * Corporate Partnerships. The title and the brief's lead-in hold the left;
 * the ten ways companies can support OneVoice fill the right, each a filled
 * teal circle with its icon and a ring that draws itself round it as it
 * arrives (`.ring-draw`, the home page's journey circles), its name set
 * beneath in spaced capitals.
 */
export function Corporate() {
  return (
    <section
      id={partnersCorporate.id}
      aria-labelledby="corporate-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Kicker>{partnersCorporate.kicker}</Kicker>
            </Reveal>
            <Title
              id="corporate-title"
              lead={partnersCorporate.titleLead}
              accent={partnersCorporate.titleAccent}
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 text-lead text-slate">{partnersCorporate.lead}</p>
            </Reveal>
          </div>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-5 lg:gap-y-11 lg:self-center">
            {partnersCorporate.items.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <Reveal as="li" key={item.label} variant="up" delay={(index % 5) * 90} className="group text-center">
                  <span
                    aria-hidden="true"
                    className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-lagoon-600 text-white shadow-[0_18px_36px_-18px_rgb(14_122_118/0.8)] transition-[translate,background-color] duration-700 ease-out-soft group-hover:-translate-y-1.5 group-hover:bg-ink"
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] -rotate-90 text-lagoon-600/45 transition-transform duration-700 ease-out-soft group-hover:scale-110"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        pathLength={100}
                        strokeDasharray="100"
                        vectorEffect="non-scaling-stroke"
                        className="ring-draw"
                      />
                    </svg>
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <p className="mx-auto mt-5 max-w-[11rem] text-[0.8125rem] font-bold uppercase leading-snug tracking-[0.12em] text-ink">
                    {item.label}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Shell>
    </section>
  );
}

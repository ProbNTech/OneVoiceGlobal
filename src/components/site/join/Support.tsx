import {
  BriefcaseBusiness,
  GraduationCap,
  HeartHandshake,
  Languages,
  MonitorSmartphone,
  Rocket,
  Sprout,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { joinSupport, type JoinSupportIcon } from "@/data/join";
import { ArrowLink, Band, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<JoinSupportIcon, LucideIcon> = {
  skills: GraduationCap,
  employability: BriefcaseBusiness,
  digital: MonitorSmartphone,
  enterprise: Rocket,
  english: Languages,
  mentoring: UsersRound,
  wellbeing: Sprout,
  community: HeartHandshake,
};

/**
 * How OneVoice can support you: the home page's eight programme lines as a
 * plain icon list, two to a row on large screens, so the page stays short.
 * No card, tile or hairline behind a row: an icon circle with the title and
 * one line beside it, as the design rules ask for a simple list.
 */
export function Support() {
  return (
    <Band tone="white" labelledBy="join-support-title">
      <Shell>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="fade" className="flex justify-center">
            <Kicker>{joinSupport.kicker}</Kicker>
          </Reveal>
          <Title
            id="join-support-title"
            lead={joinSupport.titleLead}
            accent={joinSupport.titleAccent}
            inline
            className="mt-5"
          />
        </div>

        <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-x-12 gap-y-7 sm:grid-cols-2 lg:mt-10">
          {joinSupport.items.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} as="li" delay={(index % 2) * 90} className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white transition-colors duration-500">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span>
                  <span className="block text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-ink">
                    {item.title}
                  </span>
                  <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-slate">{item.line}</span>
                </span>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120} className="mx-auto mt-9 flex max-w-3xl flex-col items-center gap-5 text-center">
          <p className="text-[0.875rem] leading-relaxed text-ink-muted">{joinSupport.note}</p>
          <ArrowLink href={joinSupport.cta.href}>{joinSupport.cta.label}</ArrowLink>
        </Reveal>
      </Shell>
    </Band>
  );
}

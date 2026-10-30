import Link from "next/link";
import {
  Briefcase,
  CalendarDays,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Laptop,
  Lightbulb,
  ShieldCheck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { newsTopics, type TopicIcon } from "@/data/news";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<TopicIcon, LucideIcon> = {
  employment: Briefcase,
  training: GraduationCap,
  digital: Laptop,
  enterprise: Lightbulb,
  women: HeartHandshake,
  safety: ShieldCheck,
  financial: Wallet,
  community: Users,
  events: CalendarDays,
  partners: Handshake,
};

/**
 * Resources by topic, on navy: the block's line for Resources as the title
 * and its ten topics as a plain icon list, five to a row on large screens,
 * each linking to the part of the site that covers it. No tiles: an icon
 * circle with its label beside it, the circle lighting up on hover.
 */
export function Topics() {
  return (
    <section
      id={newsTopics.id}
      aria-labelledby="news-topics-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-navy-950 py-band text-white"
    >
      <div
        aria-hidden="true"
        className="absolute -left-32 -top-48 -z-10 h-[30rem] w-[30rem] rounded-full bg-ocean-600/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -right-24 -z-10 h-[26rem] w-[26rem] rounded-full bg-lagoon-600/20 blur-[130px]"
      />

      <Shell>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal variant="fade" className="flex justify-center">
            <Kicker tone="dark">{newsTopics.kicker}</Kicker>
          </Reveal>
          <Title
            id="news-topics-title"
            lead={newsTopics.titleLead}
            accent={newsTopics.titleAccent}
            tone="dark"
            accentTone="saffron"
            className="mt-5"
          />
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-5">
          {newsTopics.topics.map((topic, index) => {
            const Icon = icons[topic.icon];
            return (
              <Reveal as="li" key={topic.label} delay={index * 60}>
                <Link href={topic.href} className="group flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/8 icon-orange ring-1 ring-white/10 transition-colors duration-500 group-hover:bg-orange group-hover:text-white">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="text-[1rem] font-semibold leading-snug text-white">{topic.label}</span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Shell>
    </section>
  );
}

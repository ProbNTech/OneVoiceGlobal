import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
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
import { homeProgrammes, type HomeProgramme, type ProgrammeIcon } from "@/data/home";
import { ArrowLink, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<ProgrammeIcon, LucideIcon> = {
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
 * Our Core Programmes. An introduction beside a large photograph, then the
 * eight programmes: a photograph with an icon tab over its corner, and the
 * programme's name and the brief's line set beneath it.
 */
export function Programmes() {
  const { feature } = homeProgrammes;

  return (
    <section aria-labelledby="programmes-title" className="relative isolate overflow-clip bg-cream py-band">
      <Shell>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <Kicker>{homeProgrammes.kicker}</Kicker>
            </Reveal>
            <Title
              id="programmes-title"
              lead={homeProgrammes.titleLead}
              accent={homeProgrammes.titleAccent}
              className="mt-5"
            />
            <Reveal delay={150}>
              {homeProgrammes.description.map((paragraph) => (
                <p key={paragraph} className="mt-6 text-lead text-slate">
                  {paragraph}
                </p>
              ))}
              <ArrowLink href={homeProgrammes.cta.href} className="mt-8">
                {homeProgrammes.cta.label}
              </ArrowLink>
            </Reveal>
          </div>

          <Reveal variant="image" delay={100} className="lg:col-span-6">
            <div className="reveal-clip relative aspect-[4/3] overflow-hidden rounded-panel shadow-[0_50px_90px_-50px_rgb(10_37_64/0.6)]">
              <div className="reveal-media absolute inset-0">
                <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                  <Image
                    src={feature.src}
                    alt={feature.alt}
                    fill
                    sizes="(min-width: 1360px) 760px, (min-width: 1024px) 56vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: feature.position }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Phones swipe through the cards; the top padding keeps the icon tabs clear of the row's clip. */}
        <ul className="scrollbar-none -mx-(--gutter) mt-8 flex snap-x snap-mandatory scroll-px-(--gutter) gap-5 overflow-x-auto px-(--gutter) pb-6 pt-6 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:overflow-visible sm:p-0 lg:mt-14 lg:grid-cols-4">
          {homeProgrammes.items.map((programme, index) => (
            <Reveal
              as="li"
              key={programme.title}
              delay={(index % 4) * 90}
              className="w-[82vw] max-w-sm shrink-0 snap-start sm:w-auto sm:max-w-none"
            >
              <ProgrammeCard programme={programme} />
            </Reveal>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

function ProgrammeCard({ programme }: { programme: HomeProgramme }) {
  const Icon = icons[programme.icon];
  return (
    <Link href={programme.href} className="group relative block">
      {/* The icon tab sits over the photograph's top edge. */}
      <span className="absolute -top-5 left-5 z-10 grid h-12 w-12 place-items-center rounded-xl bg-orange text-white shadow-[0_12px_24px_-12px_rgb(10_37_64/0.6)] transition-transform duration-700 ease-out-soft group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
        <Icon className="h-5.5 w-5.5" strokeWidth={1.7} />
      </span>

      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-sand shadow-[0_30px_60px_-40px_rgb(10_37_64/0.55)]">
        <div className="parallax absolute inset-x-0 -inset-y-[8%]">
          <Image
            src={programme.image.src}
            alt={programme.image.alt}
            fill
            sizes="(min-width: 1920px) 440px, (min-width: 1024px) 23vw, (min-width: 640px) 50vw, 82vw"
            className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.08]"
            style={{ objectPosition: programme.image.position }}
          />
        </div>
        <span className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4.5 w-4.5" />
        </span>
      </div>

      {/* The copy sits straight on the band, no card behind it. */}
      <h3 className="mt-6 text-[0.9375rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors duration-500 group-hover:text-lagoon-600">
        {programme.title}
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{programme.line}</p>
    </Link>
  );
}

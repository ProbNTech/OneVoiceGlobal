import Image from "next/image";
import {
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  Mail,
  MessageCircle,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import { programmesEducation, type EnglishIcon } from "@/data/programmes-page";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";

const icons: Record<EnglishIcon, LucideIcon> = {
  everyday: MessageCircle,
  workplace: BriefcaseBusiness,
  employment: FileText,
  digital: Mail,
  conversation: MessagesSquare,
  pathways: GraduationCap,
};

/**
 * Education & English, in ELA's "What We Deliver" style (as the home page's
 * programmes): the brief's Education & Skills Development block beside a
 * large photograph of a class, its sixteen training areas set as running
 * text and its note on accreditation on a card over the photograph's foot.
 * Under them, the brief's English & Communication block: its heading and
 * line, then its six strands as an icon list, three to a row.
 */
export function Education() {
  const { english, image } = programmesEducation;

  return (
    <section
      id={programmesEducation.id}
      aria-labelledby="education-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <Kicker>{programmesEducation.kicker}</Kicker>
            </Reveal>
            <Title
              id="education-title"
              lead={programmesEducation.titleLead}
              accent={programmesEducation.titleAccent}
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-lead text-slate">{programmesEducation.lead}</p>
              <p
                id="training-areas"
                className="mt-7 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
              >
                {programmesEducation.listLabel}
              </p>
              <RunList
                items={programmesEducation.areas}
                labelledBy="training-areas"
                className="mt-3 max-w-2xl text-[1.0625rem] leading-[1.9] text-ink"
              />
            </Reveal>
          </div>

          <div className="relative lg:col-span-6">
            <Reveal variant="image">
              <div className="drop-shadow-[0_34px_40px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/3] overflow-hidden rounded-[2rem_2rem_8rem_2rem] bg-sand">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1920px) 880px, (min-width: 1024px) 46vw, 100vw"
                        className="object-cover"
                        style={{ objectPosition: image.position }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal
              variant="up"
              delay={300}
              className="relative z-10 -mt-14 ml-4 max-w-sm sm:absolute sm:-bottom-6 sm:left-6 sm:mt-0 sm:ml-0"
            >
              <p className="flex items-start gap-3 rounded-card bg-white p-5 text-[0.9375rem] leading-relaxed text-ink shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-saffron-500 text-ink">
                  <GraduationCap aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                {programmesEducation.note}
              </p>
            </Reveal>
          </div>
        </div>

        {/* English & Communication */}
        <div id={english.id} className="mt-14 scroll-mt-28 lg:mt-20">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-6">
              <Reveal variant="fade">
                <Kicker>{english.kicker}</Kicker>
              </Reveal>
              <Reveal
                as="h3"
                id="english-title"
                delay={80}
                className="mt-4 font-display text-statement text-ink [font-variation-settings:'SOFT'_100]"
              >
                {english.title}
              </Reveal>
            </div>
            <Reveal delay={160} className="lg:col-span-6 lg:pb-1.5">
              <p className="max-w-xl text-[1.0625rem] leading-relaxed text-slate">{english.lead}</p>
            </Reveal>
          </div>

          <ul
            aria-labelledby="english-title"
            className="mt-8 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3"
          >
            {english.strands.map((strand, index) => {
              const Icon = icons[strand.icon];
              return (
                <Reveal as="li" key={strand.name} delay={(index % 3) * 90} className="group flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white transition-colors duration-500 group-hover:bg-ink">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-ink">
                      {strand.name}
                    </span>
                    <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-slate">{strand.line}</span>
                  </span>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Shell>
    </section>
  );
}

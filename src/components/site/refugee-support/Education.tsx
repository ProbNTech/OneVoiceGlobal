import {
  BriefcaseBusiness,
  FileUser,
  GraduationCap,
  Handshake,
  Laptop,
  MessagesSquare,
  Store,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cx } from "@/lib/cx";
import { refugeeEducation, type InitiativeIcon } from "@/data/refugee-support";
import { AreaKicker } from "../our-work/AreaKicker";
import { Photo } from "../ui/Photo";
import { ArrowLink, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<InitiativeIcon, LucideIcon> = {
  english: MessagesSquare,
  digital: Laptop,
  vocational: Wrench,
  scholarships: GraduationCap,
  career: FileUser,
  mentoring: Handshake,
  employment: BriefcaseBusiness,
  enterprise: Store,
};

/* The two halves mirror each other: the leaf falls on each photograph's outer corner. */
const LEAF = ["rounded-[2rem_2rem_2rem_7rem]", "rounded-[2rem_2rem_7rem_2rem]"];

/**
 * 3. Refugee Education and Employment, on white: the programme's place
 * among the three and its name with its subtitle as the heading, and its
 * two paragraphs beside them. Its eight planned initiatives follow in the
 * two halves its name gives them, Education and Employment, side by side,
 * each under a wide photograph cut with a leaf on its outer lower corner and
 * named in the display face, its four initiatives two to a row as plain
 * items (a small icon, the name and the document's line). The scholarships
 * initiative leads to the Scholarships page. The programme's ambition
 * closes the band as a centred statement.
 */
export function Education() {
  const { halves } = refugeeEducation;

  return (
    <section
      id={refugeeEducation.id}
      aria-labelledby="education-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-end gap-x-14 gap-y-6 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <AreaKicker number={refugeeEducation.number} name={refugeeEducation.kicker} />
            </Reveal>
            <Title
              id="education-title"
              lead={refugeeEducation.titleLead}
              accent={refugeeEducation.titleAccent}
              className="mt-5"
            />
          </div>
          <Reveal delay={120} className="lg:col-span-6">
            <p className="text-lead text-ink">{refugeeEducation.paragraphs[0]}</p>
            <p className="mt-3 text-[1rem] leading-relaxed text-slate">{refugeeEducation.paragraphs[1]}</p>
          </Reveal>
        </div>

        <Reveal variant="fade" className="mt-10 lg:mt-12">
          <p id="education-initiatives" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">
            {refugeeEducation.listLabel}
          </p>
        </Reveal>

        <div className="mt-6 grid gap-x-10 gap-y-12 lg:grid-cols-2 xl:gap-x-14">
          {halves.map((half, halfIndex) => (
            <div key={half.label}>
              <Reveal variant="image" delay={halfIndex * 140}>
                <div className="drop-shadow-[0_26px_32px_rgb(10_37_64/0.18)]">
                  <div className={cx("reveal-clip relative aspect-[16/9] overflow-hidden bg-sand", LEAF[halfIndex])}>
                    <div className="reveal-media absolute inset-0">
                      <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                        <Photo image={half.image} sizes="(min-width: 1760px) 860px, (min-width: 1024px) 46vw, 92vw" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100 + halfIndex * 140}>
                <h3
                  className={cx(
                    "mt-7 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none tracking-[-0.015em] [font-variation-settings:'SOFT'_100]",
                    halfIndex === 0 ? "text-ink" : "font-light italic text-lagoon-600",
                  )}
                >
                  {half.label}
                </h3>
              </Reveal>
              <ul aria-labelledby="education-initiatives" className="mt-6 grid gap-x-7 gap-y-6 sm:grid-cols-2">
                {half.items.map((item, index) => {
                  const Icon = icons[item.icon];
                  return (
                    <Reveal as="li" key={item.name} delay={(index % 2) * 90} className="group flex items-start gap-3.5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-ocean-600 transition-colors duration-500 group-hover:bg-ocean-600 group-hover:text-white">
                        <Icon aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.6} />
                      </span>
                      <div className="min-w-0">
                        <h4 className="pt-0.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-ink">
                          {item.name}
                        </h4>
                        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate">{item.line}</p>
                        {"link" in item && item.link ? (
                          <ArrowLink href={item.link.href} className="mt-3">
                            {item.link.label}
                          </ArrowLink>
                        ) : null}
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <Reveal className="mx-auto mt-12 max-w-4xl text-center lg:mt-14">
          <p className="font-display text-[clamp(1.375rem,2.3vw,2rem)] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
            {refugeeEducation.ambition}
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

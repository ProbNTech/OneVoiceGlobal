import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { ourWorkEducation } from "@/data/our-work";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { AreaKicker } from "./AreaKicker";

/**
 * 1. Education, Skills and Digital Inclusion, in the ELA "What We Deliver"
 * style: the area's subtitle, its lead and its eight proposed activities as
 * a check list two to a row, beside the brief's own photograph for the area
 * with a leaf corner and the area's closing ambition on a white card across
 * its foot.
 */
export function Education() {
  const { image } = ourWorkEducation;

  return (
    <section
      id={ourWorkEducation.id}
      aria-labelledby="education-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <AreaKicker number={ourWorkEducation.number} name={ourWorkEducation.kicker} />
            </Reveal>
            <Title
              id="education-title"
              lead={ourWorkEducation.titleLead}
              accent={ourWorkEducation.titleAccent}
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lead text-slate">{ourWorkEducation.lead}</p>
              <p
                id="education-list"
                className="mt-7 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-ink"
              >
                {ourWorkEducation.listLabel}
              </p>
            </Reveal>
            <ul aria-labelledby="education-list" className="mt-4 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {ourWorkEducation.items.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={(index % 2) * 70}
                  className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-lagoon-600 text-white">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </span>
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="relative pb-16 lg:col-span-5 lg:pb-10">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[7rem_2rem_2rem_2rem] bg-sand">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1920px) 700px, (min-width: 1024px) 38vw, 100vw"
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
              className="absolute bottom-0 left-4 right-4 z-10 sm:left-auto sm:right-6 sm:max-w-[22rem] lg:-left-10 lg:right-auto"
            >
              <p className="flex items-start gap-3.5 rounded-card bg-white p-5 text-[0.9375rem] font-medium leading-relaxed text-ink shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-saffron-500 text-white">
                  <Sparkles aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                </span>
                {ourWorkEducation.closing}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

import Image from "next/image";
import { ourWorkInternational } from "@/data/our-work";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { AreaKicker } from "./AreaKicker";

/**
 * 7. International Network: the area's subtitle as the heading, its aim
 * beneath, and its eight key activities as a numbered index two to a row
 * (outlined numerals, no rules between them), beside the brief's own
 * photograph for the area, which is square and keeps its shape under an
 * arched top.
 */
export function International() {
  const { image } = ourWorkInternational;

  return (
    <section
      id={ourWorkInternational.id}
      aria-labelledby="international-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <AreaKicker number={ourWorkInternational.number} name={ourWorkInternational.kicker} />
            </Reveal>
            <Title
              id="international-title"
              lead={ourWorkInternational.titleLead}
              accent={ourWorkInternational.titleAccent}
              size="statement"
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-5 max-w-2xl text-lead text-slate">{ourWorkInternational.lead}</p>
              <p
                id="international-list"
                className="mt-7 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink"
              >
                {ourWorkInternational.listLabel}
              </p>
            </Reveal>
            <ol aria-labelledby="international-list" className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {ourWorkInternational.items.map((item, index) => (
                <Reveal as="li" key={item} delay={(index % 2) * 80} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="w-10 shrink-0 font-display text-[1.75rem] leading-none text-ocean-600/70 text-outline [font-variation-settings:'SOFT'_100]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-ink">{item}</span>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal variant="image" className="lg:col-span-5">
            <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
              <div className="reveal-clip relative mx-auto aspect-square max-w-md overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-mist lg:max-w-none">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1920px) 700px, (min-width: 1024px) 38vw, 448px"
                      className="object-cover"
                      style={{ objectPosition: image.position }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

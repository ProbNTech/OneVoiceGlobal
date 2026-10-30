import Image from "next/image";
import { Check } from "lucide-react";
import { ourWorkYouth } from "@/data/our-work";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { AreaKicker } from "./AreaKicker";

/**
 * 5. Youth, Women and Family Empowerment: the area's heading above a wide
 * panel of the brief's own photograph for it, with a white card overlapping
 * the photograph's right edge that holds the six proposed activities as a
 * check list and the area's closing line. On phones the card sits under the
 * photograph.
 */
export function Youth() {
  const { image } = ourWorkYouth;

  return (
    <section
      id={ourWorkYouth.id}
      aria-labelledby="youth-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-cream py-band"
    >
      <Shell>
        <Reveal variant="fade">
          <AreaKicker number={ourWorkYouth.number} name={ourWorkYouth.kicker} />
        </Reveal>
        <Title
          id="youth-title"
          lead={ourWorkYouth.titleLead}
          accent={ourWorkYouth.titleAccent}
          inline
          className="mt-5 max-w-5xl"
        />

        <div className="mt-8 grid grid-cols-1 lg:mt-10 lg:grid-cols-12 lg:items-center">
          <Reveal variant="image" className="lg:col-span-8 lg:col-start-1 lg:row-start-1">
            <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.18)]">
              <div className="reveal-clip relative aspect-[16/9] overflow-hidden rounded-[2rem_2rem_8rem_2rem] bg-sand">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1920px) 1180px, (min-width: 1024px) 64vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: image.position }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={200}
            className="relative z-10 mx-4 -mt-16 sm:mx-10 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mx-0 lg:mt-0"
          >
            <div className="rounded-panel bg-white p-6 shadow-[0_40px_80px_-40px_rgb(10_37_64/0.5)] sm:p-8">
              <p id="youth-list" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">
                {ourWorkYouth.listLabel}
              </p>
              <ul aria-labelledby="youth-list" className="mt-4 space-y-3">
                {ourWorkYouth.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lagoon-50 text-lagoon-600">
                      <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.875rem] leading-relaxed text-ink-muted">{ourWorkYouth.closing}</p>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

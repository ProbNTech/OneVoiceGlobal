import { Check, Globe, Info } from "lucide-react";
import { scholarshipsInternational } from "@/data/scholarships";
import { Photo } from "../ui/Photo";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * International Students & Global Education Opportunities, as the page's
 * one full-bleed photograph (as the Community page's Integration): students
 * from different countries crossing a London campus fill the band edge to
 * edge and drift as the page scrolls, shaded only on the left where the
 * heading, the document's two opening sentences and its note on immigration
 * and funding requirements sit. What assistance may be considered for, and
 * who may be given priority, are set on a white card over the right of the
 * picture.
 */
export function International() {
  const { paragraphs, card, image } = scholarshipsInternational;

  return (
    <section
      id={scholarshipsInternational.id}
      aria-labelledby="international-title"
      className="relative isolate overflow-clip bg-navy-950 py-band text-white"
    >
      {/* The photograph carries the section's meaning, so it keeps its
          description although the copy sits over it. */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="parallax absolute inset-x-0 -inset-y-[10%]">
          <Photo image={image} quality={80} sizes="100vw" />
        </div>
      </div>
      {/* Even on phones, where the copy runs across the whole picture; from
          large screens a wash that is deep under the heading and clear across
          the people on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy-950/75 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgb(6_26_48/0.92)_0%,rgb(6_26_48/0.76)_42%,rgb(6_26_48/0.25)_72%,rgb(6_26_48/0.12)_100%)]"
      />

      <Shell>
        <div className="grid items-center gap-8 py-6 lg:min-h-[34rem] lg:grid-cols-12 lg:gap-12 lg:py-10">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <Kicker tone="dark">{scholarshipsInternational.kicker}</Kicker>
            </Reveal>
            <Title
              id="international-title"
              lead={scholarshipsInternational.titleLead}
              accent={scholarshipsInternational.titleAccent}
              tone="dark"
              accentTone="saffron"
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 max-w-xl text-lead text-white/90">{paragraphs[0]}</p>
              <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-white/80">{paragraphs[1]}</p>
              <p className="mt-6 flex max-w-xl items-start gap-3 text-[0.875rem] leading-relaxed text-white/75">
                <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 icon-orange" strokeWidth={1.8} />
                {scholarshipsInternational.note}
              </p>
            </Reveal>
          </div>

          <Reveal variant="right" delay={200} className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-panel bg-white p-7 text-slate shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] sm:p-9">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-lagoon-600 text-white">
                <Globe aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <p id="international-card" className="mt-5 text-[0.9375rem] leading-relaxed text-ink">
                {card.label}
              </p>
              <ul aria-labelledby="international-card" className="mt-4 space-y-3">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1rem] font-semibold leading-snug text-ink">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-orange text-white">
                      <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.9375rem] italic leading-relaxed text-slate">{card.where}</p>
              <p className="mt-5 font-display text-[1.125rem] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
                {card.priority}
              </p>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

import { Award, Info } from "lucide-react";
import { scholarshipsNamed } from "@/data/scholarships";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Establish a Named Scholarship, on white, set like a roll of honours: the
 * heading beside the document's two paragraphs, then its six suggested
 * scholarships three to a row, each with "The OneVoice" in small spaced
 * capitals over the rest of its name in the display face, as a certificate
 * would set it, and the document's line beneath. Nothing is drawn behind or
 * between them. Its note on how named scholarships are agreed closes the
 * section.
 */
export function Named() {
  const { paragraphs, scholarships } = scholarshipsNamed;

  return (
    <section
      id={scholarshipsNamed.id}
      aria-labelledby="named-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <Kicker>{scholarshipsNamed.kicker}</Kicker>
            </Reveal>
            <Title
              id="named-title"
              lead={scholarshipsNamed.titleLead}
              accent={scholarshipsNamed.titleAccent}
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-6 lg:pb-2">
            <p className="text-lead text-ink">{paragraphs[0]}</p>
            <p className="mt-3 text-[1rem] leading-relaxed text-slate">{paragraphs[1]}</p>
          </Reveal>
        </div>

        <Reveal variant="fade" className="mt-10 lg:mt-12">
          <p id="named-list" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">
            {scholarshipsNamed.listLabel}
          </p>
        </Reveal>
        <ul
          aria-labelledby="named-list"
          className="mt-6 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-16"
        >
          {scholarships.map((scholarship, index) => (
            <Reveal as="li" key={scholarship.name} delay={(index % 3) * 100} className="group flex items-start gap-4">
              <Award
                aria-hidden="true"
                className="mt-1 h-7 w-7 shrink-0 icon-orange transition-transform duration-500 ease-out-soft group-hover:-rotate-12 group-hover:scale-110"
                strokeWidth={1.5}
              />
              <div className="min-w-0">
                <h3>
                  <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-ink-muted">
                    {scholarshipsNamed.prefix}
                  </span>
                  <span className="mt-1 block font-display text-[1.5rem] leading-snug text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.625rem]">
                    {scholarship.name}
                  </span>
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{scholarship.line}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 lg:mt-12">
          <p className="flex max-w-3xl items-start gap-3.5 text-[0.9375rem] leading-relaxed text-ink-muted">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lagoon-50 text-lagoon-600">
              <Info aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <span className="pt-1.5">{scholarshipsNamed.note}</span>
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

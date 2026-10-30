import { ClipboardList, FileClock, ShieldCheck, type LucideIcon } from "lucide-react";
import { impactReports, type ReportIcon } from "@/data/impact";
import { Photo } from "../ui/Photo";
import { ArrowLink, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<ReportIcon, LucideIcon> = {
  surveys: ClipboardList,
  findings: ShieldCheck,
};

/**
 * Reports, on white. The brief gives Reports no copy, so the section is
 * the Foundation's own "Accountability and impact" principle: its heading,
 * and its promise to communicate progress transparently set large in the
 * display face. Beneath, what reports can draw on (community surveys and
 * anonymised findings) as a plain icon list. On the right a photograph of a
 * community survey under an arched top, with a card over its foot saying
 * plainly that no report has been published yet.
 */
export function Reports() {
  const { sources, image } = impactReports;

  return (
    <section
      id={impactReports.id}
      aria-labelledby="reports-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{impactReports.kicker}</Kicker>
            </Reveal>
            <Title
              id="reports-title"
              lead={impactReports.titleLead}
              accent={impactReports.titleAccent}
              accentTone="ocean"
              inline
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 max-w-3xl font-display text-statement text-ink [font-variation-settings:'SOFT'_100]">
                {impactReports.statement}
              </p>
            </Reveal>

            <ul className="mt-8 space-y-5">
              {sources.map((source, index) => {
                const Icon = icons[source.icon];
                return (
                  <Reveal as="li" key={source.text} delay={200 + index * 90} className="group flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ocean-600 text-white transition-colors duration-500 group-hover:bg-lagoon-600">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <p className="max-w-2xl pt-2 text-[1.0625rem] leading-relaxed text-ink">{source.text}</p>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={300} className="mt-8">
              <ArrowLink href={impactReports.cta.href}>{impactReports.cta.label}</ArrowLink>
            </Reveal>
          </div>

          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative w-full pb-10 lg:col-span-5 lg:ml-auto lg:max-w-[34rem]">
            <Reveal variant="image" delay={100}>
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Photo image={image} sizes="(min-width: 1760px) 680px, (min-width: 1024px) 38vw, 92vw" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal
              variant="up"
              delay={320}
              className="absolute bottom-0 left-0 z-10 max-w-[18rem] sm:-left-5 sm:max-w-[20rem]"
            >
              <p className="flex items-center gap-4 rounded-card bg-white p-5 text-[0.9375rem] font-semibold leading-snug text-ink shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-saffron-500 text-white">
                  <FileClock aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                {impactReports.status}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

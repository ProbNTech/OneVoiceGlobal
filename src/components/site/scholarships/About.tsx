import { MapPin } from "lucide-react";
import { scholarshipsAbout } from "@/data/scholarships";
import { Photo } from "../ui/Photo";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * About the Programme, on cream: the heading, the belief the programme
 * starts from, and its mission set large in the display face, the mission's
 * own words in italic teal. The About block's four paragraphs follow in two
 * columns. Beside them, a photograph of a mentor and a student cut with a
 * leaf corner, with the programme's focus on Greater London and East London
 * on a card across its foot.
 */
export function About() {
  const { mission, paragraphs, image } = scholarshipsAbout;

  return (
    <section
      id={scholarshipsAbout.id}
      aria-labelledby="scholarships-about-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{scholarshipsAbout.kicker}</Kicker>
            </Reveal>
            <Title
              id="scholarships-about-title"
              lead={scholarshipsAbout.titleLead}
              accent={scholarshipsAbout.titleAccent}
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lead text-ink">{scholarshipsAbout.belief}</p>
              <p className="mt-5 max-w-3xl font-display text-[1.625rem] leading-snug text-ink [font-variation-settings:'SOFT'_100] sm:text-[2rem]">
                {mission.lead} <em className="font-light text-lagoon-600">{mission.line}</em>
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-7 gap-8 text-[0.9375rem] leading-relaxed text-slate sm:columns-2">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-4 break-inside-avoid">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative w-full pb-10 lg:col-span-5 lg:ml-auto lg:max-w-[34rem]">
            <Reveal variant="image" delay={100}>
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[2rem_8rem_2rem_2rem] bg-sand">
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
              className="absolute bottom-0 left-0 z-10 max-w-[20rem] sm:-left-5 sm:max-w-[24rem]"
            >
              <p className="flex items-start gap-4 rounded-card bg-white p-5 text-[0.875rem] leading-relaxed text-ink shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white">
                  <MapPin aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                {scholarshipsAbout.focus}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

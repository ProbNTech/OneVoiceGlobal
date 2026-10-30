import { homeTeam } from "@/data/home";
import { cx } from "@/lib/cx";
import { ArrowLink, Kicker, Shell, Title } from "../ui/primitives";
import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

/**
 * Our Team on the home page, on white between the sand Foundation band and
 * the cream closing banner. Laid out differently from the About page's
 * centred row: the title and a link to the full section sit on the left, and
 * the three portraits stand on the right with the middle one stepped down,
 * each in a leaf frame with the name and role underneath and no card
 * behind. On phones each member becomes a compact row, a small portrait
 * beside the name, so the band stays short.
 */
export function Team() {
  return (
    <section aria-labelledby="home-team-title" className="relative isolate overflow-clip bg-white py-band">
      <Shell>
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-3">
            <Reveal variant="fade">
              <Kicker>{homeTeam.kicker}</Kicker>
            </Reveal>
            <Title id="home-team-title" lead={homeTeam.titleLead} accent={homeTeam.titleAccent} className="mt-5" />
            <Reveal delay={150}>
              <ArrowLink href={homeTeam.link.href} className="mt-7">
                {homeTeam.link.label}
              </ArrowLink>
            </Reveal>
          </div>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6 lg:col-span-9 lg:gap-8 lg:pb-14 2xl:w-full 2xl:max-w-[80rem] 2xl:justify-self-end">
            {homeTeam.members.map((member, index) => (
              <Reveal
                as="li"
                key={member.name}
                variant="image"
                delay={index * 110}
                className={cx("group flex items-center gap-5 sm:block", index === 1 && "sm:translate-y-14")}
              >
                <div className="w-24 shrink-0 drop-shadow-[0_30px_36px_rgb(10_37_64/0.18)] sm:w-full">
                  <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-cream sm:rounded-[5rem_1.5rem_5rem_1.5rem]">
                    <div className="reveal-media absolute inset-0">
                      <Photo
                        image={member.image}
                        sizes="(min-width: 1920px) 400px, (min-width: 1440px) 340px, (min-width: 1024px) 23vw, (min-width: 640px) 30vw, 96px"
                        className="transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.07]"
                      />
                    </div>
                  </div>
                </div>
                <div className="min-w-0 sm:mt-5">
                  <h3 className="font-display text-[1.375rem] leading-tight text-ink [font-variation-settings:'SOFT'_100] lg:text-[1.5rem]">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-lagoon-600">
                    {member.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Shell>
    </section>
  );
}

import { cx } from "@/lib/cx";
import { aboutTeam } from "@/data/about";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

/* Each portrait takes its own organic shape, like the people rows on the home
   page. The arch is a true semicircle written as 50%/40% for the 4:5 frame:
   a 999px radius would make the browser shrink every corner to fit, and the
   lower corners would come out almost square. */
const shapes = [
  "rounded-[7rem_2rem_2rem_2rem]",
  "[border-top-left-radius:50%_40%] [border-top-right-radius:50%_40%] rounded-b-[2rem]",
  "rounded-[2rem_2rem_7rem_2rem]",
];

/**
 * Our Team: the people the client named, three portraits side by side on
 * sand, each with the name in the display face and the role in small
 * spaced capitals underneath, with no card behind them. The row is held to
 * a modest width so the portraits stay compact. A portrait still waiting
 * for its headshot shows the site's soft placeholder. The third frame's leaf
 * curve sits at its foot, clear of the head in that photograph.
 */
export function Team() {
  return (
    <section
      id={aboutTeam.id}
      aria-labelledby="team-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="text-center">
          <Reveal variant="fade" className="flex justify-center">
            <Kicker>{aboutTeam.kicker}</Kicker>
          </Reveal>
          <Title id="team-title" lead={aboutTeam.titleLead} accent={aboutTeam.titleAccent} inline className="mt-5" />
        </div>

        <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3 lg:mt-10 lg:gap-x-12">
          {aboutTeam.members.map((member, index) => (
            <Reveal as="li" key={member.name} variant="image" delay={index * 110} className="group text-center">
              <div className="mx-auto max-w-[19rem] drop-shadow-[0_30px_36px_rgb(10_37_64/0.18)]">
                <div
                  className={cx(
                    "reveal-clip relative aspect-[4/5] overflow-hidden bg-cream",
                    shapes[index % shapes.length],
                  )}
                >
                  <div className="reveal-media absolute inset-0">
                    <Photo
                      image={member.image}
                      sizes="(min-width: 1024px) 304px, (min-width: 640px) 30vw, 304px"
                      className="transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.07]"
                    />
                  </div>
                </div>
              </div>
              <h3 className="mt-6 font-display text-[1.5rem] leading-tight text-ink [font-variation-settings:'SOFT'_100]">
                {member.name}
              </h3>
              <p className="mt-2 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-lagoon-600">{member.role}</p>
            </Reveal>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

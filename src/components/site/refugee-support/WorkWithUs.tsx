import { Building, HandHeart, HeartHandshake, House, Scale, School, type LucideIcon } from "lucide-react";
import { refugeeWorkWithUs, type InviteIcon } from "@/data/refugee-support";
import { Photo } from "../ui/Photo";
import { ArrowLink, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<InviteIcon, LucideIcon> = {
  volunteers: HandHeart,
  corporate: Building,
  education: School,
  charities: HeartHandshake,
  housing: House,
  advisers: Scale,
};

/**
 * Work With Us, on white: a tall photograph of a mentor at work cut with a
 * leaf on its lower left corner, drifting a little inside its frame, with
 * the block's first sentence, "Supporting refugees and asylum seekers
 * requires a collective effort.", on a card across its foot. Beside it the
 * block's subtitle as the heading, the rest of its paragraph and its six
 * invitations two to a row, each an icon circle in orange, its name and the
 * document's line, with a link that opens the page's form with the kind of
 * enquiry that suits it.
 */
export function WorkWithUs() {
  const { invites, image } = refugeeWorkWithUs;

  return (
    <section
      id={refugeeWorkWithUs.id}
      aria-labelledby="work-with-us-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-12 lg:grid-cols-12 xl:gap-x-20">
          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative order-2 mx-auto w-full max-w-md pb-12 lg:order-1 lg:col-span-5 lg:max-w-none">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[2rem_2rem_2rem_8rem] bg-sand">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Photo image={image} sizes="(min-width: 1760px) 640px, (min-width: 1024px) 36vw, 448px" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal
              variant="up"
              delay={300}
              className="absolute bottom-0 right-0 z-10 max-w-[17rem] sm:-right-6 sm:max-w-[21rem]"
            >
              <p className="rounded-card bg-white p-5 font-display text-[1.125rem] leading-snug text-ink shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] [font-variation-settings:'SOFT'_100]">
                {refugeeWorkWithUs.effort}
              </p>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{refugeeWorkWithUs.kicker}</Kicker>
            </Reveal>
            <Title
              id="work-with-us-title"
              lead={refugeeWorkWithUs.titleLead}
              accent={refugeeWorkWithUs.titleAccent}
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lead text-slate">{refugeeWorkWithUs.lead}</p>
              <p id="work-invites" className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">
                {refugeeWorkWithUs.listLabel}
              </p>
            </Reveal>
            <ul aria-labelledby="work-invites" className="mt-5 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {invites.map((invite, index) => {
                const Icon = icons[invite.icon];
                return (
                  <Reveal as="li" key={invite.name} delay={(index % 2) * 90} className="group flex items-start gap-4">
                    {/* The icon's stroke is the orange gradient, which a hover
                        colour cannot override, so the circle lifts instead of
                        filling. */}
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-orange-soft icon-orange-ink transition-transform duration-500 ease-out-soft group-hover:-translate-y-1">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="pt-0.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-ink">
                        {invite.name}
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate">{invite.line}</p>
                      <ArrowLink href={invite.cta.href} className="mt-2.5">
                        {invite.cta.label}
                      </ArrowLink>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </Shell>
    </section>
  );
}

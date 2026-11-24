import { joinForm, joinHero } from "@/data/join";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { JoinForm } from "./JoinForm";

/**
 * Join hero. The page has one job — to be filled in — so the form sits in
 * the hero itself rather than further down: the headline and the brief's
 * motto on the left, the form panel on the right, both on the first screen.
 * On phones the copy comes first and the form follows straight after it,
 * which is the same order read down one column.
 *
 * The form is not pinned or sticky: it does not have to be, because it
 * starts in sight (the design rules turn sticky columns down).
 *
 * The header keeps its dark logo and links over this band (it is not in
 * SiteHeader's DARK_HERO), so the band keeps the usual room at the top.
 */
export function Hero() {
  return (
    <section
      id={joinForm.id}
      aria-labelledby="join-hero-title"
      className="relative isolate overflow-clip bg-cream pb-band pt-32 lg:pt-40"
    >
      {/* Soft light in the logo's colours, as a radial mask rather than a blur. */}
      <div
        aria-hidden="true"
        className="glow absolute -left-40 -top-44 -z-10 h-[34rem] w-[34rem] rounded-full bg-lagoon-100/80"
      />
      <div
        aria-hidden="true"
        className="glow absolute -bottom-52 right-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-orange-soft opacity-80"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:grid-cols-12 xl:gap-x-20">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal variant="fade" delay={80} margin="0px">
              <Kicker>{joinHero.kicker}</Kicker>
            </Reveal>
            <Title
              as="h1"
              id="join-hero-title"
              lead={joinHero.titleLead}
              accent={joinHero.titleAccent}
              delay={180}
              className="mt-6"
            />
            <Reveal delay={420} margin="0px">
              <p className="mt-7 max-w-xl text-lead text-slate">{joinHero.description}</p>
            </Reveal>

            {/* The brief's motto: Learn, Develop, Connect, Progress. */}
            <ul className="mt-9 grid max-w-lg grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4 sm:gap-y-0">
              {joinHero.motto.map((word, index) => (
                <Reveal key={word} as="li" delay={520 + index * 90} margin="0px">
                  <span className="font-display text-[1.625rem] font-normal text-orange-ink [font-variation-settings:'SOFT'_100]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-[0.75rem] font-bold uppercase tracking-[0.18em] text-ink">
                    {word}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* The form, on the first screen with the headline. */}
          <Reveal variant="scale" delay={260} margin="0px" className="lg:col-span-6">
            <div className="rounded-panel bg-white shadow-[0_40px_80px_-50px_rgb(10_37_64/0.55)]">
              <JoinForm />
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

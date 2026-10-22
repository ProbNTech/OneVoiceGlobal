import { Compass, Handshake, MessageCircleHeart, Sprout, TrendingUp, type LucideIcon } from "lucide-react";
import { homeJourney, type JourneyIcon } from "@/data/home";
import { Cta, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<JourneyIcon, LucideIcon> = {
  message: MessageCircleHeart,
  compass: Compass,
  sprout: Sprout,
  handshake: Handshake,
  trending: TrendingUp,
};

/**
 * Your OneVoice Journey: a centred title, then the five
 * steps, three to a row with the last two centred beneath. Each step is a
 * filled circle with its icon, its number, the step and the brief's line.
 */
export function Journey() {
  const steps = homeJourney.steps;

  return (
    <section aria-labelledby="journey-title" className="relative isolate overflow-clip bg-white py-band">
      <Shell>
        <div className="text-center">
          <Reveal variant="fade">
            <Kicker>{homeJourney.kicker}</Kicker>
          </Reveal>
          <Reveal
            as="h2"
            id="journey-title"
            variant="lines"
            className="mt-6 font-display text-title font-normal text-ink [font-variation-settings:'SOFT'_100]"
          >
            <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
              <span className="line-inner block">
                {homeJourney.titleLead} <em className="font-light text-lagoon-600">{homeJourney.titleAccent}</em>
              </span>
            </span>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 font-display text-[1.375rem] font-light italic text-slate [font-variation-settings:'SOFT'_100]">
              {homeJourney.lead}
            </p>
          </Reveal>
        </div>

        <ol className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-y-10 lg:mt-12">
          {steps.map((step, index) => {
            const Icon = icons[step.icon];
            return (
              <Reveal
                as="li"
                key={`${step.title}-${index}`}
                variant="up"
                delay={(index % 3) * 120}
                className="group basis-full px-6 text-center sm:basis-1/2 lg:basis-1/3"
              >
                <span
                  aria-hidden="true"
                  className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-lagoon-600 text-white shadow-[0_18px_36px_-18px_rgb(14_122_118/0.8)] transition-[transform,background-color] duration-700 ease-out-soft group-hover:-translate-y-1.5 group-hover:bg-ink"
                >
                  {/* An outer ring that draws itself round the circle as the step
                      arrives (styles/site.css, .ring-draw) and widens on hover. */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute -inset-2.5 h-[calc(100%+1.25rem)] w-[calc(100%+1.25rem)] -rotate-90 text-lagoon-600/45 transition-transform duration-700 ease-out-soft group-hover:scale-110"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      pathLength={100}
                      strokeDasharray="100"
                      vectorEffect="non-scaling-stroke"
                      className="ring-draw"
                    />
                  </svg>
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <p className="mt-6 text-[0.875rem] font-bold tabular-nums tracking-[0.22em] text-saffron-ink">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2.5 text-[0.9375rem] font-bold uppercase tracking-[0.16em] text-ink">{step.title}</h3>
                <p className="mx-auto mt-3.5 max-w-[17rem] text-[0.9375rem] leading-relaxed text-slate">{step.line}</p>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-10 flex justify-center">
          <Cta href={homeJourney.cta.href}>{homeJourney.cta.label}</Cta>
        </Reveal>
      </Shell>
    </section>
  );
}

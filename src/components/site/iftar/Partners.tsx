import { Info } from "lucide-react";
import { iftarPartners } from "@/data/iftar";
import { Photo } from "../ui/Photo";
import { ArrowLink, Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Partnership & Sponsorship Opportunities, on cream. On the left a
 * photograph of two event partners cut with a leaf corner, with the
 * document's note that benefits and terms will be shared once confirmed on
 * a card across its foot. On the right the heading and the document's lead,
 * then its five potential opportunities as a numbered index: each number in
 * the orange gradient, the opportunity's name in spaced capitals, its line,
 * and its own enquiry, which opens the form below with its kind chosen (the
 * separate enquiries the document's layout asks for). Nothing is drawn
 * between them. The document's two calls to act close the section.
 */
export function Partners() {
  const { opportunities, image } = iftarPartners;

  return (
    <section
      id={iftarPartners.id}
      aria-labelledby="iftar-partners-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative order-2 w-full pb-10 lg:order-1 lg:col-span-5 lg:max-w-[34rem]">
            <Reveal variant="image">
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
              className="absolute bottom-0 left-0 z-10 max-w-[20rem] sm:-left-5 sm:max-w-[23rem]"
            >
              <p className="flex items-start gap-4 rounded-card bg-white p-5 text-[0.875rem] leading-relaxed text-ink shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white">
                  <Info aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                {iftarPartners.note}
              </p>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{iftarPartners.kicker}</Kicker>
            </Reveal>
            <Title
              id="iftar-partners-title"
              lead={iftarPartners.titleLead}
              accent={iftarPartners.titleAccent}
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lead text-slate">{iftarPartners.lead}</p>
              <h3
                id="iftar-opportunities"
                className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink"
              >
                {iftarPartners.listLabel}
              </h3>
            </Reveal>

            <ol aria-labelledby="iftar-opportunities" className="mt-5 space-y-6">
              {opportunities.map((opportunity, index) => (
                <Reveal as="li" key={opportunity.name} delay={150 + index * 70} className="group flex gap-5">
                  <span
                    aria-hidden="true"
                    className="w-10 shrink-0 font-display text-[2rem] font-light leading-none tabular-nums text-orange [font-variation-settings:'SOFT'_100]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 border-0 pt-1">
                    <h4 className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-ink">
                      {opportunity.name}
                    </h4>
                    <p className="mt-1.5 max-w-xl text-[0.9375rem] leading-relaxed text-slate">{opportunity.line}</p>
                    <ArrowLink href={opportunity.cta.href} className="mt-2 text-[0.875rem]">
                      {opportunity.cta.label}
                    </ArrowLink>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
              <Cta href={iftarPartners.primaryCta.href} variant="saffron">
                {iftarPartners.primaryCta.label}
              </Cta>
              <Cta href={iftarPartners.secondaryCta.href} variant="outline">
                {iftarPartners.secondaryCta.label}
              </Cta>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

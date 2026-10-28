import Image from "next/image";
import { Check, Handshake } from "lucide-react";
import { getInvolvedPartner, getInvolvedSponsor } from "@/data/get-involved";
import { ArrowLink, Cta, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Become a Partner and Sponsor a Programme, as two panels side by side in
 * one band, each its own section so the menu's anchors land on it. On the
 * left, on navy, the brief's PARTNER WITH ONEVOICE block with the way
 * through to the Partners page; on the right, under a photograph, the
 * close of its Funders block and what funding can support.
 */
export function PartnerSponsor() {
  const partner = getInvolvedPartner;
  const sponsor = getInvolvedSponsor;

  return (
    <div className="relative isolate overflow-clip bg-white py-band">
      <Shell>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          <Reveal variant="up">
            <section
              id={partner.id}
              aria-labelledby="partner-title"
              className="relative isolate flex h-full flex-col justify-center overflow-hidden rounded-panel bg-navy-950 p-7 text-white sm:p-10 lg:p-12"
            >
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full bg-ocean-600/30 blur-[110px]"
              />
              <Handshake aria-hidden="true" className="h-9 w-9 text-saffron-300" strokeWidth={1.3} />
              <p className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-saffron-300">
                {partner.kicker}
              </p>
              <h2
                id="partner-title"
                className="mt-3 max-w-lg font-display text-[clamp(2rem,3vw,2.75rem)] leading-[1.1] text-white [font-variation-settings:'SOFT'_100]"
              >
                {partner.title}
              </h2>
              <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/80">{partner.lead}</p>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {partner.commitments.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[0.9375rem] text-white">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-saffron-500 text-navy-950">
                      <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Cta href={partner.cta.href} variant="saffron">
                  {partner.cta.label}
                </Cta>
                <ArrowLink href={partner.more.href} tone="dark">
                  {partner.more.label}
                </ArrowLink>
              </div>
            </section>
          </Reveal>

          <Reveal variant="up" delay={150}>
            <section
              id={sponsor.id}
              aria-labelledby="sponsor-title"
              className="flex h-full flex-col overflow-hidden rounded-panel bg-white shadow-[0_30px_60px_-45px_rgb(10_37_64/0.55)] ring-1 ring-ink/6"
            >
              <div className="relative aspect-[5/2] overflow-hidden bg-sand">
                <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                  <Image
                    src={sponsor.image.src}
                    alt={sponsor.image.alt}
                    fill
                    sizes="(min-width: 1760px) 860px, (min-width: 1024px) 48vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: sponsor.image.position }}
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-10 lg:px-12 lg:pb-12">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-saffron-ink">
                  {sponsor.kicker}
                </p>
                <h2
                  id="sponsor-title"
                  className="mt-3 font-display text-[clamp(2rem,3vw,2.75rem)] leading-[1.1] text-ink [font-variation-settings:'SOFT'_100]"
                >
                  {sponsor.title}
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate">{sponsor.lead}</p>
                <p className="mt-1 font-display text-[1.25rem] font-light italic leading-snug text-lagoon-600 [font-variation-settings:'SOFT'_100]">
                  {sponsor.outcomes}
                </p>
                <p className="mt-6 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-ink-muted">
                  {sponsor.listLabel}
                </p>
                <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {sponsor.supports.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.9375rem] font-medium text-ink">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-lagoon-600 text-white">
                        <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-9">
                  <Cta href={sponsor.cta.href}>{sponsor.cta.label}</Cta>
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </Shell>
    </div>
  );
}

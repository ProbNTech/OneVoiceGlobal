import { ArrowRight, MessageCircle } from "lucide-react";
import { joinCta } from "@/data/join";
import { Band, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { Logo } from "../layout/Logo";

/**
 * The closing band: the logo on its white plate, the brief's tagline, and
 * the WhatsApp group once more, for anyone who scrolled past the form. A
 * dark band rather than the site's usual photo banner, because this page
 * has no photographs of its own yet. The group link opens WhatsApp, so it
 * is a plain link, not one of the site's page links.
 */
export function Group() {
  return (
    <Band tone="navy" labelledBy="join-cta-title">
      {/* Soft light in the logo's colours, as a radial mask rather than a blur. */}
      <div
        aria-hidden="true"
        className="glow absolute -left-40 top-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-ocean-600/35"
      />
      <div
        aria-hidden="true"
        className="glow absolute -bottom-40 right-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-lagoon-600/30"
      />

      <Shell>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal variant="fade" margin="0px">
            <Logo tone="light" className="h-20 p-2.5" />
          </Reveal>
          <Reveal variant="fade" delay={90} className="mt-7 flex justify-center">
            <Kicker tone="dark">{joinCta.kicker}</Kicker>
          </Reveal>
          <Title
            id="join-cta-title"
            lead={joinCta.titleLead}
            accent={joinCta.titleAccent}
            tone="dark"
            accentTone="saffron"
            inline
            className="mt-5"
          />
          <Reveal delay={150}>
            <p className="mt-5 text-lead text-white/75">{joinCta.description}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={joinCta.primaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="group/cta inline-flex h-13 items-center gap-3 rounded-full bg-orange pl-6 pr-2 text-[0.9375rem] font-semibold text-white"
              >
                <MessageCircle aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} />
                <span>{joinCta.primaryCta.label}</span>
                <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-white/20">
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-soft group-hover/cta:translate-x-[150%]" />
                  <ArrowRight className="absolute h-4 w-4 -translate-x-[150%] transition-transform duration-500 ease-out-soft group-hover/cta:translate-x-0" />
                </span>
              </a>
              <a
                href={joinCta.secondaryCta.href}
                className="inline-flex h-13 items-center rounded-full px-6 text-[0.9375rem] font-semibold text-white ring-1 ring-inset ring-white/35 transition-colors duration-500 hover:bg-white hover:text-ink"
              >
                {joinCta.secondaryCta.label}
              </a>
            </div>
          </Reveal>
        </div>
      </Shell>
    </Band>
  );
}

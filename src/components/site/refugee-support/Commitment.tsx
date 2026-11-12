import { ShieldCheck } from "lucide-react";
import { refugeeCommitment } from "@/data/refugee-support";
import { Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Our Commitment, on cream, closing the page: a shield in a white circle,
 * the block's name, its first paragraph set as a statement in the display
 * face and its second, on how the services and any sponsorship will be
 * governed, beneath in the body face. All centred and kept short, so the
 * page ends quietly before the footer.
 */
export function Commitment() {
  return (
    <section aria-labelledby="commitment-title" className="relative isolate overflow-clip bg-cream py-band">
      <Shell>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal variant="scale">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-lagoon-600 shadow-[0_16px_34px_-20px_rgb(10_37_64/0.5)]">
              <ShieldCheck aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
            </span>
          </Reveal>
          <Reveal variant="fade" delay={80} className="mt-5 flex justify-center">
            <Kicker as="h2" id="commitment-title">
              {refugeeCommitment.kicker}
            </Kicker>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 font-display text-[clamp(1.375rem,2.4vw,2.125rem)] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
              {refugeeCommitment.statement}
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-[0.9375rem] leading-relaxed text-slate">
              {refugeeCommitment.terms}
            </p>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

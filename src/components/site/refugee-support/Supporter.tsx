import { Suspense } from "react";
import { refugeeSupporter } from "@/data/refugee-support";
import { EnquiryForm, EnquiryFormFromQuery } from "../contact/EnquiryForm";
import { ArrowLink, Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* The document's first three buttons, each in its own weight; the fourth is a quieter link. */
const VARIANTS = ["saffron", "ink", "outline"] as const;

/**
 * Become a Supporter, on sand: the block's heading, its paragraph and its
 * closing hope in the display face, then its four buttons. The document
 * gives no contact block, so the site's enquiry form sits beside them on a
 * white panel: [Become a Volunteer], [Partner with Us] and [Support Our
 * Programmes] open it with their kind of enquiry chosen, and [Contact
 * OneVoice Global Foundation] leads to the Contact page. Every enquiry sent
 * from here is recorded as Refugee & Asylum Seeker Support's.
 */
export function Supporter() {
  const { buttons, context, initialTopic } = refugeeSupporter;
  const formButtons = buttons.slice(0, 3);
  const contactLink = buttons[3];

  return (
    <section
      id={refugeeSupporter.id}
      aria-labelledby="supporter-title"
      className="relative isolate scroll-mt-24 overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Kicker>{refugeeSupporter.kicker}</Kicker>
            </Reveal>
            <Title
              id="supporter-title"
              lead={refugeeSupporter.titleLead}
              accent={refugeeSupporter.titleAccent}
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 text-lead text-slate">{refugeeSupporter.lead}</p>
              <p className="mt-6 font-display text-[clamp(1.25rem,1.9vw,1.625rem)] font-light italic leading-snug text-lagoon-600 [font-variation-settings:'SOFT'_100]">
                {refugeeSupporter.together}
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
              {formButtons.map((button, index) => (
                <Cta key={button.label} href={button.href} variant={VARIANTS[index]} size="sm">
                  {button.label}
                </Cta>
              ))}
            </Reveal>
            {contactLink ? (
              <Reveal delay={260}>
                <ArrowLink href={contactLink.href} className="mt-6">
                  {contactLink.label}
                </ArrowLink>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={150} className="lg:col-span-7">
            <div className="rounded-panel bg-white shadow-[0_40px_80px_-50px_rgb(10_37_64/0.55)]">
              <Suspense fallback={<EnquiryForm initialTopic={initialTopic} context={context} />}>
                <EnquiryFormFromQuery context={context} defaultTopic={initialTopic} />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

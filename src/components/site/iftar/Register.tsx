import { Suspense } from "react";
import { BellRing } from "lucide-react";
import { iftarRegister } from "@/data/iftar";
import { EnquiryForm, EnquiryFormFromQuery } from "../contact/EnquiryForm";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Register Your Interest, on sand: the document's "Join Us" paragraphs and
 * its "Stay Connected" line on the left; on the right the site's enquiry
 * form on a white panel, opened on Register Your Interest (or on whatever
 * kind of enquiry a call to act on this page asked for). Every enquiry sent
 * from here is recorded as the Iftar's.
 */
export function Register() {
  const { context, initialTopic } = iftarRegister;

  return (
    <section
      id={iftarRegister.id}
      aria-labelledby="iftar-register-title"
      className="relative isolate scroll-mt-24 overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Kicker>{iftarRegister.kicker}</Kicker>
            </Reveal>
            <Title
              id="iftar-register-title"
              lead={iftarRegister.titleLead}
              accent={iftarRegister.titleAccent}
              inline
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 text-lead text-ink">{iftarRegister.lead}</p>
              <p className="mt-4 text-[1rem] leading-relaxed text-slate">{iftarRegister.welcome}</p>
              <p className="mt-6 flex items-start gap-3.5 text-[0.9375rem] leading-relaxed text-ink">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange text-white">
                  <BellRing aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.7} />
                </span>
                <span className="pt-1">{iftarRegister.updates}</span>
              </p>
            </Reveal>
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

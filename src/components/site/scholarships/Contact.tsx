import { Suspense } from "react";
import { Clock3, MapPin } from "lucide-react";
import { scholarshipsContact } from "@/data/scholarships";
import { EnquiryForm, EnquiryFormFromQuery } from "../contact/EnquiryForm";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Contact the Scholarship Programme, on sand: the document's contact block
 * on the left (the Foundation, the programme's name, its line on who should
 * get in touch, its one given value, the location, and its note that
 * applications open after formal approval). Its email and website are
 * blank, so the site's enquiry form stands in on the right, on a white
 * panel; every enquiry sent from here is recorded as the Scholarship
 * Programme's, and the page's calls to act open it with their kind chosen.
 */
export function Contact() {
  const { location, context, initialTopic } = scholarshipsContact;

  return (
    <section
      id={scholarshipsContact.id}
      aria-labelledby="scholarship-contact-title"
      className="relative isolate scroll-mt-24 overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Kicker>{scholarshipsContact.kicker}</Kicker>
            </Reveal>
            <Title
              id="scholarship-contact-title"
              lead={scholarshipsContact.titleLead}
              accent={scholarshipsContact.titleAccent}
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-ink">
                {scholarshipsContact.programme}
              </p>
              <p className="mt-4 text-lead text-slate">{scholarshipsContact.lead}</p>
              <p className="mt-6 flex items-center gap-3.5 text-[1rem] text-ink">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-lagoon-600">
                  <MapPin aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.7} />
                </span>
                <span>
                  <span className="font-semibold">{location.label}:</span> {location.value}
                </span>
              </p>
              <p className="mt-4 flex items-start gap-3.5 text-[0.9375rem] leading-relaxed text-ink">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange text-white">
                  <Clock3 aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.7} />
                </span>
                <span className="pt-1.5">{scholarshipsContact.note}</span>
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

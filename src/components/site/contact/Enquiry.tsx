import Image from "next/image";
import { Suspense } from "react";
import { Globe, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { contactEnquiry } from "@/data/contact";
import { contact } from "@/data/site";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { SocialIcon } from "../ui/SocialIcon";
import { EnquiryForm, EnquiryFormFromQuery } from "./EnquiryForm";

/**
 * Contact Us: the brief's CONTACT US block beside the enquiry form. On the
 * left, the Centre's name and headline, its address, telephone, email and
 * website as each is supplied (none is yet, so none shows), the four social
 * platforms it names (unlinked until their addresses arrive) and a
 * photograph cut with a leaf corner. On the right, the form on a white
 * panel. On phones the form comes straight after the heading, ahead of the
 * photograph, which keeps a 5:4 frame there; on large screens its frame
 * grows or shrinks to end level with the form (the media brief asks for
 * room all round the people for this).
 */
export function Enquiry() {
  const { labels } = contactEnquiry;
  const details: { label: string; value: string; href?: string; icon: LucideIcon }[] = [
    { label: labels.address, value: contact.address, icon: MapPin },
    {
      label: labels.telephone,
      value: contact.telephone,
      href: `tel:${contact.telephone.replace(/\s+/g, "")}`,
      icon: Phone,
    },
    { label: labels.email, value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
    { label: labels.website, value: contact.website, href: contact.website, icon: Globe },
  ].filter((item) => item.value);

  return (
    <section
      id={contactEnquiry.id}
      aria-labelledby="contact-us-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-cream py-band"
    >
      <Shell>
        {/* The form spans both rows on large screens. The second row takes
            whatever height the form leaves under the heading, and the
            photograph fills it, so the two columns end together whether or
            not the contact details have been supplied. */}
        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] xl:gap-x-20">
          <div className="lg:col-span-5 lg:row-start-1">
            <Reveal variant="fade">
              <Kicker>{contactEnquiry.kicker}</Kicker>
            </Reveal>
            <Title
              id="contact-us-title"
              lead={contactEnquiry.titleLead}
              accent={contactEnquiry.titleAccent}
              inline
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-5 max-w-md text-lead text-slate">{contactEnquiry.lead}</p>

              {details.length ? (
                <ul className="mt-7 space-y-4">
                  {details.map((item) => (
                    <li key={item.label} className="flex items-center gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white">
                        <item.icon aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.7} />
                      </span>
                      <span>
                        <span className="block text-[0.75rem] font-bold uppercase tracking-[0.18em] text-ink-muted">
                          {item.label}
                        </span>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[1rem] font-medium text-ink transition-colors hover:text-lagoon-600"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-[1rem] font-medium text-ink">{item.value}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-7 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-ink-muted">
                {contactEnquiry.socialLabel}
              </p>
              <ul className="mt-3 flex gap-2.5" aria-label={contactEnquiry.socialLabel}>
                {contact.social.map((item) => (
                  <li key={item.platform}>
                    {item.href ? (
                      <a
                        href={item.href}
                        aria-label={item.label}
                        className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-[0_10px_24px_-14px_rgb(10_37_64/0.45)] transition-colors duration-500 hover:bg-ink hover:text-white"
                      >
                        <SocialIcon platform={item.platform} className="h-4 w-4" />
                      </a>
                    ) : (
                      // Named in the brief; its link has not been supplied yet.
                      <span
                        title={item.label}
                        className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-[0_10px_24px_-14px_rgb(10_37_64/0.45)]"
                      >
                        <SocialIcon platform={item.platform} className="h-4 w-4" />
                        <span className="sr-only">{item.label}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={140} className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <div className="rounded-panel bg-white shadow-[0_40px_80px_-50px_rgb(10_37_64/0.55)]">
              <Suspense fallback={<EnquiryForm />}>
                <EnquiryFormFromQuery />
              </Suspense>
            </div>
          </Reveal>

          <Reveal variant="image" className="lg:col-span-5 lg:row-start-2">
            <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.18)] lg:h-full">
              <div className="reveal-clip relative aspect-[5/4] overflow-hidden rounded-[7rem_2rem_2rem_2rem] bg-sand lg:aspect-auto lg:h-full lg:min-h-[20rem]">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={contactEnquiry.image.src}
                      alt={contactEnquiry.image.alt}
                      fill
                      sizes="(min-width: 1920px) 700px, (min-width: 1024px) 36vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: contactEnquiry.image.position }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

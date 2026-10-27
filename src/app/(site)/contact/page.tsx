import type { Metadata } from "next";
import { Hero } from "@/components/site/contact/Hero";
import { Enquiry } from "@/components/site/contact/Enquiry";
import { Signposting } from "@/components/site/contact/Signposting";
import { Safety } from "@/components/site/contact/Safety";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { contactCta, contactHero, contactSections } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: contactHero.description,
  alternates: { canonical: "/contact" },
};

/**
 * Contact. The brief's CONTACT US block beside an enquiry form that takes
 * every call to act the site sends here, then its Information & Signposting
 * block, and the Foundation's safeguarding, privacy and accessibility lines
 * with the brief's 999 advice. It closes on the brief's closing line. Copy
 * and images live in src/data/contact.ts; the form's server action is in
 * ./actions.ts.
 */
export default function ContactPage() {
  return (
    <>
      <Hero />
      <SectionNav label={contactSections.label} links={contactSections.links} />
      <Enquiry />
      <Signposting />
      <Safety />
      <CtaBanner
        id="contact-cta-title"
        kicker={contactCta.kicker}
        titleLead={contactCta.titleLead}
        titleAccent={contactCta.titleAccent}
        description={contactCta.description}
        primaryCta={contactCta.primaryCta}
        secondaryCta={contactCta.secondaryCta}
        image={contactCta.image}
      />
    </>
  );
}

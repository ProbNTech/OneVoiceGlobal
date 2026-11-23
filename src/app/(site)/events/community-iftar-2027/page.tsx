import type { Metadata } from "next";
import { Hero } from "@/components/site/iftar/Hero";
import { About } from "@/components/site/iftar/About";
import { Highlights } from "@/components/site/iftar/Highlights";
import { Attend } from "@/components/site/iftar/Attend";
import { Partners } from "@/components/site/iftar/Partners";
import { Programme } from "@/components/site/iftar/Programme";
import { Register } from "@/components/site/iftar/Register";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { routes } from "@/data/site";
import { iftarCta, iftarFacts, iftarHero, iftarSections } from "@/data/iftar";
import { JsonLd } from "@/components/site/seo/JsonLd";
import { absoluteUrl, organizationRef, pageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(routes.iftar);

/*
 * The event for search engines, from the same facts the page shows. The
 * page says its date and venue are provisional; if they change, change
 * `iftarFacts` and this follows.
 */
const [venueName, venueStreet, ...venuePlace] = iftarFacts.venue.split(", ");
const venueLocality = venuePlace.join(", ");

const eventJsonLd = {
  "@type": "Event",
  name: iftarFacts.name,
  description: iftarHero.description,
  startDate: iftarFacts.isoDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    // The venue line reads "Lee Valley Stadium, Queen Elizabeth Olympic Park, Stratford, East London".
    name: venueName,
    address: {
      "@type": "PostalAddress",
      streetAddress: venueStreet,
      addressLocality: venueLocality,
      addressCountry: "GB",
    },
  },
  image: absoluteUrl(iftarHero.images.main.src),
  organizer: organizationRef,
  url: absoluteUrl(routes.iftar),
};

/**
 * OneVoice Community Iftar 2027, the first event in the Events 2027
 * calendar, on a page of its own. The client's Iftar document (4 November
 * 2026) in the order its "Recommended website layout" gives: the hero, the
 * event and OneVoice's mission, its highlights, who should attend,
 * partnership and sponsorship, the programme and venue, and registration
 * with the interest form, closed by its call to build stronger communities.
 * Copy and images live in src/data/iftar.ts.
 */
export default function IftarPage() {
  return (
    <>
      <JsonLd data={pageJsonLd(routes.iftar, { mainEntity: eventJsonLd })} />
      <Hero />
      <SectionNav label={iftarSections.label} links={iftarSections.links} />
      <About />
      <Highlights />
      <Attend />
      <Partners />
      <Programme />
      <Register />
      <CtaBanner
        id="iftar-cta-title"
        kicker={iftarCta.kicker}
        titleLead={iftarCta.titleLead}
        titleAccent={iftarCta.titleAccent}
        description={iftarCta.description}
        primaryCta={iftarCta.primaryCta}
        secondaryCta={iftarCta.secondaryCta}
        image={iftarCta.image}
      />
    </>
  );
}

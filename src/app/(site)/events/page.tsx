import type { Metadata } from "next";
import { Hero } from "@/components/site/events/Hero";
import { Calendar } from "@/components/site/events/Calendar";
import { Iftar } from "@/components/site/events/Iftar";
import { WomensDay } from "@/components/site/events/WomensDay";
import { EidBazaar } from "@/components/site/events/EidBazaar";
import { Pakistan } from "@/components/site/events/Pakistan";
import { Walks } from "@/components/site/events/Walks";
import { Yearbook } from "@/components/site/events/Yearbook";
import { Awards } from "@/components/site/events/Awards";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { routes } from "@/data/site";
import { eventsCta, eventsHero, eventsSections } from "@/data/events";

export const metadata: Metadata = {
  title: "Events 2027",
  description: eventsHero.description,
  alternates: { canonical: routes.events },
};

/**
 * Events 2027. The brief's V.2 EVENTS 2027 block: its subtitle and
 * introduction as the hero, its proposed annual calendar as an agenda, then
 * the seven events in its order, which is the order of the Events 2027
 * sub-menu, each in a design of its own. It closes on the block's
 * invitation to make 2027 a year of connection. Copy and images live in
 * src/data/events.ts.
 */
export default function EventsPage() {
  return (
    <>
      <Hero />
      <SectionNav label={eventsSections.label} links={eventsSections.links} />
      <Calendar />
      <Iftar />
      <WomensDay />
      <EidBazaar />
      <Pakistan />
      <Walks />
      <Yearbook />
      <Awards />
      <CtaBanner
        id="events-cta-title"
        kicker={eventsCta.kicker}
        titleLead={eventsCta.titleLead}
        titleAccent={eventsCta.titleAccent}
        description={eventsCta.description}
        primaryCta={eventsCta.primaryCta}
        secondaryCta={eventsCta.secondaryCta}
        image={eventsCta.image}
      />
    </>
  );
}

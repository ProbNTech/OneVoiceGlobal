import type { Metadata } from "next";
import { Hero } from "@/components/site/our-work/Hero";
import { Education } from "@/components/site/our-work/Education";
import { Livelihoods } from "@/components/site/our-work/Livelihoods";
import { Wellbeing } from "@/components/site/our-work/Wellbeing";
import { Inclusion } from "@/components/site/our-work/Inclusion";
import { Youth } from "@/components/site/our-work/Youth";
import { Partnerships } from "@/components/site/our-work/Partnerships";
import { International } from "@/components/site/our-work/International";
import { Refugee } from "@/components/site/our-work/Refugee";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { ourWorkCta, ourWorkSections } from "@/data/our-work";
import { JsonLd } from "@/components/site/seo/JsonLd";
import { pageJsonLd, pageMetadata } from "@/lib/seo";
import { routes } from "@/data/site";

export const metadata: Metadata = pageMetadata(routes.ourWork);

/**
 * Our Work. The brief's V.2 "Our Work" block: its subtitle and opening
 * sentence as the hero, then its seven areas in its order, which is the
 * order of the Our Work sub-menu, each in a design of its own, then the
 * client's new Refugee & Asylum Seeker Support service (11 November 2026),
 * introduced here and given a page of its own. It closes on the brief's
 * invitation to join the network. Copy and images live in
 * src/data/our-work.ts. (This route replaced the first design's /our-work
 * page in the `(legacy)` group.)
 */
export default function OurWorkPage() {
  return (
    <>
      <JsonLd data={pageJsonLd(routes.ourWork)} />
      <Hero />
      <SectionNav label={ourWorkSections.label} links={ourWorkSections.links} />
      <Education />
      <Livelihoods />
      <Wellbeing />
      <Inclusion />
      <Youth />
      <Partnerships />
      <International />
      <Refugee />
      <CtaBanner
        id="our-work-cta-title"
        kicker={ourWorkCta.kicker}
        titleLead={ourWorkCta.titleLead}
        titleAccent={ourWorkCta.titleAccent}
        description={ourWorkCta.description}
        primaryCta={ourWorkCta.primaryCta}
        secondaryCta={ourWorkCta.secondaryCta}
        image={ourWorkCta.image}
      />
    </>
  );
}

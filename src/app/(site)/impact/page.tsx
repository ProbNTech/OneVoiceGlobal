import type { Metadata } from "next";
import { Hero } from "@/components/site/impact/Hero";
import { Tracking } from "@/components/site/impact/Tracking";
import { Framework } from "@/components/site/impact/Framework";
import { Programmes } from "@/components/site/impact/Programmes";
import { Stories } from "@/components/site/impact/Stories";
import { Reports } from "@/components/site/impact/Reports";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { routes } from "@/data/site";
import { impactCta, impactHero, impactSections } from "@/data/impact";

export const metadata: Metadata = {
  title: "Impact",
  description: impactHero.description[0],
  alternates: { canonical: routes.impact },
};

/**
 * Impact. The brief's IMPACT block in the order of its sub-menu: Our Impact
 * (what OneVoice will track, its Impact Framework, and how the Seminars &
 * Workshops programmes will be measured), Success Stories and Reports. It
 * closes on the brief's call to invest in measurable social impact. Copy and
 * images live in src/data/impact.ts.
 */
export default function ImpactPage() {
  return (
    <>
      <Hero />
      <SectionNav label={impactSections.label} links={impactSections.links} />
      <Tracking />
      <Framework />
      <Programmes />
      <Stories />
      <Reports />
      <CtaBanner
        id="impact-cta-title"
        kicker={impactCta.kicker}
        titleLead={impactCta.titleLead}
        titleAccent={impactCta.titleAccent}
        description={impactCta.description}
        primaryCta={impactCta.primaryCta}
        secondaryCta={impactCta.secondaryCta}
        image={impactCta.image}
      />
    </>
  );
}

import type { Metadata } from "next";
import { Hero } from "@/components/site/programmes/Hero";
import { Education } from "@/components/site/programmes/Education";
import { Digital } from "@/components/site/programmes/Digital";
import { Employment } from "@/components/site/programmes/Employment";
import { ReturnToWork } from "@/components/site/programmes/ReturnToWork";
import { Enterprise } from "@/components/site/programmes/Enterprise";
import { NetworkMentoring } from "@/components/site/programmes/NetworkMentoring";
import { People } from "@/components/site/programmes/People";
import { Wellbeing } from "@/components/site/programmes/Wellbeing";
import { Safety } from "@/components/site/programmes/Safety";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { programmesCta, programmesHero, programmesSections } from "@/data/programmes-page";

export const metadata: Metadata = {
  title: "Programmes",
  description: programmesHero.description,
  alternates: { canonical: "/programmes" },
};

/**
 * Programmes. The brief's twenty-three programme blocks, grouped into seven
 * themes in the order of the Programmes sub-menu: Education & English,
 * Digital OneVoice, Employment & Careers (with Return to Work), Enterprise &
 * Mentoring (with the OneVoice Business Network), Women, Men & Youth,
 * Wellbeing & Family, and Safety & Advice. It closes on
 * the brief's call for referrals. Copy and images live in
 * src/data/programmes-page.ts.
 */
export default function ProgrammesPage() {
  return (
    <>
      <Hero />
      <SectionNav label={programmesSections.label} links={programmesSections.links} />
      <Education />
      <Digital />
      <Employment />
      <ReturnToWork />
      <Enterprise />
      <NetworkMentoring />
      <People />
      <Wellbeing />
      <Safety />
      <CtaBanner
        id="programmes-cta-title"
        kicker={programmesCta.kicker}
        titleLead={programmesCta.titleLead}
        titleAccent={programmesCta.titleAccent}
        description={programmesCta.description}
        primaryCta={programmesCta.primaryCta}
        secondaryCta={programmesCta.secondaryCta}
        image={programmesCta.image}
      />
    </>
  );
}

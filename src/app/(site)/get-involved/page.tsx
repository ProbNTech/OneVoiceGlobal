import type { Metadata } from "next";
import { Hero } from "@/components/site/get-involved/Hero";
import { Ways } from "@/components/site/get-involved/Ways";
import { Refer } from "@/components/site/get-involved/Refer";
import { Process } from "@/components/site/get-involved/Process";
import { Journey } from "@/components/site/get-involved/Journey";
import { Volunteer } from "@/components/site/get-involved/Volunteer";
import { Donate } from "@/components/site/get-involved/Donate";
import { PartnerSponsor } from "@/components/site/get-involved/PartnerSponsor";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { getInvolvedCta, getInvolvedHero, getInvolvedSections } from "@/data/get-involved";

export const metadata: Metadata = {
  title: "Get Involved",
  description: getInvolvedHero.description,
  alternates: { canonical: "/get-involved" },
};

/**
 * Get Involved. The Foundation's five ways to support its work, then a
 * section for each way in the brief's sub-menu, in its order: Refer Someone
 * (with its referral process, and the brief's blocks for individuals, young
 * people and men after it), Volunteer, Donate, and Become a Partner with
 * Sponsor a Programme. It closes on the brief's invitation to start with one
 * conversation. Copy and images live in src/data/get-involved.ts.
 */
export default function GetInvolvedPage() {
  return (
    <>
      <Hero />
      <SectionNav label={getInvolvedSections.label} links={getInvolvedSections.links} />
      <Ways />
      <Refer />
      <Process />
      <Journey />
      <Volunteer />
      <Donate />
      <PartnerSponsor />
      <CtaBanner
        id="get-involved-cta-title"
        kicker={getInvolvedCta.kicker}
        titleLead={getInvolvedCta.titleLead}
        titleAccent={getInvolvedCta.titleAccent}
        description={getInvolvedCta.description}
        primaryCta={getInvolvedCta.primaryCta}
        secondaryCta={getInvolvedCta.secondaryCta}
        image={getInvolvedCta.image}
      />
    </>
  );
}

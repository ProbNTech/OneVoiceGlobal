import type { Metadata } from "next";
import { Hero } from "@/components/site/partners/Hero";
import { Overview } from "@/components/site/partners/Overview";
import { Employers } from "@/components/site/partners/Employers";
import { Training } from "@/components/site/partners/Training";
import { CommunityOrgs } from "@/components/site/partners/CommunityOrgs";
import { PublicSector } from "@/components/site/partners/PublicSector";
import { Corporate } from "@/components/site/partners/Corporate";
import { Funders } from "@/components/site/partners/Funders";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { partnersCta, partnersHero, partnersSections } from "@/data/partners";

export const metadata: Metadata = {
  title: "Partners",
  description: partnersHero.description,
  alternates: { canonical: "/partners" },
};

/**
 * Partners. The Foundation's introduction to its partnerships, then one
 * section for each kind of partner in the order of the brief's Partners
 * sub-menu (Employers to Funders), closed by the brief's PARTNER WITH
 * ONEVOICE call. Copy and images live in src/data/partners.ts.
 */
export default function PartnersPage() {
  return (
    <>
      <Hero />
      <SectionNav label={partnersSections.label} links={partnersSections.links} />
      <Overview />
      <Employers />
      <Training />
      <CommunityOrgs />
      <PublicSector />
      <Corporate />
      <Funders />
      <CtaBanner
        id="partners-cta-title"
        kicker={partnersCta.kicker}
        titleLead={partnersCta.titleLead}
        titleAccent={partnersCta.titleAccent}
        description={partnersCta.description}
        primaryCta={partnersCta.primaryCta}
        secondaryCta={partnersCta.secondaryCta}
        image={partnersCta.image}
      />
    </>
  );
}

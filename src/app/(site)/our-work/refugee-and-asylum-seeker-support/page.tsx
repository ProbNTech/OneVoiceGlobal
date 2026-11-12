import type { Metadata } from "next";
import { Hero } from "@/components/site/refugee-support/Hero";
import { Asylum } from "@/components/site/refugee-support/Asylum";
import { Sponsorship } from "@/components/site/refugee-support/Sponsorship";
import { Education } from "@/components/site/refugee-support/Education";
import { Approach } from "@/components/site/refugee-support/Approach";
import { WorkWithUs } from "@/components/site/refugee-support/WorkWithUs";
import { Supporter } from "@/components/site/refugee-support/Supporter";
import { Commitment } from "@/components/site/refugee-support/Commitment";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { routes } from "@/data/site";
import { refugeeHero, refugeeSections } from "@/data/refugee-support";

export const metadata: Metadata = {
  title: "Refugee & Asylum Seeker Support",
  description: refugeeHero.description,
  alternates: { canonical: routes.refugeeSupport },
};

/**
 * Refugee & Asylum Seeker Support, a service under Our Work on a page of its
 * own. The client's document (11 November 2026) in its order: the banner
 * with its three priorities, its three programmes (Asylum Seeker Support,
 * Refugee Community Sponsorship, Refugee Education and Employment), Our
 * Approach, Work With Us, Become a Supporter with the enquiry form, and Our
 * Commitment, which closes the page in place of a photo banner, as the
 * document ends on it. Copy and images live in src/data/refugee-support.ts.
 */
export default function RefugeeSupportPage() {
  return (
    <>
      <Hero />
      <SectionNav label={refugeeSections.label} links={refugeeSections.links} />
      <Asylum />
      <Sponsorship />
      <Education />
      <Approach />
      <WorkWithUs />
      <Supporter />
      <Commitment />
    </>
  );
}

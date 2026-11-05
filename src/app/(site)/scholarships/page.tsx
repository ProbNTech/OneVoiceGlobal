import type { Metadata } from "next";
import { Hero } from "@/components/site/scholarships/Hero";
import { About } from "@/components/site/scholarships/About";
import { Vision } from "@/components/site/scholarships/Vision";
import { Grants } from "@/components/site/scholarships/Grants";
import { WhoCanApply } from "@/components/site/scholarships/WhoCanApply";
import { International } from "@/components/site/scholarships/International";
import { Levels } from "@/components/site/scholarships/Levels";
import { Process } from "@/components/site/scholarships/Process";
import { Support } from "@/components/site/scholarships/Support";
import { Named } from "@/components/site/scholarships/Named";
import { Partners } from "@/components/site/scholarships/Partners";
import { Impact } from "@/components/site/scholarships/Impact";
import { Faq } from "@/components/site/scholarships/Faq";
import { Contact } from "@/components/site/scholarships/Contact";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { routes } from "@/data/site";
import { scholarshipsCta, scholarshipsHero, scholarshipsSections } from "@/data/scholarships";

export const metadata: Metadata = {
  title: "Scholarships & Educational Grants",
  description: scholarshipsHero.lead,
  alternates: { canonical: routes.scholarships },
};

/**
 * Scholarships. The client's OneVoice Scholarship & Educational Grants
 * Programme document (4 November 2026) in its own order: the main banner,
 * About the Programme with its vision, mission and values, the six kinds of
 * scholarship and grant, who can apply (with international students), the
 * grant levels, the application process and the commitment to fairness,
 * supporting a student and named scholarships, partners, impact and the
 * questions, then the programme's contact block with the enquiry form and
 * the document's closing call. Copy and images live in
 * src/data/scholarships.ts.
 */
export default function ScholarshipsPage() {
  return (
    <>
      <Hero />
      <SectionNav label={scholarshipsSections.label} links={scholarshipsSections.links} />
      <About />
      <Vision />
      <Grants />
      <WhoCanApply />
      <International />
      <Levels />
      <Process />
      <Support />
      <Named />
      <Partners />
      <Impact />
      <Faq />
      <Contact />
      <CtaBanner
        id="scholarships-cta-title"
        kicker={scholarshipsCta.kicker}
        titleLead={scholarshipsCta.titleLead}
        titleAccent={scholarshipsCta.titleAccent}
        description={scholarshipsCta.description}
        primaryCta={scholarshipsCta.primaryCta}
        secondaryCta={scholarshipsCta.secondaryCta}
        image={scholarshipsCta.image}
      />
    </>
  );
}

import type { Metadata } from "next";
import { Hero } from "@/components/site/seminars/Hero";
import { Approach } from "@/components/site/seminars/Approach";
import { PriorityWorkshops } from "@/components/site/seminars/PriorityWorkshops";
import { MentalHealth } from "@/components/site/seminars/MentalHealth";
import { Rights } from "@/components/site/seminars/Rights";
import { Relationships } from "@/components/site/seminars/Relationships";
import { TenSigns } from "@/components/site/seminars/TenSigns";
import { WhoCanBenefit } from "@/components/site/seminars/WhoCanBenefit";
import { Delivery } from "@/components/site/seminars/Delivery";
import { WorkWithUs } from "@/components/site/seminars/WorkWithUs";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { routes } from "@/data/site";
import { seminarsCta, seminarsHero, seminarsSections } from "@/data/seminars";

export const metadata: Metadata = {
  title: "Seminars & Workshops",
  description: seminarsHero.description,
  alternates: { canonical: routes.seminars },
};

/**
 * Seminars & Workshops. The brief's V.2 SEMINARS & WORKSHOPS block: its
 * overview as the hero and Our Approach, then the four sections of the
 * Seminars & Workshops sub-menu in its order (Priority Workshops for 2027,
 * Mental Health & Wellbeing, Rights & Empowerment and Healthy
 * Relationships, the last followed by its "10 Signs"), then what the three
 * programmes share: who can benefit, how the programme will be delivered
 * and kept safe, and Work With Us. It closes on the overview's Get
 * Involved call. Copy and images live in src/data/seminars.ts.
 */
export default function SeminarsPage() {
  return (
    <>
      <Hero />
      <SectionNav label={seminarsSections.label} links={seminarsSections.links} />
      <Approach />
      <PriorityWorkshops />
      <MentalHealth />
      <Rights />
      <Relationships />
      <TenSigns />
      <WhoCanBenefit />
      <Delivery />
      <WorkWithUs />
      <CtaBanner
        id="seminars-cta-title"
        kicker={seminarsCta.kicker}
        titleLead={seminarsCta.titleLead}
        titleAccent={seminarsCta.titleAccent}
        description={seminarsCta.description}
        primaryCta={seminarsCta.primaryCta}
        secondaryCta={seminarsCta.secondaryCta}
        image={seminarsCta.image}
      />
    </>
  );
}

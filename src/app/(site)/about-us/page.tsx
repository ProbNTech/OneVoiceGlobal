import type { Metadata } from "next";
import { Hero } from "@/components/site/about/Hero";
import { WhoWeAre } from "@/components/site/about/WhoWeAre";
import { VisionMission } from "@/components/site/about/VisionMission";
import { Values } from "@/components/site/about/Values";
import { Approach } from "@/components/site/about/Approach";
import { TheoryOfChange } from "@/components/site/about/TheoryOfChange";
import { Centre } from "@/components/site/about/Centre";
import { Trust } from "@/components/site/about/Trust";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { aboutCta, aboutHero, aboutSections } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutHero.description,
  alternates: { canonical: "/about-us" },
};

/**
 * About Us. The Foundation's own V.2 block in the order of the About Us
 * sub-menu (Who We Are, Vision & Mission, Our Values, Our Approach, with its
 * Theory of Change), then the Skill Development Centre, its delivery arm,
 * with What We Do, and the brief's Safeguarding, Policies and Accessibility
 * as tabs. It closes on the brief's subtitle for Our Work. Our Team, the one
 * menu entry left out, waits for content from the client. Copy and images
 * live in src/data/about.ts.
 */
export default function AboutPage() {
  return (
    <>
      <Hero />
      <SectionNav label={aboutSections.label} links={aboutSections.links} />
      <WhoWeAre />
      <VisionMission />
      <Values />
      <Approach />
      <TheoryOfChange />
      <Centre />
      <Trust />
      <CtaBanner
        id="about-cta-title"
        kicker={aboutCta.kicker}
        titleLead={aboutCta.titleLead}
        titleAccent={aboutCta.titleAccent}
        description={aboutCta.description}
        primaryCta={aboutCta.primaryCta}
        secondaryCta={aboutCta.secondaryCta}
        image={aboutCta.image}
      />
    </>
  );
}

import type { Metadata } from "next";
import { Hero } from "@/components/site/about/Hero";
import { SectionNav } from "@/components/site/about/SectionNav";
import { WhoWeAre } from "@/components/site/about/WhoWeAre";
import { VisionMission } from "@/components/site/about/VisionMission";
import { Values } from "@/components/site/about/Values";
import { Journey } from "@/components/site/about/Journey";
import { WhatWeDo } from "@/components/site/about/WhatWeDo";
import { Approach } from "@/components/site/about/Approach";
import { Safeguarding } from "@/components/site/about/Safeguarding";
import { aboutHero } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutHero.description,
  alternates: { canonical: "/about-us" },
};

/**
 * About Us. The menu's sections run in its order; the OneVoice Journey, which
 * the menu does not list, closes the page. Our Team is the one menu section
 * still to come: the brief gives it no content yet, so the strip leaves it
 * out.
 */
export default function AboutPage() {
  return (
    <>
      <Hero />
      <SectionNav />
      <WhoWeAre />
      <VisionMission />
      <Values />
      <Approach />
      <WhatWeDo />
      <Safeguarding />
      <Journey />
    </>
  );
}

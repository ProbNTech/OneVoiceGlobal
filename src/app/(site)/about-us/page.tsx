import type { Metadata } from "next";
import { Hero } from "@/components/site/about/Hero";
import { SectionNav } from "@/components/site/about/SectionNav";
import { WhoWeAre } from "@/components/site/about/WhoWeAre";
import { VisionMission } from "@/components/site/about/VisionMission";
import { Journey } from "@/components/site/about/Journey";
import { Values } from "@/components/site/about/Values";
import { Approach } from "@/components/site/about/Approach";
import { Commitments } from "@/components/site/about/Commitments";
import { aboutHero } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutHero.description,
  alternates: { canonical: "/about-us" },
};

/**
 * About Us, in the menu's order. Our Team is the one menu section still to
 * come: the brief gives it no content yet, so the strip leaves it out.
 */
export default function AboutPage() {
  return (
    <>
      <Hero />
      <SectionNav />
      <WhoWeAre />
      <Approach />
      <VisionMission />
      <Journey />
      <Values />
      <Commitments />
    </>
  );
}

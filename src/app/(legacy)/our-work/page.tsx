import type { Metadata } from "next";
import { OurWorkHero } from "@/components/work/OurWorkHero";
import { WorkAreaNavigation } from "@/components/work/WorkAreaNavigation";
import { OurWorkEditorial } from "@/components/work/OurWorkEditorial";
import { WorkAreaSection } from "@/components/work/WorkAreaSection";
import { OurWorkCTA } from "@/components/work/OurWorkCTA";
import { serviceAreas } from "@/data/services";
import { ourWorkHero } from "@/data/work";

export const metadata: Metadata = {
  title: "Our Work",
  description: ourWorkHero.body,
  alternates: { canonical: "/our-work" },
  openGraph: {
    title: "Our Work | OneVoice Global Foundation",
    description: ourWorkHero.body,
    type: "website",
  },
};

/**
 * Our Work — the five areas of work.
 *
 * Route note: the menu label is "Our Work" and the spec's proposed route for
 * this content is `/services`. This project settled on `/our-work`, which the
 * header, footer and dropdown already point at; there is deliberately no
 * second `/services` route, so the content has one URL.
 *
 * The five sections are rendered from `serviceAreas` rather than written out
 * here, so the page, the homepage grid and the navigation can never disagree
 * about what the five areas are. Each section's anchor id is its slug, which
 * is what the hero link, the navigation strip and the header dropdown all
 * point at.
 */
export default function OurWorkPage() {
  return (
    <main id="main-content" className="flex-1">
      <OurWorkHero />
      <WorkAreaNavigation />
      <OurWorkEditorial />

      {serviceAreas.map((area, index) => (
        <WorkAreaSection key={area.slug} area={area} index={index} />
      ))}

      <OurWorkCTA />
    </main>
  );
}

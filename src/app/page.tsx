import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ProgrammesSection } from "@/components/home/ProgrammesSection";
import { WhyOneVoice } from "@/components/home/WhyOneVoice";
import { SupportAdvantage } from "@/components/home/SupportAdvantage";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { JourneySection } from "@/components/home/JourneySection";
import { WhoWeSupport } from "@/components/home/WhoWeSupport";
import { ImpactSection } from "@/components/home/ImpactSection";
import { StoriesSection } from "@/components/home/StoriesSection";
import { CommunitySection } from "@/components/home/CommunitySection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { FinalCTA } from "@/components/home/FinalCTA";

/**
 * OneVoice Global Foundation — homepage.
 *
 * Sections follow the design brief, with the support principles added after
 * the approach section. The footer lives in the root layout. Every section is a server
 * component except the hero, which owns its entrance choreography; animation
 * elsewhere is isolated in the `Reveal` client wrapper, keeping client-side
 * JavaScript to a minimum.
 */
export default function Home() {
  return (
    <main id="main-content" className="home-page flex-1">
      <HeroSection />
      <AboutSection />
      <ProgrammesSection />
      <WhyOneVoice />
      <SupportAdvantage />
      <ServiceAreas />
      <JourneySection />
      <WhoWeSupport />
      <ImpactSection />
      <StoriesSection />
      <CommunitySection />
      <PartnersSection />
      <FinalCTA />
    </main>
  );
}

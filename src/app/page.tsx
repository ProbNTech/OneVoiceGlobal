import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ProgrammesSection } from "@/components/home/ProgrammesSection";
import { WhyOneVoice } from "@/components/home/WhyOneVoice";
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
 * Sections follow the approved order from the design brief (01–13; the footer
 * is section 14 and lives in the root layout). Every section is a server
 * component except the hero, which owns its entrance choreography; animation
 * elsewhere is isolated in the `Reveal` client wrapper, keeping client-side
 * JavaScript to a minimum.
 */
export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <HeroSection />
      <AboutSection />
      <ProgrammesSection />
      <WhyOneVoice />
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

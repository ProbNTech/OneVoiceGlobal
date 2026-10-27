import { Hero } from "@/components/site/home/Hero";
import { Intro } from "@/components/site/home/Intro";
import { WhyOneVoice } from "@/components/site/home/WhyOneVoice";
import { Programmes } from "@/components/site/home/Programmes";
import { Journey } from "@/components/site/home/Journey";
import { WhoWeSupport } from "@/components/site/home/WhoWeSupport";
import { WorkWithUs } from "@/components/site/home/WorkWithUs";
import { Foundation } from "@/components/site/home/Foundation";
import { FinalCta } from "@/components/site/home/FinalCta";

/**
 * Home page, in the brief's order: HOMEPAGE HERO (the hero and its opening
 * paragraph), WHY ONEVOICE?, OUR CORE PROGRAMMES, OUR JOURNEY, WHO WE
 * SUPPORT, WORK WITH US, the Foundation's lines that close V.2's homepage
 * block, and the FINAL CALL TO ACTION, kept last as the page's close. Copy
 * and images live in src/data/home.ts.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <WhyOneVoice />
      <Programmes />
      <Journey />
      <WhoWeSupport />
      <WorkWithUs />
      <Foundation />
      <FinalCta />
    </>
  );
}

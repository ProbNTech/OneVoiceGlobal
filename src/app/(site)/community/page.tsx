import type { Metadata } from "next";
import { Hero } from "@/components/site/community/Hero";
import { Outreach } from "@/components/site/community/Outreach";
import { Integration } from "@/components/site/community/Integration";
import { Hub } from "@/components/site/community/Hub";
import { Network } from "@/components/site/community/Network";
import { Volunteering } from "@/components/site/community/Volunteering";
import { Voice } from "@/components/site/community/Voice";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { communityCta, communityHero, communitySections } from "@/data/community";

export const metadata: Metadata = {
  title: "Community",
  description: communityHero.description,
  alternates: { canonical: "/community" },
};

/**
 * Community. The brief's V.2 Community block, in the order of its sub-menu:
 * Outreach (with Integration, which the block sets after it), the Community
 * Hub and its Network, Volunteering and Community Voice, closed by the
 * brief's call to support its work. Copy and images live in
 * src/data/community.ts.
 */
export default function CommunityPage() {
  return (
    <>
      <Hero />
      <SectionNav label={communitySections.label} links={communitySections.links} />
      <Outreach />
      <Integration />
      <Hub />
      <Network />
      <Volunteering />
      <Voice />
      <CtaBanner
        id="community-cta-title"
        kicker={communityCta.kicker}
        titleLead={communityCta.titleLead}
        titleAccent={communityCta.titleAccent}
        description={communityCta.description}
        primaryCta={communityCta.primaryCta}
        secondaryCta={communityCta.secondaryCta}
        image={communityCta.image}
      />
    </>
  );
}

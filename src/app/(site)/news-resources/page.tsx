import type { Metadata } from "next";
import { Hero } from "@/components/site/news/Hero";
import { Overview } from "@/components/site/news/Overview";
import { Latest } from "@/components/site/news/Latest";
import { Topics } from "@/components/site/news/Topics";
import { CtaBanner } from "@/components/site/ui/CtaBanner";
import { SectionNav } from "@/components/site/ui/SectionNav";
import { routes } from "@/data/site";
import { newsCta, newsHero, newsSections } from "@/data/news";

export const metadata: Metadata = {
  title: "News & Resources",
  description: newsHero.description,
  alternates: { canonical: routes.news },
};

/**
 * News & Resources. The brief's short NEWS & RESOURCES block: the five kinds
 * of content the site provides, each linked to where it lives; News, which
 * says plainly that nothing has been published yet, beside the events the
 * brief does give (Events 2027's proposed calendar); and the block's ten
 * topics, each linked to the part of the site that covers it. It closes on
 * the brief's homepage line. Copy and images live in src/data/news.ts.
 */
export default function NewsResourcesPage() {
  return (
    <>
      <Hero />
      <SectionNav label={newsSections.label} links={newsSections.links} />
      <Overview />
      <Latest />
      <Topics />
      <CtaBanner
        id="news-cta-title"
        kicker={newsCta.kicker}
        titleLead={newsCta.titleLead}
        titleAccent={newsCta.titleAccent}
        description={newsCta.description}
        primaryCta={newsCta.primaryCta}
        secondaryCta={newsCta.secondaryCta}
        image={newsCta.image}
      />
    </>
  );
}

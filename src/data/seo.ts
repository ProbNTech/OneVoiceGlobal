/**
 * Search and sharing text for every public page: the title in the browser
 * tab and search results, the meta description, and the name the page has in
 * breadcrumbs. Read by `pageMetadata` and the structured data in
 * src/lib/seo.ts, and by the sitemap.
 *
 * Every line is reshaped from the page's own copy (its hero, sub-menu or
 * first paragraph), so it adds no new claims. Each title is kept so that,
 * with the " | OneVoice Global Organisation" suffix the root layout adds, it
 * stays within the 60 characters search results show; each description
 * stays within 160. Most descriptions name the organisation in full, so
 * results are not confused with other organisations called One Voice.
 */

import { brand, routes } from "./site";

export type Route = (typeof routes)[keyof typeof routes];

export type PageSeo = {
  /** The page's part of the title; the root layout adds " | OneVoice Global Organisation". */
  title: string;
  /** Used whole, without the suffix, where the page's title would not fit it (the home page). */
  absoluteTitle?: string;
  description: string;
  /** The page's name in breadcrumbs: its menu label. */
  name: string;
  /** The page a sub-page sits under, for its breadcrumb trail. */
  parent?: Route;
  /** The schema.org type of the page itself. */
  type?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage";
  /** How often the page is expected to change and its weight against the others, for the sitemap. */
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

export const seo = {
  [routes.home]: {
    title: "Home",
    // The brief's "Community Empowerment, Skills and Social Inclusion Initiative", across London.
    absoluteTitle: `${brand.name} | Skills & Inclusion in London`,
    // The home page's opening line, with the organisation's name for the delivery centre's.
    description: `${brand.name} supports people from underserved communities across London to develop skills, build confidence, access employment and connect.`,
    name: "Home",
    changeFrequency: "weekly",
    priority: 1,
  },
  [routes.about]: {
    title: "About Us",
    // The About hero's lead, shortened.
    description: `About ${brand.name}: every person should have the opportunity to learn, develop their skills, improve their wellbeing and fulfil their potential.`,
    name: "About Us",
    type: "AboutPage",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  [routes.ourWork]: {
    title: "Our Work",
    // The Our Work menu's areas, shortened.
    description: `${brand.name}'s work: education, skills and digital inclusion, employment, enterprise, wellbeing, community inclusion, youth, women and families.`,
    name: "Our Work",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  [routes.refugeeSupport]: {
    title: "Refugee & Asylum Support",
    // The page's hero lead, shortened.
    description: `Refugee and asylum seeker support from ${brand.name}: humanitarian assistance, education, wellbeing services and community integration.`,
    name: "Refugee & Asylum Seeker Support",
    parent: routes.ourWork,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  [routes.programmes]: {
    title: "Programmes",
    // The Programmes hero's lead.
    description: `Programmes from ${brand.name} for women and men, young people, families, jobseekers, entrepreneurs, professionals and new communities.`,
    name: "Programmes",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  [routes.scholarships]: {
    title: "Scholarships & Grants",
    // The programme's name and the Scholarships hero's lead, shortened.
    description:
      "The OneVoice Scholarship & Educational Grants Programme: financial circumstances should never stop a talented, determined individual pursuing their education.",
    name: "Scholarships",
    // Its questions are marked up as the page's FAQ (see the page).
    type: "FAQPage",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  [routes.seminars]: {
    title: "Seminars & Workshops",
    // The Seminars hero's lead, shortened.
    description: `Seminars and practical workshops from ${brand.name} on mental wellbeing, personal development, family relationships, and social and legal rights.`,
    name: "Seminars & Workshops",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  [routes.events]: {
    title: "Events 2027",
    // The Events 2027 menu's five events.
    description: `${brand.name}'s 2027 events: Community Iftar, International Women's Day, marathon walks, Yearbook 2027 and the OneVoice Achievement Awards.`,
    name: "Events 2027",
    type: "CollectionPage",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  [routes.iftar]: {
    title: "Community Iftar 2027",
    // The event's date and venue (src/data/iftar.ts) and its first sentence, shortened.
    description:
      "OneVoice Community Iftar 2027, Saturday 20 February 2027, Lee Valley Stadium, Stratford: a community gathering celebrating the spirit of Ramadan.",
    name: "Community Iftar 2027",
    parent: routes.events,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  [routes.community]: {
    title: "Community",
    // The Community hero's lead.
    description: `${brand.name} brings people and organisations together to improve access to learning, wellbeing, employment and community participation.`,
    name: "Community",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  [routes.partners]: {
    title: "Partners",
    // The Partners menu's six kinds of partner.
    description: `Partner with ${brand.name}: employers, training providers, community organisations, the public sector, corporate partners and funders.`,
    name: "Partners",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  [routes.impact]: {
    title: "Impact",
    // The Impact hero's lead and the Impact menu.
    description: `How ${brand.name} will measure participation, progression and outcomes: our impact framework, success stories and reports.`,
    name: "Impact",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  [routes.news]: {
    title: "News & Resources",
    // The News & Resources hero's lead.
    description: `News and resources from ${brand.name}: news, events, opportunities, practical resources and success stories.`,
    name: "News & Resources",
    type: "CollectionPage",
    changeFrequency: "weekly",
    priority: 0.6,
  },
  [routes.getInvolved]: {
    title: "Get Involved",
    // The Get Involved menu's five ways.
    description: `Get involved with ${brand.name}: refer someone, volunteer, donate, become a partner or sponsor a programme.`,
    name: "Get Involved",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  [routes.contact]: {
    title: "Contact",
    // The Contact hero's lead, shortened, with the address from src/data/site.ts.
    description: `Contact ${brand.name}, 134-136 Westbourne Terrace, London W2 6QB. Enquiries welcome from organisations, professionals, volunteers and sponsors.`,
    name: "Contact",
    type: "ContactPage",
    changeFrequency: "yearly",
    priority: 0.8,
  },
  [routes.privacy]: {
    title: "Privacy Policy",
    description:
      "How we collect, use, store, protect and share personal information when you use our website, contact us, take part in our programmes or work with us.",
    name: "Privacy Policy",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  [routes.terms]: {
    title: "Terms & Conditions",
    description:
      "The terms that govern your use of our website, and what our information, programmes, seminars, workshops and events can and cannot offer.",
    name: "Terms & Conditions",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  [routes.cookies]: {
    title: "Cookie Policy",
    description: `What cookies are, how the ${brand.name} website uses them, and how you can manage them.`,
    name: "Cookie Policy",
    changeFrequency: "yearly",
    priority: 0.2,
  },
} satisfies Record<Route, PageSeo>;

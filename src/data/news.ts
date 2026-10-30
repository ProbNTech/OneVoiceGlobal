/**
 * Copy and media for the News & Resources page (`src/app/(site)/news-resources/page.tsx`).
 *
 * The brief's NEWS & RESOURCES block, the same in Draft01 and V.2, is short:
 * one opening line, the five kinds of content the site provides (News,
 * Events, Opportunities, Resources, Success Stories, each with one line)
 * and a list of ten further topics. It names no articles, so the page shows
 * none: it says plainly that no news has been published yet, lists the
 * events the brief does give (Events 2027's proposed calendar, read from
 * src/data/events.ts) and sends each kind of content and each topic to the
 * page of the site that already carries it. Section titles are lines of the
 * block itself, as noted beside each.
 *
 * IMAGES. Each photograph was generated for its slot (prompts in
 * `_source/generated/tools/make_prompts_news.py`) and cut to the slot's exact
 * size; the originals are kept in `_source/generated/`. No photograph here
 * is used anywhere else on the site. Alt text describes only what the frame
 * shows: none of these people is presented as a OneVoice participant or
 * member of staff.
 */

import type { HomeImage } from "@/data/home";
import { eventsCalendar } from "@/data/events";
import { brand, enquiryHref, navigation, routes } from "@/data/site";

/** A photograph generated for its slot, saved under /images/news/ by the slot's file name. */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/news/${file}.jpg`,
  alt,
  position,
});

const photo = {
  hero: shot(
    "news-hero",
    "A young woman and an older man smiling as they look at a noticeboard of cards and photographs in a bright entrance hall",
  ),
  overview: shot(
    "news-overview",
    "A woman in a teal hijab smiling as she reads on a tablet in an armchair in a sunlit reading corner",
  ),
  cta: shot(
    "news-cta",
    "People of different ages browsing bookshelves and studying at long tables with laptops in a bright resource room",
  ),
} satisfies Record<string, HomeImage>;

/** A sub-menu entry's link, read from the navigation so it follows the menu. */
const menuLink = (section: string, label: string) =>
  navigation.find((item) => item.label === section)?.children?.find((link) => link.label === label)?.href ??
  routes.home;

/** The page's own sections, for the strip under the hero. */
const ids = { news: "news", events: "events", resources: "resources" } as const;

/** The brief's call-to-action labels (V.2, "Website design standards"). */
const register = { label: "Register Your Interest", href: enquiryHref("interest") };

/* -------------------------------------------------------------------------
   HERO
   The block's name as the headline, and its opening line, with the five
   kinds of content it lists, beneath. On the card over the photograph, the
   block's line for News.
   ------------------------------------------------------------------------- */

export const newsHero = {
  kicker: "News & Resources",
  title: ["News &", "Resources"],
  description:
    "Our website provides practical resources covering news, events, opportunities, resources and success stories.",
  primaryCta: register,
  secondaryCta: { label: "Explore Programmes", href: routes.programmes },
  card: { label: "News", line: "Latest OneVoice activities and announcements." },
  image: photo.hero,
} as const;

export const newsSections = {
  label: "News & Resources",
  links: [
    { label: "News", href: `#${ids.news}` },
    { label: "Events", href: `#${ids.events}` },
    { label: "Resources", href: `#${ids.resources}` },
  ],
};

/* -------------------------------------------------------------------------
   WHAT THE SITE PROVIDES
   The block's five kinds of content, word for word, each linked to where
   it lives. The title is built from their names.
   ------------------------------------------------------------------------- */

export type KindIcon = "news" | "events" | "opportunities" | "resources" | "stories";

export const newsKinds = {
  id: "overview",
  kicker: "Practical Resources",
  titleLead: "News, Events,",
  titleAccent: "Opportunities & Resources",
  lead: "Our website provides practical resources covering:",
  kinds: [
    {
      name: "News",
      line: "Latest OneVoice activities and announcements.",
      icon: "news",
      href: `#${ids.news}`,
    },
    {
      name: "Events",
      line: "Upcoming workshops, courses and community events.",
      icon: "events",
      href: routes.events,
    },
    {
      name: "Opportunities",
      line: "Jobs, training, volunteering and enterprise opportunities.",
      icon: "opportunities",
      href: routes.getInvolved,
    },
    {
      name: "Resources",
      line: "Useful employment, education, wellbeing and community information.",
      icon: "resources",
      href: `#${ids.resources}`,
    },
    {
      name: "Success Stories",
      line: "Stories of participants progressing through OneVoice.",
      icon: "stories",
      href: menuLink("Impact", "Success Stories"),
    },
  ] satisfies { name: string; line: string; icon: KindIcon; href: string }[],
  image: photo.overview,
} as const;

/* -------------------------------------------------------------------------
   NEWS AND EVENTS
   The block's lines for News and Events as the two halves' titles. No
   news has been published, so the News half says so; the Events half lists
   Events 2027's proposed calendar, with that page's own note on dates.
   ------------------------------------------------------------------------- */

export const newsLatest = {
  id: ids.news,
  kicker: "News",
  titleLead: "Latest OneVoice Activities",
  titleAccent: "and Announcements",
  status: "No news has been published yet.",
  /* Events 2027's note: details are published as arrangements progress. */
  note: eventsCalendar.note,
  events: {
    id: ids.events,
    kicker: "Events",
    title: "Upcoming workshops, courses and community events.",
    items: eventsCalendar.events,
    cta: { label: "Events 2027", href: routes.events },
  },
} as const;

/* -------------------------------------------------------------------------
   RESOURCES BY TOPIC
   The block's ten further topics, each linked to the part of the site that
   covers it. The title is the block's line for Resources.
   ------------------------------------------------------------------------- */

export type TopicIcon =
  | "employment"
  | "training"
  | "digital"
  | "enterprise"
  | "women"
  | "safety"
  | "financial"
  | "community"
  | "events"
  | "partners";

export const newsTopics = {
  id: ids.resources,
  kicker: "Resources",
  titleLead: "Useful Employment, Education,",
  titleAccent: "Wellbeing and Community Information",
  topics: [
    { label: "Employment", icon: "employment", href: menuLink("Programmes", "Employment & Careers") },
    { label: "Training", icon: "training", href: menuLink("Programmes", "Education & English") },
    { label: "Digital skills", icon: "digital", href: menuLink("Programmes", "Digital OneVoice") },
    { label: "Enterprise", icon: "enterprise", href: menuLink("Programmes", "Enterprise & Mentoring") },
    { label: "Women's wellbeing", icon: "women", href: menuLink("Programmes", "Women, Men & Youth") },
    { label: "Domestic abuse support", icon: "safety", href: menuLink("Programmes", "Safety & Advice") },
    { label: "Financial capability", icon: "financial", href: menuLink("Programmes", "Wellbeing & Family") },
    { label: "Community opportunities", icon: "community", href: routes.community },
    { label: "Events", icon: "events", href: routes.events },
    { label: "Partner opportunities", icon: "partners", href: routes.partners },
  ] satisfies { label: string; icon: TopicIcon; href: string }[],
} as const;

/* -------------------------------------------------------------------------
   CLOSING CALL TO ACTION
   The brief's homepage line as the title, and the Foundation's purpose
   from its homepage hero beneath.
   ------------------------------------------------------------------------- */

export const newsCta = {
  kicker: brand.centre,
  titleLead: "Empowering People. Building Skills.",
  titleAccent: "Creating Opportunities.",
  description:
    "OneVoice aims to help communities access opportunities, strengthen participation and turn identified local needs into practical, measurable action.",
  primaryCta: register,
  secondaryCta: { label: "Volunteer", href: menuLink("Get Involved", "Volunteer") },
  image: photo.cta,
} as const;

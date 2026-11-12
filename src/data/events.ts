/**
 * Copy and media for the Events 2027 page (`src/app/(site)/events/page.tsx`).
 *
 * Every line comes from the brief's V.2 EVENTS 2027 block (24 October 2026):
 * its subtitle and introduction, its "Proposed annual calendar" of seven
 * events, and the potential award categories. The client withdrew the
 * calendar's third event, the Eid Bazaar, on 12 November 2026, so the page
 * shows six, numbered 01 to 06 in the brief's order. V.2 moved the Achievement
 * Awards here from Draft01's Community block; that block's subtitle for the
 * awards and its line on governance are borrowed, as noted beside them.
 * Each event's "Proposed highlights" sentence is set as a list, and the
 * section titles borrow each event's own theme or opening line.
 *
 * Dates are written as the brief gives them (for example "20 FEBRUARY
 * Saturday" or "MAR 2027 Date TBC"); the brief's own note says dates and
 * venues are provisional until confirmed, and the page says so beside the
 * calendar.
 *
 * IMAGES. Each photograph was generated for its slot and cut to the slot's
 * exact size (first-set prompts in `_source/events-media-brief.md`). Most
 * come from the second set (3 November 2026,
 * `_source/generated/tools/make_prompts_v2_pages2.py`), with varied
 * settings, clothes and faces, saved under /images/events/ as
 * `<slot>-v2.jpg` (originals in `_source/generated/v2-pages2/`); some keep
 * their first-set photograph (FIRST_SET below), so the page mixes both sets.
 * The slots in THIRD_SET show a third set (3 and 4 November 2026,
 * `_source/generated/tools/make_prompts_v3.py`, originals in
 * `_source/generated/v3/`), saved as `<slot>-v3.jpg`: they are cast towards
 * the client's mix of people across the site, counted by each photo's main
 * person (about 40% White British and European, 30% South Asian, 15% Black,
 * 10% Arab and 5% mixed or other), and each is set in its own relevant
 * place, because the earlier photos looked as if they were all taken in one
 * building. No photograph here is used anywhere else on the site. Alt text
 * describes only what the frame shows: none of these people is presented as
 * a OneVoice participant or member of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, enquiryHref, navigation, routes } from "@/data/site";

/* Some of the page's first-set photographs stay among the new ones, at the user's request (3 November
   2026; those that shared one bright room moved to new places on 4 November). These slots show their
   first-set file; the rest show `<slot>-v2.jpg` or, in THIRD_SET, `<slot>-v3.jpg`. */
const FIRST_SET = new Set(["events-iftar", "events-heritage", "events-identity"]);

/* The client's mix of people across the site (3 November 2026): about 40% White British and European, 30%
   South Asian, 15% Black, 10% Arab and 5% mixed or other, counted by each photo's main person. These slots
   show a third-set photograph (`<slot>-v3.jpg`), cast towards that mix and set in its own relevant place. */
const THIRD_SET = new Set(["events-hero-side", "events-womens-day", "events-futures", "events-awards", "events-cta"]);

/** A photograph generated for its slot, saved under /images/events/ (FIRST_SET and THIRD_SET say which file it shows). */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/events/${file}${FIRST_SET.has(file) ? "" : THIRD_SET.has(file) ? "-v3" : "-v2"}.jpg`,
  alt,
  position,
});

const photo = {
  heroMain: shot(
    "events-hero",
    "An older woman in a magenta shalwar kameez and a young man in a mustard kurta laughing and clapping along to live music among neighbours in a festive hall",
  ),
  heroSide: shot(
    "events-hero-side",
    "A young woman in a denim jacket carrying a stack of folding chairs inside a marquee as two volunteers lay tablecloths behind her",
  ),
  iftar: shot(
    "events-iftar",
    "Families sharing an Iftar meal at long tables under a lit marquee in a park at sunset, a woman passing a plate of dates",
  ),
  womensDay: shot(
    "events-womens-day",
    "A woman in a purple wrap dress speaking with a microphone to an audience of women applauding in a small auditorium",
  ),
  heritage: shot(
    "events-heritage",
    "Young women in embroidered shalwar kameez and flowing dupattas dancing on a stage in front of an audience",
  ),
  identity: shot(
    "events-identity",
    "A grandfather with his arm around his granddaughter, both laughing, as a woman in festive clothes smiles behind them",
  ),
  futures: shot(
    "events-futures",
    "A young woman in a mustard blazer explaining an idea to an older man in a tweed jacket over cups of tea at an evening reception, city lights behind",
  ),
  walk: shot(
    "events-walk",
    "People of all ages in brightly coloured T-shirts, one in a wheelchair, walking together along a tree-lined canal path",
  ),
  awards: shot(
    "events-awards",
    "A young woman in an emerald dress holding a glass award on a low stage as a host in a red dress claps, guests applauding at round tables in a hotel ballroom",
  ),
  cta: shot(
    "events-cta",
    "Neighbours of all ages sharing food on picnic blankets beside a pond in a park in golden evening light",
  ),
} satisfies Record<string, HomeImage>;

/** The anchors the menu builds for this page's events. */
const anchors = navigation.find((item) => item.label === "Events 2027")?.children ?? [];
const anchorFor = (label: string) => anchors.find((link) => link.label === label)?.href ?? routes.events;
const idOf = (label: string) => anchorFor(label).split("#")[1] ?? "";

/** An event's date as the brief writes it: "20 FEBRUARY Saturday", "MAR 2027 Date TBC". */
export type EventDate = { primary: string; secondary: string; detail: string };

/** The parts every event shares: its menu entry, number, name and date. */
type EventBase = {
  id: string;
  href: string;
  number: string;
  /** The event's name as the brief's calendar gives it. */
  name: string;
  date: EventDate;
  /** The date in full, for the event's own section. */
  when: string;
  /** One line for the calendar: the event's theme, venue or timing. */
  line: string;
};

const event = (menuLabel: string, number: string, rest: Omit<EventBase, "id" | "href" | "number">): EventBase => ({
  id: idOf(menuLabel),
  href: anchorFor(menuLabel),
  number,
  ...rest,
});

const iftar = event("Community Iftar & Official Launch", "01", {
  name: "Community Iftar & Official Launch",
  date: { primary: "20", secondary: "February", detail: "Saturday" },
  when: "Saturday 20 February 2027",
  // The venue as the client's Iftar document gives it (4 November 2026).
  line: "Lee Valley Stadium, Queen Elizabeth Olympic Park, Stratford",
});
/* The Iftar has a page of its own (the client's Iftar document, 4 November
   2026): the calendar and the hero's card lead there, while the menu still
   lands on its section on this page, which links on to it. */
const iftarPage = { ...iftar, href: routes.iftar };
const womensDay = event("International Women's Day", "02", {
  name: "International Women's Day",
  date: { primary: "08", secondary: "March", detail: "Monday" },
  when: "Monday 8 March 2027",
  line: "Empowering Women, Inspiring Change",
});
const pakistan = event("Pakistan Independence Day & Community Celebration", "03", {
  name: "Pakistan Independence Day & Community Celebration",
  date: { primary: "14", secondary: "August", detail: "Saturday" },
  when: "Saturday 14 August 2027",
  line: "Heritage, Identity and Shared Futures",
});
const walks = event("East London Community Marathon Walks", "04", {
  name: "OneVoice East London Community Marathon Walks",
  date: { primary: "Sep", secondary: "2027", detail: "Date TBC" },
  when: "September 2027 · Date TBC",
  line: "Walk Together for Health and Community",
});
const yearbook = event("Yearbook 2027 – 100 Inspiring Personalities", "05", {
  // The brief writes "Yearbook 2027-100"; the dash is spaced so it does not read as a range.
  name: "Yearbook 2027 – 100 Inspiring Personalities",
  date: { primary: "Year-end", secondary: "2027", detail: "Publication" },
  when: "Year-end 2027 · Publication",
  line: "A special annual publication",
});
const awards = event("OneVoice Achievement Awards 2027", "06", {
  name: "OneVoice Achievement Awards 2027",
  date: { primary: "Nov", secondary: "2027", detail: "Date TBC" },
  when: "November 2027 · Date TBC",
  line: "Celebrating Achievement. Inspiring the Next Generation.",
});

/** The brief's call-to-action labels (V.2, "Website design standards"). */
const register = { label: "Register Your Interest", href: enquiryHref("interest") };

/* -------------------------------------------------------------------------
   HERO
   The block's subtitle as the headline, its first paragraph beneath, and
   on the card the calendar's opening event, in the words of its second
   paragraph ("Our proposed annual calendar begins with…").
   ------------------------------------------------------------------------- */

export const eventsHero = {
  kicker: "Events 2027",
  /** One phrase to a line; the second word of each is set as the accent. */
  title: ["Bringing People Together.", "Celebrating Achievement.", "Creating Opportunities."],
  description: `In 2027, ${brand.name} aims to establish a programme of community events and activities that celebrate cultural diversity, empower women, promote wellbeing and recognise the positive contributions of individuals and organisations.`,
  primaryCta: register,
  secondaryCta: { label: "Become a Partner", href: enquiryHref("partner") },
  card: { label: "Our proposed annual calendar begins with", event: iftarPage },
  images: { main: photo.heroMain, side: photo.heroSide },
} as const;

/** The strip under the hero: the six events, read from the navigation. */
export const eventsSections = { label: "Events 2027", links: anchors };

/* -------------------------------------------------------------------------
   PROPOSED ANNUAL CALENDAR
   The block's second and third paragraphs and its note on dates, then the
   six events as an index, each leading to its own section.
   ------------------------------------------------------------------------- */

export const eventsCalendar = {
  id: "proposed-annual-calendar",
  kicker: "Events 2027",
  titleLead: "Proposed Annual",
  titleAccent: "Calendar",
  paragraphs: [
    "Our proposed annual calendar begins with a major Community Iftar and the official launch of OneVoice, followed by initiatives supporting women's empowerment, local enterprise, cultural celebration, community participation and social connection.",
    "Throughout the year, we aim to create opportunities for residents, community organisations, businesses, public institutions, volunteers and supporters to connect, collaborate and contribute to a stronger and more inclusive society.",
  ],
  note: "Dates and venues are provisional until formally confirmed. Event details, registration information and partnership opportunities will be published as arrangements progress.",
  events: [iftarPage, womensDay, pakistan, walks, yearbook, awards],
} as const;

/* -------------------------------------------------------------------------
   1. COMMUNITY IFTAR & OFFICIAL LAUNCH
   ------------------------------------------------------------------------- */

export const eventsIftar = {
  ...iftar,
  titleLead: "Community Iftar",
  titleAccent: "& Official Launch",
  venue: { label: "Proposed venue", text: "Lee Valley Stadium, Queen Elizabeth Olympic Park, Stratford, East London" },
  lead: `A major community gathering aiming to welcome 2,000+ people to celebrate Ramadan, introduce ${brand.name} and bring together residents, community leaders, charities, businesses, public representatives and potential partners.`,
  highlightsLabel: "Proposed highlights",
  highlights: [
    "Community Iftar",
    "Cultural programme",
    "Launch address",
    "Introduction to OneVoice's mission",
    "Community partnership announcements",
    "Opportunities to volunteer or support future programmes",
  ],
  /** The way on to the event's own page. */
  page: { label: "View Event Details", href: routes.iftar },
  image: photo.iftar,
} as const;

/* -------------------------------------------------------------------------
   2. INTERNATIONAL WOMEN'S DAY
   Its theme as the title.
   ------------------------------------------------------------------------- */

export type WomensDayIcon = "speakers" | "networking" | "careers" | "mentoring" | "recognition";

export const eventsWomensDay = {
  ...womensDay,
  titleLead: "Empowering Women,",
  titleAccent: "Inspiring Change",
  lead: "A community event recognising women's achievements and promoting equal access to education, employment, enterprise, leadership and wellbeing support.",
  highlightsLabel: "Proposed highlights",
  highlights: [
    { label: "Inspirational speakers", icon: "speakers" },
    { label: "Women entrepreneurs' networking", icon: "networking" },
    { label: "Skills and career discussions", icon: "careers" },
    { label: "Mentoring opportunities", icon: "mentoring" },
    { label: "Recognition of local women making a difference", icon: "recognition" },
  ] satisfies { label: string; icon: WomensDayIcon }[],
  cta: register,
  image: photo.womensDay,
} as const;

/* -------------------------------------------------------------------------
   3. PAKISTAN INDEPENDENCE DAY & COMMUNITY CELEBRATION
   Its theme as the title, and each of the theme's three parts under a
   photograph of its own.
   ------------------------------------------------------------------------- */

export const eventsPakistan = {
  ...pakistan,
  titleLead: "Heritage, Identity",
  titleAccent: "and Shared Futures",
  lead: "A celebration of Pakistani heritage, culture, community contributions and the positive role of diaspora communities in the UK.",
  theme: [
    { word: "Heritage", image: photo.heritage },
    { word: "Identity", image: photo.identity },
    { word: "Shared Futures", image: photo.futures },
  ],
  highlightsLabel: "Proposed highlights",
  highlights: [
    "Cultural performances",
    "Family activities",
    "Community awards or acknowledgements",
    "Local business stalls",
    "Youth participation",
    "Networking between community organisations and public institutions",
  ],
} as const;

/* -------------------------------------------------------------------------
   4. ONEVOICE EAST LONDON COMMUNITY MARATHON WALKS
   Its theme as the title.
   ------------------------------------------------------------------------- */

export type WalkIcon = "routes" | "family" | "teams" | "fundraising" | "wellbeing" | "sponsorship";

export const eventsWalks = {
  ...walks,
  titleLead: "Walk Together",
  titleAccent: "for Health and Community",
  lead: "A series of inclusive community walks designed to encourage physical activity, improve social connection and raise awareness of community wellbeing.",
  highlightsLabel: "Proposed highlights",
  highlights: [
    { label: "Accessible walking routes", icon: "routes" },
    { label: "Family participation", icon: "family" },
    { label: "Community team challenges", icon: "teams" },
    { label: "Local charity fundraising", icon: "fundraising" },
    { label: "Wellbeing information", icon: "wellbeing" },
    { label: "Sponsorship opportunities", icon: "sponsorship" },
  ] satisfies { label: string; icon: WalkIcon }[],
  note: "Routes, distances, accessibility arrangements and event permissions will be developed with suitable local partners.",
  image: photo.walk,
} as const;

/* -------------------------------------------------------------------------
   5. YEARBOOK 2027 – 100 INSPIRING PERSONALITIES
   Its opening words ("A special annual publication") as the title; the
   rest of that sentence follows beneath. Its "Proposed content" lists the
   people it would profile, set as a list.
   ------------------------------------------------------------------------- */

export const eventsYearbook = {
  ...yearbook,
  numeral: "100",
  numeralLine: "Inspiring Personalities",
  titleLead: "A Special Annual",
  titleAccent: "Publication",
  lead: "Celebrating 100 personalities whose work, leadership, service, innovation or community involvement has made a positive contribution to society.",
  profilesLabel: "Proposed content: profiles of",
  profiles: [
    "Community leaders",
    "Entrepreneurs",
    "Professionals",
    "Educators",
    "Philanthropists",
    "Artists",
    "Volunteers",
    "Emerging leaders",
  ],
  focus: "With a focus on achievements, inspiration and service.",
  showcase:
    "The yearbook can also showcase OneVoice's activities, partnerships, milestones and community impact throughout 2027.",
} as const;

/* -------------------------------------------------------------------------
   6. ONEVOICE ACHIEVEMENT AWARDS 2027
   Its theme as the title, its two sentences, its highlights and its ten
   potential categories; the line on governance closes Draft01's
   ONEVOICE ACHIEVEMENT AWARDS block.
   ------------------------------------------------------------------------- */

export const eventsAwards = {
  ...awards,
  titleLead: "Celebrating Achievement.",
  titleAccent: "Inspiring the Next Generation.",
  lead: [
    "The OneVoice Achievement Awards can recognise people and organisations making a positive contribution.",
    // The brief reads "recognising who have demonstrated"; "those" is added for the grammar.
    "An annual awards ceremony recognising those who have demonstrated leadership, professional excellence, entrepreneurship, community service, innovation or a commitment to empowering others.",
  ],
  highlightsLabel: "Proposed highlights",
  highlights: [
    "Awards across professional and community categories",
    "Inspirational keynote speakers",
    "Networking",
    "Recognition of emerging talent",
    "Opportunities for corporate sponsorship and partnerships",
  ],
  categoriesLabel: "Potential categories",
  categories: [
    "Entrepreneur of the Year",
    "Young Achiever",
    "Community Champion",
    "Professional Achievement",
    "Emerging Leader",
    "Digital Achievement",
    "Social Enterprise Achievement",
    "Volunteer of the Year",
    "Inspirational Contribution",
    "Outstanding Community Contribution",
  ],
  /** On the card over the photograph (Draft01's awards block). */
  governance: "Awards should operate with transparent criteria and appropriate governance.",
  image: photo.awards,
} as const;

/* -------------------------------------------------------------------------
   CLOSING CALL TO ACTION
   The block's closing invitation: the three things it hopes 2027 will be as
   the title, the full sentence and its line on partnerships, sponsorship,
   volunteering and fundraising beneath, and two of those as the calls.
   ------------------------------------------------------------------------- */

export const eventsCta = {
  kicker: "Events 2027",
  titleLead: "Connection. Opportunity.",
  titleAccent: "Lasting Community Impact.",
  description:
    "Join us in making 2027 a year of connection, opportunity and lasting community impact. Our programme will also provide opportunities for partnerships, sponsorship, volunteering and community fundraising.",
  primaryCta: { label: "Sponsor a Programme", href: `${routes.getInvolved}#sponsor-a-programme` },
  secondaryCta: { label: "Volunteer", href: `${routes.getInvolved}#volunteer` },
  image: photo.cta,
} as const;

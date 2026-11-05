/**
 * Copy and media for the Community Iftar 2027 page
 * (`src/app/(site)/events/community-iftar-2027/page.tsx`).
 *
 * Every line comes from the client's "ONEVOICE COMMUNITY IFTAR 2027"
 * document (4 November 2026), laid out as its own "Recommended website
 * layout" asks: a hero with the event's name, date, venue and calls to act;
 * the event's purpose and OneVoice's mission; its six highlights; who should
 * attend; partnership and sponsorship, with a separate enquiry for each
 * kind of partner; the proposed programme and venue information, labelled
 * as subject to confirmation; and registration with the interest form. Two
 * lines are borrowed and noted beside them: the Events 2027 block's note
 * that dates and venues are provisional, and the Foundation's own headline
 * for the introduction to its programmes.
 *
 * The document was written while the Foundation was briefly called
 * "OneVoice Community Foundation"; the page uses its name now,
 * `brand.name`. Its figures (2,000+ people) and venue are the client's own,
 * shown as proposed. It offers "Sign up for event updates" with no list to
 * sign up to, so the site's enquiry form stands in, recording every enquiry
 * from here as the Iftar's.
 *
 * IMAGES. Each photograph was generated for its slot on 5 November 2026 and
 * cut to the slot's exact size (file names, sizes and prompts in
 * `_source/iftar-media-brief.md`), cast towards the client's mix of people
 * across the site and each set in its own relevant place. No photograph here
 * is used anywhere else on the site. Alt text describes only what
 * the frame shows: none of these people is presented as a guest, partner or
 * member of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, navigation, routes, type EnquiryContext, type EnquiryTopic } from "@/data/site";

/** A photograph generated for its slot, saved under /images/iftar/ by the slot's file name. */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/iftar/${file}.jpg`,
  alt,
  position,
});

const photo = {
  heroMain: shot(
    "iftar-hero",
    "A family and other guests seated at long tables set with dates and water in a stadium hall at sunset, waiting to break the fast",
  ),
  heroCircle: shot(
    "iftar-hero-circle",
    "A young woman passing a plate of dates to an older neighbour across a table, both smiling",
  ),
  gathering: shot(
    "iftar-highlight-gathering",
    "Families and neighbours sharing an Iftar meal together at a long table, a grandfather pouring water for a child",
  ),
  cultural: shot(
    "iftar-highlight-cultural",
    "A small group of musicians performing on a low stage to a seated audience at a community celebration",
  ),
  interfaith: shot(
    "iftar-highlight-interfaith",
    "An imam, a vicar and a rabbi laughing together over cups of tea at a community gathering",
  ),
  business: shot(
    "iftar-highlight-business",
    "A small-business owner showing her handmade products to visitors at a stall in a busy event hall",
  ),
  leadership: shot(
    "iftar-highlight-leadership",
    "A community leader speaking with a group of residents and a councillor at an evening reception",
  ),
  announcements: shot(
    "iftar-highlight-announcements",
    "A speaker at a lectern addressing a large audience seated at round tables in an event hall",
  ),
  partnership: shot(
    "iftar-partnership",
    "Two event partners shaking hands over a table of programme plans in an office overlooking a stadium",
  ),
  cta: shot(
    "iftar-cta",
    "A large evening crowd of guests at long tables under warm festoon lights inside a stadium hall",
  ),
} satisfies Record<string, HomeImage>;

/** The page's sections, for the strip under the hero and its links. */
const sections = {
  about: { label: "About the Event", id: "about-the-event" },
  highlights: { label: "Event Highlights", id: "event-highlights" },
  attend: { label: "Who Should Attend?", id: "who-should-attend" },
  partners: { label: "Partnership & Sponsorship", id: "partnership-and-sponsorship" },
  programme: { label: "Programme & Venue", id: "programme-and-venue" },
  register: { label: "Register Your Interest", id: "register-your-interest" },
} as const;

/** The page's own enquiry form, opened with one kind of enquiry chosen. */
const formHref = (topic: EnquiryTopic) => `${routes.iftar}?enquiry=${topic}#${sections.register.id}`;

const facts = {
  name: "OneVoice Community Iftar 2027",
  date: "Saturday, 20 February 2027",
  place: "Stratford, East London",
  venue: "Lee Valley Stadium, Queen Elizabeth Olympic Park, Stratford, East London",
  attendance: "2,000+ people",
} as const;

/* -------------------------------------------------------------------------
   HERO
   The event's name and subtitle, its date and place, its first paragraph
   and its three calls to act; its venue and proposed attendance on the card.
   ------------------------------------------------------------------------- */

export const iftarHero = {
  back: { label: "Events 2027", href: routes.events },
  // The event's name in the Events 2027 calendar.
  kicker: "Community Iftar & Official Launch",
  /** The event's name, in two tones. */
  titleLead: "OneVoice Community",
  titleAccent: "Iftar 2027",
  /** The subtitle, in two phrases; the second is the accent. */
  subtitle: ["Bringing Communities Together.", "Sharing the Spirit of Ramadan."],
  when: `${facts.date} | ${facts.place}`,
  description:
    "The OneVoice Community Iftar 2027 is a proposed large-scale community gathering celebrating the spirit of Ramadan through unity, generosity, cultural exchange and community partnership.",
  primaryCta: { label: "Register Your Interest", href: formHref("interest") },
  secondaryCta: { label: "Become an Event Partner", href: formHref("partner") },
  tertiaryCta: { label: "Explore Sponsorship Opportunities", href: `#${sections.partners.id}` },
  card: [
    { label: "Venue", value: facts.venue, icon: "venue" },
    { label: "Proposed attendance", value: facts.attendance, icon: "people" },
  ] as const,
  images: { main: photo.heroMain, circle: photo.heroCircle },
} as const;

/** The strip under the hero. */
export const iftarSections = {
  label: "Community Iftar 2027",
  links: Object.values(sections).map(({ label, id }) => ({ label, href: `#${id}` })),
};

/* -------------------------------------------------------------------------
   ABOUT THE EVENT
   The document's three-part line as the statement, its About the Event
   block, the rest of its introduction, its proposed attendance, and a
   short introduction to OneVoice's programme areas (the document's layout
   asks for one): the Foundation's headline and the Our Work menu's areas.
   ------------------------------------------------------------------------- */

const ourWorkAreas = navigation.find((item) => item.href === routes.ourWork)?.children ?? [];

export const iftarAbout = {
  id: sections.about.id,
  kicker: "About the Event",
  statement: ["An evening of community.", "A shared spirit of giving.", "A vision for lasting impact."],
  lead: "Ramadan is a time of reflection, compassion, generosity and togetherness. The OneVoice Community Iftar aims to bring these values to life through a welcoming event that connects people from different backgrounds and generations.",
  paragraphs: [
    `Organised as part of the development and introduction of ${brand.name}, the event aims to bring together residents, families, community leaders, charities, businesses, public representatives, faith communities and potential partners for an evening of connection, celebration and shared purpose.`,
    "With an ambitious target of welcoming more than 2,000 attendees, the proposed gathering will create a platform for community engagement, cultural celebration, networking and the development of new partnerships.",
    "The gathering will provide an opportunity to introduce OneVoice's mission, highlight the importance of community wellbeing and empowerment, and encourage collaboration to build stronger, more inclusive communities across East London and beyond.",
  ],
  vision:
    "Our vision is to create an environment where every voice matters, individuals and families can access opportunities, and organisations can work together to address community needs.",
  figure: { value: "2,000+", label: "Proposed attendance" },
  onevoice: {
    label: `About ${brand.name}`,
    line: brand.headline,
    areas: ourWorkAreas,
    more: { label: "Explore Our Work", href: routes.ourWork },
  },
} as const;

/* -------------------------------------------------------------------------
   EVENT HIGHLIGHTS
   ------------------------------------------------------------------------- */

/* The title is the document's own phrase: "an evening of connection,
   celebration and shared purpose". */
export const iftarHighlights = {
  id: sections.highlights.id,
  kicker: "Event Highlights",
  titleLead: "An Evening of",
  titleAccent: "Connection, Celebration and Shared Purpose",
  highlights: [
    {
      title: "Community Iftar & Ramadan Gathering",
      line: "A shared Iftar experience bringing together families, residents, community organisations, faith representatives and guests in the spirit of Ramadan. The gathering aims to celebrate generosity, hospitality and mutual respect while strengthening connections between communities.",
      image: photo.gathering,
    },
    {
      title: "Cultural Programme & Community Celebration",
      line: "A programme of cultural contributions and community performances celebrating the diversity, heritage and creativity of East London's communities.",
      image: photo.cultural,
    },
    {
      title: "Interfaith Dialogue & Community Unity",
      line: "An opportunity to encourage understanding, respect and collaboration among people of different faiths, beliefs and backgrounds. Our aim is to promote shared values of compassion, dignity, service and peaceful coexistence.",
      image: photo.interfaith,
    },
    {
      title: "Business Networking & Local SME Showcase",
      line: "A dedicated opportunity to highlight local businesses, entrepreneurs and small and medium-sized enterprises (SMEs). The event aims to encourage connections between businesses, community organisations and potential partners, creating opportunities to showcase products and services, exchange ideas and explore collaboration.",
      image: photo.business,
    },
    {
      title: "Community Leadership & Public Engagement",
      line: "The proposed gathering will welcome interest from community leaders, charities, public representatives, local institutions and other stakeholders who share a commitment to stronger, more inclusive communities.",
      image: photo.leadership,
    },
    {
      title: "Community Partnership Announcements",
      line: "The event aims to provide a platform to introduce prospective partnerships and collaborative initiatives supporting community wellbeing, education, empowerment and social inclusion.",
      image: photo.announcements,
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   WHO SHOULD ATTEND?
   ------------------------------------------------------------------------- */

export type AttendIcon =
  "residents" | "faith" | "charities" | "business" | "public" | "education" | "corporate" | "volunteers";

export const iftarAttend = {
  id: sections.attend.id,
  kicker: "Who Should Attend?",
  titleLead: "Who Should",
  titleAccent: "Attend?",
  lead: "The OneVoice Community Iftar aims to welcome a broad cross-section of the community, including:",
  guests: [
    { label: "Local residents, families and young people", icon: "residents" },
    { label: "Community and faith leaders", icon: "faith" },
    { label: "Charities, voluntary organisations and social enterprises", icon: "charities" },
    { label: "Local businesses, entrepreneurs and SME representatives", icon: "business" },
    { label: "Councillors, public representatives and community stakeholders", icon: "public" },
    { label: "Education, wellbeing and skills-development organisations", icon: "education" },
    { label: "Corporate organisations, potential sponsors and programme partners", icon: "corporate" },
    { label: "Volunteers and individuals interested in community service", icon: "volunteers" },
  ] satisfies { label: string; icon: AttendIcon }[],
  closing:
    "The event's approach is inclusive and community-focused, welcoming people from different backgrounds and generations.",
} as const;

/* -------------------------------------------------------------------------
   PARTNERSHIP & SPONSORSHIP OPPORTUNITIES
   Each opportunity leads to the form with its own kind of enquiry chosen,
   as the document's layout asks ("separate enquiries for sponsors,
   exhibitors, community organisations and volunteers").
   ------------------------------------------------------------------------- */

/* The title is made from the section's own opening sentence ("support
   community engagement, inclusion and positive social impact"). */
export const iftarPartners = {
  id: sections.partners.id,
  kicker: "Partnership & Sponsorship Opportunities",
  titleLead: "Support Community Engagement,",
  titleAccent: "Inclusion and Positive Social Impact",
  lead: "The OneVoice Community Iftar offers a proposed platform for organisations that wish to support community engagement, inclusion and positive social impact. We welcome expressions of interest from businesses, charities, public bodies, community organisations and other potential partners.",
  listLabel: "Potential Partnership Opportunities",
  opportunities: [
    {
      name: "Event Sponsorship",
      line: "Support the organisation and delivery of the proposed gathering and help advance its community-focused objectives.",
      cta: { label: "Enquire About Sponsorship", href: formHref("sponsor") },
    },
    {
      name: "Corporate & SME Participation",
      line: "Showcase your organisation, connect with local audiences and explore opportunities for collaboration.",
      cta: { label: "Discuss a Partnership", href: formHref("partner") },
    },
    {
      name: "Community Organisation Partnerships",
      line: "Introduce your work, engage with residents and explore ways to coordinate future community initiatives.",
      cta: { label: "Discuss a Partnership", href: formHref("partner") },
    },
    {
      name: "Cultural & Programme Contributions",
      line: "Express interest in contributing performances, presentations or other suitable activities.",
      cta: { label: "Register Your Interest", href: formHref("interest") },
    },
    {
      name: "Community Support & Volunteering",
      line: "Help support event planning, guest engagement, accessibility and community participation.",
      cta: { label: "Volunteer with Us", href: formHref("volunteer") },
    },
  ],
  /** On the card over the photograph. */
  note: "All sponsorship benefits, exhibitor arrangements, participation terms and partner recognition opportunities will be shared once confirmed.",
  primaryCta: { label: "Enquire About Sponsorship", href: formHref("sponsor") },
  secondaryCta: { label: "Discuss a Partnership", href: formHref("partner") },
  image: photo.partnership,
} as const;

/* -------------------------------------------------------------------------
   PROPOSED EVENT PROGRAMME, and VENUE & EVENT INFORMATION
   The title is made from the programme's own first and sixth items (guest
   arrival, the shared Iftar). The programme in its order; the shared Iftar is marked as the moment the
   evening turns on. The Events 2027 block's note says dates and venues are
   provisional until formally confirmed, as the document's layout asks.
   ------------------------------------------------------------------------- */

export const iftarProgramme = {
  id: sections.programme.id,
  kicker: "Proposed Event Programme",
  titleLead: "From Arrival",
  titleAccent: "to Iftar",
  // The document reads "The programme include:"; "may" is added for the grammar.
  lead: "The programme may include:",
  items: [
    "Guest arrival and community networking",
    "Welcome address and introduction to the event",
    `Introduction to ${brand.name}`,
    "Community and interfaith contributions",
    "Cultural programme and local SME engagement",
    "Shared Iftar and Ramadan gathering",
    "Community partnership updates and closing remarks",
  ],
  /** The item the evening turns on, marked with the crescent. */
  iftarItem: 5,
  timing: "Programme timings will take account of the local sunset and Iftar time on the event date.",
  venue: {
    title: "Venue & Event Information",
    rows: [
      { label: "Date", value: facts.date, icon: "date" },
      { label: "Venue", value: facts.venue, icon: "venue" },
      { label: "Target attendance", value: facts.attendance, icon: "people" },
      { label: "Organiser", value: brand.name, icon: "organiser" },
    ] as const,
    note: "Dates and venues are provisional until formally confirmed.",
  },
} as const;

/* -------------------------------------------------------------------------
   REGISTER YOUR INTEREST
   The document's "Join Us" paragraphs and its "Stay Connected" line beside
   the enquiry form, which records each enquiry as the Iftar's.
   ------------------------------------------------------------------------- */

export const iftarRegister = {
  id: sections.register.id,
  kicker: "Stay Connected",
  titleLead: "Register",
  titleAccent: "Your Interest",
  lead: "The OneVoice Community Iftar 2027 aims to be more than a Ramadan gathering. It is an opportunity to bring people together, introduce a shared vision and encourage lasting collaboration between communities, organisations and local stakeholders.",
  welcome:
    "Whether you are a resident, community leader, business owner, charity representative, potential sponsor or volunteer, we welcome your interest in helping shape this proposed initiative.",
  updates:
    "Sign up for event updates to receive announcements about registration, the programme, venue arrangements and opportunities to participate.",
  context: "Community Iftar 2027",
  initialTopic: "interest",
} satisfies { context: EnquiryContext; initialTopic: EnquiryTopic } & Record<string, unknown>;

/* -------------------------------------------------------------------------
   CLOSING CALL TO ACTION
   The document's "Join Us in Building Stronger Communities" close and two of
   its calls to act (its third, Register Your Interest, is the form above).
   ------------------------------------------------------------------------- */

export const iftarCta = {
  kicker: facts.name,
  titleLead: "Join Us in Building",
  titleAccent: "Stronger Communities",
  description:
    "Together, we can celebrate our shared values, strengthen community connections and create opportunities for a more inclusive future.",
  primaryCta: { label: "Become a Partner", href: formHref("partner") },
  secondaryCta: { label: "Volunteer with Us", href: formHref("volunteer") },
  image: photo.cta,
} as const;

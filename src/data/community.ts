/**
 * Copy and media for the Community page (`src/app/(site)/community/page.tsx`).
 *
 * Every line comes from the brief's V.2 (24 October 2026) COMMUNITY block:
 * Community Outreach, Community Integration, Community Hub, Volunteering,
 * Community & Business Network and Research & Community Voice. V.2 moves the
 * Events and Achievement Awards blocks that Draft01 kept here onto its new
 * Events 2027 page, so this page no longer carries them. The block gives the
 * page no introduction or closing of its own; both borrow the brief's lines
 * from elsewhere, and each is noted beside it.
 *
 * The sections run in the order of the brief's Community sub-menu, which
 * pairs the Hub with the Network ("Community Hub & Networks"), so the Network
 * follows the Hub here rather than Volunteering as it does in the block.
 *
 * IMAGES. The eight photographs under /images/community/ come from the V.2
 * document. A slot marked `pending` is waiting for a generated image (file
 * name, pixel size and prompt are in `_source/community-media-brief.md`):
 * until it arrives `src` is the closest existing photograph, and swapping it
 * is a one-line change to `src`. Alt text describes only what the frame
 * shows: none of these people is presented as a OneVoice participant,
 * volunteer or member of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, ctas, navigation, routes } from "@/data/site";

const photo = {
  gathering: {
    src: "/images/community/community-gathering.jpg",
    alt: "Residents of different ages sharing a table and talking together at a busy community gathering in a hall",
    position: "38% 50%",
  },
  conversation: {
    src: "/images/community/women-conversation.jpg",
    alt: "A group of women, several in headscarves, laughing and talking together in a warm sitting room",
    position: "40% 50%",
  },
  familyGathering: {
    src: "/images/community/family-gathering.jpg",
    alt: "Three generations of a family talking and passing round food in a bright living room",
    position: "45% 55%",
  },
  outreachVolunteers: {
    src: "/images/community/outreach-volunteers.jpg",
    alt: "Volunteers in high-visibility vests chatting with residents outside beside a rail of donated clothes",
    position: "55% 45%",
  },
  familyCelebration: {
    src: "/images/community/family-celebration.jpg",
    alt: "A smiling older woman in a blue and gold outfit sharing tea with her family on a sofa at home",
    position: "60% 40%",
  },
  workshop: {
    src: "/images/community/community-workshop.jpg",
    alt: "A facilitator at a whiteboard leading a workshop for adults seated at tables in a bright, modern community space",
    position: "45% 50%",
  },
  professionals: {
    src: "/images/community/professionals-collaborating.jpg",
    alt: "Professionals gathered round a table of laptops and printed charts, talking and smiling together",
    position: "55% 50%",
  },
  peerSupport: {
    src: "/images/community/peer-support-circle.jpg",
    alt: "Adults of different ages sitting in a circle and talking warmly at a peer support group",
    position: "40% 50%",
  },
  /* Existing photographs from the home and About pages, standing in below. */
  communityPantry: {
    src: "/images/HomePageHeroSection2.png",
    alt: "Volunteers handing a box of groceries to a woman at a community food distribution",
    position: "40% 40%",
  },
  foodSupport: {
    src: "/images/HomePageHeroSection1.png",
    alt: "A smiling volunteer handing a box of food and clothing across a counter",
    position: "45% 40%",
  },
  shopTablet: {
    src: "/images/about/What-we-do/What-we-Do-image-5.png",
    alt: "Two women looking at a tablet together at a counter of small handmade products in a shop",
    position: "55% 50%",
  },
  adviserDesk: {
    src: "/images/about/What-we-do/what-we-do-image-2.png",
    alt: "An adviser showing a printed document to a man seated across a desk from her, a laptop open between them",
    position: "45% 50%",
  },
  teamDocuments: {
    src: "/images/OurWorkPageHeroSection3.png",
    alt: "Colleagues standing around a table, reviewing printed documents together",
    position: "50% 40%",
  },
  youngLaptops: {
    src: "/images/OurWorkHeroSection1.png",
    alt: "Young adults working together on laptops around an office table",
    position: "50% 35%",
  },
  speaker: {
    src: "/images/about/What-we-do/What-we-do-image-9.png",
    alt: "A speaker with a microphone addressing a seated audience in a conference hall",
    position: "35% 50%",
  },
  trainer: {
    src: "/images/about/What-we-do/what-we-do-image-1.png",
    alt: "A trainer at a whiteboard explaining a diagram to five people seated around a table with notebooks and laptops",
    position: "50% 50%",
  },
  teamPlanning: {
    src: "/images/OurWorkHeroSection2.png",
    alt: "A small team leaning over a table of plans and notes in a bright office",
    position: "62% 40%",
  },
} satisfies Record<string, HomeImage>;

/** A stand-in for a slot still waiting for its own photograph. */
const standIn = (image: HomeImage, pending: string): HomeImage => ({ ...image, pending });

/* -------------------------------------------------------------------------
   HERO
   ------------------------------------------------------------------------- */

export const communityHero = {
  kicker: "Community",
  /* The brief's own pair of lines from the close of its homepage block
     ("Every Community Has Potential. Every Voice Matters."), one to a line. */
  title: ["Every Community Has Potential.", "Every Voice Matters."],
  // The line the brief sets beneath that pair.
  description:
    "We bring people and organisations together to improve access to learning, wellbeing, employment and community participation.",
  primaryCta: ctas.support,
  secondaryCta: { label: "Volunteer", href: `${routes.getInvolved}#volunteer` },
  /** The card at the collage's foot: the brief's closing line for the Foundation. */
  badge: "Stronger Communities. Greater Opportunity. Lasting Change.",
  images: {
    main: photo.gathering,
    top: standIn(photo.conversation, "community-hero-conversation.jpg"),
    foot: photo.familyGathering,
  },
} as const;

/**
 * The strip under the hero: the brief's Community sub-menu, read from the
 * navigation so the strip and the header's dropdown always list the same
 * sections.
 */
export const communitySections = {
  label: "Community",
  links: navigation.find((item) => item.label === "Community")?.children ?? [],
};

/* -------------------------------------------------------------------------
   COMMUNITY OUTREACH
   ------------------------------------------------------------------------- */

export type OutreachIcon =
  "centre" | "library" | "faith" | "college" | "university" | "housing" | "events" | "venue" | "partner";

export const communityOutreach = {
  id: "outreach",
  kicker: "Outreach",
  titleLead: "Taking Opportunity",
  titleAccent: "into the Community",
  /** The brief's opening sentence, set as the section's statement. */
  statement: "We will not expect everyone to find us.",
  lead: "OneVoice can work through:",
  /** The brief's nine, in its order. The page splits them either side of the photograph. */
  places: [
    { label: "Community centres", icon: "centre" },
    { label: "Libraries", icon: "library" },
    { label: "Faith and community organisations", icon: "faith" },
    { label: "Colleges", icon: "college" },
    { label: "Universities", icon: "university" },
    { label: "Housing organisations", icon: "housing" },
    { label: "Local events", icon: "events" },
    { label: "Community venues", icon: "venue" },
    { label: "Partner organisations", icon: "partner" },
  ] satisfies { label: string; icon: OutreachIcon }[],
  closing: "This helps us reach people who may be isolated or less likely to access mainstream services.",
  image: standIn(photo.outreachVolunteers, "community-outreach.jpg"),
} as const;

/* -------------------------------------------------------------------------
   COMMUNITY INTEGRATION
   ------------------------------------------------------------------------- */

export const communityIntegration = {
  id: "integration",
  kicker: "Integration",
  titleLead: "Building Connections.",
  titleAccent: "Creating Belonging.",
  lead: "OneVoice helps people participate more fully in community life.",
  listLabel: "Activities can include:",
  activities: [
    "Community groups",
    "Social activities",
    "Cultural activities",
    "Networking",
    "Volunteering",
    "Community learning",
    "Peer support",
    "Local events",
    "Information sessions",
  ],
  image: standIn(photo.familyCelebration, "community-integration.jpg"),
} as const;

/* -------------------------------------------------------------------------
   COMMUNITY HUB
   ------------------------------------------------------------------------- */

export const communityHub = {
  /** Matches the anchor the menu builds from "Community Hub & Networks"; the Network follows directly. */
  id: "community-hub-and-networks",
  kicker: "Community Hub",
  titleLead: "One Centre.",
  titleAccent: "Many Opportunities.",
  /* The brief's sentence. It runs on into the list, so it keeps its colon
     and the eleven read as its endings. */
  lead: "The OneVoice Skill Development Centre can become a welcoming community hub where people can:",
  items: [
    "Learn",
    "Develop Skills",
    "Find Work",
    "Build Digital Confidence",
    "Explore Enterprise",
    "Meet a Mentor",
    "Improve Wellbeing",
    "Access Support",
    "Build Networks",
    "Volunteer",
    "Connect With Community",
  ],
  /** The card over the photograph's foot: the Centre and its motto. */
  card: { title: brand.centre, line: `${brand.motto.join(". ")}.` },
  image: photo.workshop,
} as const;

/* -------------------------------------------------------------------------
   COMMUNITY & BUSINESS NETWORK
   ------------------------------------------------------------------------- */

export const communityNetwork = {
  id: "community-networks",
  kicker: "Community & Business Network",
  titleLead: "Connecting People",
  titleAccent: "with Opportunity",
  lead: "Our networking programme can bring together:",
  /** The brief's eight, in its order, each with a photograph. */
  groups: [
    { label: "Professionals", image: photo.professionals },
    { label: "Entrepreneurs", image: standIn(photo.shopTablet, "network-entrepreneurs.jpg") },
    { label: "Employers", image: standIn(photo.teamDocuments, "network-employers.jpg") },
    { label: "Jobseekers", image: standIn(photo.adviserDesk, "network-jobseekers.jpg") },
    { label: "Students", image: standIn(photo.youngLaptops, "network-students.jpg") },
    { label: "Community leaders", image: standIn(photo.speaker, "network-community-leaders.jpg") },
    { label: "Training providers", image: standIn(photo.trainer, "network-training-providers.jpg") },
    { label: "Business organisations", image: standIn(photo.teamPlanning, "network-business.jpg") },
  ] satisfies { label: string; image: HomeImage }[],
  /** "The objective: Knowledge → Connections → Opportunities → Progress" */
  objective: {
    label: "The objective",
    steps: ["Knowledge", "Connections", "Opportunities", "Progress"],
  },
} as const;

/* -------------------------------------------------------------------------
   VOLUNTEERING
   ------------------------------------------------------------------------- */

export type VolunteerIcon =
  | "mentoring"
  | "digital"
  | "employment"
  | "admin"
  | "outreach"
  | "events"
  | "enterprise"
  | "translation"
  | "fundraising"
  | "communications"
  | "peer";

export const communityVolunteering = {
  id: "volunteering",
  kicker: "Volunteering",
  titleLead: "Share Your Skills.",
  titleAccent: "Make a Difference.",
  lead: "Volunteers can contribute their time and expertise to:",
  roles: [
    { label: "Mentoring", icon: "mentoring" },
    { label: "Digital support", icon: "digital" },
    { label: "Employment support", icon: "employment" },
    { label: "Administration", icon: "admin" },
    { label: "Community outreach", icon: "outreach" },
    { label: "Event support", icon: "events" },
    { label: "Enterprise mentoring", icon: "enterprise" },
    { label: "Translation and communication", icon: "translation" },
    { label: "Fundraising", icon: "fundraising" },
    { label: "Communications", icon: "communications" },
    { label: "Peer support", icon: "peer" },
  ] satisfies { label: string; icon: VolunteerIcon }[],
  /* The feature card. Its title and line are the brief's "Volunteer your
     expertise" item from its Support our Work block; the note is the
     Volunteering block's own closing sentence. */
  card: {
    kicker: "Get Involved",
    title: "Volunteer Your Expertise",
    line: "Share your professional knowledge, mentoring skills or local experience.",
    note: "Appropriate recruitment, safeguarding and role-specific procedures will apply.",
    cta: { label: "Volunteer", href: `${routes.getInvolved}#volunteer` },
    image: standIn(photo.communityPantry, "community-volunteering.jpg"),
  },
} as const;

/* -------------------------------------------------------------------------
   RESEARCH & COMMUNITY VOICE
   ------------------------------------------------------------------------- */

export const communityVoice = {
  /** Matches the anchor the menu builds from "Community Voice". */
  id: "community-voice",
  kicker: "Research & Community Voice",
  titleLead: "Listening to",
  titleAccent: "Communities",
  lead: "OneVoice can gather participant feedback and community insight to understand:",
  areas: [
    "Employment barriers",
    "Skills gaps",
    "Digital exclusion",
    "Enterprise challenges",
    "Wellbeing needs",
    "Access to services",
    "Community participation",
    "Barriers to opportunity",
  ],
  /** The block's closing sentence, on the card over the photograph. */
  note: "Anonymised findings, where appropriate, can help inform programme development and partnership discussions.",
  image: photo.peerSupport,
} as const;

/* -------------------------------------------------------------------------
   CLOSING CALL TO ACTION
   The brief's Support our Work block (its "OneVoice Global Foundation"
   pages): the heading as the kicker, "Help build stronger communities" as
   the title, and its closing sentence beneath.
   ------------------------------------------------------------------------- */

export const communityCta = {
  kicker: "Support Our Work",
  titleLead: "Help Build",
  titleAccent: "Stronger Communities",
  description:
    "Together, we can help build communities where people feel heard, supported and equipped to shape their own futures.",
  primaryCta: { label: "Volunteer", href: `${routes.getInvolved}#volunteer` },
  secondaryCta: ctas.partner,
  image: standIn(photo.foodSupport, "community-cta.jpg"),
} as const;

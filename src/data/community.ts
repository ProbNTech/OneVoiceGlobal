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
 * IMAGES. Each photograph was generated for its slot (prompts in
 * `_source/generated/tools/make_prompts_community.py`) and cut to the slot's
 * exact size; the originals are kept in `_source/generated/`. The five V.2
 * document photographs that first filled the hero, Hub, "Professionals" and
 * Community Voice were replaced at the user's request on 29 October 2026.
 * No photograph here is used anywhere else on the site. Alt text describes
 * only what the frame shows: none of these people is presented as a OneVoice
 * participant, volunteer or member of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, ctas, navigation, routes } from "@/data/site";

/** A photograph generated for its slot, saved under /images/community/ by the slot's file name. */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/community/${file}.jpg`,
  alt,
  position,
});

const photo = {
  gathering: shot(
    "community-hero",
    "An older woman in a teal shawl and a young woman walking arm in arm and laughing along a path through a community garden",
  ),
  familyGathering: shot(
    "community-hero-family",
    "A grandfather, a woman in a navy hijab and two young children laughing over a board game at a table",
  ),
  workshop: shot(
    "community-hub",
    "A woman in a navy hijab working at a laptop in a busy room, a small class around a table and people chatting in a café corner behind her",
  ),
  professionals: shot(
    "network-professionals",
    "A young woman and an older man in glasses discussing something on a tablet at a high table",
  ),
  peerSupport: shot(
    "community-voice",
    "A young woman with a tablet listening as an older woman speaks beside her husband at a library table",
  ),
  /* Photographs generated for their slots, saved under /images/community/. */
  heroConversation: shot(
    "community-hero-conversation",
    "A young father with a baby asleep in a sling laughing with an older Sikh man and an older woman over cups of tea at a café counter",
  ),
  outreach: shot(
    "community-outreach",
    "A woman at a stall in a busy street market talking with a young couple with a pram and an older man in a white cap",
  ),
  integration: shot(
    "community-integration",
    "Four neighbours of different backgrounds cooking side by side in a large kitchen, tasting from each other's pots and laughing",
  ),
  entrepreneurs: shot(
    "network-entrepreneurs",
    "A young man showing his laptop to an older man in a navy blazer over cups of coffee, both smiling",
  ),
  employers: shot(
    "network-employers",
    "A man in a navy polo shirt behind a table talking with a woman in a teal hijab and an older man at a busy fair",
  ),
  jobseekers: shot(
    "network-jobseekers",
    "A woman in a navy coat holding a folder outside an office building as an older woman beside her smiles encouragingly",
  ),
  students: shot(
    "network-students",
    "A young man and a young woman in a navy hijab laughing as they work with a laptop and notebooks on a campus lawn",
  ),
  communityLeaders: shot(
    "network-community-leaders",
    "A man in a white kufi, a woman in a patterned headwrap and a man in a navy turban talking and laughing over cups of tea in a hall",
  ),
  trainingProviders: shot(
    "network-training-providers",
    "A trainer guiding a woman's hands on a first-aid training mannequin as an older man kneels beside them watching",
  ),
  business: shot(
    "network-business",
    "Four people with blank name badges laughing together over coffee at a breakfast event",
  ),
  volunteering: shot(
    "community-volunteering",
    "An older woman in a teal jumper showing a teenage girl how to fold donated clothes into a box, other volunteers sorting behind them",
    "50% 12%",
  ),
  cta: shot(
    "community-cta",
    "Families and neighbours of all ages among small stalls in a sunny courtyard, children with face paint and balloons",
  ),
} satisfies Record<string, HomeImage>;

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
    top: photo.heroConversation,
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
  image: photo.outreach,
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
  image: photo.integration,
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
    { label: "Entrepreneurs", image: photo.entrepreneurs },
    { label: "Employers", image: photo.employers },
    { label: "Jobseekers", image: photo.jobseekers },
    { label: "Students", image: photo.students },
    { label: "Community leaders", image: photo.communityLeaders },
    { label: "Training providers", image: photo.trainingProviders },
    { label: "Business organisations", image: photo.business },
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
    image: photo.volunteering,
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
  image: photo.cta,
} as const;

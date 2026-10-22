/**
 * Copy and media for the About Us page (`src/app/(site)/about-us/page.tsx`).
 *
 * The hero's headline is the brief's tagline, set one phrase to a line the
 * way the home hero sets its headline, and the badge over the collage is the
 * brief's motto. Both are held in `brand` as well, so the page and the rest
 * of the site can never disagree about how they are written.
 *
 * The section strip under the hero is the brief's own About Us sub-menu,
 * read from the navigation rather than written out again, so the strip and
 * the header's dropdown always list the same sections.
 *
 * IMAGES. Both slots are waiting for a photograph of their own (file name,
 * pixel size and prompt belong in `_source/about-media-brief.md`); until one
 * arrives `src` is the closest existing photograph and swapping it in is a
 * one-line change. Alt text describes only what the frame shows: none of
 * these people is presented as a OneVoice participant, volunteer or member
 * of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, ctas, navigation, routes } from "@/data/site";

export const aboutHero = {
  kicker: brand.name,
  /** The brief's tagline, one phrase to a line. */
  title: ["Stronger Communities.", "Shared Opportunities.", "One World."],
  description:
    "OneVoice Global Foundation connects communities, organisations and institutions to create practical pathways into skills, opportunity, participation and progress.",
  /** "Our Work" is the brief's Services section: what the Foundation delivers. */
  primaryCta: { label: "Explore Our Work", href: routes.services },
  secondaryCta: { label: "Get Involved", href: routes.getInvolved },
  /** The pill over the collage: the brief's motto. */
  badge: `${brand.motto.join(". ")}.`,
  /** Fills the band behind the copy, under a heavy navy wash. Supplied by the user. */
  backdrop: {
    src: "/images/about/london-skyline.png",
    alt: "",
    position: "50% 55%",
  } satisfies HomeImage,
  images: {
    main: {
      src: "/images/home/community-forum.jpg",
      alt: "People of different ages and backgrounds talking together around tables at a community meeting",
      position: "50% 40%",
      pending: "about-hero-forum.jpg",
    },
    inset: {
      src: "/images/home/international-meeting.jpg",
      alt: "Delegates from different countries around a meeting table with a presentation screen",
      position: "50% 50%",
      pending: "about-hero-network.jpg",
    },
  } satisfies Record<string, HomeImage>,
} as const;

/**
 * The strip under the hero. Its labels and links are the brief's About Us
 * sub-menu, but it runs in the order the page lays the sections out, which
 * puts Our Approach second. Sections the page does not carry are left out so
 * no link lands on an empty anchor; Our Team is missing because the brief
 * gives it no content yet.
 */
const PAGE_SECTIONS = [
  "who-we-are",
  "our-approach",
  "vision-and-mission",
  "our-values",
  "safeguarding",
  "policies",
  "accessibility",
];

const aboutMenu = navigation.find((item) => item.label === "About Us")?.children ?? [];

export const aboutSections = {
  label: "About Us",
  links: PAGE_SECTIONS.flatMap((id) => aboutMenu.filter((link) => link.href.endsWith(`#${id}`))),
};

/* -------------------------------------------------------------------------
   WHO WE ARE
   ------------------------------------------------------------------------- */

export type OutcomeIcon = "connect" | "confidence" | "opportunity";

export const aboutWhoWeAre = {
  /** Matches the anchor the menu builds from the label "Who We Are". */
  id: "who-we-are",
  kicker: "Who We Are",
  titleLead: "Everyone Has",
  titleAccent: "Potential.",
  lead: "OneVoice Global Foundation is a community empowerment and partnership platform dedicated to helping people access opportunities, develop their potential and participate more fully in society.",
  body: "Through our London-based Skill Development Centre, we support people from ethnic minority, disadvantaged and underserved communities to build skills, gain confidence, improve digital capability, access employment, explore enterprise, strengthen wellbeing and connect with their communities.",
  /** The brief's own line and its twelve barriers, in the brief's order. */
  barriers: {
    lead: "That potential can be blocked by barriers such as:",
    items: [
      "Limited English",
      "Lack of digital skills",
      "Unemployment",
      "Lack of confidence",
      "Caring responsibilities",
      "Social isolation",
      "Limited professional networks",
      "Financial challenges",
      "Lack of access to information",
      "Discrimination",
      "Domestic abuse",
      "Limited awareness of available opportunities",
    ],
  },
  quote: "Our role is to help people identify those barriers and find practical routes forward.",
  /** The card over the photograph's top corner: the Foundation's own
      subtitle, as the home page's introduction uses it. */
  badge: brand.initiative,
  /** The card over the photograph's foot. "Based in London" is the
      paragraph's own "London-based Skill Development Centre", as a label. */
  card: { title: "Based in London", line: brand.centre },
  image: {
    src: "/images/home/community-consultation.jpg",
    alt: "Community members seated along a long table during a consultation session",
    position: "50% 55%",
    pending: "about-who-we-are.jpg",
  } satisfies HomeImage,
  /** The closing line, a tile to a phrase. */
  outcomes: [
    { title: "Connecting People", icon: "connect" },
    { title: "Building Confidence", icon: "confidence" },
    { title: "Creating Opportunity", icon: "opportunity" },
  ] satisfies { title: string; icon: OutcomeIcon }[],
} as const;

/* -------------------------------------------------------------------------
   VISION & MISSION
   The brief's Foundation-level Vision, Mission and Purpose (its "OneVoice
   Global Foundation" page), not the Centre's, because this is the
   Foundation's About page.
   ------------------------------------------------------------------------- */

export const aboutVisionMission = {
  id: "vision-and-mission",
  kicker: "Vision & Mission",
  /* The brief gives the Vision block no title of its own, so the section
     borrows the Vision heading from the brief's Skill Development Centre
     page: "A London Where Everyone Has the Opportunity to Fulfil Their
     Potential." */
  titleLead: "A London Where Everyone Has",
  titleAccent: "the Opportunity to Fulfil Their Potential",
  attribution: brand.name,
} as const;

type VisionPanel = {
  label: string;
  statement: string;
  /** The Mission's closing clauses, which the brief sets off with semicolons. */
  commitments?: string[];
  image: HomeImage;
};

export const aboutVisionPanels = [
  {
    label: "Our Vision",
    statement:
      "Communities where people from all backgrounds can participate, develop their potential, access opportunities and contribute to shared social and economic progress.",
    image: {
      src: "/images/home/community-meeting.jpg",
      alt: "A woman speaking while others listen around tables in a library meeting room",
      position: "45% 45%",
      pending: "about-vision.jpg",
    },
  },
  {
    label: "Our Mission",
    statement:
      "To unite communities, amplify their voices, develop people's skills and capabilities, improve access to essential services and opportunities, and build partnerships that advance social inclusion and community wellbeing with public institutions, charities, education providers and employers.",
    commitments: [
      "Identify unmet needs",
      "Support inclusive participation",
      "Develop practical initiatives with measurable outcomes",
    ],
    image: {
      src: "/images/home/digital-skills-class.jpg",
      alt: "A tutor helping two women at computers in a learning room",
      position: "40% 50%",
      pending: "about-mission.jpg",
    },
  },
  {
    label: "Our Purpose",
    statement:
      "To serve as a trusted bridge between communities and wider society, helping people be heard, access support, develop their potential and contribute positively to their local communities and the world.",
    image: {
      src: "/images/home/women-learning-group.jpg",
      alt: "A group of young women with laptops listening to a facilitator",
      position: "50% 45%",
      pending: "about-purpose.jpg",
    },
  },
] satisfies VisionPanel[];

/* -------------------------------------------------------------------------
   ONEVOICE JOURNEY
   The brief carries this on its OneVoice Journey page, and again, in the same
   five steps, on the homepage. The home page sets them as a row of numbered
   circles; here they are read down a rail instead.
   ------------------------------------------------------------------------- */

export const aboutJourney = {
  kicker: "OneVoice Journey",
  /** The brief's own subtitle for the page. */
  titleLead: "One Person. One Goal.",
  titleAccent: "One Step at a Time.",
  /** Fills the panel behind the path, under a heavy navy wash. Supplied by
      the user; the city the Centre works in, not a photograph in its own
      right. */
  backdrop: {
    src: "/images/about/tower-bridge.png",
    alt: "",
    position: "50% 55%",
  } satisfies HomeImage,
  /** The brief's five steps, in the brief's order. Connect is step one and
      step four: the brief names both that way. */
  steps: [
    { name: "Connect", line: "Start with a conversation." },
    { name: "Discover", line: "Identify your goals and needs." },
    { name: "Develop", line: "Build skills and confidence." },
    { name: "Connect", line: "Access employers, education, enterprise and community opportunities." },
    { name: "Progress", line: "Move towards employment, education, enterprise or greater independence." },
  ],
} as const;

/* -------------------------------------------------------------------------
   OUR VALUES
   ------------------------------------------------------------------------- */

export type ValueIcon =
  "empowerment" | "inclusion" | "respect" | "equality" | "safety" | "collaboration" | "integrity" | "progress";

/** How each card is painted: the logo navy, a deeper navy, amber, or paper. */
export type ValueTone = "navy" | "deep" | "saffron" | "white";

export const aboutValues = {
  id: "our-values",
  /* The brief gives the Values block no title beyond its own heading, so the
     heading is the title. It borrowed Respect's line, "Everyone deserves
     dignity", for a while, but that is a card on this very grid and the two
     read as a mistake side by side. */
  titleLead: "Our",
  titleAccent: "Values",
  primaryCta: ctas.support,
  secondaryCta: ctas.partner,
  /** The brief's eight values, in the brief's order. */
  items: [
    {
      name: "Empowerment",
      line: "We help people develop the confidence to make informed choices.",
      icon: "empowerment",
      tone: "navy",
    },
    {
      name: "Inclusion",
      line: "We welcome people from diverse backgrounds and circumstances.",
      icon: "inclusion",
      tone: "saffron",
    },
    { name: "Respect", line: "Everyone deserves dignity.", icon: "respect", tone: "white" },
    { name: "Equality", line: "We work to reduce barriers to opportunity.", icon: "equality", tone: "deep" },
    { name: "Safety", line: "Safeguarding and wellbeing are fundamental.", icon: "safety", tone: "navy" },
    {
      name: "Collaboration",
      line: "We achieve more by working together.",
      icon: "collaboration",
      tone: "white",
    },
    { name: "Integrity", line: "We act responsibly and transparently.", icon: "integrity", tone: "saffron" },
    { name: "Progress", line: "We focus on practical outcomes.", icon: "progress", tone: "navy" },
  ] satisfies { name: string; line: string; icon: ValueIcon; tone: ValueTone }[],
  /** Photographs woven through the grid. Values are abstractions; without
      faces among them the section reads as a dashboard rather than as
      anything to do with people. */
  images: [
    {
      src: "/images/Photo 1.png",
      alt: "A woman in a pink headscarf working on a laptop beside a smiling tutor at a shared desk",
      position: "40% 50%",
      pending: "about-values-1.jpg",
    },
    {
      src: "/images/OurWorkHeroSection1.png",
      alt: "Young adults working together on laptops around an office table",
      position: "50% 35%",
      pending: "about-values-2.jpg",
    },
    {
      src: "/images/HomePageHeroSection2.png",
      alt: "Volunteers handing a box of groceries to a woman at a community food distribution",
      position: "40% 40%",
      pending: "about-values-3.jpg",
    },
    {
      src: "/images/OurWorkPageHeroSection1.jpg",
      alt: "A group of young adults sharing laptops during a workshop",
      position: "40% 45%",
      pending: "about-values-4.jpg",
    },
    {
      src: "/images/HomePageHeroSectionOrignal.png",
      alt: "A smiling group gathered around a laptop at a table in a busy learning space",
      position: "55% 45%",
      pending: "about-values-5.jpg",
    },
  ] satisfies HomeImage[],
} as const;

/* -------------------------------------------------------------------------
   OUR APPROACH
   ------------------------------------------------------------------------- */

export type ApproachIcon = "listen" | "understand" | "develop" | "connect" | "progress";

export const aboutApproach = {
  id: "our-approach",
  kicker: "Our Approach",
  /** The brief's five steps. Their names together are the brief's own
      subtitle for this page: Listen. Understand. Develop. Connect. Progress. */
  steps: [
    { name: "Listen", line: "We start by understanding individual circumstances and aspirations.", icon: "listen" },
    { name: "Understand", line: "We identify skills, barriers, opportunities and support needs.", icon: "understand" },
    { name: "Develop", line: "We provide training, mentoring and personal development.", icon: "develop" },
    {
      name: "Connect",
      line: "We connect people with employers, education, enterprise and community opportunities.",
      icon: "connect",
    },
    { name: "Progress", line: "We support people towards their next stage of development.", icon: "progress" },
  ] satisfies { name: string; line: string; icon: ApproachIcon }[],
} as const;

/* -------------------------------------------------------------------------
   SAFEGUARDING, POLICIES AND ACCESSIBILITY
   Three of the brief's blocks, set side by side. "Policies" has no block of
   its own in the brief; Confidentiality & Privacy is the nearest, so the
   menu's Policies link lands there.
   ------------------------------------------------------------------------- */

export const aboutCommitmentsIntro = {
  /* The brief gives these three blocks no shared title, so the section
     borrows a line it uses elsewhere, the subtitle of its Domestic Abuse
     Support page: "Everyone Deserves to Feel Safe and Respected." */
  titleLead: "Everyone Deserves to Feel",
  titleAccent: "Safe and Respected",
} as const;

export type CommitmentIcon = "safeguarding" | "privacy" | "accessibility";

export const aboutCommitments = [
  {
    id: "safeguarding",
    icon: "safeguarding",
    kicker: "Safeguarding",
    title: "Keeping People Safe",
    paragraphs: [
      "Safeguarding is central to our work. OneVoice will maintain appropriate safeguarding policies, procedures, training and referral arrangements. Staff, volunteers, mentors and partners involved in delivery will be expected to understand their responsibilities.",
      "Where safeguarding concerns arise, appropriate action will be taken in accordance with relevant procedures and legal requirements.",
    ],
  },
  {
    id: "policies",
    icon: "privacy",
    kicker: "Policies",
    title: "Confidentiality & Privacy",
    paragraphs: [
      "We respect the privacy of people using our services. Personal information will be handled responsibly in accordance with applicable data protection requirements and our privacy policy.",
      "There may be circumstances where information must be shared to protect someone from serious harm or where required by law.",
    ],
  },
  {
    id: "accessibility",
    icon: "accessibility",
    kicker: "Accessibility",
    title: "Accessibility & Inclusion",
    paragraphs: ["We aim to make our services accessible to people with different:"],
    /** The brief's seven, listed rather than run on. */
    items: [
      "Languages",
      "Abilities",
      "Educational backgrounds",
      "Digital skills",
      "Cultural backgrounds",
      "Employment experiences",
      "Family circumstances",
    ],
    note: "Reasonable adjustments should be considered wherever practical.",
  },
] satisfies {
  id: string;
  icon: CommitmentIcon;
  kicker: string;
  title: string;
  paragraphs: string[];
  items?: string[];
  note?: string;
}[];

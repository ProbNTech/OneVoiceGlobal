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

import type { HomeImage, JourneyIcon } from "@/data/home";
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
 * sub-menu, and it runs in the order the page lays the sections out. Sections
 * the page does not carry are left out so no link lands on an empty anchor;
 * Our Team is missing because the brief gives it no content yet.
 */
const PAGE_SECTIONS = [
  "who-we-are",
  "vision-and-mission",
  "our-values",
  "our-approach",
  "safeguarding",
  // "policies" and "accessibility" return here with the sections that will
  // carry them.
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
  /* The card over the photograph's top corner. It is the Foundation's own
     subtitle shortened to fit the card, so `brand.initiative` keeps the
     brief's full wording for the home page's introduction. */
  badge: "Community Empowerment, Skills & Social Inclusion",
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
   five steps, on the homepage.
   ------------------------------------------------------------------------- */

export const aboutJourney = {
  kicker: "OneVoice Journey",
  /** The brief's own subtitle for the page. */
  titleLead: "One Person. One Goal.",
  titleAccent: "One Step at a Time.",
  /** Fills the panel behind the steps, under a heavy navy wash. Supplied by
      the user; the city the Centre works in, not a photograph in its own
      right. */
  backdrop: {
    src: "/images/about/tower-bridge.png",
    alt: "",
    position: "50% 55%",
  } satisfies HomeImage,
  /** Sets the five steps up: what the journey is, and that it is walked at
      the pace of the person walking it. */
  lead: "Everyone who comes to OneVoice arrives at a different point, with different hopes and different pressures. The journey below is how we walk it with you — one conversation at a time, for as long as it takes.",
  /** Closes the steps off, beneath them. */
  note: "No two journeys look the same, and nobody walks it alone.",
  /** The brief's five steps, in the brief's order. Connect is step one and
      step four: the brief names both that way. */
  steps: [
    { name: "Connect", line: "Start with a conversation.", icon: "message" },
    { name: "Discover", line: "Identify your goals and needs.", icon: "compass" },
    { name: "Develop", line: "Build skills and confidence.", icon: "sprout" },
    {
      name: "Connect",
      line: "Access employers, education, enterprise and community opportunities.",
      icon: "handshake",
    },
    {
      name: "Progress",
      line: "Move towards employment, education, enterprise or greater independence.",
      icon: "trending",
    },
  ] satisfies { name: string; line: string; icon: JourneyIcon }[],
  cta: ctas.support,
} as const;

/* -------------------------------------------------------------------------
   OUR VALUES
   ------------------------------------------------------------------------- */

export const aboutValues = {
  id: "our-values",
  /* The brief heads this block "Our Values" and gives it no title beyond
     that, so the heading is the kicker. */
  kicker: "Our Values",
  /** The brief's headline for the Foundation, held in `brand`. */
  lead: brand.headline,
  primaryCta: ctas.support,
  secondaryCta: ctas.partner,
  /** The brief's eight values, in the brief's order. */
  items: [
    { name: "Empowerment", line: "We help people develop the confidence to make informed choices." },
    { name: "Inclusion", line: "We welcome people from diverse backgrounds and circumstances." },
    { name: "Respect", line: "Everyone deserves dignity." },
    { name: "Equality", line: "We work to reduce barriers to opportunity." },
    { name: "Safety", line: "Safeguarding and wellbeing are fundamental." },
    { name: "Collaboration", line: "We achieve more by working together." },
    { name: "Integrity", line: "We act responsibly and transparently." },
    { name: "Progress", line: "We focus on practical outcomes." },
  ] satisfies { name: string; line: string }[],
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
   WHAT WE DO
   The Centre's ten services, from the brief's "What We Do" block. These are
   not the brief's Services sub-menu, which groups the same work into five
   headings; both are the brief's own and are left as the brief writes them.
   ------------------------------------------------------------------------- */

export type ServiceIcon =
  | "education"
  | "employment"
  | "english"
  | "digital"
  | "enterprise"
  | "guidance"
  | "wellbeing"
  | "support"
  | "mentoring"
  | "community";

export const aboutWhatWeDo = {
  id: "what-we-do",
  kicker: brand.centre,
  /** The brief's own heading for the block, split two-tone. */
  titleLead: "What We",
  titleAccent: "Do",
  /* The brief's opening line. It introduces a numbered list and so ends on a
     colon; set as a sentence here because the list follows on its own. */
  lead: "OneVoice Skill Development Centre provides an integrated programme of services.",
  cta: ctas.services,
  /* The brief's ten services, in the brief's order and numbered as it numbers
     them. Nine photographs were supplied under /images/about/What-we-do/,
     numbered to match. The third was not, so English & Communication keeps a
     stand-in and names the file it waits for in `pending`. The supplied files
     are 16:9, which is the shape of the card's frame, so none is cropped and
     none needs its crop steered. */
  items: [
    {
      name: "Education & Skills Development",
      image: {
        src: "/images/about/What-we-do/what-we-do-image-1.png",
        alt: "A trainer at a whiteboard explaining a diagram to five people seated around a table with notebooks and laptops",
      },
      icon: "education",
      line: "Practical learning opportunities for personal, professional and digital development.",
    },
    {
      name: "Employment & Careers",
      image: {
        src: "/images/about/What-we-do/what-we-do-image-2.png",
        alt: "An adviser showing a printed document to a man seated across a desk from her, a laptop open between them",
      },
      icon: "employment",
      line: "Helping people become job-ready, find employment and progress in their careers.",
    },
    {
      name: "English & Communication",
      image: {
        src: "/images/Photo 1.png",
        alt: "A woman in a pink headscarf working on a laptop beside a smiling tutor at a shared desk",
        position: "45% 45%",
        pending: "what-we-do-image-3.png",
      },
      icon: "english",
      line: "Supporting people to develop confidence in English and workplace communication.",
    },
    {
      name: "Digital Inclusion",
      image: {
        src: "/images/about/What-we-do/What-we-do-image-4.png",
        alt: "A woman pointing at a desktop screen while an older man beside her works the mouse, in a bright open learning space",
      },
      icon: "digital",
      line: "Building confidence with computers, technology and online services to develop the digital skills needed for everyday life, employment and business.",
    },
    {
      name: "Enterprise & Self-Employment",
      image: {
        src: "/images/about/What-we-do/What-we-Do-image-5.png",
        alt: "Two women looking at a tablet together at a counter of small handmade products in a shop",
      },
      icon: "enterprise",
      line: "Supporting people to explore business ideas, freelancing and entrepreneurship.",
    },
    {
      name: "Information, Advice & Guidance",
      image: {
        src: "/images/about/What-we-do/What-we-Do-image-6.png",
        alt: "An adviser pointing to a printed leaflet on a low table while a woman seated beside her looks on",
      },
      icon: "guidance",
      line: "Helping people understand their options around learning, careers, employment and support.",
    },
    {
      name: "Health & Wellbeing",
      image: {
        src: "/images/about/What-we-do/What-We-Do-image-7.png",
        alt: "Seven people sitting in a circle talking on a planted rooftop terrace at sunset, the London skyline behind them",
      },
      icon: "wellbeing",
      line: "Promoting positive mental health, resilience and social connection.",
    },
    {
      name: "Domestic Abuse Support",
      image: {
        src: "/images/about/What-we-do/What-we-do-image-8.png",
        alt: "A woman taking notes while talking with another woman in armchairs, shelves of donated goods behind them",
      },
      icon: "support",
      line: "Providing safe, confidential and non-judgemental support and appropriate referrals.",
    },
    {
      name: "Mentoring",
      image: {
        src: "/images/about/What-we-do/What-we-do-image-9.png",
        alt: "A speaker with a microphone addressing a seated audience in a conference hall",
      },
      icon: "mentoring",
      line: "Connecting people with mentors who can provide encouragement and practical guidance.",
    },
    {
      name: "Community Development",
      image: {
        src: "/images/about/What-we-do/What-we-do-image-10.png",
        alt: "A large group of people of different ages and backgrounds sitting and talking together outdoors in a city park",
      },
      icon: "community",
      line: "Building stronger, more connected and inclusive communities.",
    },
  ] satisfies { name: string; line: string; icon: ServiceIcon; image: HomeImage }[],
} as const;

/* -------------------------------------------------------------------------
   SAFEGUARDING
   ------------------------------------------------------------------------- */

export type SafeguardIcon = "policies" | "procedures" | "training" | "referral" | "law";

export const aboutSafeguarding = {
  id: "safeguarding",
  kicker: "Safeguarding",
  /** The brief's own title for the block, split two-tone. */
  titleLead: "Keeping People",
  titleAccent: "Safe",
  /** The brief's first two paragraphs, word for word. */
  paragraphs: [
    "Safeguarding is central to our work. OneVoice will maintain appropriate safeguarding policies, procedures, training and referral arrangements.",
    "Staff, volunteers, mentors and partners involved in delivery will be expected to understand their responsibilities.",
  ],
  /* The four things the first paragraph names, drawn out of its own sentence
     and numbered. The panel's label is the brief's own clause, so the list
     still reads as the sentence it came from and claims nothing more. */
  arrangementsLabel: "OneVoice will maintain",
  arrangements: [
    { name: "Policies", icon: "policies" },
    { name: "Procedures", icon: "procedures" },
    { name: "Training", icon: "training" },
    { name: "Referral Arrangements", icon: "referral" },
  ] satisfies { name: string; icon: SafeguardIcon }[],
  /** The brief's closing sentence, set apart as a notice. */
  notice: {
    icon: "law" as SafeguardIcon,
    text: "Where safeguarding concerns arise, appropriate action will be taken in accordance with relevant procedures and legal requirements.",
  },
  cta: ctas.support,
} as const;

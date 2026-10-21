/**
 * Homepage section content.
 *
 * Every string here is drawn from, or faithfully paraphrases, the client's
 * source document — the hero, "Why OneVoice?", the core offerings, the OneVoice
 * Journey, "Who we support", "Work with us", the impact framework and the final
 * call to action. No impact numbers, participant stories, partner names, dates
 * or availability are included, because none are confirmed in the source.
 */

import type {
  CorePillar,
  HelpPathway,
  ImpactStage,
  JourneyStep,
  PartnerAudience,
} from "@/types/content";
import { programmes } from "@/data/programmes";
import { serviceAreas } from "@/data/services";

/* -------------------------------------------------------------------------- */
/*  Approved image assets                                                      */
/*  The only photographs and logo supplied by the client. Nothing else is      */
/*  presented as a real OneVoice participant or asset.                         */
/* -------------------------------------------------------------------------- */

export const assets = {
  logo: "/images/Logo.png",
  /** Hero photograph — a community food distribution. */
  heroPhoto: "/images/HomePageHeroSection2.png",
  /**
   * Community learning-space photograph. Kept as its own asset because the
   * sections that use it (the Skills & Education card, Who We Support)
   * describe a learning session in their alt text, and that description has to
   * keep matching the picture on screen.
   */
  learningPhoto: "/images/HomePageHeroSectionOrignal.png",
  /**
   * The three Our Work hero slides. The filenames are inconsistent on disk
   * (`OurWorkPageHeroSection3` vs `OurWorkHeroSection1/2`); they are mapped
   * here so the rest of the code refers to slide 1/2/3, not to spellings.
   */
  ourWorkSlide1: "/images/OurWorkHeroSection1.png",
  ourWorkSlide2: "/images/OurWorkHeroSection2.png",
  ourWorkSlide3: "/images/OurWorkPageHeroSection3.png",
  /** Community outreach / distribution scene. */
  outreachPhoto: "/images/HomePageHeroSection1.png",
  secondaryPhoto: "/images/Photo 1.png",
} as const;

/* --- Hero (source: "HOMEPAGE HERO") --------------------------------------- */

export const hero = {
  label: "OneVoice Global Foundation",
  /** Rendered one sentence per line, as in the approved design. */
  headlineLines: [
    "Empowering People.",
    "Building Skills.",
    "Creating Opportunities.",
  ],
  description:
    "Helping people across London develop skills, build confidence, access employment and connect with their communities.",
  supporting: "Learn. Develop. Connect. Progress.",
  primaryCta: { label: "Get Support", href: "#contact" },
  secondaryCta: { label: "Explore Our Services", href: "#areas" },
  image: {
    src: assets.heroPhoto,
    // Describes the scene only. The people shown are not presented as OneVoice
    // participants, staff or volunteers (spec §6.6).
    alt: "Volunteers at a community food distribution handing a box of groceries to a woman, with others sorting supplies at tables behind them.",
  },
} as const;

/* --- About OneVoice (source: "WHO WE ARE") -------------------------------- */

export const aboutContent = {
  eyebrow: "One Organisation. Many Pathways.",
  heading: "Stronger Communities, Shared Opportunities, One World.",
  intro:
    "OneVoice Global Foundation brings people, organisations and opportunities together to create stronger, more inclusive communities.",
  lead: "Creating Opportunities. Strengthening Communities.",
  body: "Through practical education, skills development, employment support, mentoring and community partnerships, we help individuals overcome barriers and move towards a more confident and independent future.",
  mission:
    "We listen first, understand what matters, and connect people to the right support — one conversation, one person, one opportunity at a time.",
  cta: { label: "Learn About OneVoice", href: "#areas" },
  imageAlt:
    "A mentor and learner working side by side at a laptop during a community digital-skills session.",
} as const;

/**
 * Short positioning markers shown beneath the About copy.
 *
 * All three restate the client's own positioning: the "One Organisation. Many
 * Pathways." differentiator, the listen-first approach, and the source's
 * explicit constraint that OneVoice is a community partnership platform and
 * NOT a political body. Nothing here is a claim about delivery or results.
 */
export const aboutMarkers: string[] = [
  "One organisation, many pathways",
  "We listen first",
  "A partnership platform, not a political body",
];

/** The three strands of work, shown as a checklist on the About composition. */
export const aboutPillars: string[] = [
  "Education, skills and digital confidence",
  "Employment, enterprise and mentoring",
  "Wellbeing, community and participation",
];

/* --- "How can we help?" quick pathways (spec H-03, proposed) --------------- */

export const helpPathways: HelpPathway[] = [
  { label: "Find work", href: "#programmes", icon: "briefcase" },
  { label: "Learn skills", href: "#programmes", icon: "graduation-cap" },
  { label: "Improve English", href: "#programmes", icon: "messages-square" },
  { label: "Build digital confidence", href: "#programmes", icon: "monitor-smartphone" },
  { label: "Explore enterprise", href: "#programmes", icon: "lightbulb" },
  { label: "Get connected to support", href: "#contact", icon: "hand-heart" },
];

/* --- Why OneVoice? (source: "WHY ONEVOICE?") ------------------------------ */
/* The emotional core of the brand. Verbatim rhythm from the source. */

export const whyOneVoice = {
  differentiator: "One Organisation. Many Pathways.",
  lines: [
    "Someone may come to us looking for a job.",
    "They may actually need digital skills.",
    "They may need English.",
    "They may need confidence.",
    "They may need someone to listen.",
    "They may need enterprise support.",
    "They may need access to a specialist service.",
  ],
  conclusion: "That's why our approach is holistic.",
  threads: [
    "Skills",
    "Employment",
    "Digital",
    "Enterprise",
    "Education",
    "Wellbeing",
    "Mentoring",
    "Community",
  ],
} as const;

/* --- Eight core offerings (source: "OUR CORE PROGRAMMES") ------------------ */
/* These are offer areas, not courses, so they carry no availability claim. */

export const corePillars: CorePillar[] = [
  { icon: "wrench", title: "Skills Development", description: "Develop practical skills for life and work." },
  { icon: "briefcase", title: "Employability", description: "Become job ready and access employment opportunities." },
  { icon: "monitor-smartphone", title: "Digital OneVoice", description: "Build confidence in the digital world." },
  { icon: "lightbulb", title: "OneVoice Enterprise", description: "Turn ideas into opportunities." },
  { icon: "messages-square", title: "English & Communication", description: "Develop English and communication skills." },
  { icon: "users", title: "Mentoring", description: "Get guidance and support from experienced people." },
  { icon: "heart-pulse", title: "Wellbeing", description: "Build resilience, confidence and social connection." },
  { icon: "handshake", title: "Community", description: "Connect, participate and build relationships." },
];

/* -------------------------------------------------------------------------- */
/*  Support programmes — homepage presentation layer (brief section 04)        */
/*  Three editorial category features. The full programme directory lives in   */
/*  src/data/programmes.ts; these three are only how the homepage groups them  */
/*  for a first-time visitor. No availability is claimed.                      */
/* -------------------------------------------------------------------------- */

export interface ProgrammeFeature {
  id: "skills-education" | "employment-enterprise" | "community-wellbeing";
  /** Lucide icon name, resolved by the rendering component. */
  icon: string;
  title: string;
  description: string;
  topics: string[];
  href: string;
  imageCaption: string;
}

export const programmeFeatures: ProgrammeFeature[] = [
  {
    id: "skills-education",
    icon: "graduation-cap",
    title: "Skills & Education",
    description:
      "Build the everyday skills and confidence to learn, work and take part — from English and communication to practical digital literacy.",
    topics: [
      "Education & skills development",
      "Digital OneVoice",
      "English & communication",
      "Digital literacy",
      "Career guidance",
    ],
    href: "#programmes",
    imageCaption: "An adult learner building digital confidence at a laptop.",
  },
  {
    id: "employment-enterprise",
    icon: "briefcase",
    title: "Employment & Enterprise",
    description:
      "Practical pathways into work and self-employment — becoming job ready, returning after a break, or turning an idea into a business.",
    topics: [
      "Employability",
      "Return to work",
      "Business development",
      "Enterprise support",
      "Mentoring",
      "Financial capability",
    ],
    href: "#programmes",
    imageCaption: "A career-guidance conversation between two people.",
  },
  {
    id: "community-wellbeing",
    icon: "heart-handshake",
    title: "Community & Wellbeing",
    description:
      "Support to connect, participate and feel well — community programmes, youth and women's development, and trusted signposting.",
    topics: [
      "Community programmes",
      "Youth development",
      "Women's development",
      "Men's development",
      "Wellbeing",
      "Information & signposting",
    ],
    href: "#programmes",
    imageCaption: "People taking part together in a community activity.",
  },
];

/* --- Your OneVoice Journey (source: "OUR JOURNEY") ------------------------- */

export const journeySteps: JourneyStep[] = [
  { order: 1, label: "Connect", description: "Start with a conversation." },
  { order: 2, label: "Discover", description: "Identify your goals and needs." },
  { order: 3, label: "Develop", description: "Build skills and confidence." },
  { order: 4, label: "Connect", description: "Access employers, education, enterprise and community opportunities." },
  { order: 5, label: "Progress", description: "Move towards employment, education, enterprise or greater independence." },
];

/* --- Who we support (source: "WHO WE SUPPORT") ---------------------------- */

export const audiences: string[] = [
  "Women",
  "Men",
  "Young People",
  "Jobseekers",
  "Career Changers",
  "Entrepreneurs",
  "Professionals",
  "New Communities",
  "Families",
  "People Facing Barriers to Opportunity",
];

export const audiencesCaveat =
  "Programme eligibility may vary depending on funding and individual programme criteria.";

/* -------------------------------------------------------------------------- */
/*  "At a glance" bar — rendered by the About section                          */
/*                                                                            */
/*  NOT impact statistics. Every value is either a count of content published  */
/*  on this site (so it can never drift from what a visitor can actually see)  */
/*  or a fact stated in the source document. No participant numbers, outcomes  */
/*  or delivery figures appear here — those belong in the Impact section, and  */
/*  only once verified. Declared at this point in the file because it counts   */
/*  `audiences` above.                                                        */
/* -------------------------------------------------------------------------- */

export interface AboutStat {
  /** Lucide icon name, resolved by the rendering component. */
  icon: string;
  /** Counted up on scroll when numeric; `text` is shown verbatim when null. */
  value: number | null;
  text?: string;
  label: string;
}

export const aboutStats: AboutStat[] = [
  { icon: "layers", value: serviceAreas.length, label: "Areas of work" },
  {
    icon: "graduation-cap",
    value: programmes.length,
    label: "Programmes in development",
  },
  { icon: "users", value: audiences.length, label: "Audience groups welcomed" },
  { icon: "map-pin", value: null, text: "London", label: "Where we work" },
];

export const aboutStatsCaveat =
  "These describe the scope of our planned work, not results. Verified participation and outcome figures will be published once programmes begin.";

/* --- Work with us (source: "WORK WITH US") -------------------------------- */

export const partnerAudiences: PartnerAudience[] = [
  { label: "Employers", description: "Connect with diverse talent." },
  { label: "Training Providers", description: "Expand access to education." },
  { label: "Community Organisations", description: "Refer and support participants." },
  { label: "Public Sector", description: "Develop effective community programmes." },
  { label: "Funders", description: "Invest in measurable social impact." },
  { label: "Businesses", description: "Support skills and community development." },
];

/* --- Impact framework (source: "OUR IMPACT" — REACH→...→SUSTAIN) ----------- */
/* Framework only. No figures: the source confirms no verified metrics. */

export const impactFramework: ImpactStage[] = [
  { order: 1, label: "Reach" },
  { order: 2, label: "Engage" },
  { order: 3, label: "Develop" },
  { order: 4, label: "Progress" },
  { order: 5, label: "Sustain" },
];

export const impactIntro =
  "We are building the ways we will measure participation, progression and outcomes. As programmes begin, our work will be guided by a simple framework.";

/** Areas OneVoice INTENDS to measure. Labels only — never presented as results. */
export const intendedOutcomes: string[] = [
  "People engaged",
  "Programme participants",
  "Skills developed",
  "Employment outcomes",
  "Digital skills gained",
  "Mentoring relationships",
  "Community participation",
];

/* -------------------------------------------------------------------------- */
/*  Real Stories, Real Progress (brief section 10)                             */
/*  THEMES ONLY — no participants, quotations, names or photographs are        */
/*  invented. Genuine, consent-approved stories replace these later.           */
/* -------------------------------------------------------------------------- */

export interface StoryTheme {
  from: string;
  to: string;
}

export const storyThemes: StoryTheme[] = [
  { from: "Unemployment", to: "Employment" },
  { from: "Digital exclusion", to: "Digital confidence" },
  { from: "Isolation", to: "Community" },
  { from: "An idea", to: "A business" },
  { from: "A career break", to: "A new career" },
];

export const storiesIntro =
  "Everyone who comes to OneVoice starts somewhere different. Our work is to help people move from barriers towards confidence, skills, opportunity and independence. As participants choose to share their progress, their stories will appear here.";

/* -------------------------------------------------------------------------- */
/*  Community Events & Activities (brief section 11)                           */
/*  Activity TYPES only. No dates, venues or schedules are invented.           */
/* -------------------------------------------------------------------------- */

export interface CommunityActivity {
  /** Lucide icon name, resolved by the rendering component. */
  icon: string;
  title: string;
  description: string;
}

export const communityActivities: CommunityActivity[] = [
  { icon: "wrench", title: "Skills workshops", description: "Hands-on sessions to build practical, everyday capability." },
  { icon: "users", title: "Community networking", description: "Meet neighbours, make connections and find your footing." },
  { icon: "briefcase", title: "Employment events", description: "Guidance, introductions and routes towards work." },
  { icon: "monitor-smartphone", title: "Digital skills sessions", description: "Confidence with the devices and services of daily life." },
  { icon: "compass", title: "Leadership programmes", description: "Space for young people and women to develop and lead." },
  { icon: "hand-heart", title: "Volunteering opportunities", description: "Share your time and skills to strengthen the community." },
];

export const communityIntro =
  "OneVoice is a place to belong as well as to learn. Alongside our programmes, we bring people together through activities that build connection, confidence and community.";

/* --- Final call to action (source: "FINAL CALL TO ACTION") ---------------- */

export const finalCta = {
  heading: "Your Voice Matters. Your Future Matters.",
  body: "Whether you want to learn a new skill, find work, explore enterprise, improve your digital confidence or connect with your community, OneVoice is here to help you take the next step.",
  tagline: "One Person. One Voice. One Opportunity at a Time.",
  primaryCta: { label: "Get Support", href: "#contact" },
  secondaryCta: { label: "Get Involved", href: "#partners" },
} as const;

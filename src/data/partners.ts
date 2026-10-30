/**
 * Copy and media for the Partners page (`src/app/(site)/partners/page.tsx`).
 *
 * Every line comes from the brief. The partner sections are its PARTNERS
 * block (Employer Partnerships to Funders & Social Impact Partners), the
 * same word for word in Draft01 and V.2. Community Organisations, which
 * the Partners sub-menu lists but that block does not cover, takes the
 * brief's own FOR COMMUNITY ORGANISATIONS block from Get Involved. The
 * introduction is the Foundation's "Our Partnerships" block (V.2), and the
 * hero and closing lines are borrowed from the brief's homepage and PARTNER
 * WITH ONEVOICE blocks, as noted beside each.
 *
 * The sections run in the order of the brief's Partners sub-menu, and each
 * id is the anchor the menu builds from its label (and that the home page's
 * Work With Us links already point at).
 *
 * IMAGES. Each photograph was generated for its slot (prompts in
 * `_source/generated/tools/make_prompts_partners.py`) and cut to the slot's
 * exact size; the originals are kept in `_source/generated/`. The hero's wide
 * frame first held the V.2 document's photograph, replaced at the user's
 * request on 29 October 2026. No photograph here is used anywhere else on the
 * site, and none shows a logo or anything that could suggest a real partner.
 * Alt text describes only what the frame shows: none of these people is
 * presented as a OneVoice partner, participant or member of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, ctas, navigation, routes } from "@/data/site";

/** A photograph generated for its slot, saved under /images/partners/ by the slot's file name. */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/partners/${file}.jpg`,
  alt,
  position,
});

const photo = {
  hero: shot(
    "partners-hero",
    "A woman in a navy hijab explaining a plan pinned to a wall while three colleagues laugh and listen in a bright meeting room",
  ),
  heroSide: shot(
    "partners-hero-side",
    "A man in a navy jumper and a woman in a teal cardigan reviewing printed plans together at a high table",
  ),
  training: shot(
    "partners-collaboration-training",
    "A smiling mentor and a young apprentice in safety glasses looking at a piece of wood at a workbench",
  ),
  enterprise: shot(
    "partners-collaboration-enterprise",
    "A young woman in a teal hijab arranging jars on a shop counter beside a smiling man in a blazer",
  ),
  knowledge: shot(
    "partners-collaboration-knowledge",
    "Three people leaning over printed reports spread across a table, one pointing to a page",
  ),
  employers: shot(
    "partners-employers",
    "A man in a navy polo shirt explaining a machine to a group of adult learners on a bright workshop floor",
  ),
  college: shot(
    "partners-training",
    "Adult learners wiring practice boards at workbenches while a tutor checks one woman's work",
    "50% 20%",
  ),
  communityOrgs: shot(
    "partners-community-organisations",
    "Volunteers carrying boxes and folding tables to a van outside a community centre, laughing as they work",
  ),
  publicSector: shot(
    "partners-public-sector",
    "A nurse in a navy uniform taking an older man's blood pressure at a table while a woman beside him smiles",
  ),
  funders: shot(
    "partners-funders",
    "Two seated visitors applauding as four young people stand beside a board of pictures at the end of a presentation",
    "50% 8%",
  ),
  cta: shot(
    "partners-cta",
    "Visitors of all ages moving between information stands and chatting in a large, bright hall",
  ),
} satisfies Record<string, HomeImage>;

/* -------------------------------------------------------------------------
   HERO
   ------------------------------------------------------------------------- */

export const partnersHero = {
  kicker: "Partners",
  /* The brief's own heading and line from the close of its homepage block:
     "From Shared Challenges to Shared Solutions". */
  title: ["From Shared Challenges", "to Shared Solutions."],
  description:
    "Discover how partnerships, community-led programmes and practical support can help create more inclusive opportunities.",
  primaryCta: ctas.partner,
  secondaryCta: { label: "Contact Us", href: routes.contact },
  /** The card beside the photographs: the closing sentence of the brief's Our Partnerships block. */
  card: "We aim to develop partnerships around clear objectives, appropriate governance and outcomes that can be assessed.",
  images: {
    wide: photo.hero,
    tall: photo.heroSide,
  },
} as const;

/**
 * The strip under the hero: the brief's Partners sub-menu, read from the
 * navigation so the strip and the header's dropdown always list the same
 * sections.
 */
export const partnersSections = {
  label: "Partners",
  links: navigation.find((item) => item.label === "Partners")?.children ?? [],
};

/* -------------------------------------------------------------------------
   OUR PARTNERSHIPS
   The Foundation's own block in V.2 ("Our Partnerships: Better outcomes
   through collective action").
   ------------------------------------------------------------------------- */

export type CollaborationIcon =
  "funding" | "expertise" | "sponsorship" | "pathways" | "projects" | "knowledge" | "referrals";

export const partnersOverview = {
  id: "our-partnerships",
  kicker: "Our Partnerships",
  titleLead: "Better Outcomes",
  titleAccent: "Through Collective Action",
  paragraphs: [
    `${brand.name} seeks to work with organisations that share our commitment to stronger communities and greater opportunity.`,
    "We welcome discussions with businesses, charities, public bodies, community organisations, educational institutions, trusts, foundations and individual supporters.",
  ],
  listLabel: "Potential areas of collaboration include:",
  /**
   * The seven areas, run together as one statement. Every other area is
   * followed by a small photograph set in the line, like a word.
   */
  areas: [
    { text: "Funding community programmes.", icon: "funding" },
    {
      text: "Providing training, mentoring and professional expertise.",
      icon: "expertise",
      image: photo.training,
    },
    { text: "Sponsoring local initiatives and community events.", icon: "sponsorship" },
    {
      text: "Supporting employment and enterprise pathways.",
      icon: "pathways",
      image: photo.enterprise,
    },
    { text: "Developing joint projects with public and voluntary-sector organisations.", icon: "projects" },
    {
      text: "Sharing research, knowledge and resources.",
      icon: "knowledge",
      image: photo.knowledge,
    },
    { text: "Building referral networks for people requiring specialist support.", icon: "referrals" },
  ] satisfies { text: string; icon: CollaborationIcon; image?: HomeImage }[],
} as const;

/* -------------------------------------------------------------------------
   EMPLOYER PARTNERSHIPS
   ------------------------------------------------------------------------- */

export const partnersEmployers = {
  id: "employers",
  kicker: "Employer Partnerships",
  titleLead: "Connecting People",
  titleAccent: "with Employers",
  lead: "OneVoice can work with employers to develop practical pathways into employment.",
  // The brief reads "Employer engagement include:"; "can" is added for the grammar.
  listLabel: "Employer engagement can include:",
  items: [
    "Recruitment events",
    "Employer presentations",
    "Job vacancies",
    "Mock interviews",
    "Work experience",
    "Apprenticeships",
    "Mentoring",
    "Careers workshops",
    "Workplace visits",
    "Skills sessions",
  ],
  promise: {
    label: "Employer Promise",
    text: "We aim to help employers access diverse talent while helping people access meaningful employment opportunities.",
  },
  /** The brief's "Become an Employer Partner" call: its line and its button. */
  cta: {
    line: "Work with OneVoice to create pathways into employment.",
    label: "Become an Employer Partner",
    href: ctas.partner.href,
  },
  image: photo.employers,
} as const;

/* -------------------------------------------------------------------------
   TRAINING PROVIDERS
   The brief's FOR TRAINING PROVIDERS and TRAINING & EDUCATION PARTNERS
   blocks, side by side: what participants are connected with, and who
   OneVoice works with to do it.
   ------------------------------------------------------------------------- */

export const partnersTraining = {
  id: "training-providers",
  kicker: "Training Providers",
  titleLead: "Expand Access",
  titleAccent: "to Learning",
  closing: "Partnerships can help participants progress into recognised qualifications and employment.",
  participants: {
    label: "Partner with OneVoice to connect participants with:",
    items: [
      "Accredited training",
      "Professional qualifications",
      "Vocational courses",
      "ESOL",
      "Digital training",
      "Apprenticeships",
      "Higher education",
    ],
    image: photo.college,
  },
  collaborators: {
    heading: "Training & Education Partners",
    label: "OneVoice can collaborate with:",
    items: [
      "Colleges",
      "Universities",
      "Adult education providers",
      "Training organisations",
      "Professional bodies",
      "Accredited training providers",
      "Employers",
      "Specialist charities",
    ],
  },
} as const;

/* -------------------------------------------------------------------------
   COMMUNITY ORGANISATIONS
   The brief's FOR COMMUNITY ORGANISATIONS block (under Get Involved).
   ------------------------------------------------------------------------- */

export type OpportunityIcon =
  "referrals" | "joint" | "outreach" | "events" | "training" | "sessions" | "pathways" | "research";

export const partnersCommunity = {
  id: "community-organisations",
  kicker: "Community Organisations",
  /** The brief's heading for the block, three words set as a triad. */
  title: ["Refer.", "Partner.", "Collaborate."],
  lead: "We welcome relationships with organisations supporting individuals and families across London.",
  listLabel: "Partnership opportunities include:",
  items: [
    { label: "Referrals", icon: "referrals" },
    { label: "Joint programmes", icon: "joint" },
    { label: "Community outreach", icon: "outreach" },
    { label: "Events", icon: "events" },
    { label: "Training", icon: "training" },
    { label: "Information sessions", icon: "sessions" },
    { label: "Specialist referral pathways", icon: "pathways" },
    { label: "Community research", icon: "research" },
  ] satisfies { label: string; icon: OpportunityIcon }[],
  image: photo.communityOrgs,
} as const;

/* -------------------------------------------------------------------------
   PUBLIC SECTOR PARTNERSHIPS
   ------------------------------------------------------------------------- */

export type PublicIcon = "authorities" | "government" | "public" | "employment" | "health" | "housing" | "safety";

export const partnersPublic = {
  id: "public-sector",
  kicker: "Public Sector Partnerships",
  titleLead: "Working With",
  titleAccent: "Communities",
  lead: "OneVoice welcomes partnership opportunities with:",
  items: [
    { label: "Local authorities", icon: "authorities" },
    { label: "Government programmes", icon: "government" },
    { label: "Public-sector organisations", icon: "public" },
    { label: "Employment services", icon: "employment" },
    { label: "Health and wellbeing organisations", icon: "health" },
    { label: "Housing organisations", icon: "housing" },
    { label: "Community safety partners", icon: "safety" },
  ] satisfies { label: string; icon: PublicIcon }[],
  closing:
    "Our community-based approach can help partners engage people who may be underrepresented in mainstream programmes.",
  image: photo.publicSector,
} as const;

/* -------------------------------------------------------------------------
   CORPORATE PARTNERSHIPS
   ------------------------------------------------------------------------- */

export type CorporateIcon =
  | "sponsorship"
  | "volunteering"
  | "skills"
  | "mentoring"
  | "employment"
  | "training"
  | "equipment"
  | "events"
  | "investment"
  | "responsibility";

export const partnersCorporate = {
  id: "corporate-partners",
  kicker: "Corporate Partnerships",
  titleLead: "Businesses Can",
  titleAccent: "Make a Difference",
  lead: "Companies can support OneVoice through:",
  items: [
    { label: "Sponsorship", icon: "sponsorship" },
    { label: "Corporate volunteering", icon: "volunteering" },
    { label: "Skills-based volunteering", icon: "skills" },
    { label: "Mentoring", icon: "mentoring" },
    { label: "Employment partnerships", icon: "employment" },
    { label: "Training", icon: "training" },
    { label: "Equipment", icon: "equipment" },
    { label: "Events", icon: "events" },
    { label: "Community investment", icon: "investment" },
    { label: "Corporate social responsibility", icon: "responsibility" },
  ] satisfies { label: string; icon: CorporateIcon }[],
} as const;

/* -------------------------------------------------------------------------
   FUNDERS & SOCIAL IMPACT PARTNERS
   ------------------------------------------------------------------------- */

export type FunderIcon =
  "foundations" | "trusts" | "authorities" | "government" | "corporate" | "philanthropy" | "community" | "impact";

export const partnersFunders = {
  id: "funders",
  kicker: "Funders & Social Impact Partners",
  titleLead: "Invest in",
  titleAccent: "Potential",
  lead: "OneVoice seeks partnerships with:",
  funders: [
    { label: "Charitable foundations", icon: "foundations" },
    { label: "Trusts", icon: "trusts" },
    { label: "Local authorities", icon: "authorities" },
    { label: "Government programmes", icon: "government" },
    { label: "Corporate foundations", icon: "corporate" },
    { label: "Philanthropic organisations", icon: "philanthropy" },
    { label: "Community funders", icon: "community" },
    { label: "Social impact organisations", icon: "impact" },
  ] satisfies { label: string; icon: FunderIcon }[],
  /* The feature card: the brief's "Invest in Opportunity" as its kicker,
     the block's "Funding can support" list and its [Partner With Us]
     button. The close's own lead-in and six words run beneath the panel. */
  card: {
    kicker: "Invest in Opportunity",
    lead: "Your support can help people access:",
    outcomes: ["Skills.", "Employment.", "Enterprise.", "Digital Opportunity.", "Wellbeing.", "Independence."],
    /** The block's "Funding can support:", as the card's heading over its list. */
    title: "Funding can support",
    supports: [
      "Skills",
      "Employment",
      "Digital Inclusion",
      "Enterprise",
      "Wellbeing",
      "Mentoring",
      "Community Outreach",
      "Youth Development",
    ],
    cta: { label: "Partner With Us", href: ctas.partner.href },
    image: photo.funders,
  },
} as const;

/* -------------------------------------------------------------------------
   CLOSING CALL TO ACTION
   The brief's PARTNER WITH ONEVOICE block. Its list of eight commitments is
   set as one sentence so the banner stays a few lines tall.
   ------------------------------------------------------------------------- */

export const partnersCta = {
  kicker: "Partner With OneVoice",
  titleLead: "Together We Can Create",
  titleAccent: "More Opportunities",
  description:
    "OneVoice welcomes strategic partners who share our commitment to skills development, employment, enterprise, digital inclusion, education, wellbeing, community development and social inclusion.",
  primaryCta: ctas.partner,
  secondaryCta: { label: "Sponsor a Programme", href: `${routes.getInvolved}#sponsor-a-programme` },
  image: photo.cta,
} as const;

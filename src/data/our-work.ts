/**
 * Copy and media for the Our Work page (`src/app/(site)/our-work/page.tsx`).
 *
 * Every line comes from the brief's V.2 "Our Work" block (its subtitle
 * "Programmes designed around people and potential", its opening sentence
 * and its seven areas, each with the brief's lead, list and closing line),
 * in the brief's order, which is also the order of the Our Work sub-menu.
 * The hero's card is the brief's line for Our Work in its website structure,
 * and the closing call is the "Join our network" way from its "Support our
 * Work" block. Each area's name is its kicker and its heading is the brief's
 * own subtitle or opening words for it. Two of the
 * brief's sentences are lightly corrected where its wording breaks (noted
 * beside each), and "OneVoice Global" takes `brand.name`.
 *
 * IMAGES. Every photograph on the page was generated for its slot
 * (28 October 2026) and saved under /images/our-work/ by the slot's file
 * name, cut to the slot's exact size; the originals and prompts are kept in
 * `_source/generated/`. They replace the brief's own photographs, which are
 * used on other pages, so no photograph here is used anywhere else on the
 * site. Alt text describes only what the frame shows: none of these people
 * is presented as a OneVoice participant or member of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, ctas, navigation, routes } from "@/data/site";

/** A photograph generated for its slot, saved under /images/our-work/ by the slot's file name. */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/our-work/${file}.jpg`,
  alt,
  position,
});

const photo = {
  hero: shot(
    "our-work-hero",
    "A staff member showing a small group of visitors round the centre, pausing at the doorway of a busy classroom",
  ),
  heroInset: shot(
    "our-work-hero-inset",
    "A young man in a work apron checking a shelf with a spirit level as an older trainer guides him",
  ),
  education: shot(
    "our-work-education",
    "Adult learners round a table of textbooks and notebooks, listening as a young woman in a hijab explains a point",
  ),
  wellbeing: shot(
    "our-work-wellbeing",
    "A mother and her teenage daughter painting together at an art table, a facilitator smiling beside them",
  ),
  inclusion: shot(
    "our-work-inclusion",
    "An older Sikh man in a navy turban speaking with his hands as a council officer and a woman in a hijab listen",
  ),
  youth: shot(
    "our-work-youth",
    "Young people and a youth worker around a table of maps and photographs, a girl in a teal hijab leading the discussion",
  ),
  partnerships: shot(
    "our-work-partnerships",
    "A woman in a navy hijab showing two visitors round the centre as they walk and talk along a bright corridor",
  ),
  international: shot(
    "our-work-international",
    "A small team at a meeting table waving to partners on a video call shown on a large wall screen",
  ),
  cta: shot(
    "our-work-cta",
    "Residents, business people and charity staff talking in small groups over cups of tea in a bright hall",
  ),
} satisfies Record<string, HomeImage>;

/** Each area's anchor, as the Our Work sub-menu builds it from the area's name. */
const areas = navigation.find((item) => item.label === "Our Work")?.children ?? [];
const idOf = (label: string) => areas.find((link) => link.label === label)?.href.split("#")[1] ?? "";

/* -------------------------------------------------------------------------
   HERO
   The block's subtitle as the headline and its opening sentence beneath.
   ------------------------------------------------------------------------- */

export const ourWorkHero = {
  kicker: "Our Work",
  title: ["Programmes Designed", "Around People", "and Potential."],
  description: `${brand.name} aims to develop and support programmes in the following areas, informed by community consultation, available resources and partnerships.`,
  primaryCta: { label: "Explore Programmes", href: routes.programmes },
  secondaryCta: ctas.partner,
  /** The brief's line for Our Work in its website structure. */
  card: "Education, skills, livelihoods, wellbeing, inclusion and community development.",
  images: { main: photo.hero, inset: photo.heroInset },
} as const;

/**
 * The strip under the hero. The sub-menu's seven names are too long to sit
 * in one row, so the strip shortens each to its own leading words; the
 * links are the sub-menu's anchors.
 */
export const ourWorkSections = {
  label: "Our Work",
  links: [
    { label: "Education & Skills", href: areas[0]?.href ?? routes.ourWork },
    { label: "Livelihoods", href: areas[1]?.href ?? routes.ourWork },
    { label: "Wellbeing & Family", href: areas[2]?.href ?? routes.ourWork },
    { label: "Inclusion & Advocacy", href: areas[3]?.href ?? routes.ourWork },
    { label: "Youth, Women & Family", href: areas[4]?.href ?? routes.ourWork },
    { label: "Partnerships & Diaspora", href: areas[5]?.href ?? routes.ourWork },
    { label: "International", href: areas[6]?.href ?? routes.ourWork },
  ],
};

/* -------------------------------------------------------------------------
   1. EDUCATION, SKILLS AND DIGITAL INCLUSION
   ------------------------------------------------------------------------- */

export const ourWorkEducation = {
  id: idOf("Education, Skills and Digital Inclusion"),
  number: "01",
  kicker: "Education, Skills and Digital Inclusion",
  /** The area's own subtitle in the brief. */
  titleLead: "Learning, Employability",
  titleAccent: "and Economic Participation",
  /* Corrected where the brief's sentence breaks ("access learning, skill
     develop, knowledge with capabilities and confidence needed to improve
     their employment prospects participate confidently..."). */
  lead: "We aim to help people access learning and develop the skills, knowledge, capabilities and confidence needed to improve their employment prospects, participate confidently and enjoy quality of life in modern society.",
  listLabel: "Our proposed activities include:",
  items: [
    // The brief's "essential technology skills computer skills", with its missing comma.
    "Digital literacy, essential technology skills, computer skills and online safety.",
    "English-language practice and communication skills delivered directly or through partners.",
    "CV preparation, interview skills and job-search guidance.",
    "Career awareness, vocational training and links to accredited training providers.",
    "Enterprise awareness, entrepreneurship and small-business development.",
    "Financial literacy, digital access and everyday life skills.",
    "Mentoring, lifelong learning and progression into further education.",
    "Employer engagement, work experience opportunities and recruitment partnerships.",
  ],
  closing:
    "Our ambition is to help people overcome barriers to learning and become more confident, capable and independent.",
  image: photo.education,
} as const;

/* -------------------------------------------------------------------------
   2. LIVELIHOODS, EMPLOYMENT AND ENTREPRENEURSHIP
   ------------------------------------------------------------------------- */

export type LivelihoodIcon = "employment" | "workshops" | "mentoring" | "finance" | "connections";

export const ourWorkLivelihoods = {
  id: idOf("Livelihoods, Employment and Entrepreneurship"),
  number: "02",
  kicker: "Livelihoods, Employment and Entrepreneurship",
  /** The area's opening sentence, as its heading. */
  titleLead: "Economic Opportunity Can Transform",
  titleAccent: "Individuals, Families and Communities.",
  lead: "We aim to connect people with pathways towards employment, self-employment and sustainable livelihoods through:",
  items: [
    { text: "Employment information and job-readiness programmes.", icon: "employment" },
    { text: "Entrepreneurship awareness and business skills workshops.", icon: "workshops" },
    { text: "Mentoring from business and professional networks.", icon: "mentoring" },
    { text: "Financial capability and money-management education.", icon: "finance" },
    {
      text: "Connections with employers, training providers and enterprise-support organisations.",
      icon: "connections",
    },
  ] satisfies { text: string; icon: LivelihoodIcon }[],
  closing:
    "We will seek partnerships with businesses and relevant institutions to create practical routes into employment and enterprise.",
} as const;

/* -------------------------------------------------------------------------
   3. MENTAL WELLBEING AND FAMILY SUPPORT
   ------------------------------------------------------------------------- */

export type WellbeingIcon = "awareness" | "stigma" | "peer" | "signposting" | "referral";

export const ourWorkWellbeing = {
  id: idOf("Mental Wellbeing and Family Support"),
  number: "03",
  kicker: "Mental Wellbeing and Family Support",
  /* The area's opening sentence ("We recognise the importance of mental
     wellbeing, social connection and access to appropriate support.") in
     its own words, as the heading. */
  titleLead: "Mental Wellbeing, Social Connection",
  titleAccent: "and Access to Appropriate Support",
  listLabel: "Our proposed work may include:",
  items: [
    { text: "Community wellbeing awareness and educational workshops.", icon: "awareness" },
    { text: "Reducing stigma around mental health.", icon: "stigma" },
    { text: "Peer support and community connection activities.", icon: "peer" },
    { text: "Signposting to qualified health professionals and specialist services.", icon: "signposting" },
    {
      text: "Information and referral pathways for people experiencing family difficulties, domestic abuse or social isolation.",
      icon: "referral",
    },
  ] satisfies { text: string; icon: WellbeingIcon }[],
  note: "Any counselling or specialist support will be provided only through appropriately qualified professionals or suitable partner organisations, with safeguarding and confidentiality arrangements in place.",
  image: photo.wellbeing,
} as const;

/* -------------------------------------------------------------------------
   4. COMMUNITY INCLUSION AND ADVOCACY
   ------------------------------------------------------------------------- */

export type InclusionIcon = "navigate" | "consult" | "dialogue" | "participation" | "awareness" | "referrals";

export const ourWorkInclusion = {
  id: idOf("Community Inclusion and Advocacy"),
  number: "04",
  kicker: "Community Inclusion and Advocacy",
  /** The area's opening sentence, as its heading. */
  titleLead: "Everyone should have the opportunity to understand their rights,",
  titleAccent: "access appropriate services and participate in the decisions that affect their community.",
  listLabel: "We aim to:",
  items: [
    { text: "Help communities navigate relevant public and voluntary-sector services.", icon: "navigate" },
    { text: "Organise community consultations and listening sessions.", icon: "consult" },
    { text: "Strengthen communication between residents and institutions.", icon: "dialogue" },
    { text: "Encourage civic participation, volunteering and community leadership.", icon: "participation" },
    { text: "Raise awareness of issues affecting underserved communities.", icon: "awareness" },
    { text: "Support appropriate referrals to specialist advice and support organisations.", icon: "referrals" },
  ] satisfies { text: string; icon: InclusionIcon }[],
  closing:
    "OneVoice will seek to ensure that community voices are heard constructively and that local needs inform the development of practical solutions.",
  image: photo.inclusion,
} as const;

/* -------------------------------------------------------------------------
   5. YOUTH, WOMEN AND FAMILY EMPOWERMENT
   ------------------------------------------------------------------------- */

export const ourWorkYouth = {
  id: idOf("Youth, Women and Family Empowerment"),
  number: "05",
  kicker: "Youth, Women and Family Empowerment",
  /* The area's opening sentence ("We want young people, women and families
     to have the confidence, skills and opportunities to shape their
     futures.") in its own words, as the heading; the kicker names who. */
  titleLead: "Confidence, Skills and Opportunities",
  titleAccent: "to Shape Their Futures",
  listLabel: "Our proposed activities include:",
  items: [
    "Youth mentoring and leadership development.",
    "Skills and confidence-building workshops.",
    "Women's participation in education, employment and enterprise.",
    "Intergenerational learning and family support initiatives.",
    "Opportunities for community volunteering and leadership.",
    "Programmes that encourage participation across genders and backgrounds.",
  ],
  closing:
    "We aim to create inclusive opportunities while recognising that different groups may experience distinct barriers and require tailored support.",
  image: photo.youth,
} as const;

/* -------------------------------------------------------------------------
   6. COMMUNITY PARTNERSHIPS AND DIASPORA ENGAGEMENT
   ------------------------------------------------------------------------- */

export type NetworkIcon = "community" | "business" | "public" | "education" | "philanthropy" | "diaspora";

export const ourWorkPartnerships = {
  id: idOf("Community Partnerships and Diaspora Engagement"),
  number: "06",
  kicker: "Community Partnerships and Diaspora Engagement",
  /** The area's opening sentence, as its heading. */
  titleLead: "Communities Become Stronger",
  titleAccent: "When Their Knowledge, Networks and Resources Are Connected",
  listLabel: "We aim to build a network linking:",
  items: [
    { text: "Community and voluntary-sector organisations.", icon: "community" },
    { text: "Businesses and corporate social responsibility teams.", icon: "business" },
    { text: "Local authorities and public institutions.", icon: "public" },
    { text: "Universities, colleges and training providers.", icon: "education" },
    { text: "Philanthropists, trusts and charitable foundations.", icon: "philanthropy" },
    { text: "Professional, cultural and diaspora networks.", icon: "diaspora" },
  ] satisfies { text: string; icon: NetworkIcon }[],
  closing:
    "Through these relationships, we hope to develop joint programmes, mobilise resources, share knowledge and create opportunities that individual organisations may struggle to deliver alone.",
  image: photo.partnerships,
} as const;

/* -------------------------------------------------------------------------
   7. INTERNATIONAL NETWORK
   ------------------------------------------------------------------------- */

export const ourWorkInternational = {
  id: idOf("International Network"),
  number: "07",
  kicker: "International Network",
  /** The area's own subtitle in the brief. */
  titleLead: "International Partnerships, Shared Learning",
  titleAccent: "and Global Collaboration",
  // The brief's sentence, with its capital "Extend" lowered.
  lead: "To extend the OneVoice mission beyond the UK by connecting community organisations, professionals, institutions and social-development partners internationally.",
  listLabel: "Key activities:",
  items: [
    "Establishing country chapters and local delivery partnerships as capacity permits.",
    "Building relationships with community organisations, educational institutions, charities and responsible businesses.",
    "International forums, conferences, webinars and knowledge-sharing programmes.",
    "Exchange of good practice in skills development, inclusion and community leadership.",
    "Mentoring and professional networks connecting people across countries.",
    "Collaborative projects addressing shared social and educational challenges.",
    "Partnerships supporting diaspora engagement and constructive links between communities and their countries of heritage.",
    "International volunteer, youth leadership and women's empowerment initiatives.",
  ],
  image: photo.international,
} as const;

/* -------------------------------------------------------------------------
   CLOSING CALL TO ACTION
   "Join our network", one of the ways the brief's V.2 "Support our Work"
   block offers, with its line.
   ------------------------------------------------------------------------- */

export const ourWorkCta = {
  kicker: brand.name,
  titleLead: "Join Our",
  titleAccent: "Network",
  description:
    "Connect with community organisations, professionals, businesses and supporters working towards shared goals.",
  primaryCta: ctas.partner,
  secondaryCta: { label: "Get Involved", href: routes.getInvolved },
  image: photo.cta,
} as const;

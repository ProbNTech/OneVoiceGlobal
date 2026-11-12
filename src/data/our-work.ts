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
 * IMAGES. Every photograph on the page was generated for its slot and cut to
 * the slot's exact size; they replace the brief's own photographs, which are
 * used on other pages. Most come from the second set (3 November 2026,
 * `_source/generated/tools/make_prompts_v2_pages.py`), with varied settings,
 * clothes and faces, saved under /images/our-work/ as `<slot>-v2.jpg`
 * (originals in `_source/generated/v2-pages/`); some keep their first-set
 * photograph (FIRST_SET below), so the page mixes both sets. The slots in
 * THIRD_SET show a third set (3 and 4 November 2026,
 * `_source/generated/tools/make_prompts_v3.py`, originals in
 * `_source/generated/v3/`), saved as `<slot>-v3.jpg`: they are cast towards
 * the client's mix of people across the site, counted by each photo's main
 * person (about 40% White British and European, 30% South Asian, 15% Black,
 * 10% Arab and 5% mixed or other), and each is set in its own relevant
 * place, because the earlier photos looked as if they were all taken in one
 * building. No photograph here is used anywhere else on the site. Alt text
 * describes only what the frame shows: none of these people is presented as
 * a OneVoice participant or member of staff.
 *
 * REFUGEE & ASYLUM SEEKER SUPPORT. The client added this service on
 * 11 November 2026 with a document of its own, and it has a page of its own
 * (src/data/refugee-support.ts). The page here introduces it as an eighth
 * area after the brief's seven, in that document's words, and its
 * photograph (generated with the service page's set, see
 * `_source/refugee-support-media-brief.md`) is saved without a suffix, as
 * `our-work-refugee-support.jpg`.
 */

import type { HomeImage } from "@/data/home";
import { refugeeAsylum, refugeeEducation, refugeeHero, refugeeSponsorship } from "@/data/refugee-support";
import { brand, ctas, navigation, routes } from "@/data/site";

/* Some of the page's first-set photographs stay among the new ones, at the user's request (3 November
   2026; those that shared one bright room moved to new places on 4 November). These slots show their
   first-set file; the rest show `<slot>-v2.jpg` or, in THIRD_SET, `<slot>-v3.jpg`. */
const FIRST_SET = new Set(["our-work-hero-inset", "our-work-international"]);

/* The client's mix of people across the site (3 November 2026): about 40% White British and European, 30%
   South Asian, 15% Black, 10% Arab and 5% mixed or other, counted by each photo's main person. These slots
   show a third-set photograph (`<slot>-v3.jpg`), cast towards that mix and set in its own relevant place. */
const THIRD_SET = new Set(["our-work-hero", "our-work-education", "our-work-youth", "our-work-cta"]);

/** A photograph generated for its slot, saved under /images/our-work/ (FIRST_SET and THIRD_SET say which file it shows). */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/our-work/${file}${FIRST_SET.has(file) ? "" : THIRD_SET.has(file) ? "-v3" : "-v2"}.jpg`,
  alt,
  position,
});

const photo = {
  hero: shot(
    "our-work-hero",
    "A staff member in a sage-green dress showing three visitors a workshop through a glass wall in a college corridor",
  ),
  heroInset: shot(
    "our-work-hero-inset",
    "A young man in a work apron checking a shelf with a spirit level as an older trainer guides him",
  ),
  education: shot(
    "our-work-education",
    "A young woman with box braids explaining a point to three fellow learners over textbooks in a library study room",
  ),
  wellbeing: shot(
    "our-work-wellbeing",
    "A mother and her teenage daughter painting together at an art table, a facilitator kneeling beside them",
  ),
  inclusion: shot(
    "our-work-inclusion",
    "An older man with a white beard speaking with his hands as a council officer and two residents listen",
  ),
  youth: shot(
    "our-work-youth",
    "A teenage boy in a coral sweatshirt leading a discussion over maps with two girls and a youth worker in an orange container youth club beside a skate park",
  ),
  partnerships: shot(
    "our-work-partnerships",
    "A woman in a burgundy hijab showing two visitors round the centre as they walk and talk along a bright corridor",
  ),
  international: shot(
    "our-work-international",
    "A small team at a meeting table waving to partners on a video call shown on a large wall screen",
  ),
  cta: shot(
    "our-work-cta",
    "Residents, business people and charity staff talking in small groups over cups of tea in a museum gallery with stone columns",
  ),
} satisfies Record<string, HomeImage>;

/** The new service's introduction on this page (its link in the sub-menu leads to its own page). */
const REFUGEE_ID = "refugee-and-asylum-seeker-support";

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
    // The new service's introduction below the seven areas.
    { label: "Refugee Support", href: `${routes.ourWork}#${REFUGEE_ID}` },
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
   8. REFUGEE & ASYLUM SEEKER SUPPORT
   The client's new service (11 November 2026), which has a page of its own:
   its name as the kicker, its subtitle as the heading, its second opening
   paragraph, and its three programmes, each with its subtitle, leading to
   its part of the page. The three priorities sit on the photograph.
   ------------------------------------------------------------------------- */

export const ourWorkRefugee = {
  id: REFUGEE_ID,
  number: "08",
  kicker: "Refugee & Asylum Seeker Support",
  titleLead: refugeeHero.subtitle[0],
  titleAccent: refugeeHero.subtitle[1],
  lead: refugeeHero.description,
  programmes: [refugeeAsylum, refugeeSponsorship, refugeeEducation].map((programme) => ({
    number: programme.number,
    name: programme.kicker,
    line: `${programme.titleLead} ${programme.titleAccent}`,
    href: `${routes.refugeeSupport}#${programme.id}`,
  })),
  priorities: refugeeHero.priorities.items,
  primaryCta: { label: "Explore Refugee Support", href: routes.refugeeSupport },
  secondaryCta: refugeeHero.secondaryCta,
  /** Generated with the service page's set, so it carries no -v2/-v3 suffix. */
  image: {
    src: "/images/our-work/our-work-refugee-support.jpg",
    alt: "A grandmother and her granddaughter going through a form with a man in a white shirt and lanyard at a marble town hall desk",
    position: "50% 50%",
  } satisfies HomeImage,
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

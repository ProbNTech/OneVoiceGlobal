/**
 * Copy and media for the About Us page (`src/app/(site)/about-us/page.tsx`).
 *
 * The page is the Foundation's own, so it is built from the brief's V.2
 * Foundation block (its "About us", Vision, Mission, Approach, Theory of
 * Change, Values and Governance), which replaces Draft01's Vision, Mission
 * and Purpose. The Skill Development Centre, the Foundation's delivery arm,
 * follows with the brief's "About OneVoice" and "What We Do" blocks, and the
 * page closes on the brief's Safeguarding, Confidentiality & Privacy and
 * Accessibility & Inclusion lines. Lines that name the Foundation take
 * `brand.name` or "OneVoice".
 *
 * The strip under the hero is the brief's About Us sub-menu, read from the
 * navigation. Our Team's names and roles were supplied by the client on
 * 30 October 2026 (the brief lists the heading only).
 * Policies holds the brief's Governance and Accountability block with
 * Confidentiality & Privacy.
 *
 * IMAGES. Every photograph on the page was generated for its slot
 * (28 October 2026) and saved under /images/about/ by the slot's file name,
 * cut to the slot's exact size; the originals and prompts are kept in
 * `_source/generated/`. No photograph here is used anywhere else on the
 * site. Alt text describes only what the frame shows: none of these people
 * is presented as a OneVoice participant or member of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, navigation, routes } from "@/data/site";

/** A photograph generated for its slot, saved under /images/about/ by the slot's file name. */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/about/${file}.jpg`,
  alt,
  position,
});

const photo = {
  heroNetwork: shot(
    "about-hero-network",
    "A woman in a navy hijab speaking at a meeting table while three other people listen",
  ),
  heroCommunity: shot(
    "about-hero-community",
    "A grandmother in a teal headscarf and her granddaughter planting herbs in a raised bed with a smiling volunteer",
  ),
  heroLearning: shot(
    "about-hero-learning",
    "A young man and an older woman laughing as they study together at a library table with notebooks and a dictionary",
  ),
  heroOutreach: shot(
    "about-hero-outreach",
    "Two volunteers in teal tabards handing a leaflet to an older man with a shopping bag outside a community centre",
  ),
  whoWeAre: shot(
    "about-who-we-are",
    "Residents of different ages along a long table in a library meeting room, listening as an older man speaks with his hands",
  ),
  mission: shot(
    "about-mission",
    "Young volunteers carrying boxes and arranging tables as they set up a community skills fair in a bright hall",
  ),
  approach: shot(
    "about-approach",
    "People from different organisations round a table of printed plans and laptops, two of them smiling as they agree a point",
  ),
  serviceEducation: shot(
    "about-service-education",
    "A tutor at a whiteboard explaining a point to adults at tables with notebooks, one learner raising her hand",
  ),
  serviceEmployment: shot(
    "about-service-employment",
    "A young woman smiling and pointing at a laptop as a careers adviser beside her looks on",
  ),
  serviceEnglish: shot(
    "about-service-english",
    "A young man reading aloud from a picture book as a tutor beside him smiles, flashcards on the table",
  ),
  serviceDigital: shot(
    "about-service-digital",
    "An older man laughing as a young volunteer shows him how to use his smartphone",
  ),
  serviceEnterprise: shot(
    "about-service-enterprise",
    "A woman arranging jars of homemade chutney on her market stall as a mentor takes notes",
  ),
  serviceGuidance: shot(
    "about-service-guidance",
    "An adviser pointing to a leaflet on a low table for a young mother holding her toddler",
  ),
  serviceWellbeing: shot(
    "about-service-wellbeing",
    "Older adults on chairs raising their arms in a gentle stretching class led by an instructor",
  ),
  serviceSafety: shot("about-service-safety", "Two women talking quietly over cups of tea in a calm, softly lit room"),
  serviceMentoring: shot(
    "about-service-mentoring",
    "A mentor looking through a young woman's design portfolio with her at a cafe table",
  ),
  serviceCommunity: shot(
    "about-service-community",
    "Neighbours of all ages planting a community garden together outside the centre on a sunny day",
  ),
  safeguarding: shot(
    "about-safeguarding",
    "Volunteers seated in a semicircle listening to a trainer at a safeguarding session",
  ),
  policies: shot(
    "about-policies",
    "Two people reviewing printed papers together at a desk, one pointing at a page while the other listens",
  ),
  accessibility: shot(
    "about-accessibility",
    "A sign language interpreter signing for a smiling man during a small group discussion",
  ),
  cta: shot(
    "about-cta",
    "People of all ages sharing food and laughing at long tables under string lights at an evening celebration",
  ),
} satisfies Record<string, HomeImage>;

/* -------------------------------------------------------------------------
   HERO
   The brief's tagline for the Foundation as the headline, one phrase to a
   line, and the belief its "About us" block states beneath.
   ------------------------------------------------------------------------- */

export const aboutHero = {
  kicker: "About Us",
  title: ["Stronger Communities.", "Shared Opportunities.", "One World."],
  description:
    "We believe that every person, regardless of background or circumstances, should have the opportunity to learn, develop their skills, improve their wellbeing, participate in society and fulfil their potential.",
  primaryCta: { label: "Explore Our Work", href: routes.ourWork },
  secondaryCta: { label: "Get Involved", href: routes.getInvolved },
  /** The card beside the mosaic: the brief's subtitle for the Foundation. */
  card: brand.initiative,
  /** Four frames, read left to right and top to bottom. */
  images: [photo.heroNetwork, photo.heroCommunity, photo.heroLearning, photo.heroOutreach],
} as const;

/** The strip under the hero: the brief's About Us sub-menu, in the page's order. */
const PAGE_SECTIONS = [
  "who-we-are",
  "vision-and-mission",
  "our-values",
  "our-approach",
  "our-team",
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
   The brief's V.2 "About us" block, and its "Who OneVoice Global will
   serve" list.
   ------------------------------------------------------------------------- */

export type ServeIcon = "diaspora" | "women" | "youth" | "digital" | "families" | "older" | "groups" | "volunteers";

export const aboutWhoWeAre = {
  id: "who-we-are",
  kicker: "Who We Are",
  /* The brief gives the block no title; this is the phrase its first
     sentence uses for the Foundation. */
  titleLead: "A Community-Led",
  titleAccent: "Social Impact Organisation",
  paragraphs: [
    `${brand.name} is being developed as a community-led social impact organisation committed to building stronger, more inclusive and resilient communities.`,
    "We aim to bring together communities, businesses, charities, public institutions, philanthropists and the wider diaspora to address social challenges through collaboration, practical programmes and sustainable solutions. Our initial focus is on Asian and other underserved communities across London, with the ambition to build partnerships and extend our impact over time.",
  ],
  /** The block's closing pair of sentences, set on the card over the photograph. */
  quote:
    "We do not simply want to respond to immediate needs. We want to help create the conditions in which individuals, families and communities can thrive.",
  image: photo.whoWeAre,
  serve: {
    label: "Who OneVoice Will Serve",
    lead: "OneVoice prioritises people who experience barriers to opportunity, participation or access to support, while remaining inclusive and welcoming.",
    groups: [
      {
        text: "Asian and diaspora communities, including people from diverse cultural and linguistic backgrounds.",
        icon: "diaspora",
      },
      {
        text: "Women seeking greater participation in education, employment, leadership and community life.",
        icon: "women",
      },
      { text: "Young people seeking skills, mentoring, education and career opportunities.", icon: "youth" },
      { text: "Adults facing digital exclusion, unemployment or limited access to learning.", icon: "digital" },
      { text: "Families and individuals who need help identifying suitable support services.", icon: "families" },
      { text: "Older people experiencing isolation or barriers to participation.", icon: "older" },
      { text: "Community groups seeking stronger organisational capacity and representation.", icon: "groups" },
      {
        text: "Volunteers, professionals and community leaders who want to contribute their knowledge and experience.",
        icon: "volunteers",
      },
    ] satisfies { text: string; icon: ServeIcon }[],
  },
} as const;

/* -------------------------------------------------------------------------
   VISION & MISSION
   The Foundation's Vision and Mission in V.2's wording.
   ------------------------------------------------------------------------- */

export const aboutVisionMission = {
  id: "vision-and-mission",
  kicker: "Vision & Mission",
  visionLabel: "Our Vision",
  /** The Vision, in phrases; its three hopes are the accent phrases. */
  vision: [
    { text: "A society in which " },
    { text: "every community has a voice,", accent: "lagoon" },
    { text: " " },
    { text: "every individual has the opportunity to fulfil their potential,", accent: "ocean" },
    { text: " and " },
    { text: "everyone can participate fully in social and economic life.", accent: "saffron" },
  ] satisfies { text: string; accent?: "lagoon" | "ocean" | "saffron" }[],
  missionLabel: "Our Mission",
  mission:
    "To connect communities with the skills, knowledge, support, partnerships and opportunities they need to improve their lives, strengthen their independence and contribute positively to society.",
  missionMore:
    "We aim to achieve this by developing practical community programmes, empowering individuals, supporting underserved groups and bringing together organisations that can deliver meaningful, measurable and lasting change.",
  image: photo.mission,
} as const;

/* -------------------------------------------------------------------------
   OUR VALUES
   The Foundation's six values (V.2).
   ------------------------------------------------------------------------- */

export type ValueIcon = "integrity" | "inclusion" | "empowerment" | "collaboration" | "innovation" | "accountability";

export const aboutValues = {
  id: "our-values",
  kicker: brand.name,
  /** The brief's heading for the block, split two-tone. */
  titleLead: "Our",
  titleAccent: "Values",
  items: [
    { name: "Integrity", line: "We aim to act honestly, responsibly and transparently.", icon: "integrity" },
    {
      name: "Inclusion",
      line: "We respect diversity and seek to ensure that opportunities are accessible to people from different backgrounds.",
      icon: "inclusion",
    },
    {
      name: "Empowerment",
      line: "We support people to develop their capabilities, confidence and independence.",
      icon: "empowerment",
    },
    {
      name: "Collaboration",
      line: "We believe complex social challenges are best addressed by working together.",
      icon: "collaboration",
    },
    {
      name: "Innovation",
      line: "We remain open to new ideas, practical solutions and continuous learning.",
      icon: "innovation",
    },
    {
      name: "Accountability",
      line: "We aim to use resources responsibly and evaluate the outcomes of our work.",
      icon: "accountability",
    },
  ] satisfies { name: string; line: string; icon: ValueIcon }[],
} as const;

/* -------------------------------------------------------------------------
   OUR APPROACH
   The Foundation's approach (V.2): its subtitle, its two paragraphs and its
   five principles.
   ------------------------------------------------------------------------- */

export type PrincipleIcon = "community" | "partnership" | "prevention" | "innovation" | "accountability";

export const aboutApproach = {
  id: "our-approach",
  kicker: "Our Approach",
  titleLead: "Collaboration That Creates",
  titleAccent: "Lasting Change",
  lead: "We believe lasting progress requires a collaborative approach that combines community knowledge, professional expertise, institutional support, responsible funding and innovative solutions.",
  principlesLabel: "Our approach is built around five principles:",
  principles: [
    {
      name: "Community-led solutions",
      line: "We listen to people, understand local needs and involve communities in shaping programmes that affect their lives.",
      icon: "community",
    },
    {
      name: "Partnership and collaboration",
      line: "We bring together public, private and voluntary-sector organisations to share expertise, resources and opportunities.",
      icon: "partnership",
    },
    {
      name: "Prevention and empowerment",
      line: "We seek to address barriers early, strengthen individual capabilities and help people build long-term independence.",
      icon: "prevention",
    },
    {
      name: "Innovation and learning",
      line: "We explore practical, inclusive and technology-enabled ways to improve access to opportunities and deliver effective programmes.",
      icon: "innovation",
    },
    {
      name: "Accountability and impact",
      line: "We aim to measure outcomes, learn from experience, use resources responsibly and communicate our progress transparently.",
      icon: "accountability",
    },
  ] satisfies { name: string; line: string; icon: PrincipleIcon }[],
  /** The dark card beside the principles: the block's opening paragraph. */
  card: {
    lines: [
      "The challenges facing communities are interconnected.",
      "Barriers to education, employment, mental wellbeing, social inclusion and access to services often reinforce one another.",
    ],
    cta: { label: "Explore Our Work", href: routes.ourWork },
    image: photo.approach,
  },
} as const;

/* -------------------------------------------------------------------------
   OUR THEORY OF CHANGE (V.2)
   ------------------------------------------------------------------------- */

export const aboutTheory = {
  id: "theory-of-change",
  kicker: "Our Theory of Change",
  titleLead: "From Community Needs",
  titleAccent: "to Measurable Progress",
  lead: "We believe lasting social change begins by understanding the barriers people face and working with them to develop effective solutions.",
  steps: [
    {
      name: "Listen and understand",
      line: "Engage communities, identify unmet needs and understand the barriers affecting participation and opportunity.",
    },
    {
      name: "Connect resources and expertise",
      line: "Bring together suitable delivery partners, professional expertise, funding and institutional support.",
    },
    {
      name: "Deliver practical programmes",
      line: "Develop accessible initiatives that respond to identified needs and strengthen individual and community capabilities.",
    },
    {
      name: "Measure what changes",
      line: "Assess participation, skills gained, referrals completed, opportunities accessed and other relevant outcomes.",
    },
    {
      name: "Learn, improve and expand",
      line: "Use evidence and feedback to refine programmes and, where appropriate, extend successful approaches through partnerships.",
    },
  ],
  closing:
    "Our long-term ambition is to contribute to more capable individuals, better-connected communities and a more inclusive society.",
} as const;

/* -------------------------------------------------------------------------
   OUR TEAM
   Names and roles supplied by the client on 30 October 2026; the brief
   gives this sub-menu entry no copy, so the section carries no claims
   beyond them. The portraits are each person's own photograph, cut to 4:5:
   Dr Rabia Ishrat's and Shahid Nadeem Sandhu's from the profiles the client
   linked, and Mahi Zaal's the Instagram photo the user chose (sent as a
   screenshot, cropped clear of the app's controls). Originals are in
   `_source/generated/team/`.
   ------------------------------------------------------------------------- */

/** A team member's own photograph, saved under /images/about/team/. */
const portrait = (file: string, alt: string): HomeImage => ({
  src: `/images/about/team/${file}.jpg`,
  alt,
  position: "50% 30%",
});

export const aboutTeam = {
  id: "our-team",
  kicker: "Our Team",
  /* The sub-menu's own label, split as a two-tone title. */
  titleLead: "Our",
  titleAccent: "Team",
  members: [
    {
      name: "Dr Rabia Ishrat",
      role: "Chief Executive Officer",
      image: portrait("team-rabia-ishrat", "Dr Rabia Ishrat, Chief Executive Officer"),
    },
    {
      name: "Shahid Nadeem Sandhu",
      role: "Vice President",
      image: portrait("team-shahid-nadeem-sandhu", "Shahid Nadeem Sandhu, Vice President"),
    },
    {
      name: "Mahi Zaal",
      role: "Director, Marketing & PR",
      image: portrait("team-mahi-zaal-dubai", "Mahi Zaal, Director, Marketing & PR"),
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   THE SKILL DEVELOPMENT CENTRE
   The brief's "About OneVoice" block for the Centre (its belief and the
   barriers it names), the Centre's opening line, its approach in five words
   and its "What We Do" block.
   ------------------------------------------------------------------------- */

export const aboutCentre = {
  id: "skill-development-centre",
  kicker: brand.centre,
  /** The Centre's "simple belief". */
  titleLead: "Everyone Has",
  titleAccent: "Potential.",
  lead: "OneVoice Skill Development Centre is a London-based community organisation supporting people from ethnic minority, disadvantaged and underserved communities to develop skills, improve confidence, access employment, start and grow businesses, improve digital capability, strengthen wellbeing and participate fully in society.",
  /** The Centre's approach, the brief's subtitle for it. */
  motto: "Listen. Understand. Develop. Connect. Progress.",
  barriersLead: "That potential can be blocked by barriers such as:",
  barriers: [
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
  role: "Our role is to help people identify those barriers and find practical routes forward.",
} as const;

export const aboutWhatWeDo = {
  id: "what-we-do",
  /** The brief's heading for the block. */
  title: "What We Do",
  lead: "OneVoice Skill Development Centre provides an integrated programme of services.",
  /** The brief's ten services, in its order. */
  items: [
    {
      name: "Education & Skills Development",
      line: "Practical learning opportunities for personal, professional and digital development.",
      image: photo.serviceEducation,
    },
    {
      name: "Employment & Careers",
      line: "Helping people become job-ready, find employment and progress in their careers.",
      image: photo.serviceEmployment,
    },
    {
      name: "English & Communication",
      line: "Supporting people to develop confidence in English and workplace communication.",
      image: photo.serviceEnglish,
    },
    {
      name: "Digital Inclusion",
      line: "Building confidence with computers, technology and online services to develop the digital skills needed for everyday life, employment and business.",
      image: photo.serviceDigital,
    },
    {
      name: "Enterprise & Self-Employment",
      line: "Supporting people to explore business ideas, freelancing and entrepreneurship.",
      image: photo.serviceEnterprise,
    },
    {
      name: "Information, Advice & Guidance",
      line: "Helping people understand their options around learning, careers, employment and support.",
      image: photo.serviceGuidance,
    },
    {
      name: "Health & Wellbeing",
      line: "Promoting positive mental health, resilience and social connection.",
      image: photo.serviceWellbeing,
    },
    {
      name: "Domestic Abuse Support",
      line: "Providing safe, confidential and non-judgemental support and appropriate referrals.",
      image: photo.serviceSafety,
    },
    {
      name: "Mentoring",
      line: "Connecting people with mentors who can provide encouragement and practical guidance.",
      image: photo.serviceMentoring,
    },
    {
      name: "Community Development",
      line: "Building stronger, more connected and inclusive communities.",
      image: photo.serviceCommunity,
    },
  ] satisfies { name: string; line: string; image: HomeImage }[],
} as const;

/* -------------------------------------------------------------------------
   SAFEGUARDING, POLICIES & ACCESSIBILITY
   Three tabs, each the menu's own label, which the strip and the header's
   dropdown open by their anchors. The section's title is the brief's
   subtitle for its Governance and Accountability block.
   ------------------------------------------------------------------------- */

export type TrustBlock = { title: string; paragraphs: string[]; list?: string[]; closing?: string };

export const aboutTrust = {
  kicker: "Governance and Accountability",
  titleLead: "Responsible, Transparent",
  titleAccent: "and Community-Focused",
  lead: "Trust is essential to effective community work.",
  tabs: [
    {
      id: "safeguarding",
      label: "Safeguarding",
      image: photo.safeguarding,
      blocks: [
        {
          title: "Safeguarding & Keeping People Safe",
          paragraphs: [
            "Safeguarding is central to our work. OneVoice will maintain appropriate safeguarding policies, procedures, training and referral arrangements. Staff, volunteers, mentors and partners involved in delivery will be expected to understand their responsibilities.",
            "Where safeguarding concerns arise, appropriate action will be taken in accordance with relevant procedures and legal requirements.",
          ],
        },
      ],
    },
    {
      id: "policies",
      label: "Policies",
      image: photo.policies,
      blocks: [
        {
          title: "Governance and Accountability",
          paragraphs: [
            `${brand.name} aims to establish appropriate governance, financial oversight, safeguarding arrangements, data protection practices and clear responsibilities for its leadership and delivery partners.`,
            "We intend to listen to the communities we serve, work within applicable legal and regulatory requirements, manage resources responsibly and assess the effectiveness of our programmes.",
            "We will publish relevant organisational information and progress updates as our governance and programme delivery develop.",
          ],
        },
        {
          title: "Confidentiality & Privacy",
          paragraphs: [
            "We respect the privacy of people using our services. Personal information will be handled responsibly in accordance with applicable data protection requirements and our privacy policy.",
            "There may be circumstances where information must be shared to protect someone from serious harm or where required by law.",
          ],
        },
      ],
    },
    {
      id: "accessibility",
      label: "Accessibility",
      image: photo.accessibility,
      blocks: [
        {
          title: "Accessibility & Inclusion",
          paragraphs: ["We aim to make our services accessible to people with different:"],
          list: [
            "Languages",
            "Abilities",
            "Educational backgrounds",
            "Digital skills",
            "Cultural backgrounds",
            "Employment experiences",
            "Family circumstances",
          ],
          closing: "Reasonable adjustments should be considered wherever practical.",
        },
      ],
    },
  ] satisfies { id: string; label: string; image: HomeImage; blocks: TrustBlock[] }[],
} as const;

/* -------------------------------------------------------------------------
   CLOSING CALL TO ACTION
   The subtitle of the brief's V.2 "Our Work" block as the banner's title,
   with the block's opening sentence beneath (its "in the following areas"
   dropped, as the areas live on the Our Work page).
   ------------------------------------------------------------------------- */

export const aboutCta = {
  kicker: brand.name,
  titleLead: "Programmes Designed Around",
  titleAccent: "People and Potential",
  description: `${brand.name} aims to develop and support programmes informed by community consultation, available resources and partnerships.`,
  primaryCta: { label: "Explore Programmes", href: routes.programmes },
  secondaryCta: { label: "Get Involved", href: routes.getInvolved },
  image: photo.cta,
} as const;

/**
 * Copy and media for the Seminars & Workshops page
 * (`src/app/(site)/seminars-and-workshops/page.tsx`).
 *
 * Every line comes from the brief's V.2 SEMINARS & WORKSHOPS block (24
 * October 2026), which Draft01 does not have. The block runs in five parts:
 * an overview ("Seminars & Workshop", then Who Can Benefit?, Our Approach,
 * delivery, responsible support, safeguarding, impact, Work With Us and Get
 * Involved), Priority Workshops for 2027, and one programme each for Mental
 * Health & Wellbeing, Rights & Empowerment and Healthy Relationships. The
 * last three repeat the same frame (who can benefit, delivery, commitments,
 * impact, partners), so the page gives each programme its own heading,
 * introduction and six programme areas, and gathers what they share into
 * single sections: who can benefit (one tab per programme), delivery and
 * safeguarding, and Work With Us. The longer topic lists are kept for the
 * three priority workshops, which open one at a time.
 *
 * Left out: the "Measuring Our Impact" indicators, which belong with the
 * Impact page, and the programmes' "Culturally Sensitive Approach" lists,
 * whose substance the Our Approach principles already carry.
 *
 * The brief's design notes for these pages (V.2, "Website design
 * standards") ask for calls to act labelled "Register Your Interest",
 * "Become a Partner" and "Volunteer", for planned activities to be labelled
 * as planned until confirmed, and for a calm, teal register for Mental
 * Health & Wellbeing, navy and teal for Rights & Empowerment, and warm
 * neutrals for Healthy Relationships. The page follows the other inner
 * pages rather than those notes' card grids (the user's direction, 29
 * October 2026): plain items, running text and photographs.
 *
 * IMAGES. Each photograph was generated for its slot (prompts in
 * `_source/generated/tools/make_prompts_seminars.py`) and cut to the slot's
 * exact size; the originals are kept in `_source/generated/`. No photograph
 * here is used anywhere else on the site. Alt text describes only what the
 * frame shows: none of these people is presented as a OneVoice participant
 * or member of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, enquiryHref, navigation, routes } from "@/data/site";

/** A photograph generated for its slot, saved under /images/seminars/ by the slot's file name. */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/seminars/${file}.jpg`,
  alt,
  position,
});

const photo = {
  heroMain: shot(
    "seminars-hero",
    "Adults of different ages seated in a bright, plant-filled room, an older man in a navy turban raising his hand to ask a question",
  ),
  heroCircle: shot("seminars-hero-circle", "An older man and a young woman smiling at each other mid-conversation"),
  approach: shot(
    "seminars-approach",
    "A woman with a notebook listening as an older man in a flat cap speaks at a round table, others taking notes",
  ),
  workshopFinance: shot(
    "seminars-workshop-finance",
    "A woman in a teal top laughing with a group of adults as they share coins into glass jars at a table",
  ),
  workshopFamilyLaw: shot(
    "seminars-workshop-family-law",
    "A woman in a navy blazer talking a small group through a printed booklet at a table",
  ),
  workshopSafety: shot(
    "seminars-workshop-safety",
    "A woman speaking gently to a small group of adults seated round a low table, among them a woman in a hijab",
  ),
  mhLanguages: shot(
    "seminars-mh-languages",
    "A woman in a teal scarf talking with open hands to three older women at a table",
  ),
  mhExpectations: shot(
    "seminars-mh-expectations",
    "A young woman in a navy hijab speaking thoughtfully as the woman beside her listens",
  ),
  mhCreative: shot("seminars-mh-creative", "Two women smiling as they write and arrange cut-paper collages at a table"),
  mhStress: shot(
    "seminars-mh-stress",
    "A young man with his eyes closed and a hand on his chest doing a breathing exercise, a woman doing the same behind him",
  ),
  mhFamily: shot("seminars-mh-family", "A mother and her teenage son talking at a table, listening to one another"),
  mhSupport: shot(
    "seminars-mh-support",
    "A woman listening closely as a man in a scarf talks beside her on a park bench in autumn",
  ),
  rights: shot(
    "seminars-rights",
    "A young woman in a teal scarf explaining a point to an older woman over notes at a table",
  ),
  relationships: shot(
    "seminars-relationships",
    "A woman laughing as the man beside her listens on a bench in a quiet garden",
  ),
  workWithUs: shot("seminars-work-with-us", "A woman and a man planning together over notes at a table, both smiling"),
  cta: shot(
    "seminars-cta",
    "Small groups of adults talking and writing on clipboards on benches and folding chairs in a garden",
  ),
} satisfies Record<string, HomeImage>;

/** The anchors the menu builds for this page's sections. */
const anchors = navigation.find((item) => item.label === "Seminars & Workshops")?.children ?? [];
const anchorFor = (label: string) => anchors.find((link) => link.label === label)?.href ?? routes.seminars;
const idOf = (label: string) => anchorFor(label).split("#")[1] ?? "";

/** The brief's call-to-action labels for these pages. */
const register = { label: "Register Your Interest", href: enquiryHref("interest") };
const partner = { label: "Become a Programme Partner", href: enquiryHref("partner") };

/* -------------------------------------------------------------------------
   HERO
   The overview's subtitle as the headline, its opening sentence beneath
   and the two calls to act Rights & Empowerment opens with. The overview's
   line on languages sits on the card over the photographs.
   ------------------------------------------------------------------------- */

export const seminarsHero = {
  kicker: "Seminars & Workshops",
  /** One phrase to a line; the second and fourth are set as the accent. */
  title: ["Knowledge.", "Wellbeing.", "Empowerment.", "Stronger Relationships."],
  description: `${brand.name} aims to deliver a programme of inclusive seminars and practical workshops to support mental wellbeing, personal development, family relationships and greater awareness of social and legal rights.`,
  primaryCta: register,
  secondaryCta: partner,
  languages:
    "Sessions may be delivered in English and relevant community languages, subject to facilitator availability and local needs.",
  images: { main: photo.heroMain, circle: photo.heroCircle },
} as const;

/** The strip under the hero: the page's four sections, read from the navigation. */
export const seminarsSections = { label: "Seminars & Workshops", links: anchors };

/* -------------------------------------------------------------------------
   OUR APPROACH
   The overview's Our Approach block (its subtitle, belief and five
   principles), with the first sentence of its Our Commitment block on the
   card over the photograph.
   ------------------------------------------------------------------------- */

export type PrincipleIcon = "knowledge" | "independence" | "safety" | "partnerships" | "trust";

export const seminarsApproach = {
  id: "our-approach",
  kicker: "Our Approach",
  titleLead: "Accessible Information.",
  titleAccent: "Informed Choices. Practical Support.",
  belief: "We believe empowerment begins when people can access trustworthy information and understand their options.",
  /** Each principle's name in two halves, the second set as the accent. */
  principles: [
    {
      lead: "Knowledge",
      accent: "Without Barriers",
      line: "We aim to make information accessible through clear language, community outreach and culturally sensitive delivery.",
      icon: "knowledge",
    },
    {
      lead: "Independence",
      accent: "Without Judgement",
      line: "We respect individual circumstances and choices, helping participants explore their options without pressure or discrimination.",
      icon: "independence",
    },
    {
      lead: "Safety",
      accent: "With Dignity",
      line: "We aim to create respectful environments where participants can learn about available support without being expected to share private experiences.",
      icon: "safety",
    },
    {
      lead: "Practical Support",
      accent: "Through Partnerships",
      line: "We will seek to collaborate with qualified legal professionals, financial education providers, domestic abuse specialists, public services and community organisations.",
      icon: "partnerships",
    },
    {
      lead: "Information",
      accent: "You Can Trust",
      line: "We aim to signpost participants to recognised, relevant sources and services, while making clear when specialist professional advice is needed.",
      icon: "trust",
    },
  ] satisfies { lead: string; accent: string; line: string; icon: PrincipleIcon }[],
  commitment: {
    label: "Our Commitment",
    text: `${brand.name} aims to create welcoming and respectful learning environments where people can ask questions, share experiences if they wish and access reliable information without fear of stigma or judgement.`,
  },
  image: photo.approach,
} as const;

/* -------------------------------------------------------------------------
   PRIORITY WORKSHOPS FOR 2027
   The brief's three priority workshops, word for word. The design notes
   ask for planned workshops to show their dates, registration and delivery
   status, labelled as planned until confirmed; the overview says the 2027
   dates, venues and registration details "will be announced", which each
   workshop shows as "To be announced".
   ------------------------------------------------------------------------- */

export type Workshop = {
  title: string;
  tagline: string;
  intro: string[];
  topics: string[];
  who: string;
  objective: string;
  /** The brief's closing note, where the workshop has one. */
  note?: string;
  image: HomeImage;
};

export const seminarsPriority = {
  id: idOf("Priority Workshops for 2027"),
  kicker: "The 2027 Programme",
  titleLead: "Priority Workshops",
  titleAccent: "for 2027",
  lead: "We aim to prioritise three practical workshops addressing important issues affecting individuals, families and communities.",
  status: "Planned",
  announcement:
    "The 2027 programme, dates, venues and registration details will be announced as arrangements are confirmed.",
  labels: {
    date: "Date",
    venue: "Venue",
    toBeAnnounced: "To be announced",
    topics: "Key topics include:",
    who: "Who may benefit?",
    objective: "Our objective",
  },
  register,
  workshops: [
    {
      title: "Financial Literacy & Independence",
      tagline: "Understand money. Build confidence. Strengthen your financial future.",
      intro: [
        "Financial knowledge is an important foundation for personal independence and long-term security. This workshop aims to help participants develop practical money-management skills and understand the financial decisions they may face in everyday life.",
      ],
      topics: [
        "Understanding income, expenditure and household budgeting",
        "Managing bills, saving regularly and preparing for unexpected costs",
        "Understanding bank accounts, credit, borrowing and common financial risks",
        "Recognising financial scams, fraud and misleading financial offers",
        "Understanding financial independence within relationships and families",
        "Exploring employment, skills development and income-generation opportunities",
        "Finding reliable information and appropriate financial guidance",
      ],
      who: "Young adults, parents, women and men seeking greater financial confidence, individuals returning to employment, and community members who want to improve their financial knowledge.",
      objective:
        "To equip participants with practical knowledge and confidence to make informed financial decisions and work towards greater financial independence.",
      image: photo.workshopFinance,
    },
    {
      title: "Navigating Family Law in the UK",
      tagline: "Understand your rights. Know where to seek help. Make informed decisions.",
      intro: [
        "Family-related legal matters can be difficult to navigate, particularly when people are unfamiliar with UK legal processes, available support or the services they can approach.",
        "This educational workshop aims to improve awareness of family law in England and Wales and help participants identify reliable sources of information and appropriate professional assistance.",
      ],
      topics: [
        "Understanding the legal framework for marriage and civil partnerships",
        "An introduction to separation, divorce and related legal processes",
        "Child arrangements, parental responsibilities and the welfare of children",
        "Understanding financial matters arising from separation or divorce",
        "Recognising the importance of legal documentation and reliable advice",
        "Understanding where to seek help regarding domestic abuse and protective measures",
        "Identifying legal aid information, advice services and relevant support organisations",
      ],
      who: "Individuals, couples, parents, families and community members who want to understand family-related legal issues and available support.",
      objective:
        "To improve legal awareness, reduce confusion and help participants identify appropriate next steps with qualified legal professionals or recognised advice services.",
      note: "The workshop will provide general educational information, not individual legal advice. Content will be tailored to the relevant UK jurisdiction, as family law differs across England and Wales, Scotland and Northern Ireland.",
      image: photo.workshopFamilyLaw,
    },
    {
      title: "Pathways to Safety",
      tagline: "Recognise the risks. Understand your options. Access support without fear or judgement.",
      intro: [
        "Everyone deserves to live with safety, dignity, respect and freedom from abuse. Some people may face domestic abuse, coercive control, financial abuse, threats, forced marriage or honour-based abuse, but may not know how to recognise these situations or where to seek confidential help.",
        "This workshop aims to raise awareness of abuse, explain available support options and help participants understand how to seek assistance safely.",
      ],
      topics: [
        "Recognising domestic abuse, coercive control and emotional or financial abuse",
        "Understanding honour-based abuse, forced marriage and related risks",
        "Identifying warning signs and understanding the importance of personal safety",
        "Exploring confidential support options and specialist services",
        "Understanding emergency assistance and relevant legal protections",
        "Considering safe ways to seek help, including where digital privacy may be a concern",
        "Supporting friends, relatives and community members without judgement",
        "Understanding how to access appropriate housing, safeguarding and other support services",
      ],
      who: "Individuals experiencing abuse or control, people concerned about someone they know, community members, families and professionals seeking greater awareness of available support.",
      objective:
        "To improve awareness, reduce stigma and help people identify appropriate pathways to safety, confidential support and specialist assistance.",
      note: "Participation will be voluntary. No one will be required to disclose personal experiences. The workshop will not replace specialist domestic abuse services, individual safety planning or emergency assistance.",
      image: photo.workshopSafety,
    },
  ] satisfies Workshop[],
} as const;

/* -------------------------------------------------------------------------
   MENTAL HEALTH & WELLBEING
   The programme's headline, subtitle and aim, the line that closes its
   "Why Mental Health & Wellbeing Matters", its six programme areas (each
   area's title and the brief's line beneath it), its note on the limits of
   its role (from area 6) and the opening of its "Important information".
   ------------------------------------------------------------------------- */

export const seminarsMentalHealth = {
  id: idOf("Mental Health & Wellbeing"),
  kicker: "Mental Health & Wellbeing",
  /** The programme's headline, one phrase to a line; the last is the accent. */
  title: ["Understanding Minds.", "Breaking Stigma.", "Building Resilience."],
  subtitle: "Making Mental Wellbeing Accessible to Every Community",
  lead: "Our Mental Health & Wellbeing programme aims to create culturally sensitive, inclusive and welcoming spaces where individuals and families can learn, share knowledge and explore practical ways to strengthen their emotional resilience.",
  quote:
    "Mental health challenges are not a personal failure. Seeking support is a positive step towards understanding one's needs and improving wellbeing.",
  areasLabel: "Our Programme Areas",
  areas: [
    {
      title: "Psychoeducation in Community Languages",
      line: "Understanding mental health through accessible information.",
      image: photo.mhLanguages,
    },
    {
      title: "Deconstructing “Good Daughter/Wife” Guilt",
      line: "Balancing cultural expectations, family responsibilities and personal wellbeing.",
      image: photo.mhExpectations,
    },
    {
      title: "Creative Confidence & Healing",
      line: "Using creativity to encourage reflection, self-expression and personal growth.",
      image: photo.mhCreative,
    },
    {
      title: "Stress Management & Emotional Resilience",
      line: "Practical tools for navigating everyday challenges.",
      image: photo.mhStress,
    },
    {
      title: "Family Wellbeing & Emotional Communication",
      line: "Creating healthier conversations at home.",
      image: photo.mhFamily,
    },
    {
      title: "Recognising When to Seek Professional Support",
      line: "Knowing where to turn when additional help is needed.",
      image: photo.mhSupport,
    },
  ] satisfies { title: string; line: string; image: HomeImage }[],
  role: "Our role will be to provide general information and signposting, not to diagnose conditions, prescribe treatment or replace qualified professionals.",
  important: {
    label: "Important information",
    text: `${brand.name}'s community workshops are intended for education, awareness and general wellbeing. They do not replace individual medical assessment, diagnosis, psychotherapy or other specialist care.`,
  },
} as const;

/* -------------------------------------------------------------------------
   RIGHTS & EMPOWERMENT
   The programme's headline and its second line, its opening sentence, its
   commitment, "Why Rights & Empowerment Matters" with the barriers it
   names, its six programme areas (title and line) and its two additional
   topics, beside a photograph with the commitment on a card.
   ------------------------------------------------------------------------- */

export type RightsIcon = "rights" | "family" | "finance" | "safety" | "work" | "services";
export type TopicIcon = "confidence" | "digital";

export const seminarsRights = {
  id: idOf("Rights & Empowerment"),
  kicker: "Rights & Empowerment",
  title: ["Know Your Rights.", "Build Your Independence.", "Shape Your Future."],
  tagline: "Live with Safety and Dignity.",
  lead: `${brand.name} aims to help individuals and families navigate everyday challenges by improving awareness of UK rights, promoting financial capability, supporting personal independence and connecting people with relevant information and services.`,
  /** On the card over the photograph. */
  commitment:
    "Our commitment is simple: knowledge creates confidence, financial independence creates opportunities, and access to appropriate support can help people make informed choices about their lives.",
  areas: [
    {
      title: "Understanding Your Rights in the UK",
      line: "Knowledge is the foundation of informed decision-making.",
      icon: "rights",
    },
    {
      title: "Navigating Family Law in the UK",
      line: "Helping individuals understand their options during important family decisions.",
      icon: "family",
    },
    {
      title: "Financial Literacy & Independence",
      line: "Building confidence to manage money and make informed financial decisions.",
      icon: "finance",
    },
    {
      title: "Pathways to Safety: Domestic & Honour-Based Abuse",
      line: "Recognising abuse. Understanding options. Finding appropriate support.",
      icon: "safety",
    },
    {
      title: "Employment Rights & Workplace Empowerment",
      line: "Helping people participate confidently in working life.",
      icon: "work",
    },
    {
      title: "Accessing Public Services & Community Support",
      line: "Helping communities find their way through complex systems.",
      icon: "services",
    },
  ] satisfies { title: string; line: string; icon: RightsIcon }[],
  why: {
    label: "Why Rights & Empowerment Matters",
    text: "People are better equipped to make decisions when they understand their options, responsibilities and available support.",
    barriersLabel: "Our programme aims to address common barriers, including:",
    barriers: [
      "Limited awareness of relevant rights and responsibilities",
      "Difficulty understanding legal and official information",
      "Language and communication barriers",
      "Financial dependency or limited financial knowledge",
      "Uncertainty about where to obtain reliable advice",
      "Fear of seeking help because of stigma or family pressure",
      "Difficulty accessing appropriate specialist services",
    ],
  },
  topics: {
    label: "Additional Rights & Empowerment Topics",
    items: [
      {
        title: "Personal Confidence & Decision-Making",
        line: "Encouraging informed choices, self-advocacy, healthy boundaries and confidence in dealing with everyday challenges.",
        icon: "confidence",
      },
      {
        title: "Digital Safety & Financial Protection",
        line: "Understanding online scams, identity theft, privacy risks and practical steps to protect personal and financial information.",
        icon: "digital",
      },
    ] satisfies { title: string; line: string; icon: TopicIcon }[],
  },
  image: photo.rights,
} as const;

/* -------------------------------------------------------------------------
   HEALTHY RELATIONSHIPS
   The programme's headline, its subtitle and belief, the titles of its six
   programme areas (set as running text; their one-line slogans are left
   out), the line that closes "Why Healthy Relationships Matter", and its
   "Important information".
   ------------------------------------------------------------------------- */

export const seminarsRelationships = {
  id: idOf("Healthy Relationships"),
  kicker: "Healthy Relationships",
  title: ["Building Understanding.", "Strengthening Families.", "Creating Healthier Connections."],
  /** On the card over the photograph. */
  subtitle: "Strong Relationships Begin with Respect",
  lead: `At ${brand.name}, we believe healthy relationships are built on mutual respect, trust, honest communication, emotional safety and the freedom to express individual needs.`,
  areasLabel: "Our Programme Areas",
  areas: [
    "Navigating Intergenerational Conflict",
    "Healthy Boundaries & Marital Communication",
    "The “10 Signs” of Healthy Relationships",
    "Understanding Conflict & Emotional Regulation",
    "Marriage, Partnership & Shared Responsibilities",
    "Parenting, Family Wellbeing & Positive Communication",
  ],
  respect:
    "We recognise that every relationship is different. Our approach encourages respect for cultural identity and family connections while affirming that everyone's dignity, safety and autonomy matter.",
  important: {
    label: "Important information",
    text: "These activities are intended for education and general wellbeing. They do not replace individual counselling, psychotherapy, legal advice or specialist domestic abuse services. Specialist support will be signposted where appropriate.",
  },
  image: photo.relationships,
} as const;

/* -------------------------------------------------------------------------
   THE 10 SIGNS OF HEALTHY RELATIONSHIPS
   Healthy Relationships' third programme area in full: its subtitle as the
   heading, its opening lines, the ten signs, its note on warning signs, and
   the line from its safety commitment on when specialist support comes
   first.
   ------------------------------------------------------------------------- */

export const seminarsSigns = {
  id: "ten-signs",
  kicker: "The “10 Signs” of Healthy Relationships",
  titleLead: "Recognising What Healthy",
  titleAccent: "Relationships Look Like",
  lead: "Healthy relationships are not defined by the absence of disagreement. They are defined by how people treat one another, how differences are managed and whether each person feels respected and safe.",
  signs: [
    { name: "Mutual Respect", line: "Each person values the other's dignity, opinions, identity and individuality." },
    {
      name: "Trust",
      line: "Partners can rely on one another without constant suspicion, surveillance or unreasonable demands for proof.",
    },
    {
      name: "Honest Communication",
      line: "People can discuss feelings, concerns and expectations openly and respectfully.",
    },
    {
      name: "Emotional Safety",
      line: "Individuals can express themselves without fear of humiliation, intimidation or retaliation.",
    },
    {
      name: "Equality and Shared Decision-Making",
      line: "Both people have a meaningful voice in decisions affecting their relationship and family life.",
    },
    {
      name: "Healthy Boundaries",
      line: "Each person can maintain appropriate privacy, friendships, interests and personal space.",
    },
    {
      name: "Independence and Personal Growth",
      line: "Partners support one another's education, work, interests, aspirations and development.",
    },
    {
      name: "Constructive Conflict Resolution",
      line: "Disagreements are addressed without threats, violence, humiliation or coercive behaviour.",
    },
    {
      name: "Accountability and Responsibility",
      line: "People acknowledge mistakes, take responsibility for their actions and make genuine efforts to address harmful behaviour.",
    },
    {
      name: "Care, Support and Freedom From Control",
      line: "People show consideration for one another while respecting each other's freedom to make personal decisions.",
    },
  ],
  warning:
    "The workshop will also explore warning signs that a relationship may be unhealthy, including persistent disrespect, isolation from friends or family, intimidation, financial control and coercive behaviour.",
  safety:
    "Where domestic abuse, coercive control or intimidation is suspected or disclosed, safety and access to specialist support take priority.",
} as const;

/* -------------------------------------------------------------------------
   WHO CAN BENEFIT?
   The overview's Who Can Benefit? block (its lead, closing line and note)
   with the three programmes' own lists, one to a tab. The overview's list
   speaks to rights, money, family law and safety, so it is the Rights &
   Empowerment tab.
   ------------------------------------------------------------------------- */

export const seminarsWho = {
  id: "who-can-benefit",
  // From the lead: "adults and families from diverse backgrounds".
  kicker: "Adults and Families",
  titleLead: "Who Can",
  titleAccent: "Benefit?",
  lead: "Our programme is intended to support adults and families from diverse backgrounds, with particular attention to those who face barriers to accessing information and professional advice.",
  note: "Specific activities will be developed according to participant needs, facilitator expertise and appropriate safeguarding arrangements.",
  closing: "We welcome interest from individuals across different backgrounds, cultures and generations.",
  cta: register,
  tabs: [
    {
      name: "Mental Health & Wellbeing",
      items: [
        "Adults experiencing everyday stress or emotional pressure",
        "Parents and carers balancing family and personal responsibilities",
        "Women navigating social expectations and life transitions",
        "Men who may find it difficult to discuss emotional wellbeing",
        "Young adults managing education, employment and family expectations",
        "Older people experiencing loneliness or changes in circumstances",
        "Families seeking to improve communication and mutual understanding",
        "Community volunteers and leaders who want to improve their understanding of mental health",
      ],
    },
    {
      name: "Rights & Empowerment",
      items: [
        "Women seeking greater financial independence and confidence",
        "Men and women seeking to understand their legal and social rights",
        "Individuals navigating marriage, separation or family responsibilities",
        // The brief reads "...coercive control or their personal safety"; "concerned about" is added for the grammar.
        "Individuals affected by domestic abuse or coercive control, or concerned about their personal safety",
        "Employees and jobseekers seeking reliable workplace information",
        "Newcomers and community members unfamiliar with UK systems",
        "Parents, carers and community leaders supporting others",
        "Individuals seeking information in accessible language",
        "Young adults developing essential life skills",
        "Parents, couples and families navigating important life decisions",
        "People who need clearer information about their rights and available support",
        "Individuals experiencing financial difficulties or seeking greater financial confidence",
        "Community organisations seeking accessible educational workshops for their members",
      ],
    },
    {
      name: "Healthy Relationships",
      items: [
        "Married couples and partners seeking to improve communication",
        "Individuals preparing for marriage or a new stage of family life",
        "Parents and adult children navigating changing expectations",
        "Families experiencing communication difficulties",
        "Young adults learning about healthy relationships",
        "Community members interested in personal development",
        "Parents and carers seeking to strengthen family communication",
        "Community volunteers and leaders who want to promote healthier relationships",
      ],
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   HOW WE PLAN TO DELIVER THE PROGRAMME, AND SAFEGUARDING
   The six ways of delivering the programme the overview names (set as one
   statement, so their one-line descriptions are left out), and its closing
   condition. Then its Safeguarding,
   Confidentiality & Professional Support block, the second sentence of its
   Our Commitment, the close of its Our Commitment to Responsible Support,
   and its 999 advice.
   ------------------------------------------------------------------------- */

export type DeliveryIcon = "seminars" | "workshops" | "professionals" | "languages" | "referral" | "partnerships";

export const seminarsDelivery = {
  id: "how-we-deliver",
  kicker: "Seminars & Workshops",
  titleLead: "How We Plan to Deliver",
  titleAccent: "the Programme",
  lead: `${brand.name} aims to develop practical learning opportunities through:`,
  formats: [
    {
      name: "Community seminars",
      icon: "seminars",
    },
    {
      name: "Interactive workshops",
      icon: "workshops",
    },
    {
      name: "Professional-led sessions",
      icon: "professionals",
    },
    {
      name: "Community-language learning",
      icon: "languages",
    },
    {
      name: "Information and referral pathways",
      icon: "referral",
    },
    {
      name: "Community partnerships",
      icon: "partnerships",
    },
  ] satisfies { name: string; icon: DeliveryIcon }[],
  closing:
    "All programme activities will be developed in accordance with the organisation's capacity, appropriate professional arrangements and applicable legal requirements.",
  safeguarding: {
    id: "safeguarding",
    title: "Safeguarding, Confidentiality & Professional Support",
    lead: `${brand.name} aims to promote respectful, inclusive and safe learning environments.`,
    items: [
      "Participation in discussions will be voluntary.",
      "Personal disclosures will not be required.",
      "Sensitive matters will be handled with care and appropriate safeguarding procedures.",
      "We will seek suitable specialist partners for sessions involving legal issues, financial guidance and domestic abuse.",
      "Confidentiality and its limits will be explained clearly, including any safeguarding or legal obligations.",
      "Participants will be signposted to appropriate services where further assistance is needed.",
    ],
    facilitators:
      "We intend to work with appropriately qualified facilitators, legal professionals and specialist support organisations to ensure that sessions are responsible, inclusive and relevant to participants' needs.",
    specialist:
      "Where a situation requires specialist intervention, we will aim to connect the individual with an appropriate professional or established support organisation.",
    important:
      "Our workshops provide general education and awareness. They do not replace individual legal advice, regulated financial advice, specialist domestic abuse support or emergency services.",
    emergency: {
      number: "999",
      text: "If someone is in immediate danger in the UK, they should call 999.",
      detail:
        "Where it is unsafe to speak, the 999 operators can provide instructions for using the Silent Solution when appropriate.",
    },
  },
} as const;

/* -------------------------------------------------------------------------
   WORK WITH US
   The overview's Work With Us block: its subtitle, the overview's welcome
   to enquiries, ten of the partners the three programmes name (each
   written as one of them writes it), the opportunities it lists and its
   close, with its question on the card over the photograph.
   ------------------------------------------------------------------------- */

export type SeminarPartnerIcon =
  | "legal"
  | "mental"
  | "finance"
  | "safeguarding"
  | "family"
  | "languages"
  | "faith"
  | "education"
  | "public"
  | "funders";

export const seminarsWorkWithUs = {
  id: "work-with-us",
  kicker: "Work With Us",
  titleLead: "Partnerships That",
  titleAccent: "Empower Communities",
  lead: "We welcome enquiries from community organisations, professionals, educators, counsellors, legal specialists, volunteers and potential programme sponsors.",
  partners: [
    { label: "Solicitors and legal professionals", icon: "legal" },
    { label: "Qualified psychologists, counsellors and mental health practitioners", icon: "mental" },
    { label: "Financial education and debt-advice organisations", icon: "finance" },
    { label: "Domestic abuse and specialist safeguarding charities", icon: "safeguarding" },
    { label: "Family support and parenting organisations", icon: "family" },
    { label: "Community-language facilitators and interpreters", icon: "languages" },
    { label: "Community organisations and faith groups", icon: "faith" },
    { label: "Schools, colleges and educational institutions", icon: "education" },
    { label: "Local authorities and public-service providers", icon: "public" },
    { label: "Corporate partners, trusts and philanthropic supporters", icon: "funders" },
  ] satisfies { label: string; icon: SeminarPartnerIcon }[],
  /** On the card over the photograph. */
  question: "Interested in attending, facilitating or partnering with us?",
  opportunitiesLabel: "Partnership opportunities may include:",
  opportunities: [
    "Delivering workshops",
    "Developing accessible educational resources",
    "Providing specialist signposting",
    "Funding community activities",
    "Supporting local outreach",
  ],
  closing:
    "Together, we can help make reliable information and appropriate support more accessible to the people who need them.",
  // The brief's shorter label ("Become a Partner", from its design notes).
  cta: { label: "Become a Partner", href: partner.href },
  image: photo.workWithUs,
} as const;

/* -------------------------------------------------------------------------
   CLOSING CALL TO ACTION
   The overview's Get Involved close: the Foundation's four words that end
   it as the title (its heading, "Take the First Step Towards Greater
   Confidence and Independence", runs to three lines in the banner, so it
   opens the description as a sentence), its invitation and its call to
   register interest, with Volunteer from the brief's row of calls beside it.
   ------------------------------------------------------------------------- */

export const seminarsCta = {
  kicker: "Get Involved",
  titleLead: "Knowledge. Confidence.",
  titleAccent: "Independence. Empowerment.",
  description: `Take the first step towards greater confidence and independence. Join ${brand.name} in building communities where people are better informed, more confident, safer and empowered to make their own choices.`,
  // The brief's standard label: its "Register Your Interest in a Workshop" is too long for the banner on a phone.
  primaryCta: register,
  secondaryCta: { label: "Volunteer", href: `${routes.getInvolved}#volunteer` },
  image: photo.cta,
} as const;

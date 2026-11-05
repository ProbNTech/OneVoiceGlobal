/**
 * Copy and media for the home page (`src/app/(site)/page.tsx`).
 *
 * Every line of copy comes from the brief's homepage block (HOMEPAGE HERO to
 * FINAL CALL TO ACTION), in the brief's order; HOMEPAGE HERO to FINAL CALL TO
 * ACTION are the same word for word in Draft01 and V.2. V.2 then closes the
 * block with the Foundation's own lines in place of Draft01's Vision, Mission
 * and five areas of work; they are the Foundation section, set before the
 * closing banner. Where a section needed a title the brief does not give, it
 * borrows one of the brief's own lines from the matching page (noted beside
 * it).
 *
 * IMAGES. Every photograph on the page was generated for its slot and cut to
 * the slot's exact size. Most come from the second set (3 November 2026,
 * `_source/generated/tools/make_prompts_v2.py`), made after the client found
 * the first too alike: each scene has its own setting and colours and people
 * wear varied clothes. They are saved under /images/home/ as
 * `<slot>-v2.jpg`, with the originals in `_source/generated/v2/`. Some slots
 * keep their first-set photograph (FIRST_SET below), so the page mixes both
 * sets. The slots in THIRD_SET show a third set (3 and 4 November 2026,
 * `_source/generated/tools/make_prompts_v3.py`, originals in
 * `_source/generated/v3/`), saved as `<slot>-v3.jpg`: they are cast towards
 * the client's mix of people across the site, counted by each photo's main
 * person (about 40% White British and European, 30% South Asian, 15% Black,
 * 10% Arab and 5% mixed or other), and each is set in its own relevant
 * place, because the earlier photos looked as if they were all taken in one
 * building. No photograph here is used anywhere else on the site. Alt text
 * describes only what the frame shows: none of these people is presented as
 * a OneVoice participant, volunteer or member of staff.
 */

import { aboutTeam } from "@/data/about";
import { brand, ctas, navigation, routes } from "@/data/site";

export type HomeImage = {
  src: string;
  alt: string;
  /** CSS object-position, for steering the crop. */
  position?: string;
  /** A different crop for phones, where a wide photograph shows as a tall slice (the hero only). */
  positionMobile?: string;
  /** The generated file this slot is waiting for, under /images/home/. */
  pending?: string;
};

/* A few of the page's first-set photographs stay among the new ones, at the user's request (3 November
   2026; those that shared one bright room moved to new places on 4 November). These slots show their
   first-set file (`<slot>.jpg`); the rest show `<slot>-v2.jpg` or, in THIRD_SET, `<slot>-v3.jpg`. */
const FIRST_SET = new Set(["hero-learn", "programme-mentoring", "door-about"]);

/* The client's mix of people across the site (3 November 2026): about 40% White British and European, 30%
   South Asian, 15% Black, 10% Arab and 5% mixed or other, counted by each photo's main person. These slots
   show a third-set photograph (`<slot>-v3.jpg`), cast towards that mix and set in its own relevant place. */
const THIRD_SET = new Set([
  "hero-connect",
  "hero-progress",
  "intro-community",
  "intro-partnership",
  "why-job",
  "why-digital",
  "why-english",
  "why-confidence",
  "why-listen",
  "why-specialist",
  "programmes-feature",
  "programme-digital",
  "programme-enterprise",
  "programme-english",
  "programme-community",
  "support-women",
  "support-men",
  "support-young-people",
  "support-career-changers",
  "support-professionals",
  "support-families",
  "support-barriers",
  "work-with-us",
  "final-cta",
]);

/** A photograph generated for its slot, saved under /images/home/ (FIRST_SET and THIRD_SET say which file it shows). */
const shot = (file: string, alt: string, position = "50% 50%", positionMobile?: string): HomeImage => ({
  src: `/images/home/${file}${FIRST_SET.has(file) ? "" : THIRD_SET.has(file) ? "-v3" : "-v2"}.jpg`,
  alt,
  position,
  ...(positionMobile ? { positionMobile } : {}),
});

const photo = {
  /* Hero slides. Wide screens show the photograph's own left edge, which
     keeps the people clear of the headline; phones steer their tall slice
     onto the people instead. The first set's Learn photograph leads again
     (the user's choice, 3 November 2026), and the second set's, which led
     until then, moves to the second slide in place of its own Develop
     photograph. */
  heroLearn: shot(
    "hero-learn",
    "A tutor in a navy cardigan pointing at a laptop as an older man beside her smiles, other learners at the next table in a bright learning centre",
    "0% 45%",
    "62% 45%",
  ),
  heroDevelop: {
    src: "/images/home/hero-learn-v2.jpg",
    alt: "An older man with a white beard, in a grey waistcoat over a cream kurta, smiling at a laptop as a young woman in a mustard kameez points at the screen, two learners at the next table",
    position: "0% 45%",
    positionMobile: "62% 45%",
  },
  heroConnect: shot(
    "hero-connect",
    "A young man in a mustard jumper laughing as he talks with an employer in a coral blazer at a networking afternoon in a theatre foyer",
    "0% 30%",
    "72% 30%",
  ),
  heroProgress: shot(
    "hero-progress",
    "A young woman in a camel coat shaking hands with an employer in a light-blue shirt in a glass-walled reception, an older woman in a maroon cardigan smiling beside her",
    "0% 40%",
    "56% 40%",
  ),
  /* Introduction collage. */
  introCommunity: shot(
    "intro-community",
    "Residents in a circle of chairs in a room overlooking an estate green, listening as an older man in a mustard cardigan speaks, a facilitator taking notes",
  ),
  introPartnership: shot(
    "intro-partnership",
    "Four people from different organisations talking over printed plans at a table in an office high above the rooftops, one pointing at a page",
  ),
  /* Why OneVoice: one for each line. */
  whyJob: shot(
    "why-job",
    "A man in a maroon polo shirt holding a printed CV as an adviser in a green cardigan points to a list of jobs at a coffee-shop window table",
  ),
  whyDigital: shot(
    "why-digital",
    "An older woman in a blue kameez and white dupatta using a laptop on her sofa as a young volunteer in a yellow jumper points at the screen, both smiling",
  ),
  whyEnglish: shot(
    "why-english",
    "A young woman in a dusty-pink hijab speaking with her hands as an older tutor listens and smiles in a busy college canteen, picture cards on the table",
  ),
  whyConfidence: shot(
    "why-confidence",
    "A woman in a coral jumper standing to speak to a small seated group that smiles back at her in a theatre rehearsal room",
  ),
  whyListen: shot(
    "why-listen",
    "A young man in a grey hoodie talking while a support worker in a mustard jumper listens on a leather sofa in front of a colourful mural, mugs of tea on the table",
  ),
  whyEnterprise: shot(
    "why-enterprise",
    "A young woman in a green embroidered kameez showing handmade candles to a business mentor at a table of samples and sketches",
  ),
  whySpecialist: shot(
    "why-specialist",
    "An adviser in a charcoal blazer on the phone taking notes in a small advice office as an older man beside her holds a folder of letters",
  ),
  /* Our Core Programmes. */
  programmesFeature: shot(
    "programmes-feature",
    "Adult learners working in small groups with laptops in a college classroom, a tutor in a rust jumper kneeling beside one group",
  ),
  programmeSkills: shot(
    "programme-skills",
    "A tutor in a pink cardigan explaining a household budget to learners with calculators and notebooks around a table",
  ),
  programmeEmployability: shot(
    "programme-employability",
    "A young man in a white shirt and maroon tie answering questions across a table from two interviewers at a mock interview",
  ),
  programmeDigital: shot(
    "programme-digital",
    "An older man with a white beard and flat cap at a library computer as a tutor in a blue hijab leans in to help him and a woman in a purple headwrap beside him",
  ),
  programmeEnterprise: shot(
    "programme-enterprise",
    "A woman in a yellow-and-green print dress presenting her business idea to a young man and an older woman in a warehouse co-working space",
  ),
  programmeEnglish: shot(
    "programme-english",
    "A woman in an orange hijab holding up a picture card as she talks with a man in a red checked shirt at an English class in a primary-school classroom",
  ),
  programmeMentoring: shot(
    "programme-mentoring",
    "A woman listening as a young man explains his goals over coffee at a round table",
  ),
  programmeWellbeing: shot(
    "programme-wellbeing",
    "Women of different ages in colourful clothes sitting in a circle with cups of tea, talking and laughing in a sunlit room",
  ),
  programmeCommunity: shot(
    "programme-community",
    "Neighbours of all ages sharing food and laughing at long tables in a school dining hall as a volunteer in a red apron pours tea",
  ),
  /* Who We Support: one series. */
  supportWomen: shot("support-women", "Two women laughing together over a notebook at a marble table in a park cafe"),
  supportMen: shot(
    "support-men",
    "A bearded man in a checked shirt concentrating at a laptop on a workshop bench as a tutor in a green jumper points at the screen",
  ),
  supportYoungPeople: shot(
    "support-young-people",
    "Three teenagers smiling around a laptop in a college makerspace, one pointing at the screen",
  ),
  supportJobseekers: shot(
    "support-jobseekers",
    "A young woman in a grey blazer holding a printed CV and practising her answers with an adviser in a turban",
  ),
  supportCareerChangers: shot(
    "support-career-changers",
    "A man in glasses and a green jumper learning workplace software at a laptop with a tutor in a mustard top in an open-plan office",
  ),
  supportEntrepreneurs: shot(
    "support-entrepreneurs",
    "A young woman in a coral kameez smiling as she packs handmade jewellery into a box",
  ),
  supportProfessionals: shot(
    "support-professionals",
    "A woman in a green blazer leading a small workshop beside a flip chart in a hotel meeting room",
  ),
  supportNewCommunities: shot(
    "support-new-communities",
    "A volunteer in an orange fleece handing an information pack to a family with a young boy at a help desk",
  ),
  supportFamilies: shot(
    "support-families",
    "A mother and father doing a craft activity with their two children at a picnic table beside a park playground",
  ),
  supportBarriers: shot(
    "support-barriers",
    "A young woman in a wheelchair working at a laptop at a height-adjustable desk as a support worker beside her looks on",
  ),
  /* Work With Us and the closing banner. */
  workWithUs: shot(
    "work-with-us",
    "Two people shaking hands across a meeting table as two colleagues smile behind them, framed engineering drawings on the wall",
  ),
  finalCta: shot(
    "final-cta",
    "Neighbours of all ages sharing food and chatting at long tables down a terraced street at dusk under festoon lights",
  ),
} satisfies Record<string, HomeImage>;

/* -------------------------------------------------------------------------
   HOMEPAGE HERO
   ------------------------------------------------------------------------- */

export const homeHero = {
  kicker: brand.centre,
  /** The brief's headline, one line per phrase. */
  title: ["Empowering People.", "Building Skills.", "Creating Opportunities."],
  description:
    "OneVoice Skill Development Centre supports people from ethnic minority, disadvantaged and underserved communities across London to develop skills, build confidence, access employment, explore enterprise, improve digital capability, strengthen wellbeing and connect with their communities.",
  primaryCta: ctas.support,
  secondaryCta: ctas.services,
  /** One slide per word of the brief's motto, Learn. Develop. Connect. Progress. */
  slides: [
    { word: "Learn", image: photo.heroLearn },
    { word: "Develop", image: photo.heroDevelop },
    { word: "Connect", image: photo.heroConnect },
    { word: "Progress", image: photo.heroProgress },
  ],
} as const;

/* The hero's opening paragraph, given a band of its own under the hero. */
export type ConnectIcon = "residents" | "organisations" | "authorities" | "education" | "charities" | "employers";

export const homeIntro = {
  kicker: brand.name,
  /** The statement, split so its key phrase can be set in italic. */
  statement: {
    before: `${brand.name} is a `,
    accent: "community empowerment and partnership platform",
    after:
      " to connect residents, community organisations, local authorities, education providers, charities and employers.",
  },
  purpose:
    "Its purpose is to help communities access opportunities, strengthen participation and turn identified local needs into practical, measurable action.",
  /** The six groups the statement names. */
  connects: [
    { label: "Residents", icon: "residents" },
    { label: "Community Organisations", icon: "organisations" },
    { label: "Local Authorities", icon: "authorities" },
    { label: "Education Providers", icon: "education" },
    { label: "Charities", icon: "charities" },
    { label: "Employers", icon: "employers" },
  ] satisfies { label: string; icon: ConnectIcon }[],
  /** The card over the collage: the brief's subtitle for the Foundation. */
  badge: brand.initiative,
  images: {
    main: photo.introCommunity,
    inset: photo.introPartnership,
  },
} as const;

/* -------------------------------------------------------------------------
   WHY ONEVOICE?
   ------------------------------------------------------------------------- */

export const homeWhy = {
  kicker: "Why OneVoice?",
  titleLead: "One Organisation.",
  titleAccent: "Many Pathways.",
  /** The brief's sequence, one line per frame, each with its own photograph. */
  lines: [
    {
      text: "Someone may come to us looking for a job.",
      key: "looking for a job",
      image: photo.whyJob,
    },
    { text: "They may actually need digital skills.", key: "digital skills", image: photo.whyDigital },
    { text: "They may need English.", key: "English", image: photo.whyEnglish },
    {
      text: "They may need confidence.",
      key: "confidence",
      image: photo.whyConfidence,
    },
    { text: "They may need someone to listen.", key: "someone to listen", image: photo.whyListen },
    { text: "They may need enterprise support.", key: "enterprise support", image: photo.whyEnterprise },
    {
      text: "They may need access to a specialist service.",
      key: "a specialist service",
      image: photo.whySpecialist,
    },
  ],
  conclusion: "That's why our approach is holistic.",
  formula: ["Skills", "Employment", "Digital", "Enterprise", "Education", "Wellbeing", "Mentoring", "Community"],
} as const;

/* -------------------------------------------------------------------------
   OUR CORE PROGRAMMES
   ------------------------------------------------------------------------- */

export type ProgrammeIcon =
  "skills" | "employability" | "digital" | "enterprise" | "english" | "mentoring" | "wellbeing" | "community";

export type HomeProgramme = {
  title: string;
  line: string;
  icon: ProgrammeIcon;
  href: string;
  image: HomeImage;
};

export const homeProgrammes = {
  // The label is the brief's line from its Education & Skills Development page.
  kicker: "Skills for Life. Skills for Work. Skills for the Future.",
  titleLead: "Our Core",
  titleAccent: "Programmes",
  // Both paragraphs: the brief's Education & Skills Development page.
  description: [
    "OneVoice provides accessible skills-development programmes designed around the needs of individuals and communities.",
    "Where formal accreditation is required, OneVoice can work with appropriately accredited training and education partners.",
  ],
  cta: { label: "View All Programmes", href: routes.programmes },
  feature: photo.programmesFeature,
  items: [
    {
      title: "Skills Development",
      line: "Develop practical skills for life and work.",
      icon: "skills",
      href: `${routes.programmes}#education-and-english`,
      image: photo.programmeSkills,
    },
    {
      title: "Employability",
      line: "Become job ready and access employment opportunities.",
      icon: "employability",
      href: `${routes.programmes}#employment-and-careers`,
      image: photo.programmeEmployability,
    },
    {
      title: "Digital OneVoice",
      line: "Build confidence in the digital world.",
      icon: "digital",
      href: `${routes.programmes}#digital-onevoice`,
      image: photo.programmeDigital,
    },
    {
      title: "OneVoice Enterprise",
      line: "Turn ideas into opportunities.",
      icon: "enterprise",
      href: `${routes.programmes}#enterprise-and-mentoring`,
      image: photo.programmeEnterprise,
    },
    {
      title: "English & Communication",
      line: "Develop English and communication skills.",
      icon: "english",
      href: `${routes.programmes}#english-and-communication`,
      image: photo.programmeEnglish,
    },
    {
      title: "Mentoring",
      line: "Get guidance and support from experienced people.",
      icon: "mentoring",
      href: `${routes.programmes}#mentoring`,
      image: photo.programmeMentoring,
    },
    {
      title: "Wellbeing",
      line: "Build resilience, confidence and social connection.",
      icon: "wellbeing",
      href: `${routes.programmes}#wellbeing-and-family`,
      image: photo.programmeWellbeing,
    },
    {
      title: "Community",
      line: "Connect, participate and build relationships.",
      icon: "community",
      href: routes.community,
      image: photo.programmeCommunity,
    },
  ] satisfies HomeProgramme[],
} as const;

/* -------------------------------------------------------------------------
   OUR JOURNEY
   ------------------------------------------------------------------------- */

export const homeJourney = {
  kicker: "Our Journey",
  titleLead: "Your OneVoice",
  titleAccent: "Journey",
  // The brief's line from its OneVoice Journey page.
  lead: "One Person. One Goal. One Step at a Time.",
  steps: [
    { title: "Connect", line: "Start with a conversation.", icon: "message" },
    { title: "Discover", line: "Identify your goals and needs.", icon: "compass" },
    { title: "Develop", line: "Build skills and confidence.", icon: "sprout" },
    {
      title: "Connect",
      line: "Access employers, education, enterprise and community opportunities.",
      icon: "handshake",
    },
    {
      title: "Progress",
      line: "Move towards employment, education, enterprise or greater independence.",
      icon: "trending",
    },
  ],
  cta: ctas.support,
} as const;

export type JourneyIcon = (typeof homeJourney.steps)[number]["icon"];

/* -------------------------------------------------------------------------
   WHO WE SUPPORT
   ------------------------------------------------------------------------- */

export const homeWhoWeSupport = {
  kicker: "Who We Support",
  titleLead: "OneVoice is for",
  titleAccent: "Everyone",
  lead: "Our programmes can support:",
  groups: [
    { label: "Women", image: photo.supportWomen },
    { label: "Men", image: photo.supportMen },
    { label: "Young People", image: photo.supportYoungPeople },
    { label: "Jobseekers", image: photo.supportJobseekers },
    { label: "Career Changers", image: photo.supportCareerChangers },
    { label: "Entrepreneurs", image: photo.supportEntrepreneurs },
    { label: "Professionals", image: photo.supportProfessionals },
    { label: "New Communities", image: photo.supportNewCommunities },
    { label: "Families", image: photo.supportFamilies },
    { label: "People Facing Barriers to Opportunity", image: photo.supportBarriers },
  ],
  note: "Programme eligibility may vary depending on funding and individual programme criteria.",
} as const;

/* -------------------------------------------------------------------------
   WORK WITH US
   ------------------------------------------------------------------------- */

export type PartnerIcon = "employers" | "training" | "community" | "public" | "funders" | "businesses";

export const homeWorkWithUs = {
  kicker: "Work With Us",
  titleLead: "Creating Opportunity",
  titleAccent: "Together",
  // The brief's Public Sector Partnerships page.
  description:
    "Our community-based approach can help partners engage people who may be underrepresented in mainstream programmes.",
  partners: [
    {
      title: "Employers",
      line: "Connect with diverse talent.",
      icon: "employers",
      href: `${routes.partners}#employers`,
    },
    {
      title: "Training Providers",
      line: "Expand access to education.",
      icon: "training",
      href: `${routes.partners}#training-providers`,
    },
    {
      title: "Community Organisations",
      line: "Refer and support participants.",
      icon: "community",
      href: `${routes.partners}#community-organisations`,
    },
    {
      title: "Public Sector",
      line: "Develop effective community programmes.",
      icon: "public",
      href: `${routes.partners}#public-sector`,
    },
    {
      title: "Funders",
      line: "Invest in measurable social impact.",
      icon: "funders",
      href: `${routes.partners}#funders`,
    },
    {
      title: "Businesses",
      line: "Support skills and community development.",
      icon: "businesses",
      href: `${routes.partners}#corporate-partners`,
    },
  ] satisfies { title: string; line: string; icon: PartnerIcon; href: string }[],
  /** The feature card: the brief's PARTNER WITH ONEVOICE block. */
  card: {
    kicker: "Partner With OneVoice",
    title: "Together We Can Create More Opportunities",
    description: "OneVoice welcomes strategic partners who share our commitment to:",
    commitments: [
      "Skills Development",
      "Employment",
      "Enterprise",
      "Digital Inclusion",
      "Education",
      "Wellbeing",
      "Community Development",
      "Social Inclusion",
    ],
    cta: ctas.partner,
    image: photo.workWithUs,
  },
} as const;

/* -------------------------------------------------------------------------
   THE FOUNDATION (V.2)
   The lines V.2 closes its homepage block with: a headline with its line
   and two calls to act, two short statements, and the brief's outline of the
   website's main pages, each with the line it gives that page (its entry for
   Home itself is left out here, on the home page).
   ------------------------------------------------------------------------- */

/* The four doorway photographs, shown as small circles; each its own. */
const doorPhoto = {
  about: shot(
    "door-about",
    "Two smiling women of different generations greeting each other warmly in a bright entrance",
  ),
  work: shot("door-work", "A tutor and a learner in a lilac hijab smiling over a notebook"),
  partnerships: shot("door-partnerships", "Two people from different organisations shaking hands and smiling"),
  support: shot("door-support", "A smiling volunteer in an orange fleece carrying a box of donated books"),
} satisfies Record<string, HomeImage>;

export const homeFoundation = {
  kicker: brand.name,
  titleLead: "Stronger Communities. Greater Opportunity.",
  titleAccent: "Lasting Change.",
  lead: "Connecting communities with the skills, support and partnerships they need to thrive.",
  primaryCta: { label: "Explore Our Work", href: routes.ourWork },
  secondaryCta: { label: "Partner With Us", href: ctas.partner.href },
  /** Each statement split where its accent half begins. */
  statements: [
    {
      lead: "Every Community Has Potential.",
      accent: "Every Voice Matters.",
      line: "We bring people and organisations together to improve access to learning, wellbeing, employment and community participation.",
    },
    {
      lead: "From Shared Challenges",
      accent: "to Shared Solutions",
      line: "Discover how partnerships, community-led programmes and practical support can help create more inclusive opportunities.",
    },
  ],
  pages: [
    {
      title: "About Us",
      line: "Our story, vision, mission, values, approach and governance.",
      href: routes.about,
      image: doorPhoto.about,
    },
    {
      title: "Our Work",
      line: "Education, skills, livelihoods, wellbeing, inclusion and community development.",
      href: routes.ourWork,
      image: doorPhoto.work,
    },
    {
      title: "Our Partnerships",
      line: "Corporates, public bodies, charities, trusts, foundations and diaspora networks.",
      href: routes.partners,
      image: doorPhoto.partnerships,
    },
    {
      title: "Support Us & Get Involved",
      line: "Donate, volunteer, become a partner, fund a programme or join the network.",
      href: routes.getInvolved,
      image: doorPhoto.support,
    },
  ] satisfies { title: string; line: string; href: string; image: HomeImage }[],
} as const;

/* -------------------------------------------------------------------------
   OUR TEAM
   The client asked for the team on the home page as well as on About Us.
   The people, roles and portraits are read from the About page's block so
   the two never drift apart. These are the members' own photographs and
   there is only one of each, so they are the one deliberate exception to
   the one-image-per-slot rule. The link is the About Us sub-menu's own
   entry for the section.
   ------------------------------------------------------------------------- */

export const homeTeam = {
  kicker: aboutTeam.kicker,
  titleLead: aboutTeam.titleLead,
  titleAccent: aboutTeam.titleAccent,
  members: aboutTeam.members,
  link: {
    label: "About Us",
    href:
      navigation.find((item) => item.label === "About Us")?.children?.find((link) => link.label === "Our Team")?.href ??
      routes.about,
  },
} as const;

/* -------------------------------------------------------------------------
   FINAL CALL TO ACTION
   ------------------------------------------------------------------------- */

export const homeFinalCta = {
  titleLead: "Your Voice Matters.",
  titleAccent: "Your Future Matters.",
  description:
    "Whether you want to learn a new skill, find work, start a business, improve your digital confidence, connect with other people or access support, OneVoice Skill Development Centre is here to help you take the next step.",
  closing: brand.closing,
  primaryCta: ctas.support,
  secondaryCta: ctas.services,
  image: photo.finalCta,
} as const;

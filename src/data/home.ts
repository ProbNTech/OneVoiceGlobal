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
 * IMAGES. The six photographs under /images/home/ and the four under
 * /images/community/ come from the brief (Draft01 and V.2); the rest are the
 * existing photographs in /images/. A slot marked `pending` is
 * waiting for a generated image (file name, pixel size and prompt are in
 * `_source/home-media-brief.md`); until it arrives `src` is the closest
 * existing photograph as a stand-in, and swapping it is a one-line change to
 * `src`. Alt text describes only what the frame shows: none of these people
 * is presented as a OneVoice participant, volunteer or member of staff.
 */

import { brand, ctas, routes } from "@/data/site";

export type HomeImage = {
  src: string;
  alt: string;
  /** CSS object-position, for steering the crop. */
  position?: string;
  /** The generated file this slot is waiting for, under /images/home/. */
  pending?: string;
};

const photo = {
  learningLaptop: {
    src: "/images/Photo 1.png",
    alt: "A woman in a pink headscarf working on a laptop beside a smiling tutor at a shared desk",
    position: "40% 50%",
  },
  teamPlanning: {
    src: "/images/OurWorkHeroSection2.png",
    alt: "A small team leaning over a table of plans and notes in a bright office",
    position: "62% 40%",
  },
  groupLaptop: {
    src: "/images/HomePageHeroSectionOrignal.png",
    alt: "A smiling group gathered around a laptop at a table in a busy learning space",
    position: "55% 45%",
  },
  teamDocuments: {
    src: "/images/OurWorkPageHeroSection3.png",
    alt: "Colleagues standing around a table, reviewing printed documents together",
    position: "50% 40%",
  },
  youngLaptops: {
    src: "/images/OurWorkHeroSection1.png",
    alt: "Young adults working together on laptops around an office table",
    position: "50% 35%",
  },
  laptopsWorkshop: {
    src: "/images/OurWorkPageHeroSection1.jpg",
    alt: "A group of young adults sharing laptops during a workshop",
    position: "40% 50%",
  },
  foodSupport: {
    src: "/images/HomePageHeroSection1.png",
    alt: "A smiling volunteer handing a box of food and clothing across a counter",
    position: "45% 40%",
  },
  communityPantry: {
    src: "/images/HomePageHeroSection2.png",
    alt: "Volunteers handing a box of groceries to a woman at a community food distribution",
    position: "40% 40%",
  },
  communityForum: {
    src: "/images/home/community-forum.jpg",
    alt: "People of different ages and backgrounds talking together around tables at a community meeting",
    position: "50% 40%",
  },
  communityMeeting: {
    src: "/images/home/community-meeting.jpg",
    alt: "A woman speaking while others listen around tables in a library meeting room",
    position: "45% 45%",
  },
  digitalClass: {
    src: "/images/home/digital-skills-class.jpg",
    alt: "A tutor helping two women at computers in a learning room",
    position: "40% 50%",
  },
  consultation: {
    src: "/images/home/community-consultation.jpg",
    alt: "Community members seated along a long table during a consultation session",
    position: "50% 55%",
  },
  womenGroup: {
    src: "/images/home/women-learning-group.jpg",
    alt: "A group of young women with laptops listening to a facilitator",
    position: "50% 45%",
  },
  international: {
    src: "/images/home/international-meeting.jpg",
    alt: "Delegates from different countries around a meeting table with a presentation screen",
    position: "50% 50%",
  },
} satisfies Record<string, HomeImage>;

/** A stand-in for a slot still waiting for its own photograph. */
const standIn = (image: HomeImage, pending: string, alt?: string): HomeImage => ({
  ...image,
  alt: alt ?? image.alt,
  pending,
});

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
    { word: "Learn", image: photo.learningLaptop },
    { word: "Develop", image: photo.teamPlanning },
    { word: "Connect", image: photo.groupLaptop },
    {
      word: "Progress",
      image: standIn(photo.teamDocuments, "hero-progress.jpg"),
    },
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
    main: standIn(photo.communityForum, "intro-community.jpg"),
    inset: standIn(photo.international, "intro-partnership.jpg"),
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
      image: standIn(photo.teamDocuments, "why-job.jpg"),
    },
    { text: "They may actually need digital skills.", key: "digital skills", image: photo.laptopsWorkshop },
    { text: "They may need English.", key: "English", image: photo.womenGroup },
    {
      text: "They may need confidence.",
      key: "confidence",
      image: standIn(photo.foodSupport, "why-confidence.jpg"),
    },
    { text: "They may need someone to listen.", key: "someone to listen", image: photo.communityMeeting },
    { text: "They may need enterprise support.", key: "enterprise support", image: photo.youngLaptops },
    {
      text: "They may need access to a specialist service.",
      key: "a specialist service",
      image: photo.consultation,
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
  feature: standIn(photo.groupLaptop, "programmes-feature.jpg"),
  items: [
    {
      title: "Skills Development",
      line: "Develop practical skills for life and work.",
      icon: "skills",
      href: `${routes.programmes}#education-and-english`,
      image: photo.digitalClass,
    },
    {
      title: "Employability",
      line: "Become job ready and access employment opportunities.",
      icon: "employability",
      href: `${routes.programmes}#employment-and-careers`,
      image: standIn(photo.teamDocuments, "programme-employability.jpg"),
    },
    {
      title: "Digital OneVoice",
      line: "Build confidence in the digital world.",
      icon: "digital",
      href: `${routes.programmes}#digital-onevoice`,
      image: standIn(photo.laptopsWorkshop, "programme-digital.jpg"),
    },
    {
      title: "OneVoice Enterprise",
      line: "Turn ideas into opportunities.",
      icon: "enterprise",
      href: `${routes.programmes}#enterprise-and-mentoring`,
      image: standIn(photo.youngLaptops, "programme-enterprise.jpg"),
    },
    {
      title: "English & Communication",
      line: "Develop English and communication skills.",
      icon: "english",
      href: `${routes.programmes}#english-and-communication`,
      image: standIn(photo.womenGroup, "programme-english.jpg"),
    },
    {
      title: "Mentoring",
      line: "Get guidance and support from experienced people.",
      icon: "mentoring",
      href: `${routes.programmes}#mentoring`,
      image: standIn(photo.learningLaptop, "programme-mentoring.jpg"),
    },
    {
      title: "Wellbeing",
      line: "Build resilience, confidence and social connection.",
      icon: "wellbeing",
      href: `${routes.programmes}#wellbeing-and-family`,
      image: standIn(photo.communityMeeting, "programme-wellbeing.jpg"),
    },
    {
      title: "Community",
      line: "Connect, participate and build relationships.",
      icon: "community",
      href: routes.community,
      image: photo.communityForum,
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

const person = (label: string, image: HomeImage, file: string, alt: string) => ({
  label,
  image: standIn(image, file, alt),
});

export const homeWhoWeSupport = {
  kicker: "Who We Support",
  titleLead: "OneVoice is for",
  titleAccent: "Everyone",
  lead: "Our programmes can support:",
  groups: [
    person("Women", photo.womenGroup, "support-women.jpg", photo.womenGroup.alt),
    person("Men", photo.youngLaptops, "support-men.jpg", photo.youngLaptops.alt),
    person("Young People", photo.laptopsWorkshop, "support-young-people.jpg", photo.laptopsWorkshop.alt),
    person("Jobseekers", photo.teamDocuments, "support-jobseekers.jpg", photo.teamDocuments.alt),
    person("Career Changers", photo.teamPlanning, "support-career-changers.jpg", photo.teamPlanning.alt),
    person("Entrepreneurs", photo.groupLaptop, "support-entrepreneurs.jpg", photo.groupLaptop.alt),
    person("Professionals", photo.international, "support-professionals.jpg", photo.international.alt),
    person("New Communities", photo.communityForum, "support-new-communities.jpg", photo.communityForum.alt),
    person("Families", photo.communityPantry, "support-families.jpg", photo.communityPantry.alt),
    person(
      "People Facing Barriers to Opportunity",
      photo.learningLaptop,
      "support-barriers.jpg",
      photo.learningLaptop.alt,
    ),
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
    image: standIn(photo.teamPlanning, "work-with-us.jpg"),
  },
} as const;

/* -------------------------------------------------------------------------
   THE FOUNDATION (V.2)
   The lines V.2 closes its homepage block with: a headline with its line
   and two calls to act, two short statements, and the brief's outline of the
   website's main pages, each with the line it gives that page (its entry for
   Home itself is left out here, on the home page).
   ------------------------------------------------------------------------- */

const v2Photo = {
  gathering: {
    src: "/images/community/community-gathering.jpg",
    alt: "Residents of different ages sharing a table and talking together at a busy community gathering in a hall",
    position: "50% 50%",
  },
  workshop: {
    src: "/images/community/community-workshop.jpg",
    alt: "A facilitator at a whiteboard leading a workshop for adults seated at tables in a bright, modern community space",
    position: "50% 50%",
  },
  professionals: {
    src: "/images/community/professionals-collaborating.jpg",
    alt: "Professionals gathered round a table of laptops and printed charts, talking and smiling together",
    position: "55% 45%",
  },
  volunteers: {
    src: "/images/community/outreach-volunteers.jpg",
    alt: "Volunteers in high-visibility vests chatting with residents outside beside a rail of donated clothes",
    position: "55% 45%",
  },
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
      image: v2Photo.gathering,
    },
    {
      title: "Our Work",
      line: "Education, skills, livelihoods, wellbeing, inclusion and community development.",
      href: routes.ourWork,
      image: v2Photo.workshop,
    },
    {
      title: "Our Partnerships",
      line: "Corporates, public bodies, charities, trusts, foundations and diaspora networks.",
      href: routes.partners,
      image: v2Photo.professionals,
    },
    {
      title: "Support Us & Get Involved",
      line: "Donate, volunteer, become a partner, fund a programme or join the network.",
      href: routes.getInvolved,
      image: v2Photo.volunteers,
    },
  ] satisfies { title: string; line: string; href: string; image: HomeImage }[],
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
  image: photo.communityPantry,
} as const;

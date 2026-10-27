/**
 * Copy and media for the Programmes page (`src/app/(site)/programmes/page.tsx`).
 * (Not `programmes.ts`: that name belongs to the rejected first design's
 * programme directory, which the legacy home page still imports.)
 *
 * Every line comes from the brief's PROGRAMMES block (Education & Skills
 * Development to New Arrival & Settlement Support), the same word for word
 * in Draft01 and V.2. The brief's menu names nineteen programmes that do not
 * line up with its twenty-three blocks of copy, and some of the nineteen have
 * no copy at all, so (as agreed on 27 October 2026)
 * the page is built from the blocks themselves, grouped into seven themes.
 * The themes are the Programmes sub-menu in site.ts, and each theme's id is
 * the anchor the menu builds from its label. Each theme's name is made from
 * the names of the blocks it holds.
 *
 * The hero's lines come from the brief's ONEVOICE SKILL DEVELOPMENT CENTRE
 * block, and the closing call is its "Do You Know Someone Who Could
 * Benefit?" block, as noted beside each.
 *
 * Lists are kept whole: the page sets the longest of them as running text
 * rather than as bullet lists, so they stay compact.
 *
 * IMAGES. A slot marked `pending` is waiting for a generated image (file
 * name, pixel size and prompt are in `_source/programmes-media-brief.md`);
 * until it arrives `src` is the closest existing photograph, and swapping it
 * is a one-line change to `src`. Alt text describes only what the frame
 * shows: none of these people is presented as a OneVoice participant or
 * member of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, enquiryHref, navigation, routes } from "@/data/site";

const photo = {
  digitalClass: {
    src: "/images/home/digital-skills-class.jpg",
    alt: "A tutor helping two women at computers in a learning room",
    position: "45% 45%",
  },
  peerCircle: {
    src: "/images/community/peer-support-circle.jpg",
    alt: "Adults of different ages sitting in a circle and talking warmly at a peer support group",
    position: "50% 50%",
  },
  womenGroup: {
    src: "/images/home/women-learning-group.jpg",
    alt: "A group of young women with laptops listening to a facilitator",
    position: "50% 45%",
  },
  screenHelp: {
    src: "/images/about/What-we-do/What-we-do-image-4.png",
    alt: "A woman pointing at a desktop screen while an older man beside her works the mouse, in a bright open learning space",
    position: "50% 50%",
  },
  youngLaptops: {
    src: "/images/OurWorkHeroSection1.png",
    alt: "Young adults working together on laptops around an office table",
    position: "50% 40%",
  },
  shopTablet: {
    src: "/images/about/What-we-do/What-we-Do-image-5.png",
    alt: "Two women looking at a tablet together at a counter of small handmade products in a shop",
    position: "50% 45%",
  },
  adviserDesk: {
    src: "/images/about/What-we-do/what-we-do-image-2.png",
    alt: "An adviser showing a printed document to a man seated across a desk from her, a laptop open between them",
    position: "45% 50%",
  },
  adviserLeaflet: {
    src: "/images/about/What-we-do/What-we-Do-image-6.png",
    alt: "An adviser pointing to a printed leaflet on a low table while a woman seated beside her looks on",
    position: "50% 50%",
  },
  teamDocuments: {
    src: "/images/OurWorkPageHeroSection3.png",
    alt: "Colleagues standing around a table, reviewing printed documents together",
    position: "50% 45%",
  },
  teamPlans: {
    src: "/images/OurWorkHeroSection2.png",
    alt: "A small team leaning over a table of plans and notes in a bright office",
    position: "50% 50%",
  },
  conference: {
    src: "/images/about/What-we-do/What-we-do-image-9.png",
    alt: "A speaker with a microphone addressing a seated audience in a conference hall",
    position: "50% 50%",
  },
  tutorLaptop: {
    src: "/images/Photo 1.png",
    alt: "A woman in a pink headscarf working on a laptop beside a smiling tutor at a shared desk",
    position: "40% 50%",
  },
  groupLaptop: {
    src: "/images/HomePageHeroSectionOrignal.png",
    alt: "A smiling group gathered around a laptop at a table in a busy learning space",
    position: "50% 45%",
  },
  trainer: {
    src: "/images/about/What-we-do/what-we-do-image-1.png",
    alt: "A trainer at a whiteboard explaining a diagram to five people seated around a table with notebooks and laptops",
    position: "50% 50%",
  },
  workshop: {
    src: "/images/community/community-workshop.jpg",
    alt: "A facilitator at a whiteboard leading a workshop for adults seated at tables in a bright, modern community space",
    position: "50% 50%",
  },
  womenConversation: {
    src: "/images/community/women-conversation.jpg",
    alt: "A group of women, several in headscarves, laughing and talking together in a warm sitting room",
    position: "50% 45%",
  },
  rooftopCircle: {
    src: "/images/about/What-we-do/What-We-Do-image-7.png",
    alt: "Seven people sitting in a circle talking on a planted rooftop terrace at sunset, the London skyline behind them",
    position: "50% 60%",
  },
  parkGathering: {
    src: "/images/about/What-we-do/What-we-do-image-10.png",
    alt: "A large group of people of different ages and backgrounds sitting and talking together outdoors in a city park",
    position: "50% 45%",
  },
} satisfies Record<string, HomeImage>;

/** A stand-in for a slot still waiting for its own photograph. */
const standIn = (image: HomeImage, pending: string): HomeImage => ({ ...image, pending });

/** The anchors the menu builds for this page's themes. */
const anchors = navigation.find((item) => item.label === "Programmes")?.children ?? [];
const anchorFor = (label: string) => anchors.find((link) => link.label === label)?.href ?? routes.programmes;
const idOf = (label: string) => anchorFor(label).split("#")[1] ?? "";

/* -------------------------------------------------------------------------
   HERO
   The brief's ONEVOICE SKILL DEVELOPMENT CENTRE block: its motto as the
   headline, its line on who the Centre supports beneath, and on the card
   over the collage the eight things its programmes bring together.
   ------------------------------------------------------------------------- */

export const programmesHero = {
  kicker: "Programmes",
  title: ["Learn. Develop.", "Connect. Progress."],
  description:
    "We support women and men, young people, families, jobseekers, entrepreneurs, professionals, new communities and people facing barriers to opportunity.",
  // The brief's call-to-action labels (V.2, "Website design standards").
  primaryCta: { label: "Explore Programmes", href: anchorFor("Education & English") },
  secondaryCta: { label: "Register Your Interest", href: enquiryHref("interest") },
  card: {
    lead: "Our programmes bring together:",
    words: ["Education", "Skills", "Employment", "Digital", "Enterprise", "Mentoring", "Wellbeing", "Community"],
  },
  images: {
    main: standIn(photo.digitalClass, "programmes-hero.jpg"),
    side: standIn(photo.peerCircle, "programmes-hero-side.jpg"),
  },
} as const;

/** The strip under the hero: the seven themes, read from the navigation. */
export const programmesSections = { label: "Programmes", links: anchors };

/* -------------------------------------------------------------------------
   EDUCATION & ENGLISH
   The brief's EDUCATION & SKILLS DEVELOPMENT and ENGLISH & COMMUNICATION
   blocks.
   ------------------------------------------------------------------------- */

export type EnglishIcon = "everyday" | "workplace" | "employment" | "digital" | "conversation" | "pathways";

export const programmesEducation = {
  id: idOf("Education & English"),
  kicker: "Education & Skills Development",
  titleLead: "Skills for Life. Skills for Work.",
  titleAccent: "Skills for the Future.",
  lead: "OneVoice provides accessible skills-development programmes designed around the needs of individuals and communities.",
  listLabel: "Training areas include:",
  areas: [
    "Employability skills",
    "Communication",
    "English language",
    "Digital skills",
    "Administration",
    "Customer service",
    "Business skills",
    "Financial capability",
    "Leadership",
    "Personal development",
    "Presentation skills",
    "Interview skills",
    "Workplace culture",
    "Online safety",
    "Entrepreneurship",
    "Professional development",
  ],
  /** On the card over the photograph. */
  note: "Where formal accreditation is required, OneVoice can work with appropriately accredited training and education partners.",
  image: standIn(photo.womenGroup, "programmes-education.jpg"),
  english: {
    id: "english-and-communication",
    kicker: "English & Communication",
    title: "English for Life, Work and Opportunity",
    lead: "Communication skills can open doors to employment, education and community participation. Our programmes support:",
    strands: [
      { name: "Everyday English", line: "Build confidence in everyday conversations.", icon: "everyday" },
      {
        name: "Workplace English",
        line: "Understand workplace terminology and communication.",
        icon: "workplace",
      },
      {
        name: "Employment English",
        line: "Prepare for applications, interviews and employment.",
        icon: "employment",
      },
      {
        name: "Digital Communication",
        line: "Use email, online platforms and digital services confidently.",
        icon: "digital",
      },
      {
        name: "Conversation Practice",
        line: "Develop confidence through supported conversation.",
        icon: "conversation",
      },
      {
        name: "ESOL Pathways",
        line: "Where appropriate, OneVoice can provide or signpost participants to ESOL and accredited English-language programmes.",
        icon: "pathways",
      },
    ] satisfies { name: string; line: string; icon: EnglishIcon }[],
  },
} as const;

/* -------------------------------------------------------------------------
   DIGITAL ONEVOICE
   The brief's DIGITAL ONEVOICE, DIGITAL FOR WORK and DIGITAL FOR BUSINESS
   blocks.
   ------------------------------------------------------------------------- */

export const programmesDigital = {
  id: idOf("Digital OneVoice"),
  kicker: "Digital OneVoice",
  titleLead: "Digital Skills",
  titleAccent: "for Everyone",
  lead: "Digital skills are essential for modern life. Our digital programmes help participants develop practical confidence with technology.",
  coursesLabel: "Courses include:",
  courses: [
    "Computer basics",
    "Smartphones and tablets",
    "Email",
    "Internet skills",
    "Microsoft Word",
    "Microsoft Excel",
    "Microsoft PowerPoint",
    "Online applications",
    "Online job searching",
    "Video meetings",
    "Digital government services",
    "Online banking awareness",
    "Social media",
    "LinkedIn",
    "Digital marketing",
    "Online safety",
    "Cyber awareness",
    "Privacy",
    "Artificial intelligence awareness",
    "Productivity tools",
  ],
  confidence: {
    label: "Digital Confidence",
    text: "We don't simply teach technology. We help people become confident using technology independently.",
  },
  tracks: [
    {
      name: "Digital for Work",
      title: "Technology Skills for Employment",
      lead: "Participants can develop practical workplace technology skills including:",
      items: [
        "Email",
        "Word processing",
        "Spreadsheets",
        "Presentations",
        "Online meetings",
        "Cloud tools",
        "Digital calendars",
        "Online collaboration",
        "Workplace communication",
        "Digital job applications",
      ],
      image: standIn(photo.youngLaptops, "programmes-digital-work.jpg"),
    },
    {
      name: "Digital for Business",
      title: "Technology for Entrepreneurs",
      lead: "Business-focused digital training can include:",
      items: [
        "Social media",
        "Digital marketing",
        "Websites",
        "E-commerce",
        "Online payments",
        "Customer communication",
        "Business productivity",
        "Content creation",
        "AI productivity tools",
        "Digital branding",
      ],
      image: standIn(photo.shopTablet, "programmes-digital-business.jpg"),
    },
  ],
  image: standIn(photo.screenHelp, "programmes-digital.jpg"),
} as const;

/* -------------------------------------------------------------------------
   EMPLOYMENT & CAREERS
   The brief's EMPLOYABILITY & JOB SUPPORT, CAREERS INFORMATION, ADVICE &
   GUIDANCE and CAREER DEVELOPMENT blocks, then RETURN TO WORK in a band of
   its own.
   ------------------------------------------------------------------------- */

export type CareerTab = {
  name: string;
  title: string;
  lead: string;
  /** The list's lead-in, where the block's own lead does not end on one. */
  listLabel?: string;
  items: string[];
  /** A second, shorter list where the block has one. */
  extra?: { label: string; items: string[] };
  /** A closing line where the block has one. */
  closing?: string;
  image: HomeImage;
};

export const programmesEmployment = {
  id: idOf("Employment & Careers"),
  kicker: "Employment & Careers",
  /* The brief's own objective for its employability programmes ("Our
     objective: Confident. Skilled. Job Ready. Connected. Employed."). */
  titleLead: "Confident. Skilled. Job Ready.",
  titleAccent: "Connected. Employed.",
  tabs: [
    {
      name: "Employability & Job Support",
      title: "Helping People Become Job Ready",
      lead: "Our employability programmes help people overcome barriers to employment and move towards sustainable work.",
      listLabel: "Support includes:",
      items: [
        "Initial needs assessment",
        "Individual action planning",
        "Career guidance",
        "CV preparation",
        "Cover letters",
        "Online applications",
        "Job searching",
        "Interview preparation",
        "Mock interviews",
        "Workplace communication",
        "Digital employment skills",
        "LinkedIn development",
        "Confidence building",
        "Employer introductions",
        "Work experience",
        "Volunteering",
        "Apprenticeship information",
        "Career progression",
        "Return-to-work support",
      ],
      image: standIn(photo.adviserDesk, "programmes-employability.jpg"),
    },
    {
      name: "Careers Information, Advice & Guidance",
      title: "Your Future. Your Choices.",
      lead: "OneVoice can provide information, advice and guidance to help people make informed decisions about:",
      items: [
        "Careers",
        "Education",
        "Training",
        "Employment",
        "Apprenticeships",
        "Skills",
        "Enterprise",
        "Volunteering",
        "Professional development",
        "Career changes",
        "Further education",
        "Higher education",
        "Wellbeing and support services",
      ],
      extra: {
        label: "Support delivered through:",
        items: [
          "One-to-one meetings",
          "Group sessions",
          "Workshops",
          "Telephone support",
          "Online sessions",
          "Community outreach",
        ],
      },
      image: standIn(photo.adviserLeaflet, "programmes-careers-guidance.jpg"),
    },
    {
      name: "Career Development",
      title: "From Getting a Job to Building a Career",
      lead: "Employment is only the beginning. OneVoice can support longer-term professional development.",
      // The brief reads "Career development include:"; "can" is added for the grammar.
      listLabel: "Career development can include:",
      items: [
        "Career planning",
        "Skills assessment",
        "Transferable skills",
        "Professional development",
        "Promotion preparation",
        "Leadership skills",
        "Networking",
        "Personal branding",
        "LinkedIn",
        "Workplace confidence",
        "Communication",
        "Negotiation",
        "Career transitions",
      ],
      image: standIn(photo.teamDocuments, "programmes-career-development.jpg"),
    },
  ] satisfies CareerTab[],
} as const;

export type PathwayIcon = "review" | "cv" | "digital" | "search" | "interview" | "employment" | "progression";

export const programmesReturn = {
  id: "return-to-work",
  kicker: "Return to Work",
  titleLead: "Restart Your Career",
  titleAccent: "with Confidence",
  lead: "Career breaks can create uncertainty. We can support people returning to work following:",
  reasons: [
    "Childcare",
    "Caring responsibilities",
    "Relocation",
    "Family circumstances",
    "Extended unemployment",
    "Redundancy",
    "Career changes",
  ],
  pathwayLabel: "Our pathway",
  pathway: [
    { label: "Skills Review", icon: "review" },
    { label: "CV", icon: "cv" },
    { label: "Digital Confidence", icon: "digital" },
    { label: "Job Search", icon: "search" },
    { label: "Interview", icon: "interview" },
    { label: "Employment", icon: "employment" },
    { label: "Progression", icon: "progression" },
  ] satisfies { label: string; icon: PathwayIcon }[],
} as const;

/* -------------------------------------------------------------------------
   ENTERPRISE & MENTORING
   The brief's ENTERPRISE & SELF-EMPLOYMENT, ONEVOICE BUSINESS NETWORK and
   MENTORING blocks.
   ------------------------------------------------------------------------- */

export type EnterpriseIcon =
  "ideas" | "startups" | "freelancers" | "soleTraders" | "micro" | "online" | "growing" | "social";

export const programmesEnterprise = {
  id: idOf("Enterprise & Mentoring"),
  kicker: "Enterprise & Self-Employment",
  titleLead: "From Ideas",
  titleAccent: "to Enterprise",
  lead: "OneVoice supports people who want to explore self-employment, freelancing or starting a business.",
  whoLabel: "Our enterprise programmes can support:",
  who: [
    { label: "Business ideas", icon: "ideas" },
    { label: "Start-ups", icon: "startups" },
    { label: "Freelancers", icon: "freelancers" },
    { label: "Sole traders", icon: "soleTraders" },
    { label: "Micro-businesses", icon: "micro" },
    { label: "Online businesses", icon: "online" },
    { label: "Growing businesses", icon: "growing" },
    { label: "Social enterprises", icon: "social" },
  ] satisfies { label: string; icon: EnterpriseIcon }[],
  cta: { label: "Register Your Interest", href: enquiryHref("interest") },
  supportLabel: "Support includes:",
  support: [
    "Business idea development",
    "Business planning",
    "Market research",
    "Customer identification",
    "Pricing",
    "Branding",
    "Marketing",
    "Social media",
    "Website planning",
    "E-commerce",
    "Business administration",
    "Financial planning",
    "Networking",
    "Mentoring",
    "Funding signposting",
    "Business introductions",
  ],
  image: standIn(photo.teamPlans, "programmes-enterprise.jpg"),
  network: {
    kicker: "OneVoice Business Network",
    /** The block's three-word heading. */
    title: ["Connect.", "Collaborate.", "Grow."],
    whoLabel: "The OneVoice Business Network brings together:",
    who: [
      "Entrepreneurs",
      "Business owners",
      "Professionals",
      "Freelancers",
      "Start-ups",
      "Aspiring entrepreneurs",
      "Community leaders",
    ],
    activitiesLabel: "Activities include:",
    activities: [
      "Business networking",
      "Founder meetings",
      "Workshops",
      "Mentoring",
      "Business showcases",
      "Guest speakers",
      "Peer learning",
      "Professional introductions",
      "Collaboration opportunities",
    ],
    image: standIn(photo.conference, "programmes-business-network.jpg"),
  },
  mentoring: {
    id: "mentoring",
    kicker: "Mentoring",
    title: "Guidance When You Need It",
    quote: "A good mentor can provide encouragement, perspective and practical guidance.",
    listLabel: "Our mentoring pathways can support:",
    items: [
      "Employment",
      "Career development",
      "Enterprise",
      "Leadership",
      "Education",
      "Personal development",
      "Digital skills",
      "Young people",
      "Return to work",
    ],
    note: "Mentoring will operate within appropriate safeguarding, confidentiality and professional boundaries.",
    image: standIn(photo.tutorLaptop, "programmes-mentoring.jpg"),
  },
} as const;

/* -------------------------------------------------------------------------
   WOMEN, MEN & YOUNG PEOPLE
   The Centre's emphasis towards women (from its ONEVOICE SKILL DEVELOPMENT
   CENTRE block), then the brief's YOUNG PEOPLE'S DEVELOPMENT, YOUNG MEN'S
   DEVELOPMENT and MEN'S DEVELOPMENT blocks.
   ------------------------------------------------------------------------- */

export const programmesPeople = {
  id: idOf("Women, Men & Youth"),
  kicker: "Women, Men & Young People",
  women: {
    lead: "Our main emphasis towards women is simple:",
    /** Each sentence opens on its verb, which the page sets in colour. */
    lines: [
      ["Listen", "to women."],
      ["Understand", "their needs."],
      ["Build", "their skills."],
      ["Connect", "them with opportunities."],
      ["Support", "their progress."],
    ],
    image: standIn(photo.womenConversation, "programmes-women.jpg"),
  },
  groups: [
    {
      name: "Young People's Development",
      title: "Building Skills for the Next Generation",
      lead: "OneVoice can provide dedicated programmes for young people, subject to programme eligibility.",
      listLabel: "Areas include:",
      items: [
        "Employability",
        "Career awareness",
        "Digital skills",
        "Mentoring",
        "Confidence",
        "Leadership",
        "Enterprise",
        "Personal development",
        "Apprenticeship awareness",
        "Further education",
        "Higher education",
        "Volunteering",
        "Work experience",
      ],
      closing: "Our aim is to help young people understand their options and develop the confidence to pursue them.",
      image: standIn(photo.groupLaptop, "programmes-young-people.jpg"),
    },
    {
      name: "Young Men's Development",
      title: "Positive Pathways for Young Men",
      lead: "Dedicated programmes can help young men develop:",
      listLabel: "",
      items: [
        "Employability",
        "Communication",
        "Digital skills",
        "Leadership",
        "Confidence",
        "Entrepreneurship",
        "Career awareness",
        "Mentoring",
        "Community participation",
      ],
      closing:
        "The focus is on practical skills, positive role models and constructive pathways into education, employment and enterprise.",
      image: standIn(photo.trainer, "programmes-young-men.jpg"),
    },
    {
      name: "Men's Development",
      title: "Skills, Employment & Personal Development",
      lead: "Dedicated men's programmes can address identified community needs around:",
      listLabel: "",
      items: [
        "Employment",
        "Digital skills",
        "Enterprise",
        "Career progression",
        "Confidence",
        "Mentoring",
        "Financial capability",
        "Wellbeing",
        "Community participation",
      ],
      closing: "",
      image: standIn(photo.workshop, "programmes-mens-development.jpg"),
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   WELLBEING & FAMILY
   The brief's HEALTH & WELLBEING, MENTAL HEALTH SUPPORT, FAMILY SUPPORT and
   FINANCIAL CAPABILITY blocks.
   ------------------------------------------------------------------------- */

export type WellbeingIcon = "wellbeing" | "mental" | "family" | "financial";

export const programmesWellbeing = {
  id: idOf("Wellbeing & Family"),
  kicker: "Wellbeing & Family",
  /* The brief's heading for its Health & Wellbeing block. */
  titleLead: "Your Wellbeing",
  titleAccent: "Matters",
  items: [
    {
      name: "Health & Wellbeing",
      // The block's heading, "Your Wellbeing Matters", is the section's title.
      title: "",
      icon: "wellbeing",
      lead: "People can face pressures that affect confidence, health and participation in employment or education. Our wellbeing programme can include:",
      list: [
        "Wellbeing workshops",
        "Confidence building",
        "Stress management",
        "Resilience",
        "Self-care",
        "Social connection",
        "Healthy lifestyle awareness",
        "Emotional wellbeing",
        "Peer support",
        "Community activities",
        "Specialist service signposting",
      ],
      notes: [
        "Where clinical or specialist support is required, participants can be referred or signposted to appropriately qualified services.",
      ],
    },
    {
      name: "Mental Health Support",
      title: "Creating a Supportive Environment",
      icon: "mental",
      lead: "OneVoice aims to provide a welcoming environment where people can discuss challenges and access appropriate support. Our programmes include:",
      list: [
        "Mental health awareness",
        "Emotional wellbeing",
        "Resilience",
        "Stress management",
        "Confidence",
        "Peer support",
        "Wellbeing workshops",
        "Social connection",
        "Specialist referrals",
      ],
      notes: [
        "OneVoice does not replace NHS or specialist clinical services.",
        "Where specialist intervention is needed, appropriate referral pathways should be used.",
      ],
    },
    {
      name: "Family Support",
      title: "Supporting Stronger Families",
      icon: "family",
      lead: "Where appropriate, OneVoice can provide community information, signposting and support relating to:",
      list: [
        "Family wellbeing",
        "Parenting information",
        "Education",
        "Employment",
        "Digital inclusion",
        "Community participation",
        "Financial capability",
        "Specialist family services",
      ],
      notes: [
        "Our approach recognises that supporting individuals can contribute to stronger families and communities.",
      ],
    },
    {
      name: "Financial Capability",
      title: "Building Financial Confidence",
      icon: "financial",
      lead: "Financial knowledge is an important part of independence. Workshops can cover:",
      list: [
        "Household budgeting",
        "Managing bills",
        "Saving",
        "Financial planning",
        "Understanding credit",
        "Digital banking awareness",
        "Avoiding scams",
        "Financial abuse awareness",
        "Business finances",
        "Signposting to specialist debt advice",
      ],
      notes: [],
    },
  ] satisfies { name: string; title: string; icon: WellbeingIcon; lead: string; list: string[]; notes: string[] }[],
  image: standIn(photo.rooftopCircle, "programmes-wellbeing.jpg"),
} as const;

/* -------------------------------------------------------------------------
   SAFETY, ADVICE & SETTLEMENT
   The brief's DOMESTIC ABUSE SUPPORT, INFORMATION, ADVICE & SIGNPOSTING,
   ADVOCACY & REFERRAL and NEW ARRIVAL & SETTLEMENT SUPPORT blocks.
   ------------------------------------------------------------------------- */

export type AdviceIcon = "signposting" | "advocacy" | "arrival";

export const programmesSafety = {
  id: idOf("Safety & Advice"),
  abuse: {
    kicker: "Domestic Abuse Support",
    titleLead: "Everyone Deserves to Feel",
    titleAccent: "Safe and Respected",
    lead: "OneVoice recognises that domestic abuse can affect people of all genders, ages and backgrounds.",
    formsLabel: "It may include:",
    forms: [
      "Physical abuse",
      "Emotional abuse",
      "Psychological abuse",
      "Financial abuse",
      "Coercive control",
      "Sexual abuse",
      "Isolation",
    ],
    supportLabel: "Support includes:",
    support: [
      "Confidential initial conversations",
      "Safety-focused support",
      "Information",
      "Advocacy",
      "Signposting",
      "Specialist referrals",
      "Housing support signposting",
      "Welfare information",
      "Community support",
      "Confidence rebuilding",
      "Independence planning",
    ],
    closing: "Where specialist intervention is required, OneVoice will work with appropriate qualified organisations.",
  },
  advice: [
    {
      name: "Information, Advice & Signposting",
      title: "Helping People Find the Right Support",
      icon: "signposting",
      lead: "Sometimes the most important thing is knowing where to go. OneVoice can provide information and signposting relating to:",
      items: [
        "Employment",
        "Education",
        "Training",
        "Housing",
        "Welfare",
        "Health",
        "Wellbeing",
        "Domestic abuse",
        "Legal services",
        "Immigration services",
        "Family services",
        "Community organisations",
        "Specialist charities",
      ],
      closing:
        "OneVoice does not replace regulated professional advice and will refer participants to appropriate specialist providers.",
    },
    {
      name: "Advocacy & Referral",
      title: "Helping People Navigate Services",
      icon: "advocacy",
      lead: "Where appropriate and within the scope of our programmes, OneVoice can help participants understand:",
      items: [
        "Which service may be appropriate",
        "How to contact an organisation",
        "What information they may need",
        "How to prepare for an appointment",
        "Where specialist support may be available",
      ],
      closing: "We can develop referral partnerships with specialist organisations across London.",
    },
    {
      name: "New Arrival & Settlement Support",
      title: "Starting a New Life in the UK",
      icon: "arrival",
      lead: "People who are new to the UK may need help understanding:",
      items: [
        "Local services",
        "Education",
        "Employment",
        "Healthcare access",
        "Housing",
        "Transport",
        "Banking",
        "Digital services",
        "Community life",
        "UK workplace culture",
        "Education systems",
      ],
      closing:
        "OneVoice can provide introductory information, orientation and signposting to appropriate specialist services.",
    },
  ] satisfies {
    name: string;
    title: string;
    icon: AdviceIcon;
    lead: string;
    items: string[];
    closing: string;
  }[],
} as const;

/* -------------------------------------------------------------------------
   CLOSING CALL TO ACTION
   The brief's "Do You Know Someone Who Could Benefit?" block (closing its
   Advocacy & Referral copy). Its fourteen referrers are set as one sentence
   so the banner stays a few lines tall.
   ------------------------------------------------------------------------- */

export const programmesCta = {
  kicker: brand.centre,
  titleLead: "Do You Know Someone",
  titleAccent: "Who Could Benefit?",
  description:
    "We welcome referrals and partnerships with women's organisations, schools, colleges and universities, local authorities, faith and community groups, employers, employment, housing and community organisations, charities, health and wellbeing organisations, family members and friends, as well as self-referrals.",
  primaryCta: { label: "Refer Someone", href: `${routes.getInvolved}#refer-someone` },
  secondaryCta: { label: "Register Your Interest", href: enquiryHref("interest") },
  image: standIn(photo.parkGathering, "programmes-cta.jpg"),
} as const;

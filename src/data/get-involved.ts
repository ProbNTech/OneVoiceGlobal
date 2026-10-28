/**
 * Copy and media for the Get Involved page (`src/app/(site)/get-involved/page.tsx`).
 *
 * Every line comes from the brief. The page is built from its GET INVOLVED
 * block (Refer Someone, For Individuals, For Young People, For Men, Donate,
 * Partner With OneVoice), the same word for word in Draft01 and V.2, and
 * from the Foundation's own "Support our Work" block (V.2), which opens the
 * page. Volunteering has no block of its own under Get Involved, so its
 * section takes the brief's VOLUNTEERING block from Community, and Sponsor a
 * Programme takes the "Invest in Opportunity" close of the brief's Funders
 * block. For Community Organisations is carried on the Partners page.
 *
 * The strip under the hero is the brief's Get Involved sub-menu, and each
 * section's id is the anchor the menu builds from its label.
 *
 * Calls to act that need the client to supply something (a donation link)
 * open the Contact page's form, with their own kind of enquiry chosen,
 * until it arrives.
 *
 * IMAGES. A slot marked `pending` is waiting for a generated image (file
 * name, pixel size and prompt are in `_source/get-involved-media-brief.md`);
 * until it arrives `src` is the closest existing photograph, and swapping it
 * is a one-line change to `src`. Alt text describes only what the frame
 * shows: none of these people is presented as a OneVoice participant,
 * volunteer or member of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, ctas, enquiryHref, navigation, routes } from "@/data/site";

const photo = {
  communityPantry: {
    src: "/images/HomePageHeroSection2.png",
    alt: "Volunteers handing a box of groceries to a woman at a community food distribution",
    position: "60% 40%",
  },
  learningLaptop: {
    src: "/images/Photo 1.png",
    alt: "A woman in a pink headscarf working on a laptop beside a smiling tutor at a shared desk",
    position: "40% 50%",
  },
  screenHelp: {
    src: "/images/about/What-we-do/What-we-do-image-4.png",
    alt: "A woman pointing at a desktop screen while an older man beside her works the mouse, in a bright open learning space",
    position: "50% 50%",
  },
  adviserLeaflet: {
    src: "/images/about/What-we-do/What-we-Do-image-6.png",
    alt: "An adviser pointing to a printed leaflet on a low table while a woman seated beside her looks on",
    position: "50% 50%",
  },
  youngLaptops: {
    src: "/images/OurWorkHeroSection1.png",
    alt: "Young adults working together on laptops around an office table",
    position: "50% 35%",
  },
  outreachVolunteers: {
    src: "/images/community/outreach-volunteers.jpg",
    alt: "Volunteers in high-visibility vests chatting with residents outside beside a rail of donated clothes",
    position: "55% 45%",
  },
  foodSupport: {
    src: "/images/HomePageHeroSection1.png",
    alt: "A smiling volunteer handing a box of food and clothing across a counter",
    position: "45% 40%",
  },
  trainer: {
    src: "/images/about/What-we-do/what-we-do-image-1.png",
    alt: "A trainer at a whiteboard explaining a diagram to five people seated around a table with notebooks and laptops",
    position: "50% 50%",
  },
  rooftopCircle: {
    src: "/images/about/What-we-do/What-We-Do-image-7.png",
    alt: "Seven people sitting in a circle talking on a planted rooftop terrace at sunset, the London skyline behind them",
    position: "50% 60%",
  },
  professionals: {
    src: "/images/community/professionals-collaborating.jpg",
    alt: "Professionals gathered round a table of laptops and printed charts, talking and smiling together",
    position: "55% 45%",
  },
  workshop: {
    src: "/images/community/community-workshop.jpg",
    alt: "A facilitator at a whiteboard leading a workshop for adults seated at tables in a bright, modern community space",
    position: "50% 50%",
  },
  conference: {
    src: "/images/about/What-we-do/What-we-do-image-9.png",
    alt: "A speaker with a microphone addressing a seated audience in a conference hall",
    position: "50% 50%",
  },
  gathering: {
    src: "/images/community/community-gathering.jpg",
    alt: "Residents of different ages sharing a table and talking together at a busy community gathering in a hall",
    position: "50% 50%",
  },
} satisfies Record<string, HomeImage>;

/** A stand-in for a slot still waiting for its own photograph. */
const standIn = (image: HomeImage, pending: string): HomeImage => ({ ...image, pending });

/** The anchors the menu builds for this page's sections. */
const anchors = navigation.find((item) => item.label === "Get Involved")?.children ?? [];
const anchorFor = (label: string) => anchors.find((link) => link.label === label)?.href ?? routes.getInvolved;
const idOf = (label: string) => anchorFor(label).split("#")[1] ?? "";

/* -------------------------------------------------------------------------
   HERO
   The brief's "Support our Work" block: its subtitle as the headline, its
   opening sentence beneath and its closing sentence on the card over the
   collage.
   ------------------------------------------------------------------------- */

export const getInvolvedHero = {
  kicker: "Get Involved",
  title: ["Help Build", "Stronger Communities."],
  description:
    "Lasting change requires people and organisations willing to contribute their time, knowledge, resources and influence.",
  primaryCta: { label: "Volunteer", href: anchorFor("Volunteer") },
  secondaryCta: { label: "Donate", href: anchorFor("Donate") },
  card: "Together, we can help build communities where people feel heard, supported and equipped to shape their own futures.",
  images: {
    main: standIn(photo.communityPantry, "get-involved-hero.jpg"),
    inset: standIn(photo.learningLaptop, "get-involved-hero-inset.jpg"),
  },
} as const;

/**
 * The strip under the hero: the brief's Get Involved sub-menu, read from the
 * navigation so the strip and the header's dropdown always list the same
 * sections.
 */
export const getInvolvedSections = { label: "Get Involved", links: anchors };

/* -------------------------------------------------------------------------
   SUPPORT OUR WORK
   ------------------------------------------------------------------------- */

export const getInvolvedWays = {
  id: "support-our-work",
  kicker: "Support Our Work",
  /* The brief's lead-in ("You can support OneVoice Global Foundation by:"),
     set as the heading. */
  titleLead: "You Can Support",
  titleAccent: brand.name,
  /**
   * The brief's five ways, in its order. Each leads to where the page (or
   * site) takes it further, and has a photograph that takes the frame
   * beside the list while it is pointed at.
   */
  ways: [
    {
      title: "Become a partner",
      line: "Collaborate with us to develop and deliver community programmes.",
      link: { label: "Become a Partner", href: anchorFor("Become a Partner") },
      image: standIn(photo.professionals, "support-partner.jpg"),
    },
    {
      title: "Volunteer your expertise",
      line: "Share your professional knowledge, mentoring skills or local experience.",
      link: { label: "Volunteer", href: anchorFor("Volunteer") },
      image: standIn(photo.screenHelp, "support-volunteer.jpg"),
    },
    {
      title: "Support a programme",
      line: "Explore opportunities to fund or sponsor initiatives that address identified community needs.",
      link: { label: "Sponsor a Programme", href: anchorFor("Sponsor a Programme") },
      image: standIn(photo.workshop, "support-programme.jpg"),
    },
    {
      title: "Join our network",
      line: "Connect with community organisations, professionals, businesses and supporters working towards shared goals.",
      link: { label: "Community & Business Network", href: `${routes.community}#community-networks` },
      image: standIn(photo.conference, "support-network.jpg"),
    },
    {
      title: "Help us reach more people",
      line: "Share our work and help connect individuals and organisations with relevant opportunities.",
      link: { label: "Refer Someone", href: anchorFor("Refer Someone") },
      image: standIn(photo.gathering, "support-reach.jpg"),
    },
  ] satisfies { title: string; line: string; link: { label: string; href: string }; image: HomeImage }[],
} as const;

/* -------------------------------------------------------------------------
   REFER SOMEONE
   ------------------------------------------------------------------------- */

export type ReferrerIcon =
  | "community"
  | "employers"
  | "colleges"
  | "universities"
  | "housing"
  | "charities"
  | "health"
  | "family"
  | "friends"
  | "self";

export type StepIcon = "refer" | "conversation" | "assessment" | "plan" | "programme" | "review";

export const getInvolvedRefer = {
  id: idOf("Refer Someone"),
  kicker: "Refer Someone",
  titleLead: "Help Someone",
  titleAccent: "Take the Next Step",
  lead: "People can be referred by:",
  referrers: [
    { label: "Community organisations", icon: "community" },
    { label: "Employers", icon: "employers" },
    { label: "Colleges", icon: "colleges" },
    { label: "Universities", icon: "universities" },
    { label: "Housing organisations", icon: "housing" },
    { label: "Charities", icon: "charities" },
    { label: "Health and wellbeing partners", icon: "health" },
    { label: "Family members", icon: "family" },
    { label: "Friends", icon: "friends" },
    { label: "Self-referral", icon: "self" },
  ] satisfies { label: string; icon: ReferrerIcon }[],
  note: "Eligibility may vary according to individual programmes and funding requirements.",
  image: standIn(photo.adviserLeaflet, "refer-someone.jpg"),
} as const;

/* -------------------------------------------------------------------------
   REFERRAL PROCESS
   The brief's "Referral Process" under Refer Someone, set out as the steps
   it lists, with the brief's [Get Support] call beneath.
   ------------------------------------------------------------------------- */

export const getInvolvedProcess = {
  id: "referral-process",
  kicker: brand.centre,
  titleLead: "Referral",
  titleAccent: "Process",
  steps: [
    { label: "Refer", icon: "refer" },
    { label: "Initial Conversation", icon: "conversation" },
    { label: "Needs Assessment", icon: "assessment" },
    { label: "Support Plan", icon: "plan" },
    { label: "Programme", icon: "programme" },
    { label: "Progress Review", icon: "review" },
  ] satisfies { label: string; icon: StepIcon }[],
  cta: ctas.support,
} as const;

/* -------------------------------------------------------------------------
   FOR INDIVIDUALS, FOR YOUNG PEOPLE, FOR MEN
   ------------------------------------------------------------------------- */

export const getInvolvedJourney = {
  id: "start-your-journey",
  /** The brief's heading for its For Individuals block, over all three. */
  kicker: "For Individuals, Young People and Men",
  titleLead: "Start Your",
  titleAccent: "OneVoice Journey",
  individuals: {
    label: "For Individuals",
    lead: "You may be looking for:",
    items: [
      "A job",
      "New skills",
      "Better English",
      "Digital training",
      "Career guidance",
      "Business support",
      "Mentoring",
      "Wellbeing support",
      "Community connections",
      "Domestic abuse support",
      "Confidence",
      "A new direction",
    ],
  },
  youngPeople: {
    label: "For Young People",
    title: "Your Future Starts Here",
    text: "Whether you are looking for your first job, considering further education, exploring an apprenticeship or thinking about starting a business, OneVoice can help you understand your options.",
    motto: "Learn. Explore. Develop. Progress.",
    image: standIn(photo.youngLaptops, "young-people.jpg"),
  },
  men: {
    label: "For Men",
    title: "Dedicated Opportunities for Men",
    lead: "Where appropriate, OneVoice provides programmes addressing community needs affecting men, including:",
    items: [
      "Employment",
      "Skills",
      "Digital inclusion",
      "Enterprise",
      "Mentoring",
      "Career development",
      "Financial capability",
      "Wellbeing",
      "Community participation",
    ],
  },
} as const;

/* -------------------------------------------------------------------------
   VOLUNTEER
   The brief's VOLUNTEERING block (under Community).
   ------------------------------------------------------------------------- */

export type RoleIcon =
  | "mentoring"
  | "digital"
  | "employment"
  | "admin"
  | "outreach"
  | "events"
  | "enterprise"
  | "translation"
  | "fundraising"
  | "communications"
  | "peer";

export const getInvolvedVolunteer = {
  id: idOf("Volunteer"),
  kicker: "Volunteer",
  titleLead: "Share Your Skills.",
  titleAccent: "Make a Difference.",
  lead: "Volunteers can contribute their time and expertise to:",
  roles: [
    { label: "Mentoring", icon: "mentoring" },
    { label: "Digital support", icon: "digital" },
    { label: "Employment support", icon: "employment" },
    { label: "Administration", icon: "admin" },
    { label: "Community outreach", icon: "outreach" },
    { label: "Event support", icon: "events" },
    { label: "Enterprise mentoring", icon: "enterprise" },
    { label: "Translation and communication", icon: "translation" },
    { label: "Fundraising", icon: "fundraising" },
    { label: "Communications", icon: "communications" },
    { label: "Peer support", icon: "peer" },
  ] satisfies { label: string; icon: RoleIcon }[],
  note: "Appropriate recruitment, safeguarding and role-specific procedures will apply.",
  /* The brief's call to action label for volunteering ("Register Your
     Interest"), from its website guidance. */
  cta: { label: "Register Your Interest", href: enquiryHref("volunteer") },
  image: standIn(photo.outreachVolunteers, "volunteer.jpg"),
} as const;

/* -------------------------------------------------------------------------
   DONATE
   ------------------------------------------------------------------------- */

export type DonationIcon =
  "training" | "digital" | "materials" | "mentoring" | "activities" | "employment" | "youth" | "wellbeing";

export const getInvolvedDonate = {
  id: idOf("Donate"),
  kicker: "Donate",
  titleLead: "Support Skills.",
  titleAccent: "Support Opportunity.",
  lead: "Your donation can help provide:",
  items: [
    { label: "Training", icon: "training" },
    { label: "Digital access", icon: "digital" },
    { label: "Learning materials", icon: "materials" },
    { label: "Mentoring", icon: "mentoring" },
    { label: "Community activities", icon: "activities" },
    { label: "Employment support", icon: "employment" },
    { label: "Youth programmes", icon: "youth" },
    { label: "Wellbeing initiatives", icon: "wellbeing" },
  ] satisfies { label: string; icon: DonationIcon }[],
  closing: "Every contribution can help create another opportunity.",
  /* [Donate Now] opens the Contact form until the client supplies a donation link. */
  cta: { label: "Donate Now", href: enquiryHref("donate") },
  image: standIn(photo.foodSupport, "donate.jpg"),
} as const;

/* -------------------------------------------------------------------------
   BECOME A PARTNER and SPONSOR A PROGRAMME
   ------------------------------------------------------------------------- */

export const getInvolvedPartner = {
  id: idOf("Become a Partner"),
  /** The brief's PARTNER WITH ONEVOICE block. */
  kicker: "Partner With OneVoice",
  title: "Together We Can Create More Opportunities",
  lead: "OneVoice welcomes strategic partners who share our commitment to:",
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
  cta: { label: "Become a Partner", href: enquiryHref("partner") },
  /** The Partners page, for the kinds of partnership in full. */
  more: { label: "Our Partnerships", href: routes.partners },
} as const;

export const getInvolvedSponsor = {
  id: idOf("Sponsor a Programme"),
  kicker: "Sponsor a Programme",
  /** The close of the brief's Funders block. */
  title: "Invest in Opportunity",
  lead: "Your support can help people access:",
  outcomes: "Skills. Employment. Enterprise. Digital Opportunity. Wellbeing. Independence.",
  listLabel: "Funding can support:",
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
  cta: { label: "Sponsor a Programme", href: enquiryHref("sponsor") },
  image: standIn(photo.trainer, "sponsor.jpg"),
} as const;

/* -------------------------------------------------------------------------
   CLOSING CALL TO ACTION
   The close of the brief's For Individuals block, as the banner's title,
   with the Centre's offer from its homepage call to action beneath.
   ------------------------------------------------------------------------- */

export const getInvolvedCta = {
  kicker: brand.centre,
  titleLead: "You Don't Have to Have Everything Figured Out.",
  titleAccent: "Start With One Conversation.",
  description:
    "Whether you want to learn a new skill, find work, start a business, improve your digital confidence, connect with other people or access support, OneVoice Skill Development Centre is here to help you take the next step.",
  primaryCta: ctas.support,
  secondaryCta: { label: "Refer Someone", href: anchorFor("Refer Someone") },
  image: standIn(photo.rooftopCircle, "get-involved-cta.jpg"),
} as const;

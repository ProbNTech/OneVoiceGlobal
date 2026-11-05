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
 * IMAGES. Each photograph was generated for its slot and cut to the slot's
 * exact size (first-set prompts in `_source/get-involved-media-brief.md`).
 * Most come from the second set (3 November 2026,
 * `_source/generated/tools/make_prompts_v2_pages2.py`), with varied
 * settings, clothes and faces, saved under /images/get-involved/ as
 * `<slot>-v2.jpg` (originals in `_source/generated/v2-pages2/`); some keep
 * their first-set photograph (FIRST_SET below), so the page mixes both sets.
 * The slots in THIRD_SET show a third set (3 and 4 November 2026,
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

import type { HomeImage } from "@/data/home";
import { brand, ctas, enquiryHref, navigation, routes } from "@/data/site";

/* Some of the page's first-set photographs stay among the new ones, at the user's request (3 November
   2026; those that shared one bright room moved to new places on 4 November). These slots show their
   first-set file; the rest show `<slot>-v2.jpg` or, in THIRD_SET, `<slot>-v3.jpg`. */
const FIRST_SET = new Set(["young-people", "support-reach"]);

/* The client's mix of people across the site (3 November 2026): about 40% White British and European, 30%
   South Asian, 15% Black, 10% Arab and 5% mixed or other, counted by each photo's main person. These slots
   show a third-set photograph (`<slot>-v3.jpg`), cast towards that mix and set in its own relevant place. */
const THIRD_SET = new Set([
  "get-involved-hero-inset",
  "support-partner",
  "support-network",
  "donate",
  "sponsor",
  "get-involved-cta",
]);

/** A photograph generated for its slot, saved under /images/get-involved/ (FIRST_SET and THIRD_SET say which file it shows). */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/get-involved/${file}${FIRST_SET.has(file) ? "" : THIRD_SET.has(file) ? "-v3" : "-v2"}.jpg`,
  alt,
  position,
});

const photo = {
  hero: shot(
    "get-involved-hero",
    "A young woman in a mustard hijab handing a box of groceries to an older woman in a maroon shawl, a volunteer stacking boxes behind",
  ),
  heroInset: shot(
    "get-involved-hero-inset",
    "An older man in a flat cap and a teenage girl in a lavender jumper laughing as they repot herbs in a polytunnel",
  ),
  partner: shot(
    "support-partner",
    "A man in a charcoal suit and a woman in a mustard blazer signing an agreement at a table as two colleagues clap behind them in a site office",
  ),
  volunteer: shot(
    "support-volunteer",
    "A woman in reading glasses and a young woman in a mustard hijab going through receipts with a calculator at a table",
  ),
  programme: shot(
    "support-programme",
    "A tutor helping a young woman in a black hijab guide fabric through a sewing machine, other learners sewing behind them",
  ),
  network: shot(
    "support-network",
    "A young man in a rust jumper and an older woman in a burgundy blazer laughing as they talk at a breakfast table in a cricket pavilion",
  ),
  reach: shot(
    "support-reach",
    "A young man filming an older woman in a teal headscarf on a phone on a small tripod as she talks in a garden",
  ),
  refer: shot(
    "refer-someone",
    "An adviser shaking hands with a woman in a blue hijab at a reception desk, her young son beside her and a teacher looking on",
  ),
  youngPeople: shot(
    "young-people",
    "Young people laughing as they paint a colourful mural of leaves and shapes on a garden wall",
    "50% 10%",
  ),
  homework: shot(
    "volunteer",
    "A young woman in a coral hijab reading a picture book with two young children who point at the page, smiling",
  ),
  donate: shot(
    "donate",
    "A woman lifting a cleaned laptop out of a box held by a smiling man in a green fleece in a laptop refurbishment workshop",
  ),
  sponsor: shot(
    "sponsor",
    "Adult learners at laptops along rows of desks on a training floor, a young woman in a mustard jumper raising her hand as the trainer walks between them",
  ),
  cta: shot(
    "get-involved-cta",
    "Volunteers of all ages laughing in a wide circle of chairs under a brick railway arch as one of them introduces herself, mugs of tea in hand",
  ),
} satisfies Record<string, HomeImage>;

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
    main: photo.hero,
    inset: photo.heroInset,
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
      image: photo.partner,
    },
    {
      title: "Volunteer your expertise",
      line: "Share your professional knowledge, mentoring skills or local experience.",
      link: { label: "Volunteer", href: anchorFor("Volunteer") },
      image: photo.volunteer,
    },
    {
      title: "Support a programme",
      line: "Explore opportunities to fund or sponsor initiatives that address identified community needs.",
      link: { label: "Sponsor a Programme", href: anchorFor("Sponsor a Programme") },
      image: photo.programme,
    },
    {
      title: "Join our network",
      line: "Connect with community organisations, professionals, businesses and supporters working towards shared goals.",
      link: { label: "Community & Business Network", href: `${routes.community}#community-networks` },
      image: photo.network,
    },
    {
      title: "Help us reach more people",
      line: "Share our work and help connect individuals and organisations with relevant opportunities.",
      link: { label: "Refer Someone", href: anchorFor("Refer Someone") },
      image: photo.reach,
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
  image: photo.refer,
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
    image: photo.youngPeople,
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
  image: photo.homework,
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
  image: photo.donate,
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
  image: photo.sponsor,
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
  image: photo.cta,
} as const;

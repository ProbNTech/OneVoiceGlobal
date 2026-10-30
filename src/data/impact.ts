/**
 * Copy and media for the Impact page (`src/app/(site)/impact/page.tsx`).
 *
 * The brief's IMPACT block (the same word for word in Draft01 and V.2) is
 * short: OUR IMPACT ("Measuring What Matters", the sixteen things OneVoice
 * will track and its Impact Framework) and SUCCESS STORIES ("Real People.
 * Real Progress." and six example journeys). Its third menu entry, Reports,
 * has no copy of its own. The rest of the page borrows the brief's own lines
 * on measuring and reporting from elsewhere, each noted beside it: the
 * "Measuring Our Impact" indicators of the three Seminars & Workshops
 * programmes (V.2), the Foundation's "Accountability and impact" principle
 * (V.2) and the community surveys and anonymised findings that its
 * OneVoice Community offering and Research & Community Voice block name.
 *
 * Nothing here is a result. The brief gives no figures and no participant
 * stories yet: the page shows what OneVoice will measure, never a number,
 * and its success stories are the brief's own examples of the journeys a
 * story may describe. Reports says plainly that none has been published.
 *
 * IMAGES. Each photograph was generated for its slot (prompts in
 * `_source/generated/tools/make_prompts_impact.py`) and cut to the slot's
 * exact size; the originals are kept in `_source/generated/`. No photograph
 * here is used anywhere else on the site. Alt text describes only what the
 * frame shows: none of these people is presented as a OneVoice participant
 * or member of staff.
 */

import type { HomeImage } from "@/data/home";
import { ctas, enquiryHref, navigation, routes } from "@/data/site";

/** A photograph generated for its slot, saved under /images/impact/ by the slot's file name. */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/impact/${file}.jpg`,
  alt,
  position,
});

const photo = {
  heroEngage: shot(
    "impact-hero-engage",
    "A smiling woman holding open the front door of a bright community centre for a young woman arriving",
  ),
  heroDevelop: shot(
    "impact-hero-develop",
    "A man in a work apron learning to use a drill at a workbench as a tutor beside him guides his hands",
  ),
  heroProgress: shot(
    "impact-hero-progress",
    "A young woman in a hijab and hi-vis vest walking through a warehouse as a colleague points the way",
  ),
  stories: shot(
    "impact-stories",
    "A woman laughing with a younger colleague over a tablet at a shared desk in a busy office",
  ),
  reports: shot(
    "impact-reports",
    "A young woman with a clipboard listening as an older man in a flat cap talks on a bench outside a building",
  ),
  cta: shot("impact-cta", "People of different ages and backgrounds talking in small groups in a bright hall"),
} satisfies Record<string, HomeImage>;

/** The anchors the menu builds for this page's sections. */
const anchors = navigation.find((item) => item.label === "Impact")?.children ?? [];
const anchorFor = (label: string) => anchors.find((link) => link.label === label)?.href ?? routes.impact;
const idOf = (label: string) => anchorFor(label).split("#")[1] ?? "";

/* -------------------------------------------------------------------------
   HERO
   OUR IMPACT's subtitle as the headline, its opening sentence beneath, then
   the purpose the brief gives the Foundation in its homepage block ("Its
   purpose is…", written in the first person here). On the card, the
   heading of SUCCESS STORIES, leading down to them.
   ------------------------------------------------------------------------- */

export const impactHero = {
  kicker: "Impact",
  titleLead: "Measuring",
  titleAccent: "What Matters",
  description: [
    "OneVoice will measure participation, progression and outcomes.",
    "Our purpose is to help communities access opportunities, strengthen participation and turn identified local needs into practical, measurable action.",
  ],
  primaryCta: { label: "Become a Partner", href: ctas.partner.href },
  secondaryCta: { label: "Success Stories", href: anchorFor("Success Stories") },
  card: { label: "Success Stories", line: "Real People. Real Progress.", href: anchorFor("Success Stories") },
  /** Three photographs that rise from left to right. */
  images: [photo.heroEngage, photo.heroDevelop, photo.heroProgress],
} as const;

/** The strip under the hero: the page's three sections, read from the navigation. */
export const impactSections = { label: "Impact", links: anchors };

/* -------------------------------------------------------------------------
   OUR IMPACT
   The sixteen things OneVoice will track ("We track:"), each with an icon.
   The title is made from the block's own words.
   ------------------------------------------------------------------------- */

export type TrackIcon =
  | "engaged"
  | "participants"
  | "hours"
  | "skills"
  | "digital"
  | "cvs"
  | "employment"
  | "progression"
  | "enterprise"
  | "businesses"
  | "mentoring"
  | "wellbeing"
  | "referrals"
  | "volunteers"
  | "employers"
  | "community";

export const impactTracking = {
  id: idOf("Our Impact"),
  kicker: "Our Impact",
  titleLead: "What We",
  titleAccent: "Track",
  lead: "OneVoice will measure participation, progression and outcomes. We track:",
  measures: [
    { label: "People engaged", icon: "engaged" },
    { label: "Programme participants", icon: "participants" },
    { label: "Training hours", icon: "hours" },
    { label: "Skills developed", icon: "skills" },
    { label: "Digital skills gained", icon: "digital" },
    { label: "CVs completed", icon: "cvs" },
    { label: "Employment outcomes", icon: "employment" },
    { label: "Training progression", icon: "progression" },
    { label: "Enterprise starts", icon: "enterprise" },
    { label: "Businesses supported", icon: "businesses" },
    { label: "Mentoring relationships", icon: "mentoring" },
    { label: "Wellbeing participation", icon: "wellbeing" },
    { label: "Referrals", icon: "referrals" },
    { label: "Volunteer participation", icon: "volunteers" },
    { label: "Employer partnerships", icon: "employers" },
    { label: "Community activities", icon: "community" },
  ] satisfies { label: string; icon: TrackIcon }[],
} as const;

/* -------------------------------------------------------------------------
   OUR IMPACT FRAMEWORK
   The block's closing line, "Our Impact Framework: REACH→ENGAGE→DEVELOP→
   PROGRESS→SUSTAIN".
   ------------------------------------------------------------------------- */

export const impactFramework = {
  id: "impact-framework",
  kicker: "Our Impact",
  titleLead: "Our Impact",
  titleAccent: "Framework",
  steps: ["Reach", "Engage", "Develop", "Progress", "Sustain"],
} as const;

/* -------------------------------------------------------------------------
   MEASURING OUR SEMINARS & WORKSHOPS
   The "Measuring Our Impact" blocks of the three Seminars & Workshops
   programmes (V.2): Mental Health & Wellbeing's opening line as the lead,
   each programme's potential indicators, and two closing lines, on privacy
   (Mental Health & Wellbeing) and on how findings are used (Rights &
   Empowerment).
   ------------------------------------------------------------------------- */

const seminarLink = (label: string) =>
  navigation.find((item) => item.label === "Seminars & Workshops")?.children?.find((link) => link.label === label)
    ?.href ?? routes.seminars;

export const impactProgrammes = {
  id: "measuring-our-impact",
  kicker: "Seminars & Workshops",
  titleLead: "Measuring",
  titleAccent: "Our Impact",
  lead: "We want our programme to be informed by evidence and continuous learning.",
  listLabel: "Potential indicators include:",
  programmes: [
    {
      name: "Mental Health & Wellbeing",
      href: seminarLink("Mental Health & Wellbeing"),
      indicators: [
        "Number of seminars and workshops delivered",
        "Number of participants attending",
        "Participant feedback and satisfaction",
        "Changes in awareness and understanding of mental health",
        "Confidence in identifying appropriate sources of support",
        "Usefulness and accessibility of community-language materials",
        "Partnerships developed with relevant specialist organisations",
        "Improvements identified through participant feedback and programme evaluation",
      ],
    },
    {
      name: "Rights & Empowerment",
      href: seminarLink("Rights & Empowerment"),
      indicators: [
        "Number of seminars and workshops delivered",
        "Number and diversity of participants reached",
        "Improvements in awareness of relevant rights and services",
        "Increased confidence in locating reliable information",
        "Participation in financial literacy and personal empowerment activities",
        "Referrals and signposting to appropriate specialist organisations",
        "Participant feedback on accessibility and usefulness",
        "Partnerships established to improve community access to support",
      ],
    },
    {
      name: "Healthy Relationships",
      href: seminarLink("Healthy Relationships"),
      indicators: [
        "Number of seminars and workshops delivered",
        "Number of participants reached",
        "Increased understanding of healthy relationship characteristics",
        "Improved confidence in communication and boundary-setting",
        "Participant feedback on the relevance of workshop content",
        "Awareness of appropriate family and specialist support services",
        "Partnerships established with relevant community organisations and professionals",
      ],
    },
  ],
  privacy:
    "We will use appropriate, proportionate methods to evaluate our work while protecting participants' privacy and respecting their choices.",
  findings:
    "Findings will help us refine our programme, identify gaps and develop future activities around community needs.",
} as const;

/* -------------------------------------------------------------------------
   SUCCESS STORIES
   The brief's SUCCESS STORIES block, with its six example journeys split
   into where each starts and where it leads. The card over the photograph
   is the brief's line for Success Stories under NEWS & RESOURCES.
   ------------------------------------------------------------------------- */

export const impactStories = {
  id: idOf("Success Stories"),
  kicker: "Success Stories",
  titleLead: "Real People.",
  titleAccent: "Real Progress.",
  lead: "Participant stories can demonstrate the difference that support can make. Examples may include:",
  journeys: [
    { from: "unemployment", to: "employment" },
    { from: "digital exclusion", to: "digital confidence" },
    { from: "isolation", to: "community" },
    { from: "an idea", to: "a business" },
    { from: "a career break", to: "a new career" },
    { from: "low confidence", to: "leadership" },
  ],
  labels: { from: "From", to: "to" },
  card: "Stories of participants progressing through OneVoice.",
  image: photo.stories,
} as const;

/* -------------------------------------------------------------------------
   REPORTS
   The brief gives Reports no copy. Its heading and statement are the
   Foundation's "Accountability and impact" principle (V.2); what reports
   can draw on are the community surveys its OneVoice Community offering
   names (Draft01) and the anonymised findings of its Research & Community
   Voice block. The status line is the page's own, and says only that none
   has been published.
   ------------------------------------------------------------------------- */

export type ReportIcon = "surveys" | "findings";

export const impactReports = {
  id: idOf("Reports"),
  kicker: "Reports",
  titleLead: "Accountability",
  titleAccent: "and Impact",
  statement:
    "We aim to measure outcomes, learn from experience, use resources responsibly and communicate our progress transparently.",
  sources: [
    { text: "Community surveys and reports highlighting needs and proposed solutions.", icon: "surveys" },
    {
      text: "Anonymised findings, where appropriate, can help inform programme development and partnership discussions.",
      icon: "findings",
    },
  ] satisfies { text: string; icon: ReportIcon }[],
  /** On the card over the photograph. */
  status: "No reports have been published yet.",
  cta: { label: "Contact Us", href: routes.contact },
  image: photo.reports,
} as const;

/* -------------------------------------------------------------------------
   CLOSING CALL TO ACTION
   The brief's line for funders in WORK WITH US ("Invest in measurable
   social impact.") as the title, and the close of its Funders block beneath,
   its list set as a sentence.
   ------------------------------------------------------------------------- */

export const impactCta = {
  kicker: "Partner With OneVoice",
  titleLead: "Invest in Measurable",
  titleAccent: "Social Impact",
  description:
    "Your support can help people access skills, employment, enterprise, digital opportunity, wellbeing and independence.",
  primaryCta: { label: "Become a Partner", href: enquiryHref("partner") },
  secondaryCta: ctas.donate,
  image: photo.cta,
} as const;

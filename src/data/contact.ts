/**
 * Copy and media for the Contact page (`src/app/(site)/contact/page.tsx`).
 *
 * The brief's CONTACT US block gives the Centre's name, its headline, four
 * labels (Address, Telephone, Email, Website) with no values, and four social
 * platforms without links. The values live in `contact` in site.ts and show
 * on this page, as in the footer, as soon as the client supplies them.
 *
 * Everything else is the brief's own lines, borrowed from the blocks that
 * speak about getting in touch, as noted beside each: the close of its For
 * Individuals block and its welcome to enquiries (hero); the calls to act
 * that already lead here, each with a line from its own block (the form's
 * kinds of enquiry); its INFORMATION, ADVICE & SIGNPOSTING block; the
 * Foundation's Safeguarding, Confidentiality & Privacy and Accessibility &
 * Inclusion lines (V.2); and the 999 advice from its Rights & Empowerment
 * workshops. The form's field labels and messages are the only words not
 * taken from the brief.
 *
 * IMAGES. Each photograph was generated for its slot (prompts in
 * `_source/generated/tools/make_prompts_contact.py`) and cut to the slot's
 * exact size; the originals are kept in `_source/generated/`. No photograph
 * here is used anywhere else on the site. Alt text describes only what the
 * frame shows: none of these people is presented as a OneVoice participant
 * or member of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, ctas, enquiryHref, routes, type EnquiryTopic } from "@/data/site";

/** A photograph generated for its slot, saved under /images/contact/ by the slot's file name. */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/contact/${file}.jpg`,
  alt,
  position,
});

const photo = {
  hero: shot(
    "contact-hero",
    "A woman in a teal head wrap smiling as she talks on her phone in a bright lounge, a notepad on her knee",
  ),
  reply: shot(
    "contact-hero-reply",
    "An older man with a cup of tea and a young woman in a teal scarf laughing together on a sofa",
  ),
  enquiry: shot(
    "contact-enquiry",
    "A young man with a backpack shaking hands with a smiling woman in a teal cardigan just inside an open doorway",
  ),
  signposting: shot(
    "contact-signposting",
    "A man in a navy jacket walking beside an older man along a sunny high street, pointing the way ahead",
  ),
  cta: shot(
    "contact-cta",
    "People arriving, waiting on soft chairs and talking with staff at a long wooden desk in a bright reception area",
  ),
} satisfies Record<string, HomeImage>;

/* -------------------------------------------------------------------------
   HERO
   The close of the brief's For Individuals block ("You don't have to have
   everything figured out. Start with one conversation.") as the headline
   and the card, and its welcome to enquiries (Rights & Empowerment) beneath.
   ------------------------------------------------------------------------- */

export const contactHero = {
  kicker: "Contact Us",
  titleLead: "Start With",
  titleAccent: "One Conversation.",
  description:
    "We welcome enquiries from community organisations, professionals, educators, counsellors, legal specialists, volunteers and potential programme sponsors.",
  primaryCta: ctas.support,
  secondaryCta: { label: "Refer Someone", href: enquiryHref("refer") },
  card: "You don't have to have everything figured out.",
  images: {
    main: photo.hero,
    reply: photo.reply,
  },
} as const;

/**
 * The strip under the hero. Contact has no sub-menu, so the strip names the
 * page's own sections by their headings in the brief.
 */
export const contactSections = {
  label: "Contact",
  links: [
    { label: "Contact Us", href: "#contact-us" },
    { label: "Information & Signposting", href: "#information-and-signposting" },
    { label: "Keeping People Safe", href: "#keeping-people-safe" },
    { label: "Accessibility & Inclusion", href: "#accessibility-and-inclusion" },
  ],
};

/* -------------------------------------------------------------------------
   CONTACT US
   The brief's CONTACT US block beside the enquiry form.
   ------------------------------------------------------------------------- */

export const contactEnquiry = {
  id: "contact-us",
  kicker: brand.centre,
  titleLead: "Contact",
  titleAccent: "Us",
  lead: brand.headline,
  /** The brief's labels. Their values are `contact` in site.ts. */
  labels: { address: "Address", telephone: "Telephone", email: "Email", website: "Website" },
  socialLabel: "Social media",
  image: photo.enquiry,
  form: {
    topicsLabel: "What is your enquiry about?",
    /** The calls to act that lead to this form, each with a line from its own block in the brief. */
    topics: [
      {
        id: "support",
        label: "Get Support",
        // The Centre's homepage call to action, from its close.
        note: "OneVoice Skill Development Centre is here to help you take the next step.",
      },
      { id: "interest", label: "Register Your Interest", note: `${brand.motto.join(". ")}.` },
      {
        id: "refer",
        label: "Refer Someone",
        note: "Eligibility may vary according to individual programmes and funding requirements.",
      },
      {
        id: "volunteer",
        label: "Volunteer",
        note: "Appropriate recruitment, safeguarding and role-specific procedures will apply.",
      },
      // The brief's PARTNER WITH ONEVOICE subtitle.
      { id: "partner", label: "Become a Partner", note: "Together we can create more opportunities." },
      {
        id: "sponsor",
        label: "Sponsor a Programme",
        // The close of the brief's Funders block ("Invest in Opportunity"), its list set as a sentence.
        note: "Your support can help people access skills, employment, enterprise, digital opportunity, wellbeing and independence.",
      },
      { id: "donate", label: "Donate", note: "Every contribution can help create another opportunity." },
    ] satisfies { id: EnquiryTopic; label: string; note: string }[],
    fields: {
      name: "Your name",
      email: "Email",
      telephone: "Telephone",
      organisation: "Organisation",
      message: "Message",
      optional: "Optional",
    },
    /** The first line of the brief's Confidentiality & Privacy block, linked to the privacy policy it promises. */
    privacy: "We respect the privacy of people using our services.",
    privacyLink: { label: "Privacy Policy", href: routes.privacy },
    emergency: "If someone is in immediate danger in the UK, they should call 999.",
    submit: "Send Enquiry",
    sending: "Sending",
    errors: {
      topic: "Please choose what your enquiry is about.",
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      message: "Please write a short message.",
      summary: "Please check the fields marked below.",
    },
    status: {
      sent: "Thank you. Your enquiry has been sent.",
      /* Shown until the client confirms where enquiries should go (see
         deliverEnquiry in src/app/(site)/contact/actions.ts). */
      unavailable: "Online enquiries are not connected yet, so this message has not been sent.",
      failed: "Your enquiry could not be sent. Please try again.",
    },
  },
} as const;

/* -------------------------------------------------------------------------
   INFORMATION & SIGNPOSTING
   The brief's INFORMATION, ADVICE & SIGNPOSTING block.
   ------------------------------------------------------------------------- */

export type SignpostIcon =
  | "employment"
  | "education"
  | "training"
  | "housing"
  | "welfare"
  | "health"
  | "wellbeing"
  | "safety"
  | "legal"
  | "immigration"
  | "family"
  | "community"
  | "charities";

export const contactSignposting = {
  id: "information-and-signposting",
  kicker: "Information & Signposting",
  titleLead: "Helping People Find",
  titleAccent: "the Right Support",
  statement: "Sometimes the most important thing is knowing where to go.",
  lead: "OneVoice can provide information and signposting relating to:",
  topics: [
    { label: "Employment", icon: "employment" },
    { label: "Education", icon: "education" },
    { label: "Training", icon: "training" },
    { label: "Housing", icon: "housing" },
    { label: "Welfare", icon: "welfare" },
    { label: "Health", icon: "health" },
    { label: "Wellbeing", icon: "wellbeing" },
    { label: "Domestic abuse", icon: "safety" },
    { label: "Legal services", icon: "legal" },
    { label: "Immigration services", icon: "immigration" },
    { label: "Family services", icon: "family" },
    { label: "Community organisations", icon: "community" },
    { label: "Specialist charities", icon: "charities" },
  ] satisfies { label: string; icon: SignpostIcon }[],
  note: "OneVoice does not replace regulated professional advice and will refer participants to appropriate specialist providers.",
  image: photo.signposting,
} as const;

/* -------------------------------------------------------------------------
   KEEPING PEOPLE SAFE
   The Foundation's Safeguarding & Keeping People Safe, Confidentiality &
   Privacy and Accessibility & Inclusion lines (V.2), and the 999 advice
   from the brief's Rights & Empowerment workshops.
   ------------------------------------------------------------------------- */

export type SafetyIcon = "safeguarding" | "privacy" | "accessibility";

export const contactSafety = {
  id: "keeping-people-safe",
  kicker: "Safeguarding",
  titleLead: "Safeguarding &",
  titleAccent: "Keeping People Safe",
  blocks: [
    {
      id: "safeguarding",
      title: "Safeguarding",
      icon: "safeguarding",
      text: [
        "Safeguarding is central to our work. OneVoice will maintain appropriate safeguarding policies, procedures, training and referral arrangements.",
        "Where safeguarding concerns arise, appropriate action will be taken in accordance with relevant procedures and legal requirements.",
      ],
    },
    {
      id: "confidentiality-and-privacy",
      title: "Confidentiality & Privacy",
      icon: "privacy",
      text: [
        "We respect the privacy of people using our services. Personal information will be handled responsibly in accordance with applicable data protection requirements and our privacy policy.",
        "There may be circumstances where information must be shared to protect someone from serious harm or where required by law.",
      ],
    },
    {
      id: "accessibility-and-inclusion",
      title: "Accessibility & Inclusion",
      icon: "accessibility",
      text: ["We aim to make our services accessible to people with different:"],
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
  ] satisfies { id: string; title: string; icon: SafetyIcon; text: string[]; list?: string[]; closing?: string }[],
  emergency: {
    number: "999",
    text: "If someone is in immediate danger in the UK, they should call 999.",
    detail:
      "Where it is unsafe to speak, the 999 operators can provide instructions for using the Silent Solution when appropriate.",
  },
} as const;

/* -------------------------------------------------------------------------
   CLOSING CALL TO ACTION
   The brief's closing line as the banner's title, the Centre's statement
   from the homepage hero beneath, and two of its call-to-action labels.
   ------------------------------------------------------------------------- */

export const contactCta = {
  kicker: brand.centre,
  titleLead: "One Person. One Voice.",
  titleAccent: "One Opportunity at a Time.",
  description:
    "OneVoice Skill Development Centre supports people from ethnic minority, disadvantaged and underserved communities across London to develop skills, build confidence, access employment, explore enterprise, improve digital capability, strengthen wellbeing and connect with their communities.",
  primaryCta: { label: "Explore Programmes", href: routes.programmes },
  secondaryCta: { label: "Volunteer", href: `${routes.getInvolved}#volunteer` },
  image: photo.cta,
} as const;

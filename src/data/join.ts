/**
 * The Join page (`src/app/(site)/join/`): the short landing page the client
 * sends round on WhatsApp, so people can leave their details and then join
 * the community group.
 *
 * Every line here is the brief's own: `brand` in site.ts carries the
 * headline, tagline, motto and closing line, and the eight support titles
 * and lines are the home page's "What We Deliver" items (homeProgrammes in
 * data/home.ts), repeated here so the visitor sees at a glance what they are
 * signing up to. The "Who We Support" groups are the brief's own list
 * (homeWhoWeSupport). Nothing is added: no new claims, dates or promises.
 *
 * The page carries no photographs. Every image on this site is used once
 * only, and this page's own slots have no pictures yet; they are listed in
 * `_source/join-media-brief.md` and can be added later.
 */

import { brand, contact, routes, whatsappGroup } from "./site";

export const joinHero = {
  kicker: brand.initiative,
  /** The brief's headline, split so the last part can be set in italic. */
  titleLead: "Empowering People. Building Skills.",
  titleAccent: "Creating Opportunities.",
  /** The brief's statement of what OneVoice is (homeIntro in data/home.ts). */
  description: `${brand.name} is a community empowerment and partnership platform. Leave your details and join our community group.`,
  /** The brief's motto, as the four steps along the foot of the hero. */
  motto: brand.motto,
} as const;

export type JoinSupportIcon =
  "skills" | "employability" | "digital" | "enterprise" | "english" | "mentoring" | "wellbeing" | "community";

export const joinSupport = {
  kicker: "What We Deliver",
  titleLead: "How OneVoice can",
  titleAccent: "support you",
  /* The home page's programme items, title and line as the brief writes them. */
  items: [
    { title: "Skills Development", line: "Develop practical skills for life and work.", icon: "skills" },
    { title: "Employability", line: "Become job ready and access employment opportunities.", icon: "employability" },
    { title: "Digital OneVoice", line: "Build confidence in the digital world.", icon: "digital" },
    { title: "OneVoice Enterprise", line: "Turn ideas into opportunities.", icon: "enterprise" },
    { title: "English & Communication", line: "Develop English and communication skills.", icon: "english" },
    { title: "Mentoring", line: "Get guidance and support from experienced people.", icon: "mentoring" },
    { title: "Wellbeing", line: "Build resilience, confidence and social connection.", icon: "wellbeing" },
    { title: "Community", line: "Connect, participate and build relationships.", icon: "community" },
  ] satisfies { title: string; line: string; icon: JoinSupportIcon }[],
  /* The brief's own note under Who We Support. */
  note: "Programme eligibility may vary depending on funding and individual programme criteria.",
  cta: { label: "View All Programmes", href: routes.programmes },
} as const;

export const joinForm = {
  id: "join-form",
  kicker: "Join OneVoice",
  titleLead: "Add your details in",
  titleAccent: "one minute",
  lead: "Tell us how to reach you. We will send you a welcome message and keep you posted about programmes near you.",
  fields: {
    name: "Full name",
    mobile: "Mobile number",
    whatsapp: "WhatsApp number",
    whatsappSame: "Same as my mobile number",
    email: "Email address",
    interest: "Interested in",
    optional: "Optional",
    choose: "Please choose",
  },
  /* The eight areas above, offered as a single choice, so the team knows
     where to point each person. */
  interests: joinSupport.items.map((item) => item.title),
  consent: "Yes, OneVoice may contact me about programmes, workshops and events.",
  consentValue: "Agreed",
  privacy: "We use your details only to contact you about OneVoice. Read our",
  privacyLink: { label: "Privacy Policy", href: routes.privacy },
  submit: "Join OneVoice",
  sending: "Sending…",
  errors: {
    summary: "Please check the fields marked below.",
    name: "Please give your name.",
    mobile: "Please give a mobile number.",
    email: "Please give a valid email address, or leave it blank.",
    consent: "Please tick the box so we may contact you.",
  },
  status: {
    failed: "Sorry, that did not go through. Please try again, or write to us at " + contact.email + ".",
  },
  /* The brief's emergency line, as the Contact page's form carries it. */
  emergency: "If someone is in immediate danger in the UK, please call 999.",
} as const;

/**
 * The thank-you panel, which takes the form's place once the details are in.
 * This is where the group link sits: WhatsApp lets nobody but the person
 * themselves join a group, so it has to be a link they tap.
 */
export const joinThanks = {
  titleLead: "Welcome to",
  titleAccent: "OneVoice",
  lead: "Thank you. We are glad to have your voice with us.",
  steps: [
    {
      title: "Join the group",
      line: "Tap below to join our community WhatsApp group.",
    },
    {
      title: "Watch for your welcome",
      line: "If you gave an email address, your welcome message is on its way.",
    },
    {
      title: "Take the next step",
      line: "Our team will be in touch about programmes near you.",
    },
  ],
  group: whatsappGroup,
  explore: { label: "Explore Our Services", href: routes.ourWork },
  closing: brand.closing,
} as const;

export const joinCta = {
  kicker: "Work With Us",
  titleLead: "Stronger Communities,",
  titleAccent: "Shared Opportunities",
  description: brand.tagline,
  primaryCta: { label: whatsappGroup.label, href: whatsappGroup.href },
  secondaryCta: { label: "Contact Us", href: routes.contact },
} as const;

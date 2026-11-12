/**
 * Copy and media for the Refugee & Asylum Seeker Support page
 * (`src/app/(site)/our-work/refugee-and-asylum-seeker-support/page.tsx`).
 *
 * Every line comes from the client's document "Refugee & Asylum Seeker
 * Support – OneVoice Global Foundation Website Content" (11 November 2026),
 * a new service under Our Work, in the document's order: its banner (the
 * service's name, its subtitle, its two opening paragraphs and its three
 * priorities), its three programmes (Asylum Seeker Support, Refugee
 * Community Sponsorship, Refugee Education and Employment, each with its
 * subtitle, paragraphs, list and closing line), Our Approach and its five
 * principles, Work With Us and its six invitations, Become a Supporter with
 * its four buttons, and Our Commitment. Each list item is the document's
 * name and line, split at its colon. The document gives no contact block,
 * so the page carries the site's enquiry form under Become a Supporter, and
 * every enquiry sent from it is recorded as this service's.
 *
 * Two small pieces of wording are the site's, not the document's: the
 * labels "Education" and "Employment" over the halves of the third
 * programme's list, which are the two halves of its name, and the shorter
 * names in the strip under the hero (each says which it shortens). The
 * three priorities keep the document's words, with a capital each.
 *
 * IMAGES. The document's five pictures are not used: two are drawn
 * pictures with printed signs (one with Canadian flags and a welcome
 * banner) and the others are photographs of real people whose source and
 * rights are unknown, so each slot has its own photograph, generated on
 * 12 November 2026 and cut to the slot's exact size (file names, sizes and
 * prompts in `_source/refugee-support-media-brief.md`), taking the
 * document's pictures only as a guide to the scenes. They are cast towards
 * the client's mix of people across the site and each is set in its own
 * relevant place. No photograph here is used anywhere else on the site.
 * Alt text describes only what the frame shows: nobody in these photographs
 * is presented as a refugee, an asylum seeker, a volunteer or a member of
 * staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, routes, type EnquiryContext, type EnquiryTopic } from "@/data/site";

/** A photograph generated for its slot, saved under /images/refugee-support/ by the slot's file name. */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/refugee-support/${file}.jpg`,
  alt,
  position,
});

const photo = {
  hero: shot(
    "refugee-hero",
    "A mother and her young daughter unpacking cups and plates in a sunny flat as an older woman hands the girl a tea towel",
  ),
  asylum: shot(
    "refugee-asylum",
    "A young mother choosing a winter coat for her son from a rail of coats in a brick-arched store as an older man holds one up",
  ),
  sponsorship: shot(
    "refugee-sponsorship",
    "A woman handing a set of house keys to a father at the front door of a terraced house, his family beside him and a man behind carrying a box of groceries",
  ),
  sponsorshipCircle: shot(
    "refugee-sponsorship-circle",
    "A woman handing a young boy a blue folder across a school office counter as his mother smiles beside him",
  ),
  education: shot(
    "refugee-education",
    "A woman in a mustard jumper speaking as four others listen and smile around a table in a library study room",
  ),
  employment: shot(
    "refugee-employment",
    "A young man learning to shape a loaf at a floured bench in a bakery kitchen as the baker shows him how",
  ),
  approach: shot(
    "refugee-approach",
    "A woman going through letters and a form with another woman, pen in hand, at a small round table",
  ),
  workWithUs: shot(
    "refugee-work-with-us",
    "An older man pointing something out to a young man on a laptop in a bright co-working space with brick walls",
  ),
} satisfies Record<string, HomeImage>;

/**
 * The page's sections, for the strip under the hero and its links. The page
 * stands on its own with no sub-menu, so the strip names its sections by
 * their headings in the document, the second and third shortened.
 */
const sections = {
  asylum: { label: "Asylum Seeker Support", id: "asylum-seeker-support" },
  // Shortened from "Refugee Community Sponsorship".
  sponsorship: { label: "Community Sponsorship", id: "refugee-community-sponsorship" },
  // Shortened from "Refugee Education and Employment".
  education: { label: "Education & Employment", id: "refugee-education-and-employment" },
  approach: { label: "Our Approach", id: "our-approach" },
  work: { label: "Work With Us", id: "work-with-us" },
  supporter: { label: "Become a Supporter", id: "become-a-supporter" },
} as const;

/** The page's enquiry form, opened with one kind of enquiry chosen. */
const formHref = (topic: EnquiryTopic) => `${routes.refugeeSupport}?enquiry=${topic}#${sections.supporter.id}`;

/** The document's four buttons, under Become a Supporter. */
const buttons = {
  volunteer: { label: "Become a Volunteer", href: formHref("volunteer") },
  partner: { label: "Partner with Us", href: formHref("partner") },
  support: { label: "Support Our Programmes", href: formHref("sponsor") },
  contact: { label: `Contact ${brand.name}`, href: routes.contact },
} as const;

/* -------------------------------------------------------------------------
   BANNER
   The service's name as the headline, its subtitle beneath, its two opening
   paragraphs and three of its buttons; its three priorities on the card
   at the photograph's foot.
   ------------------------------------------------------------------------- */

export const refugeeHero = {
  back: { label: "Our Work", href: routes.ourWork },
  titleLead: "Refugee & Asylum Seeker",
  titleAccent: "Support",
  subtitle: ["Providing Hope, Dignity and Opportunities", "for a New Beginning"],
  lead: `${brand.name} is committed to supporting refugees, asylum seekers and displaced individuals and families who face hardship, uncertainty and challenges in rebuilding their lives. We believe everyone deserves dignity, safety, compassion and the opportunity to build a better future, regardless of their background, nationality or circumstances.`,
  description:
    "Through humanitarian assistance, education, wellbeing services, community integration and partnership programmes, we aim to help vulnerable individuals access essential support, develop their potential and become active members of their communities.",
  primaryCta: buttons.support,
  secondaryCta: buttons.volunteer,
  tertiaryCta: buttons.partner,
  /** "Our approach is built around three priorities: relieving hardship, creating opportunities and building belonging." */
  priorities: {
    label: "Our approach is built around three priorities:",
    items: ["Relieving hardship", "Creating opportunities", "Building belonging"],
  },
  image: photo.hero,
} as const;

/** The strip under the hero. */
export const refugeeSections = {
  label: "Refugee Support",
  links: Object.values(sections).map(({ label, id }) => ({ label, href: `#${id}` })),
};

/* -------------------------------------------------------------------------
   1. ASYLUM SEEKER SUPPORT
   Its subtitle as the heading, its two paragraphs, its seven planned
   activities and its closing aim.
   ------------------------------------------------------------------------- */

export type AsylumIcon = "essentials" | "hardship" | "advice" | "health" | "english" | "integration" | "family";

export const refugeeAsylum = {
  id: sections.asylum.id,
  number: "01",
  kicker: "Asylum Seeker Support",
  titleLead: "Practical Assistance",
  titleAccent: "During Difficult Times",
  paragraphs: [
    "The asylum process can be a challenging and uncertain period for individuals and families. Many face financial hardship, social isolation, language barriers, emotional distress and difficulties accessing essential services.",
    `${brand.name} aims to provide practical and compassionate support to asylum seekers already living in the United Kingdom, helping them access appropriate services and maintain their dignity while navigating this difficult period.`,
  ],
  listLabel: "Our planned activities include:",
  items: [
    {
      icon: "essentials",
      name: "Essential Living Assistance",
      line: "Support with food, clothing, toiletries, household essentials and other basic necessities for eligible individuals and families.",
    },
    {
      icon: "hardship",
      name: "Emergency Hardship Support",
      line: "Signposting and, where funding permits, providing limited emergency financial or material assistance.",
    },
    {
      icon: "advice",
      name: "Advice and Guidance",
      line: "Helping individuals understand available public services and connecting them with appropriately qualified immigration advisers and legal support organisations.",
    },
    {
      icon: "health",
      name: "Health and Wellbeing",
      line: "Facilitating access to mental health awareness, counselling referrals, wellbeing activities and appropriate healthcare services.",
    },
    {
      icon: "english",
      name: "English Language Support",
      line: "Providing or facilitating English conversation groups, language learning and communication skills.",
    },
    {
      icon: "integration",
      name: "Community Integration",
      line: "Organising social gatherings, cultural activities, befriending and mentoring opportunities to reduce isolation.",
    },
    {
      icon: "family",
      name: "Family and Children's Support",
      line: "Supporting access to education, children's activities, parenting resources and appropriate family services.",
    },
  ] satisfies { icon: AsylumIcon; name: string; line: string }[],
  /** On the card at the photograph's foot. */
  aim: "Our aim is to ensure that people seeking protection are treated with compassion, respect and dignity, and are not left without access to essential community support.",
  image: photo.asylum,
} as const;

/* -------------------------------------------------------------------------
   2. REFUGEE COMMUNITY SPONSORSHIP
   Its subtitle as the heading, its aspiration and belief, its condition
   (on approvals) as a note, its seven proposed activities, which run from
   arrival to independence, and its closing line on who it will work with.
   ------------------------------------------------------------------------- */

export const refugeeSponsorship = {
  id: sections.sponsorship.id,
  number: "02",
  kicker: "Refugee Community Sponsorship",
  titleLead: "Bringing Communities Together",
  titleAccent: "to Welcome Refugees",
  lead: `${brand.name} aspires to participate in recognised refugee resettlement and community sponsorship programmes in the United Kingdom.`,
  paragraph:
    "We believe that welcoming refugees should be a shared community responsibility. Charities, local communities, businesses, educational institutions and volunteers can work together to help individuals and families rebuild their lives in a safe and supportive environment.",
  note: "Subject to obtaining the necessary approvals, accreditation or working through an authorised lead sponsor, we aim to develop community sponsorship partnerships to support eligible refugees arriving in the UK through recognised resettlement routes.",
  listLabel: "Our proposed activities include:",
  items: [
    { name: "Welcome and Reception", line: "Helping arrange a welcoming environment and practical arrival support." },
    {
      name: "Accommodation Support",
      line: "Working with approved partners to identify and prepare suitable accommodation.",
    },
    {
      name: "Initial Settlement",
      line: "Helping refugees access essential household items, local services and community resources.",
    },
    {
      name: "Healthcare and Education",
      line: "Facilitating GP registration, school enrolment and access to appropriate public services.",
    },
    {
      name: "Community Mentoring",
      line: "Connecting individuals and families with trained volunteers and local community networks.",
    },
    {
      name: "Language and Integration",
      line: "Supporting English language learning, cultural orientation and community participation.",
    },
    {
      name: "Long-term Independence",
      line: "Helping refugees develop the skills, confidence and connections needed to build independent lives.",
    },
  ],
  closing:
    "We aim to work with the Home Office, approved lead sponsors, local authorities, established refugee organisations and community partners to contribute to a responsible and sustainable approach to refugee resettlement.",
  images: { main: photo.sponsorship, circle: photo.sponsorshipCircle },
} as const;

/* -------------------------------------------------------------------------
   3. REFUGEE EDUCATION AND EMPLOYMENT
   Its subtitle as the heading, its two paragraphs, its eight planned
   initiatives in two halves (the four on learning, then the four on work,
   as the document lists them) and its closing ambition. The scholarships
   initiative leads to the Scholarships page.
   ------------------------------------------------------------------------- */

export type InitiativeIcon =
  "english" | "digital" | "vocational" | "scholarships" | "career" | "mentoring" | "employment" | "enterprise";

type Initiative = { icon: InitiativeIcon; name: string; line: string; link?: { label: string; href: string } };

export const refugeeEducation = {
  id: sections.education.id,
  number: "03",
  kicker: "Refugee Education and Employment",
  titleLead: "Building Skills, Confidence",
  titleAccent: "and Economic Independence",
  paragraphs: [
    "Education, skills development and access to meaningful employment are essential for refugees seeking to rebuild their lives and contribute positively to society.",
    `${brand.name} aims to create opportunities for refugees and displaced individuals to develop their knowledge, improve their skills and access pathways towards education, training and employment.`,
  ],
  listLabel: "Our planned initiatives include:",
  halves: [
    {
      // The first half of the programme's name.
      label: "Education",
      image: photo.education,
      items: [
        {
          icon: "english",
          name: "English Language and Communication",
          line: "Supporting English language development and confidence in everyday communication.",
        },
        {
          icon: "digital",
          name: "Digital Skills",
          line: "Providing opportunities to develop computer literacy, digital communication and essential technology skills.",
        },
        {
          icon: "vocational",
          name: "Vocational Training",
          line: "Facilitating access to practical training, professional development and industry-recognised learning opportunities.",
        },
        {
          icon: "scholarships",
          name: "Scholarships and Education",
          line: "Supporting eligible students through educational guidance, scholarships, learning resources and partnerships with educational institutions.",
          link: { label: "Explore Scholarships", href: routes.scholarships },
        },
      ] satisfies Initiative[],
    },
    {
      // The second half of the programme's name.
      label: "Employment",
      image: photo.employment,
      items: [
        {
          icon: "career",
          name: "Career Guidance",
          line: "Providing CV preparation, interview support, career advice and employment readiness programmes.",
        },
        {
          icon: "mentoring",
          name: "Professional Mentoring",
          line: "Connecting refugees with experienced professionals, entrepreneurs and business leaders.",
        },
        {
          icon: "employment",
          name: "Employment Partnerships",
          line: "Working with responsible employers to develop lawful employment and work-experience opportunities for people who have the legal right to work in the UK.",
        },
        {
          icon: "enterprise",
          name: "Entrepreneurship and Self-Employment",
          line: "Providing business awareness, mentoring and signposting to appropriate enterprise support.",
        },
      ] satisfies Initiative[],
    },
  ],
  ambition:
    "Our ambition is to move beyond immediate assistance and help people develop the capabilities, confidence and independence to shape their own futures.",
} as const;

/* -------------------------------------------------------------------------
   OUR APPROACH
   Its four words as the statement, its paragraph and its five principles.
   ------------------------------------------------------------------------- */

export const refugeeApproach = {
  id: sections.approach.id,
  kicker: "Our Approach",
  words: ["Compassion.", "Dignity.", "Inclusion.", "Opportunity."],
  lead: "Every individual has a unique story, experience and set of needs. We aim to provide support that is respectful, inclusive and responsive to individual circumstances.",
  principlesLabel: "Our approach is guided by five principles:",
  principles: [
    {
      name: "Human Dignity",
      line: "Treating every individual with respect, compassion and fairness, regardless of their background or immigration circumstances.",
    },
    {
      name: "Equal Access",
      line: "Promoting fair access to support, education, community activities and opportunities for eligible beneficiaries.",
    },
    {
      name: "Empowerment",
      line: "Helping people develop the knowledge, skills and confidence to make informed decisions and achieve greater independence.",
    },
    {
      name: "Community Partnership",
      line: "Bringing together charities, public institutions, businesses, volunteers and community organisations to create sustainable support networks.",
    },
    {
      name: "Safeguarding and Accountability",
      line: "Ensuring that our activities are delivered responsibly, with appropriate safeguarding, financial controls and professional standards.",
    },
  ],
  image: photo.approach,
} as const;

/* -------------------------------------------------------------------------
   WORK WITH US
   Its subtitle as the heading, its paragraph (its first sentence on the
   card at the photograph's foot) and its six invitations, each leading to
   the form with the kind of enquiry that suits it.
   ------------------------------------------------------------------------- */

export type InviteIcon = "volunteers" | "corporate" | "education" | "charities" | "housing" | "advisers";

export const refugeeWorkWithUs = {
  id: sections.work.id,
  kicker: "Work With Us",
  titleLead: "Help Us Make",
  titleAccent: "a Difference",
  /** The paragraph's first sentence, on the card. */
  effort: "Supporting refugees and asylum seekers requires a collective effort.",
  lead: "We welcome collaboration with individuals and organisations that share our commitment to humanitarian support, inclusion and community development.",
  listLabel: "We invite:",
  invites: [
    {
      icon: "volunteers",
      name: "Volunteers and Mentors",
      line: "Share your time, knowledge and experience to support individuals and families.",
      cta: buttons.volunteer,
    },
    {
      icon: "corporate",
      name: "Corporate Partners",
      line: "Support our programmes through financial contributions, professional expertise, employment opportunities and in-kind donations.",
      cta: buttons.partner,
    },
    {
      icon: "education",
      name: "Educational Institutions",
      line: "Collaborate on scholarships, language learning, training and educational opportunities.",
      cta: buttons.partner,
    },
    {
      icon: "charities",
      name: "Charities and Community Organisations",
      line: "Develop partnerships to deliver effective support and reach people in need.",
      cta: buttons.partner,
    },
    {
      icon: "housing",
      name: "Housing and Service Providers",
      line: "Help facilitate access to appropriate accommodation and essential services, subject to lawful arrangements.",
      cta: buttons.partner,
    },
    {
      icon: "advisers",
      name: "Professional Advisers",
      line: "Contribute specialist expertise in legal referrals, healthcare, education, employment and social support.",
      cta: buttons.volunteer,
    },
  ] satisfies { icon: InviteIcon; name: string; line: string; cta: { label: string; href: string } }[],
  image: photo.workWithUs,
} as const;

/* -------------------------------------------------------------------------
   BECOME A SUPPORTER
   Its heading, its paragraph and its closing hope, and its four buttons:
   three open the form beside them with their kind of enquiry chosen, and
   the fourth leads to the Contact page. The form records every enquiry
   sent from here as this service's.
   ------------------------------------------------------------------------- */

export const refugeeSupporter = {
  id: sections.supporter.id,
  kicker: brand.name,
  titleLead: "Become a",
  titleAccent: "Supporter",
  lead: "Whether you volunteer, provide professional expertise, contribute financially or establish a partnership, your involvement can help someone take an important step towards a safer and more secure future.",
  together: "Together, we can build communities where everyone has the opportunity to belong, participate and thrive.",
  buttons: [buttons.volunteer, buttons.partner, buttons.support, buttons.contact],
  context: "Refugee & Asylum Seeker Support",
  initialTopic: "volunteer",
} satisfies { context: EnquiryContext; initialTopic: EnquiryTopic } & Record<string, unknown>;

/* -------------------------------------------------------------------------
   OUR COMMITMENT
   Its two paragraphs: what the Foundation is committed to, then how its
   services and sponsorship will be governed.
   ------------------------------------------------------------------------- */

export const refugeeCommitment = {
  kicker: "Our Commitment",
  statement: `${brand.name} is committed to supporting refugees, asylum seekers and displaced individuals through charitable activities that promote relief of hardship, education, wellbeing and community integration.`,
  terms:
    "Our services and sponsorship activities will be developed in accordance with applicable UK law, safeguarding requirements and relevant regulatory approvals. Formal immigration advice will be provided only through appropriately authorised professionals, and participation in formal refugee sponsorship schemes will be subject to the applicable Home Office requirements and approvals.",
} as const;

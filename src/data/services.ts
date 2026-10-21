/**
 * The five OneVoice areas of work.
 *
 * Content is taken directly from the client's source document ("The five core
 * offerings" and "Proposed five areas of work"). Summaries and activity lists
 * paraphrase the source without adding claims of current delivery — every area
 * is marked `planned`, because the source describes all activity in the
 * conditional ("can provide", "will"), with no confirmation that any programme
 * is currently running.
 *
 * `caveat` carries the limits the source is explicit about: OneVoice informs
 * and signposts, it does not deliver regulated legal, immigration or clinical
 * services, and the International Network is a future development area rather
 * than an operating one. These are rendered on the page, not just recorded
 * here.
 */

import type { ServiceArea } from "@/types/content";

export const serviceAreas: ServiceArea[] = [
  {
    slug: "community",
    shortName: "Community",
    icon: "handshake",
    name: "OneVoice Community",
    summary:
      "Community engagement, inclusion and representation — helping people feel heard and able to participate.",
    description:
      "Building stronger, more connected communities in which people feel heard, respected and able to participate in local life.",
    activities: [
      "Community forums, listening sessions and consultation meetings",
      "Community surveys and reports highlighting local needs and solutions",
      "Cultural and intergenerational activities",
      "Community networking and social connection",
      "Partnerships with councils, charities and public services",
      "Support for community groups to develop capacity and reach",
    ],
    status: "planned",
  },
  {
    slug: "skills-education",
    shortName: "Skills & Education",
    icon: "graduation-cap",
    name: "OneVoice Skills & Education",
    summary:
      "Learning, employability and economic participation — the skills and confidence to improve prospects and quality of life.",
    description:
      "Helping individuals gain the skills, confidence and knowledge that may improve their employment prospects and quality of life.",
    activities: [
      "Digital literacy, computer skills and online safety",
      "English-language practice and communication skills",
      "CV preparation, interview skills and job-search guidance",
      "Career awareness and vocational training pathways",
      "Enterprise awareness and small-business development",
      "Financial capability and everyday money confidence",
      "Mentoring and progression into further education",
      "Employer engagement",
    ],
    status: "planned",
  },
  {
    slug: "advocacy",
    shortName: "Advocacy",
    icon: "megaphone",
    name: "OneVoice Advocacy",
    summary:
      "Community voice, access to services and constructive engagement.",
    description:
      "Helping communities communicate their concerns, understand the support available, and navigate systems that can otherwise be difficult to access.",
    activities: [
      "Collecting community feedback and identifying recurring barriers",
      "Information about public services and how to access them",
      "Signposting to housing, employment, education and welfare services",
      "Organising dialogue between communities and institutions",
      "Promoting equal opportunity, inclusion and fair treatment",
      "Guidance on official channels and processes",
      "Working with qualified specialist advisers where required",
    ],
    caveat:
      "OneVoice provides information, guidance and signposting. Regulated legal, immigration and clinical advice is referred to appropriately qualified specialists.",
    status: "planned",
  },
  {
    slug: "youth-women",
    shortName: "Youth & Women",
    icon: "users",
    name: "OneVoice Youth & Women",
    summary:
      "Leadership, participation, wellbeing and empowerment.",
    description:
      "Expanding opportunities for women and young people to develop their abilities, participate in community life and become confident leaders.",
    activities: [
      "Youth leadership, volunteering and civic participation",
      "Women's skills, employability and enterprise workshops",
      "Mentoring, confidence-building and personal development",
      "Community participation and social connection",
      "Family wellbeing awareness and referral pathways",
      "Appropriate signposting on mental health and safeguarding",
    ],
    caveat:
      "Specialist wellbeing, mental-health and safeguarding support is arranged through referral to qualified professionals rather than delivered directly.",
    status: "planned",
  },
  {
    slug: "international-network",
    shortName: "International Network",
    icon: "globe",
    name: "OneVoice International Network",
    summary:
      "International partnerships, shared learning and global collaboration.",
    description:
      "A proposed longer-term area of development: extending the OneVoice mission beyond the UK by connecting community organisations, professionals and social-development partners internationally, once the local model is established.",
    activities: [
      "Building international partnerships with community organisations",
      "Knowledge-sharing forums, webinars and shared learning",
      "Collaboration with institutions and professional networks",
      "Mentoring networks across countries",
      "Youth and women's empowerment initiatives",
      "Country-based partnerships as capacity permits",
    ],
    caveat:
      "This is a proposed area of development, not a current operation. No country chapters or international activities are established, and the network will be built only as capacity permits.",
    status: "planned",
  },
];

/**
 * The "not sure where to start" card that closes the areas grid.
 *
 * UI copy only — it makes no claim about programmes, availability or outcomes.
 * The wording restates the listen-first approach already recorded in
 * `aboutContent.mission`, and points at the site's established primary action.
 */
export const serviceAreasCta = {
  heading: "Not sure where to start?",
  body: "You do not need to know which area you need. Tell us what matters to you and we will help you find the right support.",
  cta: { label: "Get Support", href: "#contact" },
} as const;

/**
 * Programme directory — grouping and seed entries.
 *
 * Programme TITLES are taken from the client's source document. The six
 * categories follow the grouping proposed in the spec (section 3.5).
 *
 * CRITICAL: every programme is marked `status: "planned"`. The source
 * describes all activity conditionally and confirms no live course, date,
 * venue, eligibility rule or enrolment. Nothing here may be presented as
 * currently available. `deliveryMode` is `"tbd"` for the same reason.
 *
 * Three titles from the source are deliberately NOT included pending editorial
 * review of how they should be named and grouped publicly:
 *   - "Feminist Leadership & Volunteering"
 *   - "Matrimonial Relations & Preventing Divorce"
 *   - "Drugs awareness"
 * The source nav item "Education, Everyday English (ESOL) &" is also truncated
 * mid-phrase and needs the client to complete it.
 */

import type { Programme, ProgrammeCategory } from "@/types/content";

export const programmeCategories: {
  id: ProgrammeCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "education-digital",
    label: "Education & Digital Skills",
    description:
      "Everyday English, communication, digital literacy and digital confidence for life, work and business.",
  },
  {
    id: "employment-careers",
    label: "Employment & Careers",
    description:
      "Careers advice, employability, pre-employment, return to work and career development.",
  },
  {
    id: "enterprise-finance",
    label: "Enterprise & Financial Capability",
    description:
      "Entrepreneurship, self-employment, mentoring, business networking and financial confidence.",
  },
  {
    id: "youth-women-leadership",
    label: "Youth, Women & Leadership",
    description:
      "Youth development, women's and men's development, volunteering, leadership and resilience.",
  },
  {
    id: "wellbeing-family",
    label: "Wellbeing & Family Support",
    description:
      "Mental health awareness, wellbeing, domestic abuse information and family support.",
  },
  {
    id: "community-settlement",
    label: "Community & Settlement Support",
    description:
      "New arrivals, community outreach, integration, information and signposting.",
  },
];

export const programmes: Programme[] = [
  {
    slug: "education-everyday-english-digital",
    title: "Education, Everyday English (ESOL) & Digital Literacy",
    category: "education-digital",
    summary:
      "Build confidence in English and practical digital skills for everyday life, work and study.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 1,
  },
  {
    slug: "careers-information-advice-guidance",
    title: "Careers Information, Advice & Guidance",
    category: "employment-careers",
    summary:
      "Information and guidance to help people make informed decisions about careers, training and education.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 2,
  },
  {
    slug: "employability-employment-events",
    title: "Employability & Employment Events",
    category: "employment-careers",
    summary:
      "Practical support to become job ready — from CVs and interviews to employer introductions.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 3,
  },
  {
    slug: "return-to-work",
    title: "Return to Work",
    category: "employment-careers",
    summary:
      "Support for people restarting their careers after a break, with confidence and a clear plan.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 4,
  },
  {
    slug: "enterprise-mentoring",
    title: "Enterprise & Mentoring",
    category: "enterprise-finance",
    summary:
      "Help to explore self-employment, develop a business idea and connect with experienced mentors.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 5,
  },
  {
    slug: "financial-capability",
    title: "Financial Capability",
    category: "enterprise-finance",
    summary:
      "Build financial confidence — budgeting, saving, avoiding scams and understanding everyday finances.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 6,
  },
  {
    slug: "youth-development",
    title: "Youth Development",
    category: "youth-women-leadership",
    summary:
      "Skills, mentoring, confidence and career awareness for the next generation.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 7,
  },
  {
    slug: "womens-mens-development",
    title: "Women's & Men's Development",
    category: "youth-women-leadership",
    summary:
      "Dedicated programmes addressing identified community needs around skills, work and participation.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 8,
  },
  {
    slug: "womens-wellbeing-resilience",
    title: "Women's Wellbeing & Resilience",
    category: "wellbeing-family",
    summary:
      "Workshops supporting confidence, resilience, social connection and emotional wellbeing.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 9,
  },
  {
    slug: "domestic-abuse-family-support",
    title: "Domestic Abuse & Family Support",
    category: "wellbeing-family",
    summary:
      "Confidential, non-judgemental information, support and appropriate specialist referrals.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 10,
  },
  {
    slug: "mental-health-wellbeing",
    title: "Mental Health & Wellbeing",
    category: "wellbeing-family",
    summary:
      "A supportive environment for wellbeing awareness, peer support and specialist signposting.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 11,
  },
  {
    slug: "new-arrival-settlement-support",
    title: "New Arrival & Settlement Support",
    category: "community-settlement",
    summary:
      "Orientation and signposting for people new to the UK — services, systems and community life.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 12,
  },
  {
    slug: "information-signposting",
    title: "Information & Signposting",
    category: "community-settlement",
    summary:
      "Help knowing where to go — connecting people with the right services and specialist support.",
    status: "planned",
    deliveryMode: "tbd",
    sortOrder: 13,
  },
];

/**
 * Primary navigation structure.
 *
 * The menu labels and grouping follow the approved design (About Us, Our Work,
 * Programmes, Community, Impact, Get Involved), with dropdowns on the five
 * grouped items.
 *
 * Every item — parents and dropdown children alike — resolves to a destination
 * that actually exists: a real route where one has been built, otherwise an
 * in-page section anchor on the homepage. This honours the brief's rule (spec
 * FR-01 / H-01) that navigation must point at real destinations and never
 * disguise a broken link as functional. As each inner page is built, swap its
 * anchor for the route without changing the menu shape.
 *
 * Routes built so far: `/`, `/our-work`.
 *
 * Homepage section links are written root-relative (`/#about`, not `#about`)
 * because the header and footer render on every page. A bare `#about` would
 * silently do nothing anywhere except the homepage.
 *
 * The anchor ids are owned by the section components in `src/components/home/*`
 * and the footer. Keep them in sync.
 */

import type { NavItem } from "@/types/content";

export const primaryNav: NavItem[] = [
  {
    label: "About Us",
    href: "/#about",
    description: "Who we are, our vision, values and approach.",
    children: [
      { label: "Who We Are", href: "/#about", description: "Our story and purpose." },
      { label: "Our Approach", href: "/#approach", description: "One organisation, many pathways." },
      { label: "Your Journey", href: "/#journey", description: "Connect. Discover. Develop. Progress." },
      { label: "Who We Support", href: "/#who-we-support", description: "Opportunities for everyone." },
    ],
  },
  {
    label: "Our Work",
    href: "/our-work",
    description: "Five connected areas of community support.",
    children: [
      { label: "OneVoice Community", href: "/our-work#community", description: "Engagement, inclusion and representation." },
      { label: "OneVoice Skills & Education", href: "/our-work#skills-education", description: "Learning, employability and participation." },
      { label: "OneVoice Advocacy", href: "/our-work#advocacy", description: "Community voice and access to services." },
      { label: "OneVoice Youth & Women", href: "/our-work#youth-women", description: "Leadership, participation and empowerment." },
      { label: "OneVoice International Network", href: "/our-work#international-network", description: "Partnerships and shared learning." },
    ],
  },
  {
    label: "Programmes",
    href: "/#programmes",
    description: "Explore learning, work, enterprise and wellbeing pathways.",
    children: [
      { label: "All Programmes", href: "/#programmes", description: "Browse what we offer." },
      { label: "Skills & Education", href: "/#programmes", description: "English, communication and digital confidence." },
      { label: "Employment & Enterprise", href: "/#programmes", description: "Employability, return to work and business support." },
      { label: "Community & Wellbeing", href: "/#programmes", description: "Youth, women's development and wellbeing." },
    ],
  },
  {
    label: "Community",
    href: "/#community",
    description: "Activities, events, volunteering and community life.",
    children: [
      { label: "Community Life", href: "/#community", description: "Connect, participate and grow together." },
      { label: "Activities & Events", href: "/#community", description: "Workshops, networking and skills sessions." },
      { label: "Volunteering", href: "/#community", description: "Share your skills, make a difference." },
      { label: "Stories", href: "/#stories", description: "Every journey has a story." },
    ],
  },
  {
    label: "Impact",
    href: "/#impact",
    description: "How we measure participation, progress and outcomes.",
  },
  {
    label: "Get Involved",
    href: "/#get-involved",
    description: "Partner with us, volunteer or get in touch.",
    children: [
      { label: "Become a Partner", href: "/#partners", description: "Create opportunity together." },
      { label: "Volunteer", href: "/#community", description: "Contribute your time and expertise." },
      { label: "Work With Us", href: "/#partners", description: "Employers, funders and providers." },
      { label: "Contact Us", href: "/#contact", description: "Get in touch with the team." },
    ],
  },
];

/**
 * Footer link columns. A link with `href: ""` marks a page that does not exist
 * yet; the footer renders those as muted, clearly non-interactive "coming soon"
 * labels rather than broken links.
 */
export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "About Us", href: "/#about" },
      { label: "Our Work", href: "/our-work" },
      { label: "Programmes", href: "/#programmes" },
      { label: "Community", href: "/#community" },
      { label: "Impact", href: "/#impact" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Get Support", href: "/#contact" },
      { label: "Partner With Us", href: "/#partners" },
      { label: "Volunteer", href: "/#community" },
      { label: "Your Journey", href: "/#journey" },
      { label: "Who We Support", href: "/#who-we-support" },
    ],
  },
  {
    heading: "Information",
    links: [
      // Pages not yet built — rendered as "coming soon" labels, never as links.
      { label: "Safeguarding", href: "" },
      { label: "Accessibility", href: "" },
      { label: "Privacy Policy", href: "" },
      { label: "News & Resources", href: "" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

/** The site's primary call to action, used by the header and hero. */
export const primaryCta: NavItem = { label: "Get Support", href: "/#contact" };

/**
 * Secondary call to action. Points at the "Get Involved" section — an
 * information destination only. Live donations remain CONDITIONAL on
 * charity/provider verification (spec FR-10) and are out of frontend scope.
 */
export const donateCta: NavItem = { label: "Donate", href: "/#get-involved" };

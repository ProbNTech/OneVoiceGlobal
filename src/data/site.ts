/**
 * Site-wide content for the redesigned pages (`src/app/(site)/`): brand
 * lines, the brief's main menu, footer and contact.
 *
 * The menu is the brief's V.2 menu (24 October 2026: HOME to CONTACT, with
 * its sub-menus), and every label is written as the brief writes it, except
 * Programmes (see below). V.2 renames SERVICES to OUR WORK and adds SEMINARS &
 * WORKSHOPS and EVENTS 2027. Each top-level item points at the route its
 * page lives on, and each sub-item at a section anchor on that page. Until a
 * page exists the link lands on the site's not-found page.
 *
 * Contact details: the brief's CONTACT US block gives the labels (Address,
 * Telephone, Email, Website) with no values, and names four social platforms
 * without links. Nothing is filled in until the client supplies it; empty
 * values are simply not rendered.
 */

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const brand = {
  /* The brief says "OneVoice Global Foundation"; on 27 October 2026 the
     client renamed the organisation, with a new logo. Every page takes the
     name from here, including lines the brief writes with the old one. */
  name: "OneVoice Community Foundation",
  centre: "OneVoice Skill Development Centre",
  tagline: "Stronger Communities, Shared Opportunities, One World",
  initiative: "Community Empowerment, Skills and Social Inclusion Initiative",
  headline: "Empowering People. Building Skills. Creating Opportunities.",
  motto: ["Learn", "Develop", "Connect", "Progress"],
  closing: "One Person. One Voice. One Opportunity at a Time.",
} as const;

/**
 * The logo files, made from the client's OneVoice Community Foundation logo
 * (27 October 2026): the colour version and the reversed one for dark bands
 * leave off the logo's tagline line, which is too small to read at header
 * size, and the mark is its figures alone. The client's file is 547 pixels
 * wide; swap in larger versions here when the original arrives.
 */
export const logo = {
  colour: { src: "/images/brand/community-logo.png", width: 469, height: 103 },
  light: { src: "/images/brand/community-logo-white.png", width: 469, height: 103 },
  mark: { src: "/images/brand/community-mark.png", width: 106, height: 103 },
} as const;

export const routes = {
  home: "/",
  about: "/about-us",
  ourWork: "/our-work",
  programmes: "/programmes",
  seminars: "/seminars-and-workshops",
  events: "/events",
  community: "/community",
  partners: "/partners",
  impact: "/impact",
  news: "/news-resources",
  getInvolved: "/get-involved",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
  cookies: "/cookie-policy",
} as const;

/** Turns a menu label into the anchor id it will have on its page. */
function anchor(base: string, label: string) {
  const slug = label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return { label, href: `${base}#${slug}` };
}

const sub = (base: string, labels: string[]) => labels.map((label) => anchor(base, label));

export const navigation: NavItem[] = [
  { label: "Home", href: routes.home },
  {
    label: "About Us",
    href: routes.about,
    children: sub(routes.about, [
      "Who We Are",
      "Vision & Mission",
      "Our Values",
      "Our Approach",
      "Our Team",
      "Safeguarding",
      "Policies",
      "Accessibility",
    ]),
  },
  {
    label: "Our Work",
    href: routes.ourWork,
    children: sub(routes.ourWork, [
      "Education, Skills and Digital Inclusion",
      "Livelihoods, Employment and Entrepreneurship",
      "Mental Wellbeing and Family Support",
      "Community Inclusion and Advocacy",
      "Youth, Women and Family Empowerment",
      "Community Partnerships and Diaspora Engagement",
      "International Network",
    ]),
  },
  {
    label: "Programmes",
    href: routes.programmes,
    // The brief's menu names nineteen programmes, but its copy comes in
    // twenty-three blocks under other names, and some of the nineteen have
    // no copy at all. As agreed on 27 October 2026, the page is built from
    // the blocks, grouped into these seven themes (see src/data/programmes-page.ts).
    children: sub(routes.programmes, [
      "Education & English",
      "Digital OneVoice",
      "Employment & Careers",
      "Enterprise & Mentoring",
      "Women, Men & Youth",
      "Wellbeing & Family",
      "Safety & Advice",
    ]),
  },
  {
    label: "Seminars & Workshops",
    href: routes.seminars,
    children: sub(routes.seminars, [
      "Priority Workshops for 2027",
      "Mental Health & Wellbeing",
      "Rights & Empowerment",
      "Healthy Relationships",
    ]),
  },
  {
    label: "Events 2027",
    href: routes.events,
    children: sub(routes.events, [
      "Community Iftar & Official Launch",
      "International Women's Day",
      "Eid Bazaar",
      "Pakistan Independence Day & Community Celebration",
      "East London Community Marathon Walks",
      // The brief writes "Yearbook 2027-100"; the dash is spaced so it does not read as a range.
      "Yearbook 2027 – 100 Inspiring Personalities",
      "OneVoice Achievement Awards 2027",
    ]),
  },
  {
    label: "Community",
    href: routes.community,
    // The brief's V.2 (24 October 2026) menu. It moves Events and the
    // Achievement Awards out of Community and onto its new Events 2027 page.
    children: sub(routes.community, ["Outreach", "Community Hub & Networks", "Volunteering", "Community Voice"]),
  },
  {
    label: "Partners",
    href: routes.partners,
    children: sub(routes.partners, [
      "Employers",
      "Training Providers",
      "Community Organisations",
      "Public Sector",
      "Corporate Partners",
      "Funders",
    ]),
  },
  {
    label: "Impact",
    href: routes.impact,
    children: sub(routes.impact, ["Our Impact", "Success Stories", "Reports"]),
  },
  { label: "News & Resources", href: routes.news },
  {
    label: "Get Involved",
    href: routes.getInvolved,
    children: sub(routes.getInvolved, [
      "Refer Someone",
      "Volunteer",
      "Donate",
      "Become a Partner",
      "Sponsor a Programme",
    ]),
  },
  { label: "Contact", href: routes.contact },
];

/**
 * The kinds of enquiry the Contact page's form takes (its labels and lines
 * are in src/data/contact.ts). A call to act that ends at the form opens it
 * with its own kind already chosen, through `enquiryHref`.
 */
export type EnquiryTopic = "support" | "interest" | "refer" | "volunteer" | "partner" | "sponsor" | "donate";

/** The Contact page, scrolled to its form, with one kind of enquiry chosen. */
export const enquiryHref = (topic: EnquiryTopic) => `${routes.contact}?enquiry=${topic}#contact-us`;

export const ctas = {
  support: { label: "Get Support", href: enquiryHref("support") },
  // The homepage hero's label in the brief; it leads to Our Work.
  services: { label: "Explore Our Services", href: routes.ourWork },
  partner: { label: "Become a Partner", href: `${routes.getInvolved}#become-a-partner` },
  donate: { label: "Donate", href: `${routes.getInvolved}#donate` },
} satisfies Record<string, NavLink>;

export type SocialPlatform = "linkedin" | "facebook" | "instagram" | "youtube";

export const contact = {
  /** All four are blank in the brief. Empty values are not rendered. */
  address: "",
  telephone: "",
  email: "",
  website: "",
  social: [
    { platform: "linkedin", label: "LinkedIn", href: "" },
    { platform: "facebook", label: "Facebook", href: "" },
    { platform: "instagram", label: "Instagram", href: "" },
    { platform: "youtube", label: "YouTube", href: "" },
  ] satisfies { platform: SocialPlatform; label: string; href: string }[],
};

/** Footer columns, drawn from the same menu so the two never disagree. */
const byLabel = (label: string) => navigation.find((item) => item.label === label)!;

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Explore",
    links: [
      "About Us",
      "Our Work",
      "Programmes",
      "Seminars & Workshops",
      "Events 2027",
      "Community",
      "Partners",
      "Impact",
      "News & Resources",
    ].map((label) => {
      const { href } = byLabel(label);
      return { label, href };
    }),
  },
  { heading: "Get Involved", links: byLabel("Get Involved").children ?? [] },
  {
    heading: "About",
    links: (byLabel("About Us").children ?? []).filter((link) =>
      ["Who We Are", "Vision & Mission", "Our Values", "Safeguarding", "Policies", "Accessibility"].includes(
        link.label,
      ),
    ),
  },
];

export const copyrightYear = 2026;

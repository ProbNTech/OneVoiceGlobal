/**
 * Site-wide content for the redesigned pages (`src/app/(site)/`): brand
 * lines, the brief's main menu, footer and contact.
 *
 * The menu is the brief's own (HOME to CONTACT, with its sub-menus) and every
 * label is written as the brief writes it. The pages behind it are not built
 * yet: each top-level item points at the route it will live on, and each
 * sub-item at a section anchor on that page. Until a page exists the link
 * lands on the site's not-found page.
 *
 * Contact details: the brief's CONTACT US block gives the labels (Address,
 * Telephone, Email, Website) with no values, and names four social platforms
 * without links. Nothing is filled in until the client supplies it; empty
 * values are simply not rendered.
 */

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const brand = {
  name: "OneVoice Global Foundation",
  centre: "OneVoice Skill Development Centre",
  tagline: "Stronger Communities, Shared Opportunities, One World",
  initiative: "Community Empowerment, Skills and Social Inclusion Initiative",
  headline: "Empowering People. Building Skills. Creating Opportunities.",
  motto: ["Learn", "Develop", "Connect", "Progress"],
  closing: "One Person. One Voice. One Opportunity at a Time.",
} as const;

export const routes = {
  home: "/",
  about: "/about-us",
  services: "/services",
  programmes: "/programmes",
  community: "/community",
  partners: "/partners",
  impact: "/impact",
  news: "/news-resources",
  getInvolved: "/get-involved",
  contact: "/contact",
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
    label: "Services",
    href: routes.services,
    children: sub(routes.services, [
      "Community Support",
      "Skills & Education",
      "Advocacy & Leadership",
      "Youth & Women",
      "International Network",
    ]),
  },
  {
    label: "Programmes",
    href: routes.programmes,
    children: sub(routes.programmes, [
      // The brief's first entry ends on a stray "&"; written here without it.
      "Education & Everyday English (ESOL)",
      "IT/Digital Literacy & Skills Development",
      "Careers Information, Advice & Guidance",
      "Pre-employment & Pre-Settlement Skills",
      "Employability & Employment Events",
      "Women's & Men's Development",
      "Return to Work",
      "Enterprise & Mentoring",
      "Financial Capability",
      "Youth Development",
      "Women's Wellbeing & Resilience",
      "Domestic Abuse & Family Support",
      "Mental Health & Wellbeing",
      "Feminist Leadership & Volunteering",
      "Matrimonial Relations & Preventing Divorce",
      "New Arrival & Settlement Support",
      "Drugs Awareness",
      "Community Support",
      "Information & Signposting",
    ]),
  },
  {
    label: "Community",
    href: routes.community,
    children: sub(routes.community, [
      "Outreach",
      "Community Hub & Networks",
      "Events",
      "Volunteering",
      "Community Voice",
      "Achievement Awards",
    ]),
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

export const ctas = {
  support: { label: "Get Support", href: routes.contact },
  services: { label: "Explore Our Services", href: routes.services },
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
    links: ["About Us", "Services", "Programmes", "Community", "Partners", "Impact", "News & Resources"].map(
      (label) => {
        const { href } = byLabel(label);
        return { label, href };
      },
    ),
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

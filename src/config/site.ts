/**
 * OneVoice Community Foundation — single source of site-wide configuration.
 *
 * IMPORTANT — nothing invented. The client's source document leaves the
 * contact block blank ("Address:", "Telephone:", "Email:" with no values) and
 * does not confirm a domain or social accounts. Those fields are therefore
 * empty and flagged below; the footer renders them as clearly-marked
 * placeholders rather than fabricating details. Fill them in only once the
 * client has supplied and approved real values.
 */

export interface SocialLink {
  platform: "linkedin" | "facebook" | "instagram" | "youtube";
  label: string;
  /** Empty until a real, verified account URL is approved. */
  href: string;
}

export interface SiteConfig {
  /** Public-facing organisation name. */
  name: string;
  /** The London-facing delivery name used across much of the source copy. */
  deliveryName: string;
  tagline: string;
  headline: string;
  supportingMessage: string;
  differentiator: string;
  description: string;
  /** Production URL — provisional until the client's domain is confirmed. */
  url: string;

  /**
   * Contact details. All blank in the source document and NOT to be invented.
   * `confirmed: false` signals the UI to render a "details to be confirmed"
   * placeholder instead of an empty or fake value.
   */
  contact: {
    confirmed: boolean;
    email: string;
    phone: string;
    address: string;
  };

  social: SocialLink[];
}

export const siteConfig: SiteConfig = {
  name: "OneVoice Community Foundation",
  deliveryName: "OneVoice Skill Development Centre",
  tagline: "Stronger Communities, Shared Opportunities, One World.",
  headline: "Empowering People. Building Skills. Creating Opportunities.",
  supportingMessage: "Learn. Develop. Connect. Progress.",
  differentiator: "One Organisation. Many Pathways.",
  description:
    "OneVoice Community Foundation connects communities across London with education, skills, employment, enterprise and opportunities for participation.",
  // Provisional. Replace with the approved production domain before launch.
  url: "https://www.onevoice.example",

  contact: {
    confirmed: false,
    email: "",
    phone: "",
    address: "",
  },

  // Platforms named in the source; URLs intentionally blank until verified.
  social: [
    { platform: "linkedin", label: "LinkedIn", href: "" },
    { platform: "facebook", label: "Facebook", href: "" },
    { platform: "instagram", label: "Instagram", href: "" },
    { platform: "youtube", label: "YouTube", href: "" },
  ],
};

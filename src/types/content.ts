/**
 * OneVoice Global Foundation — content type definitions.
 *
 * These interfaces describe the *shape* of the site's content. For now the
 * data lives in local TypeScript files under `src/data`, but these types
 * deliberately mirror the field structure proposed for the CMS in
 * `ONEVOICE_NEXTJS_WEBSITE_SPEC.md` (section 11). When a CMS is introduced in
 * a later phase, the data source changes while these types — and every
 * component that consumes them — stay the same.
 *
 * Nothing here is organisational fact. The data files that implement these
 * types use only content verified in the client's source document, and mark
 * anything unconfirmed as a placeholder.
 */

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: string;
  href: string;
  /** Short supporting line for mega-menu / mobile descriptions. Optional. */
  description?: string;
}

export interface NavItem extends NavLink {
  /** Child links shown in a dropdown / mega-menu, when present. */
  children?: NavLink[];
}

/* -------------------------------------------------------------------------- */
/*  Programme delivery status                                                 */
/*  (spec 3.6 — the mechanism that keeps the site honest about availability)  */
/* -------------------------------------------------------------------------- */

export type ProgrammeStatus =
  | "active" // confirmed, currently offered
  | "upcoming" // confirmed and scheduled
  | "planned" // proposed or not yet launched
  | "paused" // normally available, temporarily unavailable
  | "archived"; // historical; cannot be applied for

export type DeliveryMode = "in-person" | "online" | "hybrid" | "tbd";

/* -------------------------------------------------------------------------- */
/*  Service areas (the five main areas of work — spec 3.4)                    */
/* -------------------------------------------------------------------------- */

export interface ServiceArea {
  slug: string;
  /** Short brand name, e.g. "OneVoice Community". */
  name: string;
  /** Name without the "OneVoice" prefix, for compact listings and strips. */
  shortName: string;
  /** Lucide icon name, resolved by the rendering component. */
  icon: string;
  /** One-line summary for cards and listings. */
  summary: string;
  /** Longer description for the service detail page. */
  description: string;
  /** Representative activities drawn from the source document. */
  activities: string[];
  /**
   * A limit the source is explicit about — what this area does NOT do, or that
   * it is proposed rather than operating. Rendered alongside the activities,
   * never hidden in a comment.
   */
  caveat?: string;
  /** Launch gating — a service may be visible before it is fully active. */
  status: ProgrammeStatus;
}

/* -------------------------------------------------------------------------- */
/*  Programmes                                                                */
/* -------------------------------------------------------------------------- */

export type ProgrammeCategory =
  | "education-digital"
  | "employment-careers"
  | "enterprise-finance"
  | "youth-women-leadership"
  | "wellbeing-family"
  | "community-settlement";

export interface Programme {
  slug: string;
  title: string;
  category: ProgrammeCategory;
  /** One-line summary. */
  summary: string;
  status: ProgrammeStatus;
  deliveryMode: DeliveryMode;
  /** Highlighted on the homepage featured row when true. */
  featured?: boolean;
  /** Lower number sorts earlier. */
  sortOrder?: number;
}

/* -------------------------------------------------------------------------- */
/*  Homepage content                                                          */
/* -------------------------------------------------------------------------- */

/** A labelled step in a numbered journey (e.g. CONNECT → DISCOVER → ...). */
export interface JourneyStep {
  /** Display order, 1-based. */
  order: number;
  label: string;
  description: string;
}

/** A compact "core offering" pillar shown on the homepage. */
export interface CorePillar {
  /** Lucide icon name, resolved by the rendering component. */
  icon: string;
  title: string;
  description: string;
}

/** A partner / audience group under "Work with us". */
export interface PartnerAudience {
  label: string;
  description: string;
}

/** A link card for the "How can we help?" quick pathways. */
export interface HelpPathway {
  label: string;
  href: string;
  icon: string;
}

/** A stage in the impact framework (REACH → ENGAGE → ...). */
export interface ImpactStage {
  order: number;
  label: string;
}

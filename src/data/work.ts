/**
 * "Our Work" page content.
 *
 * Kept in its own module rather than in `services.ts` so the page's editorial
 * copy can import the shared image assets without `services.ts` and `home.ts`
 * importing each other. The five areas themselves are NOT restated here — the
 * sections read them from `serviceAreas`, so the page can never drift from the
 * rest of the site.
 *
 * Every line restates material already verified elsewhere: the headline is the
 * client's own "One Organisation. Many Pathways." differentiator, and the
 * supporting sentences name the five areas of work from the source document.
 * No delivery, availability, timescale or outcome is claimed.
 */

import { assets } from "@/data/legacy-home";
import { serviceAreas } from "@/data/services";

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export interface HeroSlide {
  id: string;
  src: string;
  /** Describes the scene only — never claims a OneVoice activity (spec §6.6). */
  alt: string;
  /** CSS object-position, where the default centre crop loses the subject. */
  objectPosition?: string;
}

/**
 * The three hero slides.
 *
 * All three are stock photographs of people working together. The alt text
 * describes what is in the frame and nothing more: none of them documents a
 * real OneVoice session, and none may be captioned as if it did.
 */
export const ourWorkHeroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    src: assets.ourWorkSlide1,
    alt: "Five people gathered around two laptops at a table in a bright, plant-filled office, looking at a screen together.",
    objectPosition: "55% center",
  },
  {
    id: "slide-2",
    src: assets.ourWorkSlide2,
    alt: "Five people leaning over a table covered with notes and papers in a bright open-plan workspace, working through them together.",
    objectPosition: "50% center",
  },
  {
    id: "slide-3",
    src: assets.ourWorkSlide3,
    alt: "Four people standing around a table of laptops, printed documents and colour swatches in a bright workspace.",
    objectPosition: "50% center",
  },
];

export const ourWorkHero = {
  eyebrow: "What we do",
  heading: "Our Work",
  subheading: "One Organisation. Many Pathways.",
  body: "Connecting people with opportunities through community support, skills and education, advocacy, and leadership.",
  cta: { label: "Explore our five areas of work", href: "#areas" },
} as const;

/* -------------------------------------------------------------------------- */
/*  Introduction                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The page's one introduction, rendered at the head of the editorial section.
 *
 * There is deliberately no second introductory block: this copy and the two
 * editorial rows below it are a single band, so a visitor meets one statement
 * of approach rather than two headings saying much the same thing.
 */
export const ourWorkIntro = {
  eyebrow: "Our work in practice",
  heading: "Connecting People With Opportunities",
  lead: "OneVoice works across five connected areas — community engagement, skills and education, advocacy, youth and women's participation, and international collaboration.",
  body: "No two people arrive with the same need, so we do not start with a fixed programme. We listen first, understand what matters, and connect people to the right support — working alongside councils, charities, education providers and employers rather than duplicating what they already do well.",
  /**
   * The status line. Visible on the page, not a code comment: these are areas
   * of work being established, and the site must not imply otherwise.
   */
  note: "These are the areas we are building our work around. Individual programmes are listed with their own status, and nothing is presented as available until it is confirmed.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Editorial rows (two areas previewed ahead of the full run of five)        */
/* -------------------------------------------------------------------------- */

/**
 * The copy written for one editorial row. Everything else — the official
 * service name, the activities and the in-page link — is read from the area
 * itself, so a row can never describe an area the site no longer has.
 */
interface FeatureCopy {
  slug: string;
  heading: string;
  intro: string;
  support: string;
  /** How many of the area's own activities the compact list shows. */
  highlightCount: number;
  ctaLabel: string;
  /** The row photograph. Omitted where the row carries a gallery instead. */
  image?: { src: string; alt: string; position?: string };
}

export interface WorkFeature {
  slug: string;
  /** Area name as the navigation uses it, e.g. "Skills & Education". */
  shortName: string;
  /** Official service name, e.g. "OneVoice Skills & Education". */
  name: string;
  heading: string;
  intro: string;
  support: string;
  highlights: string[];
  /** In-page link to this area's full section further down the page. */
  href: string;
  ctaLabel: string;
  image?: { src: string; alt: string; position?: string };
}

/**
 * Two of the five areas are previewed here — the two the source document
 * describes in most detail — as an introduction to the run of five below.
 *
 * The rows deliberately carry no "01 / 02" ordinals. The five sections below
 * are numbered in their canonical order (Community is 01, Skills & Education
 * is 02), and numbering these two rows in reading order would contradict that
 * numbering two screens later on the same page.
 *
 * Tone: every sentence stays in the "being built" register the source uses.
 * Neither area is in delivery, and the status note above the rows says so.
 */
const featureCopy: FeatureCopy[] = [
  {
    slug: "skills-education",
    heading: "Building Skills. Creating Opportunities.",
    intro:
      "OneVoice Skills & Education is being built to help people gain the skills, confidence and knowledge that improve their employment prospects and quality of life.",
    support:
      "Not a single fixed course, but a set of connected routes — practical learning, one-to-one guidance and mentoring — so support can start from wherever someone already is, alongside education providers and employers rather than in place of them.",
    highlightCount: 4,
    ctaLabel: "Explore Skills & Education",
    image: {
      // Describes the scene only — the people shown are not presented as
      // OneVoice participants, staff or volunteers (spec §6.6).
      src: assets.learningPhoto,
      alt: "Four adults talking together around a laptop at a long table in a bright community learning space, with other people working at tables behind them.",
    },
  },
  {
    slug: "community",
    heading: "Stronger Communities. Shared Opportunities.",
    intro:
      "OneVoice Community is about building stronger, more connected communities in which people feel heard, respected and able to take part in local life.",
    support:
      "It is designed to begin with listening — forums, conversations and community surveys that set out what a neighbourhood actually needs — and to carry on through cultural and intergenerational activity, with councils, charities and local groups rather than around them.",
    highlightCount: 4,
    ctaLabel: "Explore Community Support",
    // No row photograph: this row carries the gallery instead.
  },
];

export const ourWorkFeatures: WorkFeature[] = featureCopy.map((copy) => {
  const area = serviceAreas.find((item) => item.slug === copy.slug);

  // A build-time guard rather than a silent fallback: if an area is renamed
  // or removed, the page should fail loudly instead of rendering a row whose
  // link goes nowhere.
  if (!area) {
    throw new Error(`ourWorkFeatures: no area of work with slug "${copy.slug}"`);
  }

  return {
    slug: area.slug,
    shortName: area.shortName,
    name: area.name,
    heading: copy.heading,
    intro: copy.intro,
    support: copy.support,
    highlights: area.activities.slice(0, copy.highlightCount),
    href: `#${area.slug}`,
    ctaLabel: copy.ctaLabel,
    image: copy.image,
  };
});

/* -------------------------------------------------------------------------- */
/*  Community gallery                                                         */
/* -------------------------------------------------------------------------- */

export interface GalleryImage {
  id: string;
  /** Omitted where no approved photograph exists — a labelled slot renders. */
  src?: string;
  /** Informative alt for a real photograph, or the intended subject. */
  alt: string;
  /**
   * A short, factual description of what is in the frame — never an event
   * name, a date, or a claim that the picture documents a OneVoice activity.
   */
  caption: string;
  tone?: "navy" | "ivory" | "blue";
  objectPosition?: string;
}

/**
 * The gallery beside the Community row.
 *
 * Two approved photographs and two labelled slots. The slots are deliberate:
 * there is no approved photography of a community forum or of an
 * intergenerational activity, and borrowing an unrelated picture would imply
 * an activity the photograph does not show (spec §6.6). The gallery renders
 * whatever number of items it is given, so each slot becomes a photograph the
 * moment one is supplied.
 */
export const communityGallery: GalleryImage[] = [
  {
    id: "distribution",
    src: assets.heroPhoto,
    alt: "Volunteers in lanyards packing boxes of food and clothing and handing one across a table to a visitor at a community distribution point.",
    caption:
      "Volunteers handing out food and household essentials at a community distribution point.",
  },
  {
    id: "donations",
    src: assets.outreachPhoto,
    alt: "Volunteers sorting tinned food, pasta and folded clothing into boxes at an indoor donation point.",
    caption: "Sorting donated food and clothing at an indoor collection point.",
  },
  {
    id: "forum",
    alt: "Photography to follow: residents talking together at a community forum.",
    caption: "A community forum where residents set out local priorities.",
    tone: "navy",
  },
  {
    id: "intergenerational",
    alt: "Photography to follow: an intergenerational activity bringing neighbours of different ages together.",
    caption:
      "An intergenerational activity bringing neighbours of different ages together.",
    tone: "blue",
  },
];

export const communityGalleryLabel = "Community photography";

/* -------------------------------------------------------------------------- */
/*  Photography for the five storytelling sections                            */
/* -------------------------------------------------------------------------- */

export interface AreaMedia {
  /** Omitted where no approved photograph exists; a labelled slot renders. */
  src?: string;
  /** Informative alt for a real photograph, or the intended subject. */
  alt: string;
  /** Intended subject, shown on the placeholder slot. */
  caption?: string;
  tone?: "navy" | "ivory" | "blue";
}

/**
 * Only two approved photographs genuinely depict these areas of work. The
 * other three render as clearly-marked "photography to follow" slots at the
 * right dimensions, rather than borrowing an unrelated picture and letting it
 * imply an activity that is not what the photograph shows (spec §6.6).
 */
export const areaMedia: Record<string, AreaMedia> = {
  community: {
    src: assets.outreachPhoto,
    alt: "Volunteers sorting donated food and clothing at a community distribution point and handing a box to a visitor.",
  },
  "skills-education": {
    src: assets.secondaryPhoto,
    alt: "A mentor and learner working side by side at a laptop during a community digital-skills session.",
  },
  advocacy: {
    alt: "Photography to follow: residents meeting a public-service representative at a community consultation.",
    caption: "A community consultation between residents and local services.",
    tone: "navy",
  },
  "youth-women": {
    alt: "Photography to follow: a leadership and mentoring workshop for women and young people.",
    caption: "A leadership and mentoring workshop for women and young people.",
    tone: "ivory",
  },
  "international-network": {
    alt: "Photography to follow: an online knowledge-sharing session between partner organisations in different countries.",
    caption: "An online knowledge-sharing session between partner organisations.",
    tone: "blue",
  },
};

/* -------------------------------------------------------------------------- */
/*  Closing call to action                                                    */
/* -------------------------------------------------------------------------- */

export const ourWorkCta = {
  eyebrow: "Work with us",
  heading: "Creating Opportunity Together",
  body: "Whether you are looking for support yourself or want to open routes into education, employment and community participation alongside us, the next step starts with a conversation.",
  primaryCta: { label: "Get Support", href: "/#contact" },
  secondaryCta: { label: "Become a Partner", href: "/#partners" },
} as const;

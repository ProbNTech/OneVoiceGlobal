/**
 * Copy and media for the Scholarships page (`src/app/(site)/scholarships/page.tsx`).
 *
 * Every line comes from the client's "ONEVOICE SCHOLARSHIP" document (4
 * November 2026), titled "International Students & Global Scholarships":
 * the OneVoice Scholarship & Educational Grants Programme, in the document's
 * thirteen parts and order, with its contact block. Lists the document
 * writes as a sentence ("Partnerships may include …") are set as lists, and
 * its "Indicative proposed grant levels" table is drawn as range bars with
 * every figure written beside its bar.
 *
 * The grant amounts and the first-year targets are the client's own and are
 * shown exactly as written, with the document's notes that awards are not
 * guaranteed and that the targets are "not existing awards or confirmed
 * commitments". The document's contact block gives no email or website, so
 * the page offers the site's enquiry form instead, which records each
 * enquiry from here as the Scholarship Programme's.
 *
 * IMAGES. Each photograph was generated for its slot on 5 November 2026 and
 * cut to the slot's exact size (file names, sizes and prompts in
 * `_source/scholarships-media-brief.md`), cast towards the client's mix of
 * people across the site and each set in its own relevant place. No
 * photograph here is used anywhere else on the site. Alt text describes only what
 * the frame shows: none of these people is presented as a scholarship
 * recipient, applicant or member of staff.
 */

import type { HomeImage } from "@/data/home";
import { brand, routes, type EnquiryContext, type EnquiryTopic } from "@/data/site";

/** A photograph generated for its slot, saved under /images/scholarships/ by the slot's file name. */
const shot = (file: string, alt: string, position = "50% 50%"): HomeImage => ({
  src: `/images/scholarships/${file}.jpg`,
  alt,
  position,
});

const photo = {
  heroLeft: shot(
    "scholarships-hero-left",
    "A young woman reading at a long desk in a quiet university library, a stack of textbooks beside her",
  ),
  heroRight: shot(
    "scholarships-hero-right",
    "A smiling graduate in a gown holding her scroll on a college lawn as her father hugs her",
  ),
  about: shot(
    "scholarships-about",
    "A mentor and a student going through a university application on a laptop at a kitchen table",
  ),
  higherEducation: shot(
    "scholarships-higher-education",
    "Students taking notes in a tiered university lecture theatre",
  ),
  professional: shot(
    "scholarships-professional",
    "A trainee nurse practising taking a blood pressure reading on a training ward as her tutor watches",
  ),
  women: shot(
    "scholarships-women",
    "A woman in a headscarf working through engineering drawings with a classmate at a college studio desk",
  ),
  vocational: shot(
    "scholarships-vocational",
    "An apprentice in work gear measuring timber at a construction training yard as an instructor looks on",
  ),
  hardship: shot(
    "scholarships-hardship",
    "A student studying at a small table in a family flat, a laptop and secondhand books beside her",
  ),
  excellence: shot(
    "scholarships-excellence",
    "A young man presenting his research poster to two academics at a university showcase",
  ),
  international: shot(
    "scholarships-international",
    "International students of different backgrounds walking and talking together across a London university campus",
  ),
  support: shot(
    "scholarships-support",
    "A business owner and a student shaking hands in a bright office after a sponsorship meeting",
  ),
  partners: shot(
    "scholarships-partners",
    "Three people of different backgrounds talking over papers around a boardroom table",
  ),
  cta: shot(
    "scholarships-cta",
    "Graduates of different backgrounds throwing their caps in the air outside a university building",
  ),
} satisfies Record<string, HomeImage>;

/**
 * The page's sections, for the strip under the hero. The menu lists the page
 * itself with no sub-menu, so the strip names its sections by their
 * headings in the document.
 */
const sections = {
  about: { label: "About the Programme", id: "about-the-programme" },
  grants: { label: "Scholarships & Grants", id: "scholarships-and-grants" },
  who: { label: "Who Can Apply", id: "who-can-apply" },
  process: { label: "Application Process", id: "application-process" },
  support: { label: "Support a Student", id: "support-a-student" },
  faq: { label: "FAQs", id: "faqs" },
} as const;

/** The page's enquiry form, opened with one kind of enquiry chosen. */
const CONTACT_ID = "contact-the-scholarship-programme";
const formHref = (topic: EnquiryTopic) => `${routes.scholarships}?enquiry=${topic}#${CONTACT_ID}`;

/** The document's calls to act. */
const supportStudent = { label: "Support a Student", href: formHref("donate") };
const scholarshipPartner = { label: "Become a Scholarship Partner", href: formHref("partner") };

/* -------------------------------------------------------------------------
   1. MAIN BANNER – OPENING DOORS TO EDUCATION
   Its headline, its two opening paragraphs and its two calls to act; the
   document's title line on the card over the photographs.
   ------------------------------------------------------------------------- */

export const scholarshipsHero = {
  kicker: "Scholarships & Educational Grants",
  titleLead: "Every Student Deserves",
  titleAccent: "the Opportunity to Succeed",
  lead: "Financial circumstances should never prevent a talented and determined individual from pursuing their educational ambitions.",
  description:
    "The OneVoice Scholarship & Educational Grants Programme aims to support students and individuals from disadvantaged backgrounds by providing financial assistance towards higher education, professional qualifications, vocational training and career development.",
  primaryCta: { label: "Explore Scholarships", href: `#${sections.grants.id}` },
  secondaryCta: { label: "Support Our Programme", href: `#${sections.support.id}` },
  /** The document's title line, one phrase to a line. */
  card: ["Opening Doors.", "Supporting Potential.", "Transforming Futures."],
  images: { left: photo.heroLeft, right: photo.heroRight },
} as const;

/** The strip under the hero. */
export const scholarshipsSections = {
  label: "Scholarships",
  links: Object.values(sections).map(({ label, id }) => ({ label, href: `#${id}` })),
};

/* -------------------------------------------------------------------------
   2. ABOUT THE PROGRAMME
   The banner's belief and mission, then the About block's paragraphs, with
   its line on where the programme will focus on the card.
   ------------------------------------------------------------------------- */

export const scholarshipsAbout = {
  id: sections.about.id,
  kicker: "About the Programme",
  titleLead: "Creating Opportunities",
  titleAccent: "Through Education",
  belief:
    "We believe that investing in education is one of the most powerful ways to transform individual lives, strengthen families and build stronger communities.",
  mission: { lead: "Our mission is simple:", line: "to turn educational potential into opportunity." },
  paragraphs: [
    `The OneVoice Scholarship & Educational Grants Programme is an educational support initiative of ${brand.name}, established to help individuals overcome financial barriers and access meaningful educational opportunities.`,
    "We recognise that many talented students face challenges that go beyond academic ability. Household financial pressures, unexpected hardship, the cost of professional qualifications, limited family resources and other social barriers can prevent individuals from reaching their full potential.",
    "Through targeted scholarships and educational grants, we aim to provide practical financial support to deserving applicants who demonstrate commitment, determination and genuine need.",
    "We aim to develop partnerships with universities, colleges, schools, businesses, professional organisations, philanthropists and community groups to expand access to education and create lasting opportunities.",
  ],
  /** On the card over the photograph. */
  focus:
    "Our programme will initially focus on individuals and communities in Greater London, with particular attention to disadvantaged and underserved communities in East London.",
  image: photo.about,
} as const;

/* -------------------------------------------------------------------------
   OUR VISION, OUR MISSION, OUR VALUES
   ------------------------------------------------------------------------- */

export type ValueIcon = "equal" | "merit" | "dignity" | "transparency" | "impact";

export const scholarshipsVision = {
  id: "vision-mission-and-values",
  vision: {
    label: "Our Vision",
    text: "A society in which financial hardship does not determine a person's educational future.",
  },
  mission: {
    label: "Our Mission",
    text: "To provide financial assistance and educational opportunities to deserving individuals, helping them access qualifications, develop skills, pursue professional careers and contribute positively to society.",
  },
  valuesLabel: "Our Values",
  values: [
    {
      name: "Equal Opportunity",
      line: "Promoting fair access to education regardless of background.",
      icon: "equal",
    },
    {
      name: "Merit and Potential",
      line: "Recognising academic commitment, personal determination and future potential.",
      icon: "merit",
    },
    {
      name: "Dignity and Inclusion",
      line: "Supporting individuals with respect, fairness and compassion.",
      icon: "dignity",
    },
    {
      name: "Transparency",
      line: "Ensuring responsible and accountable distribution of charitable funds.",
      icon: "transparency",
    },
    {
      name: "Community Impact",
      line: "Investing in individuals who can make a positive difference to society.",
      icon: "impact",
    },
  ] satisfies { name: string; line: string; icon: ValueIcon }[],
} as const;

/* -------------------------------------------------------------------------
   3. OUR SCHOLARSHIPS & EDUCATIONAL GRANTS
   The six kinds of support, A to F, each with its line(s) and list.
   ------------------------------------------------------------------------- */

export type Grant = {
  letter: string;
  name: string;
  lines: string[];
  listLabel?: string;
  items?: string[];
  image: HomeImage;
};

export const scholarshipsGrants = {
  id: sections.grants.id,
  kicker: "Our Scholarships & Educational Grants",
  titleLead: "Financial Support for",
  titleAccent: "Different Educational Needs",
  lead: "We aim to develop a range of financial support programmes to meet different educational needs.",
  grants: [
    {
      letter: "A",
      name: "Higher Education Scholarships",
      lines: [
        "Supporting students pursuing undergraduate and postgraduate studies at recognised universities and higher education institutions.",
      ],
      listLabel: "Assistance may contribute towards:",
      items: [
        "Tuition fee shortfalls",
        "Essential books and academic resources",
        "Study equipment and learning materials",
        "Essential course-related expenses",
        "Other approved educational costs",
      ],
      image: photo.higherEducation,
    },
    {
      letter: "B",
      name: "Professional Education Grants",
      lines: [
        "Helping aspiring professionals access the qualifications and training needed to enter or progress in specialist careers.",
      ],
      listLabel: "Priority subject areas may include:",
      items: [
        "Medicine and healthcare",
        "Nursing and allied health professions",
        "Engineering and architecture",
        "Law and legal studies",
        "Finance, accounting and business",
        "Teaching and education",
        "Science and research",
        "Information technology and digital innovation",
      ],
      image: photo.professional,
    },
    {
      letter: "C",
      name: "Women in Education Scholarships",
      lines: [
        "Encouraging women from financially disadvantaged backgrounds to pursue higher education, professional qualifications and career development.",
        "The programme aims to address financial and social barriers that may limit women's educational and professional opportunities.",
      ],
      image: photo.women,
    },
    {
      letter: "D",
      name: "Vocational & Skills Development Grants",
      lines: ["Supporting individuals who wish to gain practical qualifications and employment-related skills."],
      listLabel: "Areas may include:",
      items: [
        "Digital skills and information technology",
        "Software development and data skills",
        "Business administration and management",
        "Accounting and financial skills",
        "Construction and engineering trades",
        "Healthcare and social care qualifications",
        "Accredited vocational training and apprenticeships",
      ],
      image: photo.vocational,
    },
    {
      letter: "E",
      name: "Student Hardship & Education Continuation Grants",
      lines: [
        "Providing supplementary financial assistance to students experiencing unexpected financial difficulties that may interrupt their education.",
      ],
      listLabel: "Support may be considered for:",
      items: [
        "Unexpected household financial hardship",
        "Essential study materials and equipment",
        "Course-related travel expenses",
        "Unforeseen educational costs",
        "Financial circumstances threatening continuation of studies",
      ],
      image: photo.hardship,
    },
    {
      letter: "F",
      name: "Academic Excellence & Future Leaders Awards",
      lines: [
        "Recognising individuals who demonstrate exceptional academic commitment, leadership, community involvement or outstanding potential.",
        "These awards will celebrate achievement while helping recipients progress towards their educational and professional ambitions.",
      ],
      image: photo.excellence,
    },
  ] satisfies Grant[],
} as const;

/* -------------------------------------------------------------------------
   4. WHO CAN APPLY?
   ------------------------------------------------------------------------- */

export type ApplicantIcon =
  "enrolled" | "school" | "professional" | "returning" | "income" | "first" | "barriers" | "hardship";

export const scholarshipsWho = {
  id: sections.who.id,
  kicker: "Who Can Apply?",
  titleLead: "Who Can",
  titleAccent: "Apply?",
  lead: "Our programme will aim to support individuals who demonstrate educational commitment and a genuine need for financial assistance.",
  listLabel: "Applicants may include:",
  applicants: [
    { label: "Students enrolled or accepted at recognised universities and colleges", icon: "enrolled" },
    { label: "Young people progressing from school or further education into higher education", icon: "school" },
    { label: "Individuals pursuing professional qualifications", icon: "professional" },
    { label: "Adults returning to education or retraining for employment", icon: "returning" },
    { label: "Students from low-income households", icon: "income" },
    { label: "First-generation university applicants", icon: "first" },
    { label: "Women and young people facing additional educational barriers", icon: "barriers" },
    { label: "Individuals experiencing unexpected financial hardship", icon: "hardship" },
  ] satisfies { label: string; icon: ApplicantIcon }[],
  eligibility: [
    "Eligibility will be determined by the criteria published for each funding round.",
    "Applications will be considered fairly and without discrimination.",
  ],
} as const;

/* -------------------------------------------------------------------------
   INTERNATIONAL STUDENTS & GLOBAL EDUCATION OPPORTUNITIES
   The document's paragraph, split into its sentences; what assistance may
   be considered for is set as a list on the card.
   ------------------------------------------------------------------------- */

export const scholarshipsInternational = {
  id: "international-students",
  kicker: "International Students",
  titleLead: "International Students &",
  titleAccent: "Global Education Opportunities",
  paragraphs: [
    `${brand.name} also aims to support talented and deserving international students who face financial barriers to accessing quality education and professional qualifications.`,
    "Through the International Students Scholarship Initiative, the Foundation seeks to encourage educational excellence, international academic exchange and equal access to learning opportunities.",
  ],
  card: {
    label:
      "Subject to available funding and eligibility criteria, assistance may be considered for international students pursuing:",
    items: [
      "Recognised undergraduate or postgraduate programmes",
      "Professional qualifications",
      "Specialised training",
    ],
    where: "In the United Kingdom and, where appropriate, other countries.",
    priority:
      "Priority may be given to students demonstrating genuine financial need, strong academic commitment and the potential to make a positive contribution to their communities and society.",
  },
  note: "Support will be subject to applicable immigration, education, charity and funding requirements.",
  image: photo.international,
} as const;

/* -------------------------------------------------------------------------
   5. HOW MUCH SUPPORT CAN APPLICANTS RECEIVE?
   The indicative grant levels, as written. `from`/`to` place each range on
   the chart's shared scale; "Up to £3,000" has no lower figure, so its bar
   fades in from the start of the scale.
   ------------------------------------------------------------------------- */

export const scholarshipsLevels = {
  id: "how-much-support",
  kicker: "Grant Levels",
  titleLead: "How Much Support Can",
  titleAccent: "Applicants Receive?",
  lead: "The programme aims to provide supplementary financial assistance based on individual circumstances, educational requirements and available charitable funding.",
  tableLabel: "Indicative proposed grant levels",
  headers: { category: "Grant category", support: "Proposed support" },
  scale: { max: 3000, ticks: ["£0", "£1,000", "£2,000", "£3,000"] },
  levels: [
    { category: "Student hardship grant", support: "£500–£1,000", from: 500, to: 1000 },
    { category: "Higher education grant", support: "£1,000–£2,000", from: 1000, to: 2000 },
    { category: "Professional education grant", support: "£1,000–£2,500", from: 1000, to: 2500 },
    { category: "Vocational training grant", support: "£300–£1,000", from: 300, to: 1000 },
    { category: "Exceptional circumstances grant", support: "Up to £3,000", from: 0, to: 3000, upTo: true },
  ],
  notes: [
    "The amount awarded will depend on the applicant's circumstances, the educational purpose of the request and the funds available.",
    "Awards are not guaranteed and may be made as one-off or supplementary grants rather than full tuition scholarships.",
  ],
} as const;

/* -------------------------------------------------------------------------
   6. OUR APPLICATION & SELECTION PROCESS, and
   7. OUR COMMITMENT TO FAIRNESS & TRANSPARENCY
   ------------------------------------------------------------------------- */

export const scholarshipsProcess = {
  id: sections.process.id,
  kicker: "Application & Selection",
  titleLead: "Our Application &",
  titleAccent: "Selection Process",
  lead: "We believe that educational assistance should be delivered through a fair, transparent and responsible process.",
  steps: [
    {
      title: "Submit an Application",
      text: "Applicants complete the scholarship application form and provide information about their educational programme, financial circumstances and requested support.",
    },
    {
      title: "Provide Supporting Documents",
      text: "Applicants may be asked to provide:",
      items: [
        "Proof of identity and relevant residency information",
        "University, college or training provider enrolment confirmation",
        "Details of the course and its duration",
        "Evidence of household income or financial circumstances",
        "A breakdown of the educational expenses",
        "Academic references or supporting statements, where relevant",
      ],
    },
    {
      title: "Application Assessment",
      text: "Applications are reviewed against published eligibility criteria, considering financial need, educational commitment, personal circumstances and the potential impact of the requested support.",
    },
    {
      title: "Award Decision",
      text: "An authorised scholarship assessment panel will make recommendations in accordance with the programme's governance and funding arrangements. Final awards will be approved by the trustees or an appropriately delegated committee.",
    },
    {
      title: "Grant Payment",
      text: "Approved grants will be paid directly to the educational institution or to the successful applicant, depending on the nature of the award and appropriate financial controls.",
    },
    {
      title: "Progress & Impact",
      text: "Recipients may be asked to provide evidence of enrolment, educational progress and the appropriate use of funds.",
    },
  ] as { title: string; text: string; items?: string[] }[],
  stepLabel: "Step",
  fairness: {
    title: "Our Commitment to Fairness & Transparency",
    lead: "The OneVoice Scholarship Programme will operate according to clear principles of charitable accountability.",
    listLabel: "We aim to ensure that:",
    items: [
      "All applications are assessed against published criteria.",
      "Financial need is considered fairly and consistently.",
      "Decisions are made independently and responsibly.",
      "Conflicts of interest are declared and managed.",
      "Personal and financial information is handled securely.",
      "Grants are used for their approved educational purposes.",
      "Donors receive appropriate reports on the impact of their contributions.",
    ],
    note: "Scholarship awards will be subject to available funding and the Foundation's charitable purposes and governing arrangements.",
  },
} as const;

/* -------------------------------------------------------------------------
   8. SUPPORT A STUDENT – BECOME A SCHOLARSHIP DONOR
   ------------------------------------------------------------------------- */

export type SupportIcon = "individual" | "corporate" | "named" | "annual" | "legacy";

export const scholarshipsSupport = {
  id: sections.support.id,
  kicker: "Support a Student",
  titleLead: "Your Support Can",
  titleAccent: "Change Someone's Future",
  /** On the card over the photograph. */
  difference:
    "For some students, a relatively small financial contribution can make the difference between continuing their education and giving up on an ambition.",
  lead: "Through the OneVoice Scholarship Programme, individuals, businesses, philanthropists and community organisations can help deserving students overcome financial barriers.",
  fundLabel: "Your contribution can help fund:",
  fund: [
    "University education",
    "Professional qualifications",
    "Essential learning resources",
    "Vocational and technical training",
    "Student hardship assistance",
    "Opportunities for women and disadvantaged young people",
  ],
  waysLabel: "Ways to Support",
  ways: [
    {
      name: "Individual Donations",
      line: "Make a contribution towards our general scholarship fund and help support students according to their needs.",
      icon: "individual",
    },
    {
      name: "Corporate Sponsorship",
      line: "Businesses can sponsor annual educational grants as part of their corporate social responsibility and community investment programmes.",
      icon: "corporate",
    },
    {
      name: "Named Scholarships",
      line: "Establish a dedicated scholarship in your name, your organisation's name or in memory of a loved one.",
      icon: "named",
    },
    {
      name: "Annual Scholarship Fund",
      line: "Commit to supporting a defined number of students each year through a recurring contribution.",
      icon: "annual",
    },
    {
      name: "Legacy and Major Gifts",
      line: "Support long-term educational opportunities through substantial philanthropic contributions and legacy giving.",
      icon: "legacy",
    },
  ] satisfies { name: string; line: string; icon: SupportIcon }[],
  primaryCta: supportStudent,
  secondaryCta: scholarshipPartner,
  image: photo.support,
} as const;

/* -------------------------------------------------------------------------
   9. ESTABLISH A NAMED SCHOLARSHIP
   Each suggested scholarship's name is split into "The OneVoice" and the
   rest, which the page sets large.
   ------------------------------------------------------------------------- */

export const scholarshipsNamed = {
  id: "named-scholarships",
  kicker: "Establish a Named Scholarship",
  titleLead: "Create a Legacy",
  titleAccent: "Through Education",
  paragraphs: [
    `${brand.name} invites individuals, families, businesses and institutions to establish named scholarships that support students in specific educational or professional fields.`,
    "A named scholarship offers an opportunity to recognise a person, celebrate a family legacy or demonstrate an organisation's commitment to education and social development.",
  ],
  listLabel: "Suggested scholarship programmes include:",
  prefix: "The OneVoice",
  scholarships: [
    {
      name: "Future Leaders Scholarship",
      line: "Supporting students with exceptional academic potential, leadership qualities and commitment to community development.",
    },
    {
      name: "Women in Education Scholarship",
      line: "Supporting women from disadvantaged backgrounds pursuing higher education and professional careers.",
    },
    {
      name: "Medical & Healthcare Scholarship",
      line: "Helping aspiring doctors, nurses and healthcare professionals access education and qualifications.",
    },
    {
      name: "Technology & Engineering Scholarship",
      line: "Encouraging the next generation of technology professionals, engineers, scientists and innovators.",
    },
    {
      name: "Community Excellence Scholarship",
      line: "Recognising students who combine educational achievement with meaningful community involvement.",
    },
    {
      name: "Student Hardship Fund",
      line: "Providing supplementary financial assistance to students experiencing unexpected hardship.",
    },
  ],
  note: "Named scholarship arrangements will be agreed with donors and administered under the Foundation's charitable governance and grant-making policies.",
} as const;

/* -------------------------------------------------------------------------
   10. OUR PARTNERS
   ------------------------------------------------------------------------- */

export type ScholarshipPartnerIcon =
  "universities" | "colleges" | "schools" | "corporate" | "professional" | "banks" | "philanthropists" | "community";

export const scholarshipsPartners = {
  id: "our-partners",
  kicker: "Our Partners",
  titleLead: "Working Together to Expand",
  titleAccent: "Educational Opportunity",
  lead: "We believe that improving access to education requires collective effort.",
  listLabel: "We welcome collaboration with:",
  partners: [
    { label: "Universities and higher education institutions", icon: "universities" },
    { label: "Further education colleges and training providers", icon: "colleges" },
    { label: "Schools and educational charities", icon: "schools" },
    { label: "Corporate organisations and business leaders", icon: "corporate" },
    { label: "Professional associations and industry bodies", icon: "professional" },
    { label: "Banks and financial institutions", icon: "banks" },
    { label: "Philanthropists and charitable trusts", icon: "philanthropists" },
    { label: "Community and voluntary organisations", icon: "community" },
  ] satisfies { label: string; icon: ScholarshipPartnerIcon }[],
  /** The document's sentence ("Partnerships may include …"), set as a list. */
  includeLabel: "Partnerships may include:",
  include: [
    "Financial contributions",
    "Named scholarships",
    "Mentoring",
    "Professional guidance",
    "Work experience",
    "Internships",
    "Educational development opportunities",
  ],
  invite: "We invite organisations that share our commitment to education and social mobility to work with us.",
  cta: { label: "Become a Partner", href: formHref("partner") },
  image: photo.partners,
} as const;

/* -------------------------------------------------------------------------
   11. OUR IMPACT – MEASURING SUCCESS
   ------------------------------------------------------------------------- */

export const scholarshipsImpact = {
  id: "measuring-success",
  kicker: "Our Impact – Measuring Success",
  titleLead: "Investing in Education.",
  titleAccent: "Building Stronger Communities.",
  lead: "We want our success to be measured not only by the funds distributed but by the opportunities created and lives positively influenced.",
  outcomesLabel: "Our intended outcomes include:",
  outcomes: [
    "Helping students continue or complete their education",
    "Improving access to higher education and professional qualifications",
    "Supporting women and disadvantaged individuals",
    "Encouraging vocational skills and employability",
    "Developing future professionals and community leaders",
    "Creating stronger relationships between educational institutions, businesses and communities",
  ],
  report:
    "We intend to publish an annual Scholarship Impact Report covering funds raised, grants awarded, recipients supported, educational outcomes and donor contributions.",
  ambition: {
    label: "Our Initial Programme Ambition",
    lead: "Subject to successful fundraising and formal programme approval, our proposed first-year targets are:",
    targets: [
      { figure: "25", label: "Students supported" },
      { figure: "£30,000", label: "Initial scholarship fundraising target" },
      { figure: "5", label: "Corporate scholarship partners" },
      { figure: "3", label: "University or college partnerships" },
    ],
    note: "These are fundraising and programme development targets, not existing awards or confirmed commitments.",
  },
} as const;

/* -------------------------------------------------------------------------
   12. FREQUENTLY ASKED QUESTIONS
   ------------------------------------------------------------------------- */

export const scholarshipsFaq = {
  id: sections.faq.id,
  kicker: "FAQs",
  titleLead: "Frequently Asked",
  titleAccent: "Questions",
  questions: [
    {
      q: "Who can apply for a OneVoice scholarship?",
      a: "Students and individuals who meet the eligibility criteria published for a particular funding round may apply. Priority will initially be given to applicants experiencing financial or social barriers to education.",
    },
    {
      q: "Do I need to be attending university?",
      a: "Not necessarily. Depending on the grant category, applicants may be studying at a university, college or recognised vocational or professional training institution.",
    },
    {
      q: "Can I apply if I am already receiving student finance or another scholarship?",
      a: "Yes, applicants may still be considered for supplementary support, subject to the relevant award criteria and assessment of their remaining financial need.",
    },
    {
      q: "Does OneVoice provide full tuition fee scholarships?",
      a: "The programme is initially designed to provide supplementary grants and targeted educational assistance. Full scholarships may be considered in the future if sufficient dedicated funding becomes available.",
    },
    {
      q: "Can I apply for help with books, equipment or other study expenses?",
      a: "Yes. Eligible educational expenses may include books, learning materials, essential equipment and other approved course-related costs.",
    },
    {
      q: "Can businesses sponsor a scholarship?",
      a: "Yes. Businesses can support the general scholarship fund, sponsor a specific subject area or establish a named scholarship.",
    },
    {
      q: "Can I establish a scholarship in memory of someone?",
      a: "Yes. We welcome discussions with families and individuals who wish to create a lasting educational legacy in memory of a loved one.",
    },
    {
      q: "When can I apply?",
      a: "Application dates and funding rounds will be announced once the programme has been formally launched. Please contact the Foundation to register your interest.",
    },
    {
      q: "Will every applicant receive funding?",
      a: "No. Awards depend on eligibility, the strength of applications, available funds and the Foundation's grant-making decisions.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   CONTACT THE SCHOLARSHIP PROGRAMME
   The document's contact block. Its email and website are blank, so the
   site's enquiry form stands in, recording each enquiry as the Scholarship
   Programme's; its location is the one value it gives.
   ------------------------------------------------------------------------- */

export const scholarshipsContact = {
  id: CONTACT_ID,
  kicker: brand.name,
  titleLead: "Contact the",
  titleAccent: "Scholarship Programme",
  programme: "OneVoice Scholarship & Educational Grants Programme",
  lead: "For scholarship enquiries, donor partnerships, corporate sponsorship or named scholarship opportunities, please contact our team.",
  location: { label: "Location", value: "United Kingdom" },
  note: "Applications will open following formal programme approval and publication of the eligibility criteria and application timetable.",
  context: "Scholarship Programme",
  initialTopic: "interest",
} satisfies { context: EnquiryContext; initialTopic: EnquiryTopic } & Record<string, unknown>;

/* -------------------------------------------------------------------------
   13. JOIN US IN MAKING EDUCATION ACCESSIBLE
   Its heading as the kicker and its subtitle as the banner's title (so the
   title keeps to one line), its belief and closing line beneath, and two of
   its three calls to act ([Register Your Interest] is the form above).
   ------------------------------------------------------------------------- */

export const scholarshipsCta = {
  kicker: "Join Us in Making Education Accessible",
  titleLead: "Every Contribution Can",
  titleAccent: "Open a Door",
  // The document reads "ambition not simply"; a comma is added for the sense.
  description:
    "A student's future should be determined by their potential, determination and ambition, not simply by their financial circumstances. Support a Student. Sponsor a Scholarship. Transform a Future.",
  primaryCta: { label: "Donate Now", href: formHref("donate") },
  secondaryCta: scholarshipPartner,
  image: photo.cta,
} as const;

import { brand, contact, routes, type NavLink } from "./site";

/**
 * The three legal documents (Privacy Policy, Terms & Conditions, Cookie
 * Policy), kept as plain data so one <LegalContent /> lays them all out the
 * same way: numbered sections, each a run of paragraphs, sub-headings,
 * bullet lists and links. The set and the shape follow the Commonwealth
 * Entrepreneurs Forum's and the Asia Swiss Business Summit's legal pages.
 *
 * The brief (V.2, 24 October 2026) has no legal documents of its own. Its
 * website standards ask for "clear safeguarding, privacy, accessibility and
 * complaints information", its About Us block promises that personal
 * information is handled "in accordance with applicable data protection
 * requirements and our privacy policy", and its programme pages set out what
 * the Foundation's workshops are and are not. Every one of those lines is
 * used here in the brief's own words, marked "V.2" where it appears. The
 * rest is the standard wording of the two earlier sites' policies, cut to
 * what this site and this organisation actually do: the Contact page's
 * enquiry form is the only place the website collects personal details, and
 * the website sets no cookies of its own.
 *
 * Nothing here names an address, telephone number, registration number or
 * date the client has not given. Contact details come from `contact` in
 * site.ts and appear once they are filled in; until then each document
 * points to the Contact page. The pages carry no effective date until the
 * client sets one. These are drafts for the client to approve, ideally with
 * their own adviser, before the site goes live.
 */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "sub"; text: string }
  | { type: "link"; link: NavLink };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalPage = {
  title: string;
  /** The masthead's standfirst, also the page's meta description. */
  description: string;
  sections: LegalSection[];
};

const name = brand.name;

export const legalLinks = {
  privacy: { label: "Privacy Policy", href: routes.privacy },
  terms: { label: "Terms & Conditions", href: routes.terms },
  cookies: { label: "Cookie Policy", href: routes.cookies },
} satisfies Record<string, NavLink>;

const contactPage: NavLink = { label: "Contact us", href: routes.contact };
const safeguarding: NavLink = { label: "Safeguarding", href: `${routes.about}#safeguarding` };

/** The Foundation's contact details that have been supplied; blank ones are left out. */
const details = [
  contact.address && `Address: ${contact.address}`,
  contact.telephone && `Telephone: ${contact.telephone}`,
  contact.email && `Email: ${contact.email}`,
].filter(Boolean) as string[];

/** Each document's closing "how to reach us": its own lead-in, the details on file (once there are any), and the Contact page. */
function contactBlocks(lead: string): LegalBlock[] {
  return [
    { type: "p", text: lead },
    ...(details.length ? [{ type: "list" as const, items: [name, ...details] }] : []),
    { type: "link", link: contactPage },
  ];
}

/* =========================================================================
   PRIVACY POLICY
   ========================================================================= */

export const privacyPolicy: LegalPage = {
  title: "Privacy Policy",
  description:
    "How we collect, use, store, protect and share personal information when you use our website, contact us, take part in our programmes or work with us.",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        // V.2, About Us, "Confidentiality & Privacy".
        { type: "p", text: "We respect the privacy of people using our services." },
        {
          type: "p",
          text: `This Privacy Policy explains how ${name} ("we", "us" or "our"), including the ${brand.centre}, collects, uses, stores, protects and shares personal information when you visit our website, contact us, refer someone to us, take part in our programmes, seminars, workshops and events, volunteer with us, or work with us as a partner.`,
        },
        // V.2, About Us, "Confidentiality & Privacy".
        {
          type: "p",
          text: "Personal information will be handled responsibly in accordance with applicable data protection requirements, including the UK General Data Protection Regulation and the Data Protection Act 2018.",
        },
      ],
    },
    {
      id: "who-we-are",
      title: "Who We Are",
      blocks: [
        {
          type: "p",
          text: `${name} is a community empowerment, skills and social inclusion initiative supporting individuals and families across London. Its programmes are delivered through the ${brand.centre}.`,
        },
        {
          type: "p",
          text: `For the purposes of data protection law, ${name} is the data controller of the personal information described in this policy. How to contact us is set out at the end of this policy.`,
        },
      ],
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      blocks: [
        { type: "p", text: "We may collect and process the following information." },
        { type: "sub", text: "3.1 When you contact us through our website" },
        { type: "p", text: "Our enquiry form asks for:" },
        {
          type: "list",
          items: [
            "What your enquiry is about",
            "Your name",
            "Your email address",
            "Your telephone number, if you choose to give it",
            "Your organisation, if you choose to give it",
            "Your message",
          ],
        },
        { type: "sub", text: "3.2 When you refer someone to us" },
        {
          type: "p",
          text: "If you refer someone to us, as an organisation, a family member, a friend or the person themselves, we will receive the details you share about them. Please only refer someone with their knowledge and agreement.",
        },
        { type: "sub", text: "3.3 When you take part in our programmes" },
        // V.2, Refer Someone ("Referral Process") and the OneVoice Journey.
        {
          type: "p",
          text: "Our work starts with a conversation. To identify your goals and needs and plan your support, we may record:",
        },
        {
          type: "list",
          items: [
            "Your contact details",
            "Your goals, skills, barriers and support needs",
            "Any reasonable adjustments or accessibility requirements you tell us about",
            "Your support plan, the programmes you join and your progress reviews",
            "Outcomes such as training, qualifications, employment or enterprise",
            "Your feedback on our programmes and activities",
          ],
        },
        { type: "sub", text: "3.4 When you volunteer or work with us" },
        // V.2, Volunteering: "Appropriate recruitment, safeguarding and role-specific procedures will apply."
        {
          type: "p",
          text: "If you volunteer, mentor, deliver sessions or work with us as a partner, we may collect your contact details, your organisation, your skills and experience, and the information our recruitment, safeguarding and role-specific procedures require.",
        },
        { type: "sub", text: "3.5 When you visit our website" },
        {
          type: "p",
          text: "Like most websites, the servers that host our website may automatically record technical information such as your IP address, browser type and the pages you request. This is used to keep the website secure and working.",
        },
      ],
    },
    {
      id: "sensitive-information",
      title: "Sensitive Information",
      blocks: [
        // V.2, Rights & Empowerment ("Our Commitment to Responsible Support").
        {
          type: "p",
          text: "Some of our work, including wellbeing, family support, domestic abuse support, rights and empowerment, can involve sensitive personal, legal and financial circumstances.",
        },
        {
          type: "p",
          text: "Where we need to hold information about your health, wellbeing or other sensitive matters to support you safely, we will hold only what is necessary, handle it with particular care and process it only where data protection law allows.",
        },
        {
          type: "p",
          text: "Please do not include sensitive details in the website enquiry form unless they are needed for us to respond to you.",
        },
        // V.2, Rights & Empowerment ("Safeguarding, Confidentiality & Professional Support").
        { type: "p", text: "In our seminars and workshops, personal disclosures will not be required." },
      ],
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      blocks: [
        { type: "p", text: "We may use personal information to:" },
        {
          type: "list",
          items: [
            "Respond to your enquiries",
            "Handle referrals",
            "Understand your goals and needs and plan your support",
            "Deliver our programmes, seminars, workshops and events",
            "Connect you with employers, education, enterprise and community opportunities, with your agreement",
            "Signpost or refer you to other services, with your agreement",
            "Recruit, support and manage volunteers and mentors",
            "Work with our partners",
            "Measure and improve the effectiveness of our programmes",
            "Keep people safe and meet our safeguarding responsibilities",
            "Maintain records and comply with legal obligations",
            "Keep our website and systems secure",
          ],
        },
        {
          type: "p",
          text: "Where you have agreed, or where the law otherwise allows, we may also send you news about our programmes, events and opportunities. You can ask us to stop at any time.",
        },
      ],
    },
    {
      id: "legal-basis",
      title: "Legal Basis for Processing",
      blocks: [
        {
          type: "p",
          text: "Under UK data protection law, we process personal information on one or more of these lawful grounds:",
        },
        {
          type: "list",
          items: [
            "Your consent",
            "Taking steps at your request, or performing an agreement with you",
            "Compliance with a legal obligation",
            "Protecting someone's vital interests",
            "Our legitimate interests in running and improving our services, where these are not outweighed by your rights",
          ],
        },
        {
          type: "p",
          text: "Where we process sensitive information, we also rely on one of the additional conditions that data protection law sets out for it, such as your explicit consent or safeguarding people at risk.",
        },
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality and Its Limits",
      blocks: [
        // V.2, About Us, "Confidentiality & Privacy".
        {
          type: "p",
          text: "There may be circumstances where information must be shared to protect someone from serious harm or where required by law.",
        },
        // V.2, Rights & Empowerment ("Safeguarding, Confidentiality & Professional Support").
        {
          type: "p",
          text: "Confidentiality and its limits will be explained clearly, including any safeguarding or legal obligations.",
        },
        { type: "link", link: safeguarding },
      ],
    },
    {
      id: "how-we-share-information",
      title: "How We Share Information",
      blocks: [
        { type: "p", text: "We may share information where necessary with:" },
        {
          type: "list",
          items: [
            "Employers, training providers, specialist organisations and other services we refer or connect you to, with your agreement",
            "Service providers who support our work, such as website hosting, email and IT providers",
            "Professional advisers",
            "Public bodies, the police or regulators, where the law requires it or to protect someone from serious harm",
          ],
        },
        // V.2, Research & Community Voice: "Anonymised findings, where appropriate, ..."
        {
          type: "p",
          text: "Where we report on our work to funders and partners, we use anonymised findings where appropriate.",
        },
        {
          type: "p",
          text: "We require service providers to handle information appropriately and in accordance with data protection requirements. We do not sell personal information.",
        },
      ],
    },
    {
      id: "research-and-evaluation",
      title: "Feedback and Evaluation",
      blocks: [
        // V.2, Mental Health & Wellbeing ("Measuring Our Impact").
        {
          type: "p",
          text: "We will use appropriate, proportionate methods to evaluate our work while protecting participants' privacy and respecting their choices.",
        },
        // V.2, Research & Community Voice.
        {
          type: "p",
          text: "Anonymised findings, where appropriate, can help inform programme development and partnership discussions.",
        },
      ],
    },
    {
      id: "international-transfers",
      title: "International Transfers",
      blocks: [
        {
          type: "p",
          text: "Some of the service providers we use may store or process information outside the United Kingdom. Where this happens, we will take appropriate steps to ensure the transfer is made in accordance with UK data protection law.",
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      blocks: [
        {
          type: "p",
          text: "We take reasonable technical and organisational measures designed to protect personal information against:",
        },
        { type: "list", items: ["Unauthorised access", "Loss", "Misuse", "Alteration", "Disclosure", "Destruction"] },
        {
          type: "p",
          text: "However, no system or method of electronic transmission can be guaranteed to be completely secure.",
        },
      ],
    },
    {
      id: "data-retention",
      title: "Data Retention",
      blocks: [
        {
          type: "p",
          text: "We keep personal information only for as long as reasonably necessary for the purposes for which it was collected, including:",
        },
        {
          type: "list",
          items: [
            "Responding to enquiries",
            "Delivering and reviewing support",
            "Safeguarding",
            "Reporting on our programmes",
            "Meeting legal, financial and funding requirements",
          ],
        },
        {
          type: "p",
          text: "How long we keep information depends on its nature and the legal requirements that apply to it.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights",
      blocks: [
        { type: "p", text: "Subject to data protection law, you have rights including:" },
        {
          type: "list",
          items: [
            "The right to access your personal information",
            "The right to have inaccurate information corrected",
            "The right to have information deleted",
            "The right to restrict how we use your information",
            "The right to object to certain uses of your information",
            "The right to data portability",
            "The right to withdraw your consent at any time",
          ],
        },
        { type: "p", text: "To exercise any of these rights, please contact us using the details below." },
      ],
    },
    {
      id: "children-and-young-people",
      title: "Children and Young People",
      blocks: [
        // V.2, Mental Health & Wellbeing (its commitments before "Measuring Our Impact").
        {
          type: "p",
          text: "Where activities involve children or adults who may be at risk, appropriate safeguarding procedures and checks will be established in line with the nature of the activity and applicable requirements.",
        },
        {
          type: "p",
          text: "Our website enquiry form is not intended for children. If you believe a child's personal information has been given to us without appropriate consent, please contact us.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        { type: "p", text: "Our Cookie Policy explains how our website uses cookies and similar technologies." },
        { type: "link", link: legalLinks.cookies },
      ],
    },
    {
      id: "third-party-websites",
      title: "Third-Party Websites",
      blocks: [
        { type: "p", text: "Our website may contain links to external websites." },
        {
          type: "p",
          text: `${name} is not responsible for the privacy practices, content or policies of third-party websites. Please review the privacy policies of those websites.`,
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to This Privacy Policy",
      blocks: [
        { type: "p", text: "We may update this Privacy Policy from time to time." },
        { type: "p", text: "The latest version will always be published on this page." },
      ],
    },
    {
      id: "contact",
      title: "Contact Us",
      blocks: contactBlocks(
        "If you have questions about this Privacy Policy or the way we handle personal information, please get in touch.",
      ),
    },
    {
      id: "complaints",
      title: "Data Protection Complaints",
      blocks: [
        {
          type: "p",
          text: "If you are unhappy with how we have handled your personal information, you have the right to complain to the Information Commissioner's Office (ICO), the UK's data protection regulator.",
        },
        {
          type: "p",
          text: "We would welcome the chance to address your concerns first, so please contact us before you approach the ICO.",
        },
      ],
    },
  ],
};

/* =========================================================================
   TERMS & CONDITIONS
   ========================================================================= */

export const termsConditions: LegalPage = {
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of our website, and what our information, programmes, seminars, workshops and events can and cannot offer.",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        { type: "p", text: `These Terms and Conditions govern your use of the ${name} website.` },
        { type: "p", text: "By accessing or using this website, you agree to these Terms and Conditions." },
        { type: "p", text: "If you do not agree with them, you should not use this website." },
      ],
    },
    {
      id: "about-us",
      title: "About Us",
      blocks: [
        {
          type: "p",
          text: `${name} is a community empowerment, skills and social inclusion initiative supporting individuals and families across London. Its programmes are delivered through the ${brand.centre}.`,
        },
      ],
    },
    {
      id: "website-purpose",
      title: "Website Purpose",
      blocks: [
        { type: "p", text: "Our website provides information about:" },
        {
          type: "list",
          items: [
            "Our work and programmes",
            "Seminars and workshops",
            "Events",
            "Community activities and volunteering",
            "Partnerships",
            "Ways to get involved and support our work",
            "News and resources",
          ],
        },
        { type: "p", text: "Information published on the website is provided for general information purposes." },
      ],
    },
    {
      id: "programmes-and-events",
      title: "Programmes, Workshops and Events",
      blocks: [
        // V.2, Seminars & Workshops; "Label activities as planned until confirmed" (website standards).
        {
          type: "p",
          text: "Some of the programmes, workshops and events described on this website are planned. The 2027 programme, dates, venues and registration details will be announced as arrangements are confirmed.",
        },
        // V.2, Refer Someone.
        { type: "p", text: "Eligibility may vary according to individual programmes and funding requirements." },
        // V.2, Rights & Empowerment (its programme areas).
        {
          type: "p",
          text: "All programme activities will be developed in accordance with the organisation's capacity, appropriate professional arrangements and applicable legal requirements.",
        },
        {
          type: "p",
          text: "Sending an enquiry or registering your interest does not by itself guarantee a place on a programme or at an event.",
        },
      ],
    },
    {
      id: "no-professional-advice",
      title: "No Professional Advice",
      blocks: [
        // V.2, Rights & Empowerment ("Safeguarding, Confidentiality & Professional Support") and Healthy Relationships ("Important information").
        {
          type: "p",
          text: "Our website, seminars and workshops provide general education and awareness. They do not replace:",
        },
        {
          type: "list",
          items: [
            "Individual legal advice",
            "Regulated financial advice",
            "Immigration advice",
            "Medical advice, counselling or psychotherapy",
            "Specialist domestic abuse support",
            "Emergency services",
          ],
        },
        // V.2, Rights & Empowerment ("Our Commitment to Responsible Support").
        {
          type: "p",
          text: "We aim to help people receive appropriate information and to refer them to suitably qualified professionals when necessary.",
        },
        // V.2, Rights & Empowerment ("Safeguarding, Confidentiality & Professional Support").
        {
          type: "p",
          text: "If someone is in immediate danger in the UK, they should call 999. Where it is unsafe to speak, the 999 operators can provide instructions for using the Silent Solution when appropriate.",
        },
      ],
    },
    {
      id: "website-use",
      title: "Website Use",
      blocks: [
        { type: "p", text: "You agree to use the website lawfully and responsibly. You must not:" },
        {
          type: "list",
          items: [
            "Use the website for unlawful purposes;",
            "Attempt to gain unauthorised access to our systems;",
            "Introduce viruses or malicious software;",
            "Interfere with the website's operation;",
            "Misrepresent your identity in an enquiry or referral;",
            "Send unlawful, abusive or offensive material.",
          ],
        },
      ],
    },
    {
      id: "enquiries-and-referrals",
      title: "Enquiries and Referrals",
      blocks: [
        {
          type: "p",
          text: "When you contact us or refer someone through the website, please make sure the information you give is accurate, and only refer someone with their knowledge and agreement.",
        },
        {
          type: "p",
          text: "The website enquiry form is not an emergency service. If someone is in immediate danger, call 999.",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      blocks: [
        {
          type: "p",
          text: `Unless otherwise stated, the content of this website is owned by or licensed to ${name} and may be protected by intellectual property rights. This includes:`,
        },
        { type: "list", items: ["Text", "Logos", "Branding", "Graphics", "Images", "Documents", "Website design"] },
        {
          type: "p",
          text: "You may not reproduce, distribute, modify or commercially exploit this content without our prior written permission, except where the law allows.",
        },
      ],
    },
    {
      id: "external-links",
      title: "Third-Party Content and External Links",
      blocks: [
        {
          type: "p",
          text: "The website may contain information provided by third parties and links to other websites.",
        },
        {
          type: "p",
          text: `${name} does not necessarily endorse third-party content, opinions, products or services, and does not control external websites. We are not responsible for:`,
        },
        { type: "list", items: ["Their content", "Their availability", "Their security", "Their privacy practices"] },
        { type: "p", text: "You access third-party websites at your own discretion." },
      ],
    },
    {
      id: "accuracy-of-information",
      title: "Accuracy of Information",
      blocks: [
        { type: "p", text: "We aim to keep the information on this website accurate and up to date." },
        { type: "p", text: "However, we do not guarantee that all information will always be:" },
        { type: "list", items: ["Complete", "Accurate", "Current", "Error-free"] },
        { type: "p", text: "We may update, change or remove website content without notice." },
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      blocks: [
        {
          type: "p",
          text: `To the extent permitted by law, ${name} shall not be liable for losses arising from:`,
        },
        {
          type: "list",
          items: [
            "Use of the website;",
            "Reliance on information on the website;",
            "The activities of third parties;",
            "Interruptions to the website;",
            "Technical failures.",
          ],
        },
        { type: "p", text: "Nothing in these Terms excludes liability where it cannot legally be excluded." },
      ],
    },
    {
      id: "privacy",
      title: "Privacy",
      blocks: [
        { type: "p", text: "Your use of this website is also governed by our Privacy Policy and Cookie Policy." },
        { type: "link", link: legalLinks.privacy },
        { type: "link", link: legalLinks.cookies },
      ],
    },
    {
      id: "concerns-and-complaints",
      title: "Concerns and Complaints",
      blocks: [
        {
          type: "p",
          text: "If you have a concern or complaint about our website or our services, please tell us through our Contact page so that we can look into it.",
        },
        // V.2, About Us, "Safeguarding & Keeping People Safe".
        {
          type: "p",
          text: "Where safeguarding concerns arise, appropriate action will be taken in accordance with relevant procedures and legal requirements.",
        },
        { type: "link", link: safeguarding },
      ],
    },
    {
      id: "changes",
      title: "Changes",
      blocks: [
        { type: "p", text: "We may amend these Terms and Conditions from time to time." },
        { type: "p", text: "The current version will always be published on this page." },
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law",
      blocks: [
        {
          type: "p",
          text: "These Terms and Conditions are governed by the laws of England and Wales, unless otherwise required by applicable law.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: contactBlocks("If you have questions about these Terms and Conditions, please get in touch."),
    },
  ],
};

/* =========================================================================
   COOKIE POLICY
   ========================================================================= */

export const cookiePolicy: LegalPage = {
  title: "Cookie Policy",
  description: "What cookies are, how our website uses them, and how you can manage them.",
  sections: [
    {
      id: "what-are-cookies",
      title: "What Are Cookies?",
      blocks: [
        { type: "p", text: "Cookies are small text files placed on your device when you visit a website." },
        {
          type: "p",
          text: "They help websites work properly, and they can also help website owners understand how visitors use their websites.",
        },
      ],
    },
    {
      id: "how-we-use-cookies",
      title: "How We Use Cookies",
      blocks: [
        {
          type: "p",
          text: "Our website does not use cookies for analytics, advertising or tracking. It does not set cookies of its own, and it does not store information in your browser.",
        },
        {
          type: "p",
          text: "The services that host and deliver our website may use strictly necessary cookies or similar technologies to keep it secure and working.",
        },
      ],
    },
    {
      id: "types-of-cookies",
      title: "Types of Cookies",
      blocks: [
        { type: "sub", text: "Strictly necessary cookies" },
        {
          type: "p",
          text: "These are needed for a website to work, for example to keep it secure or to send a form. They do not require consent.",
        },
        { type: "sub", text: "Functional, analytics and marketing cookies" },
        {
          type: "p",
          text: "These remember preferences, measure how a website is used, or support marketing. Our website does not use them.",
        },
        {
          type: "p",
          text: "If we decide to use any of them in future, we will ask for your consent before placing them and update this policy first.",
        },
      ],
    },
    {
      id: "third-party-websites",
      title: "Third-Party Websites",
      blocks: [
        {
          type: "p",
          text: "Our website may link to other websites, such as our social media pages. If you follow these links, those websites may set their own cookies.",
        },
        { type: "p", text: "Third parties are responsible for their own privacy and cookie practices." },
      ],
    },
    {
      id: "managing-cookies",
      title: "Managing Cookies",
      blocks: [
        {
          type: "p",
          text: "You can block or delete cookies through your browser settings. Each browser's help pages explain how.",
        },
        { type: "p", text: "Please note that blocking strictly necessary cookies may affect how websites work." },
      ],
    },
    {
      id: "more-information",
      title: "More Information",
      blocks: [
        { type: "p", text: "Our Privacy Policy explains how we handle personal information." },
        { type: "link", link: legalLinks.privacy },
      ],
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      blocks: [
        { type: "p", text: "We may update this Cookie Policy from time to time." },
        { type: "p", text: "The latest version will always be published on this page." },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: contactBlocks("If you have questions about this Cookie Policy, please get in touch."),
    },
  ],
};

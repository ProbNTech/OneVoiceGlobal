# OneVoice Global Foundation — Next.js Website Specification & Development Roadmap

> **Project type:** Community empowerment / nonprofit website and expandable community platform  
> **Target implementation:** Next.js App Router + TypeScript + Tailwind CSS + Sanity CMS  
> **Document version:** 1.0  
> **Prepared:** 20 October 2026  
> **Primary source:** `OneVoice Global Foundation - Website (Draft01).docx` (33-page client draft)  
> **Status:** Planning specification — **not** a claim that all programmes, relationships, legal registrations, or technical features are already approved.

---

## 0. How to Use This File in VS Code

Save this file as `ONEVOICE_NEXTJS_WEBSITE_SPEC.md` at the root of your Next.js repository.

This document serves as:

1. A source-aware website requirements document / product requirements document (PRD).
2. A sitemap and content strategy reference.
3. A UI/UX and responsive design brief.
4. A Next.js, CMS, forms, security, and deployment technical plan.
5. A phased implementation checklist for a human developer or AI coding assistant.

### Requirement labels

| Label | Meaning |
|---|---|
| **[SOURCE]** | Explicitly derived from the client's Draft01 document; do not silently alter its meaning. |
| **[PROPOSED]** | Recommended website or engineering solution; subject to client sign-off. |
| **[TBD]** | Not specified or confirmed by the client; needs clarification. |
| **[CONDITIONAL]** | Build or publish only once specified prerequisites have been confirmed. |

### Instructions for an AI coding assistant

- Read this document **before implementing components or routes**.
- Treat it as the project's planning specification, **not** a substitute for user approval or legal/safeguarding review.
- **Do not invent** client contacts, organisational registration details, staff members, partners, operating hours, programme availability, event dates, impact statistics, testimonials, or successful donation claims.
- Never imply a proposed programme is currently delivered unless its status is confirmed.
- Implement one phase at a time and keep the website buildable after each phase.
- Prefer Server Components by default, introducing Client Components only where interaction is required.
- Use semantic HTML, accessible interactions, responsive design, strict TypeScript, and reusable components.
- Do not add a complex custom admin dashboard unless the client approves operational workflows that require one.
- Sanity is for **public/editorial content**, not confidential referrals, wellbeing cases, or domestic-abuse disclosures.
- Do not collect or expose sensitive personal data until an authorised privacy and safeguarding workflow is specified, reviewed and tested.
- Do not integrate live payments before the organisation and donation provider have been verified and approved.
- Where actual brand assets/content are absent, use visibly marked **development placeholders** and a clearly identified proposed visual system.
- Use the currently installed dependency/API versions and up-to-date official documentation, rather than assuming commands and APIs remain unchanged.
- Show the user each milestone's deliverables and ask for approval before moving to irreversible or high-risk integrations.

---

## 1. Executive Summary

### 1.1 Project identity — [SOURCE]

- **Organisation:** OneVoice Global Foundation.
- **Slogan:** “Stronger Communities, Shared Opportunities, One World.”
- **Initiative:** Community Empowerment, Skills and Social Inclusion Initiative.
- **Core message:** “Empowering People. Building Skills. Creating Opportunities.”
- **Journey message:** “Learn. Develop. Connect. Progress.”
- **Final campaign message:** “One Person. One Voice. One Opportunity at a Time.”
- **Primary location/service context:** London and communities facing barriers to opportunity.

The draft describes OneVoice Global Foundation as a community empowerment and partnership platform connecting residents, community organisations, local authorities, education providers, charities, and employers. It describes OneVoice Skill Development Centre as the London-facing skills/community initiative.

**Important distinction:** [TBD] Confirm the legal, operational and branding relationship between OneVoice Global Foundation and OneVoice Skill Development Centre. Do not casually describe them as legally identical entities.

### 1.2 Mission, vision and purpose — [SOURCE]

**Vision:** Communities in which people of varied backgrounds can participate, develop potential, access opportunities and contribute to shared progress.

**Mission:** Help communities be heard; improve access to skills, education, wellbeing and opportunities; and build effective partnerships with public institutions, education providers, charities and employers.

**Purpose:** Be a trusted bridge between communities and wider society, supporting constructive participation and practical outcomes.

**Positioning constraint:** The draft says OneVoice must be positioned as a community partnership and empowerment platform — **not** as a political organisation, a replacement for established charities, or a body that automatically represents every community.

### 1.3 Website goals — [PROPOSED]

1. Make the organisation and its purpose immediately understandable.
2. Help individuals identify support appropriate to their circumstances.
3. Explain services and programmes without overwhelming visitors.
4. Provide safe, understandable contact and referral pathways.
5. Attract employers, training providers, community organisations, funders, and other partners.
6. Publish accurate news, events, resources and verified impact information.
7. Allow authorised editors to update public content without code changes.
8. Support future expansion into richer community and programme services.

### 1.4 Primary audiences — [SOURCE]

- Women and men.
- Young people and jobseekers.
- People returning to work or changing careers.
- Entrepreneurs, freelancers and professionals.
- New arrivals and communities experiencing barriers.
- Families and older people who may experience isolation.
- Community organisations, mentors and volunteers.
- Employers, colleges, universities, public-sector institutions, businesses and funders.

**Content rule:** Individual programme eligibility may depend on funding and programme-specific requirements. Never show universal eligibility unless confirmed.

---

## 2. Website Scope and Delivery Strategy

### 2.1 Release 1 — Content-first MVP — [PROPOSED]

Build the following first:

- Full responsive site shell, navigation and footer.
- Homepage with priority visitor journeys.
- About section and safeguarding/accessibility information.
- Five primary service-area landing/detail pages.
- Programme directory and reusable programme detail pages.
- Community, events and partnerships content pages.
- News, resources, impact and success-story templates.
- Get Support and Contact enquiries **limited to approved non-sensitive intake**.
- Public content CMS, image handling, SEO and editorial previews.
- Cookie/privacy handling appropriate to enabled tracking technologies.
- Accessibility and performance testing.

**Donation page:** Information page may be included in MVP. **Live payment acceptance is conditional** on organisational/provider verification and approved fundraising copy.

**Referral page:** Explains referrals in MVP. Actual sensitive referral submissions must use an approved secure workflow, or launch with a contact method specifically approved for such cases.

### 2.2 Release 2 — Extended functionality — [PROPOSED / CONDITIONAL]

- Event booking/registration and attendee communications.
- Volunteer onboarding and approved screening workflow.
- More sophisticated programme-enquiry routing and status management.
- Secure case/referral management platform with restricted roles, audits and retention rules.
- Advanced impact reporting and operational analytics.
- Multilingual content for languages agreed with the client.
- Online fundraising features and recurring donations, if not approved for MVP.
- Operational dashboard only if delivery staff need it.

### 2.3 Out of scope until separately approved

- AI chatbots dealing with vulnerable people or sensitive personal disclosures.
- Clinical, mental-health diagnosis, counselling or legal-advice tools.
- Automatic eligibility or safeguarding decision engines.
- Full CRM/case management platform implemented in a public content CMS.
- Automatic community representation or political advocacy claims.
- Unverified event schedules, fake programme enrolment counts or invented outcome metrics.

---

## 3. Content Architecture and Sitemap

### 3.1 Proposed desktop header — [PROPOSED]

**Primary menu:** About | Our Work | Programmes | Community | Impact | Get Involved  
**Utility links:** News & Resources | Partners | Contact  
**Primary CTA:** Get Support  
**Secondary CTA:** Donate (show only if approved/usable)

Use a keyboard-accessible, mobile-friendly dropdown/mega-menu. Avoid putting every programme into the top level of the navigation.

### 3.2 Source navigation inventory — [SOURCE]

The client's navigation draft calls for these major content areas:

1. Home.
2. About Us: Who We Are, Vision & Mission, Values, Approach, Team, Safeguarding, Policies, Accessibility.
3. Services: Community Support, Skills & Education, Advocacy & Leadership, Youth & Women, International Network.
4. Programmes: education, ESOL, digital literacy, careers, work readiness, employment, personal development, mentoring, wellbeing, family support and more.
5. Community: outreach, hub/networks, events, volunteering, community voice, achievement awards.
6. Partners: employers, training providers, community organisations, public sector, corporate partners, funders.
7. Impact: results, success stories, reports.
8. News & Resources.
9. Get Involved: referrals, volunteering, donations, partnerships, sponsorship.
10. Contact.

### 3.3 Proposed URLs / page templates — [PROPOSED]

| Route | Page | Content type | Launch |
|---|---|---|---|
| `/` | Homepage | CMS homepage content | MVP |
| `/about` | Who We Are + mission/vision | CMS page | MVP |
| `/about/values` | Values and approach | CMS page | MVP |
| `/about/team` | Team | CMS collection | When real biographies supplied |
| `/services` | Five service areas | CMS listing | MVP |
| `/services/[slug]` | Service detail | CMS template | MVP |
| `/programmes` | Programme directory | CMS listing/search | MVP |
| `/programmes/[slug]` | Programme detail | CMS template | MVP |
| `/community` | Community overview | CMS page | MVP |
| `/community/outreach` | Outreach | CMS page | MVP |
| `/community/voice` | Community voice | CMS page | MVP |
| `/events` | Upcoming/past events | CMS collection | MVP, if data available |
| `/events/[slug]` | Event detail | CMS template | MVP, if data available |
| `/partners` | Partner overview | CMS page | MVP |
| `/partners/[slug]` | Partner category detail | CMS template | When content approved |
| `/impact` | Impact overview | CMS page + verified metrics | MVP |
| `/impact/stories` | Success stories | CMS collection | When consent-approved stories exist |
| `/impact/stories/[slug]` | Story detail | CMS template | When stories exist |
| `/impact/reports` | Reports | CMS collection | When approved reports exist |
| `/news` | News listing | CMS collection | MVP |
| `/news/[slug]` | Article detail | CMS template | MVP |
| `/resources` | Resource directory | CMS collection | MVP |
| `/get-involved` | Ways to support | CMS page | MVP |
| `/get-support` | Support enquiry | Approved form/process | MVP |
| `/refer` | Referral overview | Approved workflow | MVP |
| `/volunteer` | Volunteering | Approved form/process | MVP |
| `/donate` | Donations | Content / hosted checkout | Conditional |
| `/sponsor` | Sponsor a programme | Enquiry page | MVP |
| `/contact` | Contact information/form | Approved form | MVP |
| `/safeguarding` | Safeguarding statement | Client-approved policy content | MVP |
| `/privacy` | Privacy notice | Legally approved policy | MVP |
| `/cookies` | Cookies notice | Depends on real site technologies | MVP |
| `/accessibility` | Accessibility statement | Reviewed policy | MVP |
| `/policies` | Policy directory | Approved policy documents | MVP |

Keep the data-driven pages templated rather than hand-coding each one.

### 3.4 Five main service areas — [SOURCE]

#### A. OneVoice Community

Community engagement, inclusion, surveys, listening sessions, cultural activities, networking, local partnerships and support for community organisations.

#### B. OneVoice Skills & Education

Digital confidence, English language, CVs, employability, training, careers guidance, enterprise, financial capability and mentoring.

#### C. OneVoice Advocacy

Community feedback, service navigation, inclusion, referrals, dialogue with public services and signposting to appropriately qualified professionals when needed.

#### D. OneVoice Youth & Women

Mentoring, leadership, confidence, volunteering, skills, participation, family wellbeing awareness, safeguarding and appropriate specialist signposting.

#### E. OneVoice International Network

International partnerships and learning, exchange of experience, professional networks and possible country chapters **as capacity permits**. The draft positions this as longer-term growth; do not present as an established global operational network without confirmation.

### 3.5 Programme directory grouping — [PROPOSED]

Use six simple filters based on source programme topics:

1. **Education & Digital Skills:** ESOL/everyday English, communication, digital literacy, AI awareness, digital for work, digital for business.
2. **Employment & Careers:** careers advice, employability, pre-employment, return to work, career development, employer events.
3. **Enterprise & Financial Capability:** entrepreneurship, self-employment, mentoring, business networking, budgeting and financial confidence.
4. **Youth, Women & Leadership:** youth development, women and men development, volunteering, leadership and resilience.
5. **Wellbeing & Family Support:** mental health awareness, wellbeing, domestic abuse information/referrals, family support.
6. **Community & Settlement Support:** new arrivals, community outreach, integration, information and signposting, awareness programmes.

The draft also mentions **drugs awareness** and **matrimonial relations & preventing divorce**. Preserve these in the content inventory and ask the client how they should be named and grouped before publishing. The phrase “Education, Everyday English (ESOL) &” appears incomplete in the source and requires editorial clarification.

### 3.6 Programme statuses — [PROPOSED]

Each programme has an explicit status:

- `active` — confirmed currently offered.
- `upcoming` — confirmed and scheduled.
- `planned` — proposed or not yet launched.
- `paused` — normally available but temporarily unavailable.
- `archived` — historical; cannot be applied for.

**Never** treat text in Draft01 as evidence that an event, workshop or programme is currently operational.

---

## 4. Homepage: Detailed Section Specification

### H-01 — Header and navigation

- Show logo/name; accessible desktop and mobile navigation.
- Sticky header acceptable if it does not cover content or interfere with accessibility.
- Desktop CTA: `Get Support`. Optional `Donate` if live.
- Mobile menu with proper focus management, escape-to-close, and visible focus states.

**Acceptance:** All routes reachable on keyboard and mobile; no dead links.

### H-02 — Hero

**Source headline:** “Empowering People. Building Skills. Creating Opportunities.”

**Source direction:** OneVoice connects people with support, skills, employment, enterprise, digital confidence, wellbeing, and community opportunities, particularly across London.

**Calls to action:** `Get Support` and `Explore Our Services`.

**Design:** Human-centered photograph of community participation with strong text contrast. Use approved real imagery, not artificial claims of actual participants.

**Acceptance:** Visitor can explain OneVoice’s purpose from the first screen; primary CTA works.

### H-03 — “How can we help?” quick pathways — [PROPOSED]

Create cards for:

- Find work.
- Learn skills.
- Improve English.
- Build digital confidence.
- Explore enterprise.
- Get connected to appropriate support.

Clicking a card goes to an appropriate programme/service detail or pre-filtered directory.

### H-04 — Why OneVoice? — [SOURCE]

Emphasise “One Organisation. Many Pathways.”

Briefly explain that one visitor may need more than a single service: employability, English, confidence, digital skills, mentoring, education, enterprise and wellbeing can be connected.

### H-05 — Five service areas

Five responsive cards linked to five `/services/[slug]` pages. Each needs a CMS-managed headline, description, image/illustration and working link.

### H-06 — Featured programmes

Show 3–6 confirmed programmes from CMS. Editorial controls for `featured`, `priority`, `status`, and `sortOrder`.

**Empty-state rule:** If no programmes are confirmed, show a meaningful introduction to planned activity without inventing courses or availability.

### H-07 — “Your OneVoice Journey” — [SOURCE]

The draft's journey is:

1. **CONNECT:** Start with a conversation.
2. **DISCOVER:** Identify your goals and needs.
3. **DEVELOP:** Build skills and confidence.
4. **CONNECT:** Access relevant employers, education, enterprise and community opportunities.
5. **PROGRESS:** Move towards employment, education, enterprise or greater independence.

For clearer UX, the fourth visual step could be labelled **ACCESS OPPORTUNITIES**, but obtain editorial approval before altering official wording.

### H-08 — Who we support

List audiences using an inclusive grid/chips. Include the source caveat that eligibility depends on funding and programme criteria.

### H-09 — Events / News

Cards for real upcoming events and recent published articles. All dates, titles and registration links must come from actual content records.

### H-10 — Impact and stories

Show real/approved outcome metrics, reports or participant stories. If evidence is unavailable, present the **impact framework** instead of invented numerals.

**Source impact framework:** `REACH → ENGAGE → DEVELOP → PROGRESS → SUSTAIN`.

### H-11 — Work with us

Audience-specific links for employers, training providers, community organisations, public-sector partners, funders and businesses.

### H-12 — Final CTA and footer

**Source message:** “Your Voice Matters. Your Future Matters.”

CTA: `Start Your Journey` / `Get Support`.

Footer: organisation name, brief description, approved contact details, policies, social links, copyright and optional legal registration disclosure when verified.

---

## 5. Inner Page Templates

### 5.1 Standard content page

- Breadcrumbs.
- Page title and short intro.
- Accessible heading hierarchy.
- Flexible CMS blocks: rich text, images, cards, lists, callouts, resource links, CTAs.
- Related links where appropriate.
- SEO metadata and social preview.

### 5.2 Service detail

Required fields:

- Service title and slug.
- Summary and hero imagery.
- Who the service is for.
- Main activities / pathways.
- Related programmes and resources.
- Delivery scope and status.
- CTA to approved enquiry method.

### 5.3 Programme detail

Required fields:

- Title, slug, category.
- Short summary and full explanation.
- Eligibility and any funding restrictions.
- Delivery status (`active`, `upcoming`, `planned`, `paused`, `archived`).
- Delivery type (in-person / online / hybrid / TBD).
- Location or coverage, only when known.
- Start/end date, duration and cost if confirmed.
- What participants can expect / learn.
- Enquiry/application CTA **only if available**.
- Related events or services.
- Last-updated date.

**Acceptance:** An interested person can tell what the programme is, whether it is available, whether they may be eligible, and what to do next.

### 5.4 Event detail

Required fields: name, summary, start/end datetime with UK timezone handling, location or online link, host, registration status, audience/eligibility, accessibility information, capacity (if applicable) and contact method.

- “Upcoming”, “Past” and “Cancelled” labels should derive from status/time.
- Never create fictitious booking slots.
- If event registration is external, use an approved external link and clarify that it leaves the site.

### 5.5 Story and impact pages

- Show only stories with recorded publication consent and approved redaction/anonymisation.
- Metric records include `value`, `unit`, `reportingPeriod`, `source`, `verifiedBy`, `published`.
- Avoid unqualified phrases such as “thousands helped” if no validated evidence exists.

---

## 6. UI/UX Design System — [PROPOSED, NOT OFFICIAL BRAND]

### 6.1 Design principles

- Human-first, respectful, community-centered.
- Professional and trustworthy, rather than overly corporate.
- Warm photographs and straightforward language.
- Strong visual hierarchy and generous whitespace.
- Accessible to users with limited digital skills.
- Avoid unnecessary visual noise and excessively complex animations.

### 6.2 Proposed visual tokens

| Token | Proposed value |
|---|---|
| `brand.navy` | `#103B60` |
| `brand.blue` | `#166EB0` |
| `brand.teal` | `#12857D` |
| `brand.gold` | `#F2B84A` |
| `surface` | `#F5F8FC` |
| `text.primary` | `#142334` |
| `text.muted` | `#526171` |
| `radius.card` | 16–20px |
| `container.max` | 1200–1280px |
| `body.font` | Inter (or approved alternative) |
| `display.font` | Manrope (or approved alternative) |

**Do not treat these tokens as official brand colours.** Rework after receiving client branding.

### 6.3 Core components

- `SiteHeader`, `MobileNav`, `MegaMenu`, `SiteFooter`.
- `Container`, `SectionHeading`, `Breadcrumbs`.
- `Button`, `LinkButton`, `Card`, `Tag`, `Badge`.
- `ServiceCard`, `ProgrammeCard`, `EventCard`, `StoryCard`, `PartnerCard`.
- `ResponsiveImage`, `CTASection`, `FeatureGrid`, `JourneySteps`.
- `RichText`, `ResourceLink`, `EmptyState`, `ErrorState`.
- `TextField`, `SelectField`, `CheckboxField`, `TextareaField`, `FormStatus`.
- `CookiePreferences` (if needed).

### 6.4 Responsive breakpoints

Mobile-first. Test content at **320px, 375px, 768px, 1024px, 1280px, 1440px** in addition to real devices. Breakpoints should follow the design and content rather than arbitrary screen names.

### 6.5 Animation

- Subtle fade/translate reveal when appropriate.
- Button/card hover states, not distracting motion.
- Mobile navigation open/close animation.
- Short transitions (~150–300ms) for standard UI.
- Respect `prefers-reduced-motion: reduce`.
- Avoid scroll hijacking and long animations around forms/sensitive support flows.

### 6.6 Photography & assets

The client draft contains illustrative community/workshop photographs on pages 6–10. Request original source files and evidence of publication rights before deployment.

- Use real, consented images where possible.
- Provide meaningful alternative text for informative images; decorative images get empty alt text.
- Optimise images with `next/image` where appropriate.
- Do not imply stock/photo-model subjects are real OneVoice participants.

---

## 7. Functional Requirements

### FR-01 — Navigation and content discovery — P0

- Responsive menus and accessible breadcrumbs.
- All routes and navigation links work.
- Clear page titles and sections.
- Programme categories and text search/filter where useful.
- Meaningful empty states; no empty grids labelled as active programmes.

**Acceptance:** User finds relevant service/programme within a few intentional clicks; menus work with keyboard and touch.

### FR-02 — CMS and editorial workflow — P0

- Authorised editors can create, update, preview, publish and archive content.
- CMS schemas validate required fields and slugs.
- Content has appropriate status/publish date.
- Editors manage banners, featured programmes, events, articles and resources.
- Role-based CMS access; no shared administrator credentials.
- Draft preview must not expose unpublished sensitive content to the public.

### FR-03 — Get Support — P0, guarded

**MVP fields to confirm with client:** `name`, `contactMethod`, `emailOrPhone`, `topic`, `shortMessage`, `privacyAcknowledgement`.

- Minimum necessary data only.
- Topic selection from approved support categories.
- Client-side and server-side schema validation.
- Anti-spam/rate limiting and abuse prevention.
- Success and error feedback.
- Staff notification excluding sensitive narratives.
- Data retention and access permissions approved before collection.
- Accessible, mobile-friendly layout.

**Important:** This is **not** permission to create a public domestic-abuse disclosure form or mental-health case intake. Those need an approved safeguarding process and dedicated safeguards.

### FR-04 — Referral pathway — P0 information / P1+ transactional

**[SOURCE]** Referral journey: `Refer → Initial Conversation → Needs Assessment → Support Plan → Programme → Progress Review`.

- Explain who can make a referral: self, partner organisation, family, friend etc.
- Display accurate programme eligibility caveats.
- Explain what happens next and how privacy will be protected.
- If a form is approved, confirm who is authorised to share what information and provide secure transmission/storage.
- Restrict staff access by role, log access, and document retention/deletion.

### FR-05 — Contact — P0

- Verified address/telephone/email/social links only.
- Contact form or approved external contact method.
- Clear response-time expectation only if client commits to one.
- No fabricated maps or addresses.

### FR-06 — Volunteer interest — P1

- Explain volunteering opportunities described in the draft (mentoring, digital support, outreach, events, administration, etc.).
- Volunteer enquiry with approved minimal fields.
- Do not represent initial interest as completed vetting or approved volunteer status.
- Tell users that safeguarding/screening requirements may apply.

### FR-07 — Partners / sponsorship — P1

- Partnership categories: employers, training providers, community organisations, public sector, corporate partners, funders.
- Category-appropriate CTAs and enquiry routing.
- Optional sponsor-interest form after approval.
- Do not display unapproved partner logos.

### FR-08 — News / resources — P0

- Article index and details.
- Category and search/filter controls if volume justifies them.
- Downloadable resources with titles, formats and sizes where available.
- SEO metadata and share previews.
- Responsible moderation of public content.

### FR-09 — Events — P0 list / P1 registration

- Show upcoming and past events.
- Event details, genuine dates and locations.
- Filter by event type where useful.
- Optional event registration when operationally ready.
- Confirmation, cancellation, capacity and waiting list requirements are **TBD**; do not invent.

### FR-10 — Donations — CONDITIONAL

- Display accurate charitable/fundraising status and approved appeal wording.
- If approved, use a hosted payment provider checkout (e.g. Stripe Checkout) rather than collecting card details on the website.
- One-time giving first; recurring giving only after approved accounting/support workflow.
- Server-created payment sessions, verified payment webhooks, idempotent fulfilment/recording, and donor confirmation.
- Staff and finance agree donation receipt, refund and accounting handling.
- Gift Aid handling only if organisation is eligible and an appropriate declaration flow has been reviewed.
- Never mark donations as completed based only on a browser redirect/success page.

### FR-11 — Impact — P0 content / P1 reporting

Track or publish only evidence-backed information. The source suggests:

- People engaged.
- Programme participation and training hours.
- Skills and digital skills gained.
- CVs completed and employment outcomes.
- Progression into learning.
- Businesses supported or enterprise starts.
- Mentoring, volunteering and community participation.
- Referrals, employer partnerships and wellbeing participation.

Do not automatically publish raw internal measurements or personal data.

---

## 8. Non-Functional Requirements

| ID | Area | Target / requirement |
|---|---|---|
| NFR-01 | Accessibility | Target **WCAG 2.2 AA**; test manually and automatically. |
| NFR-02 | Responsiveness | Usable at 320px and wider; no horizontal scrolling in standard layouts. |
| NFR-03 | Performance | Aim for Google Core Web Vitals good thresholds (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1) at the 75th percentile of real visits, where feasible. |
| NFR-04 | Reliability | Implement user-friendly error states, monitoring, backups and recovery procedures. |
| NFR-05 | Security | HTTPS, server validation, dependency updates, protected secrets and least-privilege access. |
| NFR-06 | Privacy | UK GDPR/PECR-aware design, data minimisation, lawful-basis review, retention/deletion and consent where required. |
| NFR-07 | SEO | Semantic HTML, canonical URLs, dynamic page metadata, structured data, XML sitemap, robots config. |
| NFR-08 | Browser support | Current stable Chrome, Safari, Firefox and Edge. |
| NFR-09 | Maintainability | Strict TS, modular components, CMS schemas, shared tokens and clean code conventions. |
| NFR-10 | Observability | Capture runtime errors and non-sensitive technical logs; redact submitted personal information. |
| NFR-11 | Content quality | No unverified claims, metrics, partnerships, qualifications or testimonials. |
| NFR-12 | Scalability | Reusable, CMS-driven templates; add operational services only as needed. |

### 8.1 Accessibility specifics

- Semantic landmarks and correct heading order.
- Labels, descriptions and actionable validation messages for fields.
- Visible keyboard focus, skip link, focus management in dialogs/menus.
- Sufficient text/UI contrast and readable fonts.
- Touch target sizing appropriate for mobile and WCAG 2.2 AA criteria.
- Alt text, meaningful link text, accessible document downloads where feasible.
- Animations respect reduced motion.
- Screen-reader and keyboard-only testing.
- Plain language, especially for support and safeguarding information.

### 8.2 Security / safeguarding specifics

- No service-role keys, secrets, SMTP keys or payment keys in the browser bundle.
- Server-side input validation, rate limiting and CSRF/origin checks where appropriate.
- Restricted roles for sensitive workflows, with documented staff responsibilities.
- Encryption in transit and at rest from chosen providers; evaluate key/access management.
- Defined data retention schedule and deletion process.
- Secure backup and incident-response responsibilities.
- Do not put names, health details, abuse disclosures or full form payloads in analytics, tracking pixels, monitoring errors or notification subject lines.
- Safeguarding contact and procedures must be approved by the responsible organisation.
- Obtain professional UK data protection advice as needed; engineering alone does not establish lawful processing.

---

## 9. Recommended Technical Stack

| Layer | Proposed tool | Rationale |
|---|---|---|
| Application framework | **Next.js 16.x / latest compatible stable** | App Router, server-rendered content, routing and metadata. |
| Language | **TypeScript** | Type safety and maintainability. |
| UI styling | **Tailwind CSS** | Responsive styling and consistent tokens. |
| Component library | **shadcn/ui + Radix primitives** | Customisable, accessible component foundations. |
| Icons | **Lucide React** | Coherent icons. |
| Animation | **Motion** (optional) | Intentional micro-interactions. |
| Content CMS | **Sanity Studio** | Structured public content, previews and editorial workflows. |
| Validation | **Zod** | Typed field/endpoint validation. |
| Forms | **React Hook Form** (when needed) | Accessible form state and validation. |
| Backend operations | **Next.js Server Actions / Route Handlers** | Server-side forms and integrations. |
| Database | **Supabase Postgres** (only if operational data requires it) | Private records beyond editorial content. |
| Transactional email | **Resend** or approved equivalent | Notifications that do not contain sensitive case data. |
| Donation checkout | **Stripe Checkout** or approved provider | Hosted card data processing. |
| Hosting | **Vercel** or approved host | Straightforward Next.js deployment. |
| Monitoring | **Sentry** or equivalent | Redacted error visibility. |
| Analytics | Privacy-aware tool with approved cookie setup | Understand traffic without excessive tracking. |

> **Architecture principle:** Do not introduce an external database only to hold blog posts, programme descriptions or events; these belong in the CMS. Do not introduce the operational database until real workflows require it.

### 9.1 Data flows

```text
Browser
  |
  v
Next.js public pages (Server Components by default)
  |                        |
  v                        v
Sanity CMS               Next.js server endpoints
(public content)          (validated actions/integrations)
                              |
                              +--> Approved email notification (minimal content)
                              +--> Approved private operational store (if needed)
                              +--> Hosted donation checkout (if approved)
```

### 9.2 CMS vs. private data separation

**In Sanity:** pages, programmes, service descriptions, published stories, approved impact data, events, images, articles, resource links.

**Not in public Sanity:** support case histories, domestic-abuse disclosures, health data, confidential safeguarding records, identity documents, private referral details.

### 9.3 Caching and editing

- Use the currently supported `next-sanity` integration patterns for the pinned versions.
- Configure published content fetch, draft previews, and revalidation/live updates in a way compatible with Next.js current cache behaviour.
- Keep any CMS access tokens and preview secrets appropriately scoped.
- Do not paste code for outdated packages into the project unverified.

---

## 10. File/Folder Architecture

Suggested `src/`-based layout:

```text
onevoice-foundation/
├── public/
│   ├── images/
│   ├── icons/
│   └── downloads/                   # public, approved resources only
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── about/
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── programmes/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── community/
│   │   ├── events/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── partners/
│   │   ├── impact/
│   │   ├── news/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── resources/
│   │   ├── get-involved/
│   │   ├── get-support/
│   │   ├── refer/
│   │   ├── volunteer/
│   │   ├── donate/
│   │   ├── sponsor/
│   │   ├── contact/
│   │   ├── safeguarding/
│   │   ├── privacy/
│   │   ├── cookies/
│   │   ├── accessibility/
│   │   └── api/                       # only actual server endpoints
│   ├── components/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── services/
│   │   ├── programmes/
│   │   ├── events/
│   │   ├── forms/
│   │   ├── shared/
│   │   └── ui/
│   ├── lib/
│   │   ├── cms/
│   │   ├── validations/
│   │   ├── actions/
│   │   ├── security/
│   │   ├── seo/
│   │   └── utils/
│   ├── config/
│   └── types/
├── sanity/                            # schemas / studio integration
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── package.json
└── ONEVOICE_NEXTJS_WEBSITE_SPEC.md
```

Adapt folders to the exact official Sanity starter/integration chosen. Do not create unused directories as a substitute for implementation.

---

## 11. CMS Data Models / Schemas

### 11.1 `siteSettings` (singleton)

`siteName`, `tagline`, `logo`, `primaryNavigation`, `footerNavigation`, `contactEmail`, `phone`, `address`, `socialLinks`, `legalIdentity`, `registrationDetails`, `defaultSeo`, `announcementBanner`.

All public contact/legal values are **TBD until approved**.

### 11.2 `page`

`title`, `slug`, `intro`, `heroImage`, `blocks`, `seo`, `status`, `publishedAt`.

### 11.3 `service`

`title`, `slug`, `summary`, `intro`, `image`, `activities[]`, `audiences[]`, `relatedProgrammes[]`, `cta`, `status`, `seo`, `sortOrder`.

### 11.4 `programme`

`title`, `slug`, `category`, `summary`, `body`, `image`, `status`, `eligibility`, `deliveryMode`, `serviceArea`, `location`, `startDate`, `endDate`, `duration`, `cost`, `contactMethod`, `ctaLabel`, `ctaUrl`, `relatedServices[]`, `relatedEvents[]`, `featured`, `seo`.

**Rules:** Do not require unavailable operational details as fake values; fields may be explicitly `TBD` or omitted for planned programmes. Ensure CTA depends on confirmed status.

### 11.5 `event`

`title`, `slug`, `description`, `category`, `startAt`, `endAt`, `timezone`, `venue`, `isOnline`, `registrationUrl`, `registrationStatus`, `capacity`, `accessibilityInfo`, `image`, `seo`.

### 11.6 `post`

`title`, `slug`, `excerpt`, `content`, `author`, `category`, `featuredImage`, `publishedAt`, `seo`, `status`.

### 11.7 `resource`

`title`, `slug`, `summary`, `category`, `fileOrUrl`, `format`, `language`, `lastReviewedAt`, `seo`.

### 11.8 `impactMetric`

`name`, `value`, `unit`, `periodStart`, `periodEnd`, `source`, `verifiedBy`, `publicationStatus`.

### 11.9 `successStory`

`title`, `slug`, `summary`, `body`, `image`, `anonymised`, `publicationConsentRecorded`, `editorialApproval`, `publishedAt`, `seo`.

**Only publish consent/approval flags, not signed consent evidence, in editorial metadata; keep documents in approved private storage.**

### 11.10 `partner` / `teamMember`

- Partner: `name`, `slug`, `category`, `logo`, `description`, `approvedToDisplay`.
- Team: `name`, `role`, `bio`, `image`, `approvedToDisplay`.

---

## 12. Forms & Backend Implementation Rules

### 12.1 Generic form execution

```text
Visitor opens form
    -> Completes approved fields
    -> Client-side validation
    -> Server-side validation
    -> Abuse prevention / throttling
    -> Approved private storage or routing
    -> Minimal safe notification
    -> Accessible success/failure message
```

**Never** use client-side validation as the only security boundary.

### 12.2 Form acceptance criteria

- Labels always attached to inputs.
- Field errors announced accessibly.
- Server rejects unexpected or oversized fields.
- No raw stack traces or personal content in responses/logs.
- Disabled/loading state prevents accidental duplicate submissions.
- Meaningful confirmation text, not fake promises of a response time.
- Notifications do not expose confidential enquiry descriptions.
- Terms/privacy links reflect real approved policy.

### 12.3 Referrals and vulnerable-person data

Before building detailed referral/safeguarding processing, require a written decision on:

- Data controller, lawful basis and (if needed) special-category processing condition.
- Which staff are authorised to see submissions.
- Secure storage/transmission and encryption.
- Whether a Data Protection Impact Assessment is needed.
- Retention and deletion schedule.
- Authentication, audit logs and incident response.
- Safeguarding escalation and emergency signposting.
- How third parties are authorised to share someone else's information.

Until those decisions exist, use **informational referral pages** and approved contact channels, not an improvised sensitive intake database.

### 12.4 Donation handling

Implement the following only after approval:

1. Validate the donation amount and currency on the server.
2. Create the hosted checkout session server-side.
3. Redirect to hosted checkout.
4. Validate provider webhook signature and event idempotency.
5. Record confirmed paid status only on trusted webhook/provider confirmation.
6. Avoid storing card numbers or CVC data locally.
7. Provide privacy-compliant donor confirmation and accounting records.
8. Test successful, cancelled, duplicate and failed payment flows.

---

## 13. SEO & Content Rules

- Unique page titles/descriptions for important pages.
- CMS-managed metadata with sensible safe fallbacks.
- Canonical URLs and clean human-readable slugs.
- Dynamic `generateMetadata` for CMS detail routes.
- XML sitemap including published URLs only.
- `robots.ts` with correct public/private crawling rules.
- Structured data where factually appropriate (`Organization`, `Article`, `Event`, `BreadcrumbList`); do not add false organisation credentials or prices.
- Meaningful headings, internal links, and alt text.
- Redirects when slugs change.
- Image optimisation and responsive sizing.
- Indexable content rendered on the server where practical.
- Dedicated 404 and safe error states.

**Content priority:** Clear explanation of OneVoice and what visitors can actually do now is more important than stuffing every proposed programme into search-engine pages.

---

## 14. Development Setup

### 14.1 Prerequisites

- Node.js compatible with the pinned Next.js/Sanity versions. For the referenced Sanity Next.js 16 integration, **Node.js 22.12+** is a sensible baseline; verify current official requirements before starting.
- `pnpm` package manager.
- VS Code.
- Git and a remote repository.
- Approved Figma file or initial agreed design tokens.

### 14.2 Initialise the project

```bash
pnpm create next-app@latest onevoice-foundation --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd onevoice-foundation
pnpm dev
```

The official Next.js installer may offer additional prompts/features. Choose the versions/options compatible with the project's tested dependencies.

### 14.3 Core dependencies

```bash
pnpm add lucide-react zod react-hook-form @hookform/resolvers
pnpm dlx shadcn@latest init
```

Then add the required UI components:

```bash
pnpm dlx shadcn@latest add button card input textarea select badge dialog accordion
```

Install Sanity using the **official Next.js integration quick start** for your selected versions. Do not blindly combine an older Studio template with current `next-sanity` packages.

For example, review: <https://www.sanity.io/docs/nextjs>

### 14.4 Environment variables template

Create `.env.example`, without credentials:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=

# Enable only when relevant integrations are approved:
# DATABASE_URL=
# RESEND_API_KEY=
# STRIPE_SECRET_KEY=
# STRIPE_WEBHOOK_SECRET=
# SENTRY_DSN=
```

**Never commit** actual `.env.local`, `.env.production` secrets or privileged service keys.

### 14.5 Quality scripts

Define or verify project scripts for:

- `dev`
- `build`
- `start`
- `lint`
- `typecheck` (e.g. `tsc --noEmit`)
- `test`
- `test:e2e`

Only add script commands after installing and configuring the corresponding tools.

---

## 15. Implementation Phases, Tasks & Definition of Done

### Phase 1 — Discovery and content approval (estimated 3–5 working days)

- [ ] Confirm Foundation vs Skill Development Centre naming/relationship.
- [ ] Confirm official logo, colours, typography, imagery rights.
- [ ] Clarify currently delivered vs planned programmes.
- [ ] Confirm exact legal identity, contact details, physical address and social links.
- [ ] Approve primary navigation and sitemap.
- [ ] Decide MVP forms and lawful/secure routing requirements.
- [ ] Determine what information the team will edit in CMS.
- [ ] Confirm donation-provider and organisational prerequisites.
- [ ] Produce page inventory and source-to-page mapping.

**Done when:** There is a signed-off sitemap, content inventory, and list of unresolved decisions.

### Phase 2 — Wireframes and visual design (estimated 5–8 working days)

- [ ] Wireframe desktop and mobile homepage.
- [ ] Wireframe service/programme index and detail pages.
- [ ] Wireframe support, referral information and contact flows.
- [ ] Set proposed design tokens and accessible colour combinations.
- [ ] Build Figma component variants and mobile navigation.
- [ ] Produce hover, focus, error and empty states.
- [ ] Review with stakeholders and record approval.

**Done when:** Key desktop/mobile templates and design system are approved.

### Phase 3 — Frontend foundation (estimated 8–12 working days)

- [ ] Initialise Next.js with TS, Tailwind and linting.
- [ ] Implement fonts, tokens, container and reusable components.
- [ ] Implement site header, mobile navigation, breadcrumbs and footer.
- [ ] Create homepage using approved section order.
- [ ] Implement all main content templates and placeholder/empty states.
- [ ] Ensure all links are connected to actual route destinations.
- [ ] Implement accessible responsive states and reduced-motion behaviour.

**Done when:** Public pages render cleanly and work at target screen sizes.

### Phase 4 — CMS and integrations (estimated 7–12 working days)

- [ ] Create CMS schemas with field validation and references.
- [ ] Connect CMS data to service, programme, event, article and resource routes.
- [ ] Implement draft previews and content revalidation.
- [ ] Allow editors to manage featured homepage content.
- [ ] Implement approved non-sensitive enquiries using server validation.
- [ ] Add verified contact details, policies and safe routing.
- [ ] If approved, implement donation checkout and webhook handling.
- [ ] Confirm that sensitive data never enters the public CMS or client logging.

**Done when:** Editors can manage public content, and every enabled workflow succeeds safely end-to-end.

### Phase 5 — QA and client acceptance (estimated 4–6 working days)

- [ ] Full responsive audit.
- [ ] Cross-browser tests.
- [ ] Keyboard, screen reader and WCAG 2.2 AA review.
- [ ] Form happy-path, error and spam tests.
- [ ] Security review of access control, secrets and logs.
- [ ] Verify no fabricated claims or unapproved imagery.
- [ ] SEO / sitemap / metadata review.
- [ ] Lighthouse and field-performance review.
- [ ] Client user-acceptance test and defects triage.

**Done when:** Critical issues are resolved and the client accepts the release.

### Phase 6 — Deployment and handover (estimated 2–3 working days)

- [ ] Create staging and production deployments.
- [ ] Configure custom domain, DNS and HTTPS.
- [ ] Set production environment variables and access roles.
- [ ] Verify CMS publishing in production.
- [ ] Verify real form delivery and error monitoring.
- [ ] Verify payment setup in live mode only if approved.
- [ ] Configure backups, monitoring, and retention schedules.
- [ ] Deliver editorial training and maintenance documentation.
- [ ] Create post-launch issue list and owner handover.

**Done when:** Approved website is live and staff can safely administer it.

### Planning timeline

- **Content-first MVP:** approximately 4–6 weeks, depending on supplied content, design approvals and integrations.
- **Broader public launch:** approximately 6–9 weeks.
- **Complex safeguarding/referral case management:** separate discovery and estimate.

These are planning estimates, not guaranteed delivery promises.

---

## 16. Testing Plan

### 16.1 Unit tests

- Validators, normalisation and data formatting.
- Programme status and date behaviour.
- Safe empty-state fallbacks.
- Link and content utility functions.

### 16.2 Integration tests

- CMS query mapping.
- Contact/get-support submission validation and routing.
- Email failure/retry behaviour without leaking personal data.
- Hosted payment webhook verification, if enabled.

### 16.3 End-to-end tests

1. Visitor opens homepage, chooses programme category, reads a programme.
2. Visitor opens mobile menu and navigates to a service.
3. Visitor submits approved non-sensitive enquiry.
4. Visitor receives validation errors for invalid data.
5. Editor publishes a CMS article and it appears after expected revalidation.
6. Unpublished/archived programme is not mistakenly shown as enrolment-open.
7. Keyboard user accesses menus, inputs and CTAs.
8. Payment is tested in sandbox for complete/cancel/fail/webhook duplicate cases, if enabled.

### 16.4 Content/launch gate

- [ ] Public routes contain no placeholder names, addresses, metrics, staff profiles or fake partners.
- [ ] Only approved programmes can be represented as active.
- [ ] Impact data have an approved source and reporting period.
- [ ] Stories/photos have publication permission.
- [ ] All CTAs point to active, appropriate destinations.
- [ ] Legal/privacy/safeguarding information reviewed by responsible representatives.
- [ ] No public or CMS exposure of sensitive personal data.

---

## 17. Pending Client Decisions / Questions

**Do not assume these answers.**

1. Is the legal organisation “OneVoice Global Foundation”, “OneVoice Skill Development Centre”, or an associated structure?
2. Which logo, colour palette, domain and brand typography are approved?
3. Which of the 19+ proposed programme topics are available **now**, and which remain planned?
4. Is there a current list of venues, dates, programme providers and eligibility conditions?
5. What are the official phone, email, postal address, website domain and social URLs?
6. Which genuine photographs may be published? Are consent/licences available?
7. Who approves and owns safeguarding, privacy, accessibility and data-retention policies?
8. Should `Get Support` use a simple general enquiry form, a phone/email workflow, or an existing secure system?
9. Will confidential referrals be handled through an established case-management service?
10. Who receives enquiries, volunteer submissions and partnership leads, and how quickly can they respond?
11. Is the organisation eligible and operationally prepared to accept online donations? Which provider and currency?
12. Are Gift Aid and recurring donation workflows desired and legally/accountingly ready?
13. Who are the CMS administrators, authors and reviewers?
14. Are verified impact statistics, reports, testimonials and partner logos available?
15. Does the client want multilingual content now or in a later phase? If so, which languages?
16. Does the client prefer a separate Sanity Studio domain or an embedded admin route?
17. What are the hosting, monitoring, monthly-service and maintenance budgets?

---

## 18. Future Enhancement Backlog (Not MVP Commitments)

- Multi-language support after translations/editorial process are approved.
- Advanced programme search and personalised *non-sensitive* discovery.
- Event registration and reminders.
- Volunteer portal and onboarding workflow.
- Secure staff-only participant/case tracking using an appropriate system.
- Exportable, verified impact dashboards.
- Partner application review workflow.
- Accessibility improvements based on real user research.
- Better self-service resource navigation.
- Community feedback surveys with appropriate privacy/ethics review.

Do not prioritise speculative features before confirming that a public website and basic content administration meet users' immediate needs.

---

## 19. Suggested Work Order for a Coding Agent

If you are using Cursor, GitHub Copilot Chat, Claude Code, or another model in VS Code, give it this file and proceed in controlled stages.

### Agent prompt 1 — Analyse and plan

> Read `ONEVOICE_NEXTJS_WEBSITE_SPEC.md` fully. Extract the approved facts, the proposed solutions, and the open questions separately. Do not code yet. Produce a page implementation map, component inventory, CMS schema plan, and milestone checklist. Flag any dependencies that require client approval. Do not invent organisational facts.

### Agent prompt 2 — Initialise and build design foundation

> Implement Phase 3's Next.js project foundation: TypeScript, Tailwind, accessible layout, proposed design tokens, header, mobile menu, footer and reusable visual components. Use responsive, semantic components. Keep all content placeholders clearly identified and do not claim programmes are active. Run lint and typecheck and report results.

### Agent prompt 3 — Build homepage and page templates

> Implement homepage sections H-01 through H-12 and reusable service, programme, article, event and content page templates using typed local mock **structure** only. Do not invent impact metrics, partners, participants, availability or dates. Make all actions navigate appropriately. Include empty/loading/error states and responsive design. Run tests before reporting completion.

### Agent prompt 4 — Integrate Sanity CMS

> Implement the approved Sanity content schemas and current recommended Next.js integration for the pinned versions. Connect programme, services, news, resources and events. Support editorial previews and published-only public pages. Keep sensitive operational data outside Sanity. Verify build, lint and typecheck.

### Agent prompt 5 — Forms and integrations

> Implement only client-approved forms with Zod server validation, accessibility, rate limiting, minimal collection and secure routing. Do not implement sensitive referrals or payment collection without explicit approved requirements. Document any remaining security/safeguarding decisions. Add tests for success and failure paths.

### Agent prompt 6 — QA and launch

> Execute the launch checklist. Audit responsiveness, keyboard accessibility, reduced-motion support, performance, metadata, structured data, broken links, secrets, data exposure, and published-content accuracy. Create a concise release-readiness report with blockers; do not declare production ready while critical issues remain.

---

## 20. Official Documentation and Standards

These external references are **implementation guidance**, not content sourced from the client's draft.

- Next.js App Router installation: <https://nextjs.org/docs/app/getting-started/installation>
- Next.js metadata/sitemap/robots: <https://nextjs.org/docs/app/api-reference/file-conventions/metadata>
- Sanity + Next.js: <https://www.sanity.io/docs/nextjs>
- Sanity visual editing with Next.js App Router: <https://www.sanity.io/docs/nextjs/visual-editing-with-next-js-app-router>
- shadcn/ui Next.js installation: <https://ui.shadcn.com/docs/installation/next>
- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- ICO — special category data: <https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/>
- ICO — cookies and similar technologies: <https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/>
- Charity Commission — fundraising responsibilities: <https://www.gov.uk/government/publications/charity-fundraising-a-guide-to-trustee-duties-cc20/charities-and-fundraising>
- Stripe hosted checkout: <https://docs.stripe.com/checkout/quickstart>

---

## 21. Final Definition of Success

The initial website is successful when:

- Visitors immediately understand OneVoice's **actual** purpose and offerings.
- People can navigate to support, education, careers, community and partnership pathways without confusion.
- Programme status and eligibility are communicated accurately.
- Staff can independently publish and update approved public content.
- Forms and referrals are limited to approved, appropriately protected processes.
- The website is fast, accessible, secure, mobile-friendly and maintainable.
- All impact, partner and charity/fundraising claims can be substantiated.
- The next development phase can add richer operations without rewriting the public website.

**Primary build principle:** Build a trustworthy, inclusive community website first. Add complex workflows only after their owners, processes, data safeguards and success criteria have been confirmed.

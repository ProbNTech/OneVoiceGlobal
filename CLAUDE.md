@AGENTS.md

# OneVoice Global Foundation website: how we design and build it

This file is the playbook for every page on this site. Read it before designing or coding anything, and follow it unless the person you are working with tells you otherwise. The home page is built and its design is approved. It is the reference for everything that follows, so open `src/app/(site)/page.tsx` and the files under `src/components/site/` and reuse them before inventing anything new.

## 1. What we are building

- **Client:** OneVoice Global Foundation (the name the source documents use; the client tried "OneVoice Community Foundation" from 27 October 2026 and returned to the original name and logo on 30 October), a London community empowerment, skills and social-inclusion charity. Its delivery arm is "OneVoice Skill Development Centre".
- **Feel:** clean, soft and elegant, a little premium, media-rich (lots of real-looking photographs), with smooth, premium motion. It should be calmer and sleeker than our full-premium event sites (ASBS, CWEF) but built the same way.
- **Style references:** elaflooring.co.uk (its section patterns are the user's favourites), asianresource.org.uk, reachvolunteering.org.uk. **Motion references:** innovatorpathway.co.uk, asianresource.org.uk.
- The intern's first design (everything under `src/components/{layout,shared,work}`, `src/data/{navigation,services,work,programmes,legacy-home}.ts` and the `(legacy)` route group) was rejected. Never copy its look or reuse its components for new pages.

## 2. Content rules (strict)

- **All copy comes from the client's source document:** `_source/OneVoice Global Foundation - Website (Draft01).docx`. `_source/` is gitignored, so ask the user for the file if it is missing. The document gives every page's content and the full menu.
- You may reshape copy to fit a design: split a paragraph, shorten a list, or use one of the document's own lines as a title or label. You may not add new ideas, claims or promises.
- When a section needs a title the document does not give, borrow a line the document uses elsewhere, and note its source in a comment in the data file (see `src/data/home.ts`).
- **Never invent** statistics, testimonials, partner names or logos, contact details, social links, dates or venues. The document's contact block is blank. `src/data/site.ts → contact` holds only values the user or client has supplied (interim address, telephone and email given on 30 October 2026); empty values, such as the website, are simply not rendered. The four social platforms show as icons without links until URLs arrive.
- Keep card copy short: a card shows the document's title and one line. Don't pile on bullet lists, chips or sub-headings unless the user asks.
- British English. Write the names exactly: "OneVoice Global Foundation" (never "OneVoice Community Foundation", the name used briefly in October 2026; take it from `brand.name` in `src/data/site.ts`), "OneVoice Skill Development Centre". The logo is `logo` in the same file: the client's `public/OneVoiceGlobak_logo_.png`, used exactly as supplied. Never crop, recolour or rearrange it (the user rejected an edited lockup on 30 October 2026); on dark bands it sits on a white plate.

## 3. Design rules from the user's reviews (follow these)

**Layout and rhythm**
- **Full width ("container-fluid").** Wrap content in `<Shell>` (the `shell` utility): full width with a fluid gutter, `--gutter` = clamp(1.25rem, 4vw, 5rem), capped at 1920px. Don't use fixed max-width containers.
- **Dense spacing.** Space between sections comes from `py-band` (`--spacing-band` = 28px on phones, 40px on desktop). Gaps inside a section stay about 32–48px (title to content `mt-8`/`lg:mt-10`). The user rejected airy layouts twice, so never add generous whitespace.
- **Compact height.** When a section runs tall, centre its content, widen it, or put list items two to a row rather than stacking.
- **Alternating backgrounds.** Bands alternate cream / white / sand. Navy (`navy-950`) is for the footer and dark feature cards, and full-bleed photos carry the hero. Check both neighbours when you change a band's tone.

**Section design**
- **Vary the sections.** Every section on a page takes a different design approach; repeating one card pattern reads as monotonous.
- **No sticky or pinned scroll effects.** No sticky left columns, scrollytelling or pinned horizontal galleries: the user rejected all of them. The About page's OneVoice Journey was pinned briefly on 2026-10-22 and the user had it unpinned the same day.
- **Simple items stay simple.** An icon list is just an icon circle with text beside it, with no card, tile or background behind it. An image card is a photo with its title and line underneath, with no card background.
- **No decorative hairlines.** None beside or under headings, and none between list rows.
- **Shapes never crop text.** Organic shapes (arches, leaf corners) are welcome on photos, but keep the corners under any text small.
- **Patterns the user picked** (reuse them where the content fits):
  - **Hero:** a full-screen photo slideshow behind the copy; slides change every 2.5s; slide words with progress bars; no pause/play button; the turning tagline badge in the bottom-right corner (`Hero.tsx`).
  - **Process / steps:** ELA "Our Process" style: centred title (no lines), filled teal icon circles with a ring that draws itself, number, uppercase spaced title, short line (`Journey.tsx`).
  - **Intro plus photo:** ELA "What We Deliver" style: text beside a large shadowed photo, then image cards with a saffron icon tab over the photo's corner and the title and line underneath (`Programmes.tsx`).
  - **Partners / feature panel:** ELA "Quality Assurance" style: one rounded sand panel, an icon list two to a row on the left, and a dark photo card with a checklist and CTA on the right (`WorkWithUs.tsx`).
  - **Expanding photo panels:** hover or tap opens one panel, and the rest fold to vertical labels (`WhyOneVoice.tsx` with the `.panels` CSS).
  - **People marquee:** two rows of arch and leaf portrait cards moving in opposite directions (`WhoWeSupport.tsx`).
  - **Closing CTA:** the CWEF "Become a Sponsor" banner. A rounded photo panel inside the page width under an even shade, with centred content and the title on one line (`FinalCta.tsx`).
  - **Footer:** ELA Flooring style. A dark band with the logo and a short line, link columns and Get in Touch, then a thin copyright/tagline bar (`SiteFooter.tsx`).
- **Media-rich.** Support sections with photography, but don't force photos onto plain lists.

**Photographs**
- Show the activity (learning, mentoring, an interview), not posed portraits. Avoid heavy tints: shade only where text sits.
- **Every image is used once across the whole site (strict rule, 28 October 2026).** No photograph may appear on two slots or two pages, even for the same subject: each slot gets its own image. Before reporting, check the whole site for repeated `src` values, not just the page in hand. Brand marks are not photographs and may repeat.
- **One shape per slot.** Each slot keeps the same aspect ratio at every breakpoint, so one image fits everywhere without heavy cropping.
- **Generated images.** Photographs are generated in ChatGPT for each slot, cut to the slot's exact size and saved under `public/images/<page>/`; the originals, prompts and scripts are in `_source/generated/`.
  1. List each slot in the page's media brief (the home page's is `_source/home-media-brief.md`) with its file name, exact pixel size, where text sits on it, and a prompt. Every prompt ends with the shared style block.
  2. A slot with no image of its own yet is marked `pending: "<file>.jpg"` in the page's data file; until it arrives it may not borrow a photo already used elsewhere.

## 4. Design system (`src/styles/site.css`)

- **Colours** (taken from the logo):
  - `ink`/`navy-900` (#0a2540) is the text and anchor colour; `navy-950` is for dark bands.
  - `ocean-600` (#0b5394) is the logo blue; `lagoon-600` (#0e7a76) is the logo teal; Orange is **always a gradient**, never one flat shade (the user's rule, 30 October 2026): a brighter take on britononetech.com's brand gradient, #ffb347 → #ff8c1a → #ff6a00. **Every orange value lives in `src/styles/brand-colours.ts`** (the root layout publishes it as `--orange-*` CSS variables; `site.css`, `ui/OrangeGradients.tsx` and the email in `lib/notify.ts` all read it), so change the orange there and nowhere else. Use the utilities at the foot of `site.css`, never `bg-saffron-*`/`text-saffron-*`: `bg-orange` (fills; anything on it is white), `bg-orange-hover`, `bg-orange-light`, `bg-orange-soft` (tints and glows), `text-orange` (lettering on dark), `text-orange-light` (mid-tone grounds), `text-orange-ink` (small labels on light bands, a deeper gradient that stays readable), `icon-orange`/`icon-orange-ink` (line icons, via the SVG gradients in `ui/OrangeGradients.tsx`), `stroke-orange`/`fill-orange` (other SVG shapes) and `underline-orange`. The solid `saffron-*` values remain only as fallbacks and for focus rings, text selection and the email template. The scale kept the name `saffron` from the interim logo's amber.
  - On dark backgrounds use the light tints `ocean-300` and `lagoon-300` for blue and teal accents, and `text-orange` for orange.
  - Neutrals: `cream` (the page paper), `sand`, `mist`, `slate` (body text), `ink-muted`, `line`. The quiet text colour is `ink-muted`, not `muted`: `--color-muted` belongs to the legacy shadcn scale in `globals.css`, whose `@theme` is declared after `site.css` is imported, so `text-muted` comes out near-white.
- **Type:**
  - **Display face:** Fraunces (`font-display`). Always add `[font-variation-settings:'SOFT'_100]` and use normal weight. The accent half of a title is italic, light, and coloured: lagoon on light backgrounds, the orange gradient (`accentTone="saffron"`) on dark.
  - **Body face:** Plus Jakarta Sans (`font-body`, the default inside the site).
  - **Sizes:** `text-display` (hero), `text-title` (section titles), `text-statement` (large statements), `text-lead`.
  - **Small titles** on cards and steps are uppercase, bold and widely tracked (ELA style).
- **Shape:** `rounded-card` (1.25rem) and `rounded-panel` (2rem); buttons are pills. Shadows are soft and navy-tinted (e.g. `shadow-[0_30px_60px_-40px_rgb(10_37_64/0.55)]`).
- **Easing:** `ease-out-soft` (cubic-bezier(.16,1,.3,1)) for most motion; `--ease-in-out-soft` for curtain wipes and drawn lines.

## 5. Building blocks (`src/components/site/ui/`)

- `Shell`: the page measure. `Band`: a section wrapper with a tone (cream, white, sand, mist, navy) and `py-band`.
- `Kicker`: the small uppercase label above a title, led by three dots in the logo colours (`tone="dark"` on dark backgrounds).
- `Title`: a two-tone title with `lead` and `accent`. Each half rises from a mask. Props: `size` (display, title, statement), `tone`, `accentTone`, and `inline` (both halves on one line).
- `Cta`: the pill button, magnetic on mouse hover. Variants: `ink`, `saffron`, `white`, `outline`, `outline-light`; sizes `md` and `sm`. `className` goes on the outer wrapper. `ArrowLink` is the quieter text link with an underline that draws on hover.
- `Reveal`: the scroll entrance. Variants: `up`, `left`, `right`, `scale`, `fade`, `lines`, `image`. Use `delay` to stagger (70–120ms steps), and `margin="0px"` for anything sitting at the foot of the first screen.
- `Magnetic`, `GlideTrack` (a marquee that eases to a stop on hover) and `SocialIcon`.
- **Layout pieces** (`src/components/site/layout/`):
  - `SiteHeader`: white over the home hero, cream once scrolled; after the CWEF header, the logo hangs large below the bar at the top of every page (128px desktop, 88px phones) and shrinks into the bar on scroll, so every hero keeps `pt-32 lg:pt-40` of top room; hides on scroll down; reading-progress line; dropdowns; full menu overlay.
  - `SiteFooter`, `Logo` (`tone="light"` puts it on a white plate for dark backgrounds), and `SmoothScroll` (Lenis).

## 6. Motion toolkit (premium, smooth, never flashy)

- **Smooth scrolling:** Lenis, mounted in the site layout. Anything that must scroll on its own gets `data-lenis-prevent` (the menu overlay does).
- **Reveals:** CSS-driven. `<Reveal>` only adds `.is-in`. Blocks rise and sharpen out of a soft blur, and headline lines rise one after another.
  - **Photo reveal markup:** `<Reveal variant="image"><div className="reveal-clip …"><div className="reveal-media absolute inset-0">…</div></div></Reveal>`.
  - Never put the clip on the observed element itself. Chrome treats a fully clipped element as off-screen, so it would never reveal.
- **Photo drift:** wrap a photo in `<div className="parallax absolute inset-x-0 -inset-y-[8%]">` inside an `overflow-hidden` frame. It runs on the browser's scroll timeline, with no JavaScript.
- **Hover polish:** photos zoom to about 1.07 over 1.4s; icon tabs lift and tilt; arrows slide; underlines draw; icon circles change colour.
- **Larger effects** use `motion` (`useScroll`/`useTransform`): the hero backdrop parallax, the intro collage drift and the CTA banner parallax.
- **Reduced motion:** everything must stay readable and still under `prefers-reduced-motion`, and visible without JavaScript. The reveal rules only hide content when the root layout's script has added `.js-reveal`.

## 7. Code conventions

- **Stack:** Next.js 16 (read the AGENTS.md note above and `node_modules/next/dist/docs/` before using an API you are unsure of), React 19, Tailwind v4 (CSS-first `@theme`), `motion`, `lenis`, `lucide-react` (no brand icons; use `SocialIcon`).
- **Routes:** new or redesigned pages go in `src/app/(site)/<route>/page.tsx`, so they get the new header, footer and smooth scroll. The routes and the full menu (with sub-page anchor ids) live in `src/data/site.ts`. Use those routes and anchors; don't hard-code paths. Until a page exists, its menu link lands on `src/app/not-found.tsx`.
- **Content:** each page's copy and images go in `src/data/<page>.ts`, as one exported object per section, with source comments. Use the `HomeImage` shape from `src/data/home.ts` (`src`, `alt`, `position`, `pending`). Never write copy directly in JSX.
- **Components:** sections go in `src/components/site/<page>/<Section>.tsx`; put shared pieces in `src/components/site/ui/`. Prefer server components, and add `"use client"` only for interaction or motion hooks.
- **Class names:** join them with `cx` from `src/lib/cx.ts`, never `cn`, which runs tailwind-merge and drops our custom text sizes as if they were colours. Never pass two classes for the same property.
- **Images:** use `next/image`. Pass `preload` (not the deprecated `priority`) for the first hero image, and give every image an accurate `sizes`. Only the qualities 75, 80 and 90 are allowed (`next.config.ts`).
- **Cache Components is on:** no `new Date()` or other per-request values in server components (the footer year comes from `copyrightYear` in `site.ts`).
- **Formatting:** `npx prettier --print-width 120 --write <files>`. Comments explain why, in plain sentences, matching the existing files.

## 8. Workflow

1. **One page at a time.** Build one page, show it to the user, apply their feedback, then move on. The home page went through several review rounds, so expect the same.
2. **Content first.** Read the page's part of the source document and write its data file before you design anything.
3. **Then design.** Choose a different pattern for each section, reusing section 3's patterns where the content fits. Use the brief's photos and the existing photos as stand-ins, and add any new image slots to a media brief.
4. **Verify before reporting:**
   - `npx tsc --noEmit`, `npx eslint src`, and `npx next build`.
   - Look at the page in a browser at 1440px, 1920px and 390px wide, scrolling all the way down so every reveal fires.
   - Check that no text is clipped, nothing overflows the screen, and no image is used anywhere else on the site.
5. **Ask first** for anything the client must supply (photos, contact details, social links), and for any design decision that contradicts this file. Don't commit or push unless asked.

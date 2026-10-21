import { CtaLink } from "@/components/shared/CtaLink";
import { OurWorkImageCarousel } from "@/components/work/OurWorkImageCarousel";
import { ourWorkHero } from "@/data/work";

/**
 * "Our Work" page hero (reference: split-screen editorial hero).
 *
 * Copy on warm ivory at roughly 45% of the viewport, aligned to the site
 * container so the headline sits directly under the header's logo, and a
 * photograph filling the remaining 55% and bleeding off the right edge. The
 * photograph is pinned with `position: absolute` only from `lg` up; below that
 * it falls into normal flow beneath the copy, so the headline is still the
 * first thing on a phone.
 *
 * MOTION: the entrance sequence is pure CSS (`animate-unveil`, `animate-settle`,
 * `animate-draw-x`, `animate-rise` in globals.css), staggered with inline
 * `animationDelay`. That is a deliberate choice over the animation library for
 * the one section that is always above the fold:
 *
 *   - It needs no JavaScript, so the hero is painted and legible on first
 *     frame and cannot be left stuck at `opacity: 0` if a bundle fails.
 *   - Every animation uses `animation-fill-mode: backwards` and resolves to
 *     the element's ordinary styles, so the resting state IS the static
 *     layout.
 *   - The global `prefers-reduced-motion` rule collapses all of it.
 *   - It keeps this page's hero off the client bundle entirely — this is a
 *     server component.
 *
 * Sequence: the image panel uncovers right-to-left (0s), eyebrow (0.3s),
 * headline (0.4s), then the supporting line, description and link at
 * 0.55 / 0.65 / 0.75s.
 *
 * The panel holds `OurWorkImageCarousel` — the only client component on this
 * page's hero. Everything on the left stays server-rendered and static while
 * the photographs change.
 */
export function OurWorkHero() {
  return (
    <section
      aria-labelledby="our-work-heading"
      className="relative overflow-hidden bg-brand-ivory"
    >
      {/* Copy */}
      <div className="container-page relative z-10">
        <div className="flex flex-col justify-center py-14 sm:py-16 lg:min-h-[660px] lg:w-[45%] lg:py-24 lg:pr-14">
          <p
            className="gold-lettering animate-rise text-base font-bold uppercase tracking-[0.18em]"
            style={{ animationDelay: "0.3s" }}
          >
            {ourWorkHero.eyebrow}
          </p>

          <h1
            id="our-work-heading"
            className="animate-rise mt-5 font-heading text-4xl font-extrabold leading-[1] tracking-tight text-brand-navy sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
            style={{ animationDelay: "0.4s" }}
          >
            {ourWorkHero.heading}
          </h1>

          <p
            className="animate-rise mt-4 font-heading text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl lg:text-[2.125rem]"
            style={{ animationDelay: "0.55s" }}
          >
            {ourWorkHero.subheading}
          </p>

          <p
            className="animate-rise mt-6 max-w-md text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "0.65s" }}
          >
            {ourWorkHero.body}
          </p>

          <div
            className="animate-rise mt-9"
            style={{ animationDelay: "0.75s" }}
          >
            <CtaLink
              href={ourWorkHero.cta.href}
              variant="text"
              className="border-b-2 border-brand-blue/25 pb-2 text-base transition-colors hover:border-brand-blue"
            >
              {ourWorkHero.cta.label}
            </CtaLink>
          </div>
        </div>
      </div>

      {/* Photography. The CSS unveil still uncovers the panel on load; the
          carousel inside owns everything after that. Nothing here changes the
          panel's size, so the left column never moves. */}
      <div className="relative h-80 w-full sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[55%]">
        <div className="animate-unveil absolute inset-0 overflow-hidden">
          <OurWorkImageCarousel />
        </div>
      </div>
    </section>
  );
}

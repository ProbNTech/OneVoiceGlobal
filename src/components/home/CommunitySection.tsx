import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaLink } from "@/components/shared/CtaLink";
import { Reveal } from "@/components/shared/Reveal";
import { resolveIcon } from "@/components/shared/icons";
import { communityActivities, communityIntro } from "@/data/home";

/**
 * Community Events & Activities (brief section 11 / spec H-09).
 *
 * Activity TYPES only — no dates, venues or schedules are invented. A real
 * events calendar replaces this general activities section once confirmed dates
 * exist.
 */
export function CommunitySection() {
  return (
    <Section id="community" className="bg-brand-ivory">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Community life"
            title="Connect. Participate. Grow Together."
            description={communityIntro}
            className="max-w-2xl"
          />
          <div className="shrink-0">
            <CtaLink href="#get-involved" variant="secondary">
              Explore Community Activities
            </CtaLink>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {communityActivities.map((activity, i) => {
            const Icon = resolveIcon(activity.icon);
            return (
              <Reveal
                as="li"
                key={activity.title}
                delay={i * 0.06}
                className="group flex gap-4 rounded-2xl border border-brand-line bg-white p-6 shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-brand-navy">
                    {activity.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-10 text-sm text-muted-foreground">
          A full events calendar with dates and locations will appear here once
          activities are scheduled.
        </p>
      </div>
    </Section>
  );
}

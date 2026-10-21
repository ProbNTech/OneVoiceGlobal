import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { CtaLink } from "@/components/shared/CtaLink";
import { resolveIcon } from "@/components/shared/icons";
import { storiesIntro, storyThemes } from "@/data/home";

/**
 * Real Stories, Real Progress (brief section 10).
 *
 * THEMES ONLY. No participants, quotations, names or photographs are invented.
 * The section shows the kinds of journeys OneVoice helps people make, and is
 * built so genuine, consent-approved stories can replace the themes later. The
 * future Success Stories page is referenced as clearly "coming soon" rather
 * than as a working link.
 */
export function StoriesSection() {
  return (
    <Section id="stories">
      <div className="container-page">
        <SectionHeading
          eyebrow="Real stories, real progress"
          title="Every Journey Has a Story"
          description={storiesIntro}
          align="center"
          className="mx-auto max-w-3xl"
        />

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {storyThemes.map((theme, i) => {
            const Icon = resolveIcon(theme.icon);
            return (
              <Reveal
                as="li"
                key={`${theme.from}-${theme.to}`}
                delay={i * 0.08}
                className="rounded-xl border border-border bg-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-card"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-ivory text-brand-blue">
                    <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span aria-hidden="true" className="font-heading text-2xl font-bold tabular-nums text-brand-navy/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-brand-navy">
                  From {theme.from.toLowerCase()} to {theme.to.toLowerCase()}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {theme.description}
                </p>
              </Reveal>
            );
          })}

          {/* Honest placeholder for the future stories collection. */}
          <Reveal
            as="li"
            delay={storyThemes.length * 0.08}
            className="flex flex-col rounded-xl border border-border bg-brand-ivory p-6"
          >
            <h3 className="font-heading text-lg font-bold text-brand-navy">
              Your story could be next
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              As participants choose to share their progress, their approved
              stories will appear here.
            </p>
            <p className="mt-3 text-xs font-medium text-muted-foreground">
              Success Stories — coming soon
            </p>
            <div className="mt-auto pt-6">
              <CtaLink href="/#contact" variant="text">
                Start Your Journey
              </CtaLink>
            </div>
          </Reveal>
        </ul>
      </div>
    </Section>
  );
}

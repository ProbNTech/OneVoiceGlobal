import { ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
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

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {storyThemes.map((theme, i) => (
            <Reveal
              as="li"
              key={`${theme.from}-${theme.to}`}
              delay={i * 0.08}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
            >
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                From
              </p>
              <p className="mt-1.5 font-heading text-lg font-semibold text-brand-slate">
                {theme.from}
              </p>
              <ArrowRight
                className="my-3.5 size-5 text-brand-gold"
                aria-hidden="true"
              />
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-brand-blue">
                To
              </p>
              <p className="mt-1.5 font-heading text-xl font-bold text-brand-navy">
                {theme.to}
              </p>
            </Reveal>
          ))}

          {/* Honest placeholder for the future stories collection. */}
          <Reveal
            as="li"
            delay={storyThemes.length * 0.08}
            className="flex flex-col justify-center rounded-2xl border border-dashed border-brand-line-strong bg-muted/50 p-6"
          >
            <p className="font-heading text-lg font-bold text-brand-navy">
              Your story could be next
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              As participants choose to share their progress, their approved
              stories will appear here.
            </p>
            <p className="mt-4 text-sm font-semibold text-brand-slate">
              Success Stories — coming soon
            </p>
          </Reveal>
        </ul>
      </div>
    </Section>
  );
}

import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { PlaceholderImage } from "@/components/shared/PlaceholderImage";
import { WorkFeatureRow } from "@/components/work/WorkFeatureRow";
import { WorkFeatureMedia } from "@/components/work/WorkFeatureMedia";
import { CommunityImageGallery } from "@/components/work/CommunityImageGallery";
import {
  communityGallery,
  communityGalleryLabel,
  ourWorkFeatures,
  ourWorkIntro,
} from "@/data/work";

/**
 * "Our work in practice" — the page's introduction and two editorial rows.
 *
 * This band replaces the separate introduction that used to sit here: the
 * same approach copy now heads the section, so a visitor reads one statement
 * of how OneVoice works and then sees two areas of work spelled out, rather
 * than two introductions in a row.
 *
 * The two rows preview Skills & Education and Community. They do not repeat
 * the five storytelling sections below — each row carries a short, compact
 * set of that area's activities and links straight to its full section.
 *
 * Composition alternates: photograph left for the first row, gallery right
 * for the second, which gives the band the same rhythm as the run of five.
 *
 * Server component. The photograph, the gallery and the entrance animations
 * each draw their own client boundary.
 */
export function OurWorkEditorial() {
  const [skills, community] = ourWorkFeatures;

  return (
    <Section
      id="work-in-practice"
      aria-labelledby="work-in-practice-heading"
      className="bg-background"
    >
      {/* Entrance animations set their opening frame in the server-rendered
          markup, so without JavaScript they would never resolve. This turns
          every one of them off for that visitor; nothing in the band moves,
          and all of it is simply there. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<style>#work-in-practice [data-reveal]{opacity:1!important;clip-path:none!important;transform:none!important}</style>`,
        }}
      />

      <div className="container-page">
        <div className="max-w-3xl">
          <Reveal>
            <p className="flex items-center gap-4 text-sm font-bold uppercase tracking-[0.18em] text-brand-navy">
              <span
                aria-hidden="true"
                className="h-px w-10 shrink-0 bg-brand-gold"
              />
              {ourWorkIntro.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="work-in-practice-heading"
              className="mt-6 text-balance font-heading text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              {ourWorkIntro.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 text-xl leading-relaxed text-brand-navy/90">
              {ourWorkIntro.lead}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {ourWorkIntro.body}
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-9 max-w-2xl border-l-2 border-brand-gold pl-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {ourWorkIntro.note}
            </p>
          </Reveal>
        </div>

        {/* A thin rule rather than a card edge: the rows belong to the
            introduction above them, they are not a separate module. */}
        <hr
          aria-hidden="true"
          className="mt-14 border-0 border-t border-brand-line lg:mt-20"
        />

        <div className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
          <WorkFeatureRow
            feature={skills}
            mediaSide="left"
            media={
              skills.image ? (
                <WorkFeatureMedia
                  src={skills.image.src}
                  alt={skills.image.alt}
                  position={skills.image.position}
                />
              ) : (
                <PlaceholderImage
                  alt={`Photography to follow: ${skills.shortName}.`}
                  caption={skills.shortName}
                  aspect="landscape"
                  rounded="rounded-xl"
                />
              )
            }
          />

          <WorkFeatureRow
            feature={community}
            mediaSide="right"
            // The second row's copy is offset slightly, so the two rows read
            // as a sequence when both are on screen on a tall display.
            baseDelay={0.06}
            media={
              <CommunityImageGallery
                items={communityGallery}
                label={communityGalleryLabel}
              />
            }
          />
        </div>
      </div>
    </Section>
  );
}

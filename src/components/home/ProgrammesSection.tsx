import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaLink } from "@/components/shared/CtaLink";
import { Reveal } from "@/components/shared/Reveal";
import { PlaceholderImage } from "@/components/shared/PlaceholderImage";
import { resolveIcon } from "@/components/shared/icons";
import { assets, programmeFeatures } from "@/data/home";

/** The approved photographs are spread across the three features; the third
 *  uses a clearly-marked placeholder until more photography is supplied. */
const featureImages = [assets.learningPhoto, assets.secondaryPhoto, undefined];
const featurePositions = ["center 35%", "center 30%", "center"];
const tones = ["blue", "navy", "ivory"] as const;

/**
 * Our Support Programmes (brief section 04 / spec H-06).
 *
 * Three image-led editorial category features — not an icon grid. This is only
 * the homepage presentation layer; the full directory with every topic from the
 * client's document lives in `src/data/programmes.ts`. Nothing is presented as
 * currently available.
 */
export function ProgrammesSection() {
  return (
    <Section id="programmes">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we do"
          title="Support That Opens Doors to Opportunity"
          description="From learning new skills to accessing employment and community support, OneVoice helps people find practical pathways forward."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {programmeFeatures.map((feature, i) => {
            const Icon = resolveIcon(feature.icon);
            return (
              <Reveal
                as="article"
                key={feature.id}
                delay={i * 0.1}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
              >
                <div className="relative">
                  <PlaceholderImage
                    src={featureImages[i]}
                    alt={feature.imageCaption}
                    caption={feature.imageCaption}
                    aspect="landscape"
                    position={featurePositions[i]}
                    tone={tones[i]}
                    rounded="rounded-none"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="ring-0"
                  />
                  <span className="absolute left-4 top-4 inline-flex size-11 items-center justify-center rounded-xl bg-white text-brand-blue shadow-[var(--shadow-soft)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl font-bold text-brand-navy">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {feature.topics.map((topic) => (
                      <li
                        key={topic}
                        className="rounded-md bg-secondary px-2.5 py-1 text-[0.8125rem] font-medium text-secondary-foreground"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <CtaLink href={feature.href} variant="text">
                      Explore Programmes
                    </CtaLink>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-muted-foreground">
          These three areas are how we group our work on the homepage. Every
          programme is currently{" "}
          <span className="font-semibold text-brand-navy">planned</span> — the
          full directory, with delivery details, will follow as programmes are
          confirmed.
        </p>
      </div>
    </Section>
  );
}

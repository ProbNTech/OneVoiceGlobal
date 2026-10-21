import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaLink } from "@/components/shared/CtaLink";
import { Reveal } from "@/components/shared/Reveal";
import Image from "next/image";
import { assets, programmeFeatures } from "@/data/home";

const featureImages = [
  {
    src: assets.learningPhoto,
    alt: "People learning together around a laptop in a community setting.",
    position: "center 35%",
  },
  {
    src: assets.secondaryPhoto,
    alt: "Learners developing their computer skills together at laptops.",
    position: "center 30%",
  },
  {
    src: assets.heroPhoto,
    alt: "Volunteers distributing groceries to people in the community.",
    position: "center",
  },
];

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
    <Section id="programmes" className="bg-brand-ivory">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we do"
          title="Support That Opens Doors to Opportunity"
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mt-10 grid gap-y-10 md:grid-cols-3 md:divide-x md:divide-white">
          {programmeFeatures.map((feature, i) => {
            const image = featureImages[i];
            return (
              <Reveal
                as="article"
                key={feature.id}
                delay={i * 0.1}
                className="group flex flex-col items-center px-4 text-center sm:px-6 lg:px-8"
              >
                <div
                  className="relative aspect-square w-full max-w-80 overflow-hidden bg-brand-navy/5"
                  style={{ borderRadius: "0 42% 0 42%" }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 30vw, 85vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                    style={{ objectPosition: image.position }}
                  />
                </div>

                <div className="mt-7 flex flex-1 flex-col items-center">
                  <h3 className="font-heading text-2xl font-extrabold text-brand-navy">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <CtaLink
                      href={feature.href}
                      variant="primary"
                      className="shadow-card"
                      aria-label={`Learn more about ${feature.title}`}
                    >
                      Learn More
                    </CtaLink>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </Section>
  );
}

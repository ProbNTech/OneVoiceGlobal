import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaLink } from "@/components/shared/CtaLink";
import { Reveal } from "@/components/shared/Reveal";
import { PlaceholderImage } from "@/components/shared/PlaceholderImage";
import { assets, audiences, audiencesCaveat } from "@/data/home";

/**
 * Who We Support (brief section 08 / spec H-08).
 *
 * An inclusive audience grid with the eligibility caveat the client's document
 * requires. The approved photograph is reused here under a soft brand tint; the
 * people shown are not presented as the audiences listed.
 */
export function WhoWeSupport() {
  return (
    <Section id="who-we-support" className="bg-brand-ivory">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="max-w-xl">
            <SectionHeading
              eyebrow="Who we support"
              title="Opportunities for Everyone"
              description="OneVoice welcomes people from different backgrounds and circumstances. We meet people where they are and help them take the next step."
            />

            <ul className="mt-8 flex flex-wrap gap-2">
              {audiences.map((audience) => (
                <li
                  key={audience}
                  className="rounded-full border border-brand-line bg-white px-3.5 py-1.5 text-sm font-medium text-brand-navy"
                >
                  {audience}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-muted-foreground">
              {audiencesCaveat}
            </p>

            <div className="mt-8">
              <CtaLink href="#programmes" variant="primary">
                Find Your Pathway
              </CtaLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <PlaceholderImage
              src={assets.learningPhoto}
              alt="People from a range of backgrounds taking part together in a community learning session."
              aspect="square"
              position="center 40%"
              tint="blue"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="shadow-[var(--shadow-card)]"
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

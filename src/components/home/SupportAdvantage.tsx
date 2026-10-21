import Image from "next/image";
import { Check, HeartHandshake } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { assets, supportAdvantage } from "@/data/home";

/** Document-based support principles, paired with the existing site photography. */
export function SupportAdvantage() {
  return (
    <Section
      id="our-difference"
      className="overflow-hidden bg-background"
      aria-labelledby="our-difference-heading"
    >
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <Reveal>
              <SectionHeading
                id="our-difference-heading"
                eyebrow={supportAdvantage.eyebrow}
                title={supportAdvantage.heading}
                description={supportAdvantage.description}
              />
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {supportAdvantage.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="relative isolate aspect-[4/3] overflow-hidden rounded-2xl bg-brand-ivory ring-1 ring-brand-navy/5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-1/4 -left-1/4 size-[85%] rounded-full opacity-60"
                style={{
                  background:
                    "repeating-radial-gradient(circle at center, transparent 0 14px, rgb(16 61 99 / 0.07) 15px 16px)",
                }}
              />
              <div aria-hidden="true" className="absolute -right-10 -top-10 size-64 rounded-full bg-brand-gold/10 blur-3xl" />

              <div className="absolute left-[8%] top-[20%] z-10 h-[48%] w-[48%] overflow-hidden rounded-xl border-4 border-white shadow-card">
                <Image
                  src={assets.learningPhoto}
                  alt="People learning together in a community setting."
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover object-[center_35%]"
                />
              </div>
              <div className="absolute right-[12%] top-[7%] h-[45%] w-[43%] overflow-hidden rounded-xl border-4 border-white shadow-card">
                <Image
                  src={assets.secondaryPhoto}
                  alt="Learners practising computer skills together at laptops."
                  fill
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-[7%] left-[28%] z-20 h-[40%] w-[43%] overflow-hidden rounded-xl border-4 border-white shadow-lift">
                <Image
                  src={assets.heroPhoto}
                  alt="Volunteers handing out groceries at a community food distribution."
                  fill
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute bottom-[19%] right-[4%] z-30 flex w-[32%] flex-col items-center rounded-xl bg-brand-navy px-3 py-5 text-center shadow-lift sm:py-6">
                <HeartHandshake className="size-6 text-brand-gold sm:size-8" aria-hidden="true" />
                <p className="mt-3 font-heading text-sm font-bold leading-snug text-white sm:text-lg">
                  {supportAdvantage.badge}
                </p>
                <p className="mt-2 text-[0.625rem] leading-relaxed text-white/75 sm:text-xs">
                  {supportAdvantage.badgeCaption}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

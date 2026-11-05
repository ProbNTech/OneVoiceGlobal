import { BadgeCheck, Eye, HandHeart, Scale, Sprout, Star, type LucideIcon } from "lucide-react";
import { cx } from "@/lib/cx";
import { scholarshipsVision, type ValueIcon } from "@/data/scholarships";
import { Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<ValueIcon, LucideIcon> = {
  equal: Scale,
  merit: Star,
  dignity: HandHeart,
  transparency: Eye,
  impact: Sprout,
};

/* The icon circles take the logo's colours in turn; the orange one is the
   gradient, with a white icon. */
const CIRCLES = ["bg-ocean-600 text-white", "bg-lagoon-600 text-white", "bg-orange text-white"];

/**
 * Our Vision, Our Mission and Our Values, on white. The Vision is the
 * section's heading, one statement in the display face; the Mission sits
 * beside it. The five values follow in one row on large screens, each a
 * plain item: an icon circle in one of the logo's colours, the value's name
 * in spaced capitals and the document's line, with nothing behind them.
 */
export function Vision() {
  const { vision, mission, values } = scholarshipsVision;

  return (
    <section
      id={scholarshipsVision.id}
      aria-labelledby="scholarships-vision-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{vision.label}</Kicker>
            </Reveal>
            <Reveal
              as="h2"
              id="scholarships-vision-title"
              delay={80}
              className="mt-5 font-display text-statement text-ink [font-variation-settings:'SOFT'_100]"
            >
              {vision.text}
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-5 lg:pb-1.5">
            <Kicker as="h3">{mission.label}</Kicker>
            <p className="mt-4 text-lead text-slate">{mission.text}</p>
          </Reveal>
        </div>

        <Reveal variant="fade" className="mt-10 lg:mt-12">
          <Kicker as="h3" id="scholarships-values">
            {scholarshipsVision.valuesLabel}
          </Kicker>
        </Reveal>
        <ul
          aria-labelledby="scholarships-values"
          className="mt-6 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-5"
        >
          {values.map((value, index) => {
            const Icon = icons[value.icon] ?? BadgeCheck;
            return (
              <Reveal as="li" key={value.name} delay={index * 80} className="group">
                <span
                  className={cx(
                    "grid h-12 w-12 place-items-center rounded-full transition-transform duration-700 ease-out-soft group-hover:-translate-y-1 group-hover:-rotate-6",
                    CIRCLES[index % CIRCLES.length],
                  )}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h4 className="mt-4 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-ink">{value.name}</h4>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{value.line}</p>
              </Reveal>
            );
          })}
        </ul>
      </Shell>
    </section>
  );
}

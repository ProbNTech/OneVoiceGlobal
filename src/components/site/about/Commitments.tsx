import { Accessibility, Lock, ShieldCheck, type LucideIcon } from "lucide-react";
import { cx } from "@/lib/cx";
import { aboutCommitments, aboutCommitmentsIntro, type CommitmentIcon } from "@/data/about";
import { Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<CommitmentIcon, LucideIcon> = {
  safeguarding: ShieldCheck,
  privacy: Lock,
  accessibility: Accessibility,
};

/* The fan. The offsets sit on the outer wrapper and the tilt on the card
   itself, because <Reveal> drives the element it is given with a transform of
   its own and the two would overwrite each other. */
const fan = [
  { wrap: "lg:z-10 lg:translate-y-4", card: "lg:-rotate-2" },
  { wrap: "lg:z-20 lg:-ml-6 lg:-translate-y-3", card: "lg:rotate-2" },
  { wrap: "lg:z-10 lg:-ml-6 lg:translate-y-3", card: "lg:-rotate-2" },
];

/**
 * Safeguarding, Policies and Accessibility, as three frosted cards fanned
 * across a dark band, each straightening under the pointer. Every card is a
 * section of its own, so the menu's three links each land on their own
 * heading, and the cards stand to the same height so the fan stays even.
 */
export function Commitments() {
  return (
    <section aria-labelledby="commitments-title" className="relative isolate overflow-clip bg-navy-950 py-band">
      {/* Light pooled behind the cards, which is what lets frosted glass read
          as glass rather than as a grey panel. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[38rem] w-[70rem] -translate-x-1/2 rounded-full bg-ocean-600/30 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 left-1/4 -z-10 h-[26rem] w-[34rem] rounded-full bg-lagoon-600/20 blur-[150px]"
      />

      <Shell>
        <Title
          id="commitments-title"
          lead={aboutCommitmentsIntro.titleLead}
          accent={aboutCommitmentsIntro.titleAccent}
          tone="dark"
          accentTone="saffron"
          className="mx-auto max-w-4xl text-center"
        />

        <div className="mt-10 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:items-stretch lg:gap-0 lg:py-6">
          {aboutCommitments.map((block, index) => {
            const Icon = icons[block.icon];
            const shape = fan[index % fan.length]!;
            return (
              <div key={block.id} className={cx("lg:basis-1/3", shape.wrap)}>
                <Reveal
                  as="section"
                  id={block.id}
                  aria-labelledby={`${block.id}-title`}
                  variant="up"
                  delay={index * 120}
                  className="h-full"
                >
                  <div
                    className={cx(
                      "group relative isolate h-full overflow-hidden rounded-[1.75rem] bg-white/[0.07] p-7 ring-1 ring-white/15 backdrop-blur-xl transition-transform duration-700 ease-out-soft sm:p-8 lg:px-10 lg:py-9 lg:hover:rotate-0",
                      "shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)]",
                      shape.card,
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={0.6}
                      className="pointer-events-none absolute -right-8 -top-8 -z-10 h-44 w-44 text-white/[0.07]"
                    />

                    <p className="text-[0.75rem] font-bold uppercase tracking-[0.22em] text-saffron-300">
                      {block.kicker}
                    </p>
                    <h3
                      id={`${block.id}-title`}
                      className="mt-2 font-display text-[1.625rem] leading-tight text-white [font-variation-settings:'SOFT'_100]"
                    >
                      {block.title}
                    </h3>
                    {block.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-[0.9375rem] leading-relaxed text-white/70">
                        {paragraph}
                      </p>
                    ))}
                    {block.items ? (
                      <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                        {block.items.map((item) => (
                          <li key={item} className="flex items-baseline gap-3 text-[0.9375rem] leading-snug text-white">
                            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {block.note ? <p className="mt-4 text-[0.9375rem] text-white/55">{block.note}</p> : null}
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}

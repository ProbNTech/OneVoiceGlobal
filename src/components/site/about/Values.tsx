import Image from "next/image";
import {
  BadgeCheck,
  Handshake,
  HeartHandshake,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { cx } from "@/lib/cx";
import { aboutValues, type ValueIcon, type ValueTone } from "@/data/about";
import type { HomeImage } from "@/data/home";
import { Cta, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<ValueIcon, LucideIcon> = {
  empowerment: Sparkles,
  inclusion: UsersRound,
  respect: HeartHandshake,
  equality: Scale,
  safety: ShieldCheck,
  collaboration: Handshake,
  integrity: BadgeCheck,
  progress: Target,
};

const cardTones: Record<ValueTone, string> = {
  navy: "bg-navy-900 text-white/80",
  deep: "bg-navy-950 text-white/80",
  saffron: "bg-saffron-500 text-ink",
  white: "bg-white text-slate ring-1 ring-ink/8",
};

const nameTones: Record<ValueTone, string> = {
  navy: "text-white",
  deep: "text-white",
  saffron: "text-ink",
  white: "text-ink",
};

/* The icon disc reverses the card: amber on the dark cards, navy on amber,
   the logo blue on paper. */
const discTones: Record<ValueTone, string> = {
  navy: "bg-saffron-500 text-navy-950",
  deep: "bg-saffron-500 text-navy-950",
  saffron: "bg-navy-950 text-saffron-300",
  white: "bg-ocean-600 text-white",
};

type Value = (typeof aboutValues.items)[number];
type Cell = { kind: "value"; value: Value } | { kind: "photo"; image: HomeImage };

/**
 * Our Values, as a mosaic: the brief's eight values as cards in alternating
 * tones, with two photographs standing two rows tall among them. The
 * photographs follow the first and fourth values, which is what lands them in
 * opposite corners of the three-column grid without any of the cells needing
 * to be placed by hand.
 */
export function Values() {
  const cells: Cell[] = [];
  aboutValues.items.forEach((value, index) => {
    cells.push({ kind: "value", value });
    if (index === 0) cells.push({ kind: "photo", image: aboutValues.images[0] });
    if (index === 3) cells.push({ kind: "photo", image: aboutValues.images[1] });
  });

  return (
    <section
      id={aboutValues.id}
      aria-labelledby="values-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <Title id="values-title" lead={aboutValues.titleLead} accent={aboutValues.titleAccent} inline />
          <Reveal delay={200} className="flex flex-wrap gap-3">
            <Cta href={aboutValues.primaryCta.href} variant="saffron">
              {aboutValues.primaryCta.label}
            </Cta>
            <Cta href={aboutValues.secondaryCta.href} variant="outline">
              {aboutValues.secondaryCta.label}
            </Cta>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:auto-rows-fr lg:grid-cols-3">
          {cells.map((cell, index) =>
            cell.kind === "photo" ? (
              <Reveal
                key={cell.image.src}
                variant="image"
                delay={(index % 3) * 90}
                className="group relative aspect-[4/3] sm:aspect-auto sm:min-h-[16rem] lg:row-span-2"
              >
                <div className="reveal-clip absolute inset-0 overflow-hidden rounded-card bg-cream">
                  <div className="reveal-media absolute inset-0">
                    <Image
                      src={cell.image.src}
                      alt={cell.image.alt}
                      fill
                      sizes="(min-width: 1760px) 580px, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.07]"
                      style={{ objectPosition: cell.image.position }}
                    />
                  </div>
                </div>
              </Reveal>
            ) : (
              <ValueCard key={cell.value.name} value={cell.value} delay={(index % 3) * 90} />
            ),
          )}
        </div>
      </Shell>
    </section>
  );
}

function ValueCard({ value, delay }: { value: Value; delay: number }) {
  const Icon = icons[value.icon];
  return (
    <Reveal
      as="article"
      variant="up"
      delay={delay}
      className={cx(
        "group flex flex-col rounded-card p-6 shadow-[0_18px_40px_-32px_rgb(10_37_64/0.55)] transition-transform duration-700 ease-out-soft hover:-translate-y-1 sm:p-7",
        cardTones[value.tone],
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cx(
            "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-700 ease-out-soft group-hover:scale-110",
            discTones[value.tone],
          )}
        >
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
        </span>
        <h3 className={cx("text-[1.0625rem] font-bold", nameTones[value.tone])}>{value.name}</h3>
        <span
          aria-hidden="true"
          className="ml-auto self-start font-display text-[2.5rem] leading-[0.62] opacity-20 [font-variation-settings:'SOFT'_100]"
        >
          {"“"}
        </span>
      </div>
      <p className="mt-auto pt-7 text-[0.9375rem] leading-relaxed">{value.line}</p>
    </Reveal>
  );
}

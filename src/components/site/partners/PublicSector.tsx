import Image from "next/image";
import type { CSSProperties } from "react";
import {
  BriefcaseBusiness,
  Building,
  Building2,
  HeartPulse,
  House,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { partnersPublic, type PublicIcon } from "@/data/partners";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<PublicIcon, LucideIcon> = {
  authorities: Landmark,
  government: Building2,
  public: Building,
  employment: BriefcaseBusiness,
  health: HeartPulse,
  housing: House,
  safety: ShieldCheck,
};

/* The icon tint on each item, cycling through the light tints of the
   logo's colours, as the navy panels elsewhere do. */
const ACCENTS = ["var(--color-ocean-300)", "var(--color-lagoon-300)", "var(--color-saffron-400)"];

/**
 * Public Sector Partnerships, in one rounded panel on the logo blue: a
 * photograph of a community consultation down the left, and on the right
 * the title, the seven kinds of public partner the brief names and its
 * closing line on why a community-based approach matters to them, set in
 * the display face at the panel's foot.
 */
export function PublicSector() {
  const { image } = partnersPublic;

  return (
    <section
      id={partnersPublic.id}
      aria-labelledby="public-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <Reveal variant="up">
          <div className="grid overflow-hidden rounded-panel bg-ocean-700 shadow-[0_50px_90px_-60px_rgb(10_37_64/0.8)] lg:grid-cols-12">
            <div className="relative min-h-[16rem] overflow-hidden bg-ocean-700 lg:col-span-5">
              <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1760px) 740px, (min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: image.position }}
                />
              </div>
            </div>

            <div className="relative isolate p-7 text-white sm:p-10 lg:col-span-7 lg:p-12">
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-lagoon-400/20 blur-[100px]"
              />
              <Kicker tone="dark">{partnersPublic.kicker}</Kicker>
              <Title
                id="public-title"
                lead={partnersPublic.titleLead}
                accent={partnersPublic.titleAccent}
                tone="dark"
                accentTone="saffron"
                inline
                className="mt-5"
              />
              <p className="mt-6 text-lead text-white/80">{partnersPublic.lead}</p>

              <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {partnersPublic.items.map((item, index) => {
                  const Icon = icons[item.icon];
                  return (
                    <li
                      key={item.label}
                      style={{ "--accent": ACCENTS[index % ACCENTS.length] } as CSSProperties}
                      className="group flex items-center gap-4"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-(--accent) ring-1 ring-white/15 transition-colors duration-500 ease-out-soft group-hover:bg-white/20">
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="text-[1rem] font-semibold leading-snug text-white">{item.label}</span>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-9 max-w-2xl font-display text-[clamp(1.25rem,1.6vw,1.5rem)] font-light italic leading-snug text-orange [font-variation-settings:'SOFT'_100]">
                {partnersPublic.closing}
              </p>
            </div>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}

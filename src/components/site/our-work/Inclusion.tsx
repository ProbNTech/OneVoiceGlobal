import Image from "next/image";
import { Compass, HandHeart, Landmark, Megaphone, MessagesSquare, Route, type LucideIcon } from "lucide-react";
import { ourWorkInclusion, type InclusionIcon } from "@/data/our-work";
import { Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { AreaKicker } from "./AreaKicker";
import { FlowTitle } from "./FlowTitle";

const icons: Record<InclusionIcon, LucideIcon> = {
  navigate: Compass,
  consult: MessagesSquare,
  dialogue: Landmark,
  participation: HandHeart,
  awareness: Megaphone,
  referrals: Route,
};

/**
 * 4. Community Inclusion and Advocacy, on the page's one navy band: the
 * area's opening sentence as a large statement, its six aims two to a row
 * (an icon circle and the brief's line), and its closing commitment in
 * saffron, beside the brief's own photograph for the area with a leaf
 * corner.
 */
export function Inclusion() {
  const { image } = ourWorkInclusion;

  return (
    <section
      id={ourWorkInclusion.id}
      aria-labelledby="inclusion-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-navy-950 py-band text-white"
    >
      {/* Light gathers in a corner, as it does on the other navy bands. */}
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-ocean-600/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 left-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-lagoon-600/15 blur-[130px]"
      />

      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <AreaKicker number={ourWorkInclusion.number} name={ourWorkInclusion.kicker} tone="dark" />
            </Reveal>
            <FlowTitle
              id="inclusion-title"
              lead={ourWorkInclusion.titleLead}
              accent={ourWorkInclusion.titleAccent}
              tone="dark"
              className="mt-5"
            />
            <Reveal delay={120}>
              <p
                id="inclusion-list"
                className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-saffron-300"
              >
                {ourWorkInclusion.listLabel}
              </p>
            </Reveal>
            <ul aria-labelledby="inclusion-list" className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {ourWorkInclusion.items.map((item, index) => {
                const Icon = icons[item.icon];
                return (
                  <Reveal as="li" key={item.text} delay={(index % 2) * 80} className="group flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/8 text-saffron-300 ring-1 ring-white/12 transition-colors duration-500 group-hover:bg-saffron-500 group-hover:text-navy-950">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="pt-1 text-[0.9375rem] leading-relaxed text-white/80">{item.text}</span>
                  </Reveal>
                );
              })}
            </ul>
            <Reveal delay={200}>
              <p className="mt-8 max-w-2xl font-display text-[1.1875rem] font-light italic leading-snug text-saffron-300 [font-variation-settings:'SOFT'_100] sm:text-[1.375rem]">
                {ourWorkInclusion.closing}
              </p>
            </Reveal>
          </div>

          <Reveal variant="image" className="lg:col-span-5">
            <div className="reveal-clip relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem_8rem_2rem_2rem] bg-navy-900 lg:max-w-none">
              <div className="reveal-media absolute inset-0">
                <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1920px) 700px, (min-width: 1024px) 38vw, 448px"
                    className="object-cover"
                    style={{ objectPosition: image.position }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

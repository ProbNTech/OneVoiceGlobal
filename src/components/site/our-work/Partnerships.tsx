import Image from "next/image";
import { Building2, Earth, GraduationCap, HandCoins, HandHeart, Landmark, type LucideIcon } from "lucide-react";
import { ourWorkPartnerships, type NetworkIcon } from "@/data/our-work";
import { logo } from "@/data/site";
import { Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { AreaKicker } from "./AreaKicker";
import { FlowTitle } from "./FlowTitle";

const icons: Record<NetworkIcon, LucideIcon> = {
  community: HandHeart,
  business: Building2,
  public: Landmark,
  education: GraduationCap,
  philanthropy: HandCoins,
  diaspora: Earth,
};

/* Where each of the six sits round the centre, clockwise from the top, as
   percentages of the square (a hexagon on a circle of 38%). */
const positions = [-90, -30, 30, 90, 150, 210].map((degrees) => {
  const radians = (degrees * Math.PI) / 180;
  return { left: `${50 + 38 * Math.cos(radians)}%`, top: `${50 + 38 * Math.sin(radians)}%` };
});

/**
 * 6. Community Partnerships and Diaspora Engagement: the area's heading and
 * closing hope beside the network it describes. On larger screens the six
 * kinds of organisation it links stand round the logo's figures on a soft
 * cream disc, each an icon circle with its name, and arrive one after
 * another; on phones they are a plain icon list. The brief's own photograph
 * for the area sits under the copy, rounded into a pill.
 */
export function Partnerships() {
  const { image } = ourWorkPartnerships;

  return (
    <section
      id={ourWorkPartnerships.id}
      aria-labelledby="partnerships-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <AreaKicker number={ourWorkPartnerships.number} name={ourWorkPartnerships.kicker} />
            </Reveal>
            <FlowTitle
              id="partnerships-title"
              lead={ourWorkPartnerships.titleLead}
              accent={ourWorkPartnerships.titleAccent}
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-slate">{ourWorkPartnerships.closing}</p>
            </Reveal>
            <Reveal variant="image" delay={160} className="mt-8">
              <div className="reveal-clip relative aspect-[2/1] overflow-hidden rounded-full bg-sand">
                <div className="reveal-media absolute inset-0">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1920px) 640px, (min-width: 1024px) 36vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: image.position }}
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <p
                id="partnerships-list"
                className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink sm:text-center"
              >
                {ourWorkPartnerships.listLabel}
              </p>
            </Reveal>
            <div className="relative mx-auto mt-5 w-full max-w-[36rem] sm:mt-2 sm:aspect-square">
              {/* The soft ground the network stands on, and the logo's
                  figures at its centre. */}
              <div aria-hidden="true" className="absolute inset-[14%] hidden rounded-full bg-cream sm:block" />
              <Reveal
                variant="scale"
                delay={120}
                className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
              >
                <span className="grid h-28 w-28 place-items-center rounded-full bg-white shadow-[0_24px_48px_-20px_rgb(10_37_64/0.45)] ring-[10px] ring-lagoon-50 lg:h-32 lg:w-32">
                  <Image
                    src={logo.mark.src}
                    alt=""
                    width={logo.mark.width}
                    height={logo.mark.height}
                    className="h-14 w-auto lg:h-16"
                  />
                </span>
              </Reveal>

              <ul aria-labelledby="partnerships-list" className="space-y-4 sm:space-y-0">
                {ourWorkPartnerships.items.map((item, index) => {
                  const Icon = icons[item.icon];
                  return (
                    <Reveal
                      as="li"
                      key={item.text}
                      variant="scale"
                      delay={260 + index * 110}
                      style={positions[index]}
                      className="group flex items-center gap-4 sm:absolute sm:w-44 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:flex-col sm:gap-3 sm:text-center"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lagoon-600 text-white shadow-[0_14px_30px_-14px_rgb(14_122_118/0.8)] transition-colors duration-500 group-hover:bg-ink sm:h-14 sm:w-14">
                        <Icon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} />
                      </span>
                      {/* A name in a diagram, so its closing full stop is dropped. */}
                      <span className="text-[0.9375rem] font-semibold leading-snug text-ink">
                        {item.text.replace(/\.$/, "")}
                      </span>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

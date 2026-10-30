import { BadgeCheck, Handshake, Lightbulb, Scale, Sprout, UsersRound, type LucideIcon } from "lucide-react";
import { aboutValues, type ValueIcon } from "@/data/about";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<ValueIcon, LucideIcon> = {
  integrity: Scale,
  inclusion: UsersRound,
  empowerment: Sprout,
  collaboration: Handshake,
  innovation: Lightbulb,
  accountability: BadgeCheck,
};

/**
 * Our Values: the Foundation's six values on the page's one navy band, the
 * heading on the left and the values three to a row on the right. Each is a
 * plain item: an icon circle that turns saffron on hover, the value's name
 * in the display face and the brief's line.
 */
export function Values() {
  return (
    <section
      id={aboutValues.id}
      aria-labelledby="values-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-navy-950 py-band text-white"
    >
      {/* Light gathers in a corner, as it does on the other navy bands. */}
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-ocean-600/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 right-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-lagoon-600/15 blur-[130px]"
      />

      <Shell>
        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-3">
            <Reveal variant="fade">
              <Kicker tone="dark">{aboutValues.kicker}</Kicker>
            </Reveal>
            <Title
              id="values-title"
              lead={aboutValues.titleLead}
              accent={aboutValues.titleAccent}
              tone="dark"
              accentTone="saffron"
              className="mt-5"
            />
          </div>

          <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
            {aboutValues.items.map((value, index) => {
              const Icon = icons[value.icon];
              return (
                <Reveal as="li" key={value.name} delay={(index % 3) * 90} className="group">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/8 text-saffron-300 ring-1 ring-white/12 transition-colors duration-500 group-hover:bg-saffron-500 group-hover:text-navy-950">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-display text-[1.625rem] leading-tight text-white [font-variation-settings:'SOFT'_100]">
                    {value.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">{value.line}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Shell>
    </section>
  );
}

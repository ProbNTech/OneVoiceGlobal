import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { ourWorkRefugee } from "@/data/our-work";
import { Photo } from "../ui/Photo";
import { Cta, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { AreaKicker } from "./AreaKicker";

/* A dot in one of the logo's colours before each priority. */
const DOTS = ["bg-lagoon-600", "bg-ocean-600", "bg-orange"];

/**
 * 8. Refugee & Asylum Seeker Support, the client's new service, on white:
 * a round photograph with the service's three priorities on a card across
 * its lower edge; beside it the service's name, its subtitle as the heading
 * and its second opening paragraph, then its three programmes side by side,
 * each its number, name and subtitle, leading to its part of the service's
 * own page (no card behind them), and two calls to act.
 */
export function Refugee() {
  const { programmes, priorities, image } = ourWorkRefugee;

  return (
    <section
      id={ourWorkRefugee.id}
      aria-labelledby="refugee-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-12 lg:grid-cols-12 xl:gap-x-20">
          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative order-2 mx-auto w-full max-w-md pb-10 lg:order-1 lg:col-span-5 lg:max-w-none">
            <Reveal variant="image">
              <div className="rounded-full bg-lagoon-50 p-3 drop-shadow-[0_30px_36px_rgb(10_37_64/0.18)] sm:p-4">
                <div className="reveal-clip relative aspect-square overflow-hidden rounded-full bg-sand">
                  <div className="reveal-media absolute inset-0">
                    <Photo image={image} sizes="(min-width: 1760px) 640px, (min-width: 1024px) 36vw, 448px" />
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal variant="up" delay={300} className="absolute bottom-0 right-0 z-10 sm:-right-4">
              <ul className="space-y-2 rounded-card bg-white px-5 py-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                {priorities.map((priority, index) => (
                  <li
                    key={priority}
                    className="flex items-center gap-3 font-display text-[1.0625rem] text-ink [font-variation-settings:'SOFT'_100]"
                  >
                    <span aria-hidden="true" className={cx("h-2 w-2 shrink-0 rounded-full", DOTS[index])} />
                    {priority}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal variant="fade">
              <AreaKicker number={ourWorkRefugee.number} name={ourWorkRefugee.kicker} />
            </Reveal>
            <Title
              id="refugee-title"
              lead={ourWorkRefugee.titleLead}
              accent={ourWorkRefugee.titleAccent}
              size="statement"
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-5 max-w-2xl text-lead text-slate">{ourWorkRefugee.lead}</p>
            </Reveal>

            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-3">
              {programmes.map((programme, index) => (
                <Reveal as="li" key={programme.name} delay={index * 90}>
                  <Link href={programme.href} className="group block">
                    <span className="flex items-center justify-between text-[0.75rem] font-bold tabular-nums tracking-[0.2em] text-orange-ink">
                      {programme.number}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-ink-muted transition-transform duration-500 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                      />
                    </span>
                    <span className="mt-3 block text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-ink">
                      {programme.name}
                    </span>
                    <span className="mt-2 block font-display text-[1.125rem] leading-snug text-slate transition-colors duration-500 [font-variation-settings:'SOFT'_100] group-hover:text-lagoon-600">
                      {programme.line}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200} className="mt-9 flex flex-wrap gap-3">
              <Cta href={ourWorkRefugee.primaryCta.href}>{ourWorkRefugee.primaryCta.label}</Cta>
              <Cta href={ourWorkRefugee.secondaryCta.href} variant="outline">
                {ourWorkRefugee.secondaryCta.label}
              </Cta>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

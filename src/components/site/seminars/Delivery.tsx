import type { CSSProperties } from "react";
import {
  Check,
  Info,
  Languages,
  MessagesSquare,
  Network,
  Phone,
  Presentation,
  Route,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { cx } from "@/lib/cx";
import { seminarsDelivery, type DeliveryIcon } from "@/data/seminars";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<DeliveryIcon, LucideIcon> = {
  seminars: Presentation,
  workshops: MessagesSquare,
  professionals: UserRoundCheck,
  languages: Languages,
  referral: Route,
  partnerships: Network,
};

/* The disc before each way, cycling through the logo's colours, each
   with a white icon. */
const DISCS = ["bg-ocean-600 text-white", "bg-lagoon-600 text-white", "bg-saffron-500 text-white"];

/* Every other way is set in the italic accent of the site's titles. */
const ACCENTS = ["text-lagoon-600", "text-ocean-600", "text-saffron-ink"];

/**
 * How We Plan to Deliver the Programme: the six ways the overview names, run
 * together as one statement in the display face (as the Partners page sets
 * its areas of collaboration). Each way opens on a disc with its icon, every
 * other one is set in the italic accent, and they light up one after another
 * as the statement arrives (`[data-reveal="phrases"]` in site.css); the
 * brief's condition sits beside the heading. Beneath, with nothing drawn
 * behind it, the
 * overview's safeguarding block: its promises as a checklist, two to a row,
 * beside the 999 advice set large and the important information.
 */
export function Delivery() {
  const { formats, safeguarding } = seminarsDelivery;

  return (
    <section
      id={seminarsDelivery.id}
      aria-labelledby="delivery-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{seminarsDelivery.kicker}</Kicker>
            </Reveal>
            <Title
              id="delivery-title"
              lead={seminarsDelivery.titleLead}
              accent={seminarsDelivery.titleAccent}
              className="mt-5"
            />
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:pb-2">
            <p className="text-[1.0625rem] leading-relaxed text-slate">{seminarsDelivery.closing}</p>
          </Reveal>
        </div>

        <div className="mt-10 lg:mt-12">
          <Reveal variant="fade">
            <p id="delivery-label" className="max-w-3xl text-lead text-slate">
              {seminarsDelivery.lead}
            </p>
          </Reveal>
          <Reveal variant="phrases" delay={120} className="mt-5">
            <ul
              aria-labelledby="delivery-label"
              className="max-w-[88rem] font-display text-statement text-ink [font-variation-settings:'SOFT'_100]"
            >
              {formats.map((format, index) => {
                const Icon = icons[format.icon];
                /* The disc keeps to the way's first word, so it is never
                   left alone at the end of a line. */
                const [first, ...rest] = format.name.split(" ");
                return (
                  <li key={format.name} className="phrase inline" style={{ "--i": index } as CSSProperties}>
                    <span
                      className={cx(
                        index % 2 === 1 && cx("italic font-light", ACCENTS[((index - 1) / 2) % ACCENTS.length]),
                      )}
                    >
                      <span className="whitespace-nowrap">
                        <span
                          aria-hidden="true"
                          className={cx(
                            "mr-[0.3em] inline-grid h-[1.05em] w-[1.05em] place-items-center rounded-full align-[-0.16em] not-italic",
                            DISCS[index % DISCS.length],
                          )}
                        >
                          <Icon className="h-[0.5em] w-[0.5em]" strokeWidth={1.8} />
                        </span>
                        {first}
                      </span>{" "}
                      {rest.join(" ")}
                    </span>{" "}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        {/* Safeguarding */}
        <div
          id={safeguarding.id}
          className="mt-12 grid scroll-mt-28 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14 xl:gap-x-20"
        >
          <div className="lg:col-span-7">
            <Reveal>
              <h3
                id="safeguarding-title"
                className="font-display text-[1.875rem] leading-[1.15] text-ink [font-variation-settings:'SOFT'_100] sm:text-[2.375rem]"
              >
                {safeguarding.title}
              </h3>
              <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-slate">{safeguarding.lead}</p>
            </Reveal>
            <ul aria-labelledby="safeguarding-title" className="mt-7 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {safeguarding.items.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={100 + index * 60}
                  className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-saffron-500 text-white">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </span>
                  {item}
                </Reveal>
              ))}
            </ul>
            <Reveal delay={150}>
              <p className="mt-7 max-w-2xl text-[0.9375rem] leading-relaxed text-slate">{safeguarding.facilitators}</p>
              <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-slate">{safeguarding.specialist}</p>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:col-span-5 lg:self-center">
            <div className="flex items-center gap-5">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-saffron-500 text-white">
                <Phone aria-hidden="true" className="h-7 w-7" strokeWidth={1.5} />
              </span>
              <p className="font-display text-[4.5rem] leading-none tabular-nums text-ink [font-variation-settings:'SOFT'_100]">
                {safeguarding.emergency.number}
              </p>
            </div>
            <p className="mt-6 max-w-md text-[1.1875rem] font-semibold leading-snug text-ink">
              {safeguarding.emergency.text}
            </p>
            <p className="mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-slate">
              {safeguarding.emergency.detail}
            </p>
            <p className="mt-7 flex max-w-md items-start gap-3.5 text-[0.875rem] leading-relaxed text-ink-muted">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-lagoon-600">
                <Info aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </span>
              {safeguarding.important}
            </p>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

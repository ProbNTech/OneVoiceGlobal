import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeFoundation } from "@/data/home";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * The Foundation: the lines the brief's V.2 closes its homepage block with.
 * On the left, the headline with its line and the two calls to act; on the
 * right, the two short statements, each set in two tones like the titles.
 * Beneath, the brief's outline of the main pages as four plain links, each a
 * round photograph beside the page's name in spaced capitals and its line,
 * with no card behind them. On sand, between the white Work With Us band
 * and the cream closing banner.
 */
export function Foundation() {
  return (
    <section aria-labelledby="foundation-title" className="relative isolate overflow-clip bg-sand py-band">
      <Shell>
        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12 lg:items-center xl:gap-x-20">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{homeFoundation.kicker}</Kicker>
            </Reveal>
            <Title
              id="foundation-title"
              lead={homeFoundation.titleLead}
              accent={homeFoundation.titleAccent}
              className="mt-5 max-w-4xl"
            />
            <Reveal delay={150}>
              <p className="mt-6 max-w-2xl text-lead text-slate">{homeFoundation.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Cta href={homeFoundation.primaryCta.href}>{homeFoundation.primaryCta.label}</Cta>
                <Cta href={homeFoundation.secondaryCta.href} variant="outline">
                  {homeFoundation.secondaryCta.label}
                </Cta>
              </div>
            </Reveal>
          </div>

          <div className="space-y-8 lg:col-span-5">
            {homeFoundation.statements.map((statement, index) => (
              <Reveal key={statement.lead} delay={120 + index * 120}>
                <p className="font-display text-[1.625rem] leading-snug text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.875rem]">
                  {statement.lead}
                  {/* The accent half takes its own line, so it never breaks mid-phrase. */}
                  <em className="block font-light text-lagoon-600">{statement.accent}</em>
                </p>
                <p className="mt-3 max-w-xl text-[1rem] leading-relaxed text-slate">{statement.line}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {homeFoundation.pages.map((page, index) => (
            <Reveal as="li" key={page.title} delay={index * 90}>
              <Link href={page.href} className="group flex items-start gap-4">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_14px_30px_-16px_rgb(10_37_64/0.55)] ring-4 ring-white">
                  <Image
                    src={page.image.src}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.12]"
                    style={{ objectPosition: page.image.position }}
                  />
                </span>
                <span>
                  {/* The arrow runs on after the last word, so it stays beside it when the name wraps. */}
                  <span className="block text-[0.875rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors duration-500 group-hover:text-lagoon-600">
                    {page.title}
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-2 inline-block h-4 w-4 align-[-0.2em] transition-transform duration-500 ease-out-soft group-hover:translate-x-1"
                    />
                  </span>
                  <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-slate">{page.line}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

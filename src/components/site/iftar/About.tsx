import Link from "next/link";
import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { iftarAbout } from "@/data/iftar";
import { ArrowLink, Kicker, Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* The three lines of the statement, each in one of the logo's colours. */
const LINES = ["text-ink", "text-lagoon-600 italic font-light", "text-ocean-600 italic font-light"];

/* The dot after each area, cycling through the logo's colours. */
const DOTS = ["bg-ocean-600", "bg-lagoon-500", "bg-orange"];

/**
 * About the Event, on white. On the left the document's three-part line,
 * "An evening of community. A shared spirit of giving. A vision for lasting
 * impact.", set large in the display face, its lines lighting up one after
 * another (`[data-reveal="phrases"]`), and the proposed attendance as a
 * figure in the orange gradient. On the right the About the Event block,
 * the rest of the introduction and the vision, then the short introduction
 * to OneVoice the document's layout asks for: the Foundation's headline and
 * its areas of work as a run of links, each closed by a dot.
 */
export function About() {
  const { statement, paragraphs, figure, onevoice } = iftarAbout;

  return (
    <section
      id={iftarAbout.id}
      aria-labelledby="iftar-about-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Kicker as="h2" id="iftar-about-title">
                {iftarAbout.kicker}
              </Kicker>
            </Reveal>
            <Reveal variant="phrases" delay={120} className="mt-6">
              <p className="font-display text-statement [font-variation-settings:'SOFT'_100]">
                {statement.map((line, index) => (
                  <span
                    key={line}
                    className={cx("phrase block", LINES[index])}
                    style={{ "--i": index } as CSSProperties}
                  >
                    {line}
                  </span>
                ))}
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-8 lg:mt-10">
              <p className="font-display text-[clamp(3.5rem,7vw,6rem)] leading-none tabular-nums text-orange [font-variation-settings:'SOFT'_100]">
                {figure.value}
              </p>
              <p className="mt-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-ink-muted">{figure.label}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pt-2">
            <Reveal delay={100}>
              <p className="text-lead text-ink">{iftarAbout.lead}</p>
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[1rem] leading-relaxed text-slate">
                  {paragraph}
                </p>
              ))}
              <p className="mt-6 font-display text-[1.375rem] italic font-light leading-snug text-lagoon-600 [font-variation-settings:'SOFT'_100] sm:text-[1.5rem]">
                {iftarAbout.vision}
              </p>
            </Reveal>

            {/* A short introduction to OneVoice. */}
            <Reveal delay={180} className="mt-9">
              <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">{onevoice.label}</h3>
              <p className="mt-3 font-display text-[1.25rem] leading-snug text-ink [font-variation-settings:'SOFT'_100]">
                {onevoice.line}
              </p>
              <ul className="mt-3 text-[0.9375rem] leading-[1.9] text-slate">
                {onevoice.areas.map((area, index) => (
                  <li key={area.href} className="inline">
                    <Link
                      href={area.href}
                      className="whitespace-nowrap underline decoration-ink/15 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                    >
                      {area.label}
                    </Link>
                    {index < onevoice.areas.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className={cx(
                          "ml-[0.7em] mr-[0.4em] inline-block h-[0.32em] w-[0.32em] rounded-full align-middle",
                          DOTS[index % DOTS.length],
                        )}
                      />
                    ) : null}{" "}
                  </li>
                ))}
              </ul>
              <ArrowLink href={onevoice.more.href} className="mt-4">
                {onevoice.more.label}
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

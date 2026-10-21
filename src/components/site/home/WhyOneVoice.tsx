import Image from "next/image";
import { homeWhy } from "@/data/home";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

type Line = (typeof homeWhy.lines)[number];

/**
 * Why OneVoice? The brief's sequence (looking for a job, but perhaps needing
 * digital skills, English, confidence...) as a row of photo panels. The first
 * stands open; pointing at, tapping or tabbing to another opens it, and the
 * rest fold down to their key phrase (the `.panels` rules in
 * styles/site.css). Phones swipe through the same panels as cards.
 */
export function WhyOneVoice() {
  const lines = homeWhy.lines;

  return (
    <section aria-labelledby="why-title" className="relative isolate overflow-clip bg-white py-band">
      <Shell>
        <Reveal variant="fade">
          <Kicker>{homeWhy.kicker}</Kicker>
        </Reveal>
        <Title id="why-title" lead={homeWhy.titleLead} accent={homeWhy.titleAccent} className="mt-5" />

        <Reveal variant="fade" delay={100}>
          <ol className="panels scrollbar-none -mx-(--gutter) mt-8 flex snap-x snap-mandatory scroll-px-(--gutter) gap-4 overflow-x-auto px-(--gutter) lg:mx-0 lg:mt-10 lg:h-[min(34rem,72svh)] lg:gap-3 lg:overflow-visible lg:px-0">
            {lines.map((line, index) => (
              <Panel key={line.text} line={line} index={index} total={lines.length} />
            ))}
          </ol>
        </Reveal>

        <Conclusion />
      </Shell>
    </section>
  );
}

function Panel({ line, index, total }: { line: Line; index: number; total: number }) {
  const count = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  return (
    <li
      // Focusable, so keyboard and touch users can open a panel too.
      tabIndex={0}
      className="panel relative isolate aspect-square w-[80vw] max-w-[26rem] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-navy-900 outline-offset-[-3px] sm:w-[22rem] lg:aspect-auto lg:w-auto lg:max-w-none"
    >
      <Image
        src={line.image.src}
        alt={line.image.alt}
        fill
        sizes="(min-width: 1024px) 34vw, 80vw"
        className="panel-media object-cover"
        style={{ objectPosition: line.image.position }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-navy-950/85 via-navy-950/25 to-navy-950/5" />

      {/* Folded: the key phrase runs up the panel. */}
      <div
        aria-hidden="true"
        className="panel-tab absolute inset-0 hidden flex-col items-center justify-between py-7 lg:flex"
      >
        <span className="font-display text-[1rem] tabular-nums text-white/70 [font-variation-settings:'SOFT'_100]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rotate-180 whitespace-nowrap font-display text-[1.375rem] italic text-white [font-variation-settings:'SOFT'_100] [writing-mode:vertical-rl]">
          {line.key}
        </span>
      </div>

      {/* Open: the whole line. */}
      <div className="panel-body absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-9">
        <span className="font-display text-[1rem] tabular-nums text-saffron-300 [font-variation-settings:'SOFT'_100]">
          {count}
        </span>
        <p className="mt-3 max-w-md font-display text-[1.625rem] leading-[1.2] text-white [font-variation-settings:'SOFT'_100] lg:text-[2rem]">
          <Highlight text={line.text} phrase={line.key} />
        </p>
      </div>
    </li>
  );
}

/* The line's key phrase, picked out in italic amber. */
function Highlight({ text, phrase }: { text: string; phrase: string }) {
  const at = text.indexOf(phrase);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <em className="font-light text-saffron-300">{phrase}</em>
      {text.slice(at + phrase.length)}
    </>
  );
}

/* "That's why our approach is holistic." and the sum it adds up to. */
function Conclusion() {
  const formula = homeWhy.formula;
  return (
    <div className="mt-8 rounded-panel bg-cream px-6 py-10 sm:px-10 lg:mt-10 lg:px-14 lg:py-12">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <Title lead={homeWhy.conclusion} as="h3" size="statement" className="lg:col-span-5" />
        <ul aria-label="Our holistic approach" className="flex flex-wrap items-center gap-2.5 lg:col-span-7">
          {formula.map((part, index) => (
            <Reveal
              as="li"
              key={part}
              variant="scale"
              delay={index * 70}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[0.9375rem] font-semibold text-ink shadow-[0_1px_2px_rgb(10_37_64/0.05)] ring-1 ring-ink/8"
            >
              {/* The sum's plus signs travel with the part they join, so a
                  wrapped line never ends on a dangling "+". */}
              {index > 0 ? (
                <span aria-hidden="true" className="font-display text-[1.25rem] leading-none text-saffron-500">
                  +
                </span>
              ) : null}
              {part}
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}

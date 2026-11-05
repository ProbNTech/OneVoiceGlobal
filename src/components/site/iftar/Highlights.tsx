import { cx } from "@/lib/cx";
import { iftarHighlights } from "@/data/iftar";
import { Photo } from "../ui/Photo";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* Each photograph's frame: a leaf on alternating corners, so the six read as
   one set without repeating one shape. */
const FRAMES = [
  "rounded-[1.25rem_4rem_1.25rem_1.25rem]",
  "rounded-[4rem_1.25rem_1.25rem_1.25rem]",
  "rounded-[1.25rem_4rem_1.25rem_1.25rem]",
  "rounded-[1.25rem_1.25rem_1.25rem_4rem]",
  "rounded-[1.25rem_1.25rem_4rem_1.25rem]",
  "rounded-[1.25rem_1.25rem_1.25rem_4rem]",
];

/**
 * Event Highlights, on sand: the document's six highlights, three to a row,
 * as the "visual cards" its layout asks for, kept card-free as the site's
 * inner pages are: each a photograph of its own cut with a leaf corner,
 * its number on a white disc, the highlight's name in the display face and
 * the document's line beneath, with nothing behind them. Photographs zoom a
 * little on hover.
 */
export function Highlights() {
  return (
    <section
      id={iftarHighlights.id}
      aria-labelledby="iftar-highlights-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <Reveal variant="fade">
          <Kicker>{iftarHighlights.kicker}</Kicker>
        </Reveal>
        <Title
          id="iftar-highlights-title"
          lead={iftarHighlights.titleLead}
          accent={iftarHighlights.titleAccent}
          className="mt-5 max-w-5xl"
        />

        <ol className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 xl:gap-x-10">
          {iftarHighlights.highlights.map((highlight, index) => (
            <Reveal as="li" key={highlight.title} variant="rise" delay={(index % 3) * 100} className="group">
              <div
                className={cx(
                  "relative aspect-[4/3] overflow-hidden bg-cream shadow-[0_30px_60px_-40px_rgb(10_37_64/0.55)]",
                  FRAMES[index],
                )}
              >
                <Photo
                  image={highlight.image}
                  sizes="(min-width: 1920px) 580px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                  className="transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.07]"
                />
                <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white font-display text-[1rem] tabular-nums text-ink shadow-[0_8px_20px_-10px_rgb(10_37_64/0.6)] transition-colors duration-500 [font-variation-settings:'SOFT'_100] group-hover:bg-orange group-hover:text-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[1.375rem] leading-snug text-ink transition-colors duration-500 [font-variation-settings:'SOFT'_100] group-hover:text-lagoon-600 sm:text-[1.5rem]">
                {highlight.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{highlight.line}</p>
            </Reveal>
          ))}
        </ol>
      </Shell>
    </section>
  );
}

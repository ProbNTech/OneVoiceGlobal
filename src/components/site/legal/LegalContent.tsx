import type { LegalSection } from "@/data/legal";
import { cx } from "@/lib/cx";
import { ArrowLink, Band, Shell } from "../ui/primitives";

/** Splits on email addresses, keeping them (the capture group), so each can be a mailto link. */
const EMAIL = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/;

/** A run of document text with any email address in it made clickable. */
function Prose({ text }: { text: string }) {
  return text.split(EMAIL).map((part, index) =>
    index % 2 === 1 ? (
      <a
        key={index}
        href={`mailto:${part}`}
        className="font-medium text-ink underline-orange transition-colors hover:text-ocean-600"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

const bodyText = "text-[0.9375rem] leading-[1.75] text-slate";

/**
 * Reader for the legal documents, after the Commonwealth Entrepreneurs
 * Forum's and the Asia Swiss Business Summit's: one 720px column on white,
 * read top to bottom. Sections are numbered 01, 02… and each id is an
 * anchor, so a link elsewhere can jump straight to one. No on-page nav and
 * no closing banner.
 *
 * Unlike the earlier sites, sections are parted by space alone: this site
 * draws no hairlines between blocks.
 */
export function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <Band tone="white" padded={false} className="pb-14 pt-10 lg:pb-20 lg:pt-14">
      <Shell>
        <div className="mx-auto max-w-180">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="mt-11 scroll-mt-28 first:mt-0">
              <h2 className="flex items-baseline gap-3 font-display text-[1.375rem] font-normal leading-tight text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.5rem]">
                <span className="font-body text-[0.875rem] font-bold tabular-nums tracking-wide text-orange-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{section.title}</span>
              </h2>

              <div className="mt-4 space-y-4">
                {section.blocks.map((block, blockIndex) => {
                  if (block.type === "p") {
                    return (
                      <p key={blockIndex} className={bodyText}>
                        <Prose text={block.text} />
                      </p>
                    );
                  }

                  if (block.type === "sub") {
                    return (
                      <h3
                        key={blockIndex}
                        className="pt-2 text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-ink"
                      >
                        {block.text}
                      </h3>
                    );
                  }

                  if (block.type === "link") {
                    return (
                      <p key={blockIndex}>
                        <ArrowLink href={block.link.href}>{block.link.label}</ArrowLink>
                      </p>
                    );
                  }

                  return (
                    <ul key={blockIndex} className="space-y-2">
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex} className={cx("flex items-start gap-3", bodyText)}>
                          <span
                            aria-hidden="true"
                            className="mt-2.75 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-600"
                          />
                          <span>
                            <Prose text={item} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </Shell>
    </Band>
  );
}

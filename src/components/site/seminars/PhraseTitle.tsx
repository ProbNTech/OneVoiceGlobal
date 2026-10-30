import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { Reveal } from "../ui/Reveal";

const accentTones = {
  lagoon: "text-lagoon-600",
  ocean: "text-ocean-600",
  saffron: "text-orange",
} as const;

/**
 * A heading made of short phrases ("Know Your Rights. Build Your
 * Independence. Shape Your Future."), each set on a line of its own and
 * rising out of its own mask one after another. The last phrase is the
 * accent, in italic in the section's colour, as `Title` sets its second half.
 * (`Title` splits a heading into two halves only, which would break these
 * phrases mid-way.)
 */
export function PhraseTitle({
  phrases,
  id,
  tone = "light",
  accentTone = "lagoon",
  className,
}: {
  phrases: readonly string[];
  id?: string;
  tone?: "light" | "dark";
  accentTone?: keyof typeof accentTones;
  className?: string;
}) {
  return (
    <Reveal
      as="h2"
      id={id}
      variant="lines"
      className={cx(
        "font-display text-title font-normal [font-variation-settings:'SOFT'_100]",
        tone === "light" ? "text-ink" : "text-white",
        className,
      )}
    >
      {phrases.map((phrase, index) => (
        <span key={phrase} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <span
            className={cx(
              "line-inner block",
              index === phrases.length - 1 && cx("italic font-light", accentTones[accentTone]),
            )}
            style={{ "--line": index } as CSSProperties}
          >
            {phrase}
          </span>
        </span>
      ))}
    </Reveal>
  );
}

import { cx } from "@/lib/cx";
import { Reveal } from "../ui/Reveal";

/**
 * A heading that is a whole sentence: its accent half runs on in the same
 * line rather than starting a block of its own, so a long sentence wraps as
 * one paragraph instead of as two stacked ones. (`Title` sets each half as a
 * block that rises from its own mask, which suits short titles.)
 */
export function FlowTitle({
  id,
  lead,
  accent,
  tone = "light",
  className,
}: {
  id: string;
  lead: string;
  accent: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Reveal
      as="h2"
      id={id}
      delay={80}
      className={cx(
        "font-display text-statement font-normal [font-variation-settings:'SOFT'_100]",
        tone === "light" ? "text-ink" : "text-white",
        className,
      )}
    >
      {lead} <em className={cx("font-light", tone === "light" ? "text-lagoon-600" : "text-saffron-400")}>{accent}</em>
    </Reveal>
  );
}

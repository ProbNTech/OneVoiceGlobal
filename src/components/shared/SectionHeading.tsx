import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** Heading level — `h1` only for the hero; sections use the default `h2`. */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  /** Constrain the description measure. */
  descriptionClassName?: string;
}

/**
 * The shared section header.
 *
 * A gold, uppercase, letter-spaced eyebrow, then a bold Manrope heading and an
 * optional supporting line. Used by every band so headings share one rhythm.
 * `tone="dark"` recolours it for navy and photographic backgrounds.
 *
 * The eyebrow carries no decorative rules — the colour and letter-spacing do
 * the work on their own. Keep this the single source for eyebrow styling so
 * the sections that hand-roll their own (WhyOneVoice) stay in step.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  id,
  className,
  descriptionClassName,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <p className={cn(
          "section-eyebrow mb-4 font-bold uppercase tracking-[0.18em]",
          dark ? "text-brand-gold" : "gold-lettering"
        )}>
          {eyebrow}
        </p>
      )}

      <Heading
        id={id}
        className={cn(
          "text-balance font-extrabold tracking-tight",
          Heading === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-brand-navy"
        )}
      >
        {title}
      </Heading>

      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            centered && "mx-auto",
            dark ? "text-white/75" : "text-muted-foreground",
            descriptionClassName ?? "max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

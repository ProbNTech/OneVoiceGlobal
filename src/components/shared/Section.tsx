import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Vertical rhythm. `none` lets the section manage its own padding. */
  spacing?: "default" | "tight" | "none";
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

/**
 * Semantic section wrapper.
 *
 * Owns the two things every homepage band shares: the section's anchor `id`
 * (navigation and in-page CTAs scroll to these) and a `scroll-margin-top` so
 * the sticky header never covers the heading a visitor just jumped to.
 * Backgrounds and inner containers are left to each section, because the design
 * deliberately alternates full-bleed colour bands with contained layouts.
 */
export function Section({
  id,
  children,
  className,
  spacing = "default",
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24",
        spacing === "default" && "section-y",
        spacing === "tight" && "section-y-tight",
        className
      )}
      {...aria}
    >
      {children}
    </section>
  );
}

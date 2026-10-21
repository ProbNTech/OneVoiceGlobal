import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CtaVariant =
  | "primary" // warm gold — the main action (gold always carries ink text: 6.44:1)
  | "secondary" // bordered — the subordinate action on a light background
  | "onDark" // solid white — main action on navy backgrounds
  | "onDarkOutline" // bordered white — subordinate action on navy / photo
  | "text"; // inline arrow link, no button chrome

interface CtaLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  children: ReactNode;
  variant?: CtaVariant;
  className?: string;
  /** Hide the trailing arrow (default: shown). */
  showArrow?: boolean;
}

const base =
  "group/cta inline-flex items-center justify-center gap-2 font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const buttonBase = "h-12 rounded-lg px-6 text-[0.9375rem]";

const variants: Record<CtaVariant, string> = {
  // Warm Gold is a surface colour only — it never carries white text (2.26:1).
  // Paired with ink it measures 6.44:1 and passes WCAG AA.
  primary: cn(
    buttonBase,
    "bg-brand-gold text-brand-ink hover:bg-brand-gold-hover"
  ),
  secondary: cn(
    buttonBase,
    "border border-border bg-background text-brand-navy hover:bg-muted"
  ),
  onDark: cn(
    buttonBase,
    "bg-white text-brand-navy hover:bg-white/90 focus-visible:ring-white focus-visible:ring-offset-transparent"
  ),
  onDarkOutline: cn(
    buttonBase,
    "border border-white/40 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-transparent"
  ),
  text: "gap-1.5 rounded-sm text-[0.9375rem] font-semibold text-brand-blue hover:text-brand-blue-hover",
};

/**
 * The one call-to-action link used across the homepage, so every button and
 * inline "explore" link shares the same shape, focus ring and arrow motion.
 * Internal anchors (`#section`) and real routes both go through `next/link`.
 */
export function CtaLink({
  children,
  variant = "primary",
  className,
  showArrow = true,
  ...props
}: CtaLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
      {showArrow && (
        <ArrowUpRight
          className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

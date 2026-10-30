import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";

/* =========================================================================
   Shell: the page measure, the `shell` utility in styles/site.css.
   ========================================================================= */

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("shell", className)}>{children}</div>;
}

/* =========================================================================
   Band: one full-width section of the page. Bands clip with `overflow:
   clip`, not hidden, so sticky children and scroll-linked effects inside
   them keep following the page.
   ========================================================================= */

const bandTones = {
  cream: "bg-cream text-slate",
  white: "bg-white text-slate",
  sand: "bg-sand text-slate",
  mist: "bg-mist text-slate",
  navy: "bg-navy-950 text-white/75",
} as const;

export type BandTone = keyof typeof bandTones;

export function Band({
  children,
  tone = "cream",
  className,
  id,
  labelledBy,
  padded = true,
}: {
  children: ReactNode;
  tone?: BandTone;
  className?: string;
  id?: string;
  labelledBy?: string;
  padded?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx("relative isolate overflow-clip", bandTones[tone], padded && "py-band", className)}
    >
      {children}
    </section>
  );
}

/* =========================================================================
   Kicker: the small label above a title, led by three dots in the colours
   of the logo's figures.
   ========================================================================= */

export function Kicker({
  children,
  tone = "light",
  className,
  /** A section with no heading of its own can name itself by its kicker. */
  as: Tag = "p",
  id,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  as?: "p" | "h2" | "h3";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cx(
        "inline-flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.22em]",
        tone === "light" ? "text-orange-ink" : "text-orange",
        className,
      )}
    >
      <span aria-hidden="true" className="flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-ocean-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-lagoon-500" />
        <span className="h-1.5 w-1.5 rounded-full bg-orange" />
      </span>
      {children}
    </Tag>
  );
}

/* =========================================================================
   Title: a two-tone heading. The lead is set upright, the accent in italic
   in the section's accent colour, and each half rises out of its own mask
   as the heading scrolls into view.
   ========================================================================= */

const accentTones = {
  lagoon: "text-lagoon-600",
  ocean: "text-ocean-600",
  saffron: "text-orange",
  /* A paler orange for mid-tone grounds such as the closing banner's blue,
     where the logo orange itself would sit too close in brightness. */
  "saffron-light": "text-orange-light",
  white: "text-white/60",
} as const;

const orangeTones = new Set<keyof typeof accentTones>(["saffron", "saffron-light"]);

export function Title({
  lead,
  accent,
  as: Tag = "h2",
  id,
  tone = "light",
  accentTone = "lagoon",
  size = "title",
  className,
  delay = 0,
  inline = false,
}: {
  lead: string;
  accent?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  tone?: "light" | "dark";
  accentTone?: keyof typeof accentTones;
  size?: "display" | "title" | "statement";
  className?: string;
  delay?: number;
  /** Lead and accent share a line where there is room, instead of stacking. */
  inline?: boolean;
}) {
  const lines = accent ? [lead, accent] : [lead];
  return (
    <Reveal
      as={Tag}
      id={id}
      variant="lines"
      delay={delay}
      className={cx(
        "font-display font-normal [font-variation-settings:'SOFT'_100]",
        { display: "text-display", title: "text-title", statement: "text-statement" }[size],
        tone === "light" ? "text-ink" : "text-white",
        className,
      )}
    >
      {lines.map((line, index) => (
        <Fragment key={line}>
          {/* A real space between the halves rather than a margin on the
              accent: a space vanishes where the line wraps, a margin would
              indent the second line. */}
          {inline && index === 1 ? " " : null}
          <span
            className={cx("overflow-hidden pb-[0.08em] -mb-[0.08em]", inline ? "inline-block align-bottom" : "block")}
          >
            <span
              className={cx(
                "line-inner",
                index === 1 && cx("italic font-light", accentTones[accentTone]),
                /* An orange accent is a gradient painted through the letters, so
                   its line hugs the words (or the gradient would stretch across
                   the whole column) and gets a little room for the italic's
                   overhang and descenders, which the paint would otherwise miss. */
                index === 1 && orangeTones.has(accentTone)
                  ? "inline-block pb-[0.08em] pe-[0.1em] align-top -mb-[0.08em]"
                  : "block",
              )}
              style={{ "--line": index } as CSSProperties}
            >
              {line}
            </span>
          </span>
        </Fragment>
      ))}
    </Reveal>
  );
}

/* =========================================================================
   Cta: the pill button. A fill sweeps in from the left on hover, the arrow
   slips forward inside its disc, and the whole pill leans a little towards
   the pointer (<Magnetic>, which also carries `className`).
   ========================================================================= */

const ctaVariants = {
  ink: "bg-ink text-white before:bg-ocean-600 [--disc:rgb(255_255_255/0.14)]",
  /* Orange carries white text; the hover fill is a deeper cut of the same
     orange, so the white stays as clear as it was. */
  saffron: "bg-orange text-white before:bg-orange-hover [--disc:rgb(255_255_255/0.22)]",
  white: "bg-white text-ink before:bg-orange-soft [--disc:rgb(10_37_64/0.07)]",
  outline:
    "bg-transparent text-ink ring-1 ring-inset ring-ink/20 before:bg-ink hover:text-white [--disc:rgb(10_37_64/0.07)]",
  "outline-light":
    "bg-transparent text-white ring-1 ring-inset ring-white/35 before:bg-white hover:text-ink [--disc:rgb(255_255_255/0.14)]",
} as const;

export type CtaVariant = keyof typeof ctaVariants;

const ctaClass = (variant: CtaVariant, size: "sm" | "md") =>
  cx(
    "group/cta relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-2 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors duration-500",
    "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:rounded-full before:transition-transform before:duration-500 before:ease-out-soft hover:before:scale-x-100",
    size === "md" ? "h-13" : "h-12",
    ctaVariants[variant],
  );

/** The arrow in its disc, which slips out as a second one slides in on hover. */
function CtaArrow() {
  return (
    <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-(--disc)">
      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-soft group-hover/cta:translate-x-[150%]" />
      <ArrowRight className="absolute h-4 w-4 -translate-x-[150%] transition-transform duration-500 ease-out-soft group-hover/cta:translate-x-0" />
    </span>
  );
}

export function Cta({
  href,
  children,
  variant = "ink",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: CtaVariant;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <Magnetic className={className}>
      <Link href={href} className={ctaClass(variant, size)}>
        <span>{children}</span>
        <CtaArrow />
      </Link>
    </Magnetic>
  );
}

/** The same pill as a form's submit button. */
export function CtaButton({
  children,
  variant = "ink",
  size = "md",
  className,
  disabled,
}: {
  children: ReactNode;
  variant?: CtaVariant;
  size?: "sm" | "md";
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Magnetic className={className}>
      <button
        type="submit"
        disabled={disabled}
        className={cx(ctaClass(variant, size), "cursor-pointer disabled:cursor-wait disabled:opacity-70")}
      >
        <span>{children}</span>
        <CtaArrow />
      </button>
    </Magnetic>
  );
}

/* =========================================================================
   ArrowLink: a quieter text link whose underline draws on hover.
   ========================================================================= */

export function ArrowLink({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "group/link inline-flex items-center gap-2 text-[0.9375rem] font-semibold",
        tone === "light" ? "text-ink" : "text-white",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className={cx(
            "absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 transition-transform duration-500 ease-out-soft group-hover/link:scale-x-100",
            tone === "light" ? "bg-ink" : "bg-white",
          )}
        />
      </span>
      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover/link:translate-x-1" />
    </Link>
  );
}

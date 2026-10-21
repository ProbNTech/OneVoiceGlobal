import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Aspect = "wide" | "landscape" | "portrait" | "square" | "tall";
type Tone = "navy" | "ivory" | "blue";

interface PlaceholderImageProps {
  /** When set, a real photograph is rendered. Otherwise a labelled slot shows. */
  src?: string;
  /** Always required — informative alt for a real image, or a description of
   *  the intended photograph for a placeholder slot. */
  alt: string;
  /** Short caption shown on the placeholder slot (the intended subject). */
  caption?: string;
  aspect?: Aspect;
  tone?: Tone;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Object-position for the real image crop, e.g. "center 30%". */
  position?: string;
  /** Duotone wash over a real image, for visual variety between sections. */
  tint?: "none" | "navy" | "blue";
  rounded?: string;
}

const aspectClass: Record<Aspect, string> = {
  wide: "aspect-[16/9]",
  landscape: "aspect-[3/2]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  tall: "aspect-[3/4]",
};

const toneClass: Record<Tone, string> = {
  navy: "bg-brand-navy text-white/80",
  ivory: "bg-brand-ivory text-brand-navy",
  blue: "bg-gradient-to-br from-brand-blue to-brand-navy text-white/90",
};

const badgeClass: Record<Tone, string> = {
  navy: "bg-white/10",
  ivory: "bg-brand-navy/[0.07]",
  blue: "bg-white/15",
};

const tintClass: Record<NonNullable<PlaceholderImageProps["tint"]>, string> = {
  none: "",
  navy: "bg-brand-navy/35 mix-blend-multiply",
  blue: "bg-brand-blue/25 mix-blend-multiply",
};

/** Faint "unity / many pathways" rosette, echoing the logomark, as texture. */
function RosetteMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 60} 24 24)`} fill="currentColor">
          <path d="M24 25.5 C 20.2 20.5, 20.8 13.5, 24 8.5 C 27.2 13.5, 27.8 20.5, 24 25.5 Z" />
          <circle cx="24" cy="7" r="3.4" />
        </g>
      ))}
      <circle cx="24" cy="24" r="3.2" fill="currentColor" />
    </svg>
  );
}

/**
 * Image slot.
 *
 * With a `src`, renders an optimised `next/image` (optionally under a duotone
 * tint, so the approved photographs can be reused across sections with visual
 * variety). Without a `src`, renders an honest, art-directed placeholder — a
 * branded panel marked "Photography to follow" with the intended subject as a
 * caption — rather than inventing or implying a photograph. No stock subject is
 * ever presented as a real OneVoice participant (spec §6.6).
 */
export function PlaceholderImage({
  src,
  alt,
  caption,
  aspect = "landscape",
  tone = "ivory",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
  position = "center",
  tint = "none",
  rounded = "rounded-2xl",
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden ring-1 ring-black/5",
        aspectClass[aspect],
        rounded,
        className
      )}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition: position }}
          />
          {tint !== "none" && (
            <span
              aria-hidden="true"
              className={cn("absolute inset-0", tintClass[tint])}
            />
          )}
        </>
      ) : (
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center",
            toneClass[tone]
          )}
        >
          <RosetteMotif className="pointer-events-none absolute -right-6 -top-6 size-40 opacity-[0.08]" />
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]",
              badgeClass[tone]
            )}
          >
            <ImageIcon className="size-3.5" aria-hidden="true" />
            Photography to follow
          </span>
          {caption && (
            <span className="max-w-[18rem] text-sm leading-snug opacity-80">
              {caption}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

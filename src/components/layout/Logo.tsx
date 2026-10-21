import Image from "next/image";
import Link from "next/link";
import { assets } from "@/data/legacy-home";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Renders the logo in solid white, for navy / photographic backgrounds. */
  variant?: "default" | "light";
  /** Rendered height in px; width scales with the lockup's aspect ratio. */
  height?: number;
}

/**
 * OneVoice Global Foundation logo.
 *
 * Uses the client-supplied official logo lockup (rosette logomark + "OneVoice"
 * wordmark + "GLOBAL FOUNDATION"). The `light` variant knocks the artwork back
 * to solid white with a CSS filter so the same single asset works on the navy
 * footer without needing a second file.
 */
export function Logo({
  className,
  variant = "default",
  height = 40,
}: LogoProps) {
  // Intrinsic lockup ratio from the supplied artwork (2172 × 724 ≈ 3:1).
  const width = Math.round(height * 3);

  return (
    <Link
      href="/"
      aria-label="OneVoice Global Foundation — home"
      className={cn(
        "inline-flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <Image
        src={assets.logo}
        alt="OneVoice Global Foundation"
        width={width}
        height={height}
        priority
        className={cn(
          "h-auto w-auto object-contain",
          variant === "light" && "brightness-0 invert"
        )}
        style={{ height, width: "auto" }}
      />
    </Link>
  );
}

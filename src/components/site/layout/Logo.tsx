import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/cx";
import { brand, logo } from "@/data/site";

/**
 * The OneVoice Community Foundation logo. `light` is the reversed version
 * for dark bands: the navy wordmark turns white, the figures and the teal
 * "Community Foundation" line keep their colour.
 */
export function Logo({
  tone = "colour",
  className,
  eager = false,
}: {
  tone?: "colour" | "light";
  className?: string;
  eager?: boolean;
}) {
  const file = tone === "colour" ? logo.colour : logo.light;
  return (
    <Link href="/" aria-label={`${brand.name}, home`} className={cx("inline-flex shrink-0", className)}>
      <Image
        src={file.src}
        alt=""
        width={file.width}
        height={file.height}
        sizes="260px"
        preload={eager}
        className="h-full w-auto"
      />
    </Link>
  );
}

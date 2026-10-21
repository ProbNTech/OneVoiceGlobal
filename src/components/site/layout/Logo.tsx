import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/cx";
import { brand } from "@/data/site";

/**
 * The OneVoice Global Foundation logo. `light` is the reversed version for
 * dark bands: the wordmark and the navy figure turn white, the blue, teal
 * and amber figures keep their colour.
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
  return (
    <Link href="/" aria-label={`${brand.name}, home`} className={cx("inline-flex shrink-0", className)}>
      <Image
        src={tone === "colour" ? "/images/brand/logo.png" : "/images/brand/logo-white.png"}
        alt=""
        width={2018}
        height={604}
        sizes="200px"
        preload={eager}
        className="h-full w-auto"
      />
    </Link>
  );
}

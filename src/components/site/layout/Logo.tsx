import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/cx";
import { brand, logo } from "@/data/site";

/**
 * The OneVoice Global Foundation logo, exactly as the client supplied it.
 * On dark bands (`light`) it sits on a white plate, since the logo is navy
 * on a transparent ground and is never recoloured. The file carries its own
 * transparent margin, which becomes the plate's padding.
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
  const file = logo.colour;
  return (
    <Link href="/" aria-label={`${brand.name}, home`} className={cx("inline-flex shrink-0", className)}>
      <Image
        src={file.src}
        alt=""
        width={file.width}
        height={file.height}
        sizes="240px"
        preload={eager}
        className={cx(
          "h-full w-auto",
          tone === "light" && "rounded-2xl bg-white shadow-[0_18px_40px_-20px_rgb(0_0_0/0.6)]",
        )}
      />
    </Link>
  );
}

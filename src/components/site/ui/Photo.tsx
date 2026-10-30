import Image from "next/image";
import type { HomeImage } from "@/data/home";
import { logo } from "@/data/site";
import { cx } from "@/lib/cx";

/*
 * Soft light in the logo's colours for a slot still waiting for its
 * photograph. Each placeholder takes one by its file name, so neighbouring
 * slots differ and a slot keeps the same one from page to page.
 */
const tints = [
  "radial-gradient(120% 90% at 18% 12%, var(--color-lagoon-100), transparent 62%), radial-gradient(90% 80% at 88% 92%, var(--color-saffron-100), transparent 66%), linear-gradient(160deg, var(--color-mist), var(--color-sand))",
  "radial-gradient(110% 90% at 85% 10%, var(--color-navy-100), transparent 60%), radial-gradient(90% 90% at 12% 95%, var(--color-lagoon-100), transparent 64%), linear-gradient(200deg, var(--color-cream), var(--color-mist))",
  "radial-gradient(110% 90% at 20% 88%, var(--color-saffron-100), transparent 62%), radial-gradient(100% 80% at 82% 14%, var(--color-lagoon-50), transparent 66%), linear-gradient(140deg, var(--color-sand), var(--color-cream))",
];

const tintFor = (file: string) => tints[[...file].reduce((sum, char) => sum + char.charCodeAt(0), 0) % tints.length];

/**
 * A photograph that fills its frame (the frame sets the shape and must be
 * positioned). A slot whose photograph has not arrived yet (`pending`, with
 * no `src`) shows a soft tinted panel with the logo's figures faint at its
 * centre instead: under the site's rule that every photograph is used once,
 * a waiting slot never borrows one from elsewhere. Swapping the photograph
 * in is a change to the page's data file only.
 */
export function Photo({
  image,
  sizes,
  preload = false,
  quality,
  decorative = false,
  className,
}: {
  image: HomeImage;
  sizes: string;
  preload?: boolean;
  quality?: 75 | 80 | 90;
  /** Set where the words over the photograph already say what it shows. */
  decorative?: boolean;
  /** Classes for the photograph, such as a hover zoom. */
  className?: string;
}) {
  if (!image.src) {
    return (
      <div
        aria-hidden="true"
        data-pending={image.pending}
        className={cx("absolute inset-0", className)}
        style={{ backgroundImage: tintFor(image.pending ?? image.alt) }}
      >
        <Image
          src={logo.mark.src}
          alt=""
          width={logo.mark.width}
          height={logo.mark.height}
          preload={preload}
          className="absolute left-1/2 top-1/2 h-auto w-[18%] max-w-24 min-w-10 -translate-x-1/2 -translate-y-1/2 opacity-[0.16] grayscale"
        />
      </div>
    );
  }

  return (
    <Image
      src={image.src}
      alt={decorative ? "" : image.alt}
      fill
      preload={preload}
      quality={quality}
      sizes={sizes}
      className={cx("object-cover", className)}
      style={{ objectPosition: image.position }}
    />
  );
}

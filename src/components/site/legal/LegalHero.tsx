import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { routes } from "@/data/site";
import { Shell } from "../ui/primitives";

/**
 * Masthead for the legal pages, after the Commonwealth Entrepreneurs
 * Forum's and the Asia Swiss Business Summit's: a plain navy band with a
 * soft glow in the logo's blue from the top edge, then breadcrumb, title
 * and standfirst. No photography and no motion beyond the page's own:
 * these pages are for reading.
 *
 * The header sits in white over this band (the legal routes are in
 * SiteHeader's DARK_HERO), and the top padding clears it as the other
 * inner heroes do.
 */
export function LegalHero({ title, description }: { title: string; description: string }) {
  return (
    <section
      aria-labelledby="legal-title"
      className="relative isolate overflow-clip bg-navy-950 pb-10 pt-28 text-white sm:pb-12 lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgb(11_83_148/0.5),transparent_70%)]"
      />

      <Shell>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em]">
            <li>
              <Link href={routes.home} className="text-white/75 transition-colors hover:text-saffron-300">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3 text-saffron-400" />
            </li>
            <li aria-current="page" className="text-saffron-300">
              {title}
            </li>
          </ol>
        </nav>

        <div className="mt-6 max-w-4xl">
          <h1
            id="legal-title"
            className="font-display text-[clamp(2.25rem,4.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] [font-variation-settings:'SOFT'_100]"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-[1rem] leading-[1.7] text-white/75 sm:text-[1.0625rem]">{description}</p>
        </div>
      </Shell>
    </section>
  );
}

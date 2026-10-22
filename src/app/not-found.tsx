import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/layout/SiteHeader";
import { SiteFooter } from "@/components/site/layout/SiteFooter";
import { SmoothScroll } from "@/components/site/layout/SmoothScroll";
import { Cta, Kicker, Shell } from "@/components/site/ui/primitives";
import { brand } from "@/data/site";

export const metadata: Metadata = { title: "Page not found" };

/**
 * Any address with no page behind it, including the menu's pages that are
 * still to be built. Rendered with the new design's chrome.
 */
export default function NotFound() {
  return (
    <div data-design="site" className="contents">
      <SmoothScroll />
      <SiteHeader />
      <main id="main" className="relative isolate flex flex-1 items-center overflow-clip bg-cream pb-24 pt-40">
        <div
          aria-hidden="true"
          className="absolute -right-40 top-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-lagoon-100/70 blur-[120px]"
        />
        <Shell>
          <div className="max-w-2xl">
            <Kicker>{brand.name}</Kicker>
            <h1 className="mt-6 font-display text-title text-ink [font-variation-settings:'SOFT'_100]">
              This page is <em className="font-light text-lagoon-600">on its way.</em>
            </h1>
            <p className="mt-6 text-lead text-slate">
              We are still building this part of the site. In the meantime, the home page has everything in one place.
            </p>
            <Cta href="/" className="mt-9">
              Back to the home page
            </Cta>
          </div>
        </Shell>
      </main>
      <SiteFooter />
    </div>
  );
}

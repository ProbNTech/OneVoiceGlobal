import { SiteHeader } from "@/components/site/layout/SiteHeader";
import { SiteFooter } from "@/components/site/layout/SiteFooter";
import { SmoothScroll } from "@/components/site/layout/SmoothScroll";
import { OrangeGradients } from "@/components/site/ui/OrangeGradients";
import { JsonLd } from "@/components/site/seo/JsonLd";
import { siteJsonLd } from "@/lib/seo";

/**
 * The new design's chrome. `data-design="site"` scopes the new base styles
 * (styles/site.css) so they never reach the legacy pages.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div data-design="site" className="contents">
      {/* Who runs the site, for search engines: the organisation and the website, on every page. */}
      <JsonLd data={siteJsonLd()} />
      <SmoothScroll />
      <OrangeGradients />
      <a
        href="#main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

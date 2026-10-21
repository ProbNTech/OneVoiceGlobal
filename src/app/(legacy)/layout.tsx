import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

/**
 * Pages still on the first design (only /our-work so far). They keep the old
 * header and footer until they are redesigned; migrating a page means moving
 * its folder into `(site)`.
 */
export default function LegacyLayout({ children }: LayoutProps<"/">) {
  return (
    <div data-design="legacy" className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      {children}
      <Footer />
    </div>
  );
}

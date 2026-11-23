import type { Metadata } from "next";
import { LegalContent } from "@/components/site/legal/LegalContent";
import { LegalHero } from "@/components/site/legal/LegalHero";
import { cookiePolicy } from "@/data/legal";
import { routes } from "@/data/site";
import { JsonLd } from "@/components/site/seo/JsonLd";
import { pageJsonLd, pageMetadata } from "@/lib/seo";

const { title, description, sections } = cookiePolicy;

export const metadata: Metadata = pageMetadata(routes.cookies);

/** Cookie Policy, describing the website as built: it sets no cookies of its own. Copy lives in src/data/legal.ts. */
export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd data={pageJsonLd(routes.cookies)} />
      <LegalHero title={title} description={description} />
      <LegalContent sections={sections} />
    </>
  );
}

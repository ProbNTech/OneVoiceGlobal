import type { Metadata } from "next";
import { LegalContent } from "@/components/site/legal/LegalContent";
import { LegalHero } from "@/components/site/legal/LegalHero";
import { termsConditions } from "@/data/legal";
import { routes } from "@/data/site";
import { JsonLd } from "@/components/site/seo/JsonLd";
import { pageJsonLd, pageMetadata } from "@/lib/seo";

const { title, description, sections } = termsConditions;

export const metadata: Metadata = pageMetadata(routes.terms);

/** Terms & Conditions for the website, with the brief's own notes on what its workshops do and do not offer. Copy lives in src/data/legal.ts. */
export default function TermsPage() {
  return (
    <>
      <JsonLd data={pageJsonLd(routes.terms)} />
      <LegalHero title={title} description={description} />
      <LegalContent sections={sections} />
    </>
  );
}

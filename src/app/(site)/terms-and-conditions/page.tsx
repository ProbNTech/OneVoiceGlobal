import type { Metadata } from "next";
import { LegalContent } from "@/components/site/legal/LegalContent";
import { LegalHero } from "@/components/site/legal/LegalHero";
import { termsConditions } from "@/data/legal";
import { routes } from "@/data/site";

const { title, description, sections } = termsConditions;

export const metadata: Metadata = { title, description, alternates: { canonical: routes.terms } };

/** Terms & Conditions for the website, with the brief's own notes on what its workshops do and do not offer. Copy lives in src/data/legal.ts. */
export default function TermsPage() {
  return (
    <>
      <LegalHero title={title} description={description} />
      <LegalContent sections={sections} />
    </>
  );
}

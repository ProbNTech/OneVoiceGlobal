import type { Metadata } from "next";
import { LegalContent } from "@/components/site/legal/LegalContent";
import { LegalHero } from "@/components/site/legal/LegalHero";
import { cookiePolicy } from "@/data/legal";
import { routes } from "@/data/site";

const { title, description, sections } = cookiePolicy;

export const metadata: Metadata = { title, description, alternates: { canonical: routes.cookies } };

/** Cookie Policy, describing the website as built: it sets no cookies of its own. Copy lives in src/data/legal.ts. */
export default function CookiePolicyPage() {
  return (
    <>
      <LegalHero title={title} description={description} />
      <LegalContent sections={sections} />
    </>
  );
}

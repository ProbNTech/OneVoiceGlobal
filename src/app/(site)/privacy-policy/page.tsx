import type { Metadata } from "next";
import { LegalContent } from "@/components/site/legal/LegalContent";
import { LegalHero } from "@/components/site/legal/LegalHero";
import { privacyPolicy } from "@/data/legal";
import { routes } from "@/data/site";

const { title, description, sections } = privacyPolicy;

export const metadata: Metadata = { title, description, alternates: { canonical: routes.privacy } };

/** Privacy Policy, built on the brief's Confidentiality & Privacy and safeguarding lines. Copy lives in src/data/legal.ts. */
export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalHero title={title} description={description} />
      <LegalContent sections={sections} />
    </>
  );
}

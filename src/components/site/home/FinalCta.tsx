import { homeFinalCta } from "@/data/home";
import { CtaBanner } from "../ui/CtaBanner";

/**
 * Final call to action: the shared photographic banner (`CtaBanner`), with
 * the brief's closing line as its kicker.
 */
export function FinalCta() {
  return (
    <CtaBanner
      id="cta-title"
      kicker={homeFinalCta.closing}
      titleLead={homeFinalCta.titleLead}
      titleAccent={homeFinalCta.titleAccent}
      description={homeFinalCta.description}
      primaryCta={homeFinalCta.primaryCta}
      secondaryCta={homeFinalCta.secondaryCta}
      image={homeFinalCta.image}
    />
  );
}

import type { Metadata } from "next";
import { Hero } from "@/components/site/join/Hero";
import { Support } from "@/components/site/join/Support";
import { Group } from "@/components/site/join/Group";
import { joinHero } from "@/data/join";

export const metadata: Metadata = {
  title: "Join OneVoice",
  description: joinHero.description,
  alternates: { canonical: "/join" },
};

/**
 * Join. The short landing page the client's WhatsApp link opens: the
 * brief's headline and motto beside the sign-up form (name, mobile and
 * WhatsApp number), then what OneVoice delivers and the community
 * WhatsApp group. The form sits in the hero because filling it in is the
 * page's one job, so it must not need a scroll to be found.
 * Once the details are in, the form's panel turns into the welcome and the
 * group link, and the person is sent the welcome email (lib/notify.ts).
 * Copy lives in src/data/join.ts; the server action is in ./actions.ts.
 *
 * The page is not in the menu: the link is shared on its own.
 */
export default function JoinPage() {
  return (
    <>
      <Hero />
      <Support />
      <Group />
    </>
  );
}

import type { TeamMember } from "@/data/about";
import { cx } from "@/lib/cx";
import { SocialIcon } from "./SocialIcon";

const link =
  "mt-2 text-[0.9375rem] text-slate underline-offset-4 transition-colors hover:text-ink hover:underline [overflow-wrap:anywhere]";

/**
 * The contact given for a team member, set under their role on the About
 * page's Our Team and the home page's: an email address, a profile link with
 * its platform's mark, or nothing where neither has been supplied. An email
 * may break after its "@", so a long one wraps cleanly in a narrow column.
 */
export function TeamContact({ member, className }: { member: TeamMember; className?: string }) {
  const [local, domain] = member.email?.split("@") ?? [];

  return (
    <>
      {member.email ? (
        <a href={`mailto:${member.email}`} className={cx(link, "inline-block", className)}>
          {local}@<wbr />
          {domain}
        </a>
      ) : null}
      {member.social ? (
        <a
          href={member.social.href}
          aria-label={`${member.name} on ${member.social.label}`}
          className={cx(link, "inline-flex items-center gap-2", className)}
        >
          <SocialIcon platform={member.social.platform} className="h-4 w-4 shrink-0" />
          {member.social.label}
        </a>
      ) : null}
    </>
  );
}

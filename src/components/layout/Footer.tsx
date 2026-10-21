import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { footerNav } from "@/data/navigation";
import { siteConfig } from "@/config/site";

/**
 * Site footer (brief section 14 / spec H-12).
 *
 * Carries the `#contact` anchor, since it is the page's contact destination.
 *
 * CONTENT INTEGRITY: the client's source document leaves the address, telephone
 * and email blank and confirms no social URLs, so none are invented here.
 * `siteConfig.contact.confirmed` is false, so the contact block renders an
 * explicit "to be confirmed" note, and the social icons render as disabled,
 * non-interactive marks rather than links to nowhere. Policy pages that do not
 * exist yet render as muted "coming soon" labels, never as broken links.
 */
export async function Footer() {
  // `cacheComponents` treats `new Date()` as an unstable prerender value, so the
  // copyright year is resolved inside a cached boundary: it is baked in at build
  // /revalidation time rather than forcing the page to render dynamically.
  "use cache";
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="scroll-mt-24 bg-brand-navy text-white/75">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + mission */}
          <div className="max-w-sm">
            <Logo variant="light" height={44} />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-sm font-semibold text-brand-gold">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-3">
            {footerNav.map((column) => (
              <div key={column.heading}>
                <h2 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-white">
                  {column.heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="rounded-sm text-[0.9375rem] text-white/70 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <span className="text-[0.9375rem] text-white/40">
                          {link.label}{" "}
                          <span className="text-xs">(coming soon)</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact — no details invented */}
        <div className="mt-14 grid gap-8 border-t border-white/15 pt-10 sm:grid-cols-2">
          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-white">
              Contact
            </h2>
            {siteConfig.contact.confirmed ? (
              <ul className="mt-4 space-y-1.5 text-[0.9375rem] text-white/70">
                <li>{siteConfig.contact.address}</li>
                <li>{siteConfig.contact.phone}</li>
                <li>{siteConfig.contact.email}</li>
              </ul>
            ) : (
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/60">
                Our address, telephone number and email address are still being
                confirmed and will be published here once approved.
              </p>
            )}
          </div>

          <div className="sm:justify-self-end">
            <h2 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-white">
              Follow
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {siteConfig.social.map((social) => (
                <li key={social.platform}>
                  {/* No verified account URLs yet — rendered as a disabled
                      label so nothing links to a page that does not exist. */}
                  <span
                    title={`${social.label} — account to be confirmed`}
                    className="inline-flex cursor-default items-center rounded-lg border border-white/15 px-3 py-1.5 text-[0.8125rem] font-medium text-white/40"
                  >
                    {social.label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-white/40">
              Social accounts to be confirmed.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Registered charity details to be confirmed. Brand identity and
            imagery are provisional pending client approval.
          </p>
        </div>
      </div>
    </footer>
  );
}

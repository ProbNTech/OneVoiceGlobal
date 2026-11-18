import { legalLinks } from "@/data/legal";
import { brand, company, contact, copyrightYear, footerColumns, footerDisclaimer, routes } from "@/data/site";
import { cx } from "@/lib/cx";
import { PageLink } from "../ui/PageLink";
import { Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { SocialIcon } from "../ui/SocialIcon";
import { Logo } from "./Logo";

/**
 * Site footer, after ELA Flooring's: one dark band with the logo and a short
 * line, the link columns, and a Get in Touch column. Its close follows the
 * Commonwealth Entrepreneurs Forum footer: the tagline as a large outlined
 * wordmark, a thin bar with the copyright, the registered company and its
 * number beside the legal pages, and last the disclaimer, centred. Its
 * links are PageLinks, so one that points at
 * the page already open (Contact Us, on the Contact page) scrolls back to
 * the top rather than doing nothing.
 */
export function SiteFooter() {
  const details = [
    { label: "Address", value: contact.address },
    { label: "Telephone", value: contact.telephone, href: `tel:${contact.telephone.replace(/\s+/g, "")}` },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Website", value: contact.website, href: contact.website },
  ].filter((item) => item.value);
  // Only platforms whose link has been supplied get an icon.
  const social = contact.social.filter((item) => item.href);

  return (
    <footer className="bg-navy-950 text-white/65">
      <Shell className="pb-8 pt-12 md:pt-14">
        {/* Five columns from 1280px. Between 1024 and 1279px five are too
            narrow, so the brand and the wide Explore column share the first
            row and the other three the second. */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:grid-cols-[1.3fr_2.1fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <Reveal>
            <Logo tone="light" className="h-[9.125rem]" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed">{brand.headline}</p>
            <p className="mt-3 max-w-sm text-[0.875rem] leading-relaxed text-white/45">{brand.initiative}</p>
          </Reveal>

          {/* Link columns. A long one (Explore's eleven pages) is split into
              two side by side, the first half on the left, so it stands no
              taller than its neighbours and leaves no empty space under them.
              Each half carries the heading (the user's request); the second
              copy is hidden from screen readers, which hear one Explore menu. */}
          {footerColumns.map((column, index) => {
            const split = column.links.length > 6 ? Math.ceil(column.links.length / 2) : column.links.length;
            const parts = [column.links.slice(0, split), column.links.slice(split)].filter((part) => part.length);
            const wide = parts.length > 1;
            return (
              <Reveal
                key={column.heading}
                delay={(index + 1) * 90}
                className={wide ? "lg:col-span-2 xl:col-span-1" : undefined}
              >
                <nav aria-label={column.heading} className={cx(wide && "grid grid-cols-2 gap-x-6")}>
                  {parts.map((links, part) => (
                    <div key={part}>
                      <h3
                        aria-hidden={part > 0 || undefined}
                        className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-orange"
                      >
                        {column.heading}
                      </h3>
                      <ul className="mt-5 space-y-3">
                        {links.map((link) => (
                          <li key={link.href}>
                            <PageLink href={link.href} className="text-[0.9375rem] transition-colors hover:text-white">
                              {link.label}
                            </PageLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </Reveal>
            );
          })}

          {/* Get in Touch */}
          <Reveal delay={(footerColumns.length + 1) * 90}>
            <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-orange">Get in Touch</h3>
            <p className="mt-5 text-[0.9375rem] text-white">{brand.centre}</p>
            {details.length ? (
              <ul className="mt-4 space-y-3 text-[0.9375rem]">
                {details.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} className="transition-colors hover:text-white">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
            <PageLink
              href={routes.contact}
              className="mt-4 inline-block text-[0.9375rem] underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              Contact Us
            </PageLink>
            {social.length ? (
              <ul className="mt-6 flex gap-2.5" aria-label="Social media">
                {social.map((item) => (
                  <li key={item.platform}>
                    <a
                      href={item.href}
                      aria-label={item.label}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white ring-1 ring-white/10 transition-colors hover:bg-orange hover:text-white"
                    >
                      <SocialIcon platform={item.platform} className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </div>

        {/* The tagline as an outlined wordmark across the measure, like the
            Commonwealth Entrepreneurs Forum footer's "Connect. Collaborate.
            Grow." It is sized to the footer's own width (cqw). Fraunces'
            optical size is held at its display cut (opsz 144): left to
            follow the font size, the letters widen as the line shrinks and
            it overflows. Held, the line runs 21.3 times its font size at any
            width, so 4.6cqw fills about 98% of the footer. Below 640px one
            line would be too small to read, so its three phrases stack,
            sized for the longest ("Stronger Communities,", 8.66 times). */}
        <div className="@container mt-10">
          <p className="select-none font-display text-[length:11.3cqw] leading-[1.05] tracking-[-0.02em] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.24)] [font-variation-settings:'SOFT'_100,'opsz'_144] sm:whitespace-nowrap sm:text-[length:4.6cqw] sm:leading-none">
            {brand.tagline.split(", ").map((phrase, index, phrases) => (
              <span key={phrase} className="block sm:inline">
                {phrase}
                {index < phrases.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>

        {/* As on that site: the copyright and the registered company, one
            line (the user's request), on the left and the legal pages on the
            right. The line is too long to share a row with the links below
            1280px, so there the links sit under it. */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.8125rem] text-white/50 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
          <p>
            © {copyrightYear} {brand.name}. All rights reserved. {company.name} · {company.numberLabel} {company.number}
          </p>
          <ul aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {Object.values(legalLinks).map((link) => (
              <li key={link.href}>
                <PageLink href={link.href} className="whitespace-nowrap transition-colors hover:text-white">
                  {link.label}
                </PageLink>
              </li>
            ))}
          </ul>
        </div>

        {/* The disclaimer closes the footer, small and centred, as on the
            Commonwealth Entrepreneurs Forum site; on phones it is set left,
            like the bar above, since a long centred paragraph reads poorly. */}
        <p className="mx-auto mt-6 max-w-5xl text-left text-[0.75rem] leading-relaxed text-white/40 sm:text-center">
          <span className="font-semibold text-white/60">{footerDisclaimer.label}:</span> {footerDisclaimer.text}
        </p>
      </Shell>
    </footer>
  );
}

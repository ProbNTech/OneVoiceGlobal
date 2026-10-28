import Link from "next/link";
import { brand, contact, copyrightYear, footerColumns, routes } from "@/data/site";
import { Shell } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { SocialIcon } from "../ui/SocialIcon";
import { Logo } from "./Logo";

/**
 * Site footer, after ELA Flooring's: one dark band with the logo and a short
 * line, the link columns, and a Get in Touch column, then a thin bar with
 * the copyright and the tagline.
 */
export function SiteFooter() {
  const details = [
    { label: "Address", value: contact.address },
    { label: "Telephone", value: contact.telephone, href: `tel:${contact.telephone.replace(/\s+/g, "")}` },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Website", value: contact.website, href: contact.website },
  ].filter((item) => item.value);

  return (
    <footer className="bg-navy-950 text-white/65">
      <Shell className="pb-8 pt-12 md:pt-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.3fr] lg:gap-10">
          {/* Brand */}
          <Reveal>
            <Logo tone="light" className="h-14" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed">{brand.headline}</p>
            <p className="mt-3 max-w-sm text-[0.875rem] leading-relaxed text-white/45">{brand.initiative}</p>
          </Reveal>

          {/* Link columns */}
          {footerColumns.map((column, index) => (
            <Reveal key={column.heading} delay={(index + 1) * 90}>
              <nav aria-label={column.heading}>
                <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-saffron-300">
                  {column.heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[0.9375rem] transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          ))}

          {/* Get in Touch */}
          <Reveal delay={(footerColumns.length + 1) * 90}>
            <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-saffron-300">Get in Touch</h3>
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
            <Link
              href={routes.contact}
              className="mt-4 inline-block text-[0.9375rem] underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              Contact Us
            </Link>
            <ul className="mt-6 flex gap-2.5" aria-label="Social media">
              {contact.social.map((item) => (
                <li key={item.platform}>
                  {item.href ? (
                    <a
                      href={item.href}
                      aria-label={item.label}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white ring-1 ring-white/10 transition-colors hover:bg-saffron-500 hover:text-ink"
                    >
                      <SocialIcon platform={item.platform} className="h-4 w-4" />
                    </a>
                  ) : (
                    // Platform named in the brief; its link has not been supplied yet.
                    <span
                      title={item.label}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white/80 ring-1 ring-white/10"
                    >
                      <SocialIcon platform={item.platform} className="h-4 w-4" />
                      <span className="sr-only">{item.label}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-[0.8125rem] text-white/50 sm:flex-row sm:items-center">
          <p>
            © {copyrightYear} {brand.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.14em]">{brand.tagline}</p>
        </div>
      </Shell>
    </footer>
  );
}

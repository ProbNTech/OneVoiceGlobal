"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { donateCta, primaryCta } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Site header (brief section 01 / spec H-01).
 *
 * A solid white bar that sits above the hero and sticks to the top of the
 * viewport, gaining a subtle shadow once the page scrolls so it stays readable
 * over the content beneath. Logo left, dropdown navigation centre, a
 * subordinate Donate link and the primary Get Support action right — matching
 * the approved design.
 *
 * Client component because it owns the scroll-elevation state and composes the
 * Radix-powered dropdowns and mobile drawer. Everything below it on the page
 * stays a server component.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background transition-shadow duration-300",
        scrolled
          ? "border-border shadow-soft"
          : "border-transparent"
      )}
    >
      {/* Skip link — first focusable element on the page. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <div className="container-page">
        <div className="flex items-center justify-between gap-4 py-2.5">
          <Logo height={44} />

          <DesktopNav className="mx-auto" />

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Divider before the secondary action, as in the design. */}
            <span
              aria-hidden="true"
              className="mr-1 hidden h-6 w-px bg-border lg:block"
            />

            <Link
              href={donateCta.href}
              className="hidden h-10 items-center rounded-lg px-3.5 text-[0.9375rem] font-medium text-brand-navy outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
            >
              {donateCta.label}
            </Link>

            <Link
              href={primaryCta.href}
              className="group hidden h-11 items-center gap-1.5 rounded-lg bg-brand-blue pl-5 pr-4 text-[0.9375rem] font-semibold text-white outline-none transition-colors hover:bg-brand-blue-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:inline-flex"
            >
              {primaryCta.label}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

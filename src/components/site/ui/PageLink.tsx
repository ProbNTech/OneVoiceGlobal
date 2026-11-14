"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/**
 * A link that does something even on the page it points to. A link to the
 * page already open (the footer's Contact Us, read on the Contact page) would
 * otherwise do nothing, so it eases back to the top instead. Links to a
 * section (`#…`) are left to the browser. Lenis keeps the page scrolling
 * natively, so a plain smooth scroll works with it; it jumps under reduced
 * motion.
 */
export function PageLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    // Leave modified clicks (a new tab, a download) to the browser.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    if (href.includes("#") || href.split("?")[0] !== pathname) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}

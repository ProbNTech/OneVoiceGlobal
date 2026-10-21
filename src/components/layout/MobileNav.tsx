"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/layout/Logo";
import { donateCta, primaryCta, primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Mobile / tablet navigation (below lg).
 *
 * A controlled Sheet (Radix Dialog underneath) providing focus trapping,
 * escape-to-close and scroll locking. Grouped items expand with a native
 * <details> disclosure — keyboard-operable with no extra JavaScript. The sheet
 * is controlled so it closes on selection; otherwise an in-page jump would
 * leave the drawer covering the section the visitor just chose.
 */
export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const pathname = usePathname();

  /** True when the item points at a real route and the browser is on it. */
  const isCurrent = (href: string) => {
    const [route] = href.split("#");
    if (!route || route === "/") return false;
    return pathname === route || pathname.startsWith(route + "/");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-lg text-brand-navy outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring lg:hidden",
          className
        )}
      >
        <Menu className="size-6" aria-hidden="true" />
      </SheetTrigger>

      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-sm">
        <SheetHeader className="flex-row items-center justify-between border-b border-border px-5 py-4">
          <SheetTitle asChild>
            <span>
              <Logo height={36} />
              <span className="sr-only">
                OneVoice Global Foundation — menu
              </span>
            </span>
          </SheetTitle>
        </SheetHeader>

        <nav
          aria-label="Primary"
          className="flex-1 overflow-y-auto overscroll-contain px-3 py-4"
        >
          <ul className="flex flex-col gap-0.5">
            {primaryNav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <details className="group" open={isCurrent(item.href)}>
                    <summary
                      className={cn(
                        "flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-semibold outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden",
                        isCurrent(item.href)
                          ? "text-brand-blue"
                          : "text-brand-navy"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className="size-5 text-brand-slate transition-transform duration-200 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <ul className="mb-1 ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            onClick={close}
                            className="block rounded-lg px-3 py-2.5 text-[0.9375rem] text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-brand-navy focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-3 text-base font-semibold outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
                      isCurrent(item.href)
                        ? "border-l-2 border-brand-gold text-brand-blue"
                        : "text-brand-navy"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="flex flex-col gap-2.5 border-t border-border px-5 py-5">
          <Link
            href={primaryCta.href}
            onClick={close}
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 text-base font-semibold text-white outline-none transition-colors hover:bg-brand-blue-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {primaryCta.label}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={donateCta.href}
            onClick={close}
            className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-border px-5 text-base font-semibold text-brand-navy outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          >
            {donateCta.label}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

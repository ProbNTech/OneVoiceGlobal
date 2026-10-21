"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

/** Gold rule beneath the nav item for the page currently being viewed. */
const activeUnderline =
  "relative text-brand-blue after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand-gold";

/**
 * Desktop primary navigation (lg and up).
 *
 * Built on the Radix-based shadcn NavigationMenu, which provides keyboard
 * operation, focus management and correct ARIA for the dropdowns at no extra
 * cost. Items with `children` render a trigger + panel; items without (Impact)
 * render a plain link. `viewport={false}` anchors each panel directly beneath
 * its own trigger, matching the approved design.
 *
 * The item matching the current route carries a gold underline and, for plain
 * links, `aria-current="page"`. Anchor-only items (`#about`) never match —
 * they are sections of the homepage, not routes of their own.
 */
export function DesktopNav({ className }: { className?: string }) {
  const pathname = usePathname();

  /** True when the item points at a real route and the browser is on it. */
  const isCurrent = (href: string) => {
    const [route] = href.split("#");
    if (!route || route === "/") return false;
    return pathname === route || pathname.startsWith(`${route}/`);
  };

  return (
    <NavigationMenu viewport={false} className={cn("hidden lg:flex", className)}>
      <NavigationMenuList className="gap-0.5">
        {primaryNav.map((item) => {
          const current = isCurrent(item.href);

          return item.children ? (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger
                className={cn(
                  "bg-transparent text-[0.9375rem] font-medium text-brand-navy hover:bg-muted data-open:bg-muted data-open:text-brand-blue",
                  current && activeUnderline
                )}
              >
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-80 p-2">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={child.href}
                          className="flex flex-col items-start gap-0.5 rounded-md p-3"
                        >
                          <span className="font-heading text-sm font-semibold text-brand-navy">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="text-[0.8125rem] leading-snug text-muted-foreground">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 w-max items-center rounded-lg px-3 py-1.5 text-[0.9375rem] font-medium text-brand-navy transition-colors hover:bg-muted",
                    current && activeUnderline
                  )}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

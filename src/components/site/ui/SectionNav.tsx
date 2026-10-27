import Link from "next/link";
import type { NavLink } from "@/data/site";
import { Shell } from "./primitives";

/**
 * The strip under an inner page's hero: the page's own sections, as the
 * brief's sub-menu for that page lists them. It scrolls sideways where the
 * row runs out of room rather than wrapping, and it is not sticky.
 */
export function SectionNav({ label, links }: { label: string; links: NavLink[] }) {
  return (
    <div className="border-b border-line bg-white">
      <Shell>
        <div className="scrollbar-none -mx-(--gutter) flex items-center gap-8 overflow-x-auto px-(--gutter) py-5">
          <p className="shrink-0 font-display text-[1.25rem] text-ink [font-variation-settings:'SOFT'_100]">{label}</p>
          <ul className="flex shrink-0 items-center gap-7 lg:ml-auto">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group/section relative inline-block whitespace-nowrap py-1 text-[0.9375rem] text-slate transition-colors duration-500 hover:text-ink"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out-soft group-hover/section:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Shell>
    </div>
  );
}

import Link from "next/link";
import { aboutSections } from "@/data/about";
import { Shell } from "../ui/primitives";

/**
 * The strip under the hero: the page's own sections, as the brief's About Us
 * sub-menu lists them. It scrolls sideways where the row runs out of room
 * rather than wrapping, and it is not sticky.
 */
export function SectionNav() {
  return (
    <div className="border-b border-line bg-white">
      <Shell>
        <div className="scrollbar-none -mx-(--gutter) flex items-center gap-8 overflow-x-auto px-(--gutter) py-5">
          <p className="shrink-0 font-display text-[1.25rem] text-ink [font-variation-settings:'SOFT'_100]">
            {aboutSections.label}
          </p>
          <ul className="flex shrink-0 items-center gap-7 lg:ml-auto">
            {aboutSections.links.map((link) => (
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

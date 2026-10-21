"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Plus, X } from "lucide-react";
import { cx } from "@/lib/cx";
import { brand, contact, ctas, navigation, type NavItem } from "@/data/site";
import { Cta } from "../ui/primitives";
import { SocialIcon } from "../ui/SocialIcon";
import { Logo } from "./Logo";

/**
 * Five or six of the brief's ten menu sections fit on one desktop row; all ten, with
 * every sub-page, live in the full menu behind "Menu", which is also the only
 * navigation below 1280px.
 */
const PRIMARY = ["About Us", "Services", "Programmes", "Community", "Partners", "Get Involved"];
/* Shown in the bar only where the row has room for it (it is always in the full menu). */
const ROOMY_ONLY = ["Get Involved"];
const primaryItems = navigation.filter((item) => PRIMARY.includes(item.label));

export function SiteHeader() {
  const pathname = usePathname();
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  // The menu remembers the path it was opened on, so navigating closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  // The home page opens on a full-screen photograph: until the page moves,
  // the bar sits on it in white.
  const onPhoto = atTop && pathname === "/";
  const lastY = useRef(0);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 24);
      // Tucks away while reading down the page; any scroll up brings it back.
      if (y > lastY.current + 4 && y > 520) {
        setHidden(true);
        document.documentElement.setAttribute("data-header-hidden", "");
      } else if (y < lastY.current - 4) {
        setHidden(false);
        document.documentElement.removeAttribute("data-header-hidden");
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeAttribute("data-header-hidden");
    };
  }, []);

  const closeMenu = useCallback(() => {
    setMenuPath(null);
    menuButton.current?.focus();
  }, []);

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-700 ease-out-soft",
          atTop ? "bg-transparent" : "bg-cream/85 shadow-[0_1px_0_rgb(10_37_64/0.08)] backdrop-blur-xl",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="shell flex h-20 items-center gap-6">
          <HeaderLogo light={onPhoto} compact={!atTop} />

          <nav aria-label="Main" className="ml-auto hidden xl:block">
            <ul className="flex items-center">
              {primaryItems.map((item) => (
                <DesktopItem key={item.label} item={item} pathname={pathname} light={onPhoto} />
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2.5 xl:ml-3">
            <span className="hidden sm:inline-flex">
              <Cta href={ctas.support.href} size="sm" variant={onPhoto ? "saffron" : "ink"}>
                {ctas.support.label}
              </Cta>
            </span>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setMenuPath(pathname)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label="Open the full menu"
              className="group/menu inline-flex h-12 cursor-pointer items-center gap-3 rounded-full bg-white pl-4 pr-3.5 text-[0.9375rem] font-semibold text-ink shadow-[0_1px_2px_rgb(10_37_64/0.06),0_8px_24px_-12px_rgb(10_37_64/0.25)] ring-1 ring-ink/8 transition-colors hover:bg-saffron-50"
            >
              <span>Menu</span>
              <span aria-hidden="true" className="flex w-5 flex-col items-end gap-1.25">
                <span className="h-0.5 w-5 rounded-full bg-ink transition-[width] duration-500 group-hover/menu:w-3" />
                <span className="h-0.5 w-3 rounded-full bg-ink transition-[width] duration-500 group-hover/menu:w-5" />
              </span>
            </button>
          </div>
        </div>

        {/* Reading progress along the bar's lower edge. */}
        <div
          aria-hidden="true"
          className={cx(
            "absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-lagoon-500 via-ocean-600 to-saffron-500 scroll-progress transition-opacity duration-500",
            atTop ? "opacity-0" : "opacity-100",
          )}
        />
      </header>

      <MenuOverlay open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}

/* Both versions of the logo are stacked and cross-faded, so the switch
   between the photograph and the cream bar never waits on a download. */
function HeaderLogo({ light, compact }: { light: boolean; compact: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${brand.name}, home`}
      className={cx("relative inline-flex shrink-0 transition-[height] duration-500", compact ? "h-10" : "h-12")}
    >
      <Image
        src="/images/brand/logo.png"
        alt=""
        width={2018}
        height={604}
        sizes="200px"
        preload
        className={cx("h-full w-auto transition-opacity duration-500", light ? "opacity-0" : "opacity-100")}
      />
      <Image
        src="/images/brand/logo-white.png"
        alt=""
        width={2018}
        height={604}
        sizes="200px"
        preload
        className={cx(
          "absolute inset-0 h-full w-auto transition-opacity duration-500",
          light ? "opacity-100" : "opacity-0",
        )}
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------
   Desktop item. The dropdown opens on hover and on :focus-within, so
   keyboard users tab straight into it. Programmes, with nineteen entries,
   gets a two-column panel.
   ------------------------------------------------------------------------- */

function DesktopItem({ item, pathname, light }: { item: NavItem; pathname: string; light: boolean }) {
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const children = item.children ?? [];
  const wide = children.length > 10;

  return (
    <li className={cx("group/item relative", ROOMY_ONLY.includes(item.label) && "hidden min-[1400px]:block")}>
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cx(
          "relative inline-flex h-12 items-center gap-1 whitespace-nowrap px-3.5 text-[0.9375rem] font-medium transition-colors duration-500",
          light ? "text-white/85 hover:text-white" : "text-ink/80 hover:text-ink",
        )}
      >
        {item.label}
        {children.length ? (
          <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover/item:rotate-180 group-focus-within/item:rotate-180" />
        ) : null}
        <span
          aria-hidden="true"
          className={cx(
            "absolute inset-x-3.5 bottom-2 h-px origin-center bg-saffron-500 transition-transform duration-500",
            active ? "scale-x-100" : "scale-x-0 group-hover/item:scale-x-100",
          )}
        />
      </Link>

      {children.length ? (
        <div
          className={cx(
            "invisible absolute left-1/2 top-full z-10 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 ease-out-soft",
            "group-hover/item:visible group-hover/item:translate-y-0 group-hover/item:opacity-100",
            "group-focus-within/item:visible group-focus-within/item:translate-y-0 group-focus-within/item:opacity-100",
            wide ? "w-[42rem]" : "w-72",
          )}
        >
          <div className="rounded-[1.5rem] bg-white p-3 shadow-[0_30px_60px_-30px_rgb(10_37_64/0.45)] ring-1 ring-ink/6">
            <ul className={cx("grid gap-0.5", wide && "grid-cols-2")}>
              {children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className="group/sub flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-[0.875rem] font-medium text-slate transition-colors hover:bg-cream hover:text-ink"
                  >
                    <span>{child.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-saffron-600 opacity-0 transition-all duration-300 group-hover/sub:translate-x-0 group-hover/sub:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </li>
  );
}

/* -------------------------------------------------------------------------
   Full menu. Every section and sub-page of the brief's menu: a sitemap of
   columns on large screens, an accordion on phones.
   ------------------------------------------------------------------------- */

function MenuOverlay({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const groups = navigation.filter((item) => item.children?.length);
  const singles = navigation.filter((item) => !item.children?.length);
  const social = contact.social.filter((item) => item.href);

  return (
    <div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      // A link to the page already open (the logo on the home page) changes
      // no path, so any link click closes the menu itself.
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) onClose();
      }}
      className={cx(
        "fixed inset-0 z-[60] overflow-y-auto bg-cream transition-[clip-path,visibility] duration-700 ease-out-soft",
        open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
      )}
    >
      <div className="shell flex h-20 items-center">
        <Logo className="h-12" />
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          className="ml-auto inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-full bg-ink pl-5 pr-4 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-ocean-600"
        >
          Close
          <X className="h-4.5 w-4.5" />
        </button>
      </div>

      <div className="shell pb-16 pt-6 lg:pt-12">
        {/* Large screens: the whole menu at a glance. */}
        <div className="hidden gap-x-10 gap-y-12 lg:grid lg:grid-cols-12">
          <div className="col-span-3">
            <ul className="space-y-3">
              {singles.map((item, index) => (
                <li
                  key={item.href}
                  className={cx(
                    "transition-all duration-700",
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${150 + index * 60}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="font-display text-[2.5rem] leading-tight text-ink transition-colors [font-variation-settings:'SOFT'_100] hover:text-lagoon-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div
              className={cx(
                "relative mt-10 aspect-[4/5] overflow-hidden rounded-[1.75rem_6rem_1.75rem_1.75rem] transition-all duration-1000",
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: open ? "360ms" : "0ms" }}
            >
              <Image src="/images/home/women-learning-group.jpg" alt="" fill sizes="20vw" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-navy-950/75 via-navy-950/10 to-transparent" />
              <p className="absolute inset-x-6 bottom-6 font-display text-[1.375rem] leading-snug text-white [font-variation-settings:'SOFT'_100]">
                {brand.motto.join(". ")}.
              </p>
            </div>
          </div>
          <div className="col-span-9 grid grid-cols-3 gap-x-10 gap-y-10">
            {groups.map((item, index) => (
              <div
                key={item.href}
                className={cx(
                  "transition-all duration-700",
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  item.label === "Programmes" && "row-span-2",
                )}
                style={{ transitionDelay: open ? `${220 + index * 60}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  className="font-display text-[1.625rem] text-ink transition-colors [font-variation-settings:'SOFT'_100] hover:text-lagoon-600"
                >
                  {item.label}
                </Link>
                <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
                  {item.children?.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className="text-[0.875rem] text-slate transition-colors hover:text-ink">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Phones and tablets: an accordion. */}
        <ul className="divide-y divide-line border-y border-line lg:hidden">
          {navigation.map((item) => {
            const isOpen = expanded === item.label;
            return (
              <li key={item.href}>
                {item.children?.length ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      className="flex w-full cursor-pointer items-center justify-between py-4 text-left font-display text-[1.75rem] text-ink [font-variation-settings:'SOFT'_100]"
                    >
                      {item.label}
                      <Plus
                        className={cx(
                          "h-5 w-5 text-saffron-600 transition-transform duration-500",
                          isOpen && "rotate-45",
                        )}
                      />
                    </button>
                    <div
                      className={cx(
                        "grid transition-[grid-template-rows] duration-500 ease-out-soft",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <ul className="overflow-hidden">
                        <li className="pb-1">
                          <Link href={item.href} className="block py-1.5 text-[0.9375rem] font-semibold text-ink">
                            {item.label} overview
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} className="block py-1.5 text-[0.9375rem] text-slate">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                        <li className="h-4" aria-hidden="true" />
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-4 font-display text-[1.75rem] text-ink [font-variation-settings:'SOFT'_100]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col gap-8 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <Image src="/images/brand/mark.png" alt="" width={477} height={503} className="h-12 w-auto" />
            <p className="max-w-xs text-[0.875rem] leading-relaxed text-muted">{brand.tagline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {social.map((item) => (
              <a
                key={item.platform}
                href={item.href}
                aria-label={item.label}
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink ring-1 ring-ink/8 transition-colors hover:bg-ink hover:text-white"
              >
                <SocialIcon platform={item.platform} className="h-4 w-4" />
              </a>
            ))}
            <Cta href={ctas.support.href}>{ctas.support.label}</Cta>
          </div>
        </div>
      </div>
    </div>
  );
}

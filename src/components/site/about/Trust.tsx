"use client";

import Image from "next/image";
import { useEffect, useState, type KeyboardEvent } from "react";
import { cx } from "@/lib/cx";
import { aboutTrust } from "@/data/about";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";

const { tabs } = aboutTrust;

/**
 * Safeguarding, Policies and Accessibility: the three About Us menu entries
 * the brief gives trust-and-safety copy for, as tabs beside a photograph
 * that wipes to each tab's own picture (`.photo-stack`). The heading is the
 * subtitle of the brief's Governance and Accountability block.
 *
 * Each tab button carries the menu's anchor for its entry (#safeguarding,
 * #policies, #accessibility), so the strip under the hero and the header's
 * dropdown scroll to it; the tab then opens itself, whether the link was
 * followed on this page (seen as a click) or the page was opened at that
 * address.
 */
export function Trust() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const open = (hash: string) => {
      const index = tabs.findIndex((tab) => `#${tab.id}` === hash);
      if (index >= 0) setActive(index);
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (link instanceof HTMLAnchorElement && link.pathname === window.location.pathname) open(link.hash);
    };
    const onHash = () => open(window.location.hash);
    // The address the page was opened at, once it has painted.
    const frame = requestAnimationFrame(onHash);
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  /* Arrow keys move between tabs, as a tab list should. */
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const move = { ArrowRight: 1, ArrowLeft: -1, Home: -index, End: tabs.length - 1 - index }[event.key];
    if (move === undefined) return;
    event.preventDefault();
    const next = (index + move + tabs.length) % tabs.length;
    setActive(next);
    document.getElementById(tabs[next].id)?.focus();
  };

  return (
    <section aria-labelledby="trust-title" className="relative isolate overflow-clip bg-sand py-band">
      <Shell>
        {/* The photograph spans both rows; the second row takes whatever
            height it leaves, so the tabs sit straight under the heading. */}
        <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] xl:gap-x-20">
          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <Reveal variant="fade">
              <Kicker>{aboutTrust.kicker}</Kicker>
            </Reveal>
            <Title id="trust-title" lead={aboutTrust.titleLead} accent={aboutTrust.titleAccent} className="mt-5" />
            <Reveal delay={120}>
              <p className="mt-5 text-lead text-slate">{aboutTrust.lead}</p>
            </Reveal>
          </div>

          <Reveal variant="image" className="lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
              <div className="reveal-clip relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem_2rem_2rem_8rem] bg-mist lg:max-w-[32rem]">
                <div className="reveal-media photo-stack absolute inset-0">
                  {tabs.map((tab, index) => (
                    <div
                      key={tab.id}
                      className={cx("absolute inset-0 overflow-hidden", index === active && "is-active")}
                    >
                      <Image
                        src={tab.image.src}
                        alt={index === active ? tab.image.alt : ""}
                        fill
                        sizes="(min-width: 1920px) 640px, (min-width: 1024px) 34vw, 448px"
                        className="object-cover"
                        style={{ objectPosition: tab.image.position }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-2">
            <Reveal delay={160}>
              <div role="tablist" aria-label={aboutTrust.kicker} className="flex flex-wrap gap-2">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    // The menu's anchor for this entry.
                    id={tab.id}
                    aria-selected={index === active}
                    aria-controls={`${tab.id}-panel`}
                    tabIndex={index === active ? 0 : -1}
                    onClick={() => setActive(index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className={cx(
                      "h-12 cursor-pointer scroll-mt-32 rounded-full px-6 text-[0.9375rem] font-semibold transition-colors duration-500",
                      index === active
                        ? "bg-ink text-white"
                        : "bg-white text-ink ring-1 ring-inset ring-ink/10 hover:bg-cream",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </Reveal>

            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                role="tabpanel"
                id={`${tab.id}-panel`}
                aria-labelledby={tab.id}
                hidden={index !== active}
                className="mt-7 animate-[rise-in_0.8s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none"
              >
                <div className={cx("grid gap-x-10 gap-y-7", tab.blocks.length > 1 && "xl:grid-cols-2")}>
                  {tab.blocks.map((block) => (
                    <div key={block.title}>
                      <h3 className="font-display text-[1.5rem] leading-snug text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.75rem]">
                        {block.title}
                      </h3>
                      {block.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-slate">
                          {paragraph}
                        </p>
                      ))}
                      {"list" in block && block.list ? (
                        <RunList
                          items={block.list}
                          dot="bg-orange"
                          className="mt-3 max-w-2xl text-[1.0625rem] leading-[1.9] text-ink"
                        />
                      ) : null}
                      {"closing" in block && block.closing ? (
                        <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-muted">{block.closing}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

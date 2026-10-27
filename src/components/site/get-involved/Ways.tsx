"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { getInvolvedWays } from "@/data/get-involved";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { logo } from "@/data/site";

/**
 * Support Our Work: the brief's five ways to support the Foundation as an
 * index set in the display face, beside a photograph cut with a leaf
 * corner. Pointing at a way (or reaching it with the keyboard) lights its
 * number, slides its name across and lifts that way's own photograph into
 * the frame from the foot up (`.photo-stack` in site.css). Each way is a
 * link to where it is taken further.
 *
 * Phones set the heading, the photograph and the list one under another;
 * from large screens the photograph holds the left and the heading and list
 * the right.
 */
export function Ways() {
  const [active, setActive] = useState(0);
  const { ways } = getInvolvedWays;

  return (
    <section
      id={getInvolvedWays.id}
      aria-labelledby="ways-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12 xl:gap-x-20">
          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:self-end">
            <Reveal variant="fade">
              <Kicker>{getInvolvedWays.kicker}</Kicker>
            </Reveal>
            <Title
              id="ways-title"
              lead={getInvolvedWays.titleLead}
              accent={getInvolvedWays.titleAccent}
              className="mt-5"
            />
          </div>

          <Reveal variant="image" className="lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className="relative mx-auto w-full max-w-md lg:max-w-[34rem]">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[8rem_2rem_2rem_2rem] bg-sand">
                  <div className="reveal-media photo-stack absolute inset-0">
                    {ways.map((way, index) => (
                      <div
                        key={way.title}
                        aria-hidden={index !== active}
                        className={cx("absolute inset-0 overflow-hidden", index === active && "is-active")}
                      >
                        <Image
                          src={way.image.src}
                          alt={way.image.alt}
                          fill
                          sizes="(min-width: 1760px) 544px, (min-width: 1024px) 36vw, (min-width: 448px) 448px, 100vw"
                          className="object-cover"
                          style={{ objectPosition: way.image.position }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Which way the photograph belongs to, counted out of five. */}
              <p
                aria-hidden="true"
                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/95 py-2 pl-2 pr-4 text-[0.75rem] font-bold tabular-nums tracking-[0.18em] text-ink shadow-[0_18px_36px_-18px_rgb(10_37_64/0.6)]"
              >
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-6 w-auto"
                />
                {String(active + 1).padStart(2, "0")}
                <span className="text-ink-muted">/ {String(ways.length).padStart(2, "0")}</span>
              </p>
            </div>
          </Reveal>

          <ol
            aria-labelledby="ways-title"
            className="lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:max-w-[52rem] lg:self-start"
          >
            {ways.map((way, index) => {
              const isActive = index === active;
              return (
                <Reveal as="li" key={way.title} variant="up" delay={index * 80}>
                  <Link
                    href={way.link.href}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="group grid grid-cols-[3.25rem_1fr] items-start gap-x-4 py-3.5 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-x-6 lg:py-4"
                  >
                    <span
                      aria-hidden="true"
                      className={cx(
                        "font-display text-[2.25rem] leading-none tabular-nums transition-colors duration-500 [font-variation-settings:'SOFT'_100] sm:text-[3rem]",
                        isActive ? "text-lagoon-600" : "text-outline text-ink/40",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cx(
                        "block transition-[translate] duration-700 ease-out-soft",
                        isActive ? "translate-x-1.5" : "translate-x-0",
                      )}
                    >
                      <span
                        className={cx(
                          "block font-display text-[1.5rem] leading-tight transition-colors duration-500 [font-variation-settings:'SOFT'_100] sm:text-[1.875rem]",
                          isActive ? "text-lagoon-600" : "text-ink",
                        )}
                      >
                        {way.title}
                      </span>
                      <span className="mt-1.5 block max-w-xl text-[0.9375rem] leading-relaxed text-slate">
                        {way.line}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cx(
                        "mt-1 hidden h-11 w-11 place-items-center sm:grid rounded-full transition-colors duration-500",
                        isActive
                          ? "bg-saffron-500 text-ink"
                          : "bg-white text-ink shadow-[0_10px_24px_-14px_rgb(10_37_64/0.5)]",
                      )}
                    >
                      <ArrowRight
                        className={cx(
                          "h-4 w-4 transition-[rotate] duration-500 ease-out-soft",
                          isActive ? "rotate-0" : "-rotate-45",
                        )}
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Shell>
    </section>
  );
}
